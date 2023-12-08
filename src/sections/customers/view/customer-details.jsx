import { ref } from 'firebase/database';
import { useObjectVal } from 'react-firebase-hooks/database';
import { useParams } from 'react-router-dom';

import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { ROUTES } from 'src/routes/routes.constants';

import { db } from 'src/config/firebaseConfig';

import LoadingBox from 'src/components/loading/loading-box';
import CustomerDetailsPersonalInfo from '../customer-details-personal-info';
import { DetailsSection } from 'src/components/details-page';
import { convertBookingsToDisplayFields } from 'src/utils/layout.utils';
import { NotFoundView } from 'src/sections/error';

function CustomerDetailsPage() {
  const { id } = useParams();

  const [customers, loading, error] = useObjectVal(ref(db, ROUTES.CUSTOMERS));

  const customer = customers?.filter((obj) => obj.id === id)?.[0];
  if (!customer || error) {
    return <NotFoundView />;
  }
  return (
    <Container>
      {/* Loading spinner  */}
      <LoadingBox loading={loading} />

      {!loading && !error && (
        <Grid container spacing={3}>
          <Grid xs={12} sm={4} md={4}>
            <CustomerDetailsPersonalInfo customer={customer} />
          </Grid>
          <Grid xs={12} sm={8} md={8}>
            {/* Table of bookings */}
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
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default CustomerDetailsPage;
