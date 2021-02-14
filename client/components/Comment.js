import styles from '../styles/Comment.module.css';

export default function Comment({ comment, answer }) {
    return (
        <div>
            <div className={styles.comment}>
                {comment.message}
                {' - '}
                <span style={{ color: '#0477cc' }}>
                    {comment.userId.username}
                </span>
                {'  '}
                <span style={{ color: '#959ea4' }}>
                    {comment.date.toString().substring(0, 10)}
                </span>
                {/* <form>
                    <button className={styles.button}>Delete</button>
                </form> */}
            </div>
        </div>
    );
}
