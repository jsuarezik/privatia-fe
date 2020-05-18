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
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useParams } from "react-router-dom"
import api from '../../services/default'

const useStyles = makeStyles({
  title: {
    padding: 10
  },
  form: {
    width: "100%",
    padding: 10
  }
});

const INITIAL_FORM = { name: "", ruc: "", invoice_address: "", online_invoice_address: "" , status : false};

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
      setFormValues(...formValues, ... {
        name: state.name,
        ruc: state.ruc,
        invoice_address: state.invoice_address,
        online_invoice_address: state.online_invoice_address,
        status : state.status || false
      })
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
          <Grid container xs={12} component={Paper}>
            <form className={classes.form} onSubmit={handleSubmit}>
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
              <InputLabel shrink>
                <Typography>
                  Status
                </Typography>
              </InputLabel>
              <Select
                name="status"
                value={formValues.status}
                onChange={handleChange}
              >
                <MenuItem value={true}> Active </MenuItem>
                <MenuItem value={false}> Inactive </MenuItem>
              </Select>
              <br /> <br />
              <Grid item xs={12}>
                <Button type="submit" color="primary" variant="contained">
                  <Typography> save </Typography>
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default CreateEnterprise;
