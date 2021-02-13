import React, { useEffect } from 'react';

import Comment from '../components/Comment';
import AddComment from '../components/AddComment';

import { useComments, useUpdateComments } from '../contexts/CommentsContext';

export default function Comments({ data }) {
    const comments = useComments();
    const updateComments = useUpdateComments();

    useEffect(async () => {
        await updateComments(data);
    }, []);

    return (
        <React.Fragment>
            <div>
                {comments.comments.length > 0 ? (
                    comments.comments.map((comment) => (
                        <Comment
                            key={Math.random()}
                            answer={data.answer}
                            comment={comment}
                        />
                    ))
                ) : (
                    <p></p>
                )}
            </div>
            <div>
                <AddComment data={data} />
            </div>
        </React.Fragment>
    );
}
