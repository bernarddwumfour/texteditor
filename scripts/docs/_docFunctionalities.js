import { Button, CustomButton, Pagemodal } from './_docClasses';
import {
  copyText,
  cutText,
  makeFullScreen,
  makePreview,
  makeSubscript,
  makeSuperscript,
  pasteText,
} from './_docFunctions';

//ExecCommand Buttons
const fontSize = document.getElementsByClassName('fontSize')[0];
const fontFamily = document.getElementsByClassName('fontFamily')[0];

new Button('.alignLeft', 'justifyLeft');
new Button('.alignRight', 'justifyRight');
new Button('.strikethrough', 'strikethrough');
new Button('.strikethroughBtn', 'strikethrough');
new Button('.outline', 'outline');
new Button('.outlineBtn', 'outline');
new Button('.underline', 'underline');
new Button('.underlineBtn', 'underline');
new Button('.alignCenter', 'justifyCenter');
new Button('.alignJustify', 'justifyfull');
new Button('.bulletList', 'insertUnorderedList');
new Button('.numberList', 'insertOrderedList');
new Button('.indentLeft', 'indent');
new Button('.indentRight', 'outdent');
new Button('.quotation', 'formatBlock', 'blockquote');
new Button('.horizontalLine', 'insertHorizontalRule');
new Button('.fontSize', 'fontSize', fontSize.value);
new Button('.fontFamily', 'fontName', fontFamily.value);

//Custom Buttons
new CustomButton('.subscript', makeSubscript);
new CustomButton('.superscript', makeSuperscript);
new CustomButton('.fullScreen', makeFullScreen);
new CustomButton('.preview', makePreview);
new CustomButton('.copy', copyText);
new CustomButton('.cut', cutText);
new CustomButton('.paste', pasteText);

//Buttons with Modals
const emojiModal = new Pagemodal('#emoji', '#addEmojiModal', 'editText');
const equationModal = new Pagemodal(
  '#equation',
  '#addEquationModal',
  'editText',
);
const specialCharacters = new Pagemodal(
  '#specialCharacters',
  '#addSpecialCharactersModal',
  'editText',
);
const linkModal = new Pagemodal('#addLink', '#addLinkModal', 'addLink');
const pieChartModal = new Pagemodal(
  '#pieChart',
  '#addPieChartModal',
  'addGraph',
);
const lineChartModal = new Pagemodal(
  '#lineChart',
  '#addLineChartModal',
  'addGraph',
);
const barChartModal = new Pagemodal(
  '#barChart',
  '#addBarChartModal',
  'addGraph',
);
