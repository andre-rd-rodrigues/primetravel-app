import { Helmet } from 'react-helmet-async';

import { PackagesView } from 'src/sections/packages/view';

// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> Products | Primetravel </title>
      </Helmet>

      <PackagesView />
    </>
  );
}
