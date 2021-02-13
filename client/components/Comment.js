import styles from '../styles/Comment.module.css';

export default function Comment({ comment, answer }) {
    return (
        <div>
            <div className={styles.comment}>
                {comment.message}
                {' - '}
                <span style={{ color: '#0477cc' }}>{comment.userId.email}</span>
                {/* <form>
                    <button className={styles.button}>Delete</button>
                </form> */}
            </div>
        </div>
    );
}
