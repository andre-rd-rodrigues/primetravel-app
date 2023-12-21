import { useState } from 'react';
import PropTypes from 'prop-types';
import { remove } from 'firebase/database';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useNotification } from 'src/contexts/NotificationContext';

const DeleteModal = ({ open, onClose, dataRef }) => {
  const [loading, setLoading] = useState(false);
  const notify = useNotification();

  const handleDelete = () => {
    setLoading(true);

    remove(dataRef)
      .then(() => {
        notify({
          message: 'Booking deleted successfully!',
          type: 'success',
        });

        setLoading(false);
        onClose();
      })
      .catch((error) => {
        notify({
          message: 'Error deleting booking. Please try again later.',
          type: 'error',
        });
        setLoading(false);
      });
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      onClose();
    }
  };

  return (
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
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  dataRef: PropTypes.any,
};

export default DeleteModal;
