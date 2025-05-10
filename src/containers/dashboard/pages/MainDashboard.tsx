'use client';

import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import styles from '../styles/Dashboard.module.css';
import {useState} from "react";
import HomeView from "@/containers/dashboard/sections/home/HomeView";

export default function MainDashboard() {

    const [activeView, setActiveView] = useState('home');

    const renderContent = () => {
        switch (activeView) {
            case 'home': return <HomeView />;
            case 'calendar': return <div>📅 Calendar View</div>;
            case 'projects': return <div>📁 Projects View</div>;
            case 'users': return <div>👥 Users View</div>;
            case 'settings': return <div>⚙️ Settings View</div>;
            default: return <div>🚧 Coming soon...</div>;
        }
    }

    return (
        <div className={styles.dashboardWrapper}>
            <Topbar/>
            <div className={styles.dashboardBody}>
                <Sidebar activeView={activeView } onSelect={setActiveView} />
                <div className={styles.dashboardContent}>
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}