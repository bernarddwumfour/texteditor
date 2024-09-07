const iframe = document.getElementsByClassName('editorIframe')[0];


function getIframeDocument() {
  return iframe.contentDocument || iframe.contentWindow.document;
}

function getEditorElement() {
  const doc = getIframeDocument();
  return doc.getElementsByClassName('editor')[0];
}


let history;
let historyIndex;
// UNDO AND REDO
// Store the history of changes
iframe &&
  iframe.addEventListener('load', () => {
    history = [];
    historyIndex = -1;
  });

// Save the current state of the contenteditable element to history
function saveState() {
  const editor = getEditorElement();
  const currentState = editor.innerHTML;
  console.log('Saving state:', currentState);

  if (historyIndex === -1 || history[historyIndex] !== currentState) {
    if (historyIndex < history.length - 1) {
      history = history.slice(0, historyIndex + 1);
    }
    history.push(currentState);
    historyIndex++;
  }
  console.log('History:', history);
  console.log('History Index:', historyIndex);
}

let debounceTimer;
function addInputListeners() {
  const editor = getEditorElement();
  if (editor) {
    editor.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        saveState();
      }, 500); // Adjust the timeout as needed
    });
  }
}

// Undo the last change
function undoAction() {
  console.log('undo');
  if (historyIndex > 0) {
    historyIndex--;
    const editor = getEditorElement();
    editor.innerHTML = history[historyIndex];
  }
}

undo &&
  undo.addEventListener('click', () => {
    undoAction();
  });

// Redo the last undone change
function redoAction() {
  console.log('redo');
  if (historyIndex < history.length - 1) {
    historyIndex++;
    const editor = getEditorElement();
    editor.innerHTML = history[historyIndex];
  }
}
redo &&
  redo.addEventListener('click', () => {
    redoAction();
  });

// Initialize the editor (this function should be called after the iframe is fully loaded)
function initializeEditor() {
  saveState(); // Save the initial state
  addInputListeners(); // Add listeners for input events
}

// Wait for the iframe to load before initializing
// document.addEventListener('load',()=>{
iframe &&
  iframe.addEventListener('load', () => {
    console.log('initialized');
    initializeEditor();
  });
// });

//Second box