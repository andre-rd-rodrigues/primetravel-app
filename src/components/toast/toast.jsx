import React, { useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const ToastNotification = ({ open, onClose, message, type }) => (
  <Snackbar
    open={open}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    autoHideDuration={4000}
    onClose={onClose}
  >
    <Alert onClose={onClose} severity={type} sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
);

export default ToastNotification;
