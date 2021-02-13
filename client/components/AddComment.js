import { useForm } from 'react-hook-form';

import { useUpdateComments } from '../contexts/CommentsContext';

import errorHandler from '../helpers/errorHandler';
import successHandler from '../helpers/successHandler';

import styles from '../styles/AddComment.module.css';

export default function AddComponent({ data }) {
    const { register, handleSubmit } = useForm();
    const updateComments = useUpdateComments();

    const onAddComment = async (data) => {
        const response = data.answer
            ? await requestPostHandler('/answer/comment', data)
            : await requestPostHandler('/question/comment', data);

        response.errors ? errorHandler(response.errors) : clearUp();
    };

    const clearUp = async () => {
        successHandler('Answer Added!');
        reset({});
        await updateComments();
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
                    value={data.postId}
                    ref={register}
                />

                <button className={styles.addCommentButton}>Add Comment</button>
            </form>
        </div>
    );
}
