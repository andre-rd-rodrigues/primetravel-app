import React from 'react';
import PropTypes from 'prop-types';

import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const ToastNotification = ({ open, onClose, message, type }) => (
  <Snackbar
    open={open}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    autoHideDuration={4000}
    onClose={onClose}
    sx={{ position: 'absolute' }}
  >
    <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default ToastNotification;

ToastNotification.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string,
  type: PropTypes.string,
};
