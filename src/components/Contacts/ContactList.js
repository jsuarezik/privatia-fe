import React, { useEffect, useState} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import { Container, Grid, Typography, Button, TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell, IconButton} from '@material-ui/core';
import { Add, Edit, Delete } from '@material-ui/icons'
import { useParams, useHistory} from 'react-router-dom';
import api from '../../services/default'

const ContactList = (props) => {
  const useStyles = makeStyles(
    {
      fab : {
        marginTop:20
      },
      title : {
        padding : 10,
        marginTop : 10
      }
    }
  )
  const classes = useStyles()
  const history = useHistory()
  const [dataRow, setDataRow] = useState(null)
  const params = useParams();
  const {id} = params;
  useEffect( () => {
    handleRequest();
  }, [])
  const handleEdit = row => {
    history.push(`/contacts/${row.id}/edit`, { ...row, enterpriseId : id })
  }
  const handleRequest = async () => {
    const request = await api.get(`/companies/${id}/contacts`)
    setDataRow(request.data.data || [])
  }
  const handleBodyRow= () => {
    if (!dataRow) return null

    return dataRow.map( (row) => (
      <TableRow key={row.id}>
        <TableCell component="th" align='center' scope="row"> 
          { row.first_name}
        </TableCell>
        <TableCell component="th" align='center' scope="row"> 
          { row.last_name}
        </TableCell>
        <TableCell component="th" align='center' scope="row"> 
          { row.email}
        </TableCell>
        <TableCell component="th" align='center' scope="row"> 
          { row.type}
        </TableCell>
        <TableCell component="th" align='center' scope="row"> 
          { row.status ? "Active" : "Inactive"}
        </TableCell>
        <TableCell component="th" align='center' scope="row"> 
          <IconButton color="primary" onClick={() => handleEdit(row)}>
            <Edit />
          </IconButton>
          <IconButton color="primary">
            <Delete />
          </IconButton>
        </TableCell>
      </TableRow>
    ))
  }

  const handleAddButton = (e) => {
    history.push(`/new-contact`, { enterpriseId : id})
  }

  return (
    <Container maxWidth="lg">
     <Grid container>
       <Grid xs={11}>
        <Typography variant="h6" className={classes.title}>
          Company Contacts
        </Typography>
       </Grid>
       <Grid item xs={1}>
           <Button color="primary" className={classes.fab} onClick={handleAddButton}>
             <Add />
           </Button>
       </Grid>
       <Grid item xs={12}>
         <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Type</TableCell>
                  <TableCell align="center">Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {handleBodyRow()}
              </TableBody>
            </Table>
         </TableContainer>
       </Grid>
     </Grid>
    </Container>
  )
}

export default ContactList;