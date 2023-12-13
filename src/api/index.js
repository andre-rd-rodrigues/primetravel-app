import { ref, orderByChild } from 'firebase/database';

import { ROUTES } from 'src/routes/routes.constants';

import { db } from 'src/config/firebaseConfig';

export const Queries = {
  PACKAGES: ref(db, ROUTES.PACKAGES),
  customers: [ref(db, ROUTES.CUSTOMERS), orderByChild('created_at')],
  deleteCustomer: (id) => ref(db, `customers/${id}`),
  bookings: [ref(db, ROUTES.BOOKINGS), orderByChild('created_at')],
  deleteBooking: (id) => ref(db, `bookings/${id}`),
  BOOKING: ref(db, ROUTES.BOOKINGS),
};
