import { useForm } from 'react-hook-form';

import { useUpdateComments } from '../contexts/CommentsContext';

import errorHandler from '../helpers/errorHandler';
import successHandler from '../helpers/successHandler';
import { requestPostHandler } from '../helpers/requestHandler';

import styles from '../styles/AddComment.module.css';

export default function AddComponent({ componentData }) {
    const { register, handleSubmit, reset } = useForm();
    const updateComments = useUpdateComments();

    const onAddComment = async (data) => {
        const response = componentData.answer
            ? await requestPostHandler('/answer/comment', data)
            : await requestPostHandler('/question/comment', data);

        response.errors ? errorHandler(response.errors) : clearUp();
    };

    const clearUp = async () => {
        successHandler('Comment Added!');
        reset({});
        await updateComments(componentData);
    };

    return (
        <div className={styles.addCommentContainer}>
            <form onSubmit={handleSubmit(onAddComment)}>
                <input
                    className={styles.addCommentField}
                    placeholder="Add Comment"
                    name="comment"
                    ref={register}
                />
                <input
                    type="hidden"
                    name="postId"
                    value={componentData.postId}
                    ref={register}
                />

                <button className={styles.addCommentButton}>Add Comment</button>
            </form>
        </div>
    );
}
