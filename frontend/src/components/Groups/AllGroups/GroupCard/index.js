import React from 'react';
import { NavLink } from 'react-router-dom';



// css
import './groupCard.css'


function GroupCard({group}) {


   
    

    return (
       <NavLink className='navGroup' to={`/groups/${group.id}/about`}>
        <div className='outerDiv'>
            <div className='photoPart'>
                <img id='photo'src={group.previewImage?.length > 0 ? group.previewImage[0].url : ""} 
                style={{ visibility: `${group.previewImage?.length > 0 ? "visible" : "hidden"}` }}
                />

            </div>
            

            <div className='otherStuffDiv'>
                <div className='mainTextGroupAll'>
                    <h2 id='title'>{group.name}</h2>
                    <h4 id='location stuff'>{group.city},{group.state}</h4>
                </div>
                <div id='aboutDivGroupAll'>
                    <p>{group.about}</p>
                    <p>{group.type === 'Online' ? "this group solely meets online" : 'this group meets in person'}</p>
                </div>
                <div id='theRestGroupAll'>{group.numMembers} members • {group.private ? 'Private' : 'Public'}</div>


            </div>


        </div>
       </NavLink>
    )

}




export default GroupCard