import { createContext, useContext, useState } from 'react';

import { requestGetHandler } from '../helpers/requestHandler';

const UsersContext = createContext();
const UsersUpdateContext = createContext();

export const useUsers = () => {
    return useContext(UsersContext);
};

export const useUpdateUsers = () => {
    return useContext(UsersUpdateContext);
};

export default function UsersContextComponent({ children }) {
    const [users, changeUsers] = useState({ users: [] });

    const updateUsers = async () => {
        const response = await requestGetHandler('/user/all');
        changeUsers((oldState) => {
            return { ...oldState, users: response.users };
        });
    };

    return (
        <UsersContext.Provider value={users}>
            <UsersUpdateContext.Provider value={updateUsers}>
                {children}
            </UsersUpdateContext.Provider>
        </UsersContext.Provider>
    );
}
