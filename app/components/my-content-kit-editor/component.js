import ContentKitEditorComponent from 'ember-content-kit/components/content-kit-editor/component';

export default ContentKitEditorComponent.extend({
  classNames: "custom",

  setupEditor() {
    const editor = this.get("editor");

    editor.registerKeyCommand({
      modifier: 1, // CMD
      str: 'O',
      run: () => {
        console.log("CMD+O pressed");
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
  }
});