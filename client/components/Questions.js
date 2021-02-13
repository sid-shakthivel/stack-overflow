import { useEffect } from 'react';

import { useQuestions, useUpdateQuestions } from '../contexts/QuestionsContext';

import styles from '../styles/Questions.module.css';

export default function Questions() {
    const questions = useQuestions();
    const updateQuestions = useUpdateQuestions();

    useEffect(async () => {
        await updateQuestions('/votes');
    }, []);

    return (
        <div>
            {questions.questions.map((question) => (
                <div className={styles.questionData} key={question._id}>
                    <div>
                        <div className={styles.quickStats}>
                            <p className={styles.quickStatsNumbers}>
                                {question.votes.totalVotes}
                            </p>
                            <p>Votes</p>
                        </div>
                        <div className={styles.quickStats}>
                            <p className={styles.quickStatsNumbers}>
                                {question.answers.length}
                            </p>
                            <p>Answers</p>
                        </div>
                    </div>
                    <div className={styles.mainContent}>
                        <span>
                            <a
                                onClick={() => {
                                    window.location.href = `http://localhost:3000/question/${question._id}`;
                                }}
                            >
                                {question.title}
                            </a>
                        </span>
                        <p>{question.description}</p>
                    </div>
                    <div className={styles.questionFooter}>
                        <p>Asked By: {question.userId.email}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
