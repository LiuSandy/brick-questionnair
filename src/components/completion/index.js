/**
 * 填空题
 */
import React, { useEffect, useState } from "react";
import reset from "@/pages/reset.less";
import styles from "../styles.less";
import SimpleControl from "../SimpleControl";
import ControlSelect from "../ControlSelect";
import DataDictionary from "../DataDictionary";
import { Button, Descriptions, Form, Input } from "antd";
import produce from "immer";
import { CONTROL_TYPE } from "../../utils/enum";
import { compact, diff, lastRight } from "../../utils";

const Index = (props) => {
  const [editor, setEditor] = useState("");

  useEffect(() => {
    setEditor(props.editor);
  }, [props.editor]);

  const handleDescribe = (e) => {
    const currentValue = e.target.value;
    const { describe = "", attributes = [] } = editor.completion || {};
    const changeDescribe = (value) => {
      const newEditor = produce(editor, (draftState) => {
        draftState.completion.describe = value;
      });
      setEditor(newEditor);
    };
    if (currentValue.length < describe.length) {
      const diffIndex = diff(describe, currentValue);
      const diffChart = describe[diffIndex];
      if (diffChart === "_") {
        const attributeIndex = attributes.findIndex(
          (attribute) =>
            diffIndex >= attribute.index[0] && diffIndex <= attribute.index[1]
        );
        const newEditor = produce(editor, (draftState) => {
          // 1. 清空填空符
          const { index } = attributes[attributeIndex];
          const describeArr = describe.split("");
          describeArr.splice(index[0], 4);
          draftState.completion.describe = describeArr.join("");
          // 2. 删除属性配置
          draftState.completion.attributes = attributes.filter(
            (attribute, index) => index !== attributeIndex
          );
        });
        setEditor(newEditor);
      } else {
        changeDescribe(currentValue);
      }
    } else {
      changeDescribe(currentValue);
    }
  };

  const insertCompletion = () => {
    const newEditor = produce(editor, (draftState) => {
      const { describe = "", attributes = [] } = draftState.completion;
      const lastLabels = lastRight(describe.split("____"));
      if (lastLabels !== "") {
        draftState.completion.describe = `${describe}____`;
        draftState.completion.attributes = [
          ...attributes,
          { type: CONTROL_TYPE.input },
        ];
      }
    });
    setEditor(newEditor);
  };

  const onTypeChange = (type, index) => {
    const newEditor = produce(editor, (draftState) => {
      const { attributes = [] } = draftState.completion || {};
      const attribute = attributes[index];
      attributes[index] = {
        ...attribute,
        type,
        options: ["选项1", "选项2"],
      };
    });
    setEditor(newEditor);
  };

  const onDictSelect = (options, index) => {
    const newEditor = produce(editor, (draftState) => {
      const { attributes = [] } = draftState.completion || {};
      const attribute = attributes[index];
      attributes[index] = {
        ...attribute,
        options,
      };
    });
    setEditor(newEditor);
  };

  const { describe = "", attributes = [] } = editor.completion || {};
  const labels = compact(describe.split("____"));

  return (
    <>
      <div className={reset.completion}>
        {labels.map((label, index) => {
          return (
            <React.Fragment key={label}>
              <span>{label}</span>
              <Form.Item name={index} noStyle>
                <SimpleControl config={attributes[index]} />
              </Form.Item>
            </React.Fragment>
          );
        })}
      </div>
      {editor.isEditor && (
        <div className={styles.configPanel}>
          <Descriptions column={1} title="配置" bordered>
            <Descriptions.Item
              label={
                <>
                  <span>描述</span>
                  <a onClick={insertCompletion}> 插入填空符 </a>
                </>
              }
            >
              <Input.TextArea
                rows={3}
                value={describe}
                onChange={handleDescribe}
              />
            </Descriptions.Item>
            <Descriptions.Item label="填空属性">
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>填空</th>
                    <th>控件</th>
                    <th>属性</th>
                  </tr>
                </thead>
                <tbody>
                  {attributes.map((attribute, index) => (
                    <tr key={index}>
                      <td>填空{index + 1}</td>
                      <td>
                        <ControlSelect
                          option={attribute}
                          onTypeChange={(type) => onTypeChange(type, index)}
                        />
                      </td>

                      <td>
                        {attribute.type === CONTROL_TYPE.select && (
                          <DataDictionary
                            value={attribute.optionKey}
                            onSelect={(v) => onDictSelect(v, index)}
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Descriptions.Item>
          </Descriptions>
          <div className={styles.tool}>
            <Button
              type="primary"
              onClick={() => {
                props.onConfirm({ ...editor, isEditor: false });
              }}
            >
              确定
            </Button>
            <Button
              onClick={() => {
                props.onCancel(editor);
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
