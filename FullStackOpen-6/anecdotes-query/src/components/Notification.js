import React, { useContext, useEffect } from 'react'
import { NotificationContext } from '../notificationContext'

const Notification = () => {
  const { message, hideMessage } = useContext(NotificationContext)
  console.log(message)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      hideMessage()
    }, 5000);

    return () => clearTimeout(timer);
  }, [message, hideMessage]);

  return <div style={style}>{message}</div>
};

export default Notification;