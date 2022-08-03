import React from "react";
import 'antd/dist/antd.css';
import { List } from 'antd';
import { dateFormat } from '../date'
import { Context } from "../Context";


export function TaskList({tasks, currentTaskId, updateCurrentTask}) {

  return <Context.Consumer>
  {({tasks, currentTaskId, updateCurrentTask}) => (
    <div
      style={{
        width: '20%',
        display: 'inline-block',
      }}
    >
      <List
        itemLayout="horizontal"
        dataSource={tasks}
        bordered={true}
        renderItem={(item) => (
          <div style={{ height: '60px', overflow: 'hidden', cursor: 'pointer', border: `${currentTaskId===item.id ? '1' : '0'}px solid black`, }}>
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
  )}
  </Context.Consumer>;
}