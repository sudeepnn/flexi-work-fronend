import React from 'react'
import { Link } from 'react-router-dom'
import userimg from '../resources/user.jpg'
import './admin.css'
type Props = {}

const usernav = (props: Props) => {
  return (
    <div className="nav">
        <div className="navleft">

            <Link className='link' to=""><div className='username'>Sudeep</div></Link>
            <Link className='userimg' to=""> <img src={userimg} alt=""  /> </Link>
            
        </div>
    </div>
  )
}
export default usernav