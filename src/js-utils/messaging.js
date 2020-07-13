import { safeParse } from './display'

export const DEFAULT_EVENT_TYPE = 'generic'
export const DEFAULT_EVENT_SOURCE = 'elements-frame-event'

// #region inbound messaging
const handleNotification = (
  // eslint-disable-next-line default-param-last
  post = {},
  dispatch,
  // eslint-disable-next-line default-param-last
  dispatchFilter = () => {
    return true
  },
  context,
) => {
  if (dispatchFilter(post)) {
    const {
      message: { payload },
    } = post
    if (payload) {
      dispatch && dispatch(payload, context)
      defaultDispatch(payload, context)
    }
  }
}

// eslint-disable-next-line default-param-last
const defaultDispatch = ({ event, detail } = {}, context) => {
  switch (event) {
    case 'execute': {
      const { functionName, args } = detail
      execute(functionName, args, context)
      break
    }

    default: {
      break
    }
  }
}

// NOTE: default context to window.sandbox{} for security
const execute = (functionName, args = {}, context = window.sandbox) => {
  if (context) {
    const namespaces = functionName.split('.')
    const func = namespaces.pop()
    namespaces.forEach((namespace) => {
      context = context[namespace]
    })
    // TODO: investigate this usingh return context[func](context, args)
    // eslint-disable-next-line no-useless-call
    return context[func].call(context, args)
  }
}

export default class MessageReceiver {
  constructor({ dispatch, dispatchFilter, sandbox }) {
    this.sandbox = sandbox

    const eventMethod = window.addEventListener
      ? 'addEventListener'
      : 'attachEvent'
    const eventHandler = window[eventMethod]
    const messageEvent = eventMethod === 'attachEvent' ? 'onmessage' : 'message'

    eventHandler(messageEvent, ({ data: _data, message: _message }) => {
      handleNotification(
        safeParse(_data || _message),
        dispatch,
        dispatchFilter,
        this.sandbox,
      )
    })
  }
}
// #endregion inbound messaging

export const sendMessage = (
  event,
  detail,
  // eslint-disable-next-line default-param-last
  type = DEFAULT_EVENT_TYPE,
  context,
  source = DEFAULT_EVENT_SOURCE,
  // eslint-disable-next-line max-params
) => {
  if (context) {
    return context.postMessage(
      JSON.stringify({
        type,
        message: {
          action: source,
          payload: {
            event,
            detail,
          },
        },
        // TODO: WILDCARD DOMAIN???
      }),
      '*',
    )
  }
}
