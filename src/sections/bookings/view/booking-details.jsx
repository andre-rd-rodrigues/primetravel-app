import React from 'react';
import { ref } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { useListVals, useObjectVal } from 'react-firebase-hooks/database';

import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { ROUTES } from 'src/routes/routes.constants';

import { convertPackagesToDisplayFields } from 'src/utils/layout.utils';

import { db } from 'src/config/firebaseConfig';

import LoadingBox from 'src/components/loading/loading-box';

import BookingDetailsSection from '../booking-details-section';
import BookingDetailsCustomer from '../booking-details-customer';

function BookingDetailsPage() {
  const { id } = useParams();

  const [bookings, loading, error] = useListVals(ref(db, ROUTES.BOOKINGS));

  const booking = bookings?.filter((obj) => obj.id === id)?.[0];

  return (
    <Container>
      {/* Loading spinner  */}
      <LoadingBox loading={loading} />

      {!loading && booking && (
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
    </Container>
  );
}

export default BookingDetailsPage;
