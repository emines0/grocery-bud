import React, { useEffect } from 'react'

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 4000)
    return () => clearTimeout(timeout)
  }, [list, removeAlert])
  /*
   * remove alert after 4s
   * removeAlert is default showAlert with show:false and empty type,msg
   */
  return <p className={`alert alert-${type}`}>{msg}</p>
}

export default Alert
