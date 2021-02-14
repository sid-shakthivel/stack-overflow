import { useRouter } from 'next/router';

import React, { useEffect } from 'react';

import Layout from '../../layouts/Layout';

import Header from '../../components/Header';
import Post from '../../components/Post';
import AddAnswer from '../../components/AddAnswer';
import Answers from '../../components/Answers';

import AnswersContextComponent from '../../contexts/AnswersContext';

import styles from '../../styles/Question.module.css';

export default function Question({ question }) {
    const Router = useRouter();

    useEffect(() => {
        if (question !== null) {
            return;
        }
        Router.push('/');
    }, [question]);

    return (
        <Layout>
            <AnswersContextComponent questionId={question._id}>
                <Header question={question} mainPage={false} />
                <Post post={question} answer={false} />
                <div className={styles.answersTextBreak}></div>
                {/* <span className={styles.answersText}>Answers</span> */}
                <Answers />
                <AddAnswer question={question} />
            </AnswersContextComponent>
        </Layout>
    );
}

export async function getServerSideProps({ params }) {
    let question = await fetch(`http://localhost:8080/question/${params.id}`);
    question = await question.json();

    if (Object.keys(question).length === 0) {
        question = null;
    }

    return {
        props: { question: question.question },
    };
}
