import React, {useRef, useEffect} from 'react';
import shallow from 'zustand/shallow'

import { useToDoStore } from '../../data/stores/useToDoStore';

import styles from './index.module.scss';

export const ToDoListDone: React.FC = () => {
    const [
        tasksDone,
        createTaskDone,
    ] = useToDoStore(state => [
        state.tasksDone,
        state.createTaskDone,
        state.deleteEverything,
    ]);

    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>Done tasks</h1>
            {!tasksDone.length && (
                <p className={styles.articleText}>There is no one done task.</p>
            )}
            {tasksDone.map((task, index) => (
                <p
                    key={task.id}
                    className={styles.articleTextLeft}
                >{index + 1}. {task.title}</p>
            ))}
            <br />
            <button
                className={styles.articleButton}
                onClick={createTaskDone}
            >Add fake done task</button>
            <br />
            
            {/* <button
                onClick={deleteEverything}
            >Delete everything</button> */}
            <br />
        </article>
    );
}
