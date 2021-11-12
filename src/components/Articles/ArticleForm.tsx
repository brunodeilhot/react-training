import { IDefaultState } from "../../model/interface";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ArticleForm = () => {

    const dispatch = useDispatch();

    const userState = useSelector((state: IDefaultState ) => state.users)
    const storyState = useSelector((state: IDefaultState ) => state.stories)
    
    const date = new Date();

    const values = {
        username: '',
        avatar: '',
        title: '',
        story: '',
    }

    function findUser(value: any) {
        if (userState.find((user: any) => user.name === value)) {
            const userData = userState.filter((user: any) => user.name === value);
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

    return (
        <Formik
            initialValues={values}
            validationSchema={Yup.object({
                username: Yup.string()
                    .max(15, 'Must be 15 characters or less')
                    .required('Username is required'),
                avatar: Yup.string().url(),
                title: Yup.string()
                    .max(50, 'Must be 50 characters or less')
                    .required('Title is required'),
                story: Yup.string()
                    .min(100, 'Must be 100 characters or more')
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
                            type: 'ADD_USER',
                            user: {
                                id: newUserID(),
                                name: values.username,
                                picture: values.avatar = null ? 'https://brunodeilhot.github.io/JS-training/Memoria/assets/banana.png' : values.avatar,
                                joined: date
                            }
                        })
                        dispatch({
                            type: 'ADD_STORY',
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
                    resetForm();
                }, 400);
            }}
        >
            {({ isSubmitting, setFieldValue }) => (
                <Form className="article-form">
                    <h2>Create a story</h2>
                    <div className="row">
                        <div className="col-2-30">
                            <label htmlFor="username">Username</label>
                            <Field onKeyUp={(e: any) => {handleAvatar(e); setFieldValue('avatar', values.avatar, true)}} className="input" type="text" name="username" placeholder="Your name is.." />
                            <ErrorMessage className="error-message" name="username" component="div" />
                            <label htmlFor="avatar">Avatar</label>
                            <Field className="input" type="text" name="avatar" placeholder="Link to an image.." />
                            <ErrorMessage className="error-message" name="avatar" component="div" />
                        </div>
                        <div className="col-2-70">
                            <label htmlFor="title">Title</label>
                            <Field className="input" type="text" name="title" placeholder="The main subject of your story.." />
                            <ErrorMessage className="error-message" name="title" component="div" />
                            <label htmlFor="story">Story</label>
                            <Field className="textarea" name="story" as="textarea" placeholder="Write to your hearth's delight.." />
                            <ErrorMessage className="error-message" name="story" component="div" />
                        </div>
                    </div>
                    <button type="submit" disabled={isSubmitting}>Add Story</button>
                </Form>
            )}
        </Formik>
    );
}

export default ArticleForm;