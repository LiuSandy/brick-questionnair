import React from "react";
import { Col, Input, Radio, Row, Checkbox } from "antd";
import { CONTROL_TYPE } from "@/utils/enum";

const Index = ({ editor, value, onChange }) => {
  const { type, options, configs } = editor;
  switch (type) {
    case CONTROL_TYPE.radio:
      return (
        <Radio.Group
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          style={{ width: "100%" }}
        >
          <Row>
            {options.map((option, index) => (
              <Col key={index} span={24 / configs.rows}>
                <Radio key={option} value={option}>
                  {option}
                </Radio>
              </Col>
            ))}
          </Row>
        </Radio.Group>
      );
    case CONTROL_TYPE.checkbox:
      return (
        <Checkbox.Group
          value={value}
          onChange={(e) => {
            onChange(e);
          }}
          style={{ width: "100%" }}
        >
          <Row>
            {options.map((option, index) => (
              <Col key={index} span={24 / configs.rows}>
                <Checkbox key={option} value={option}>
                  {option}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      );
    case CONTROL_TYPE.input:
      return <Input value={value} onChange={(e) => onChange(e.target.value)} />;

    default:
      return null;
  }
};

export default Index;
