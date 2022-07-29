import React, { useState } from "react";
import { addNewTask, deleteTask, filterTasks, getTaskContent, getTaskList, updateTask } from "../../db";
import { Header } from "../Header";
import { TaskContent } from "../TaskContent";
import { TaskList } from "../TaskList";

const NEW_TASK_CONTENT = "New task";

export function TaskListContainer() {

    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [content, setContent] = useState("");
    const [editMode, toggleEditMode] = useState(false);
    const [searchMode, toggleSearchMode] = useState(false);
    let [filteredTasks, setFilteredTasks] = useState([]);

    let tasks = getTaskList();
    if (searchMode) {
        tasks = filteredTasks;
    }

    function addTask() {

        toggleSearchMode(false);

        addNewTask(NEW_TASK_CONTENT).then((id) => {
            updateCurrentTask({ id });
            toggleEditMode(true);
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
            const newFilteredTasks = filteredTasks.filter(item => item.id !== Number(currentTaskId));
            setFilteredTasks(newFilteredTasks);
            if (newFilteredTasks) {
                setCurrentTaskId(newFilteredTasks[0].id);
                updateCurrentTask({
                    id: newFilteredTasks[0].id,
                });
            }
        } else { // deleting in usual mode
            setCurrentTaskId(tasks[0].id);
            updateCurrentTask({
                id: tasks[0].id,
                content: tasks[0].content,
            });
        }

    }

    function onSearch(value) {

        if (value) {
            toggleEditMode(false);
            filterTasks(item => item.content.search(value) >= 0).then(data => {
                setFilteredTasks(data);
                toggleSearchMode(true);
            });
        } else {
            toggleSearchMode(false);
        }

    }

    function updateCurrentTask({ id, content }) {

        if (id) { // if switch between tasks
            setCurrentTaskId(id);
            getTaskContent(id).then((data) => setContent(data.length ? data[0].content : ''));
        }

        if (content) { // if content changes
            setContent(content);
            updateTask(currentTaskId, content);
            if (searchMode) {
                toggleSearchMode(false);
            }
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
            updateCurrentTask={updateCurrentTask} />
    </span>;

}