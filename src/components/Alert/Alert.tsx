/* eslint-disable no-constant-condition */
/* eslint-disable no-dupe-else-if */
import React, { useEffect } from 'react'
import { AlertCustomOptions, useAlert } from 'react-alert'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { RootState } from '../../app/rootReducer'
import { resetAlert } from '../../slices/alertSlice'

interface IAlertsProps {}

export const Alerts: React.FC<IAlertsProps> = () => {
  const dispatch = useDispatch()
  const alert = useAlert()

  const { successMsg, errorMsg, infoMsg } = useSelector((state: RootState) => {
    return {
      successMsg: state.alert.successMsg,
      errorMsg: state.alert.errorMsg,
      infoMsg: state.alert.infoMsg,
    }
  }, shallowEqual)
  useEffect(() => {
    const options: AlertCustomOptions = {
      timeout: 15000,
      transition: 'fade',
    }
    if (errorMsg) {
      alert.error(errorMsg, options)
    } else if (successMsg) {
      alert.success(successMsg, options)
    } else if (infoMsg) {
      alert.info(infoMsg, options)
    }

    if (errorMsg || successMsg || infoMsg) {
      dispatch(resetAlert())
    }
    return () => {}
  }, [successMsg, errorMsg, infoMsg, alert, dispatch])

  return null
}
