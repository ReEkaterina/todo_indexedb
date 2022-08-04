import React, { useEffect, useState } from "react";
import { Context } from "../../Context";
import { dateFormat } from "../../date";
import { filterTasks, getTaskContent, getTaskList, updateTask } from "../../db";
import { addTask, removeTask } from "../../tasks";
import { Header } from "../Header";
import { TaskContent } from "../TaskContent";
import { TaskList } from "../TaskList";

export function TaskListContainer() {

    const [currentTaskId, setCurrentTaskId] = useState(null);
    const [content, setContent] = useState("");
    const [editMode, toggleEditMode] = useState(false);
    const [searchMode, toggleSearchMode] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [currentTaskDate, setCurrentTaskDate] = useState('');

    useEffect(() => fillTasks(), []);

    if (editMode && searchMode) {
        toggleSearchMode(false);
        fillTasks();
    }

    function add() {
        addTask(updateCurrentTask, tasks, setTasks);
        toggleEditMode(true);
        toggleSearchMode(false);
    }

    function edit() {
        if (currentTaskId) {
            toggleEditMode(!editMode);
        }
    }

    function confirmDeleting() {

        toggleEditMode(false);
        const newCurrentTaskId = removeTask(currentTaskId, tasks, searchMode, setTasks);
        if (newCurrentTaskId) {
            setCurrentTaskId(newCurrentTaskId);
            updateCurrentTask({ id: newCurrentTaskId });
        } else {
            setContent('');
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
                setCurrentTaskDate('');
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

    return <Context.Provider value={{
        addTask: add,
        editTask: edit,
        confirmDeleting,
        onSearch,
        tasks,
        currentTaskId,
        setCurrentTaskId,
        updateCurrentTask,
        content,
        editMode,
        setContent,
        date: currentTaskDate,
    }}>
        <Header />
        <TaskList />
        <TaskContent />
    </Context.Provider>;

}