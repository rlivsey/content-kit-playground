"use strict";define("content-kit-playground/app",["exports","ember","ember/resolver","ember/load-initializers","content-kit-playground/config/environment"],function(e,t,n,r,o){var i;t["default"].MODEL_FACTORY_INJECTIONS=!0,i=t["default"].Application.extend({modulePrefix:o["default"].modulePrefix,podModulePrefix:o["default"].podModulePrefix,Resolver:n["default"]}),r["default"](i,o["default"].modulePrefix),e["default"]=i}),define("content-kit-playground/application/controller",["exports","ember"],function(e,t){e["default"]=t["default"].Controller.extend({enterCaptured:!1,tabCaptured:!1,editorToFocus:null,cursorExit:null,editorContent:t["default"].computed({get:function(){var e=this,t=new window.Firebase("https://mbscratch.firebaseio.com/"),n=t.child("editors").child("editor");n.on("value",function(t){return e.editorContentChangedInFirebase(t.val())})},set:function(e,t){return t}}),editorContentChangedInFirebase:function(e){var t=e.content,n=e.version,r=JSON.parse(t);n!==this._lastChanged&&(this.set("editorContent",r),this.set("_editorContent",r))},setForAMoment:function(e,n){var r=this;this.set(e,n),t["default"].run.later(function(){r.set(e,!1)},1e3)},actions:{registerEditor:function(e){this.set("editorToFocus",e)},captureEnter:function(){this.setForAMoment("enterCaptured",!0)},captureTab:function(){this.setForAMoment("tabCaptured",!0)},cursorExit:function(e){this.setForAMoment("cursorExit",e)},focusStart:function(){var e=this.get("editorToFocus"),t=e.get("editor"),n=t.post.sections.toArray()[0];t.cursor.moveToSection(n,0)},focusEnd:function(){var e=this.get("editorToFocus"),t=e.get("editor"),n=t.post.sections.toArray().pop();t.cursor.moveToSection(n,n.length)},editorChanged:function(e){this._lastChanged=(new Date).getTime();var t=new window.Firebase("https://mbscratch.firebaseio.com/"),n=t.child("editors").child("editor");n.set({content:JSON.stringify(e),version:this._lastChanged}),this.set("_editorContent",e)},clearStorage:function(){for(var e in window.localStorage)e.match(/^editor-/)&&window.localStorage.removeItem(e);window.location.reload()}}})}),define("content-kit-playground/application/template",["exports"],function(e){e["default"]=Ember.HTMLBars.template(function(){var e=function(){return{meta:{topLevel:null,revision:"Ember@2.1.0",loc:{source:null,start:{line:25,column:2},end:{line:27,column:2}},moduleName:"content-kit-playground/application/template.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("p"),r=e.createTextNode("Enter captured");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),t=function(){return{meta:{topLevel:null,revision:"Ember@2.1.0",loc:{source:null,start:{line:40,column:2},end:{line:42,column:2}},moduleName:"content-kit-playground/application/template.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    ");e.appendChild(t,n);var n=e.createElement("p"),r=e.createTextNode("Tab captured");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(){return[]},statements:[],locals:[],templates:[]}}(),n=function(){return{meta:{topLevel:null,revision:"Ember@2.1.0",loc:{source:null,start:{line:63,column:2},end:{line:65,column:2}},moduleName:"content-kit-playground/application/template.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createTextNode("    Cursor exited ");e.appendChild(t,n);var n=e.createComment("");e.appendChild(t,n);var n=e.createTextNode("\n");return e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=new Array(1);return r[0]=e.createMorphAt(t,1,1,n),r},statements:[["content","cursorExit",["loc",[null,[64,18],[64,32]]]]],locals:[],templates:[]}}();return{meta:{topLevel:!1,revision:"Ember@2.1.0",loc:{source:null,start:{line:1,column:0},end:{line:82,column:6}},moduleName:"content-kit-playground/application/template.hbs"},isEmpty:!1,arity:0,cachedFragment:null,hasRendered:!1,buildFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("h1"),r=e.createTextNode("Content Kit Experiments");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","experiment");var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("h2"),o=e.createTextNode("Persist content to Firebase");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createElement("p"),o=e.createTextNode("\n    This saves content to Firebase on-change and also reacts to changes in Firebase.\n  ");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","experiment");var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("h2"),o=e.createTextNode("Capture enter to submit");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createElement("p"),o=e.createTextNode("\n    Pressing enter should trigger an action & not create a new line.\n  ");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("p"),o=e.createTextNode("\n    Shift-enter should still create a new line.\n  ");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n\n");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","experiment");var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("h2"),o=e.createTextNode("Capture tab");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createElement("p"),o=e.createTextNode("\n    Pressing tab should trigger an action & and not move focus.\n  ");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n\n");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","experiment");var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("h2"),o=e.createTextNode("Cursor exit detection");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createElement("p"),o=e.createTextNode("Detect if pressing cursor at the extremes of an editor:");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("ul"),o=e.createTextNode("\n    ");e.appendChild(r,o);var o=e.createElement("li"),i=e.createTextNode("Up on the first line of an editor");e.appendChild(o,i),e.appendChild(r,o);var o=e.createTextNode("\n    ");e.appendChild(r,o);var o=e.createElement("li"),i=e.createTextNode("Left at the start of an editor");e.appendChild(o,i),e.appendChild(r,o);var o=e.createTextNode("\n    ");e.appendChild(r,o);var o=e.createElement("li"),i=e.createTextNode("Bottom on the last line of an editor");e.appendChild(o,i),e.appendChild(r,o);var o=e.createTextNode("\n    ");e.appendChild(r,o);var o=e.createElement("li"),i=e.createTextNode("Right at the end of an editor");e.appendChild(o,i),e.appendChild(r,o);var o=e.createTextNode("\n  ");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n\n");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r),e.appendChild(t,n);var n=e.createTextNode("\n\n");e.appendChild(t,n);var n=e.createElement("div");e.setAttribute(n,"class","experiment");var r=e.createTextNode("\n  ");e.appendChild(n,r);var r=e.createElement("h2"),o=e.createTextNode("Focusing");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createElement("p"),o=e.createTextNode("\n    Related to the previous experiment, we should be able to programatically focus the editor externally.\n  ");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createElement("p"),o=e.createTextNode("\n    ");e.appendChild(r,o);var o=e.createElement("button"),i=e.createTextNode("Focus Start");e.appendChild(o,i),e.appendChild(r,o);var o=e.createTextNode("\n    ");e.appendChild(r,o);var o=e.createElement("button"),i=e.createTextNode("Focus End");e.appendChild(o,i),e.appendChild(r,o);var o=e.createTextNode("\n  ");e.appendChild(r,o),e.appendChild(n,r);var r=e.createTextNode("\n\n  ");e.appendChild(n,r);var r=e.createComment("");e.appendChild(n,r);var r=e.createTextNode("\n\n");return e.appendChild(n,r),e.appendChild(t,n),t},buildRenderNodes:function(e,t,n){var r=e.childAt(t,[4]),o=e.childAt(t,[6]),i=e.childAt(t,[8]),a=e.childAt(t,[10]),d=e.childAt(a,[5]),l=e.childAt(d,[1]),c=e.childAt(d,[3]),p=new Array(10);return p[0]=e.createMorphAt(e.childAt(t,[2]),5,5),p[1]=e.createMorphAt(r,7,7),p[2]=e.createMorphAt(r,9,9),p[3]=e.createMorphAt(o,5,5),p[4]=e.createMorphAt(o,7,7),p[5]=e.createMorphAt(i,7,7),p[6]=e.createMorphAt(i,9,9),p[7]=e.createElementMorph(l),p[8]=e.createElementMorph(c),p[9]=e.createMorphAt(a,7,7),p},statements:[["inline","my-content-kit-editor",[],["mobiledoc",["subexpr","@mut",[["get","editorContent",["loc",[null,[10,36],[10,49]]]]],[],[]],"on-change",["subexpr","action",["editorChanged"],[],["loc",[null,[10,60],[10,84]]]]],["loc",[null,[10,2],[10,86]]]],["inline","my-content-kit-editor",[],["enter",["subexpr","action",["captureEnter"],[],["loc",[null,[23,32],[23,55]]]]],["loc",[null,[23,2],[23,57]]]],["block","if",[["get","enterCaptured",["loc",[null,[25,8],[25,21]]]]],[],0,null,["loc",[null,[25,2],[27,9]]]],["inline","my-content-kit-editor",[],["tab",["subexpr","action",["captureTab"],[],["loc",[null,[38,30],[38,51]]]]],["loc",[null,[38,2],[38,53]]]],["block","if",[["get","tabCaptured",["loc",[null,[40,8],[40,19]]]]],[],1,null,["loc",[null,[40,2],[42,9]]]],["inline","my-content-kit-editor",[],["exit-up",["subexpr","action",["cursorExit","up"],[],["loc",[null,[57,12],[57,38]]]],"exit-down",["subexpr","action",["cursorExit","down"],[],["loc",[null,[58,14],[58,42]]]],"exit-left",["subexpr","action",["cursorExit","left"],[],["loc",[null,[59,14],[59,42]]]],"exit-right",["subexpr","action",["cursorExit","right"],[],["loc",[null,[60,15],[60,44]]]]],["loc",[null,[56,2],[61,4]]]],["block","if",[["get","cursorExit",["loc",[null,[63,8],[63,18]]]]],[],2,null,["loc",[null,[63,2],[65,9]]]],["element","action",[["subexpr","action",["focusStart"],[],["loc",[null,[76,21],[76,42]]]]],[],["loc",[null,[76,12],[76,44]]]],["element","action",[["subexpr","action",["focusEnd"],[],["loc",[null,[77,21],[77,40]]]]],[],["loc",[null,[77,12],[77,42]]]],["inline","my-content-kit-editor",[],["register",["subexpr","action",["registerEditor"],[],["loc",[null,[80,35],[80,60]]]]],["loc",[null,[80,2],[80,62]]]]],locals:[],templates:[e,t,n]}}())}),define("content-kit-playground/components/app-version",["exports","ember-cli-app-version/components/app-version","content-kit-playground/config/environment"],function(e,t,n){var r=n["default"].APP,o=r.name,i=r.version;e["default"]=t["default"].extend({version:i,name:o})}),define("content-kit-playground/components/content-kit-component-card",["exports","ember-content-kit/components/content-kit-component-card/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-playground/components/content-kit-editor",["exports","ember-content-kit/components/content-kit-editor/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-playground/components/content-kit-link-button/component",["exports","ember-content-kit/components/content-kit-link-button/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-playground/components/content-kit-link-prompt",["exports","ember-content-kit/components/content-kit-link-prompt/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-playground/components/content-kit-markup-button/component",["exports","ember-content-kit/components/content-kit-markup-button/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-playground/components/content-kit-section-button/component",["exports","ember-content-kit/components/content-kit-section-button/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-playground/components/content-kit-toolbar",["exports","ember-content-kit/components/content-kit-toolbar/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-playground/components/ember-wormhole",["exports","ember-wormhole/components/ember-wormhole"],function(e,t){e["default"]=t["default"]}),define("content-kit-playground/components/my-content-kit-editor/component",["exports","ember-content-kit/components/content-kit-editor/component","content-kit-playground/utils/editor-position"],function(e,t,n){e["default"]=t["default"].extend({classNames:"custom",setupEditor:function(){var e=this.get("editor"),t=this;e.registerKeyCommand({str:"enter",run:function(){return t.get("enter")?void t.sendAction("enter"):!1}}),e.registerKeyCommand({str:"tab",run:function(){return t.get("tab")?void t.sendAction("tab"):!1}}),e.registerKeyCommand({str:"up",run:function(e){return n.isOnFirstLine(e)?void t.sendAction("exit-up"):!1}}),e.registerKeyCommand({str:"down",run:function(e){return n.isOnLastLine(e)?void t.sendAction("exit-down"):!1}}),e.registerKeyCommand({str:"left",run:function(e){return n.isAtStartOfFirstLine(e)?void t.sendAction("exit-left"):!1}}),e.registerKeyCommand({str:"right",run:function(e){return n.isAtEndOfLastLine(e)?void t.sendAction("exit-right"):!1}})},didRender:function(){this._super();var e=this.get("editor");this._myLastEditor!==e&&(this._myLastEditor=e,this.setupEditor())},didInsertElement:function(){this._super(),this.sendAction("register",this)}})}),define("content-kit-playground/components/tether-to-selection",["exports","ember-content-kit/components/tether-to-selection/component"],function(e,t){e["default"]=t["default"]}),define("content-kit-playground/content-kit-titleize/helper",["exports","ember-content-kit/helpers/content-kit-titleize"],function(e,t){e["default"]=t["default"],e.contentKitTitleize=t.contentKitTitleize}),define("content-kit-playground/controllers/array",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("content-kit-playground/controllers/object",["exports","ember"],function(e,t){e["default"]=t["default"].Controller}),define("content-kit-playground/helpers/hash",["exports","ember-content-kit/helpers/hash"],function(e,t){e["default"]=t["default"],e.hash=t.hash}),define("content-kit-playground/helpers/in-array",["exports","ember-content-kit/helpers/in-array"],function(e,t){e["default"]=t["default"],e.inArray=t.inArray}),define("content-kit-playground/helpers/stringify-json",["exports","ember"],function(e,t){var n=function(){function e(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,d=e[Symbol.iterator]();!(r=(a=d.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(l){o=!0,i=l}finally{try{!r&&d["return"]&&d["return"]()}finally{if(o)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();e["default"]=t["default"].Helper.helper(function(e){var t=n(e,1),r=t[0];return JSON.stringify(r,null,2)})}),define("content-kit-playground/initializers/app-version",["exports","ember-cli-app-version/initializer-factory","content-kit-playground/config/environment"],function(e,t,n){var r=n["default"].APP,o=r.name,i=r.version;e["default"]={name:"App Version",initialize:t["default"](o,i)}}),define("content-kit-playground/initializers/export-application-global",["exports","ember","content-kit-playground/config/environment"],function(e,t,n){function r(){var e=arguments[1]||arguments[0];if(n["default"].exportApplicationGlobal!==!1){var r,o=n["default"].exportApplicationGlobal;r="string"==typeof o?o:t["default"].String.classify(n["default"].modulePrefix),window[r]||(window[r]=e,e.reopen({willDestroy:function(){this._super.apply(this,arguments),delete window[r]}}))}}e.initialize=r,e["default"]={name:"export-application-global",initialize:r}}),define("content-kit-playground/router",["exports","ember","content-kit-playground/config/environment"],function(e,t,n){var r=t["default"].Router.extend({location:n["default"].locationType});r.map(function(){}),e["default"]=r}),define("content-kit-playground/utils/editor-position",["exports"],function(e){function t(){return window.getSelection()}function n(){var e=t();return e.rangeCount?e.getRangeAt(0):void 0}function r(e){if(e.post.isBlank)return!0;var t=d(),n=l(e.element);return t&&n&&t.top-t.height<=n.top}function o(e){if(e.post.isBlank)return!0;var t=d(),n=l(e.element);return t&&n&&t.bottom+t.height>=n.bottom}function i(e){if(r(e)){if(e.post.isBlank)return!0;var t=d(),n=l(e.element);return t&&n&&t.left===n.left}}function a(e){if(o(e)){if(e.post.isBlank)return!0;var t=n(),r=t.cloneRange();r.selectNodeContents(e.element),r.setStart(t.endContainer,t.endOffset);var i=r.toString();return""===i}}function d(){var e=n().cloneRange();e.collapse(!0);var t=e.getClientRects()[0];if(t)return t;var r=document.createElement("span");r.appendChild(document.createTextNode(c)),e.insertNode(r),t=r.getClientRects()[0];var o=r.parentNode;return o.removeChild(r),o.normalize(),t}function l(e){return e.getBoundingClientRect()}e.isOnFirstLine=r,e.isOnLastLine=o,e.isAtStartOfFirstLine=i,e.isAtEndOfLastLine=a,e.cursorCoordinates=d;var c="​"}),define("content-kit-playground/config/environment",["ember"],function(e){var t="content-kit-playground";try{var n=t+"/config/environment",r=e["default"].$('meta[name="'+n+'"]').attr("content"),o=JSON.parse(unescape(r));return{"default":o}}catch(i){throw new Error('Could not read config from meta tag with name "'+n+'".')}}),runningTests?require("content-kit-playground/tests/test-helper"):require("content-kit-playground/app")["default"].create({name:"content-kit-playground",version:"0.0.0+858d2777"});