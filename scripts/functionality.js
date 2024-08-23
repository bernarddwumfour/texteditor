const bold = document.getElementsByClassName('bold')[0];
const undo = document.getElementsByClassName('undo')[0];
const redo = document.getElementsByClassName('redo')[0];
const editor = document.getElementsByClassName('editor')[0];
const iframe = document.getElementsByClassName('editorIframe')[0];
const copy = document.getElementsByClassName('copy')[0];
const paste = document.getElementsByClassName('paste')[0];
const cut = document.getElementsByClassName('cut')[0];



function getIframeDocument() {
  return iframe.contentDocument || iframe.contentWindow.document;
}

function getEditorElement() {
  const doc = getIframeDocument();
  return doc.getElementsByClassName('editor')[0];
}

// Copy text to the clipboard
function copyText() {
  const editor = getEditorElement();
  const selection = editor.ownerDocument.getSelection();

  if (selection && !selection.isCollapsed) {
    navigator.clipboard
      .writeText(selection.toString())
      .then(() => {
        console.log('Text copied to clipboard');
      })
      .catch((err) => {
        console.error('Failed to copy text: ', err);
      });
  }
}

copy.addEventListener('click', copyText);

// Cut text to the clipboard
function cutText() {
  const editor = getEditorElement();
  const selection = editor.ownerDocument.getSelection();

  if (selection && !selection.isCollapsed) {
    navigator.clipboard
      .writeText(selection.toString())
      .then(() => {
        selection.deleteFromDocument();
        console.log('Text cut to clipboard');
      })
      .catch((err) => {
        console.error('Failed to cut text: ', err);
      });
  }
}

cut.addEventListener('click', cutText);

// Paste text from the clipboard
function pasteText() {
  const editor = getEditorElement();
  const selection = editor.ownerDocument.getSelection();

  navigator.clipboard
    .readText()
    .then((text) => {
      if (selection.rangeCount > 0) {
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(text));
      } else {
        editor.appendChild(document.createTextNode(text));
      }
      console.log('Text pasted from clipboard');
    })
    .catch((err) => {
      console.error('Failed to paste text: ', err);
    });
}

paste.addEventListener('click', pasteText);


// Store the history of changes
let history = [];
let historyIndex = -1;

// Save the current state of the contenteditable element to history
function saveState() {
  const editor = getEditorElement();
  // Only save if there are changes
  if (historyIndex === -1 || history[historyIndex] !== editor.innerHTML) {
    // Remove any future states if we are adding a new state in the middle of history
    if (historyIndex < history.length - 1) {
      history = history.slice(0, historyIndex + 1);
    }

    // Add the current state and update the index
    history.push(editor.innerHTML);
    historyIndex++;
  }
}

// Undo the last change
function undoAction() {
    console.log("undo")
  if (historyIndex > 0) {
    historyIndex--;
    const editor = getEditorElement();
    editor.innerHTML = history[historyIndex];
  }
}

undo.addEventListener('click', undoAction);

// Redo the last undone change
function redoAction() {
    console.log("redo")
  if (historyIndex < history.length - 1) {
    historyIndex++;
    const editor = getEditorElement();
    editor.innerHTML = history[historyIndex];
  }
}

redo.addEventListener('click', redoAction);

// Add event listeners to save state after each input event
function addInputListeners() {
  const editor = getEditorElement();

  // Save the state on input
  editor.addEventListener('input', () => {
    saveState();
  });
}

// Initialize the editor (this function should be called after the iframe is fully loaded)
function initializeEditor() {
  saveState(); // Save the initial state
  addInputListeners(); // Add listeners for input events
}

// Wait for the iframe to load before initializing
iframe.addEventListener('load', () => {
  initializeEditor();
});

