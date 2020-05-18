import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, makeStyles, Button, Paper, TextField, InputLabel, Select, MenuItem, FormControl } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
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

const CreateContact = (props) => {
    const classes = useStyles()
    const history = useHistory()
    const {state} = history.location
    const params = useParams()
    const {id} = params
    const INITIAL_FORM = { first_name : '' , last_name : '', email : '', type : 'authorized', status : true, company_id : state.enterpriseId}
    const [formValues, setFormValues] = useState(INITIAL_FORM);
    const [isEdit, setIsEdit] = useState(false)

    useEffect( () => {
        if (id) {
            const {state} = history.location
            if (!state) return;

            setIsEdit(true);
            setFormValues( {
                first_name : state.first_name,
                last_name : state.last_name,
                email : state.email,
                status : state.status,
                type : state.type
            })
        }
    }, [])

    const handleBack = (e) => {
        history.goBack()
    }

    const handleSuccessResponse = (response) => {
        console.log('Success');
        handleBack();
    }
    const handleErrorResponse = (error) => {
        console.error(error);
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!isEdit) {
            api.post(`/contacts`, { ...formValues}).then(handleSuccessResponse).catch(handleErrorResponse);
        } else {
            api.put(`/contacts/${id}`, formValues).then(handleSuccessResponse).catch(handleErrorResponse)
        }
    }

    const handleChange = (event) => {
        const target = event.target;
        const {name , value} = target
        
        setFormValues({ ... formValues, [name] : value})
    }

    return (
        <>
            <Container maxWidth="lg">
                <Grid container>
                    <Grid item xs={11}>
                        <Typography variant="h6" className={classes.title}>
                            Contact
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Button color="primary" className={classes.title} onClick={handleBack}>
                        BACK
                        </Button>
                    </Grid>
                    <Grid container xs={12} component={Paper}>
                        <form 
                            className={classes.form} 
                            onSubmit={handleSubmit}
                        >
                            <TextField 
                                label="First Name"
                                fullWidth
                                margin="normal"
                                name="first_name"
                                value={formValues.first_name}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink:true
                                }}
                            />
                            <TextField 
                                label="Last Name"
                                fullWidth
                                margin="normal"
                                name="last_name"
                                value={formValues.last_name}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink:true
                                }}
                            />
                            <TextField 
                                label="Email"
                                fullWidth
                                margin="normal"
                                name="email"
                                value={formValues.email}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink:true
                                }}
                            />
                            <FormControl margin="normal" fullWidth>
                                <InputLabel shrink>
                                    <Typography>
                                        Type
                                    </Typography>
                                </InputLabel>
                                <Select 
                                    name="type"
                                    value={formValues.type}
                                    onChange={handleChange}
                                >
                                    <MenuItem value='authorized'>
                                        Authorized
                                    </MenuItem>
                                    <MenuItem value='notifications'>
                                        Notification
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl margin="normal" fullWidth>
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
                                    <MenuItem value={true}>
                                        Active
                                    </MenuItem>
                                    <MenuItem value={false}>
                                        Inactive
                                    </MenuItem>
                                </Select>
                            </FormControl>
                            <Grid item xs={12}>
                                <Button type='submit' color="primary" variant="contained">
                                    <Typography>
                                        Save
                                    </Typography>
                                </Button>
                            </Grid>
                        </form>
                        
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}

export default CreateContact;