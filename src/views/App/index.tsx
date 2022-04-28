import React, {useEffect} from 'react';

// import { useToDoStore } from '../../data/stores/useToDoStore';
import { ToDoList } from '../ToDoList';
import { ToDoListDone } from '../ToDoListDone';

import styles from './index.module.scss';


export const App: React.FC = () => {
    // const unsub2 = useToDoStore.subscribe(state => state.tasks, console.log)
    return (
        <div>
            <ToDoList />
            <ToDoListDone />
            <ToDoList mainTitle="To Do App Copy"/>
        </div>
    );
}