import { Button } from "antd"
import Search from "antd/lib/input/Search"
import React, { useContext } from "react"
import { Context } from "../Context"
import { ConfirmModal } from "./ConfirmModal"

export function Header() {

    const { addTask, editTask, confirmDeleting, onSearch } = useContext(Context);

    return <header>
        <Button onClick={addTask}>New</Button>
        <Button onClick={editTask}>Edit</Button>
        <ConfirmModal buttonTitle="Delete"
            questionTitle="Are tou sure?"
            confirmDeletingTask={confirmDeleting} />
        <Search
            placeholder="Search text"
            onSearch={onSearch}
            allowClear={true}
            style={{
                width: 200,
            }}
        />
    </header>
}