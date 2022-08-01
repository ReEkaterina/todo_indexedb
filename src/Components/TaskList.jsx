import React from "react";
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import { dateFormat } from '../date'


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

export function TaskList(props){

    const items = props.tasks.map(task => getItem(task.content + ' ' + dateFormat(task.date), task.id));
       
    return (
      <div
        style={{
          width: '20%',
          display: 'inline-block',
        }}
      >
        <Menu
          selectedKeys={props.currentTaskId ? props.currentTaskId.toString() : props.currentTaskId}
          mode="inline"
          inlineCollapsed={false}
          items={items}
          onClick={({ key })=> props.updateCurrentTaskByParams({id: key})}
        />
      </div>
    );

}