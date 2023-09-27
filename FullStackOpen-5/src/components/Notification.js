const Notification = ({ message, msgType }) => {
  if (message === null) {
    return null
  }

  return (
    <div className= {msgType}>
      {message}
    </div>
  )
}

export default Notification