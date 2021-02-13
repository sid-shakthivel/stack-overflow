import { useRouter } from 'next/router';

import styles from '../styles/Header.module.css';

export default function Header({ question, mainPage, children }) {
    const Router = useRouter();

    const addQuestionHandler = () => {
        Router.push('/AddQuestion');
    };

    const updateQuestions = async () => {
        if (question === null) {
            // Do stuff
        }
    };

    return (
        <div
            className={styles.headerContainer}
            style={{ height: mainPage ? '22%' : '11%' }}
        >
            <div className={styles.headerTextContainer}>
                {mainPage ? (
                    <h1 className={styles.title}>All Questions</h1>
                ) : (
                    <h1 className={styles.title}>{question.title}</h1>
                )}
                <button
                    className={styles.addQuestionButton}
                    onClick={addQuestionHandler}
                >
                    Ask Question
                </button>
            </div>
            {children}
        </div>
    );
}
