'use client';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import styles from '../styles/Dashboard.module.css';

export default function MainDashboard() {
    return (
        <div className={styles.dashboardWrapper}>
            <Sidebar />
            <div className={styles.dashboardContent}>
                <Topbar />
            </div>
        </div>
    );
}