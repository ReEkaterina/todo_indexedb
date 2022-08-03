import { addNewTask, deleteTask } from "./db";

const NEW_TASK_CONTENT = "";

export function addTask(updateCurrentTask, tasks, setTasks) {

    addNewTask(NEW_TASK_CONTENT).then((id) => {
        updateCurrentTask({ id });
        setTasks([...tasks, { id, content: NEW_TASK_CONTENT }]);
    });

}

export function removeTask(currentTaskId, tasks, searchMode, setTasks) {

    deleteTask(currentTaskId);
    if (searchMode) { // deleting in search mode
        const newFilteredTasks = tasks.filter(item => item.id !== Number(currentTaskId));
        setTasks(newFilteredTasks);
        if (newFilteredTasks.length) {
            return newFilteredTasks[0].id;
        } 
    } else { // deleting in usual mode
        return tasks[0].id;
    }

}