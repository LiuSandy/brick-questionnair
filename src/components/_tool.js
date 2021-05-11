import { EDIT_TYPE } from "@/utils/enum";
import { uuid } from "@/utils";
import { produce } from "immer";

export const onEditEditors = (editors, type, editor) => {
  if (type === EDIT_TYPE.edit) {
    return produce(editors, (draftState) => {
      const currentEditor = draftState.find((item) => item.key === editor.key);
      currentEditor.isEditor = true;
    });
  } else if (type === EDIT_TYPE.copy) {
    return editors.concat({ ...editor, key: uuid() });
  } else if (type === EDIT_TYPE.delete) {
    return editors.filter((item) => item !== editor.key);
  } else if (type === EDIT_TYPE.up_one) {
    return editors;
  } else if (type === EDIT_TYPE.down_one) {
    return editors;
  } else if (type === EDIT_TYPE.up_first) {
    return editors;
  } else {
    return editors;
  }
};
