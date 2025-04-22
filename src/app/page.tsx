'use client';
import TaskPanel from '@/sections/TaskPanel';
import ResourcePanel from '@/sections/ResourcePanel';
import { DndContext } from '@dnd-kit/core';
import { useState } from 'react';
import { Task, Member } from '@/types';
import ClientOnly from '@/components/ClientOnly';

export default function Home() {

    const [unassignedTasks, setUnassignedTasks] = useState<Task[]>([
        { id: '1', title: 'Design wireframes', status: 'OPEN' },
        { id: '2', title: 'Implement drag and drop', status: 'IN_PROGRESS' },
    ]);

    const [members, setMembers] = useState<Member[]>([
        { id: 'm1', name: 'Akshay', tasks: [] },
        { id: 'm2', name: 'Harshit', tasks: [] },
    ]);

    const handleDragEnd = (event: any) => {
        const { active, over } = event;
        // If dropped on a valid target
        if (active && over && active.id !== over.id) {
            // Find dragged task
            const draggedTask = unassignedTasks.find((t) => t.id === active.id);
            if (!draggedTask) return;

            // Remove from unassigned
            setUnassignedTasks((prev) => prev.filter((t) => t.id !== active.id));

            // Add to member
            setMembers((prev) =>
                prev.map((member) =>
                    member.id === over.id
                        ? { ...member, tasks: [...member.tasks, draggedTask] }
                        : member
                )
            );
        }
    };

  return (
      <ClientOnly>
          <DndContext onDragEnd={handleDragEnd}>
              <main className="min-h-screen p-6 bg-white">
                  <h1 className="text-2xl font-bold mb-4">Worklinq</h1>
                  <TaskPanel tasks={unassignedTasks} setTasks={setUnassignedTasks} />
                  <div className="my-6 border-t border-gray-300" />
                  <ResourcePanel members={members} setMembers={setMembers} />
              </main>
          </DndContext>
      </ClientOnly>
  );
}
