import React from 'react';
import PropTypes from 'prop-types';

import { Card, Stack, Avatar, Typography } from '@mui/material';

import { getStatusColor } from 'src/utils/layout.utils';

import { USER_STATUS } from 'src/constants';

import Label from 'src/components/label';

function CustomerDetailsPersonalInfo({ customer }) {
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
            alt={customer?.full_name}
            sx={{
              width: 100,
              height: 100,
              border: (theme) => `solid 2px ${theme.palette.background.default}`,
            }}
          />
          <Typography variant="h4">{customer?.first_name}</Typography>
          <Label color={getStatusColor(customer?.isActive)} sx={{ mt: 0.5 }}>
            {customer?.isActive ? USER_STATUS.ACTIVE : USER_STATUS.INACTIVE}
          </Label>
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
        <Stack>
          <Typography fontWeight={700} fontSize={13} marginBottom={0.2}>
            ID
          </Typography>
          <Typography fontSize={13}>{customer?.id}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

CustomerDetailsPersonalInfo.propTypes = {
  customer: PropTypes.shape({
    id: PropTypes.string,
    avatar: PropTypes.shape({
      url: PropTypes.string,
    }),
    full_name: PropTypes.string,
    first_name: PropTypes.string,
    contacts: PropTypes.shape({
      phone_number: PropTypes.string,
      email: PropTypes.string,
    }),
    isActive: PropTypes.bool,
  }),
};

export default CustomerDetailsPersonalInfo;
