// I am the Splash Page
// I live in the splash folder

// pictures begin here
import online_events from '../../images/online_events.svg'
import ticket from '../../images/ticket.svg'
import joinGroup from '../../images/joinGroup.svg'
import handsup from '../../images/handsUp.svg'
// end of pictures

import React from 'react'

export default function Splash() {
  return (
    <>
    <div className='ersteHaupt'>
      <div className='erseteText'>
        <h1>Celebrating 20 years of real connections on Meatup</h1>
        <p>Whatever you’re looking to do this year, Meatup can help. For 20 years, people have turned to Meatup to meet people, make friends, find support, grow a business, and explore their interests. Thousands of events are happening every day—join the fun.</p>
      </div>
      <div className='ersteBild'>
        <img id='firstpic' src={online_events} alt='random clip art images'/>
      </div>
    </div>
    <div className='zweiteHaupt'>
      <h3>How Meatup Works</h3>
      <p>Meet new people who share your interests through online and in-person events. It’s free to create an account.</p>
    </div>
    <div className='dreiteHauptContainer'>
      <div className='dreiteInsides'>
        <img id='secondpic' src={handsup} alt='some hands with the python coding language emblem in the background.'/>
      <p>Do what you love, meet others who love it, find your community. The rest is history!</p>
      </div>
      <div className='dreiteHauptInsides'>
      <img src={ticket} alt='some tickets that honestly look like envelopes' />
        <p>Events are happening on just about any topic you can think of, from online gaming and photography to yoga and hiking.</p>
      </div>
      <div className='dreiteHauptInsides'>
      <img src={joinGroup} alt='pictures of people. look like grey aliens'/>
        <p>You don’t have to be an expert to gather people together and explore shared interests.</p>

      </div>
    </div>


    
    
    
    </>
  )
}
