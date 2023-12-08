import { Helmet } from 'react-helmet-async';

import { CustomersView } from 'src/sections/customers/view';

// ----------------------------------------------------------------------

export default function CustomersPage() {
  return (
    <>
      <Helmet>
        <title> Customers | Primetravel </title>
      </Helmet>

      <CustomersView />
    </>
  );
}
