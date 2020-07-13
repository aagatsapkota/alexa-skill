import React, { useContext } from 'react'

import { Modal, Header, Close } from '@zendeskgarden/react-modals'

import {
  GlobalState,
  GlobalDispatch,
  GlobalActions,
} from '../../../util/context'
import { ModalBody } from './ScheduleModal.style'

const { GATSBY_URL_HUBSPOT_MEETING } = process.env

const ScheduleModal = ({ title = 'Schedule A Demo' }) => {
  const state = useContext(GlobalState)
  const dispatch = useContext(GlobalDispatch)
  const { scheduleModalVisible, scheduleModalTitle } = state

  const onModalClose = () => {
    dispatch({
      type: GlobalActions.SCHEDULE_MODAL,
      scheduleModalVisible: false,
      scheduleModalTitle: null,
    })
  }

  if (scheduleModalVisible) {
    return (
      <Modal onClose={onModalClose}>
        <Header>{scheduleModalTitle || title}</Header>
        <ModalBody>
          <iframe
            title={scheduleModalTitle || title}
            src={GATSBY_URL_HUBSPOT_MEETING}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          <Close aria-label="Close modal" onClick={onModalClose} />
        </ModalBody>
      </Modal>
    )
  }

  return null
}

export default ScheduleModal
