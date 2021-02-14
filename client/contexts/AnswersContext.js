import { createContext, useState, useContext } from 'react';

import { requestGetHandler } from '../helpers/requestHandler';

const AnswersContext = createContext();
const AnswersUpdateContext = createContext();

export const useAnswers = () => {
    return useContext(AnswersContext);
};

export const useUpdateAnswers = () => {
    return useContext(AnswersUpdateContext);
};

export default function AnswersContextComponent({ children, questionId }) {
    const [answers, changeAnswers] = useState({ answers: [] });

    const updateAnswers = async (query) => {
        const response = await requestGetHandler(
            `/question/answers/${questionId}/${query}`
        );
        changeAnswers((previousState) => {
            return { ...previousState, answers: response.answers };
        });
    };

    return (
        <AnswersContext.Provider value={answers}>
            <AnswersUpdateContext.Provider value={updateAnswers}>
                {children}
            </AnswersUpdateContext.Provider>
        </AnswersContext.Provider>
    );
}
