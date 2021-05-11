import React, { useEffect, useState } from "react";
import { produce } from "immer";
import Content from "./Content";
import Editor from "./Editor";
import Toolbar from "./Toolbar";
import Title from "./title";
import { Button, Form, notification } from "antd";
import PubSub from "pubsub-js";
import { onEditEditors } from "./_tool";
import { uuid } from "../utils";
import {
  PUBSUB_TYPE,
  CONTROL_TYPE,
  TABLE_CHECKBOX_OPTION,
  FORM_LINKAGE_OPTION,
  EDIT_TYPE,
} from "@/utils/enum";
import styles from "./styles.less";
import { COMPLETION_OPTION } from "../utils/enum";

const Index = (props) => {
  const [editors, setEditors] = useState([]);

  /* 编辑保存 */
  const onConfirm = (editor) => {
    const newEditors = produce(editors, (draftState) => {
      draftState.forEach((draft, index) => {
        if (draft.key === editor.key) {
          draftState[index] = editor;
        }
      });
      return draftState;
    });
    setEditors(newEditors);
  };
  /* 编辑取消 */
  const onCancel = (editor) => {
    const newEditors = editors.filter((item) => item.key !== editor.key);
    setEditors(newEditors);
  };

  const finishEditors = editors.filter((item) => !item.isEditor);
  const editorConfigs = editors.filter((item) => item.isEditor);

  const addEditor = (msg, type) => {
    if (editorConfigs.length > 0) {
      notification.warning({
        message: "已经存在编辑内容",
      });
      return;
    }
    let editor = {
      key: uuid(),
      type: type, // 类型  radio | checkbox | input | textarea | select
      label: "描述", // 描述
      isEditor: true,
    };
    if (type === CONTROL_TYPE.tableCheckbox) {
      editor.tableCheckbox = TABLE_CHECKBOX_OPTION;
    } else if (type === CONTROL_TYPE.formLinkage) {
      editor.formLinkage = FORM_LINKAGE_OPTION;
    } else if (type === CONTROL_TYPE.completion) {
      editor.completion = COMPLETION_OPTION;
    } else {
      editor = {
        ...editor,
        options: ["选项1", "选项2", "选项3", "选项4"], // 提供选项内容
        rules: [
          {
            required: true,
          },
        ],
        configs: {
          rows: 3, //选项占的行数
          textareaHeight: 3, //多行文本高度
          maxLength: 50, //单行文本限制的字数
        },
      };
    }
    setEditors(editors.concat(editor));
  };

  const onToolClick = (type, editor) => {
    if (type === EDIT_TYPE.edit && editorConfigs.length > 0) {
      notification.warning({
        message: "已经存在编辑内容",
      });
      return;
    }
    const newEditors = onEditEditors(editors, type, editor);
    setEditors(newEditors);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    PubSub.subscribe(PUBSUB_TYPE.addEditor, addEditor);
    return () => {
      PubSub.unsubscribe(PUBSUB_TYPE.addEditor, addEditor);
    };
  }, [addEditor]);

  return (
    <>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        className={styles.container}
      >
        <div className={styles.questionWrapper}>
          <Title />
          {finishEditors.map((editor) => (
            <div key={editor.key} className={styles.content}>
              <Content editor={editor} />
              <Toolbar onToolClick={(type) => onToolClick(type, editor)} />
            </div>
          ))}
        </div>

        {editorConfigs.length === 0 && editors.length > 0 && (
          <Form.Item className={styles.submit}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        )}
      </Form>
      <div className={styles.editWrapper}>
        {editorConfigs.map((editor) => (
          <Editor
            onCancel={onCancel}
            onConfirm={onConfirm}
            key={editor.key}
            editor={editor}
          />
        ))}
      </div>

    </>
  );
};

Index.displayName = "QuestionContainer";

export default Index;
