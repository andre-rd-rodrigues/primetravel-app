import { useState } from 'react';
import { ref } from 'firebase/database';
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

import { ROUTES } from 'src/routes/routes.constants';

import { users } from 'src/_mock/user';
import { db } from 'src/config/firebaseConfig';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import NoData from 'src/components/noData/noData';

import TableNoData from '../table-no-data';
import TableEmptyRows from '../table-empty-rows';
import BookingsTableRow from '../bookings-table-row';
import BookingsTableHead from '../bookings-table-head';
import BookingsTableToolbar from '../bookings-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function BookingsView() {
  const [bookings, loading, error] = useListVals(ref(db, ROUTES.BOOKINGS));

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('bookingId');

  const [filterBookingId, setFilterBookingId] = useState();

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookings.map((n) => n.bookingNumber);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, rowId) => {
    const newSelected = [...selected];

    if (selected.includes(rowId)) {
      newSelected.splice(newSelected.indexOf(rowId), 1);

      return setSelected(newSelected);
    }

    newSelected.push(rowId);

    return setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByBookingId = (event) => {
    setPage(0);
    setFilterBookingId(event.target.value ? parseInt(event.target.value, 10) : undefined);
  };

  const dataFiltered = applyFilter({
    inputData: bookings,
    comparator: getComparator(order, orderBy),
    filterId: filterBookingId,
  });

  const notFound = !dataFiltered.length && !!filterBookingId;
  const minRows = page * rowsPerPage;
  const maxRows = page * rowsPerPage + rowsPerPage;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Bookings</Typography>

        <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New booking
        </Button>
      </Stack>

      <Card>
        <BookingsTableToolbar
          numSelected={selected.length}
          filterValue={filterBookingId}
          onFilterBooking={handleFilterByBookingId}
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
          {error && <NoData displayName="bookings list" />}

          {/* Successfull render  */}
          {!loading && !error && (
            <TableContainer sx={{ overflow: 'unset' }}>
              <Table sx={{ minWidth: 800 }}>
                <BookingsTableHead
                  order={order}
                  orderBy={orderBy}
                  rowCount={bookings?.length}
                  numSelected={selected.length}
                  onRequestSort={handleSort}
                  onSelectAllClick={handleSelectAllClick}
                  headLabel={[
                    { id: 'bookingId', label: 'Booking ID' },
                    { id: 'customer', label: 'Customer' },
                    { id: 'travelDate', label: 'Travel date' },
                    { id: 'airline', label: 'Airline' },
                    { id: 'destination', label: 'Destination' },
                    { id: 'amount', label: 'Amount' },
                    { id: 'status', label: 'Status' },
                    { id: '' },
                  ]}
                />
                <TableBody>
                  {dataFiltered.slice(minRows, maxRows).map((row) => (
                    <BookingsTableRow
                      key={row.id}
                      bookingID={row.bookingNumber}
                      customer={row?.customer}
                      status={row.status}
                      amount={row?.payment_info?.total_amount}
                      destination={row?.destination?.location?.country}
                      airline={row?.travel_info?.airline?.airline?.iataCode}
                      travelDate={row?.travel_info?.dates}
                      selected={selected.includes(row.bookingNumber)}
                      handleClick={(event) => handleClick(event, row.bookingNumber)}
                    />
                  ))}

                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, users.length)}
                  />

                  {notFound && <TableNoData query={filterBookingId} />}
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
    </Container>
  );
}
