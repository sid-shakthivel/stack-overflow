import React, { useEffect } from 'react';

import Post from './Post';
import SortAnswers from '../components/SortAnswers';

import { useAnswers, useUpdateAnswers } from '../contexts/AnswersContext';

import styles from '../styles/Answers.module.css';

export default function Answers() {
    const answers = useAnswers();
    const updateAnswers = useUpdateAnswers();

    useEffect(async () => {
        await updateAnswers('votes');
    }, []);

    return (
        <div>
            {answers.answers.length > 0 && (
                <div>
                    <div className={styles.answersTextContainer}>
                        <span className={styles.answersText}>Answers</span>
                        <SortAnswers />
                    </div>

                    {answers.answers.map((answer) => {
                        return (
                            <Post
                                post={answer}
                                answer={true}
                                key={Math.random()}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
}
