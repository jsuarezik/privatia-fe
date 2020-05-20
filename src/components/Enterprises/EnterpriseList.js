import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import GroupIcon from '@material-ui/icons/Group';
import api 		from '../../services/default';

import { Link, useHistory } from "react-router-dom";
import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";

const useStyles = makeStyles({
	table: {
		minWidth: "80%",
		marginLeft: "auto",
		marginRight: "auto"
	},
	title: {
		padding: 10,
		marginTop: 10
	},
	fab: {
		marginTop: 10
	}
});

const SimpleTable = (props) => {
	const classes = useStyles();
	const history = useHistory();

	const [dataRow, setDataRow] = useState(null);
	const [open, setOpen] = useState(false);
	const [deleteId, setDeleteId] = useState(false)

	useEffect(() => {
		handleRequest();
	}, [])

	const handleRequest = async () => {
		const request = await api.get('/companies');
		setDataRow(request.data.data)
	}

	const handleEdit = (row) => {
		console.log(row);
		history.push(`/companies/${row.id}/edit`, {
			...row
		})
	}

	const handleDelete = (id) => {
		setOpen(true)
		setDeleteId(id);
	}

	const handleContactView = (row) => {
		history.push(`/companies/${row.id}/contacts`);
	}
	

	const handleBodyRow = () => {
		if (!dataRow) return null;

		return dataRow.map((row, index) => (
			<TableRow key={row.name}>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="center">{row.ruc}</TableCell>
				<TableCell align="center">{row.invoice_address}</TableCell>
				<TableCell align="center">{row.consumers ? row.consumers.length : 0 }</TableCell>
				<TableCell align="center">{row.contract_date || 'N/A'}</TableCell>
				<TableCell align="center">{row.service_type || 'none'}</TableCell>
				<TableCell align="center">{row.status ? "Active" : "Inactive"}</TableCell>
				<TableCell align="center">
					<IconButton
						color="primary"
						component="span"
						onClick={() => handleEdit(row)}
					>
						<EditIcon />
					</IconButton>
					<IconButton
						color="primary"
						component="span"
						onClick={() => handleDelete(row.id)}
					>
						<DeleteIcon />
					</IconButton>
					<IconButton
						color="primary"
						component="span"
						onClick={() => handleContactView(row)}
					>
						<GroupIcon />
					</IconButton>
				</TableCell>
			</TableRow>
		))
	}
	
	const handleDeleteDialog = () => {
		const handleCancel = () => {
			setOpen(false)
		}
		const handleOk = () => {
			api.delete(`/companies/${deleteId}`).then(response => {
				setDataRow(dataRow.filter(x => x.id !== deleteId))
				setDeleteId(null)
				setOpen(false)
			}).catch(error => console.error(error));
		}
		return (
			<Dialog 
				disableBackdropClick
				disableEscapeKeyDown
				maxWidth="lg"
				open={open}
			>
				<DialogTitle align="center"> Delete Enterprise </DialogTitle>
				<DialogContent dividers> 
					<Typography variant='subtitle1'> Are you sure you want to delete this enterprise?
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleCancel}>
						Cancel
					</Button>
					<Button onClick={handleOk}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		)
	}
	return (
		<Container maxWidth="lg">
			<Grid container>
				<Grid item xs={11}>
					<Typography variant="h6" className={classes.title}>
						Companies
          			</Typography>
				</Grid>
				<Grid item xs={1}>
					<Link to="/new-company">
						<Button className={classes.fab} color="primary">
							<AddIcon />
						</Button>
					</Link>
				</Grid>
			</Grid>
			<Grid item xs="12">
				<TableContainer component={Paper}>
					<Table className={classes.table}>
						<TableHead>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCell align="center">RUC</TableCell>
								<TableCell align="center">Invoice Address</TableCell>
								<TableCell align="center">Client Qty</TableCell>
								<TableCell align="center">Contract Date</TableCell>
								<TableCell align="center">Service Type</TableCell>
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
			{handleDeleteDialog()}	
		</Container>
	);
}

export default SimpleTable;
