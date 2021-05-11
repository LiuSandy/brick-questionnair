/**
 * 选择数据字典，当类型是select，radio，checkbox 时
 */
import React from "react";
import { Select } from "antd";

const dict = {
  字典1: {
    options: ["字典1-1", "字典1-2"],
  },
  字典2: {
    options: ["字典2-1", "字典2-2"],
  },
};

const DataDictionary = ({ value, onSelect }) => {
  return (
    <Select defaultValue={value} onChange={(e) => onSelect(dict[e].options)}>
      {Object.keys(dict).map((key) => (
        <Select.Option key={key} value={key}>
          {key}
        </Select.Option>
      ))}
    </Select>
  );
};

export default DataDictionary;
