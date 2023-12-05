import { Helmet } from 'react-helmet-async';

import { UserView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function BookingsPage() {
  return (
    <>
      <Helmet>
        <title> Bookings | Primetravel </title>
      </Helmet>

      <UserView />
    </>
  );
}
