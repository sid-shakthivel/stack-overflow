import React, { useEffect } from 'react';

import Post from './Post';

import { useAnswers, useUpdateAnswers } from '../contexts/AnswersContext';

export default function Answers() {
    const answers = useAnswers();
    const updateAnswers = useUpdateAnswers();

    useEffect(async () => {
        await updateAnswers();
    }, []);

    return (
        <div>
            {answers.answers.length > 0 ? (
                <div>
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
            ) : (
                <h1 style={{ marginLeft: '2rem' }}>No answers</h1>
            )}
        </div>
    );
}
