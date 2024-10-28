import React from 'react'

type Props = {
    color:string,
    imgscr:string,
    totalno:number,
    totalnumberof:string
}

const Countcard = (props: Props) => {
  return (
    <div className='countcard' style={{backgroundColor:props.color}}>
        <div className="countcardtop">
            <h2>{props.totalno}</h2>
            <img src={props.imgscr} alt="" />
        </div>
        {props.totalnumberof}

        
    </div>
  )
}

export default Countcard