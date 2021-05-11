import React from "react";
import { Select } from "antd";
import { CONTROL_TYPE } from "../../utils/enum";

const ControlSelect = ({ option,onTypeChange })=>{

  const handleChange = (e) => {
    onTypeChange(e);
  };

  return (
    <Select
      defaultValue={option.type}
      style={{ width: 120 }}
      onChange={handleChange}
    >
      <Select.Option value={CONTROL_TYPE.input}>Input</Select.Option>
      <Select.Option value={CONTROL_TYPE.textarea}>
        TextArea
      </Select.Option>
      <Select.Option value={CONTROL_TYPE.select}>
      Select
    </Select.Option>
    </Select>
  )
}

export default ControlSelect