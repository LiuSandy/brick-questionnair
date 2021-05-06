import React from "react";
import {Col, Input, Radio, Row} from "antd";


const Index = ({editor, value, onChange}) => {
  const {type, options, configs} = editor
  switch (type) {
    case "radio":
      return <Radio.Group
        value={value}
        onChange={e => {
          onChange(e.target.value)
        }}
        style={{width:'100%'}}
      >
        <Row>
          {options.map(option => (
            <Col span={24 / configs.rows}>
              <Radio key={option} value={option}>{option}</Radio>
            </Col>
          ))}
        </Row>

      </Radio.Group>
    case 'input':
      return <Input value={value} onChange={e => onChange(e.target.value)}/>
    default:
      return null
  }
}

export default Index