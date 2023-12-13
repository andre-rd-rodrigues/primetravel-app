import { Helmet } from 'react-helmet-async';

import { PackagesView } from 'src/sections/packages/view';

// ----------------------------------------------------------------------

export default function PackagesPage() {
  return (
    <>
      <Helmet>
        <title> Packages | Primetravel </title>
      </Helmet>

      <PackagesView />
    </>
  );
}
