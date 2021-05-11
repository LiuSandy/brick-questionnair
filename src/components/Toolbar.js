/**
 * 每个问题相关工具栏
 */

import React from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CopyOutlined,
  DeleteOutlined,
  EditOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignTopOutlined,
} from "@ant-design/icons";
import { Divider } from "antd";
import { EDIT_TYPE } from "@/utils/enum";
import styles from "./styles.less";

const Index = ({ onToolClick }) => {
  const onClick = (e) => {
    const target = e.target;
    onToolClick(target.getAttribute("type"));
  };

  return (
    <div onClick={onClick} className={styles.bottomTool}>
      <div>
        <a type={EDIT_TYPE.edit}>
          <EditOutlined />
          编辑
        </a>
        <Divider type="vertical" />
        <a type={EDIT_TYPE.copy}>
          <CopyOutlined />
          复制
        </a>
        <Divider type="vertical" />
        <a type={EDIT_TYPE.delete}>
          <DeleteOutlined />
          删除
        </a>
      </div>
      <div>
        <a type={EDIT_TYPE.up_one}>
          <ArrowUpOutlined />
          上移
        </a>
        <Divider type="vertical" />
        <a type={EDIT_TYPE.down_one}>
          <ArrowDownOutlined />
          下移
        </a>
        <Divider type="vertical" />
        <a type={EDIT_TYPE.up_first}>
          <VerticalAlignTopOutlined />
          最前
        </a>
        <Divider type="vertical" />
        <a type={EDIT_TYPE.down_first}>
          <VerticalAlignBottomOutlined />
          最后
        </a>
      </div>
    </div>
  );
};

export default Index;
