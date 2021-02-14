import React from 'react';

import { useForm } from 'react-hook-form';

import Navbar from '../components/Navbar';

import successHandler from '../helpers/successHandler';
import errorHandler from '../helpers/errorHandler';
import { requestPostHandler } from '../helpers/requestHandler';

import { ToastContainer } from 'react-toastify';

import styles from '../styles/AddQuestion.module.css';

import 'react-toastify/dist/ReactToastify.css';

export default function addQuestion() {
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        const response = await requestPostHandler('/question', data);

        response.errors ? errorHandler(response.errors) : cleanUp();
    };

    const cleanUp = () => {
        successHandler(`Question added!`);
        window.location.href = '/';
    };

    return (
        <React.Fragment>
            <Navbar />
            <div className={styles.mainContainer}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <h1>Add Question</h1>
                    <h3>Title</h3>
                    <input type="text" required name="title" ref={register} />
                    <h3>Body</h3>
                    <textarea
                        type="text"
                        rows={5}
                        required
                        name="description"
                        ref={register}
                    ></textarea>
                    <button className={styles.addQuestionButton}>Submit</button>
                </form>
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
