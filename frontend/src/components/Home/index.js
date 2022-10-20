// I am the Splash Page
// I live in the splash folder

// pictures begin here
import online_events from './splashImages/online_events.svg'
import ticket from './splashImages/ticket.svg'
import joinGroup from './splashImages/joinGroup.svg'
import handsup from './splashImages/handsup.svg'
import download from './splashImages/download.jpg'

// end of pictures
import './SplashMain.css'

// router crud

import {Link} from 'react-router-dom'


import React from 'react'



export default function Home() {
  return (
    <div className='out'>
    <div className='main'>
    <div className='homeGroupOne'>
      <div className='firstText'>
        <h1>Celebrating 1 month of semi-real connections on Meatup</h1>
        <p>Whatever you’re looking to do this year, Meatup can help. For 1 month, people have turned to Meatup to meet people, make friends, find support, grow a business, and explore their interests. One and sometimes two events are happening every day—join the fun.</p>
      </div>
      <div className='firstPic'>
        <img id='firstpic' src={online_events} alt='random clip art images'/>
      </div>
    </div>



    <div className='zweiteHaupt'>
      <h3>How Meatup Works</h3>
      <p>Meet new people who share your interests through online and in-person events. It’s free to create an account.</p>
    
    <div className='dreiteHauptContainer'>
      <div className='dreiteHauptInsides'>
        <img id='secondpic' src={handsup} alt='some hands with the python coding language emblem in the background.'/>
        
          <Link id='linkOne' to='/groups/all'>Look for Groups</Link>
        
      <p>Do what you love, meet others who love it, find your community. The rest is history!</p>
      </div>
      <div className='dreiteHauptInsides'>
          <img src={ticket} alt='some tickets that honestly look like envelopes' />
          <Link id='linkTwo' to='/events/all'>Look for Events</Link>
          <p>Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</p>
      </div>
      <div className='dreiteHauptInsides'>
        
        <img src={joinGroup} alt='pictures of people. look like grey aliens'/>
        <Link id='linkThree' to='/groups/new'>start a group!</Link>
        <p>You don’t have to be an expert to gather people together and explore shared interests.</p>

      </div>
      </div>
    </div>
    </div>

    </div>
  )
}

