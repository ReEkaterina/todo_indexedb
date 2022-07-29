import { Button } from "antd"
import Search from "antd/lib/input/Search"
import React from "react"
import { ConfirmModal } from "./ConfirmModal"

export function Header(props){

    return <header>
        <Button onClick={props.addTask}>New</Button>
        <Button onClick={props.editTask}>Edit</Button>
        <ConfirmModal buttonTitle="Delete" 
                        questionTitle="Are tou sure?" 
                        confirmDeletingTask={props.confirmDeletingTask} />
        <Search 
            placeholder="Search text"
            onSearch={props.onSearch}
            allowClear={true}
            style={{
                width: 200,
            }}
        />
    </header>
}