import { EDIT_TYPE } from "@/utils/enum";
import { uuid } from "@/utils";
import { produce } from "immer";

export const onEditEditors = (editors, type, editor) => {
  const currentIndex = editors.findIndex((item) => item.key === editor.key);
  const otherEditors = editors.filter((item) => item.key !== editor.key);
  if (type === EDIT_TYPE.edit) {
    return produce(editors, (draftState) => {
      const currentEditor = draftState.find((item) => item.key === editor.key);
      currentEditor.isEditor = true;
    });
  } else if (type === EDIT_TYPE.copy) {
    return editors.concat({ ...editor, key: uuid() });
  } else if (type === EDIT_TYPE.delete) {
    return otherEditors;
  } else if (type === EDIT_TYPE.up_one) {
    if (currentIndex > 0) {
      return produce(editors, (draftState) => {
        draftState[currentIndex] = draftState[currentIndex - 1];
        draftState[currentIndex - 1] = editor;
      });
    }
    return editors;
  } else if (type === EDIT_TYPE.down_one) {
    if (currentIndex < editors.length - 1) {
      return produce(editors, (draftState) => {
        draftState[currentIndex] = draftState[currentIndex + 1];
        draftState[currentIndex + 1] = editor;
      });
    }
    return editors;
  } else if (type === EDIT_TYPE.up_first) {
    if (currentIndex > 0) {
      return [editor, ...otherEditors];
    }
    return editors;
  } else {
    if (currentIndex < editors.length - 1) {
      return [...otherEditors, editor];
    }
    return editors;
  }
};
