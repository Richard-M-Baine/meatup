import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import './CreateGroup.css';
import { createGroupThunk } from '../../../store/group';
import {createGroupImageThunk} from '../../../store/group'



function CreateGroupForm(){
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector((state) => state.session.user)

    // stuff for form

    const [name,setName] = useState('')
    const [about, setAbout] = useState('')
    const [type, setType] = useState("In Person")
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [preImage, setPreImage] = useState('')
    const [preview, setPreview] = useState(false)
    const [privacy, setPrivacy] = useState(false)
    const [errors, setErrors] = useState([])
    const [submit, setSubmit] = useState(false)
    const [part, setPart] = useState('PART 1')

    const USstates = [
        'AL', 'AK', 'AS', 'AZ', 'AR',
        'CA', 'CO', 'CT', 'DE', 'DC',
        'FM', 'FL', 'GA', 'GU', 'HI',
        'ID', 'IL', 'IN', 'IA', 'KS',
        'KY', 'LA', 'ME', 'MH', 'MD',
        'MA', 'MI', 'MN', 'MS', 'MO',
        'MT', 'NE', 'NV', 'NH', 'NJ',
        'NM', 'NY', 'NC', 'ND', 'MP',
        'OH', 'OK', 'OR', 'PW', 'PA',
        'PR', 'RI', 'SC', 'SD', 'TN',
        'TX', 'UT', 'VT', 'VI', 'VA',
        'WA', 'WV', 'WI', 'WY'
    ];



    // end form stuff

    if (!sessionUser){
        return (
            <div className='containerNoUser'>
                <div className='noUser'>
                    Please log in or sign up to create a group
                </div>


            </div>
        )
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const newGroup = {
            name: name,
            about: about,
            type: type,
            private: privacy,
            city: city,
            state: state
        }
       
       

        const data = await dispatch(createGroupThunk(newGroup))

        const groupImageCreate = await dispatch(createGroupImageThunk(preImage, preview, data.id))

        history.push(`/groups/${data.id}/about`)
    }

           



    return(
           
                <form className='formMain' onSubmit={handleSubmit}>
                       <div className="text">
                    <h2 >
                        {part} OF 5
                    </h2>
                    </div> 

                        {/* part 1 */}

                    {
                        part === 'PART 1' && (
                    <div className="partDiv">
                        <div className="TextContainer">
                            <h2 className="create-group">First, set your group's location</h2>
                            <p className="create-group">Meetup groups meet locally, in person and online. We'll connect you with people in your area, and more can join you online.  </p>
                            <p>You will need to enter a proper state abbreviation to continue.  If your not sure what yours is <a href='https://www.faa.gov/air_traffic/publications/atpubs/cnt_html/appendix_a.html'>feel free to click here</a></p>
                        </div>

                    <div className='secondPart'>
                        <div className='cityDiv'>
                            <label className='label' id='cityLabel' for='city'>City</label>

                            <input
                        className='input'
                        required
                        type='text'
                        onChange={text => setCity(text.target.value)}
                        value={city}
                        maxLength='50'
                        placeholder='enter the city / town'
                        name='city'
                        id='city'>
                            </input>
                        </div>
                            
                     
                        <div className='stateDiv'>
                            <label for='state' className='label'>State</label>
                            <input
                            className='input'
                            required
                             type='text'
                            onChange={text => setState(text.target.value)}
                            value={state}
                             maxLength='50'
                             placeholder='enter the proper state abbreviation'
                            name='city'
                             id='city' />
                        
                        
                         </div>
                         </div>

                        <div className='buttons'>
                             <button className='return' style={{ visibility: 'hidden' }}></button>
                              <button className="default" disabled={city.length < 3 || (!USstates.includes(state.toUpperCase()))} onClick={e => setPart('PART 2')}>Next</button>

                        </div>

                </div>
                        )
                    }


                     {/* part 2 */}

                     {
                        part === 'PART 2' && (
                            <div className='partDiv'>
                                <div className='TextContainer'>
                                    <h2 className="create-group">What will your group's name be?</h2>
                                    <p className="create-group">Choose a name that will give people a clear idea of what the group is about. Feel free to get creative! You can edit this later if you change your mind.</p>
                                </div>
                            
                            <input type='text'
                                className='input'
                                onChange={e => setName(e.target.value)}
                                value={name}
                                maxLength='60'
                                placeholder='enter betweeen 5 and 60 characters'
                                name='name'/>
                                <span className="secondSpan">Character count: {name.length}</span>
                                <span className="secondSpan">Character count: {60 - name.length} remaining</span>

                                <div className="buttons">
                                <button className="return" onClick={e => setPart('PART 1')}>Back</button>
                                <button className="default" disabled={name.length < 5 || name.length > 60} onClick={e => setPart('PART 3')}>Next</button>
                            </div>
                            </div>
                        )
                     }

                     {/* part 3 */}

                     {part === 'PART 3' && (
                        <div className='SpecialpartDiv'>
                            <div className='SpecialTextContainer'>
                            <h2 className="create-group">Now describe what {name} will be about</h2>
                                <p className="create-group"> People will see this when we promote your group, but you'll be able to add to it later, too.</p>
                                <ol>
                                    <li>What's the purpose of the group?</li>
                                    <li>Who should join?</li>
                                    <li>What will you do at your events?</li>
                                </ol>
                            </div>

                            <textarea
                                className='textArea'
                                rows='10'
                                cols='70'
                                onChange={e => setAbout(e.target.value)}
                                value={about}
                                maxLength='1000'
                                placeholder='Please write at least 50 characters and no more than 1000'
                                name='about' />
                            <span className="text14 textcolor-grey">Character count: {about.length}</span>
                            <span className="text14 textcolor-grey">Character count: {1000 - about.length} remaining</span>

                            <div className="buttons">
                                <button className="return" onClick={e => setPart('PART 2')}>Back</button>
                                <button className="default" disabled={about.length < 50 || about.length > 1000} onClick={e => setPart('PART 4')}>Next</button>
                            </div>
                        </div>
                     )    
                     }

                           {/* part 4 */}

                    {
                        part === 'PART 4' && (
                        <div className='SpecialpartDiv'>
                            <div className='TextContainer'>
                                <h2 className="create-group">What type of group will {name} be ?</h2>

                                <p className="create-group">Will this group primarily be In Person or Online?</p>

                                <select className='select' name='type' value={type} onChange={e => setType(e.target.value)} >
                                <option >Enter a value below</option>
                                    <option value="In Person">In Person</option>
                                    <option value="Online">Online</option>
                                </select>
                            
                        
                            <p className="create-group">Will this group be a private or public group?</p>
                            <select className='select' id='specialSelect' name='private' value={privacy} onChange={e => setPrivacy(e.target.value)}>
                            <option >Enter a value below</option>
                                <option value={false} >Public</option>
                                <option value={true} >Private</option>
                            </select>
                            </div>

                            <p className="create-group">Enter the url of an image for your group here</p>
                            <input
                            type='text' 
                            className='url'
                            value={preImage}
                            onChange={(e)=> setPreImage(e.target.value)}
                            />
                            <label>
                            Select if this is a preview image or not:
                            <input type='checkbox' onChange={() => setPreview(!preview)}/> 
                            </label>
                            
                        

                           <div className='buttons'>
                                 <button className="return" onClick={e => setPart('PART 3')}>Back</button>
                                 <button className="default" onClick={e => setPart('PART 5')}>Next</button>
                           </div>


                            </div>
                        )
                    }

                        {/* part 5 */}

                    {
                        part === 'PART 5' && (
                            <div className='partDiv'>
                                <div className='TextContainer'>
                                <h2 className="create-group">Almost done! Just take a minute to <a href='https://help.meetup.com/hc/en-us/sections/360000683791-Community-Guidelines'>review our guidelines </a></h2>
                                <span className="create-group">Meetup is all about helping people live fuller, happier lives—with the help of strong communities. This means that all groups should:</span>
                                <ul>
                                    <li>Provide growth opportunities for members</li>
                                    <li>Encourage real human interactions in person or online</li>
                                    <li>Have a host present at all events</li>
                                    <li>Be transparent about the group's intentions</li>
                                </ul>

                                <span>Once you submit your group, you'll be redirected to your newly created group's page</span>

                            <div className="buttons">
                                <button className="returnend" onClick={e => setPart('PART 4')}>Back</button>
                                <button className="submit" type="submit">{'Agree & Create group'}</button>
                            </div>



                                </div>


                            </div>
                        )
                    }
                     




                        
                        
                    



                </form>
              



    )

}

export default CreateGroupForm