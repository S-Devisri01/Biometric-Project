// import * as React from 'react';
// import PropTypes from 'prop-types';
// import { alpha } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import TableSortLabel from '@mui/material/TableSortLabel';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Paper from '@mui/material/Paper';
// import Checkbox from '@mui/material/Checkbox';
// import IconButton from '@mui/material/IconButton';
// import Tooltip from '@mui/material/Tooltip';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import DeleteIcon from '@mui/icons-material/Delete';
// import FilterListIcon from '@mui/icons-material/FilterList';
// import { visuallyHidden } from '@mui/utils';

// function createData(id, name, Student_Name, Department, Year, Reason, Form_status) {
//   return {
//     id,
//     name,
//     Student_Name,
//     Department,
//     Year,
//     Reason,
//     Form_status,
//   };
// }

// const rows = [
//     createData(1, "e21cs001", "Alice Smith", "CSE", "2021", "Leave Request","Pending"),
//     createData(2, "e21it002", "Bob Brown", "IT", "2022", "Leave Request","Rejected"),
//     createData(3, "e21ai003", "Charlie Davis", "AIDS", "2023", "Leave Request","Rejected"),
//     createData(4, "e21bm004", "David Evans", "BME", "2024", "Leave Request","Rejected"),
//     createData(5, "e21me005", "Ella Johnson", "MECH", "2021", "Leave Request","Pending"),
//     createData(6, "e21ec006", "Frank Martin", "ECE", "2022", "Leave Request","Rejected"),
//     createData(7, "e21cs007", "Grace Lewis", "CSE", "2023", "Leave Request","Pending"),
//     createData(8, "e21it008", "Henry Adams", "IT", "2024", "Leave Request","Rejected"),
//     createData(9, "e21ai009", "Ivy Green", "AIDS", "2021", "Leave Request","Rejected"),
//     createData(10, "e21bm010", "Jack White", "BME", "2022", "Leave Request","Pending"),
//     createData(11, "e21me011", "Karen Hill", "MECH", "2023", "Leave Request","Approved"),
//     createData(12, "e21ec012", "Liam Brown", "ECE", "2024", "Leave Request","Approved"),
//     createData(13, "e21cs013", "Mia Clark", "CSE", "2021", "Leave Request","Approved"),
//     createData(14, "e21it014", "Noah Turner", "IT", "2022", "Leave Request","Approved"),
//     createData(15, "e21ai015", "Olivia Scott", "AIDS", "2023", "Leave Request","Approved"),
//     createData(16, "e21bm016", "Paul Walker", "BME", "2024", "Leave Request","Pending"),
//     createData(17, "e21me017", "Quinn Foster", "MECH", "2021", "Leave Request","Pending"),
//     createData(18, "e21ec018", "Ryan Green", "ECE", "2022", "Leave Request","Approved"),
//     createData(19, "e21cs019", "Sophia Lee", "CSE", "2023", "Leave Request","Rejected"),
//     createData(20, "e21it020", "Tom Harris", "IT", "2024", "Leave Request","Pending"),
//   ];

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// const headCells = [
//   {
//     id: 'name',
//     numeric: false,
//     disablePadding: true,
//     label: 'SIN NO',
//   },
//   {
//     id: 'Student_Name',
//     numeric: true,
//     disablePadding: false,
//     label: 'Student_Name',
//   },
//   {
//     id: 'Department',
//     numeric: true,
//     disablePadding: false,
//     label: 'Department',
//   },
//   {
//     id: 'Year',
//     numeric: true,
//     disablePadding: false,
//     label: 'Year',
//   },
//   {
//     id: 'Reason',
//     numeric: true,
//     disablePadding: false,
//     label: 'Reason ',
//   },
//   {
//     id: 'Form_status',
//     numeric: false,
//     disablePadding: true,
//     label: 'Form Status ',
//   },
// ];

// function EnhancedTableHead(props) {
//   const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
//     props;
//   const createSortHandler = (property) => (event) => {
//     onRequestSort(event, property);
//   };

//   return (
//     <TableHead>
//       <TableRow>
//         <TableCell padding="checkbox">
//           <Checkbox
//             color="primary"
//             indeterminate={numSelected > 0 && numSelected < rowCount}
//             checked={rowCount > 0 && numSelected === rowCount}
//             onChange={onSelectAllClick}
//             inputProps={{
//               'aria-label': 'select all sin no',
//             }}
//           />
//         </TableCell>
//         {headCells.map((headCell) => (
//           <TableCell
//             key={headCell.id}
//             align={headCell.numeric ? 'right' : 'left'}
//             padding={headCell.disablePadding ? 'none' : 'normal'}
//             sortDirection={orderBy === headCell.id ? order : false}
//           >
//             <TableSortLabel
//               active={orderBy === headCell.id}
//               direction={orderBy === headCell.id ? order : 'asc'}
//               onClick={createSortHandler(headCell.id)}
//             >
//               {headCell.label}
//               {orderBy === headCell.id ? (
//                 <Box component="span" sx={visuallyHidden}>
//                   {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
//                 </Box>
//               ) : null}
//             </TableSortLabel>
//           </TableCell>
//         ))}
//       </TableRow>
//     </TableHead>
//   );
// }

// EnhancedTableHead.propTypes = {
//   numSelected: PropTypes.number.isRequired,
//   onRequestSort: PropTypes.func.isRequired,
//   onSelectAllClick: PropTypes.func.isRequired,
//   order: PropTypes.oneOf(['asc', 'desc']).isRequired,
//   orderBy: PropTypes.string.isRequired,
//   rowCount: PropTypes.number.isRequired,
// };

// function EnhancedTableToolbar(props) {
//   const { numSelected } = props;
//   return (
//     <Toolbar
//       sx={[
//         {
//           pl: { sm: 2 },
//           pr: { xs: 1, sm: 1 },
//         },
//         numSelected > 0 && {
//           bgcolor: (theme) =>
//             alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
//         },
//       ]}
//     >
//       {numSelected > 0 ? (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           color="inherit"
//           variant="subtitle1"
//           component="div"
//         >
//           {numSelected} selected
//         </Typography>
//       ) : (
//         <Typography
//           sx={{ flex: '1 1 100%' }}
//           variant="h6"
//           id="tableTitle"
//           component="div"
//         >
//           Pending Requests
//         </Typography>
//       )}
//       {numSelected > 0 ? (
//         <Tooltip title="Delete">
//           <IconButton>
//             <DeleteIcon />
//           </IconButton>
//         </Tooltip>
//       ) : (
//         <Tooltip title="Filter list">
//           <IconButton>
//             <FilterListIcon />
//           </IconButton>
//         </Tooltip>
//       )}
//     </Toolbar>
//   );
// }

// EnhancedTableToolbar.propTypes = {
//   numSelected: PropTypes.number.isRequired,
// };

// export default function TableInfo() {
//   const [order, setOrder] = React.useState('asc');
//   const [orderBy, setOrderBy] = React.useState('Student_Name');
//   const [selected, setSelected] = React.useState([]);
//   const [page, setPage] = React.useState(0);
//   const [dense, setDense] = React.useState(false);
//   const [rowsPerPage, setRowsPerPage] = React.useState(5);

//   const handleRequestSort = (event, property) => {
//     const isAsc = orderBy === property && order === 'asc';
//     setOrder(isAsc ? 'desc' : 'asc');
//     setOrderBy(property);
//   };

//   const handleSelectAllClick = (event) => {
//     if (event.target.checked) {
//       const newSelected = rows.map((n) => n.id);
//       setSelected(newSelected);
//       return;
//     }
//     setSelected([]);
//   };

//   const handleClick = (event, id) => {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }
//     setSelected(newSelected);
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleChangeDense = (event) => {
//     setDense(event.target.checked);
//   };

//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

//   const visibleRows = React.useMemo(
//     () =>
//       [...rows]
//         .sort(getComparator(order, orderBy))
//         .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
//     [order, orderBy, page, rowsPerPage],
//   );

//   return (
//     <Box sx={{ width: '100%' }}>
//       <Paper sx={{ width: '100%', mb: 2 }}>
//         <EnhancedTableToolbar numSelected={selected.length} />
//         <TableContainer>
//           <Table
//             sx={{ minWidth: 750 }}
//             aria-labelledby="tableTitle"
//             size={dense ? 'small' : 'medium'}
//           >
//             <EnhancedTableHead
//               numSelected={selected.length}
//               order={order}
//               orderBy={orderBy}
//               onSelectAllClick={handleSelectAllClick}
//               onRequestSort={handleRequestSort}
//               rowCount={rows.length}
//             />
//             <TableBody>
//               {visibleRows.map((row, index) => {
//                 const isItemSelected = selected.includes(row.id);
//                 const labelId = `enhanced-table-checkbox-${index}`;

//                 return (
//                   <TableRow
//                     hover
//                     onClick={(event) => handleClick(event, row.id)}
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={row.id}
//                     selected={isItemSelected}
//                     sx={{ cursor: 'pointer' }}
//                   >
//                     <TableCell padding="checkbox">
//                       <Checkbox
//                         color="primary"
//                         checked={isItemSelected}
//                         inputProps={{
//                           'aria-labelledby': labelId,
//                         }}
//                       />
//                     </TableCell>
//                     <TableCell
//                       component="th"
//                       id={labelId}
//                       scope="row"
//                       padding="none"
//                     >
//                       {row.name}
//                     </TableCell>
//                     <TableCell align="right">{row.Student_Name}</TableCell>
//                     <TableCell align="right">{row.Department}</TableCell>
//                     <TableCell align="right">{row.Year}</TableCell>
//                     <TableCell align="right">{row.Reason}</TableCell>
//                     <TableCell align="right">{row.Form_status}</TableCell>

//                   </TableRow>
//                 );
//               })}
//               {emptyRows > 0 && (
//                 <TableRow
//                   style={{
//                     height: (dense ? 33 : 53) * emptyRows,
//                   }}
//                 >
//                   <TableCell colSpan={6} />
//                 </TableRow>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//       <FormControlLabel
//         control={<Switch checked={dense} onChange={handleChangeDense} />}
//         label="Dense padding"
//       />
//     </Box>
//   );
// }

import React from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Card,
  CardContent,
} from "@mui/material";

const leaveRequests = [
  { id: 1, date: "2024-10-01", status: "Approved", approver: "Class Advisor" },
  { id: 2, date: "2024-10-02", status: "Pending", approver: "HoD" },
  { id: 3, date: "2024-10-03", status: "Rejected", approver: "Principal" },
  { id: 4, date: "2024-10-05", status: "Approved", approver: "Class Advisor" },
  { id: 5, date: "2024-10-07", status: "Pending", approver: "HoD" },
];

const LeaveApprovalStatus = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Pending":
        return "warning";
      case "Rejected":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        maxWidth: 1000,
        margin: "auto",
        backgroundColor: "#f9f9fb",
        borderRadius: 3,
      }}
    >
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Leave Approval Status
      </Typography>

      {/* Approved Requests Section */}
      <Card sx={{ mb: 3, backgroundColor: "#e7f8e7" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Approved Requests
          </Typography>
          <Box>
            {leaveRequests
              .filter((request) => request.status === "Approved")
              .map((request) => (
                <Box key={request.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="body2">{`Request Date: ${request.date}`}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>{`Approver: ${request.approver}`}</Typography>
                </Box>
              ))}
          </Box>
        </CardContent>
      </Card>

      {/* Rejected Requests Section */}
      <Card sx={{ mb: 3, backgroundColor: "#f8e7e7" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Rejected Requests
          </Typography>
          <Box>
            {leaveRequests
              .filter((request) => request.status === "Rejected")
              .map((request) => (
                <Box key={request.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="body2">{`Request Date: ${request.date}`}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>{`Approver: ${request.approver}`}</Typography>
                </Box>
              ))}
          </Box>
        </CardContent>
      </Card>

      {/* Pending Requests Section */}
      <Card sx={{ mb: 3, backgroundColor: "#fff3cd" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Pending Requests
          </Typography>
          <Box>
            {leaveRequests
              .filter((request) => request.status === "Pending")
              .map((request) => (
                <Box key={request.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                  <Typography variant="body2">{`Request Date: ${request.date}`}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: "bold" }}>{`Approver: ${request.approver}`}</Typography>
                </Box>
              ))}
          </Box>
        </CardContent>
      </Card>

      <TableContainer component={Box} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#e0e0e0" }}>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Date
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaveRequests.map((request) => (
              <TableRow
                key={request.id}
                sx={{
                  "&:nth-of-type(odd)": {
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                <TableCell align="center" sx={{ py: 2 }}>
                  {request.date}
                </TableCell>
                <TableCell align="center" sx={{ py: 2 }}>
                  <Chip
                    label={request.status}
                    color={getStatusColor(request.status)}
                    variant="outlined"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "0.875rem",
                      width: "80px",
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LeaveApprovalStatus;
