import Layout from '../layouts/Layout.js';

import Header from '../components/Header';
import SortQuestions from '../components/SortQuestions';
import Questions from '../components/Questions';

import QuestionsContextComponent from '../contexts/QuestionsContext';

// import styles from '../styles/Home.module.css';

export default function Home({ questions }) {
    return (
        <Layout>
            <section>
                <QuestionsContextComponent>
                    <Header question={null} mainPage={true}>
                        <SortQuestions />
                    </Header>

                    <Questions />
                </QuestionsContextComponent>
            </section>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    let questions = await fetch('http://localhost:8080/question/all/votes');
    questions = await questions.json();
    return {
        props: questions,
    };
}
