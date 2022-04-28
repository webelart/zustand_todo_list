import React, {useRef, useEffect} from 'react';

import { useToDoStore } from '../../data/stores/useToDoStore';
import { InputPlus } from '../components/InputPlus';
import { InputTask } from '../components/InputTask';

import styles from './index.module.scss';

interface ToDoListProps {
    mainTitle?: string;
}

export const ToDoList: React.FC<ToDoListProps> = ({
    mainTitle = 'To Do App'
}) => {
    const [
        tasks,
        createTask,
        updateTask,
        removeTask
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.removeTask,
    ]);

    // console.log(1, `${mainTitle} component render`)
    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>{mainTitle}</h1>
            <section className={styles.articleSection}>
                <InputPlus
                    onAdd={(title) => {
                       if (title) {
                            createTask(title)
                       } 
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && (
                    <p className={styles.articleText}>There is no one task.</p>
                )}
                {tasks.map((task) => (
                    <InputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        onDone={removeTask}
                        onEdited={updateTask}
                        onRemoved={removeTask}
                    />
                ))}
            </section>
        </article>
    );
}


// const equalityFn = (a: any, b: any) => {
//     console.log(a, b)
//     return JSON.stringify(a) === JSON.stringify(b)
// };
