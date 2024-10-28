import React from 'react'
import Navtop from './navtop'
import './home.css'
import Content from './content'

type Props = {}

const Home = (props: Props) => {
  return (
    <div className="home" >
      <Navtop option1='About' link1='/' option2='Sign up' link2='/signup' />
      <Content/>
    </div>
  )
}

export default Home