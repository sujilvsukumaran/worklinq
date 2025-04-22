export type Task = {
    id: string;
    title: string;
    status: 'OPEN' | 'IN_PROGRESS' | 'DONE';
};

export type Member = {
    id: string;
    name: string;
    tasks: Task[];
};