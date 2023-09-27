import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const message= notification[0]
  const msgType= notification[1]
  // console.log(message)
  // console.log(msgType)

  if (message === null) {
    return null
  }

  if (msgType!== '') {
    return (
      <div className= {msgType}>
        {message}
      </div>
    ) }
  else {
    return (
      <div>
        {message}
      </div>
    ) }

}

export default Notification