import { CONTROL_TYPE } from "../../utils/enum";
import { Input, Select } from "antd";
import React from "react";

const SimpleControl = ({ config = {}, value, onChange }) => {
  const { type, options } = config || {};
  if (type === CONTROL_TYPE.input) {
    return <Input value={value} onChange={(e) => onChange(e.target.value)} />;
  }
  if (type === CONTROL_TYPE.textarea) {
    return (
      <Input.TextArea
        rows={3}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  if (type === CONTROL_TYPE.select) {
    return (
      <Select value={value} bordered={false} onChange={e=>onChange(e)}>
        {options.map((option) => (
          <Select.Option key={option} value={option}>
            {option}
          </Select.Option>
        ))}
      </Select>
    );
  }
  return null;
};

export default SimpleControl;
