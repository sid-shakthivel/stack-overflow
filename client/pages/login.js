import { useRouter } from 'next/router';

import * as React from 'react';

import { useForm } from 'react-hook-form';

import Navbar from '../components/Navbar';
import { useUpdateUser } from '../contexts/UserContext';

import errorHandler from '../helpers/errorHandler';
import { requestPostHandler } from '../helpers/requestHandler';

import { ToastContainer } from 'react-toastify';

import styles from '../styles/Auth.module.css';

import 'react-toastify/dist/ReactToastify.css';

export default function Login(props) {
    const Router = useRouter();
    const { register, handleSubmit } = useForm();
    const updateUser = useUpdateUser();

    const onSubmit = async (data) => {
        const response = await requestPostHandler('/login', data);

        response.errors ? errorHandler(response.errors) : cleanUp();
    };

    const cleanUp = async () => {
        Router.push('/');
        await updateUser();
    };

    return (
        <React.Fragment>
            <Navbar />
            <div className={styles.mainContainer}>
                <div>
                    <form
                        className={styles.form}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <svg
                            width="3em"
                            height="3em"
                            viewBox="0 0 32 37"
                            fill="none"
                        >
                            <path
                                d="M26 33v-9h4v13H0V24h4v9h22z"
                                fill="#BCBBBB"
                            ></path>
                            <path
                                d="M21.5 0l-2.7 2 9.9 13.3 2.7-2L21.5 0zM26 18.4L13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5zM9.1 15.2l15 7 1.4-3-15-7-1.4 3zm14 10.79l.68-2.95-16.1-3.35L7 23l16.1 2.99zM23 30H7v-3h16v3z"
                                fill="#F48024"
                            ></path>
                        </svg>
                        <p>
                            <b>Username</b>
                        </p>
                        <input
                            id="username"
                            type="text"
                            ref={register}
                            required
                            name="username"
                        ></input>
                        <p>
                            <b>Password</b>
                        </p>
                        <input
                            id="password"
                            type="password"
                            ref={register}
                            name="password"
                            required
                        ></input>
                        <button type="submit" className={styles.signupButton}>
                            Login
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </React.Fragment>
    );
}
