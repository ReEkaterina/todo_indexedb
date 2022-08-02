import React, { useState } from "react";
import { dateFormat } from "../../date";
import { addNewTask, deleteTask, filterTasks, getTaskContent, getTaskList, updateTask } from "../../db";
import { Header } from "../Header";
import { TaskContent } from "../TaskContent";
import { TaskList } from "../TaskList";

const NEW_TASK_CONTENT = "";

export function TaskListContainer() {

    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [content, setContent] = useState("");
    const [editMode, toggleEditMode] = useState(false);
    const [searchMode, toggleSearchMode] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [currentTaskDate, setCurrentTaskDate] = useState('');

    if (!tasks.length) {
        fillTasks();
    }

    if (editMode && searchMode) {
        toggleSearchMode(false);
        fillTasks();
    }

    function addTask() {

        addNewTask(NEW_TASK_CONTENT).then((id) => {
            updateCurrentTask({ id });
            toggleEditMode(true);
            setTasks([...tasks, { id, content: NEW_TASK_CONTENT }]);
            toggleSearchMode(false);
        });

    }

    function editTask() {

        if (currentTaskId) {
            toggleEditMode(!editMode);
        }

    }

    function confirmDeletingTask() {

        deleteTask(currentTaskId);
        toggleEditMode(false);
        if (searchMode) { // deleting in search mode
            const newFilteredTasks = tasks.filter(item => item.id !== Number(currentTaskId));
            setTasks(newFilteredTasks);
            if (newFilteredTasks.length) {
                setCurrentTaskId(newFilteredTasks[0].id);
                updateCurrentTask({
                    id: newFilteredTasks[0].id,
                });
            } else {
                setContent('');
            }
        } else { // deleting in usual mode
            updateCurrentTask({
                id: tasks[0].id,
                content: tasks[0].content,
            });
        }

    }

    function fillTasks() {
        getTaskList().then((data) => setTasks(data));
    }

    function onSearch(value) {

        if (value) {
            toggleEditMode(false);
            filterTasks(item => item.content.toLowerCase().search(value.toLowerCase()) >= 0).then(data => {
                setTasks(data);
                toggleSearchMode(true);
                setCurrentTaskId('');
                setContent('');
            });
        } else {
            toggleSearchMode(false);
            fillTasks();
        }

    }

    function updateCurrentTask({ id, content }) {

        if (id) { // if switch between tasks
            setCurrentTaskId(id);
            getTaskContent(id).then((data) => {
                setCurrentTaskDate(dateFormat(data.length ? data[0].date : ''));
                setContent(data.length ? data[0].content : '');
            });
            toggleEditMode(false);
        } else { // if content changes
            setContent(content);
            updateTask(currentTaskId, content);
            if (searchMode && editMode) {
                toggleSearchMode(false);
            }
        }

        if (!searchMode) {
            fillTasks();
        }

    }

    return <span>
        <Header addTask={addTask}
            editTask={editTask}
            confirmDeletingTask={confirmDeletingTask}
            onSearch={onSearch} />
        <TaskList tasks={tasks}
            currentTaskId={currentTaskId}
            setCurrentTaskId={setCurrentTaskId}
            updateCurrentTaskByParams={updateCurrentTask} />
        <TaskContent setContent={setContent}
            content={content}
            editMode={editMode}
            updateCurrentTask={updateCurrentTask}
            date={currentTaskDate} />
    </span>;

}