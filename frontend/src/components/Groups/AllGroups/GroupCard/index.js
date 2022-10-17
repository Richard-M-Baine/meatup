import React from 'react';
import { NavLink } from 'react-router-dom';
import picture2 from '../../GroupImages/picture2.jpg'
import picture3 from'../../GroupImages/picture3.jpg'
import smilingPicture1 from '../../GroupImages/smilingPicture1.jpg'


// css
import './groupCard.css'

function GroupCard({group}) {

    const array = [picture2, picture3, smilingPicture1]
    const number = Math.random() * (2 - 0)
    const round = Math.round(number)
   
    

    return (
       <NavLink className='navGroup' to={`/groups/${group.id}/about`}>
        <div className='outerDiv'>
            <div className='photoPart'>
                <img src={array[round]} />
            </div>
            

            <div className='otherStuffDiv'>
                <div className='mainText'>
                    <h2 id='title'>{group.name}</h2>
                    <h4 id='location stuff'>{group.city},{group.state}</h4>
                </div>
                <div id='aboutDiv'>
                    <p>{group.about}</p>
                </div>
                <div id='theRest'>{group.numMembers} members • {group.private ? 'Private' : 'Public'}</div>


            </div>


        </div>
       </NavLink>
    )

}




export default GroupCard