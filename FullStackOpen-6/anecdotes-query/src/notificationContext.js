import React, { createContext, useReducer } from 'react';

const initialState = {
  message: '',
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_MESSAGE':
      return { message: action.payload }
    case 'HIDE_MESSAGE':
      return { message: '' }
    default:
      return state;
  }
};

export const NotificationContext = createContext({
  message: '',
  showMessage: () => {},
  hideMessage: () => {},
});

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState)

  const showMessage = (message) => {
    // console.log('hep')
    dispatch({ type: 'SHOW_MESSAGE', payload: message })
  };

  const hideMessage = () => {
    dispatch({ type: 'HIDE_MESSAGE' })
  };

  return (
    <NotificationContext.Provider
      value={{
        message: state.message,
        showMessage,
        hideMessage,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
