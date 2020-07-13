import React from 'react'

import GlobalStyles from '../styles/global'

export const GlobalState = React.createContext()
export const GlobalDispatch = React.createContext()

export const GlobalActions = {
  ACTIVE_FORMAT: 'ACTIVE_FORMAT',
  SCHEDULE_MODAL: 'SCHEDULE_MODAL',
}

const initialState = {
  activeFormat: 'medium',
  scheduleModalVisible: false,
}

const reducer = (state, action) => {
  switch (action.type) {
    case GlobalActions.ACTIVE_FORMAT: {
      const { activeFormat } = action
      return {
        ...state,
        activeFormat,
      }
    }
    case GlobalActions.SCHEDULE_MODAL: {
      const { scheduleModalVisible, scheduleModalTitle } = action
      return {
        ...state,
        scheduleModalVisible,
        scheduleModalTitle,
      }
    }
    case 'SET': {
      const { payload } = action
      return {
        ...state,
        ...payload,
      }
    }
    default:
      throw new Error('Bad Reducer Action Type')
  }
}

export const GlobalContext = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <>
      <GlobalStyles />
      <GlobalState.Provider value={state}>
        <GlobalDispatch.Provider value={dispatch}>
          {children}
        </GlobalDispatch.Provider>
      </GlobalState.Provider>
    </>
  )
}
