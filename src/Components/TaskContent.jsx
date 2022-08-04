import TextArea from "antd/lib/input/TextArea";
import React, { useContext } from "react";
import { Context } from "../Context";
import '../styles.css'

export function TaskContent() {

    const { date, editMode, content, updateCurrentTask } = useContext(Context);

    if (!editMode) {
        return <div className="task-content-container">
            <div>{date}</div>
            {content}
        </div>;
    }

    return <div className="task-content-container">
        <div>{date}</div>
        <TextArea
            placeholder="Type here"
            className="task-content-container"
            value={content}
            onChange={(event) => updateCurrentTask({ content: event.target.value })}
        />
    </div>

}