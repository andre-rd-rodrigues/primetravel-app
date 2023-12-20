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
import DeleteModal from 'src/components/modal/delete-operation';

import BookingModal from '../booking-modal';
import BookingsTableRow from '../bookings-table-row';
import BookingsTableHead from '../bookings-table-head';
import BookingsTableToolbar from '../bookings-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';
import TableNoData from '../../../components/table/table-no-data';
import TableEmptyRows from '../../../components/table/table-empty-rows';

// ----------------------------------------------------------------------

export default function BookingsView() {
  const bookingsQuery = query(...Queries.getBookingsQuery());
  const [data, loading, error] = useListVals(bookingsQuery);

  // Firebase Realtime DB does not provide a way to effectively order data
  const bookings = data?.sort((a, b) => b.created_at.localeCompare(a.created_at));

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('bookingId');

  const [searchValue, setSearchValue] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const [deleteBookingId, setDeleteBookingId] = useState();

  const [editBooking, setEditBooking] = useState();

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

  const handleSearch = (event) => {
    setPage(0);
    setSearchValue(event.target.value);
  };

  const handleCloseModal = () => (editBooking ? setEditBooking() : setIsBookingModalOpen(false));

  const dataFiltered = applyFilter({
    inputData: bookings,
    comparator: getComparator(order, orderBy),
    filterValue: searchValue,
  });

  const notFound = !dataFiltered.length && !!searchValue;
  const minRows = page * rowsPerPage;
  const maxRows = page * rowsPerPage + rowsPerPage;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Bookings</Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => setIsBookingModalOpen(true)}
        >
          New booking
        </Button>
      </Stack>
      <Card>
        <BookingsTableToolbar
          numSelected={selected.length}
          filterValue={searchValue}
          onFilterBooking={handleSearch}
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
                      booking={row}
                      selected={selected.includes(row.bookingNumber)}
                      handleClick={(event) => handleClick(event, row.bookingNumber)}
                      onDelete={() => setDeleteBookingId(row.id)}
                      onEdit={(booking) => setEditBooking(booking)}
                    />
                  ))}
                  <TableEmptyRows
                    height={77}
                    emptyRows={emptyRows(page, rowsPerPage, bookings.length)}
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
      {(isBookingModalOpen || !!editBooking) && (
        <BookingModal
          open={isBookingModalOpen || !!editBooking}
          onClose={handleCloseModal}
          booking={editBooking}
        />
      )}
      {!!deleteBookingId && (
        <DeleteModal
          dataRef={Queries.deleteBookingQuery(deleteBookingId)}
          open={Boolean(deleteBookingId)}
          onClose={() => setDeleteBookingId()}
        />
      )}
    </Container>
  );
}
