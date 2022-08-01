import TextArea from "antd/lib/input/TextArea";
import React from "react";

export function TaskContent(props) {

    if (!props.editMode) {
        return <div style={{
            width: '80%',
            display: 'inline-block',
        }}>
            <div>{props.date}</div>
            {props.content}
        </div>;
    }

    return <div style={{
        width: '80%',
        display: 'inline-block',
    }}>
        <div>{props.date}</div>
        <TextArea
            placeholder="Type here"
            style={{
                width: '80%',
                display: 'inline-block',
            }}
            value={props.content}
            onChange={(event) => props.updateCurrentTask({ content: event.target.value })}
        />
    </div>

}