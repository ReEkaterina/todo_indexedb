import TextArea from "antd/lib/input/TextArea";
import React, { useContext } from "react";
import { Context } from "../Context";

export function TaskContent() {

    const { date, editMode, content, updateCurrentTask} = useContext(Context);

    if (!editMode) {
        return <div style={{
            width: '80%',
            display: 'inline-block',
        }}>
            <div>{date}</div>
            {content}
        </div>;
    }

    return <div style={{
        width: '80%',
        display: 'inline-block',
    }}>
        <div>{date}</div>
        <TextArea
            placeholder="Type here"
            style={{
                width: '80%',
                display: 'inline-block',
            }}
            value={content}
            onChange={(event) => updateCurrentTask({ content: event.target.value })}
        />
    </div>

}