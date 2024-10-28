import React from 'react'

type Props = {
    userimg:string,
    username:string,
    floor:string,
    phone:string,
    mail:string,
    manager:string

}

function Employeecard(myprop: Props) {
  return (
    <div className='employeecard' >
        <img src={myprop.userimg} alt=""  />
        <h3>{myprop.username}</h3>
        <p>Floor: {myprop.floor}</p>
        <p>Mail: {myprop.mail}</p>
        <p>Phone: {myprop.phone}</p>
        <p>Manager: {myprop.manager}</p>

    </div>
  )
}

export default Employeecard