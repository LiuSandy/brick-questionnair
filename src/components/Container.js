import React, {useEffect, useState} from "react";
import {produce} from 'immer'
import Content from "./Content";
import Editor from "./Editor";
import {Button, Form, notification} from "antd";
import PubSub from "pubsub-js";
import {uuid} from '../utils'
import {PUBSUB_TYPE} from '@/utils/enum'

const Index = props => {

  const [editors, setEditors] = useState([])

  const finishEditors = editors.filter(item => !item.isEditor)
  const editorConfigs = editors.filter(item => item.isEditor)

  const addEditor = (msg, type) => {
    if (editorConfigs.length > 0) {
      notification.warning({
        message: '已经存在编辑内容',
      })
      return
    }
    const editor = {
      key: uuid(),
      type: type, // 类型  radio | checkbox | input | textarea | select
      label: '描述',     // 描述
      isEditor: true, // 处于编辑状态还是渲染状态 true 编辑状态
      options: ['选项1', '选项2', '选项3', '选项4'], // 提供选项内容
      rules: [{
        required: true,
      }],
      configs: {
        rows: 3, //选项占的行数
        textareaHeight: 3, //多行文本高度
        maxLength: 50, //单行文本限制的字数
      }
    }
    setEditors(prevState => {
      console.log("prevState", prevState)
      return prevState.concat(editor)
    })
  }

  /* 编辑保存 */
  const onConfirm = editor => {
    const newEditors = produce(editors, draftState => {
      draftState.forEach((draft, index) => {
        if (draft.key === editor.key) {
          draftState[index] = editor
        }
      })
      return draftState
    })
    setEditors(newEditors)
  }
  /* 编辑取消 */
  const onCancel = editor=>{
    const newEditors = editors.filter(item=>item.key !== editor.key)
    setEditors(newEditors)
  }

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  useEffect(() => {
    PubSub.subscribe(PUBSUB_TYPE.addEditor, addEditor)
    return () => {
      PubSub.unsubscribe(PUBSUB_TYPE.addEditor, addEditor)
    }
  }, [])

  return (
    <>
      <Form
        name="basic"
        layout='vertical'
        initialValues={{remember: true}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {finishEditors.map(editor => (
          <Content key={editor.key} editor={editor}/>
        ))}
        {editorConfigs.length === 0 && editors.length > 0 && <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>}
      </Form>
      {editorConfigs.map(editor => (
        <Editor onCancel={onCancel} onConfirm={onConfirm} key={editor.key} editor={editor}/>
      ))}
    </>
  )
}

Index.displayName = "QuestionContainer"

export default Index