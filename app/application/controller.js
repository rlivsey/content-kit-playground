import Ember from 'ember';

const KEY_CODES = {
  enter: 13,
  tab:  9
};

export default Ember.Controller.extend({

  enterCaptured: false,
  tabCaptured: false,

  editorContent: Ember.computed({
    get() {
      const firebase = new window.Firebase("https://mbscratch.firebaseio.com/");
      const ref      = firebase.child("editors").child("editor");
      ref.on("value", snap => this.editorContentChangedInFirebase(snap.val()) );
      return;
    },
    set(_, v) {
      return v;
    }
  }),

  editorContentChangedInFirebase({ content, version }) {
    const doc = JSON.parse(content);
    if (version !== this._lastChanged) {
      this.set("editorContent", doc);
      this.set("_editorContent", doc);
    }
  },

  actions: {
    captureEnter(e) {
      // could/should this be/act like a native event so we can stop
      // enter from taking effect?
      if (e.keyCode === KEY_CODES.enter && !e.shiftKey) {
        this.set("enterCaptured", true);
        e.preventDefault();
      } else {
        this.set("enterCaptured", false);
      }
    },

    captureTab(e) {
      if (e.keyCode === KEY_CODES.tab) {
        if (e.shiftKey) {
          this.set("tabCaptured", "indented");
        } else {
          this.set("tabCaptured", "outdented");
        }
        e.preventDefault();
      } else {
        this.set("tabCaptured", false);
      }
    },

    focusStart() {
      console.log("somehow focus the start of the editor");
    },

    focusEnd() {
      console.log("somehow focus the end of the editor");
    },

    editorChanged(content) {
      this._lastChanged = (new Date()).getTime();

      const firebase = new window.Firebase("https://mbscratch.firebaseio.com/");
      const ref      = firebase.child("editors").child("editor");
      ref.set({
        content: JSON.stringify(content),
        version: this._lastChanged
      });

      this.set("_editorContent", content);
    },

    clearStorage() {
      for (let key in window.localStorage) {
        if (key.match(/^editor-/)) {
          window.localStorage.removeItem(key);
        }
      }
      window.location.reload();
    }
  }

});