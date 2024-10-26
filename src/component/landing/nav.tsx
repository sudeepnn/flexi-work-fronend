import React from 'react'
import { Link } from 'react-router-dom'
import './nav.css'
type navprop={
  option1:string,
  link1:string,
  option2:string,
  link2:string
}

const nav = (props: navprop) => {
  return (
    <div className="nav">
        <div className="navleft">
          <Link className='link' to={props.link1}> <div className='aboutbtn' >{props.option1}</div>
          </Link>
            <Link className='link' to={props.link2}><div className='signupbtn'>{props.option2}</div></Link>
            
        </div>
    </div>
  )
}

export default nav