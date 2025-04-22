'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';

import TaskPanel from '@/sections/TaskPanel';
import ResourcePanel from '@/sections/ResourcePanel';
import ClientOnly from '@/components/ClientOnly';
import { Task, Member } from '@/types';
import ThemeToggle from '@/components/ThemeToggle';


export default function Home() {
    const router = useRouter();
    const [isAuthed, setIsAuthed] = useState<boolean | null>(null);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    const [unassignedTasks, setUnassignedTasks] = useState<Task[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [activeTask, setActiveTask] = useState<Task | null>(null);


    useEffect(() => {
        const authed = localStorage.getItem('isAuthenticated');
        const email = localStorage.getItem('userEmail');
        if (authed === 'true') {
            setIsAuthed(true);
            setUserEmail(email);
        } else {
            setIsAuthed(false);
            router.push('/auth');
        }
    }, [router]);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id.toString();
        const overId = over.id.toString();

        if (activeId === overId) return;

        // 1. Find the dragged task
        let draggedTask: Task | null = null;

        const fromUnassigned = unassignedTasks.find((t) => t.id === activeId);
        const fromMember = members.find((m) => m.tasks.find((t) => t.id === activeId));

        if (fromUnassigned) {
            draggedTask = fromUnassigned;
        } else if (fromMember) {
            draggedTask = fromMember.tasks.find((t) => t.id === activeId) || null;
        }

        if (!draggedTask) return;

        // 2. Clean up source lists
        const newUnassignedTasks = unassignedTasks.filter((t) => t.id !== activeId);
        const newMembers = members.map((member) => ({
            ...member,
            tasks: member.tasks.filter((t) => t.id !== activeId),
        }));

        // 3. Assign task to destination
        if (overId === 'unassigned') {
            newUnassignedTasks.push(draggedTask);
        } else {
            newMembers.forEach((member) => {
                if (member.id === overId) {
                    member.tasks.push(draggedTask!);
                }
            });
        }

        // 4. Apply updates
        setUnassignedTasks(newUnassignedTasks);
        setMembers(newMembers);
        setActiveTask(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userEmail');
        router.push('/auth');
    };

    if (isAuthed === false) return null; // Avoid flash

    return (
        <ClientOnly>
            <DndContext
                onDragStart={(event) => {
                    const taskId = event.active.id.toString();

                    // Search in both unassigned and members
                    let task: Task | undefined = unassignedTasks.find((t) => t.id === taskId);

                    if (!task) {
                        const fromMember = members.find((m) =>
                            m.tasks.find((t) => t.id === taskId)
                        );
                        if (fromMember) {
                            task = fromMember.tasks.find((t) => t.id === taskId);
                        }
                    }

                    if (task) setActiveTask(task);
                }}
                onDragEnd={handleDragEnd}
            >
                <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-6 py-10 space-y-10">
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4 ml-auto">
                            {userEmail && (
                                <span className="text-sm text-gray-500">Signed in as {userEmail}</span>
                            )}
                            <ThemeToggle />
                            <button
                                onClick={handleLogout}
                                className="text-sm text-red-500 hover:text-red-700"
                            >
                                Logout
                            </button>
                        </div>
                    </div>

                    <TaskPanel tasks={unassignedTasks} setTasks={setUnassignedTasks}/>
                    <div className="my-6 border-t border-gray-300"/>
                    <ResourcePanel members={members} setMembers={setMembers}/>

                    <DragOverlay>
                        {activeTask ? (
                            <div className="border px-4 py-2 bg-white shadow-lg rounded pointer-events-none">
                                <p className="font-medium">{activeTask.title}</p>
                                <p className="text-sm text-gray-500">{activeTask.status}</p>
                            </div>
                        ) : null}
                    </DragOverlay>
                </main>
            </DndContext>
        </ClientOnly>
    );
}