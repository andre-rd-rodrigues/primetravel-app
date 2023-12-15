import moment from 'moment';
import { cloneDeep } from 'lodash';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { ref as dbRef, update } from 'firebase/database';

import { Box, Grid, Modal, Stack, Button, TextField, Typography } from '@mui/material';

import { useFormValidation } from 'src/routes/hooks';

import { db, storage } from 'src/config/firebaseConfig';
import { mockedCustomer } from 'src/_mock/customer';

import ToastNotification from 'src/components/toast/toast';
import AvatarLoader from './avatar-loader';
import { uploadBytesResumable, ref as storageRef, getDownloadURL } from 'firebase/storage';

function AddCustomerModal({ open, onClose }) {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success',
  });

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
    {
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
    },
    validationRules
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Fill the rest of the object properties with default values
      const customerData = cloneDeep(mockedCustomer);

      customerData.id = data.id;
      customerData.sex = data.sex;
      customerData.created_at = data.created_at;
      customerData.first_name = data.firstName;
      customerData.last_name = data.lastName;
      customerData.contacts.phone_number = data.phoneNumber;
      customerData.contacts.email = data.email;
      customerData.address.street = data.address;
      customerData.payment_info.iban = data.iban;

      const updates = {};
      updates[`/customers/${data.id}`] = customerData;

      if (data.imageUpload) {
        const storageRefLocal = storageRef(storage, `files/${data.imageUpload.name}`);
        const uploadTask = uploadBytesResumable(storageRefLocal, data.imageUpload);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            // Handle state change if needed
          },
          (error) => {
            console.log(error);
            setNotification({
              open: true,
              message: 'Something went wrong while uploading the image. Please try again later.',
              severity: 'error',
            });
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // Update avatar properties
              customerData.avatar.url = downloadURL;
              customerData.avatar.name = data.imageUpload.name;
              customerData.avatar.type = data.imageUpload.type;

              // Add new customer with image to DB
              update(dbRef(db), updates)
                .then(() => {
                  setNotification({
                    open: true,
                    message: 'New customer created successfully!',
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
            });
          }
        );
      } else {
        // Add new customer to DB
        update(dbRef(db), updates)
          .then(() => {
            setNotification({
              open: true,
              message: 'New customer created successfully!',
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
          <Typography variant="h4" marginBottom={3} textAlign="center">
            New Customer
          </Typography>
          <Grid container spacing={2}>
            <AvatarLoader
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
}

export default AddCustomerModal;

AddCustomerModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
