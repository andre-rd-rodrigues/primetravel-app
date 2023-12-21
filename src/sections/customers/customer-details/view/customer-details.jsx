import moment from 'moment';
import { useState } from 'react';
import { query } from 'firebase/database';
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

import { Queries } from 'src/api';

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
  const [orderBy, setOrderBy] = useState('customerId');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { id } = useParams();

  const customerQuery = query(Queries.getCustomerQuery(id));
  const [customer, loading, error] = useObjectVal(customerQuery);

  const handleSort = (event, rowId) => {
    const isAsc = orderBy === rowId && order === 'asc';
    if (rowId !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(rowId);
    }
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
  console.log(customer);
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
                      onRequestSort={handleSort}
                      headLabel={[
                        { id: 'bookingId', label: 'Booking ID' },
                        { id: 'departure', label: 'Departure' },
                        { id: 'returnDate', label: 'Return' },
                        { id: 'destination', label: 'Destination' },
                        { id: 'amount', label: 'Amount' },
                        { id: 'status', label: 'Status' },
                      ]}
                    />
                    <TableBody>
                      {customer?.bookings?.slice(minRows, maxRows).map((row) => (
                        <CustomerDetailsBookingsTableRow
                          key={row.id}
                          bookingID={row.id}
                          customer={row?.customer}
                          amount={row?.payment_info?.total_amount}
                          status={row.status}
                          destination={row?.destination?.location?.country}
                          departure={moment(row?.travel_info?.dates?.starting_date).format(
                            'DD-MM-YYYY'
                          )}
                          returnDate={moment(row?.travel_info?.dates?.end_date).format(
                            'DD-MM-YYYY'
                          )}
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
      {((!loading && !customer) || error) && (
        <NotFoundView
          title="Sorry, customer not found"
          description="Sorry, we couldn’t find the customer you’re looking for. Perhaps you’ve mistyped the customer ID? Be sure to check your spelling."
        />
      )}
    </Container>
  );
}

export default CustomerDetailsPage;
