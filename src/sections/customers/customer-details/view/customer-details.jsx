import moment from 'moment';
import { useState } from 'react';
import { ref } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { useObjectVal } from 'react-firebase-hooks/database';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Card,
  Table,
  Container,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';

import { ROUTES } from 'src/routes/routes.constants';

import { db } from 'src/config/firebaseConfig';

import Scrollbar from 'src/components/scrollbar';
import LoadingBox from 'src/components/loading/loading-box';
import { DetailsSection } from 'src/components/details-page';
import TableEmptyRows from 'src/components/table/table-empty-rows';

import { NotFoundView } from 'src/sections/error';

import { emptyRows } from '../../utils';
import CustomerDetailsPersonalInfo from '../customer-details-personal-info';
import CustomerDetailsBookingsTableRow from '../customer-details-bookings-table-row';
import CustomerDetailsBookingsTableHead from '../customer-details-bookings-table-head';

function CustomerDetailsPage() {
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('bookingId');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { id } = useParams();

  const [customers, loading, error] = useObjectVal(ref(db, ROUTES.CUSTOMERS));
  const customer = customers?.filter((obj) => obj.id === id)?.[0];

  const handleSort = (event, rowId) => {
    const isAsc = orderBy === rowId && order === 'asc';
    if (rowId !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(rowId);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = customer?.bookings.map((n) => n.bookingNumber);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  /*   const dataFiltered = applyFilter({
    inputData: customer?.bookings,
    comparator: getComparator(order, orderBy),
    filterId: null,
  }); */

  const minRows = page * rowsPerPage;
  const maxRows = page * rowsPerPage + rowsPerPage;

  return (
    <Container>
      {/* Loading customer  */}
      <LoadingBox loading={loading} />

      {/* Customer success */}
      {!loading && customer && (
        <Grid container spacing={3}>
          <Grid xs={12} sm={4} md={4}>
            <CustomerDetailsPersonalInfo customer={customer} />
          </Grid>
          <Grid xs={12} sm={8} md={8}>
            <DetailsSection
              fieldsContainerProps={{
                flexDirection: 'row',
              }}
              content={{
                title: 'Contacts',
                fields: [
                  {
                    fieldName: null,
                    fieldValues: [
                      {
                        fieldValueName: 'Street',
                        fieldValue: customer?.address?.street,
                      },
                      {
                        fieldValueName: 'City',
                        fieldValue: customer?.address?.city,
                      },
                      {
                        fieldValueName: 'Country',
                        fieldValue: customer?.address?.country,
                      },
                      {
                        fieldValueName: 'ZIP Code',
                        fieldValue: customer?.address?.zipCode,
                      },
                    ],
                  },
                ],
              }}
            />
            <Card
              sx={{
                px: 5,
                py: 5,
                borderRadius: 2,
                marginBottom: 3,
              }}
            >
              <Typography variant="h4" marginBottom={4}>
                Bookings
              </Typography>

              <Scrollbar>
                <TableContainer sx={{ overflow: 'unset' }}>
                  <Table sx={{ width: '100%' }}>
                    <CustomerDetailsBookingsTableHead
                      order={order}
                      orderBy={orderBy}
                      rowCount={customer?.bookings?.length}
                      numSelected={selected.length}
                      onRequestSort={handleSort}
                      onSelectAllClick={handleSelectAllClick}
                      headLabel={[
                        { id: 'bookingId', label: 'Booking ID' },
                        { id: 'departure', label: 'Departure' },
                        { id: 'returnDate', label: 'Return' },
                        { id: 'airline', label: 'Airline' },
                        { id: 'destination', label: 'Destination' },
                        { id: 'amount', label: 'Amount' },
                        { id: 'status', label: 'Status' },
                        { id: '' },
                      ]}
                    />
                    <TableBody>
                      {customer?.bookings?.slice(minRows, maxRows).map((row) => (
                        <CustomerDetailsBookingsTableRow
                          key={row.id}
                          bookingID={row.bookingNumber}
                          customer={row?.customer}
                          status={row.status}
                          destination={row?.destination?.location?.country}
                          airline={row?.travel_info?.airline?.flight_company?.iataCode}
                          departure={moment(row?.travel_info?.dates?.starting_date).format(
                            'DD-MM-YYYY'
                          )}
                          returnDate={moment(row?.travel_info?.dates?.end_date).format(
                            'DD-MM-YYYY'
                          )}
                          selected={selected.includes(row.bookingNumber)}
                        />
                      ))}

                      <TableEmptyRows
                        height={77}
                        emptyRows={emptyRows(page, rowsPerPage, customer?.bookings?.length)}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
              <TablePagination
                page={page}
                component="div"
                count={customer?.bookings?.length}
                rowsPerPage={rowsPerPage}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[5, 10, 25]}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Card>

            <DetailsSection
              content={{
                title: 'Payment info',
                fields: [
                  {
                    fieldName: null,
                    fieldValues: [
                      {
                        fieldValueName: 'IBAN',
                        fieldValue: customer?.payment_info?.iban,
                      },
                      {
                        fieldValueName: 'Total amount',
                        fieldValue: customer?.payment_info?.total_amount,
                      },
                      {
                        fieldValueName: 'Payment status',
                        fieldValue: customer?.payment_info?.payment_status,
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>
        </Grid>
      )}

      {/* Customer not found */}
      {!loading && !customer && (
        <NotFoundView
          title="Sorry, customer not found"
          description="Sorry, we couldn’t find the customer you’re looking for. Perhaps you’ve mistyped the customer ID? Be sure to check your spelling."
        />
      )}
    </Container>
  );
}

export default CustomerDetailsPage;
