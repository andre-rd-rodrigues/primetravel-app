import React from 'react';
import PropTypes from 'prop-types';

import { Card, Stack, Avatar, Typography } from '@mui/material';

import { getStatusColor } from 'src/utils/layout.utils';

import Label from 'src/components/label';

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
      <Stack spacing={2}>
        <Stack display="flex" alignItems="center">
          <Avatar
            src={customer?.avatar?.url}
            alt={customer?.first_name}
            sx={{
              width: 100,
              height: 100,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          />
          <Typography variant="h4">{customer?.first_name}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={700} fontSize={13} marginBottom={0.2}>
            Booking ID
          </Typography>
          <Typography fontSize={13}>{booking?.id}</Typography>
        </Stack>
        <Stack width={100}>
          <Typography fontWeight={700} fontSize={13} marginBottom={0.5}>
            Booking status
          </Typography>
          <Label color={getStatusColor(booking?.status)}>{booking?.status}</Label>
        </Stack>
        <Stack>
          <Typography fontWeight={700} fontSize={13} marginBottom={0.2}>
            Full name
          </Typography>
          <Typography fontSize={13}>{customer?.full_name}</Typography>
        </Stack>
        <Stack>
          <Typography fontWeight={700} fontSize={13} marginBottom={0.2}>
            Contacts
          </Typography>
          <Typography fontSize={13}>Phone: {customer?.contacts?.phone_number}</Typography>
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
    full_name: PropTypes.string,
    first_name: PropTypes.string,
    contacts: PropTypes.shape({
      phone_number: PropTypes.string,
      email: PropTypes.string,
    }),
  }),
  booking: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string.isRequired,
  }),
};

export default BookingDetailsCustomer;
