import { ref, orderByChild } from 'firebase/database';

import { ROUTES } from 'src/routes/routes.constants';

import { db } from 'src/config/firebaseConfig';

export const Queries = {
  getPackagesQuery: () => ref(db, ROUTES.PACKAGES),
  getCustomersQuery: () => [ref(db, ROUTES.CUSTOMERS), orderByChild('created_at')],
  deleteCustomerQuery: (id) => ref(db, `customers/${id}`),
  getBookingsQuery: () => [ref(db, ROUTES.BOOKINGS), orderByChild('created_at')],
  deleteBookingQuery: (id) => ref(db, `bookings/${id}`),
  getSingleBookingQuery: () => ref(db, ROUTES.BOOKINGS),
};
