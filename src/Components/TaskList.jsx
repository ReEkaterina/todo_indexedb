import React from "react";
import 'antd/dist/antd.css';
import { Avatar, List, Menu } from 'antd';
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

export function TaskList(props) {

  const items = props.tasks.map(task => getItem(task.content + ' ' + dateFormat(task.date), task.id));

  return (
    <div
      style={{
        width: '20%',
        display: 'inline-block',
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={props.tasks}
        bordered={true}
        renderItem={(item) => (
          <div style={{ height: '60px', overflow: 'hidden', cursor: 'pointer', border: `${props.currentTaskId===item.id ? '1' : '0'}px solid black`, }}>
            <List.Item onClick={() => props.updateCurrentTaskByParams({ id: item.id })}>
              <List.Item.Meta
                title={dateFormat(item.date)}
                description={item.content}
              />
            </List.Item>
          </div>
        )}
      />
    </div>
  );

}