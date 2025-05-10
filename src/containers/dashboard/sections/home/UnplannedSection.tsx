import styles from '../../styles/UnplannedSection.module.css'
import TaskRow from "@/containers/dashboard/components/TaskRow";

const dummyTasks = [
    {
        projectId: 'FI112119',
        task: 'One Piece',
        openDate: '13 Feb 2025',
        dueDate: '13 Feb 2025',
        priority: 'Medium' as const,
        color: 'green' as const
    },
    {
        projectId: 'FI112119',
        task: 'One Piece',
        openDate: '13 Feb 2025',
        dueDate: '13 Feb 2025',
        priority: 'High' as const,
        color: 'blue' as const
    }
]


export default function UnplannedSection () {
    return (
        <section className={styles.wrapper}>
            <div className={styles.headerRow}>
                <span className={styles.sectionTitle}>
                    <span className={styles.badge}>Unplanned</span>
                    <span className={styles.count}>3</span>
                </span>
                <button className={styles.dropdown}>⌄</button>
            </div>

            <div className={styles.tableHeader}>
                <div>Project</div>
                <div>Task</div>
                <div>Details</div>
                <div>Assignee</div>
                <div>Open Date</div>
                <div>Due Date</div>
                <div>Priority</div>
            </div>

            <div className={styles.taskList}>
                {dummyTasks.map ((task, index) => (
                    <TaskRow key={index} {...task} />
                ))}
                <div className={styles.addTask}>+ Add task</div>
            </div>
        </section>
    );
}