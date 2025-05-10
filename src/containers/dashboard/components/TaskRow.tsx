// components/TaskRow.tsx
import styles from '../styles/TaskRow.module.css';

interface TaskRowProps {
    projectId: string;
    task: string;
    details?: string;
    assignee?: string;
    openDate: string;
    dueDate: string;
    priority: 'High' | 'Medium' | 'Low';
    color?: 'green' | 'blue' | 'gray';
}

export default function TaskRow({
                                    projectId,
                                    task,
                                    details = '-',
                                    assignee = '-',
                                    openDate,
                                    dueDate,
                                    priority,
                                    color = 'gray',
                                }: TaskRowProps) {
    return (
        <div className={`${styles.row} ${styles[color]}`}>
            <div className={`${styles.cell} ${styles.projectCell} ${styles[`project-${color}`]}`}>
                <span>{projectId}</span>
            </div>
            <div className={`${styles.cell} ${styles.taskCell}`}>{task}</div>
            <div className={styles.cell}>{details}</div>
            <div className={styles.cell}>{assignee}</div>
            <div className={styles.cell}>{openDate}</div>
            <div className={styles.cell}>{dueDate}</div>
            <div className={styles.cell}>
    <span className={`${styles.priority} ${styles[priority.toLowerCase ()]}`}>
      {priority}
    </span>
            </div>
        </div>
    );
}
