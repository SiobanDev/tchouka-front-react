import React from 'react';

const initialValues = {
  open: false,
  setOpen: () => {
    return null;
  },
  severityKind: 'error',
  setSeverityKind: () => {
    return null;
  },
  notificationMessage: 'Une erreur est survenue.',
  setNotificationMessage: () => {
    return null;
  },
};

const NotificationContext = React.createContext(initialValues);

export default NotificationContext;
