import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { child, push, ref, update } from 'firebase/database';
import { cloneDeep } from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { mockedBooking } from 'src/_mock/bookings';
import ToastNotification from 'src/components/toast/toast';
import { db } from 'src/config/firebaseConfig';
import { useFormValidation } from 'src/routes/hooks';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const AddBookingModal = ({ open, onClose }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: undefined,
    type: 'success', // or 'error' for different severity
  });

  const validationRules = {
    destinationCity: [{ test: (value) => !!value, message: 'Destination city is required' }],
    destinationCountry: [{ test: (value) => !!value, message: 'Destination country is required' }],
    hotelName: [{ test: (value) => !!value, message: 'Hotel name is required' }],
    hotelAddress: [{ test: (value) => !!value, message: 'Hotel address is required' }],
    customerName: [{ test: (value) => !!value, message: 'Customer name is required' }],
    customerPhoneNumber: [{ test: (value) => !!value, message: 'Phone number is required' }],
    customerEmail: [{ test: (value) => !!value, message: 'Email is required' }],
    customerAddress: [{ test: (value) => !!value, message: 'Customer address is required' }],
    departureDate: [{ test: (value) => !!value, message: 'Departure date is required' }],
    returnDate: [{ test: (value) => !!value, message: 'Return date is required' }],
    airlineCompanyName: [{ test: (value) => !!value, message: 'Airline company is required' }],
    flightNumber: [{ test: (value) => !!value, message: 'Flight number is required' }],
    seat: [{ test: (value) => !!value, message: 'Seat is required' }],
    amount: [{ test: (value) => !!value, message: 'Amount is required' }],
    status: [{ test: (value) => !!value, message: 'Status is required' }],
  };

  const { data, errors, validateForm, handleInputChange } = useFormValidation(
    {
      bookingId: uuidv4(),
      destinationCity: 'New York',
      destinationCountry: 'United States',
      hotelName: 'Grand Hotel',
      hotelAddress: '123 Main St, New York, 10001',
      customerName: 'John Doe',
      customerPhoneNumber: '123-456-7890',
      customerEmail: 'john.doe@example.com',
      customerAddress: '456 Oak St, New York, 10002',
      departureDate: moment(),
      returnDate: moment(),
      airlineCompanyName: 'Air Travel Inc.',
      flightNumber: 'AT123',
      seat: '15A',
      amount: '1500.00',
      status: 'Confirmed',
    },
    validationRules
  );

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      // Fill the rest of the object properties with default values
      const bookingData = cloneDeep(mockedBooking);

      // Update properties
      bookingData.id = data.bookingId;
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

      // Get a key for a new Post.
      const newBookingKey = push(child(ref(db), 'bookings')).key;

      // Write the new post's data simultaneously in the posts list and the user's post list.
      const updates = {};
      updates[`/bookings/${newBookingKey}`] = bookingData;

      update(ref(db), updates)
        .then(() => {
          setNotification({
            open: true,
            message: 'New booking created successfully!',
            severity: 'success',
          });
          onClose();
        })
        .catch(() => {
          setNotification({
            open: true,
            message: 'Something went wrong. Please try again later.',
            severity: 'error',
          });
        });
    }
  };

  return (
    <>
      <Modal open={open} onClose={onClose}>
        <Box
          onSubmit={handleSubmit}
          component="form"
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" marginBottom={4} textAlign="center">
            New Booking
          </Typography>
          <Typography variant="subtitle1" marginBottom={3}>
            Destination information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DatePicker
                disablePast
                label="Departure date"
                name="departureDate"
                value={data.departureDate}
                onChange={(momentDateObj) =>
                  handleInputChange({
                    target: { name: 'departureDate', value: momentDateObj },
                  })
                }
                sx={{ width: '100%' }}
                margin="normal"
                error={!!errors.departureDate}
                helperText={errors.departureDate}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                disablePast
                label="Return date"
                name="returnDate"
                value={data.returnDate}
                onChange={(momentDateObj) =>
                  handleInputChange({
                    target: { name: 'returnDate', value: momentDateObj },
                  })
                }
                sx={{ width: '100%' }}
                margin="normal"
                error={!!errors.returnDate}
                helperText={errors.returnDate}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Destination Country"
                name="destinationCountry"
                value={data.destinationCountry}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.destinationCountry}
                helperText={errors.destinationCountry}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Destination City"
                name="destinationCity"
                value={data.destinationCity}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.destinationCity}
                helperText={errors.destinationCity}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Hotel Name"
                name="hotelName"
                value={data.hotelName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.hotelName}
                helperText={errors.hotelName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Hotel address"
                name="hotelAddress"
                value={data.hotelAddress}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.hotelAddress}
                helperText={errors.hotelAddress}
              />
            </Grid>
          </Grid>
          <Typography variant="subtitle1" gutterBottom marginTop={4}>
            Customer Information
          </Typography>
          <TextField
            label="Customer Name"
            name="customer.name"
            value={data.customerName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.customerName}
            helperText={errors.customerName}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                name="customer.contacts.phoneNumber"
                value={data.customerPhoneNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.customerPhoneNumber}
                helperText={errors.customerPhoneNumber}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="customer.contacts.email"
                value={data.customerEmail}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.customerEmail}
                helperText={errors.customerEmail}
              />
            </Grid>
          </Grid>
          <TextField
            label="Customer Address"
            name="customer.address"
            value={data.customerAddress}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.customerAddress}
            helperText={errors.customerAddress}
          />
          <Typography variant="subtitle1" gutterBottom marginTop={4}>
            Airline Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Airline Company"
                name="flightNumber"
                value={data.airlineCompanyName}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.airlineCompanyName}
                helperText={errors.airlineCompanyName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Flight Number"
                name="flightNumber"
                value={data.flightNumber}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
                error={!!errors.flightNumber}
                helperText={errors.flightNumber}
              />
            </Grid>
          </Grid>
          <TextField
            label="Seat"
            name="airlineSeat"
            value={data.seat}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            error={!!errors.seat}
            helperText={errors.seat}
          />
          <Stack direction="row" gap={2} marginTop={3} justifyContent="flex-end">
            <Button sx={{ color: 'text.secondary' }} onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>
              Save
            </Button>
          </Stack>
        </Box>
      </Modal>
      <ToastNotification
        open={notification.open}
        onClose={() => setNotification({ ...notification, open: false })}
        message={notification.message}
        type={notification.type}
      />
    </>
  );
};

export default AddBookingModal;

AddBookingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
