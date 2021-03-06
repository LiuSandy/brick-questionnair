import React from "react";
import {
  QuestionCircleOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { Form, Input, Checkbox, Button, Select } from "antd";
import Table from "./table";
import TableCheckbox from "./tableCheckbox";
import FormLinkage from "./FormLinkage";
import Completion from "./completion";
import styles from "./styles.less";
import { CONTROL_TYPE, NEED_CONFIG_OPTIONS } from "@/utils/enum";

const optionConfigs = [
  { label: "必填", value: "required" },
  { label: "备注", value: "remark" },
];

function getLabel(type) {
  switch (type) {
    case CONTROL_TYPE.radio:
      return "单选";
    case CONTROL_TYPE.input:
      return "单行文本";
    case CONTROL_TYPE.checkbox:
      return "多选";
    default:
      return null;
  }
}

const formItemLayout = {
  labelCol: {
    xs: { span: 4 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 14 },
    sm: { span: 14 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 14, offset: 0 },
    sm: { span: 14, offset: 4 },
  },
};

const Index = ({ editor, onConfirm, onCancel }) => {
  const { type, options } = editor;
  const onChange = (checkedValues) => {
    console.log("checked = ", checkedValues);
  };

  const onReset = () => {
    onCancel(editor);
  };

  const onFinish = (values) => {
    const { label, options = [], rows, configs = [] } = values;
    const rules = [];
    if (configs.includes("required")) {
      rules.push({ required: true });
    }
    const newEditor = {
      ...editor,
      label,
      rules,
      isEditor: false,
      options: options.map((item) => item.option),
      configs: {
        ...editor.configs,
        rows,
      },
    };
    onConfirm(newEditor);
  };

  if (editor.type === CONTROL_TYPE.table) {
    return <Table />;
  }

  if (editor.type === CONTROL_TYPE.tableCheckbox) {
    return (
      <TableCheckbox
        editor={editor}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />
    );
  }

  if (editor.type === CONTROL_TYPE.formLinkage) {
    return (
      <FormLinkage editor={editor} onCancel={onCancel} onConfirm={onConfirm} />
    );
  }

  if (editor.type === CONTROL_TYPE.completion) {
    return (
      <Completion editor={editor} onCancel={onCancel} onConfirm={onConfirm} />
    );
  }

  return (
    <div>
      <Form
        colon={false}
        onFinish={onFinish}
        initialValues={{
          options: options?.map((option) => ({ option })),
          rows: 1,
        }}
        layout="horizontal"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
      >
        <Form.Item label={<QuestionCircleOutlined />}>
          <span className="ant-form-text">{getLabel(type)}</span>
        </Form.Item>
        <Form.Item
          label="描述"
          name="label"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label=" " name="config">
          <Checkbox.Group options={optionConfigs} onChange={onChange} />
        </Form.Item>

        {/* 单选，多选，下拉，需要配置选项 */}
        {NEED_CONFIG_OPTIONS.includes(editor.type) ? (
          <>
            <Form.List name="options">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(
                    ({ key, name, fieldKey, ...restField }, index) => (
                      <Form.Item
                        {...(index === 0
                          ? formItemLayout
                          : formItemLayoutWithOutLabel)}
                        label={index === 0 ? "配置选项" : ""}
                        required={false}
                        key={fieldKey}
                      >
                        <Form.Item
                          {...restField}
                          label={index === 0 ? "配置选项" : ""}
                          name={[name, "option"]}
                          fieldKey={[fieldKey, "option"]}
                          rules={[
                            { required: true, message: "Missing first name" },
                          ]}
                          noStyle
                        >
                          <Input
                            placeholder="First Name"
                            style={{ width: "93%" }}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <MinusCircleOutlined
                            className={styles["dynamic-delete-button"]}
                            onClick={() => remove(name)}
                          />
                        ) : null}
                      </Form.Item>
                    )
                  )}
                  <Form.Item label=" ">
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      添加选项
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item label="每行显示个数" name="rows">
              <Select style={{ width: 60 }}>
                <Select.Option value="1">1</Select.Option>
                <Select.Option value="2">2</Select.Option>
                <Select.Option value="3">3</Select.Option>
                <Select.Option value="4">4</Select.Option>
              </Select>
            </Form.Item>
          </>
        ) : null}

        <Form.Item label=" ">
          <Button type="primary" htmlType="submit" style={{ marginRight: 8 }}>
            确定
          </Button>
          <Button htmlType="button" onClick={onReset}>
            取消
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Index;
