import React from "react";
import SplitPane from "react-split-pane";
import Container from "../components/Container";
import styles from './index.less'

export default () => {
  return (
    <div className={styles.wrapper}>
      <SplitPane className={styles.splitPane} split="vertical" minSize={300}>
        <div className={styles.leftToolBar}>
          leftToolBar
        </div>
        <div className={styles.rightContainer}>
          <Container />
        </div>
      </SplitPane>
    </div>
  )
}