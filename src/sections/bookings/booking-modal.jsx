import moment from 'moment';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import Typography from '@mui/material/Typography';

import { useFormValidation } from 'src/routes/hooks';

import { STATUS } from 'src/constants';
import { useNotification } from 'src/contexts/NotificationContext';

import BookingStatusDropdown from './booking-status-dropdown';
import { addNewBooking, updateBooking } from './bookings.api';

const BookingModal = ({ open, onClose, booking }) => {
  const [formInitFields, setFormInitFields] = useState({});
  const [loading, setLoading] = useState(false);
  const notify = useNotification();

  const validationRules = {
    destinationCity: [{ test: (value) => !!value, message: 'Destination city is required' }],
    destinationCountry: [{ test: (value) => !!value, message: 'Destination country is required' }],
    hotelName: [{ test: (value) => !!value, message: 'Hotel name is required' }],
    hotelAddress: [{ test: (value) => !!value, message: 'Hotel address is required' }],
    departureDate: [{ test: (value) => !!value, message: 'Departure date is required' }],
    returnDate: [{ test: (value) => !!value, message: 'Return date is required' }],
    airlineCompanyName: [{ test: (value) => !!value, message: 'Airline company is required' }],
    flightNumber: [{ test: (value) => !!value, message: 'Flight number is required' }],
    seat: [{ test: (value) => !!value, message: 'Seat is required' }],
    amount: [{ test: (value) => !!value, message: 'Amount is required' }],
    status: [{ test: (value) => !!value, message: 'Status is required' }],
  };

  const { data, errors, validateForm, handleInputChange } = useFormValidation(
    formInitFields,
    validationRules
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    if (validateForm()) {
      // Common request object
      const requestObject = {
        data,
        notification: (messageObj) => notify(messageObj),
        onSuccess: () => {
          handleClose();
        },
        onError: (error) => {
          setLoading(false);
        },
      };

      if (booking) {
        // Update existing customer
        updateBooking({ ...requestObject, booking });
      } else {
        // Add new customer
        addNewBooking(requestObject);
      }
    }
  };

  const handleClose = (_, reason) => {
    if (reason !== 'backdropClick') {
      onClose();
    }
  };

  useEffect(() => {
    if (booking) {
      setFormInitFields({
        id: booking?.id,
        destinationCity: booking?.destination?.location?.city,
        destinationCountry: booking?.destination?.location?.country,
        hotelName: booking?.destination?.hotel?.name,
        hotelAddress: booking?.destination?.hotel?.address?.address,
        customerName: booking?.customer?.full_name,
        customerPhoneNumber: booking?.customer?.contacts?.phone_number,
        customerEmail: booking?.customer?.contacts?.email,
        customerAddress: booking?.customer?.address?.text,
        departureDate: moment(booking?.travel_info?.dates?.starting_date),
        returnDate: moment(booking?.travel_info?.dates?.end_date),
        airlineCompanyName: booking?.travel_info?.airline.flight_company?.name,
        flightNumber: booking?.travel_info?.airline.flight_number,
        seat: booking?.travel_info?.airline.flight_seat,
        amount: booking?.payment_info?.total_amount,
        status: booking?.status,
      });
    } else {
      setFormInitFields({
        id: uuidv4(),
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
        amount: 1500,
        status: STATUS.CONFIRMED,
      });
    }
  }, [booking]);

  return (
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
          {booking ? 'Update Booking' : 'New Booking'}
        </Typography>
        <Typography variant="subtitle1" marginBottom={3}>
          Destination information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DatePicker
              disablePast={!booking}
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
              disabled={loading}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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
              disabled={loading}
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

          <Grid item xs={12}>
            <BookingStatusDropdown
              value={data.status || ''}
              onChange={(e) =>
                handleInputChange({ target: { name: 'status', value: e.target.value } })
              }
            />
          </Grid>
        </Grid>
        <Typography variant="subtitle1" gutterBottom marginTop={4}>
          Airline Information
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextField
              disabled={loading}
              label="Airline Company"
              name="airlineCompanyName"
              value={data.airlineCompanyName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.airlineCompanyName}
              helperText={errors.airlineCompanyName}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              disabled={loading}
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
          <Grid item xs={4}>
            <TextField
              disabled={loading}
              label="Seat"
              name="seat"
              value={data.seat}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.seat}
              helperText={errors.seat}
            />
          </Grid>
        </Grid>

        <Stack direction="row" gap={2} marginTop={3} justifyContent="flex-end">
          <Button sx={{ color: 'text.secondary' }} disabled={loading} onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" color="success" disabled={loading} type="submit">
            {booking ? 'Update' : 'Save'}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default BookingModal;

BookingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  booking: PropTypes.object,
};
