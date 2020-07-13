import React, { useContext } from 'react'
import { GlobalDispatch, GlobalActions } from '../../../util/context'

import { SelectableAnchor } from '../styled'

const ScheduleAnchor = ({ title = 'Schedule A Demo', ...renderProps }) => {
  const dispatch = useContext(GlobalDispatch)

  return (
    <SelectableAnchor
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
    </SelectableAnchor>
  )
}

export default ScheduleAnchor
