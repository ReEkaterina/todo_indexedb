import React, { useContext } from "react";
import 'antd/dist/antd.css';
import { List } from 'antd';
import { dateFormat } from '../date'
import { Context } from "../Context";
import '../styles.css';


export function TaskList() {

  const {tasks, currentTaskId, updateCurrentTask} = useContext(Context);

  return (
    <div className="taskListContainer" >
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        bordered={true}
        renderItem={(item) => (
          <div className={`task-item-container ${currentTaskId===item.id ? "task-item-active" : ''}`} >
            <List.Item onClick={() => updateCurrentTask({ id: item.id })}>
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