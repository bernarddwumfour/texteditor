

//Declaring variables for buttons
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
const wrapParagraph = document.getElementsByClassName('wrapParagraph')[0];
const preview = document.getElementsByClassName('preview')[0];
const fullScreen = document.getElementsByClassName('fullScreen')[0];
const workarea_scale = document.getElementById('workarea_scale');
const textColor = document.getElementsByClassName('textColor')[0];
const lineHeight = document.getElementsByClassName('lineHeight')[0];
const hiliteColor = document.getElementsByClassName('hiliteColor')[0];
const mark = document.getElementsByClassName('mark')[0];
const workarea_scale_output = document.getElementById('workarea_scale_output');

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

copy && copy.addEventListener('click', copyText);

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

cut && cut.addEventListener('click', cutText);

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

// editor && editor.addEventListener('paste', function(e) {
//   e.preventDefault(); // Prevent the default paste behavior

//   const clipboardData = e.clipboardData || window.clipboardData;
//   const pastedHtml = clipboardData.getData('text/html');
//   const pastedText = clipboardData.getData('text/plain');

//   let contentToInsert;

//   // Handle HTML content if available
//   if (pastedHtml) {
//       contentToInsert = pastedHtml;
//   } else if (pastedText) {
//       // Convert plain text to HTML
//       contentToInsert = `<p>${pastedText.replace(/\n/g, '</p><p>').replace(/<\/p><p>$/, '')}</p>`;
//   } else {
//       contentToInsert = '';
//   }

//   // Insert the content into the contenteditable element
//   const contentEditable = e.target;
//   contentEditable.focus();
//    execCommandInIframe('insertHTML', false, contentToInsert);
// });

paste && paste.addEventListener('click', pasteText);

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
//Formatting text with the execCommand() function
function execCommandInIframe(command, value = null) {
  const editorDoc = iframe.contentDocument || iframe.contentWindow.document;

  if (!editorDoc) return;

  // Focus on the contenteditable element inside the iframe
  editorDoc.execCommand(command, false, value);
}

bold &&
  bold.addEventListener('click', () => {
    execCommandInIframe('bold');
  });

italic &&
  italic.addEventListener('click', () => {
    execCommandInIframe('italic');
  });

subscript &&
  subscript.addEventListener('click', () => {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const selection = iframeDoc.getSelection();

    if (!selection.rangeCount) return;

    const parentElement = selection.anchorNode.parentElement;

    if (parentElement.tagName === 'SUB') {
      execCommandInIframe('removeFormat'); // Applies superscript formatting
    } else {
      execCommandInIframe('subscript');
    }
  });

superscript &&
  superscript.addEventListener('click', () => {
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const selection = iframeDoc.getSelection();

    if (!selection.rangeCount) return;

    const parentElement = selection.anchorNode.parentElement;

    if (parentElement.tagName === 'SUP') {
      execCommandInIframe('removeFormat'); // Applies superscript formatting
    } else {
      execCommandInIframe('superscript');
    }
  });

strikethrough &&
  strikethrough.addEventListener('click', () => {
    execCommandInIframe('strikethrough');
  });

outline &&
  outline.addEventListener('click', () => {
    execCommandInIframe('outline');
  });

underline &&
  underline.addEventListener('click', () => {
    execCommandInIframe('underline');
  });

alignCenter &&
  alignCenter.addEventListener('click', () => {
    execCommandInIframe('justifyCenter');
  });

alignLeft &&
  alignLeft.addEventListener('click', () => {
    execCommandInIframe('justifyLeft');
  });

alignRight &&
  alignRight.addEventListener('click', () => {
    execCommandInIframe('justifyRight');
  });

alignJustify &&
  alignJustify.addEventListener('click', () => {
    execCommandInIframe('justifyfull');
  });

bulletList &&
  bulletList.addEventListener('click', () => {
    execCommandInIframe('insertUnorderedList');
  });

numberList &&
  numberList.addEventListener('click', () => {
    execCommandInIframe('insertOrderedList');
  });

indentLeft &&
  indentLeft.addEventListener('click', () => {
    execCommandInIframe('indent');
  });

indentRight &&
  indentRight.addEventListener('click', () => {
    execCommandInIframe('outdent');
  });

paragraphWrap &&
  paragraphWrap.addEventListener('click', () => {
    alert('click');
    execCommandInIframe('formatBlock');
  });

fontSize &&
  fontSize.addEventListener('click', () => {
    execCommandInIframe('fontSize', fontSize.value);
  });

fontFamily &&
  fontFamily.addEventListener('click', () => {
    execCommandInIframe('fontName', fontFamily.value);
  });

wrapParagraph &&
  wrapParagraph.addEventListener('click', () => {
    // var selection = window.getSelection();
    // if (selection.rangeCount > 0) {
    //     var range = selection.getRangeAt(0);

    //     // Collapse the range to the start of the selected text, placing the cursor there
    //     range.collapse(true);

    // // //     // Clear the selection and add the collapsed range
    // //     selection.removeAllRanges();
    // //     selection.addRange(range);
    // }
    iframe.contentWindow.focus();
    execCommandInIframe('formatBlock', 'p');
    // execCommandInIframe('insertParagraph','p');
  });

preview &&
  preview.addEventListener('click', () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    // const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    // const text = iframeDoc.getElementsByTagName('html')[0]
    // iframe.style.setProperty('--scale-factor', '0.57');
    // text.style.setProperty('--scale-factor', '0.57');
    // workarea_scale.value = 57;
    // workarea_scale_output.innerText = "57"
  });

fullScreen &&
  fullScreen.addEventListener('click', () => {
    document.documentElement.requestFullscreen();
  });

// Function to apply text outline
function toggleOutline() {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const selection = iframeDoc.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);
  const selectedText = range.toString();

  if (selectedText) {
      const commonAncestor = range.commonAncestorContainer;

      // Find the closest SPAN element with the border style
      let parentNode = commonAncestor.nodeType === 3 ? commonAncestor.parentNode : commonAncestor;
      let spanToRemove = null;

      while (parentNode && parentNode !== iframeDoc.body) {
          if (parentNode.tagName === 'SPAN' && parentNode.style.border === '1px solid black') {
              spanToRemove = parentNode;
              break;
          }
          parentNode = parentNode.parentNode;
      }

      if (spanToRemove) {
          // If the outline is already applied, remove it
          const textNode = iframeDoc.createTextNode(spanToRemove.textContent);
          spanToRemove.parentNode.replaceChild(textNode, spanToRemove);

          // Restore the selection to the text
          range.selectNodeContents(textNode);
          selection.removeAllRanges();
          selection.addRange(range);
      } else {
          // If the outline is not applied, apply it
          const span = iframeDoc.createElement('span');
          span.style.border = '1px solid black';
          span.textContent = selectedText;

          // Replace the selected text with the span element
          range.deleteContents();
          range.insertNode(span);

          // Restore the selection to the span
          range.selectNodeContents(span);
          selection.removeAllRanges();
          selection.addRange(range);
      }
  }
}

outline && outline.addEventListener('click', () => {
  toggleOutline();
});

textColor && textColor.addEventListener('click',()=>{
  textColor.lastElementChild.click()
})

mark && mark.addEventListener('click',()=>{
  mark.lastElementChild.click()
})


lineHeight && lineHeight.addEventListener('click', () => {
  lineHeight.lastElementChild.click()
  console.log('clicked')

  // if (lineHeight.lastElementChild) {
  //   console.log(lineHeight.lastElementChild);
  // } else {
  //   console.log('No focusable child element found.');
  // }
});


 const changeTextColor = (value) => {
    // execCommandInIframe('hiliteColor', value);
    execCommandInIframe('foreColor', value);
  };

 const changeHiliteColor = (value) => {
    execCommandInIframe('hiliteColor', value);
  };

 textColor && textColor.lastElementChild.addEventListener('change',()=>{
  // alert(textColor.lastElementChild.value)
  changeTextColor(textColor.lastElementChild.value)
})


mark && mark.lastElementChild.addEventListener('change',()=>{
  // alert(hiliteColor.lastElementChild.value)
  changeHiliteColor(mark.lastElementChild.value)
})