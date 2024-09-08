//Declaring variables for ribbon dropdowns
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
const dropDowmButton = document.getElementsByClassName('dropDownButton');
const mark = document.getElementsByClassName('mark')[0];
const heading = document.getElementsByClassName('heading')[0];
const workarea_scale_output = document.getElementById('workarea_scale_output');

// Declaring variables for buttons
const previewBtn = document.getElementsByClassName('preview')[1];
const fullScreenBtn = document.getElementsByClassName('fullScreen')[1];
const boldBtn = document.getElementsByClassName('bold')[1];
const italicBtn = document.getElementsByClassName('italic')[1];
const strikethroughBtn = document.getElementsByClassName('strikethrough')[1];
const superscriptBtn = document.getElementsByClassName('superscript')[1];
const subscriptBtn = document.getElementsByClassName('subscript')[1];
const outlineBtn = document.getElementsByClassName('outline')[1];
const underlineBtn = document.getElementsByClassName('underline')[1];
const markBtn = document.getElementsByClassName('mark')[1];

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
  let editorDoc;
  if (iframe) {
    editorDoc = iframe.contentDocument || iframe.contentWindow.document;
  } else {
    alert('here');
    document.execCommand(command, false, value);
    return;
  }
  editorDoc.execCommand(command, false, value);
}

bold &&
  bold.addEventListener('click', () => {
    execCommandInIframe('bold');
  });

boldBtn &&
  boldBtn.addEventListener('click', () => {
    execCommandInIframe('bold');
  });

italic &&
  italic.addEventListener('click', () => {
    execCommandInIframe('italic');
  });

italicBtn &&
  italicBtn.addEventListener('click', () => {
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

subscriptBtn &&
  subscriptBtn.addEventListener('click', () => {
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

superscriptBtn &&
  superscriptBtn.addEventListener('click', () => {
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

strikethroughBtn &&
  strikethroughBtn.addEventListener('click', () => {
    execCommandInIframe('strikethrough');
  });

outline &&
  outline.addEventListener('click', () => {
    execCommandInIframe('outline');
  });

outlineBtn &&
  outlineBtn.addEventListener('click', () => {
    execCommandInIframe('outline');
  });

underline &&
  underline.addEventListener('click', () => {
    execCommandInIframe('underline');
  });

underlineBtn &&
  underlineBtn.addEventListener('click', () => {
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

previewBtn &&
  previewBtn.addEventListener('click', () => {
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

fullScreenBtn &&
  fullScreenBtn.addEventListener('click', () => {
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
    let parentNode =
      commonAncestor.nodeType === 3
        ? commonAncestor.parentNode
        : commonAncestor;
    let spanToRemove = null;

    while (parentNode && parentNode !== iframeDoc.body) {
      if (
        parentNode.tagName === 'SPAN' &&
        parentNode.style.border === '1px solid black'
      ) {
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

outline &&
  outline.addEventListener('click', () => {
    toggleOutline();
  });

const changeTextColor = (value) => {
  // execCommandInIframe('hiliteColor', value);
  execCommandInIframe('foreColor', value);
};

//toggling Drop downs
for (let i = 0; i < dropDowmButton.length; i++) {
  dropDowmButton[i] &&
    dropDowmButton[i].addEventListener('click', () => {
      dropDowmButton[i]
        .querySelector('.dropDownMenu')
        .classList.toggle('hidden');
    });
  dropDowmButton[i] &&
    dropDowmButton[i].addEventListener('blur', () => {
      dropDowmButton[i].querySelector('.dropDownMenu').classList.add('hidden');
    });
}

const changeHiliteColor = (value) => {
  execCommandInIframe('hiliteColor', value);
};

const markcolors = mark.getElementsByTagName('li');
for (let i = 0; i < markcolors.length; i++) {
  markcolors[i] &&
    markcolors[i].addEventListener('click', () => {
      changeHiliteColor(markcolors[i].dataset.color);
      markcolors[i].parentElement.classList.add('hidden');
    });
}

const changeHeading = (value) => {
  execCommandInIframe('formatBlock', `<${value}>`);
};
const textcolors = textColor.querySelectorAll('li');
for (let i = 0; i < textcolors.length; i++) {
  textcolors[i] &&
    textcolors[i].addEventListener('click', () => {
      changeTextColor(textcolors[i].dataset.color);
      textcolors[i].parentElement.classList.add('hidden');
    });
}

const headings = heading.querySelectorAll('li');
for (let i = 0; i < headings.length; i++) {
  headings[i] &&
    headings[i].addEventListener('click', () => {
      changeHeading(headings[i].dataset.heading);
      // headings[i].parentElement.classList.add("hidden")
    });
}

// textColor &&
//   textColor.lastElementChild.addEventListener('change', () => {
//     // alert(textColor.lastElementChild.value)
//     changeTextColor(textColor.lastElementChild.value);
//   });

const rename = document.getElementsByClassName('rename')[0];
const newFile = document.getElementsByClassName('newFile')[0];
const downloadFile = document.getElementsByClassName('downloadFile')[0];
const printFile = document.getElementsByClassName('printFile')[0];
const convertFile = document.getElementsByClassName('convertFile')[0];
const remove = document.getElementsByClassName('remove')[0];
let modalCancel;
const modal = document.querySelector('#dummymodal');

const toggleModalContent = (clone) => {
  // let clone  = template.content.cloneNode(true)
  clone.querySelector('.modalCancel').addEventListener('click', () => {
    modal.style.display = 'none';
  });

  modal.replaceChildren(clone);
  // console.log(modal)
};

const removeText = () => {
  const editor = getEditorElement();
  if (editor.innerHTML != '') {
    const template = document.querySelector('#removeTextModal');
    let clone = template.content.cloneNode(true);
    let actionButton = clone.querySelector('.action');
    actionButton.addEventListener('click', () => {
      //Button action goes here
      editor.innerHTML = '';
      closeModal();
    });
    toggleModalContent(clone);
    openModal();
  } else {
    return;
  }
};
const renameFile = () => {
  const template = document.querySelector('#renameFileModal');
  const clone = template.content.cloneNode(true);

  let actionButton = clone.querySelector('.action');
  let fileName = document.querySelector('#documentName');
  let newFileNameInput = clone.querySelector('#newName'); // Use querySelector instead of getElementById

  actionButton.addEventListener('click', () => {
    let newFileName = newFileNameInput.value; // Get the value at the time of the click
    console.log(newFileName);
    if (newFileName) {
      fileName.innerHTML = newFileName;
    }
    closeModal();
  });

  toggleModalContent(clone);
  openModal();
};

const convertFileType = () => {
  const template = document.querySelector('#convertFileModal');
  const clone = template.content.cloneNode(true);
  let fileType = document.querySelector('#documentType');

  let actionButton = clone.querySelector('.action');
  // let fileName = document.querySelector("#documentName"); // Your file name element
  let editor = getEditorElement(); // Assuming you have an editor element with content
  let selectedType = null;

  // Add click event listeners to file type options using data-filetype
  clone.querySelectorAll('span').forEach((span) => {
    span.addEventListener('click', () => {
      selectedType = span.getAttribute('data-filetype'); // Get selected file type from data attribute
      console.log(`Selected Type: ${selectedType}`);

      // Highlight the selected type by adding a class
      clone
        .querySelectorAll('span')
        .forEach((s) => s.classList.remove('bg-violet-500', 'text-white'));
      span.classList.add('bg-violet-500', 'text-white');
    });
  });

  // Handle the "Convert" button click
  actionButton.addEventListener('click', () => {
    if (selectedType && editor.innerHTML.trim() !== '') {
      if (selectedType === 'PDF') {
        fileType.innerHTML = 'PDF';
        // downloadPDF(editor);
      } else if (selectedType === 'DOCX') {
        fileType.innerHTML = 'DOCX';
        // downloadDOCX(editor);
      } else if (selectedType === 'TXT') {
        // downloadTXT(editor);
        fileType.innerHTML = 'TXT';
      }
      closeModal(); // Close the modal after conversion
    } else {
      console.log(
        'Please select a file type and ensure the editor has content.',
      );
    }
  });

  toggleModalContent(clone);
  openModal();
};

const addNewFile = () => {
  const editor = getEditorElement();
  const template = document.querySelector('#addNewFileModal');
  let clone = template.content.cloneNode(true);
  if (editor.innerHTML != '') {
    clone.querySelectorAll("button")[1].style.display = "block"
  } else {
    clone.querySelector("p").innerHTML = "Create a New File <br/> <br/>"
    clone.querySelectorAll("button")[1].style.display = "none"
  }
  
  toggleModalContent(clone);
  openModal();
  let actionButton = clone.querySelector('.action');
  // actionButton.addEventListener('click', () => {
  //   alert('clicked');
  //   //Button action goes here

  //   closeModal();
  // });
};

// Download as PDF
const downloadPDF = (editor) => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Use html2pdf to preserve HTML formatting
  doc.html(editor, {
    callback: function (doc) {
      doc.save('document.pdf'); // Save the PDF with formatting
    },
    x: 10,
    y: 10,
    width: 180, // Adjust width if necessary
  });
};


// Download as DOCX
const downloadDOCX = async (editor) => {
  const docx = window.docx; // Access docx from CDN
  const doc = new docx.Document({
    sections: [
      {
        properties: {},
        children: [
          new docx.Paragraph({
            children: [new docx.TextRun(editor.innerText)],
          }),
        ],
      },
    ],
  });

  const packer = new docx.Packer();
  const blob = await packer.toBlob(doc);

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'document.docx';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Download as TXT
const downloadTXT = (editor) => {
  const fileContent = editor.innerText || editor.textContent; // Get the text content of the editor
  const fileBlob = new Blob([fileContent], { type: 'text/plain' });
  const fileUrl = URL.createObjectURL(fileBlob);
  const link = document.createElement('a');

  link.href = fileUrl;
  link.download = 'document.txt'; // Download as TXT
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(fileUrl); // Clean up the URL
};


const downloadNewFile = () => {
  const editor = getEditorElement();
  let selectedType = document.querySelector('#documentType').innerHTML; // Assuming a dropdown or similar element for file type
  if (editor.innerHTML.trim() !== '') {
    // Check if editor has meaningful content
    const template = document.querySelector('#downloadFileModal');
    let clone = template.content.cloneNode(true);
    let actionButton = clone.querySelector('.action');

    actionButton.addEventListener('click', () => {
      const fileContent = editor.innerText || editor.textContent;  // Get text content from the editor

      if (selectedType === 'PDF') {
        downloadPDF(editor);
      } else if (selectedType === 'DOCX') {
        downloadDOCX(editor);
      } else if (selectedType === 'TXT') {
        downloadTXT(editor);
      } else {
        console.log('Unsupported file type selected.');
      }

      closeModal();
    });

    toggleModalContent(clone); // Ensure correct spelling
    openModal();
  } else {
    console.log('Editor is empty.');
    return;
  }
};


const printNewFile = () => {
  const editor = getEditorElement();
  if (editor.innerHTML != '') {
    const template = document.querySelector('#printFileModal');
    let clone = template.content.cloneNode(true);
    let actionButton = clone.querySelector('.action');
    actionButton.addEventListener('click', () => {
      alert('clicked');
      //Button action goes here

      closeModal();
    });
    toggleModalContent(clone);
    openModal();
  } else {
    return;
  }
};

const openModal = () => {
  modal.style.display = 'flex';
  // console.log(modalCancel)
};

const closeModal = () => {
  modal.style.display = 'none';
};

const clearDocument = () => {
  editor.innerHTML = '';
};

rename &&
  rename.addEventListener('click', () => {
    renameFile();
  });

convertFile &&
  convertFile.addEventListener('click', () => {
    convertFileType();
  });

remove &&
  remove.addEventListener('click', () => {
    removeText();
  });

newFile &&
  newFile.addEventListener('click', () => {
    addNewFile();
  });

downloadFile &&
  downloadFile.addEventListener('click', () => {
    downloadNewFile();
  });

printFile &&
  printFile.addEventListener('click', () => {
    printNewFile();
  });

convertFile &&
  convertFile.addEventListener('click', () => {
    convertFileType();
  });

modalCancel &&
  modalCancel.addEventListener('click', () => {
    alert('clicked');
    closeModal();
  });
