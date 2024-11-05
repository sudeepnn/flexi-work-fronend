import React from 'react'
import './eventcard.css'
type Props = {
    heading: string;
    imgsrc: string; // Image source URL
    color: string;
}

const NoBookingCard = (props: Props) => {
  return (
    <div className='noparking' style={{ backgroundColor: props.color }}>
        <img src={props.imgsrc} alt="" />
        <h3>{props.heading}</h3>
    </div>
  )
}

export default NoBookingCard