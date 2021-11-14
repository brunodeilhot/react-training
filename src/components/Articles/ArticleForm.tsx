import { IDefaultState } from "../../model/interface";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from "react";

const ArticleForm = () => {

    const dispatch = useDispatch();

    const userState = useSelector((state: IDefaultState ) => state.users)
    const storyState = useSelector((state: IDefaultState ) => state.stories)

    const [hideForm, setHideForm] = useState(true)
    
    const date = new Date();

    const values = {
        username: '',
        avatar: '',
        title: '',
        story: '',
    }

    function findUser(value: any) {
        if (userState.find((user: any) => user.name.toLocaleLowerCase() === value.toLocaleLowerCase())) {
            const userData = userState.filter((user: any) => user.name.toLocaleLowerCase() === value.toLocaleLowerCase());
            const user = {...userData[0]};
            return user
        } else {
            return false
        }
    }

    const handleAvatar = (e: any) => {
        const avatar = findUser(e.target.value);
        if (avatar) {
            values.avatar = avatar.picture
            return
        }
        return
    }

    function newUserID() {
        return userState.length + 1
    }

    function newStoryID() {
        return storyState.length === 0 ? 1 : storyState[0].id + 1
    }

    function handleFormState() {
        setHideForm(hideForm ? false : true);
    }

    return (
        <Formik
            initialValues={values}
            validationSchema={Yup.object({
                username: Yup.string()
                    .min(2, 'Must be at least 2 characters long')
                    .max(15, 'Must be 15 characters or less')
                    .required('Username is required'),
                avatar: Yup.string().url('Avatar must be a valid URL'),
                title: Yup.string()
                    .min(5, 'Must be at least 5 characters')
                    .max(50, 'Must be 50 characters or less')
                    .required('Title is required'),
                story: Yup.string()
                    .min(30, 'Must be 30 characters or more')
                    .required('Story is required'),
            })}
            onSubmit={(values, { setSubmitting, resetForm }) => {
                setTimeout(() => {

                    const user = findUser(values.username);

                    if(user) {
                        dispatch({
                            type: 'ADD_STORY',
                            story: {
                                id: newStoryID(),
                                title: values.title,
                                author: user.id,
                                story: {story: values.story},
                                created: date,
                                edited: date
                            }
                        })
                    } else {
                        dispatch({
                            type: 'CREATE_USER_AND_STORY',
                            user: {
                                id: newUserID(),
                                name: values.username,
                                picture: values.avatar === '' ? 'https://brunodeilhot.github.io/Astrology/assets/background.png' : values.avatar,
                                joined: date
                            },
                            story: {
                                id: newStoryID(),
                                title: values.title,
                                author: newUserID(),
                                story: {story: values.story},
                                created: date,
                                edited: date
                            }
                        })
                    }
                    setSubmitting(false);
                    handleFormState();
                    resetForm();
                }, 400);
            }}
        >
            {({ isSubmitting, setFieldValue }) => (
                <div className="article-form-group">

                    <div className="article-header">
                    <h2>Create a story</h2>
                    <button onClick={handleFormState}><i className={hideForm ? 'gg-chevron-down' : 'gg-chevron-up'}></i></button>
                    </div>
                    {hideForm ? null : 
                        <Form className="article-form">
                            <div className="row">
                                <div className="col-2-30">
                                    <label htmlFor="username">Username</label>

                                    <Field name="username">
                                        {({field, meta: { touched, error }}: { field: any, meta: any}) => 
                                        <input onKeyUp={(e: any) => { handleAvatar(e); setFieldValue('avatar', values.avatar, true) }} placeholder="Your name is.." type="text" className={touched && error ? "input error-border" : "input"} {...field} />
                                        }
                                    </Field>
                                    <ErrorMessage className="error-message" name="username" component="div" />
                                    <label htmlFor="avatar">Avatar</label>
                                    <Field name="avatar">
                                        {({field, meta: { touched, error }}: { field: any, meta: any}) => 
                                            <input placeholder="Link to an image.." type="text" className={touched && error ? "input error-border" : "input"} {...field} />
                                        }
                                    </Field>
                                    <ErrorMessage className="error-message" name="avatar" component="div" />
                                </div>
                                <div className="col-2-70">
                                    <label htmlFor="title">Title</label>
                                    <Field name="title" >
                                        {({field, meta: { touched, error }}: { field: any, meta: any}) => 
                                            <input placeholder="The main subject of your story.." type="text" className={touched && error ? "input error-border" : "input"} {...field} />
                                        }
                                    </Field>
                                    <ErrorMessage className="error-message" name="title" component="div" />
                                    <label htmlFor="story">Story</label>
                                    <Field name="story" >
                                        {({field, meta: { touched, error }}: { field: any, meta: any}) => 
                                            <textarea placeholder="Write to your hearth's delight.." className={touched && error ? "textarea error-border" : "textarea"} {...field} />
                                        }
                                    </Field>
                                    <ErrorMessage className="error-message" name="story" component="div" />
                                </div>
                            </div>
                            <button type="submit" disabled={isSubmitting}>Add Story</button>
                        </Form>
                    }

                </div>
            )}
        </Formik>
    );
}

export default ArticleForm;