/* 控件类型 */
export const CONTROL_TYPE = {
  radio: "RADIO",
  checkbox: "CHECKBOX",
  input: "INPUT",
  textarea: "TEXTAREA",
  table: "TABLE",
  tableCheckbox: "TABLE_CHECKBOX",
  formLinkage: "FORM_LINKAGE",
};

/* 发布订阅类型 */
export const PUBSUB_TYPE = {
  addEditor: "ADD_EDITOR",
};

/* 需要配置选项的类型 */
export const NEED_CONFIG_OPTIONS = [CONTROL_TYPE.radio, CONTROL_TYPE.checkbox];

export const COLUMN_CONFIG = {
  option: 1 /* 选项 */,
  describe: 2 /* 描述 */,
};

//
export const TABLE_CHECKBOX_OPTION = {
  columns: ["列1", "列2", "列3", "列4"],
  rows: [
    ["描述1", "Apple", "Pear", "Orange"],
    ["描述2", "Apple", "Pear", "Orange"],
  ],
  columnConfig: {
    0: COLUMN_CONFIG.describe,
    1: COLUMN_CONFIG.option,
    2: COLUMN_CONFIG.option,
    3: COLUMN_CONFIG.option,
  } /* 默认第一列为描述，其他为选项，新增列负责上一列属性 */,
};

export const FORM_LINKAGE_OPTION = {
  options: ["yes", "no"],
  relation: {
    0: {
      visible: false, // 是否显示
      type: CONTROL_TYPE.input,
      isRelation: false, // 是否关联
    },
    1: {
      visible: false,
      type: CONTROL_TYPE.input,
      isRelation: false,
    },
  },
};
