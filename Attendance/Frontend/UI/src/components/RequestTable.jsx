import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FilterListIcon from '@mui/icons-material/FilterList';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
// eslint-disable-next-line no-unused-vars

// Sample data for the table
const initialRows = [
    { id: 1, name: 'John Doe', status: 'Pending', priority: 'High', date: '2024-10-01' },
    { id: 2, name: 'Jane Smith', status: 'Pending', priority: 'Medium', date: '2024-10-05' },
    { id: 3, name: 'Alice Johnson', status: 'Pending', priority: 'Low', date: '2024-10-07' },
    { id: 4, name: 'Bob Brown', status: 'Pending', priority: 'High', date: '2024-10-08' },
    { id: 5, name: 'Charlie Green', status: 'Pending', priority: 'Medium', date: '2024-10-09' },
    { id: 6, name: 'David Blue', status: 'Pending', priority: 'Low', date: '2024-10-10' },
    { id: 7, name: 'Ella White', status: 'Pending', priority: 'High', date: '2024-10-11' },
    { id: 8, name: 'Frank Black', status: 'Pending', priority: 'Medium', date: '2024-10-12' },
    { id: 9, name: 'Grace Gold', status: 'Pending', priority: 'Low', date: '2024-10-13' },
    { id: 10, name: 'Henry Silver', status: 'Pending', priority: 'High', date: '2024-10-14' },
    // Add more rows as needed
];

// Custom Styles for Table
const useStyles = {
    container: {
        margin: '20px auto',
        padding: '20px',
        maxWidth: '1000px',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    },
    tableHead: {
        backgroundColor: '#1976d2', // Primary blue from MUI
        color: '#fff',
        fontWeight: 'bold',
        fontSize: '16px',
    },
    tableRow: {
        '&:nth-of-type(odd)': {
            backgroundColor: '#f2f2f2',
        },
        '&:hover': {
            backgroundColor: '#e0f7fa', // Light hover effect
        },
    },
    tableCell: {
        padding: '12px 16px',
        fontSize: '15px',
    },
    title: {
        fontWeight: 'bold',
        fontSize: '22px',
        color: '#424242',
        marginBottom: '10px',
    },
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingBottom: '15px',
    },
    statusPending: {
        color: '#f57c00',
        fontWeight: 'bold',
    },
    statusAccepted: {
        color: '#388e3c',
        fontWeight: 'bold',
    },
    statusRejected: {
        color: '#d32f2f',
        fontWeight: 'bold',
    },
    buttonGroup: {
        display: 'flex',
        gap: '8px',
    },
};

export default function RequestTable() {
    const [rows, setRows] = useState(initialRows);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to the first page on rows per page change
    };

    const handleDenseChange = (event) => {
        setDense(event.target.checked);
    };

    const handleAccept = (id) => {
        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                return { ...row, status: 'Accepted' };
            }
            return row;
        });
        setRows(updatedRows);
    };

    const handleReject = (id) => {
        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                return { ...row, status: 'Rejected' };
            }
            return row;
        });
        setRows(updatedRows);
    };

    // Function to handle cancel button click
    const handleCancel = () => {
        window.history.back(); // Navigate to the previous page
    };

    return (
        <Paper elevation={3} style={useStyles.container}>
            <Toolbar style={useStyles.toolbar}>
                <Typography variant="h6" component="div" style={useStyles.title}>
                    Request Table
                </Typography>
                <div>
                    {/* <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip> */}
                    {/* Removed Delete Icon and Tooltip */}
                </div>
            </Toolbar>
            <TableContainer>
                <Table aria-label="request table" size={dense ? 'small' : 'medium'}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={useStyles.tableHead}>Name</TableCell>
                            <TableCell style={useStyles.tableHead} align="right">Status</TableCell>
                            <TableCell style={useStyles.tableHead} align="right">Priority</TableCell>
                            <TableCell style={useStyles.tableHead} align="right">Date</TableCell>
                            <TableCell style={useStyles.tableHead} align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow hover key={row.id} style={useStyles.tableRow}>
                                <TableCell style={useStyles.tableCell}>{row.name}</TableCell>
                                <TableCell style={useStyles.tableCell} align="right">
                                    <Typography
                                        style={
                                            row.status === 'Accepted'
                                                ? useStyles.statusAccepted
                                                : row.status === 'Rejected'
                                                ? useStyles.statusRejected
                                                : useStyles.statusPending
                                        }
                                    >
                                        {row.status}
                                    </Typography>
                                </TableCell>
                                <TableCell style={useStyles.tableCell} align="right">{row.priority}</TableCell>
                                <TableCell style={useStyles.tableCell} align="right">{row.date}</TableCell>
                                <TableCell style={useStyles.tableCell} align="right">
                                    <div style={useStyles.buttonGroup}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            onClick={() => handleAccept(row.id)}
                                            disabled={row.status !== 'Pending'}
                                        >
                                            Accept
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            onClick={() => handleReject(row.id)}
                                            disabled={row.status !== 'Pending'}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <FormControlLabel
                    control={<Switch checked={dense} onChange={handleDenseChange} />}
                    label="Dense padding"
                />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" color="primary" onClick={handleCancel}>
                    Cancel
                </Button>
            </Box>
        </Paper>
    );
}
