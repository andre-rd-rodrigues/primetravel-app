import { Avatar, Card, Stack, Typography } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Label from 'src/components/label';
import { getStatusColor } from 'src/utils/layout.utils';

function BookingDetailsCustomer({ customer, booking }) {
  return (
    <Card
      component={Stack}
      direction="row"
      justifyContent="center"
      sx={{
        px: 3,
        py: 5,
        borderRadius: 2,
      }}
    >
      <Stack spacing={3}>
        <Stack display="flex" alignItems="center">
          <Avatar
            src={customer?.avatar?.url}
            alt={customer?.fullName}
            sx={{
              width: 100,
              height: 100,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          >
            {customer?.fullName}
          </Avatar>
          <Typography variant="h4">{customer?.fullName}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={700} fontSize={13} marginBottom={0.2}>
            Booking ID
          </Typography>
          <Typography fontSize={13}>{booking?.bookingNumber}</Typography>
        </Stack>
        <Stack width={100}>
          <Typography fontWeight={700} fontSize={13} marginBottom={0.2}>
            Status
          </Typography>
          <Label color={getStatusColor(booking?.status)}>{booking?.status}</Label>
        </Stack>
        <Stack>
          <Typography fontWeight={700} fontSize={13} marginBottom={0.2}>
            Fullname
          </Typography>
          <Typography fontSize={13}>{customer?.fullName}</Typography>
        </Stack>
        <Stack>
          <Typography variant="subtitle2" marginBottom={0.2}>
            Contacts
          </Typography>
          <Typography fontSize={13}>Phone: {customer?.contacts?.phoneNumber}</Typography>
          <Typography fontSize={13}>Email: {customer?.contacts?.email}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

BookingDetailsCustomer.propTypes = {
  customer: PropTypes.shape({
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
    fullName: PropTypes.string,
    contacts: PropTypes.shape({
      phoneNumber: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
  booking: PropTypes.shape({
    bookingNumber: PropTypes.number,
    status: PropTypes.string.isRequired,
  }),
};

export default BookingDetailsCustomer;
