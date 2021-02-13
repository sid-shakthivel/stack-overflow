import Head from 'next/head';

import Navbar from '../components/Navbar';
import Sidebar from '../components/SideBar';
import Users from '../components/Users';

import styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Stack Overflow</title>
            </Head>

            <Navbar />

            <main className={styles.main}>
                <section className={styles.annoying2}>
                    <Sidebar />
                </section>
                <section>{children}</section>
                <section className={styles.annoying2}>
                    <Users />
                </section>
            </main>
            {/* <footer className={styles.footer}>By Sid</footer> */}
        </div>
    );
}
