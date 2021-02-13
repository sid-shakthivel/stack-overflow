import { createContext, useContext, useState } from 'react';

import { requestGetHandler } from '../helpers/requestHandler';

const CommentsContext = createContext();
const CommentsUpdateContext = createContext();

export const useComments = () => {
    return useContext(CommentsContext);
};

export const useUpdateComments = () => {
    return useContext(CommentsUpdateContext);
};

export default function CommentsContextComponent({ children }) {
    const [comments, changeComments] = useState({ comments: [] });

    const updateComments = async (data) => {
        const response = data.answer
            ? await requestGetHandler(`/answer/comment/${data.postId}`)
            : await requestGetHandler(`/question/comment/${data.postId}`);

        changeComments((previousState) => ({
            ...previousState,
            comments: response.comments,
        }));
    };

    return (
        <CommentsContext.Provider value={comments}>
            <CommentsUpdateContext.Provider value={updateComments}>
                {children}
            </CommentsUpdateContext.Provider>
        </CommentsContext.Provider>
    );
}
