import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
 
 
// thunk
import { editGroupThunk } from '../../../store/group';
import { getOneGroupThunk } from '../../../store/group';
import { deleteGroupThunk } from '../../../store/group';
 
 
import './EditGroup.css'
 
 
 
function EditGroupForm(){
 
    const { groupId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

     const group = useSelector((state) => state.groups[groupId]);
     const sessionUser = useSelector((state) => state.session.user);
    
 
   
   

 
    const [name, setName] = useState(group && group.name);
    const [about, setAbout] = useState(group && group.about)
    const [type, setType] = useState(group && group.type)
    const [city, setCity] = useState(group && group.city)
    const [state, setState] = useState(group && group.state);
    const [isPrivate, setPrivate] = useState(group && group.private);
    const [errors, setErrors] = useState([]);
    const [loaded, setIsLoaded] = useState(false)
    const [submitted, setSubmitted] = useState(false)
 
   

 
    useEffect(() => {
        dispatch(getOneGroupThunk(groupId))
            .then(() => setIsLoaded(true))
    }, [dispatch, groupId])
 
   
 
 
 
    const submit = async (e) => {
        e.preventDefault();
        setErrors([]);
        if (errors.length > 0) return
        const payload = {
           name,
           about,
           type, 
           city,
           state,
           private: isPrivate
           
        };

        
 
      
        const data = dispatch(editGroupThunk(payload, groupId))
       
        history.push(`/groups/${groupId}/about`)
}
 
 
const deleteGroup = e => {
    e.preventDefault()
    setIsLoaded(false)
    dispatch(deleteGroupThunk(group.id)).then(() => history.push('/groups/all'))
 
 
}
 
 
 
 
 
 
 
return (
    <div className='main'>
        <div className='flavorText'>
    <h1>Welcome {sessionUser.firstName}! </h1>
    <h3>feel free to alter your group as you see fit</h3>
        </div>
       
       <form onSubmit={submit}>
       <ul className='error'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
 
                        <div className='inputDiv'>
                            <label className='label'>name</label>
                            <input
                                className='input-box'
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='field'>
                            <label className='label'>About</label>
                            <input
                                className='input-box'
                                type='text'
                                value={about}
                                onChange={e => setAbout(e.target.value)}
                                required
                            />
                        </div>
                        <div className='field'>
                            <label className='label'>Type</label>
                            <select
                                  className = 'dropdown-option'
                                value={type}
                                onChange={e => setType(e.target.value)}
                                required
                            >
                                <option   className = 'dropdown-option' value={'In person'}>In person</option>
                                <option   className = 'dropdown-option' value={'Online'}>Online</option>
                            </select>
                        </div>
                        <div className='field'>
                            <label className='label'>City</label>
                            <input
                                className='input-box'
                                type='text'
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className='field'>
                            <label className='label'>State</label>
                            <input
                                className='input-box'
                                type='text'
                                value={state}
                                onChange={e => setState(e.target.value)}
                                required
                            >
                            </input>
                        </div>
                        <div className='field'>
                            <label className='label'>Group Privacy</label>
                            <select
                                className = 'dropdown-option'
                                type='text'
                                value={isPrivate}
                                onChange={e => setPrivate(e.target.value)}
                                required
                            >
                                <option className='input-box' value={true}>Private</option>
                                <option className='input-box' value={false}>Public</option>
                            </select>
                        </div>
 
                        <button className='edit-group-button' type='submit'>
                        Submit
                    </button>
                    <h4>DELETE GROUP CAUTION THERE IS NO WAY TO GET IT BACK!</h4>
                    <button onClick={deleteGroup}>DELETE GROUP</button>
 
 
 
 
 
 
       </form>
       
   
 
 
    </div>
 
 
)

}

export default EditGroupForm