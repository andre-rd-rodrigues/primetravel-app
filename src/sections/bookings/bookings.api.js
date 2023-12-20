import moment from 'moment';
import { cloneDeep } from 'lodash';
import { ref, update } from 'firebase/database';

import { db } from 'src/config/firebaseConfig';
import { mockedBooking } from 'src/_mock/bookings';

export const addNewBooking = ({ data, notification, onSuccess, onError }) => {
  // Fill the rest of the object properties with default values
  const bookingData = cloneDeep(mockedBooking);

  // Update properties
  bookingData.id = data.id;
  bookingData.created_at = moment().toISOString();
  bookingData.destination.location.city = data.destinationCity;
  bookingData.destination.location.country = data.destinationCountry;
  bookingData.destination.hotel.name = data.hotelName;
  bookingData.destination.hotel.address.address = data.hotelAddress;
  bookingData.customer.full_name = data.customerName;
  bookingData.customer.avatar.url =
    'https://images.unsplash.com/photo-1639628735078-ed2f038a193e?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  bookingData.customer.contacts.phoneNumber = data.customerPhoneNumber;
  bookingData.customer.contacts.email = data.customerEmail;
  bookingData.customer.address = data.customerAddress;
  bookingData.travel_info.dates.starting_date = data.departureDate.toISOString();
  bookingData.travel_info.dates.end_date = data.returnDate.toISOString();
  bookingData.travel_info.airline.flight_company.name = data.airlineCompanyName;
  bookingData.travel_info.airline.flightNumber = data.flightNumber;
  bookingData.travel_info.airline.seat = data.seat;
  bookingData.payment_info.total_amount = data.amount;
  bookingData.status = data.status;

  // Get a key for a new booking
  const updates = {};
  updates[`/bookings/${data.id}`] = bookingData;

  // Update bookings database with new data
  update(ref(db), updates)
    .then(() => {
      notification({
        open: true,
        message: 'New booking created successfully!',
        severity: 'success',
      });
      onSuccess();
    })
    .catch(() => {
      notification({
        open: true,
        message: 'Something went wrong. Please try again later.',
        severity: 'error',
      });
      onError();
    });
};

export const updateBooking = ({ data, booking, notification, onSuccess, onError }) => {
  // Fill the rest of the object properties with default values
  const bookingData = cloneDeep(booking);

  // Update properties
  bookingData.destination.location.city = data.destinationCity;
  bookingData.destination.location.country = data.destinationCountry;
  bookingData.destination.hotel.name = data.hotelName;
  bookingData.destination.hotel.address.address = data.hotelAddress;
  /*   bookingData.travel_info.dates.starting_date = data.departureDate.toISOString();
  bookingData.travel_info.dates.end_date = data.returnDate.toISOString(); */
  bookingData.travel_info.airline.flight_company.name = data.airlineCompanyName;
  bookingData.travel_info.airline.flightNumber = data.flightNumber;
  bookingData.travel_info.airline.seat = data.seat;
  bookingData.payment_info.total_amount = data.amount;
  bookingData.status = data.status;

  // Get a key for a new booking
  const updates = {};
  updates[`/bookings/${data.id}`] = bookingData;

  // Update bookings database with new data
  update(ref(db), updates)
    .then(() => {
      notification({
        message: 'Booking updated successfully!',
        type: 'success',
      });
      onSuccess();
    })
    .catch((error) => {
      notification({
        message: 'Something went wrong. Please try again later.',
        type: 'error',
      });
      onError(error);
    });
};
