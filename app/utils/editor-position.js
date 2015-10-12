const ZWSP = "\u200B";

function getSelection() {
  return window.getSelection();
}

function getRange() {
  const selection = getSelection();
  if (selection.rangeCount) {
    return selection.getRangeAt(0);
  }
}

export function isOnFirstLine(editor) {
  if (editor.post.isBlank) {
    return true;
  }

  const cursorDimensions  = cursorCoordinates();
  const elementDimensions = getElementDimensions(editor.element);

  return cursorDimensions && elementDimensions && (cursorDimensions.top - cursorDimensions.height) <= elementDimensions.top;
}

export function isOnLastLine(editor) {
  if (editor.post.isBlank) {
    return true;
  }

  const cursorDimensions  = cursorCoordinates();
  const elementDimensions = getElementDimensions(editor.element);

  return cursorDimensions && elementDimensions && (cursorDimensions.bottom + cursorDimensions.height) >= elementDimensions.bottom;
}

export function isAtStartOfFirstLine(editor) {
  if (!isOnFirstLine(editor)) {
    return;
  }

  if (editor.post.isBlank) {
    return true;
  }

  const cursorDimensions  = cursorCoordinates();
  const elementDimensions = getElementDimensions(editor.element);

  return cursorDimensions && elementDimensions && cursorDimensions.left === elementDimensions.left;
}

export function isAtEndOfLastLine(editor) {
  if (!isOnLastLine(editor)) {
    return;
  }

  if (editor.post.isBlank) {
    return true;
  }

  const range = getRange();
  const clone = range.cloneRange();

  clone.selectNodeContents(editor.element);
  clone.setStart(range.endContainer, range.endOffset);

  const str = clone.toString();
  return str === "";
}

// based on http://stackoverflow.com/a/6847328
export function cursorCoordinates() {
  const range = getRange().cloneRange();
  range.collapse(true);

  let dimensions = range.getClientRects()[0];
  if (dimensions) {
    return dimensions;
  }

  // if we don't have client rects on the selection
  // then we need to insert a temporary node

  const span = document.createElement("span");
  span.appendChild(document.createTextNode(ZWSP));
  range.insertNode(span);

  dimensions = span.getClientRects()[0];

  // remove the temporary node
  const spanParent = span.parentNode;
  spanParent.removeChild(span);
  spanParent.normalize();

  return dimensions;
}

function getElementDimensions(el) {
  return el.getBoundingClientRect();
}
