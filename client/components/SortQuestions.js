import { useState } from 'react';

import { useUpdateQuestions } from '../contexts/QuestionsContext';

import styles from '../styles/SortQuestions.module.css';

export default function SortQuestions() {
    const [currentButton, changeCurrentButton] = useState({ button: 'votes' });

    const updateQuestions = useUpdateQuestions();

    const onUpdateQuestions = async (e) => {
        const query = e.target.name;
        changeCurrentButton((oldState) => {
            return { ...oldState, button: query };
        });
        await updateQuestions(`/${query}`);
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
