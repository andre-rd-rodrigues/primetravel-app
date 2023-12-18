import { remove } from 'firebase/database';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import ToastNotification from '../toast/toast';

const DeleteModal = ({ open, onClose, dataRef, notificationMessage }) => {
  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success',
  });

  const handleDelete = () => {
    setLoading(true);

    remove(dataRef)
      .then(() => {
        setNotification({
          open: true,
          message: notificationMessage.success,
          type: 'success',
        });

        setLoading(false);
        onClose();
      })
      .catch((error) => {
        console.log(error);
        setNotification({
          open: true,
          message: notificationMessage.error,
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
            This operation is irreversible. Are you sure you want to delete this data?
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

      <ToastNotification
        onClose={handleNotificationClose}
        severity={notification.type}
        message={notification.message}
      />
    </>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dataRef: PropTypes.any,
  notificationMessage: PropTypes.shape({
    success: PropTypes.string,
    error: PropTypes.string,
  }),
};

export default DeleteModal;
