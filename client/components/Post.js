import React, { useEffect, useState } from 'react';

import errorHandler from '../helpers/errorHandler';
import { requestPostHandler } from '../helpers/requestHandler';

import Comments from '../components/Comments';

import CommentsContextComponent from '../contexts/CommentsContext';

import { ToastContainer } from 'react-toastify';

import styles from '../styles/Post.module.css';

import 'react-toastify/dist/ReactToastify.css';

export default function Post({ post, answer }) {
    const [votes, changeVotes] = useState({ votes: 0 });

    const data = {
        postId: post._id,
        answer: false,
    };

    (() => {
        if (answer === true) {
            data.postId = post.answerId._id;
            data.answer = true;
        }
    })();

    useEffect(async () => {
        await updateVoteState();
    }, []);

    const onUpVote = async () => {
        const response = await requestPostHandler('/upVote', data);
        response.errors
            ? errorHandler(response.errors)
            : await updateVoteState();
    };

    const onDownVote = async () => {
        const response = await requestPostHandler('/downVote', data);
        response.errors
            ? errorHandler(response.errors)
            : await updateVoteState();
    };

    const updateVoteState = async () => {
        const response = await requestPostHandler('/votes', data);
        changeVotes((previousState) => ({
            ...previousState,
            votes: response.totalVotes,
        }));
    };

    return (
        <React.Fragment>
            <div
                className={styles.postContainer}
                style={{
                    paddingBottom: answer ? '1rem !important' : '0.5rem',
                    borderBottom: answer ? '0.5px solid #d6d9dc' : '0.5rem',
                }}
            >
                <div>
                    <div className={styles.votesContainer}>
                        <div
                            className={styles.upArrow}
                            onClick={onUpVote}
                        ></div>
                        <p className={styles.totalVotesText}>{votes.votes}</p>
                        <div
                            className={styles.downArrow}
                            onClick={onDownVote}
                        ></div>
                    </div>
                </div>
                <div>
                    {answer ? (
                        <span>{post.answerId.message}</span>
                    ) : (
                        <span>{post.description}</span>
                    )}
                    <div className={styles.postInformationContainer}>
                        <div style={{ width: '70%' }}></div>
                        {answer ? (
                            <span className={styles.postAsker}>
                                Answered By: {post.answerId.userId.email} on{' '}
                                {post.answerId.date.toString().substring(0, 10)}
                            </span>
                        ) : (
                            <span className={styles.postAsker}>
                                Asked By: {post.userId.email} on{' '}
                                {post.date.toString().substring(0, 10)}
                            </span>
                        )}
                    </div>
                    <div>
                        <CommentsContextComponent>
                            <Comments data={data} />
                        </CommentsContextComponent>
                    </div>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </React.Fragment>
    );
}
