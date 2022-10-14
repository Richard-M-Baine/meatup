import * as groupActions from "../../../store/group"
import { useSelector, useDispatch} from 'react-redux'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";


import './EditGroup.css'



function EditGroupForm(){

    const history = useHistory();
    const params = useParams()
    const dispatch = useDispatch();

    const  groupId  = 1

    useEffect(()=>{
        dispatch(groupActions.getOneGroupThunk(groupId))
    },[dispatch, groupId])



return (
    <h1>You are terrible</h1>
)



}


export default EditGroupForm