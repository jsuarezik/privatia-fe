import React, { useState} from 'react'
import { Container, Grid, Paper, TextField, Button } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import api from '../../services/default'
import { setLocalStorageItem } from '../../utils/localstorage'
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles( {
    form : {
        width : "100%",
        padding : 10
    },
    formGroup : {
        padding : 20
    },
    container : {
        marginTop : 10
    },
    children : {
        height : '80vh'
    }
});

const INITIAL_FORM = { email : null, password : null } 
export default () => {
    const [loginInfo, setLoginInfo] = useState(INITIAL_FORM)
    const classes = useStyles()
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault()
        api.post('/auth/login', loginInfo).then(response => {
            setLocalStorageItem('auth', response.data.data.token);
            history.push('/companies')
        }).catch(error => {
            //TOAST DE ERROR
        })
    }

    const handleChange = (event) => {
        const target = event.target
        const {name , value} = target
        setLoginInfo({ ... loginInfo, [name] : value})
    }

    const renderLoginForm = () => {
        return (
            <Grid item lg={6} component={Paper} className={classes.formGroup}>
                <form container className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        fullWidth
                        margin="normal"
                        name="email"
                        value={loginInfo.email}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <TextField
                        label="Password"
                        fullWidth
                        margin="normal"
                        name="password"
                        type="password"
                        value={loginInfo.password}
                        onChange={handleChange}
                        InputLabelProps={{
                            shrink: true
                        }}
                    />
                    <Button 
                        type="submit" 
                        color="primary" 
                        variant="contained"
                    >
                        Login
                    </Button>
                </form>
            </Grid>   
        )  
    }

    return (
        <Container maxWidth="lg" className={classes.container}> 
            <Grid container direction="row" justify="center" alignItems="center" className={classes.children}>
                {renderLoginForm()}
            </Grid>
        </Container>
    )
}