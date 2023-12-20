// contexts/NotificationContext.js
import PropTypes from 'prop-types';
import React, { useState, useContext, useCallback, createContext } from 'react';

import ToastNotification from 'src/components/toast/toast';

// Create a context for notifications
const NotificationContext = createContext();

// Custom hook to use the NotificationContext
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Provider component to wrap your application and provide the notification functionality
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'info', // Default type
  });

  const handleClose = () => {
    setNotification({ ...notification, open: false });
  };

  // Memoized notify function
  const notify = useCallback(({ message, type = 'info' }) => {
    setNotification((prevState) => ({
      ...prevState,
      open: true,
      message,
      type,
    }));
  }, []); // Empty dependency array because notify doesn't rely on any external variables

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      <ToastNotification
        open={notification.open}
        onClose={handleClose}
        message={notification.message}
        type={notification.type}
      />
    </NotificationContext.Provider>
  );
};

// PropTypes for NotificationProvider
NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
