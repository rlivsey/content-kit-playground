import ContentKitEditorComponent from 'ember-content-kit/components/content-kit-editor/component';

import {
  isOnFirstLine,
  isOnLastLine,
  isAtStartOfFirstLine,
  isAtEndOfLastLine
} from 'content-kit-playground/utils/editor-position';

export default ContentKitEditorComponent.extend({
  classNames: "custom",

  setupEditor() {
    const editor = this.get("editor");
    const component = this;

    editor.registerKeyCommand({
      str: "enter",
      run(/* editor */) {
        if (!component.get("enter")) {
          return false;
        }
        component.sendAction("enter");
      }
    });

    editor.registerKeyCommand({
      str: "tab",
      run(/* editor */) {
        if (!component.get("tab")) {
          return false;
        }
        component.sendAction("tab");
      }
    });

    editor.registerKeyCommand({
      str: "up",
      run(editor) {
        if (!isOnFirstLine(editor)) {
          return false;
        }
        component.sendAction("exit-up");
      }
    });

    editor.registerKeyCommand({
      str: "down",
      run(editor) {
        if (!isOnLastLine(editor)) {
          return false;
        }
        component.sendAction("exit-down");
      }
    });

    editor.registerKeyCommand({
      str: "left",
      run(editor) {
        if (!isAtStartOfFirstLine(editor)) {
          return false;
        }
        component.sendAction("exit-left");
      }
    });

    editor.registerKeyCommand({
      str: "right",
      run(editor) {
        if (!isAtEndOfLastLine(editor)) {
          return false;
        }
        component.sendAction("exit-right");
      }
    });
  },

  // can't just do this on didInsertElement
  // as the editor is re-created each time mobiledoc changes
  // so we need to re-add handlers each time that happens
  didRender() {
    this._super();
    const editor = this.get("editor");
    if (this._myLastEditor !== editor) {
      this._myLastEditor = editor;
      this.setupEditor();
    }
  },

  didInsertElement() {
    this._super();
    this.sendAction("register", this);
  }
});