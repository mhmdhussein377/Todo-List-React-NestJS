export const groupAndSortTasks = (todos) => {
    const groupedTasks = todos.reduce((groups, task) => {
        const date = new Date(task.date).toLocaleDateString();
        if (!groups[date]) {
            groups[date] = [];
        }
        groups[date].push(task);
        return groups;
    }, {});

    for (const date in groupedTasks) {
        groupedTasks[date].sort((a, b) => {
            const priorityOrder = {
                HIGH: 1,
                MEDIUM: 2,
                LOW: 3
            };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    }

    return groupedTasks;
};

export const filterCompletedTodos = (tasks) => {
    const filteredTasks = {};

    for (const date in tasks) {
        const completedTasks = tasks[date].filter(task => task.completed);
        if (completedTasks.length > 0) {
            filteredTasks[date] = completedTasks;
        }
    }

    return filteredTasks;
};