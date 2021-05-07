import React from "react";
import SplitPane from "react-split-pane";
import Container from "../components/Container";
import SliderTool from "../components/SliderTool";
import styles from './index.less'

export default () => {
  return (
    <SplitPane className={styles.splitPane} split="vertical" minSize={300}>
      <div className={styles.leftToolBar}>
        <SliderTool />
      </div>
      <div className={styles.rightContainer}>
        <Container />
      </div>
    </SplitPane>
  )
}