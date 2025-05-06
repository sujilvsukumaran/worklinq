'use client';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import styles from '../styles/Dashboard.module.css';

export default function MainDashboard() {
    return (
        <div className={styles.dashboardWrapper}>
            <Topbar/>
            <div className={styles.dashboardBody}>
                <Sidebar/>
                <div className={styles.dashboardContent}>
                    {/* Main content will go here */}
                </div>
            </div>
        </div>
    );
}