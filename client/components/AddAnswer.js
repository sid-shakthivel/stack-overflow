import React from 'react';

import { useForm } from 'react-hook-form';

import { useUpdateAnswers } from '../contexts/AnswersContext';

import errorHandler from '../helpers/errorHandler';
import successHandler from '../helpers/successHandler';
import { requestPostHandler } from '../helpers/requestHandler';

import { ToastContainer } from 'react-toastify';

import styles from '../styles/AddAnswer.module.css';

import 'react-toastify/dist/ReactToastify.css';

export default function AddAnswer({ question }) {
    const { register, handleSubmit, reset } = useForm();
    const updateAnswers = useUpdateAnswers();

    const onSubmit = async (data) => {
        const response = await requestPostHandler('/answer', data);

        response.errors ? errorHandler(response.errors) : clearUp();
    };

    const clearUp = async () => {
        successHandler('Answer Added!');
        reset({});
        await updateAnswers();
    };

    return (
        <React.Fragment>
            <div>
                <h1 className={styles.yourAnswerText}>Your Answer</h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <textarea
                        rows={5}
                        required
                        cols={100}
                        name="message"
                        ref={register}
                    ></textarea>
                    <input
                        type="hidden"
                        name="questionId"
                        value={question._id}
                        ref={register}
                    />
                    <br></br>
                    <button className={styles.addAnswerButton}>Submit</button>
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
