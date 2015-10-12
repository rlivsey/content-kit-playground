import ContentKitEditorComponent from 'ember-content-kit/components/content-kit-editor/component';

const KEY_CODES = {
  enter:     13,
  tab:       9,
  left:      37,
  up:        38,
  right:     39,
  down:      40,
};

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
      check(e) {
        return e.keyCode === KEY_CODES.enter;
      },
      run(/* editor */) {
        component.sendAction("enter");
      }
    });

    editor.registerKeyCommand({
      check(e) {
        return e.keyCode === KEY_CODES.tab;
      },
      run(/* editor */) {
        component.sendAction("tab");
      }
    });

    editor.registerKeyCommand({
      check(e) {
        return e.keyCode === KEY_CODES.up && isOnFirstLine(editor);
      },
      run(/* editor */) {
        component.sendAction("exit-up");
      }
    });

    editor.registerKeyCommand({
      check(e) {
        return e.keyCode === KEY_CODES.down && isOnLastLine(editor);
      },
      run(/* editor */) {
        component.sendAction("exit-down");
      }
    });

    editor.registerKeyCommand({
      check(e) {
        return e.keyCode === KEY_CODES.left && isAtStartOfFirstLine(editor);
      },
      run(/* editor */) {
        component.sendAction("exit-left");
      }
    });

    editor.registerKeyCommand({
      check(e) {
        return e.keyCode === KEY_CODES.right && isAtEndOfLastLine(editor);
      },
      run(/* editor */) {
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