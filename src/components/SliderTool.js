import React from "react";
import {TableOutlined, CheckSquareOutlined, CheckCircleOutlined} from '@ant-design/icons'
import {Card} from "antd";
import PubSub from 'pubsub-js'
import styles from './styles.less'
import {CONTROL_TYPE, PUBSUB_TYPE} from '@/utils/enum'

const data = [
  {
    type: CONTROL_TYPE.radio,
    title: '单选',
    icon: <CheckCircleOutlined/>
  },
  {
    type: CONTROL_TYPE.checkbox,
    title: '多选',
    icon: <CheckSquareOutlined/>
  }, {
    type: CONTROL_TYPE.table,
    title: '表格',
    icon: <TableOutlined/>
  },
]

const Index = props => {

  const onClick = (type) => {
    PubSub.publish(PUBSUB_TYPE.addEditor, type)
  }

  return (
    <div className={styles.sliderTool}>
      {
        data.map(item => {
          return (
            <Card
              key={item.type}
              onClick={() => onClick(item.type)}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Card>
          )
        })
      }
    </div>
  )
}

export default Index