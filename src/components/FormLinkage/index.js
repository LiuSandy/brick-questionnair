/**
 * 表单联动
 */
import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Descriptions,
  Form,
  Input,
  List,
  Popover,
  Radio,
  Select,
  Space,
} from "antd";
import styles from "../styles.less";
import produce from "immer";
import SimpleControl from '../SimpleControl'
import ControlSelect from '../ControlSelect'
import { CONTROL_TYPE } from "../../utils/enum";

const Content = ({ option, onTypeChange }) => {
  const [visible, setVisible] = useState(option.isRelation);

  const handleChange = (e) => {
    onTypeChange(e);
  };
  return (
    <div>
      <Checkbox
        checked={option.isRelation}
        onChange={(e) => {
          setVisible(e.target.checked);
          onTypeChange(e.target.checked);
        }}
      >
        是否显示关联控件
      </Checkbox>
      <br />
      {visible && (
        <Space>
          <span>请选择关联类型</span>
          <ControlSelect option={option} onTypeChange={handleChange} />
        </Space>
      )}
    </div>
  );
};

const ListItem = ({ option, item, onValueChange, onTypeChange }) => {
  return (
    <List.Item>
      <Space>
        <Input
          value={item}
          onChange={(e) => {
            onValueChange(e.target.value);
          }}
        />
        <Popover
          placement="right"
          content={<Content option={option} onTypeChange={onTypeChange} />}
          trigger="click"
        >
          <a>关联显示</a>
        </Popover>
      </Space>
    </List.Item>
  );
};

const Index = (props) => {
  const [editor, setEditor] = useState("");

  useEffect(() => {
    setEditor(props.editor);
  }, [props.editor]);

  const onRadioChange = (e) => {
    const selectValue = e.target.value;

    const changeIndex = editor.formLinkage.options.findIndex(
      (item) => item === selectValue
    );
    const resetEditor = resetRelation();
    const newEditor = produce(resetEditor, (draftState) => {
      const relation = draftState.formLinkage.relation[changeIndex];
      draftState.formLinkage.relation[changeIndex] = {
        ...relation,
        visible: relation.isRelation,
        label: selectValue,
      };
    });
    setEditor(newEditor);
  };

  const onOptionsChange = (value, index) => {
    const newEditor = produce(editor, (draftState) => {
      draftState.formLinkage.options[index] = value;
    });
    setEditor(newEditor);
  };

  const onTypeChange = (type, index) => {
    const newEditor = produce(editor, (draftState) => {
      if (!type) {
        draftState.formLinkage.relation[index].isRelation = false;
      } else {
        draftState.formLinkage.relation[index] = {
          ...draftState.formLinkage.relation[index],
          isRelation: true,
          type: typeof type === "string" ? type : CONTROL_TYPE.input,
        };
      }
    });
    setEditor(newEditor);
  };

  const resetRelation = () => {
    return produce(editor, (draftState) => {
      const { relation } = draftState.formLinkage;
      Object.keys(relation).forEach((key) => {
        relation[key].visible = false;
      });
    });
  };

  const { options = [], relation = {} } = editor.formLinkage || {};
  return (
    <>
      <div>
        <Form.Item
          wrapperCol={{ span: 24 }}
          label={editor.label}
          name="remember"
          valuePropName="checked"
        >
          <Radio.Group onChange={onRadioChange}>
            {options.map((option) => (
              <Radio key={option} value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        </Form.Item>
        {Object.keys(relation).map((key) => {
          const { visible, type, label } = relation[key] || {};
          if (visible) {
            return (
              <Form.Item key={key} name={label} rules={[{ required: true }]}>
                <SimpleControl type={type} config={relation[key]} />
              </Form.Item>
            );
          }
          return null;
        })}
      </div>

      {editor.isEditor && (
        <div className={styles.configPanel}>
          <Descriptions column={1} title="配置" bordered>
            <Descriptions.Item label="描述">
              <Input
                value={editor.label}
                onChange={(e) => {
                  setEditor({
                    ...editor,
                    label: e.target.value,
                  });
                }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="选项内容">
              <List
                bordered
                dataSource={options}
                renderItem={(item, index) => (
                  <ListItem
                    option={relation[index]}
                    item={item}
                    onValueChange={(value) => onOptionsChange(value, index)}
                    onTypeChange={(type) => onTypeChange(type, index)}
                  />
                )}
              />
            </Descriptions.Item>
          </Descriptions>
          <div className={styles.tool}>
            <Button
              type="primary"
              onClick={() => {
                const newEditor = resetRelation();
                props.onConfirm({ ...newEditor, isEditor: false });
              }}
            >
              确定
            </Button>
            <Button
              onClick={() => {
                const newEditor = resetRelation();
                props.onCancel(newEditor);
              }}
            >
              取消
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
