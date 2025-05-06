'use client';

import { useState } from 'react';
import styles from '../styles/Sidebar.module.css';
import {
    HiOutlineHome,
    HiOutlineCalendar,
    HiOutlineViewGrid,
    HiOutlineUsers,
    HiOutlineCog
} from 'react-icons/hi';
import { FiLogOut } from 'react-icons/fi';

const navItems = [
    { id: 'home',    label: 'Home',     icon: <HiOutlineHome /> },
    { id: 'calendar',label: 'Calendar', icon: <HiOutlineCalendar /> },
    { id: 'projects',label: 'Projects', icon: <HiOutlineViewGrid /> },
    { id: 'users',   label: 'Users',    icon: <HiOutlineUsers /> },
    { id: 'settings',label: 'Settings', icon: <HiOutlineCog /> },
];

export default function Sidebar() {
    const [active, setActive] = useState('home');
    const [location, setLocation] = useState('FE Dubai');

    const handleLogout = () => {
        // TODO: hook up your logout logic here
        console.log('logging out…');
    };

    return (
        <aside className={styles.sidebar}>
            <nav className={styles.nav}>
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`${styles.navItem} ${active === item.id ? styles.active : ''}`}
                        onClick={() => {
                            console.log(`clicked on: ${item.id}`);
                            setActive(item.id);
                        }}
                    >
                        <span className={styles.icon}>{item.icon}</span>
                        <span className={styles.label}>{item.label}</span>
                    </button>
                ))}
            </nav>

            {/* footer gets pushed down by margin-top: auto */}
            <div className={styles.footer}>
                <select
                    className={styles.select}
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                >
                    <option>FE Dubai</option>
                    <option>FE London</option>
                    <option>FE New York</option>
                </select>

                <button
                    className={styles.logoutButton}
                    onClick={handleLogout}
                >
                    <span className={styles.logoutIcon}><FiLogOut /></span>
                    Logout
                </button>
            </div>
        </aside>
    );
}