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
  const history = useHistory();
    const dispatch = useDispatch();
    const { groupId } = useParams();
   

     const group = useSelector((state) => state.groups[groupId]);
     const sessionUser = useSelector((state) => state.session.user);
    
 
    useEffect(() => {
        dispatch(getOneGroupThunk(groupId))
            .then(() => setIsLoaded(true))
    }, [dispatch])
   
 
    const [name, setName] = useState(group && group.name);
    const [about, setAbout] = useState(group && group.about)
    const [type, setType] = useState(group && group.type)
    const [city, setCity] = useState(group && group.city)
    const [state, setState] = useState(group && group.state);
    const [isPrivate, setPrivate] = useState(group && group.private);
    const [errors, setErrors] = useState([]);
    const [loaded, setIsLoaded] = useState(false)
    const [submitted, setSubmitted] = useState(false)
 console.log(loaded)
   
    useEffect(() => {
        const errors = [];
    
       if (!name?.length) {
          errors.push('Name Required')
        }
        if (about?.length < 50) errors.push('About must be 50 characters or more')
        if (!city?.length) errors.push('City required')
        if (!state?.length) errors.push('State required')
        setErrors(errors)
        }, [name, about, city, state]);
 
   
 
   
 
 
 
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
 
 
 
 
 
 
 
return loaded && (
    <div className='main'>
        <div className='flavorTextGroupDetails'>
    <h1 id='gdh1ft'>Welcome {sessionUser.firstName}! </h1>
    <h3 >feel free to alter your group as you see fit</h3>
        </div>
       
       <form className='groupDetailForm'onSubmit={submit}>
       <ul className='error'>
            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
 
                        <div className='gdinputDiv'>
                            <label className='gdlabel'>Name</label>
                            <input
                                className='gdinput-box'
                                type='text'
                                value={name}
                                onChange={e => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='gdinputDiv'>
                            <label className='gdlabel'>About</label>
                            <textarea
                                className='gdTextArea'
                                rows='4'
                                cols='20'
                                type='text'
                                value={about}
                                onChange={e => setAbout(e.target.value)}
                                required
                            />
                        </div>
                        <div className='gdinputDiv'>
                            <label className='gdlabel'>Type</label>
                            <select
                                className = 'gddropdown-option'
                                value={type}
                                onChange={e => setType(e.target.value)}
                                required
                            >
                                <option   className = 'dropdown-option' value={'In person'}>In person</option>
                                <option   className = 'dropdown-option' value={'Online'}>Online</option>
                            </select>
                        </div>
                        <div className='gdinputDiv'>
                            <label className='gdlabel'>City</label>
                            <input
                                className='gdinput-box'
                                type='text'
                                value={city}
                                onChange={e => setCity(e.target.value)}
                                required
                            />
                        </div>
                        <div className='gdinputDiv'>
                            <label className='gdlabel'>State</label>
                            <input
                                className='gdinput-box'
                                type='text'
                                value={state}
                                onChange={e => setState(e.target.value)}
                                required
                            >
                            </input>
                        </div>
                        <div className='gdinputDiv'>
                            <label className='gdlabel'>Group Privacy</label>
                            <select
                                className = 'gddropdown-option'
                                type='text'
                                value={isPrivate}
                                onChange={e => setPrivate(e.target.value)}
                                required
                            >
                                <option className='gdinput-box' value={true}>Private</option>
                                <option className='gdinput-box' value={false}>Public</option>
                            </select>
                        </div>
 
                        <button className='edit-group-button' type='submit'>
                        Submit
                    </button>
                    <h4>DELETE GROUP CAUTION THERE IS NO WAY TO GET IT BACK!</h4>
                    <button className='deleteGroupEdit' disabled={errors.length > 0}onClick={deleteGroup}>DELETE GROUP</button>
 
 
 
 
 
 
       </form>
       
   
 
 
    </div>
 
 
)

}

export default EditGroupForm