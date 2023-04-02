import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import FormatAlignCenter from '@mui/icons-material/FormatAlignCenter';
import Skeleton from '@mui/material/Skeleton';

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort,headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"left"}
            padding={"normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ fontWeight: "bold" }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable({
  headCells,
  rows,
  handleTableChange,
  editButton,
  deleteButton,
  onEdit,
  onDelete,
  station,
  user,
  part
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  useEffect(()=>{
    handleTableChange({order, orderBy, page, rowsPerPage})
  }, [order, orderBy, page, rowsPerPage])
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2, px: 2 }}>
       
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows && rows.length}
              headCells={headCells}
            />
            <TableBody>
              {rows && rows.length && rows.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                  >
                    <TableCell component="th" id={labelId} scope="row">
                      {row.id}
                    </TableCell>
                    {(station || part) && <TableCell align="left">{row.name}</TableCell>}
                    {station && <TableCell align="left">{row.type}</TableCell>}
                    {user && <TableCell align="left">{row.first_name}</TableCell>}
                    {user && <TableCell align="left">{row.last_name}</TableCell>}
                    {user && <TableCell align="left">{row.user_name}</TableCell>}
                    {user && <TableCell align="left">{row.user_type}</TableCell>}
                    {user && <TableCell align="left">{row.station_name}</TableCell>}
                    {part && <TableCell align="left">{row.description}</TableCell>}
                    {!row.renderButton && <TableCell align="left">
                      {editButton && onEdit && <Button variant="outlined" onClick={()=>onEdit(row.id, row)} startIcon={<EditIcon />}>
                        Edit
                      </Button>}
                      &nbsp;&nbsp;&nbsp;
                      {deleteButton && onDelete && <Button variant="outlined" onClick={()=>onDelete(row.id)} ml='2' color="error" startIcon={<DeleteIcon />}>
                        Delete
                      </Button>}
                    </TableCell>}
                    {row.renderButton}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows && rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
