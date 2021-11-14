import { IStory } from "../../../model/interface";
import moment from "moment";
import api from '../../../api';
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from 'yup'

const Story = ({ id, title, story, created, edited, author}: IStory ) => {

    const dispatch = useDispatch();
    const [deleteConfirm, setDelete] = useState(false);
    const [editConfirm, setEdit] = useState(false);
    const [updatedStory, updateStory] = useState({ title: title, story: story});
    const [titleError, setTitleError] = useState(null);
    const [storyError, setStoryError] = useState(null);


    const date = new Date();

    const schema = Yup.object({
        title: Yup.string()
        .min(5, 'Must be at least 5 characters')
        .max(50, 'Must be 50 characters or less')
        .required('Title is required'),
        story: Yup.string()
        .min(30, 'Must be 30 characters or more')
        .required('Story is required'),
    })

    function handleDeleteClick() {
        setDelete(deleteConfirm === false ? true : false);
    }

    function handleConfirmDelete() {
        api.deleteStory(id)
        dispatch({ type: 'REMOVE_STORY', story: { id: id } });
        setDelete(false);
    }

    function handleEditClick() {

        if (editConfirm === true) {

            schema.validate({
                title: updatedStory.title,
                story: updatedStory.story
            },
            {abortEarly: false}
            )
            .catch(function (err) {
                const errors = err.inner.map((error: any) => ([error.path, error.message]))
                const errorMessages = errors.reduce((obj:any, [k, v]: any) => ({
                   ...obj, [k]: k in obj ? [].concat(obj[k], v) : [v]
                }), {});

                const titleErrors = errorMessages.title ? errorMessages.title.join(' and ').toString() : null;
                const storyErrors = errorMessages.story ? errorMessages.story.join(' and ').toString() : null;
                
                setTitleError(titleErrors);
                setStoryError(storyErrors);
              })
            .then(function (valid) {
                if(valid) {
                    setTitleError(null);
                    setStoryError(null);
                    validatedStory();
                }
                return
            });
            return
        }

        setEdit(editConfirm === false ? true : false);
    }

    function validatedStory() {

        dispatch({ 
            type: 'UPDATE_STORY',
            story: { 
                id: id, 
                title: updatedStory.title, 
                story: {story: updatedStory.story}, 
                created: created, 
                edited: date,
                author: author
            } 
        });


        setEdit(editConfirm === false ? true : false);
    }    

    return(
        <div className="col-2-70 story">
            <div className="title">
                {editConfirm === true
                ? <input type="text" value={updatedStory.title} onChange={({target: { value }}) => updateStory({ title: value, story: updatedStory.story })} className={`input ${titleError === null ? '' : 'error-border'}`}/>
                : <h2>{title}</h2>
                }
                <p className="error-message">{titleError === null ? null : titleError}</p>
            </div>
            <div className="message">
                {editConfirm === true
                ? <textarea value={updatedStory.story} onChange={({target: { value }}) => updateStory({ title: updatedStory.title, story: value})} className={`textarea ${storyError === null ? '' : 'error-border'}`}/>
                : <p>{story}</p>
                }
                <p className="error-message">{ storyError === null ? null : storyError }</p>
            </div>
            <div className="article-footer meta">
                <p>{edited === created ? `Created ${moment(created).fromNow()}` : `Edited ${moment(edited).fromNow()}`} </p>
                <button onClick={handleEditClick} className={`bt bt-left ${editConfirm === true ? 'bt-active' : ''}`}>Edit</button>
                <button onClick={handleDeleteClick} className="bt bt-right">Delete</button>
            </div>
            {deleteConfirm === true 
            ? <div className="delete-confirm">
                <p>Are you sure?</p>
                <div>
                    <button onClick={handleConfirmDelete} className="bt bt-left">Yes</button>
                    <button onClick={() => (setDelete(false))} className="bt bt-right">No</button>
                </div>
            </div>
            : null
            }
        </div>
    )
};

export default Story;