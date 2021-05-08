import React, { useState } from "react";
import ReactDom from "react-dom";
import styles from "./table.less";
import { Button, Checkbox, Popover, Radio } from "antd";

const data = [
  ["列1", "列2", "列3"],
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

const RadioNode = () => (
  <div>
    <input type="radio" id="huey" name="drone" value="huey" />
    <label for="huey">huey</label>
  </div>
);
const CheckBoxNode = () => {
  const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return <Checkbox onChange={onChange}>Checkbox</Checkbox>;
};

const Index = (props) => {
  const [dataSource, setDataSource] = useState(data);
  const [editable, setEditable] = useState(false);

  const [columns, ...rest] = dataSource;

  /* 新增一行 */
  const addRow = () => {
    const length = dataSource[0].length;
    const row = new Array(length).fill("");
    setDataSource([...dataSource, row]);
  };

  /* 新增一列 */
  const addColumn = () => {
    const newData = dataSource.map((item, index) => {
      if (index === 0) {
        return [...item, `列${item.length + 1}`];
      }
      return [...item, ""];
    });
    setDataSource(newData);
  };

  /* 插入单选 */
  const insertRadio = () => {
    let testDiv = document.createElement("div");
    ReactDom.render(<RadioNode />, testDiv);
    const selectHtml = testDiv.innerHTML;
    document.execCommand("insertHtml", false, selectHtml);
  };

  return (
    <>
      <Button
        onClick={() => {
          setEditable((prevState) => {
            return !prevState;
          });
        }}
      >
        {!editable ? "编辑" : "预览"}
      </Button>
      <Button onClick={addColumn}>新增一列</Button>
      <Button onClick={addRow}>新增一行</Button>
      <Button onClick={insertRadio}>插入单选</Button>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <table
        suppressContentEditableWarning
        className={styles.table}
        contentEditable={editable}
      >
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rest.map((item, index) => (
            <tr key={index}>
              {item.map((value, i) => (
                <td key={i}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Index;
