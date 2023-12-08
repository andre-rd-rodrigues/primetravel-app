import { ref } from 'firebase/database';
import { useParams } from 'react-router-dom';
import { useObjectVal } from 'react-firebase-hooks/database';

import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { ROUTES } from 'src/routes/routes.constants';

import { db } from 'src/config/firebaseConfig';

import LoadingBox from 'src/components/loading/loading-box';
import { DetailsSection } from 'src/components/details-page';

import { NotFoundView } from 'src/sections/error';

import CustomerDetailsPersonalInfo from '../customer-details-personal-info';

function CustomerDetailsPage() {
  const { id } = useParams();

  const [customers, loading, error] = useObjectVal(ref(db, ROUTES.CUSTOMERS));

  const customer = customers?.filter((obj) => obj.id === id)?.[0];

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
            {/* TODO: Table of bookings */}

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

            {/* TODO: Add  */}
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
