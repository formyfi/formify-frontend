import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import { visuallyHidden } from "@mui/utils";
import { Button } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
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
  part,
  loading
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
              {loading ?
              
              [1,2,3,4,5].map((t)=>( <TableRow>
                 <TableCell colSpan={headCells.length} align="center">
                    <Skeleton animation="wave" width="100%" height={48} />
                  </TableCell>
                </TableRow>)) 
              : rows && rows.slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage).map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.id}
                  >
                   {(!station && !part) && <TableCell component="th" id={labelId} scope="row">
                      {row.id}
                    </TableCell>}
                    {(station || part) && <TableCell align="left">{row.name}</TableCell>}
                    {station && <TableCell align="left">{row.type}</TableCell>}
                    {user && <TableCell align="left">{row.first_name}</TableCell>}
                    {user && <TableCell align="left">{row.last_name}</TableCell>}
                    {user && <TableCell align="left" sx={{ width: "15%" }}>{row.user_name}</TableCell>}
                    {part && <TableCell align="left">{row.description}</TableCell>}
                    {(user || part) && <TableCell align="left" sx={{ width: "20%" }}>{row.station_names}</TableCell>}
                    {user && <TableCell align="left" sx={{ width: "20%" }}>{row.user_areas_names}</TableCell>}
                    {!row.renderButton && <TableCell align="left">
                      {editButton && onEdit && <Button  onClick={()=>onEdit(row.id, row)} startIcon={<EditIcon />}>
                        Edit
                      </Button>}
                      &nbsp;&nbsp;&nbsp;
                      {deleteButton && onDelete && <Button  onClick={()=>onDelete(row.id)} ml='2' disabled={row.super_user === 1} color="error" startIcon={<DeleteIcon />}>
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
