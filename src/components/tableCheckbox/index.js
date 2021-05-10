import React, { useEffect, useState } from "react";
import { COLUMN_CONFIG } from "@/utils/enum";
import { produce } from "immer";
import styles from "./table.less";
import { Button, Checkbox, Descriptions, Form, Input } from "antd";
import { deepClone, lastRight } from "@/utils";
import { TABLE_CHECKBOX_OPTION } from "@/utils/enum";

/* 渲染单元格 */
const RenderCell = ({ identify, renderType, label, index }) => {
  if (renderType === COLUMN_CONFIG.describe) {
    return label;
  }
  if (renderType === COLUMN_CONFIG.option) {
    return (
      <Form.Item
        name={[identify, `${label}##${index}`]}
        valuePropName="checked"
      >
        <Checkbox>{label}</Checkbox>
      </Form.Item>
    );
  }
  return null;
};

const TextArea = ({ data, type = "row", relationData = [], onConfirm }) => {
  const [value, setValue] = useState();
  useEffect(() => {
    if (data.length > 0) {
      let newValue = "";
      if (type === "row") {
        newValue = data.map((row) => row[0]);
      } else {
        newValue = data;
      }
      setValue(newValue.join("\n"));
    }
  }, [data]);

  const confirmRow = () => {
    const values = value?.split("\n");
    const getNewRows = (rows) =>
      produce(rows, (draftState) => {
        for (let i = 0; i < values.length; i++) {
          if (!draftState[i]) {
            draftState[i] = deepClone(
              draftState[i - 1] || TABLE_CHECKBOX_OPTION.rows[0]
            );
          }
          // draftState[i][0] = values[i].split(",");
          draftState[i][0] = values[i];
        }
      });
    let newRows = [];
    if (values.length < data.length) {
      /* 删除行 */
      const temps = data.slice(0, values.length);
      newRows = getNewRows(temps);
    } else {
      newRows = getNewRows(data);
    }
    onConfirm({ rows: newRows });
  };

  /**
   * 列更新，会涉及到行的改变
   */
  const confirmColumn = () => {
    const values = value?.split("\n");
    const length = values.length;
    if (length < data.length) {
      /* 删除列 */
      const rows = produce(relationData, (draftState) => {
        for (let i = 0; i < draftState.length; i++) {
          draftState[i] = relationData[i].slice(0, length);
        }
      });
      onConfirm({ rows, columns: values });
    } else if (length > data.length) {
      const rows = produce(relationData, (draftState) => {
        for (let i = 0; i < draftState.length; i++) {
          draftState[i].push(lastRight(relationData[i]));
        }
      });
      onConfirm({ rows, columns: values });
    }
  };

  const onBlur = () => {
    if (type === "row") {
      confirmRow();
    } else {
      confirmColumn();
    }
  };
  return (
    <Input.TextArea
      value={value}
      rows={4}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      onBlur={onBlur}
    />
  );
};

const Index = (props) => {
  const [editor, setEditor] = useState({});

  useEffect(() => {
    setEditor(props.editor);
  }, [props.editor]);

  const onConfirm = (values) => {
    const newEditor = produce(editor, (draftState) => {
      if (values.rows) {
        draftState.tableCheckbox.rows = values.rows;
      }
      if (values.columns) {
        draftState.tableCheckbox.columns = values.columns;
        for (let i = 0; i < values.columns.length; i++) {
          if (!draftState.tableCheckbox.columnConfig.hasOwnProperty(i)) {
            draftState.tableCheckbox.columnConfig[i] =
              draftState.tableCheckbox.columnConfig[i - 1];
          }
        }
      }
    });
    setEditor(newEditor);
  };

  const { columns = [], rows = [], columnConfig } = editor?.tableCheckbox || {};
  return (
    <div>
      <Descriptions title={editor.label}>
        <Descriptions.Item>
          <table className={styles.table}>
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((item, index) => (
                <tr key={index}>
                  {item.map((value, i) => (
                    <td key={i}>
                      <RenderCell
                        identify={editor.key}
                        label={value}
                        index={`${index + 1}-${i}`}
                        renderType={columnConfig[i]}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Descriptions.Item>
      </Descriptions>

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
            <Descriptions.Item label="行标题">
              <TextArea type="row" data={rows} onConfirm={onConfirm} />
            </Descriptions.Item>
            <Descriptions.Item label="列标题">
              <TextArea
                type="column"
                data={columns}
                relationData={rows}
                onConfirm={onConfirm}
              />
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
    </div>
  );
};

export default Index;
