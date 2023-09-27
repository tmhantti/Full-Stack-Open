// needed for front end tests:

import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from '../store'
import PropTypes from 'prop-types'

function customRender(ui, { initialState, store = configureStore({ reducer: rootReducer, preloadedState: initialState }), ...options } = {}) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }

  Wrapper.propTypes = {
    children: PropTypes.node.isRequired,
  }

  return render(ui, { wrapper: Wrapper, ...options })
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
