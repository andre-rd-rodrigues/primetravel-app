import moment from 'moment';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';

import { Box, Grid, Modal, Stack, Button, TextField, Typography } from '@mui/material';

import { useFormValidation } from 'src/routes/hooks';

import { useNotification } from 'src/contexts/NotificationContext';

import AvatarLoader from './avatar-loader';
import { addNewCustomer, updateExistingCustomer } from './customers.api';

function CustomerModal({ open, onClose, customer }) {
  const [formInitFields, setFormInitFields] = useState({});
  const [loading, setLoading] = useState(false);
  const notify = useNotification();

  const validationRules = {
    firstName: [{ test: (value) => !!value, message: 'First name is required' }],
    lastName: [{ test: (value) => !!value, message: 'Last name is required' }],
    phoneNumber: [
      { test: (value) => !!value, message: 'Phone number is required' },
      {
        test: (value) => /^\d{3}-\d{3}-\d{4}$/.test(value),
        message: 'e.g. Valid format: 123-456-7890',
      },
    ],
    email: [
      { test: (value) => !!value, message: 'Email is required' },
      { test: (value) => /.+@.+\..+/.test(value), message: 'Invalid email' },
    ],
    address: [{ test: (value) => !!value, message: 'Address is required' }],
    iban: [{ test: (value) => !!value, message: 'IBAN is required' }],
  };

  const { data, errors, validateForm, handleInputChange } = useFormValidation(
    formInitFields,
    validationRules
  );

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();

    if (validateForm()) {
      // Common request object
      const requestObject = {
        data,
        notification: (messageObj) => notify(messageObj),
        onSuccess: () => {
          setLoading(false);
          handleClose();
        },
        onError: (error) => {
          console.error(error);
          setLoading(false);
        },
      };

      if (customer) {
        // Update existing customer
        updateExistingCustomer(requestObject);
      } else {
        // Add new customer
        addNewCustomer(requestObject);
      }
    }
  };

  const handleClose = (_, reason) => {
    if (reason !== 'backdropClick') {
      onClose();
    }
  };

  useEffect(() => {
    if (customer) {
      setFormInitFields({
        created_at: customer.created_at,
        id: customer.id,
        firstName: customer.first_name,
        lastName: customer.last_name,
        phoneNumber: customer.contacts.phone_number,
        email: customer.contacts.email,
        address: customer.address.street,
        iban: customer.payment_info.iban,
        sex: customer.sex,
        imageUrl: customer.avatar.url,
      });
    } else {
      setFormInitFields({
        created_at: moment().toISOString(),
        id: uuidv4(),
        firstName: 'John',
        lastName: 'Doe',
        phoneNumber: '123-456-7890',
        email: 'john.doe@example.com',
        address: '456 Oak St, New York, 10002',
        iban: 'KW61WLNA215395165088U778496719',
        sex: 'male',
        imageUpload: undefined,
      });
    }
  }, [customer]);

  return (
    <Modal open={open} onClose={handleClose}>
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
        <Typography variant="h4" marginBottom={3} textAlign="center">
          {customer ? 'Update Customer' : 'New Customer'}
        </Typography>
        <Grid container spacing={2}>
          <AvatarLoader
            loading={loading}
            avatar={data.imageUrl}
            onSelectImage={(selectedImage) =>
              handleInputChange({
                target: {
                  value: selectedImage,
                  name: 'imageUpload',
                },
              })
            }
          />
          <Grid item xs={6}>
            <TextField
              disabled={loading}
              label="First Name"
              name="firstName"
              value={data.firstName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={loading}
              label="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              disabled={loading}
              label="Phone Number"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber || 'e.g. 123-456-7890'}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              disabled={loading}
              label="Email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
        </Grid>
        <TextField
          disabled={loading}
          label="Address"
          name="address"
          value={data.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!errors.address}
          helperText={errors.address}
        />
        <TextField
          disabled={loading}
          label="IBAN"
          name="iban"
          value={data.iban}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          error={!!errors.iban}
          helperText={errors.iban}
        />
        <Stack direction="row" gap={2} marginTop={3} justifyContent="flex-end">
          <Button disabled={loading} sx={{ color: 'text.secondary' }} onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={loading} variant="contained" color="success" type="submit">
            {customer ? 'Update' : 'Save'}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default CustomerModal;

CustomerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  customer: PropTypes.object,
};
