import UserContextComponent from '../contexts/UserContext';
import UsersContextComponent from '../contexts/UsersContext';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
    return (
        <UserContextComponent>
            <UsersContextComponent>
                <Component {...pageProps} />
            </UsersContextComponent>
        </UserContextComponent>
    );
}
