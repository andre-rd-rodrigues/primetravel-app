import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { ref, remove } from 'firebase/database';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import { db } from 'src/config/firebaseConfig';

const DeleteBookingModal = ({ open, onClose, bookingId }) => {
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  const handleDelete = () => {
    setLoading(true);

    const bookingRef = ref(db, `bookings/${bookingId}`);
    remove(bookingRef)
      .then(() => {
        setNotification({
          open: true,
          message: 'Booking deleted successfully!',
          type: 'success',
        });

        setLoading(false);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        setNotification({
          open: true,
          message: 'Error deleting booking. Please try again later.',
          type: 'error',
        });
        setLoading(false);
      });
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      onClose();
    }
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h4" textAlign="center">
            Are you sure?
          </Typography>
          <Typography marginY={3.5} textAlign="center">
            This operation is irreversible. Are you sure you want to delete this booking?
          </Typography>
          <Box display="flex" justifyContent="flex-end">
            <Button
              onClick={onClose}
              sx={{ marginRight: 2, color: 'text.secondary' }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} variant="contained" color="error" disabled={loading}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={notification.open}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={4000}
        onClose={handleNotificationClose}
      >
        <Alert
          onClose={handleNotificationClose}
          severity={notification.type}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
};

DeleteBookingModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  bookingId: PropTypes.string,
};

export default DeleteBookingModal;
