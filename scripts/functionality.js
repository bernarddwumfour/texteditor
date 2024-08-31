const undo = document.getElementsByClassName('undo')[0];
const redo = document.getElementsByClassName('redo')[0];
const editor = document.getElementsByClassName('editor')[0];
const iframe = document.getElementsByClassName('editorIframe')[0];
const copy = document.getElementsByClassName('copy')[0];
const paste = document.getElementsByClassName('paste')[0];
const cut = document.getElementsByClassName('cut')[0];
const alignLeft = document.getElementsByClassName('alignLeft')[0];
const alignRight = document.getElementsByClassName('alignRight')[0];
const alignCenter = document.getElementsByClassName('alignCenter')[0];
const alignJustify = document.getElementsByClassName('alignJustify')[0];
const bulletList = document.getElementsByClassName('bulletList')[0];
const numberList = document.getElementsByClassName('numberList')[0];
const bold = document.getElementsByClassName('bold')[0];
const italic = document.getElementsByClassName('italic')[0];
const strikethrough = document.getElementsByClassName('strikethrough')[0];
const superscript = document.getElementsByClassName('superscript')[0];
const subscript = document.getElementsByClassName('subscript')[0];
const outline = document.getElementsByClassName('outline')[0];
const underline = document.getElementsByClassName('underline')[0];
const indentLeft = document.getElementsByClassName('indentLeft')[0];
const indentRight = document.getElementsByClassName('indentRight')[0];
const paragraphWrap = document.getElementsByClassName('paragraphWrap')[0];
const fontSize = document.getElementsByClassName('fontSize')[0];
const fontFamily = document.getElementsByClassName('fontFamily')[0];

//Modal Buttons
const notification_toggle = document.querySelector('.toggle_notification')
const messages_toggle = document.querySelector('.toggle_messages')
const profile_toggle = document.querySelector('.toggle_profile')

//Modal back buttons
const close_notification = document.querySelector('.close-notification')
const close_message = document.querySelector('.close-message')
const close_profile = document.querySelector('.close-profile')

//Modals
const app_notification = document.querySelector('.app_notification')
const top_message = document.querySelector('.top-message')

//Toggling Notifications slider
notification_toggle.addEventListener('click',()=>{
  app_notification.classList.toggle('!hidden')
  top_message.classList.add('!hidden')
})

//Toggling messages modal
messages_toggle.addEventListener('click',()=>{
  top_message.classList.toggle('!hidden')
})

close_notification.addEventListener('click',()=>{
  app_notification.classList.add('!hidden')
})

close_message.addEventListener('click',()=>{
  top_message.classList.add('!hidden')
})


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



// UNDO AND REDO
// Store the history of changes
let history = [];
let historyIndex = -1;

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
  // console.log('History:', history);
  // console.log('History Index:', historyIndex);
}


let debounceTimer;
function addInputListeners() {
  const editor = getEditorElement();
  if (editor) {
    editor.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        saveState();
      }, 300); // Adjust the timeout as needed
    });
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

undo.addEventListener('click', ()=>{
  undoAction()
});

// Redo the last undone change
function redoAction() {
    console.log("redo")
  if (historyIndex < history.length - 1) {
    historyIndex++;
    const editor = getEditorElement();
    editor.innerHTML = history[historyIndex];
  }
}
redo.addEventListener('click', ()=>{
  redoAction()
});

// Initialize the editor (this function should be called after the iframe is fully loaded)
function initializeEditor() {
  saveState(); // Save the initial state
  addInputListeners(); // Add listeners for input events
}

// Wait for the iframe to load before initializing
iframe.addEventListener('load', () => {
  initializeEditor();
});




//Second box
//Formatting text with the execCommand() function
function execCommandInIframe(command, value = null) {
  const editorDoc = iframe.contentDocument || iframe.contentWindow.document;

  if (!editorDoc) return;

  // Focus on the contenteditable element inside the iframe
  editorDoc.execCommand(command, false, value);
}


bold && bold.addEventListener('click',()=>{
  execCommandInIframe('bold');
})

italic && italic.addEventListener('click',()=>{
  execCommandInIframe('italic');
})

subscript && subscript.addEventListener('click',()=>{
  execCommandInIframe('subscript');
})

superscript && superscript.addEventListener('click',()=>{
  execCommandInIframe('superscript');
})

strikethrough && strikethrough.addEventListener('click',()=>{
  execCommandInIframe('strikethrough');
})

outline && outline.addEventListener('click',()=>{
  execCommandInIframe('outline');
})

underline && underline.addEventListener('click',()=>{
  execCommandInIframe('underline');
})

alignCenter && alignCenter.addEventListener('click',()=>{
  execCommandInIframe('justifyCenter');
})

alignLeft && alignLeft.addEventListener('click',()=>{
  execCommandInIframe('justifyLeft');
})

alignRight && alignRight.addEventListener('click',()=>{
  execCommandInIframe('justifyRight');
})

alignJustify && alignJustify.addEventListener('click',()=>{
  execCommandInIframe('justifyfull');
})

bulletList && bulletList.addEventListener('click',()=>{
  execCommandInIframe('insertUnorderedList');
})

numberList && numberList.addEventListener('click',()=>{
  execCommandInIframe('insertOrderedList');
})

indentLeft && indentLeft.addEventListener('click',()=>{
  execCommandInIframe('indent');
})

indentRight && indentRight.addEventListener('click',()=>{
  execCommandInIframe('outdent');
})

paragraphWrap && paragraphWrap.addEventListener('click',()=>{
  alert('click')
  execCommandInIframe('formatBlock');
})

fontSize && fontSize.addEventListener('click',()=>{
  execCommandInIframe('fontSize',fontSize.value)
})

fontFamily && fontFamily.addEventListener('click',()=>{
  execCommandInIframe('fontName',fontFamily.value)
})