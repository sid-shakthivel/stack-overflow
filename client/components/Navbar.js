import Link from 'next/link';

import { useEffect } from 'react';

import { requestPostHandler } from '../helpers/requestHandler';

import { useUser, useUpdateUser } from '../contexts/UserContext';

import styles from '../styles/Navbar.module.css';

export default function Navbar({ props }) {
    const user = useUser();
    const updateUser = useUpdateUser();

    useEffect(async () => {
        updateUser();
    }, []);

    const logoutHandler = async () => {
        const response = await requestPostHandler('/logout', {});
        window.location.href = `${window.location.href}`;
    };

    return (
        <div className={styles.nav}>
            <span
                style={{ fontWeight: '100' }}
                className={styles.stackOverflowLogo}
            >
                <svg width="2em" height="2em" viewBox="0 0 32 37" fill="none">
                    <path d="M26 33v-9h4v13H0V24h4v9h22z" fill="#BCBBBB"></path>
                    <path
                        d="M21.5 0l-2.7 2 9.9 13.3 2.7-2L21.5 0zM26 18.4L13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5zM9.1 15.2l15 7 1.4-3-15-7-1.4 3zm14 10.79l.68-2.95-16.1-3.35L7 23l16.1 2.99zM23 30H7v-3h16v3z"
                        fill="#F48024"
                    ></path>
                </svg>
                <span>
                    <Link href="/">Stack</Link>
                    <b>
                        <Link href="/">Overflow</Link>
                    </b>
                </span>
            </span>
            {/* <input id="searchBar" placeholder="Search..." /> */}
            <div>
                {user.username ? (
                    <button
                        className={styles.loginLink}
                        onClick={logoutHandler}
                    >
                        Logout
                    </button>
                ) : (
                    <div>
                        <span className={styles.loginLink}>
                            <Link href="/login">Login</Link>
                        </span>
                        <span className={styles.signupLink}>
                            <Link href="/signup">Sign Up</Link>
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
