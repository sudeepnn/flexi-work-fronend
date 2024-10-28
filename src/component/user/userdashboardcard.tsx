import React from 'react'
import './userdashboardcard.css'
type Props = {
    heading:string,
    color:string,
    imgsrc:string
}

const Userdashboardcard = (props: Props) => {
  return (
    <div className='userdashboardcard' style={{backgroundColor:props.color}}>
        <div className="userdashboardcardtop">
        <h2>{props.heading}</h2>
            <img src={props.imgsrc} alt="" />
        </div>
        
        <p>Parking slot: P1</p>
        <p>Start Time: 29-07-2024</p>
        <p>End Time: 29-07-2024</p>
    </div>
  )
}

export default Userdashboardcard