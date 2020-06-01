import 'date-fns'
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Container,
  Paper,
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormLabel
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers';
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom"
import DateFnsUtils from '@date-io/date-fns';
import api from '../../services/default'

const useStyles = makeStyles({
  title: {
    padding: 10
  },
  form: {
    width: "100%",
    padding: 10
  },
  formGroup : {
    padding : 20
  }
});

const INITIAL_FORM = { name: "", ruc: "", invoice_address: "", online_invoice_address: "" , status : false, contract_date: new Date(), service_type : '' , client_qty : 0 , server_qty : 0};

const CreateEnterprise = (props) => {
  const classes = useStyles();
  const history = useHistory();
  const params = useParams();
  const [formValues, setFormValues] = useState(INITIAL_FORM);
  const [isEdit, setIsEdit] = useState(false);
  const {id} = params;
  
  useEffect(() => {
    if (id) {
      const { state } = history.location;
      if (!state) return;
      setIsEdit(true);
      setFormValues({...formValues, ... {
        name: state.name,
        ruc: state.ruc,
        invoice_address: state.invoice_address,
        online_invoice_address: state.online_invoice_address,
        status : state.status || false,
        contract_date : state.contract_date || null,
        service_type : state.service_type
      }}) 
    }

  }, [])

  const handleChange = event => {
    const target = event.target;
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isEdit) {
      api.post('/companies', {... formValues } ).then(response => {
        console.log('Success')
        handleBack();
      } ).catch(error => console.log(error));      
    } else {
      api.put(`/companies/${id}`, formValues).then(response => {
        console.log('Success')
        handleBack();
      }).catch(error => console.error(error));
    }
    
  }

  const handleBack = (e) => {
    history.goBack();
  }

  const handleDatePicker = () => {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            name="contract_date"
            label="Contact Date"
            fullWidth
            value={formValues.contract_date}
            onChange={(date) => {
              console.log(date);
              setFormValues({ ... formValues, contract_date : date})
            }}
         >

        </KeyboardDatePicker>
      </MuiPickersUtilsProvider>
    )
  }

  const handleForm = () => {
    return (
      <>
       <form className={classes.form} onSubmit={handleSubmit}>
        {handleGeneralInfoFormGroup()}
        <br />
        {handleContractInfoFormGroup()}
        <br />
        <Grid item xs={12}>
          <Button type="submit" color="primary" variant="contained">
            Save
          </Button>
        </Grid>
       </form>
      </>
    )
  }

  const handleGeneralInfoFormGroup = () => {
    return (
      <>
        <Grid item xs={12} component={Paper} className={classes.formGroup}>
          <FormLabel>
            General Info
          </FormLabel>
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="RUC"
            fullWidth
            margin="normal"
            name="ruc"
            value={formValues.ruc}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Invoice Address"
            fullWidth
            margin="normal"
            name="invoice_address"
            value={formValues.invoice_address}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Online Invoice Address"
            fullWidth
            margin="normal"
            name="online_invoice_address"
            value={formValues.online_invoice_address}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        </Grid>
      </>
    )
  }

  const handleContractInfoFormGroup = () => {
    return (
      <>
       <Grid item xs={12} component={Paper} className={classes.formGroup}> 
        <FormLabel> Contract Info </FormLabel>
        <TextField
            label="Client Quantity"
            fullWidth
            margin="normal"
            name="client_qty"
            type="number"
            value={formValues.client_qty}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
          <TextField
            label="Server Quantity"
            fullWidth
            margin="normal"
            name="server_qty"
            type="number"
            value={formValues.server_qty}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
          />
        {handleDatePicker()}
        {handleSelect('Status', 'status', handleChange, [ {value : true, label : 'Active'}, { value : false, label : 'Inactive' }])}
       </Grid>
      </>
    )
  }

  const handleSelect = (label, name , handler, items) => {
    return (
      <>
        <InputLabel shrink>
          <Typography>
            {label}
          </Typography>
        </InputLabel>
        <Select
          name={name}
          value={formValues[name]}
          onChange={handler}
          fullWidth
        >
          {items.map(item => 
            <MenuItem value={item.value}>  
              {item.label}      
            </MenuItem>)}
        </Select>
      </>
    )
  }
  return (
    <>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={11}>
            <Typography variant="h6" className={classes.title}>
              Company
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Button color="primary" className={classes.title} onClick={handleBack}>
              BACK
            </Button>
          </Grid>
          <Grid container xs={12}>
            {handleForm()}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CreateEnterprise;
