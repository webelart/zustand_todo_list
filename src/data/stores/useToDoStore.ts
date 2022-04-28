import create from 'zustand';

import { generateId } from '../helpers';

interface Task {
    id: string;
    title: string;
    createdAt: number;
}
interface ToDoStore {
    tasks: Task[];
    tasksDone: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    createTaskDone: () => void;
    deleteEverything: () => void;
}

export const useToDoStore = create<ToDoStore>((set, get) => ({
    tasks: [],
    tasksDone: [],
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now(),
        }

        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        });
    },
    removeTask: (id: string) => {
        const { tasks, tasksDone } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id),
            tasksDone: [...tasksDone].concat(tasks.filter((task) => task.id === id)),
        });
    },
    createTaskDone: () => {
        const { tasksDone } = get();
        const newTask = {
            id: generateId(),
            title: 'Fake repeated title',
            createdAt: Date.now(),
        }

        set({
            tasksDone: [newTask].concat(tasksDone),
        })
    },
    deleteEverything: () => {
        set({}, true)
    },
}));

// const unsub2 = useToDoStore.subscribe(state => state.tasks, console.log)

// function isToDoStore(object: any): object is ToDoStore {
//     return 'tasks' in object;
// }

// const localStorageUpdate = <T extends State>(config: StateCreator<T>): StateCreator<T> => (set, get, api) => config((nextState, ...args) => {
//     if (isToDoStore(nextState)) {
//         window.localStorage.setItem('tasks', JSON.stringify(
//             nextState.tasks
//         ));
//     }
//     set(nextState, ...args);
// }, get, api);

// const getCurrentState = () => {
//     try {
//         const currentState = (JSON.parse(window.localStorage.getItem('tasks') || '[]')) as Task[];
//         return currentState;
//     } catch(err) {
//         window.localStorage.setItem('tasks', '[]');
//     }

//     return [];
// }