/**
 * 显示问卷标题，及内容
 */
import React from "react";
import styles from "../styles.less";

const Index = () =>{
  return (
    <div className={styles.content}>
      <h1>调查问卷</h1>
      <p>在左侧选择添加题型，您也可以点击当前位置，编辑此处内容</p>
    </div>
  )
}

export default Index