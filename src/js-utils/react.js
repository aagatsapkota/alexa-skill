import React, { useContext, useReducer, useState, cloneElement } from 'react';
import ReactDOM from 'react-dom';

export const renderComponent = (Component, props = {}, className = 'react-app') => {
  ReactDOM.render(
    React.createElement(Component, props, null),
    document.getElementsByClassName(className)[0]
  );
}

export const ParticularContext = React.createContext();
export const ParticularProvider = ParticularContext.Provider;
export const ParticularConsumer = ParticularContext.Consumer;

export const AlgoliaContext = React.createContext();
export const AlgoliaProvider = AlgoliaContext.Provider;
export const AlgoliaConsumer = AlgoliaContext.Consumer;

export const StatefulContext = React.createContext();
export const StatefulConsumer = StatefulContext.Consumer;
export const StatefulProvider = props => {
  const { children, value } = props;
  const [contextState, dispatch] = useReducer(statefulReducer, value);

  return (
    <StatefulContext.Provider value={[contextState, dispatch]}>
      {children}
    </StatefulContext.Provider>
  );
};

export const validateFieldReducer = (fieldValidation = {}, payload = {}) => {
  const { providersName, providerType, fieldName, validator } = payload;
  const updatedProvidersNameFields = fieldValidation[providersName] || {};
  const updatedProviderTypeFields =
    updatedProvidersNameFields[providerType] || {};
  fieldValidation[providersName] = {
    ...updatedProvidersNameFields,
    [providerType]: {
      ...updatedProviderTypeFields,
      [fieldName]: validator.isValid
    }
  };
  return fieldValidation;
};

export const DISPATCH_LOADING_STATE = 'LOADING_STATE';
export const DISPATCH_ORDERS_STATE = 'ORDERS_STATE';

const statefulReducer = (state, { type, payload }) => {
  if (!type || !payload) {
    throw new Error(`action missing type(${type}) or payload`, payload);
  }

  switch (type) {
    case 'SET': {
      return { ...state, ...payload };
    }

    case DISPATCH_LOADING_STATE: {
      const { loadingState: previousLoadingState } = state;
      
      return {
        ...state,
        loadingState: {
          ...previousLoadingState,
          ...payload,
        },
      };
    }

    case DISPATCH_ORDERS_STATE: {
      const { ordersState: previousOrdersState } = state;
      
      return {
        ...state,
        ordersState: {
          ...previousOrdersState,
          ...payload,
        },
      };
    }

    case 'VALIDATE_FIELD': {
      return {
        ...state,
        fieldValidation: validateFieldReducer(state.fieldValidation, payload)
      };
    }

    default:
      throw new Error(`action.type[${type}] not mapped`);
  }
};

export const useContextState = statefulContext => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = statefulContext || useContext(StatefulContext);
  const [contextState, dispatch] = context;

  const setContextState = payload => {
    dispatch({ type: 'SET', payload });
  };

  return [contextState, dispatch, setContextState];
};

export const useLocalState = initialValue => {
  const [state, replaceState] = useState(initialValue);
  const setState = updated => {
    replaceState({ ...state, ...updated });
  };

  return [state, setState];
};

export const convertElement = (component, props) => {
  const {
    header,
    sticky,
    format,
    mode,
    offset,
    relative,
    ...renderProps
  } = props
  return cloneElement(component, renderProps)
}
