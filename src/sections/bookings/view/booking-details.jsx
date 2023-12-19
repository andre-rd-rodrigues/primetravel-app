import { query } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { useObjectVal } from 'react-firebase-hooks/database';

import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { convertPackagesToDisplayFields } from 'src/utils/layout.utils';

import { Queries } from 'src/api';

import LoadingBox from 'src/components/loading/loading-box';

import { NotFoundView } from 'src/sections/error';

import BookingDetailsSection from '../booking-details-section';
import BookingDetailsCustomer from '../booking-details-customer';

function BookingDetailsPage() {
  const { id } = useParams();

  const bookingQuery = query(Queries.getBookingQuery(id));
  const [booking, loading, error] = useObjectVal(bookingQuery);

  return (
    <Container>
      {/* Loading spinner  */}
      <LoadingBox loading={loading} />

      {!loading && Boolean(booking) && (
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={4}>
            <BookingDetailsCustomer customer={booking?.customer} booking={booking} />
          </Grid>
          <Grid item xs={12} sm={8} md={8}>
            <BookingDetailsSection
              content={{
                title: 'Destination',
                fields: [
                  {
                    fieldName: 'Location',
                    imageUrl: booking?.destination?.location?.imageURL,
                    fieldValues: [
                      {
                        fieldValueName: 'City',
                        fieldValue: booking?.destination?.location?.city,
                      },
                      {
                        fieldValueName: 'Country',
                        fieldValue: booking?.destination?.location?.country,
                      },
                      {
                        fieldValueName: 'Address',
                        fieldValue: booking?.destination?.location?.address,
                      },
                      {
                        fieldValueName: 'ZIP Code',
                        fieldValue: booking?.destination?.location?.zipCode,
                      },
                    ],
                  },
                  {
                    fieldName: 'Hotel',
                    imageUrl: booking?.destination?.hotel?.address?.imageURL,
                    fieldValues: [
                      {
                        fieldValueName: 'Name',
                        fieldValue: booking?.destination?.hotel?.name,
                      },
                      {
                        fieldValueName: 'Country',
                        fieldValue: booking?.destination?.hotel?.address?.country,
                      },
                      {
                        fieldValueName: 'Address',
                        fieldValue: booking?.destination?.hotel?.address?.address,
                      },
                      {
                        fieldValueName: 'ZIP Code',
                        fieldValue: booking?.destination?.hotel?.address?.zipCode,
                      },
                      {
                        fieldValueName: 'Phone',
                        fieldValue: booking?.destination?.hotel?.contact?.phone_number,
                      },
                      {
                        fieldValueName: 'Email',
                        fieldValue: booking?.destination?.hotel?.contact?.email,
                      },
                      {
                        fieldValueName: 'Rating',
                        fieldValue: booking?.destination?.hotel?.rating,
                      },
                    ],
                  },
                ],
              }}
            />

            <BookingDetailsSection
              content={{
                title: 'Flight info',
                fields: [
                  {
                    fieldName: 'Dates',
                    fieldValues: [
                      {
                        fieldValueName: 'Departure',
                        fieldValue: booking.travel_info?.dates?.starting_date,
                      },
                      {
                        fieldValueName: 'Return',
                        fieldValue: booking.travel_info?.dates?.end_date,
                      },
                    ],
                  },
                  {
                    fieldName: 'Airline',
                    fieldValues: [
                      {
                        fieldValueName: 'Flight number',
                        fieldValue: booking.travel_info?.airline?.flight_number,
                      },
                      {
                        fieldValueName: 'Company',
                        fieldValue: booking.travel_info?.airline?.flight_company?.name,
                      },
                      {
                        fieldValueName: 'Seat',
                        fieldValue: booking.travel_info?.airline?.flight_seat,
                      },
                    ],
                  },
                ],
              }}
            />

            <BookingDetailsSection
              content={{
                title: 'Packages',
                fields: convertPackagesToDisplayFields(booking?.travel_info?.packages),
              }}
            />

            <BookingDetailsSection
              content={{
                title: 'Travel agent',
                fields: [
                  {
                    fieldName: 'General information',
                    fieldValues: [
                      {
                        fieldValueName: 'Full name',
                        fieldValue: booking?.travel_agent?.name,
                      },
                    ],
                  },
                  {
                    fieldName: 'Contacts',
                    fieldValues: [
                      {
                        fieldValueName: 'Phone',
                        fieldValue: booking?.travel_agent?.phone_number,
                      },
                      {
                        fieldValueName: 'Email',
                        fieldValue: booking?.travel_agent?.email,
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
      {((!loading && !booking) || error) && (
        <NotFoundView
          title="Sorry, booking not found"
          description="Sorry, we couldn’t find the booking you’re looking for. Perhaps you’ve mistyped the booking ID? Be sure to check your spelling."
        />
      )}
    </Container>
  );
}

export default BookingDetailsPage;
