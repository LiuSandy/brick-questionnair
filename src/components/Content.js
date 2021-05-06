import React from "react";
import Item from "./Item";
import {Form} from "antd";

const Index = ({editor}) => {
  const {key, label, rules } = editor

  return (
    <Form.Item
      key={key}
      label={label}
      name={key}
      rules={rules}
    >
      <Item editor={editor} />
    </Form.Item>
  )
}


export default Index