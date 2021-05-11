import React from "react";
import Item from "./Item";
import TableCheckbox from "./tableCheckbox";
import FormLinkage from "./FormLinkage";
import Completion from "./completion";
import { Form } from "antd";
import { CONTROL_TYPE } from "../utils/enum";

const Index = ({ editor }) => {
  const { key, label, rules } = editor;
  if (editor.type === CONTROL_TYPE.tableCheckbox) {
    return <TableCheckbox editor={editor} />;
  }
  if (editor.type === CONTROL_TYPE.formLinkage) {
    return <FormLinkage editor={editor} />;
  }
  if (editor.type === CONTROL_TYPE.completion) {
    return <Completion editor={editor} />;
  }
  return (
    <Form.Item key={key} label={label} name={key} rules={rules}>
      <Item editor={editor} />
    </Form.Item>
  );
};

export default Index;
