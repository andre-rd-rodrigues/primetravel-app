import { Helmet } from 'react-helmet-async';

import { SomethingWentWrong } from 'src/sections/error';

// ----------------------------------------------------------------------

export default function ErrorPage() {
  return (
    <>
      <Helmet>
        <title> Error - Something went wrong </title>
      </Helmet>

      <SomethingWentWrong />
    </>
  );
}
