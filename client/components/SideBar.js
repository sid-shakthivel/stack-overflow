import { useState, useEffect } from 'react';

import styles from '../styles/SideBar.module.css';

export default function SideBar() {
    const [currentLink, changeCurrentLink] = useState('home');

    useEffect(() => {
        const path = window.location.pathname;
        path === '/about' ? changeCurrentLink('about') : changeCurrentLink('/');
    }, []);

    return (
        <div className={styles.links}>
            <span
                className={
                    currentLink !== 'about' ? styles.currentLink : styles.link
                }
                name="home"
            >
                <span>
                    <span>
                        <svg
                            style={{ marginRight: '5px' }}
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M8 0a8 8 0 100 16A8 8 0 008 0zM7 14.32a6.4 6.4 0 01-5.23-7.75L6 10.68v.8c0 .88.12 1.32 1 1.32v1.52zm5.72-2c-.2-.66-1-1.32-1.72-1.32h-1V9c0-.44-.56-1-1-1H5V6h1c.44 0 1-.56 1-1V4h2c.88 0 1.4-.72 1.4-1.6v-.33a6.4 6.4 0 012.32 10.24v.01z"
                                fill="currentColor"
                            ></path>
                        </svg>
                    </span>
                    <a href="/">Stack Overflow</a>
                </span>
            </span>
            <p className={styles.gap}></p>
            <span
                className={
                    currentLink === 'about' ? styles.currentLink : styles.link
                }
                name="about"
            >
                <a href="/about">About</a>
            </span>
        </div>
    );
}
