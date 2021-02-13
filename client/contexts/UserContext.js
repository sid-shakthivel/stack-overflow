import { createContext, useContext, useState } from 'react';

import { requestGetHandler } from '../helpers/requestHandler';

const UserContext = createContext();
const UserUpdateContext = createContext();

export const useUser = () => {
    return useContext(UserContext);
};

export const useUpdateUser = () => {
    return useContext(UserUpdateContext);
};

export default function UserContextComponent({ children }) {
    const [user, changeUser] = useState({ username: '' });

    const updateUser = async () => {
        const response = await requestGetHandler('/user');

        changeUser((oldState) => {
            return {
                ...oldState,
                username: response.username ? response.username : '',
            };
        });
    };

    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={updateUser}>
                {children}
            </UserUpdateContext.Provider>
        </UserContext.Provider>
    );
}
