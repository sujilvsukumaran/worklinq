import styles from '../../styles/PlannedSection.module.css'
export default function PlannedSection(){
    return (
        <section className={styles.wrapper}>
            <div className={styles.header}>
                <h2 className={styles.title}>Planned</h2>
                <span className={styles.count}>5 tasks</span>
            </div>
            <div className={styles.taskList}>
                {/* Placeholder for task rows */}
                <div className={styles.placeholder}>No tasks available</div>
            </div>
        </section>
    );
}