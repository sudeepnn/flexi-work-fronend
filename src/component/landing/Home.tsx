import React from 'react'
import Navtop from './navtop'
import './home.css'
import Content from './content'
import AboutUs from './Aboutus'
import gmail from '../resources/gmail.png'
import git from '../resources/github.png'
import insta from '../resources/instagram.png'
import fb from '../resources/facebook.png'
import whtsapp from '../resources/whatsapp.png'
type Props = {}

const Home = (props: Props) => {
  return (
    <div className="home" >
      <Navtop option1='About' link1='/' option2='Login' link2='/login' />
      <Content/>
      <AboutUs/>
      <div className="contactuscon">
        <h2>Contact Us</h2>
        <div className="cotcon">
          <a href="mailto:flexiworkproject@gmail.com"><img src={gmail} alt="" /></a>
          
        
          <a href="https://github.com/sudeepnn/Flexi-Work"><img src={git} alt="" /></a>
          <a href="https://github.com/sudeepnn/Flexi-Work"><img src={insta} alt="" /></a>
          <a href=""><img src={whtsapp} alt="" /></a>
          <a href=""><img src={fb} alt="" /></a>
          
        </div>
        
      </div>
    </div>
  )
}

export default Home