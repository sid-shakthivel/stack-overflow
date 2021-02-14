import { useState } from 'react';

import { useUpdateAnswers } from '../contexts/AnswersContext';

import styles from '../styles/Sort.module.css';

export default function SortQuestions() {
    const [currentButton, changeCurrentButton] = useState({ button: 'votes' });

    const updateAnswers = useUpdateAnswers();

    const onUpdateQuestions = async (e) => {
        const query = e.target.name;
        changeCurrentButton((oldState) => {
            return { ...oldState, button: query };
        });
        await updateAnswers(`${query}`);
    };

    return (
        <div className={styles.sortQuestionsContainer}>
            <button
                className={
                    currentButton.button === 'votes'
                        ? styles.specialSortButton
                        : styles.sortButton
                }
                name="votes"
                onClick={onUpdateQuestions}
            >
                Votes
            </button>
            <button
                className={
                    currentButton.button === 'newest'
                        ? styles.specialSortButton
                        : styles.sortButton
                }
                name="newest"
                onClick={onUpdateQuestions}
            >
                Newest
            </button>
            <button
                className={
                    currentButton.button === 'oldest'
                        ? styles.specialSortButton
                        : styles.sortButton
                }
                name="oldest"
                onClick={onUpdateQuestions}
            >
                Oldest
            </button>
        </div>
    );
}
