import { IStory } from "../../../model/interface";
import moment from "moment";
import api from '../../../api';
import { useState } from "react";
import { useDispatch } from "react-redux";

const Story = ({ id, title, story, created, edited}: IStory ) => {

    const dispatch = useDispatch();
    const [deleteConfirm, setDelete] = useState(false);
    const [editConfirm, setEdit] = useState(false);

    function handleDeleteClick() {
        setDelete(deleteConfirm === false ? true : false);
    }

    function handleConfirmDelete() {
        api.deleteStory(id)
        dispatch({ type: 'REMOVE_STORY', payload: id })
        setDelete(false);
    }

    function handleEditClick() {
        setEdit(editConfirm === false ? true : false);
    }

    function handleConfirmEdit() {
        console.log('Save')
    }

    return(
        <div className="col-2-70 story">
            <div className="title">
                <h2>{title}</h2>

            </div>
            <div className="message">
                <p>{story}</p>
            </div>
            <div className="article-footer meta">
                <p>Created {moment(created).fromNow()}</p>
                <button 
                onClick={
                    deleteConfirm === true ? handleConfirmDelete : handleEditClick
                    || editConfirm === true ? handleConfirmEdit : handleEditClick
                } className="bt bt-left">{
                deleteConfirm === false ? 'Edit' : 'Yes'
                || editConfirm === false ? 'Edit' : 'Save'
                }</button>
                <button onClick={handleDeleteClick} className="bt bt-right">{deleteConfirm === false ? 'Delete' : 'No'}</button>
            </div>
            {/* <p>Story edited: {moment(edited).fromNow()}</p> */}
        </div>
    )
};

export default Story;