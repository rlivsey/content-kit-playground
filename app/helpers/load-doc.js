import Ember from 'ember';

export default Ember.Helper.helper(function([name]) {
  const json = window.localStorage.getItem(`editor-${name}`);
  if (!json) {
    return;
  }
  return JSON.parse(json);
});