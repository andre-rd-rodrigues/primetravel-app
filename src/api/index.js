import { ref, orderByChild } from 'firebase/database';

import { ROUTES } from 'src/routes/routes.constants';

import { db } from 'src/config/firebaseConfig';

export const Queries = {
  getPackagesQuery: () => ref(db, ROUTES.PACKAGES),
  getCustomersQuery: () => [ref(db, ROUTES.CUSTOMERS), orderByChild('created_at')],
  getCustomerQuery: (id) => ref(db, `${ROUTES.CUSTOMERS}/${id}`),
  deleteCustomerQuery: (id) => ref(db, `${ROUTES.CUSTOMERS}/${id}`),
  getBookingsQuery: () => [ref(db, ROUTES.BOOKINGS), orderByChild('created_at')],
  getBookingQuery: (id) => ref(db, `${ROUTES.BOOKINGS}/${id}`),
  deleteBookingQuery: (id) => ref(db, `${ROUTES.BOOKINGS}/${id}`),
};
