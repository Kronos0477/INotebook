import React from 'react'

const Alerts = (props) => {
  return (
    <div>
      {props.message && <div className="alert alert-primary" role="alert">
 {props.message}
</div>}
    </div>
  )
}

export default Alerts
