export type Todo = {
    completed: boolean;
    createdAt: string;
    date: string;
    description: string;
    id: number;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    userId: number;
};

export type ToDosProps = {
    date: string;
    todos: Todo[];
    setIsDeleteTodoModalOpened: (value: boolean) => void;
    setDeleteTodoId: (id: number) => void;
    setIsUpdateTodoModalOpened: (value: boolean) => void;
};