import { useState } from 'react';
import { query } from 'firebase/database';
import { useListVals } from 'react-firebase-hooks/database';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { Queries } from 'src/api';
import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import NoData from 'src/components/noData/noData';
import TableNoData from 'src/components/table/table-no-data';
import DeleteModal from 'src/components/modal/delete-operation';
import TableEmptyRows from 'src/components/table/table-empty-rows';

import CustomerModal from '../customer-modal';
import CustomersTableRow from '../customer-table-row';
import CustomersTableHead from '../customer-table-head';
import CustomersTableToolbar from '../customer-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function CustomersView() {
  const customersQuery = query(...Queries.getCustomersQuery());
  const [data, loading, error] = useListVals(customersQuery);

  // Firebase Realtime DB does not provide a way to effectively order data
  const customers = data?.sort((a, b) => b.created_at.localeCompare(a.created_at));

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('customerId');

  const [searchValue, setSearchValue] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  const [editCustomer, setEditCustomer] = useState();

  const [deleteCustomerId, setDeleteCustomerId] = useState();

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = customers.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleCheck = (event, rowId) => {
    const newSelected = [...selected];

    if (selected.includes(rowId)) {
      newSelected.splice(newSelected.indexOf(rowId), 1);

      return setSelected(newSelected);
    }

    newSelected.push(rowId);

    return setSelected(newSelected);
  };

  const handleCloseModal = () => (editCustomer ? setEditCustomer() : setIsCustomerModalOpen(false));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleSearch = (event) => {
    setPage(0);
    setSearchValue(event.target.value);
  };

  const dataFiltered = applyFilter({
    inputData: customers,
    comparator: getComparator(order, orderBy),
    filterValue: searchValue,
  });

  const notFound = !dataFiltered.length && !!searchValue;
  const minRows = page * rowsPerPage;
  const maxRows = page * rowsPerPage + rowsPerPage;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Customers</Typography>

        <Button
          variant="contained"
          onClick={() => setIsCustomerModalOpen(true)}
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
        >
          New customer
        </Button>
      </Stack>

      <Card>
        <CustomersTableToolbar
          numSelected={selected.length}
          searchValue={searchValue}
          onSearch={handleSearch}
        />

        <Scrollbar>
          {/* Loading spinner  */}
          {loading && (
            <Box
              sx={{ width: 1, height: 200 }}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <CircularProgress />
            </Box>
          )}

          {/* Error message  */}
          {error && <NoData displayName="customer list" />}

          {/* Successfull render  */}
          {!loading && !error && (
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <CustomersTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={customers?.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'firstName', label: 'Name' },
                    { id: 'Sex', label: 'Sex' },
                    { id: 'email', label: 'Email' },
                    { id: 'phone', label: 'Phone' },
                    { id: 'customerStatus', label: 'Status' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered.slice(minRows, maxRows).map((row) => (
                    <CustomersTableRow
                      key={row.id}
                      customer={row}
                      selected={selected.includes(row.id)}
                      onCheck={(event) => handleCheck(event, row.id)}
                      onDelete={() => setDeleteCustomerId(row.id)}
                      onEdit={(customer) => setEditCustomer(customer)}
                    />
                  ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
                  />

                  {notFound && <TableNoData query={searchValue.trim()} />}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <CustomerModal
        open={isCustomerModalOpen || !!editCustomer}
        onClose={handleCloseModal}
        customer={editCustomer}
      />

      <DeleteModal
        dataRef={Queries.deleteCustomerQuery(deleteCustomerId)}
        onNotification={(notificationProps) => setNotification(notificationProps)}
        open={!!deleteCustomerId}
        onClose={() => setDeleteCustomerId()}
      />
    </Container>
  );
}
