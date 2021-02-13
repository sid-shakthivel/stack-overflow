import { createContext, useContext, useState } from 'react';

import { requestGetHandler } from '../helpers/requestHandler';

const QuestionsContext = createContext();

const QuestionsUpdateContext = createContext();

export const useQuestions = () => {
    return useContext(QuestionsContext);
};

export const useUpdateQuestions = () => {
    return useContext(QuestionsUpdateContext);
};

export default function QuestionsContextComponent({ children }) {
    const [questions, changeQuestions] = useState({ questions: [] });

    const updateQuestions = async (query) => {
        const response = await requestGetHandler(`/question/all${query}`);
        changeQuestions((oldState) => {
            return { ...oldState, questions: response.questions };
        });
    };

    return (
        <QuestionsContext.Provider value={questions}>
            <QuestionsUpdateContext.Provider value={updateQuestions}>
                {children}
            </QuestionsUpdateContext.Provider>
        </QuestionsContext.Provider>
    );
}
