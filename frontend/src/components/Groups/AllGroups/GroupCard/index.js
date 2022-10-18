import React from 'react';
import { NavLink } from 'react-router-dom';



// css
import './groupCard.css'

function GroupCard({group}) {


   
    

    return (
       <NavLink className='navGroup' to={`/groups/${group.id}/about`}>
        <div className='outerDiv'>
            <div className='photoPart'>
                <img id='photo'src={group.previewImage[0].url} />
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