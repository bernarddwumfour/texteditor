const iframe = document.getElementsByClassName('editorIframe')[0];

function getIframeDocument() {
  return iframe.contentDocument || iframe.contentWindow.document;
}

export function getEditorElement() {
  const doc = getIframeDocument();
  return doc.getElementsByClassName('editor')[0];
}

export function execCommandInIframe(command, value = null) {
  let editorDoc;
  editorDoc = iframe.contentDocument || iframe.contentWindow.document;
  editorDoc.execCommand(command, false, value);
}

export const makeSubscript = () => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const selection = iframeDoc.getSelection();

  if (!selection.rangeCount) return;

  const parentElement = selection.anchorNode.parentElement;

  if (parentElement.tagName === 'SUB') {
    execCommandInIframe('removeFormat'); // Applies superscript formatting
  } else {
    execCommandInIframe('subscript');
  }
};

export const makeSuperscript = () => {
  const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
  const selection = iframeDoc.getSelection();

  if (!selection.rangeCount) return;

  const parentElement = selection.anchorNode.parentElement;

  if (parentElement.tagName === 'SUP') {
    execCommandInIframe('removeFormat'); // Applies superscript formatting
  } else {
    execCommandInIframe('superscript');
  }
};

export const makePreview = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
};

export const makeFullScreen = () => {
  document.documentElement.requestFullscreen();
};

export const copyText = () => {
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
};

export function cutText() {
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

export // Paste text from the clipboard
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