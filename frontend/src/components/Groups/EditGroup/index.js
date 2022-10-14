import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';


// thunk
import { editGroup } from '../../../store/group';
import { getOneGroupThunk } from '../../../store/group';
import './EditGroup.css'



function EditGroupForm(){
  

    const history = useHistory();
    const { groupId } = useParams();
    const dispatch = useDispatch();

    
    const group = useSelector((state) => state.groups[groupId]);
console.log(group.city)
    const sessionUser = useSelector((state) => state.session.user);
    const [name, setName] = useState(group && group.name);
    const [about, setAbout] = useState(group && group.about)
    const [type, setType] = useState(group && group.type)
    const [city, setCity] = useState(group && group.city)
    const [state, setState] = useState(group && group.state);
    const [isPrivate, setPrivate] = useState(group && group.private);
    const [errors, setErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);
    const [loaded, setIsLoaded] = useState(false)

    //console.log(name)
    useEffect(() => {
        dispatch(getOneGroupThunk(groupId))
            .then(() => setIsLoaded(true))
    }, [dispatch, groupId])

    const submit = async (e) => {
        e.preventDefault();
        setErrors([]);
        setSubmitted(true);
        const payload = {
            name: name,
            about: about,
            type: type,
            private: isPrivate,
            city: city,
            state: state,
            
        };
        return dispatch(editGroup(groupId, payload))
        .then(() => {
            history.push(`/groups/${groupId}`);
        })
        .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) {
                setErrors(data.errors);
            }
        })
}





return (
    <div className='main'>
        <div className='flavorText'>
    <h1>Welcome {sessionUser.firstName}! </h1>
    <h3>feel free to alter {group.name} as you see fit</h3>
        </div>
    
        
    

    <form onSubmit={submit}>
        
        <input></input>

   


    </form>


    </div>


)



}


export default EditGroupForm