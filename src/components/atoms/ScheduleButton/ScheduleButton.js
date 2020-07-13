import React, { useContext } from 'react'
import { Button } from '@zendeskgarden/react-buttons'

import { GlobalDispatch, GlobalActions } from '../../../util/context'

const ScheduleButton = ({ title = 'Schedule A Demo', ...renderProps }) => {
  const dispatch = useContext(GlobalDispatch)

  return (
    <Button
      isPrimary
      {...renderProps}
      onClick={() => {
        dispatch({
          type: GlobalActions.SCHEDULE_MODAL,
          scheduleModalVisible: true,
          scheduleModalTitle: title,
        })
      }}
    >
      {title}
    </Button>
  )
}

export default ScheduleButton
