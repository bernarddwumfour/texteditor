import { execCommandInIframe, getEditorElement } from "./_docFunctions";

export class Button {
  #button;
  #action;
  #value;

  constructor(button, action, value) {
    this.#button = document.querySelectorAll(button);
    this.#action = action
    this.#value = value

    this.#formatText()
  }

  #formatText(){
    for (let i = 0; i < this.#button.length; i++) {
      this.#button[i].addEventListener("click",()=>{
          this.#execCommandInIframe(this.#action,this.#value)
      })
  }
  }

  //Formatting text with the execCommand() function
  #execCommandInIframe(command, value = null) {
    let iframe = document.getElementsByClassName('editorIframe')[0];
    let editorDoc = iframe.contentDocument || iframe.contentWindow.document;
    editorDoc.execCommand(command, false, value);
  }
}

export class CustomButton{
  #button

  constructor(button,buttonFunction){
    this.#button = document.querySelectorAll(button)
    for (let i = 0; i < this.#button.length; i++) {
      this.#button[i].addEventListener("click",buttonFunction)
    }
  }
}

export class Pagemodal {
  // #backdrop = document.getElementById('#modal');
  #button;
  #modalcontent;
  #modal = document.querySelector('#dummymodal');
  #type;

  constructor(button, modalcontent, type) {
    this.#button = document.querySelector(button);
    this.#modalcontent = document.querySelector(modalcontent);
    this.#type = type;
    this.showModal();
  }

  #cloneContent = () => {
    let clone = this.#modalcontent.content.cloneNode(true);

    clone.querySelector('.modalCancel').addEventListener('click', () => {
      this.#modal.style.display = 'none';
    });

    let action = () => {
      if (this.#type == 'editText') {
        const texts = clone.querySelectorAll('span');
        const input = clone.querySelector('input');
        let actionButton = clone.querySelectorAll('.action')[0];
        // debugger
        for (let i = 0; i < texts.length; i++) {
          texts[i].addEventListener('click', () => {
            const emoji = texts[i].textContent;
            input.value += emoji;
          });
        }

        actionButton.addEventListener('click', () => {
          const editor = getEditorElement();
          editor.focus();
          execCommandInIframe('insertText', input.value);
          this.#modal.style.display = 'none';
        });
      } else if (this.#type == 'addGraph') {
        // alert("Add graph")
        let actionButton = clone.querySelectorAll('.action')[0];
        let graphType = clone.querySelector('div').dataset.graph;
        let labels = clone.querySelectorAll("input")[0]
        let values = clone.querySelectorAll("input")[1]
        let label = clone.querySelectorAll("input")[2]
        const editor = getEditorElement();

        

        // console.log(graphType);
        actionButton.addEventListener('click', function () {
          labels = labels.value.split(",")
          values = values.value.split(",")
          let backgroundColor = 'rgb(153, 102, 255)'
          const colors = [
            'rgb(255, 99, 132)',  // Soft Red
            'rgb(75, 192, 192)',  // Teal
            'rgb(54, 162, 235)',  // Light Blue
            'rgb(255, 206, 86)',  // Soft Yellow
            'rgb(153, 102, 255)', // Light Purple
            'rgb(255, 159, 64)',  // Orange
            'rgb(100, 149, 237)', // Cornflower Blue
            'rgb(255, 182, 193)', // Light Pink
            'rgb(144, 238, 144)', // Light Green
            'rgb(240, 128, 128)', // Light Coral
            'rgb(255, 140, 0)',   // Dark Orange
            'rgb(173, 216, 230)', // Light Sky Blue
            'rgb(255, 228, 181)', // Moccasin
            'rgb(221, 160, 221)', // Plum
            'rgb(250, 128, 114)', // Salmon
            'rgb(124, 252, 0)',   // Lawn Green
            'rgb(135, 206, 250)', // Light Steel Blue
            'rgb(255, 222, 173)', // Navajo White
            'rgb(238, 130, 238)', // Violet
            'rgb(176, 224, 230)'  // Powder Blue
          ];
                
          if(graphType == "pie"){
            backgroundColor = []
            for (let i = 0; i < values.length; i++) {
              backgroundColor.push(colors[i])              
            }
          }

          label =label.value
          // console.log(labels,values)
          const wrapper = document.createElement('div');
          wrapper.classList.add('resizable');

          const resizeHandle = document.createElement('div');
          resizeHandle.classList.add('resize-handle');

          // Create a canvas element for the chart
          const canvas = document.createElement('canvas');
          canvas.width = 400; // Set width
          canvas.height = 200; // Set height

          let lineBreak = document.createElement("br")

          const editor = getEditorElement();
          editor.appendChild(lineBreak)
          wrapper.appendChild(canvas);
          wrapper.appendChild(resizeHandle);

          // Insert the canvas into the editor
          editor.appendChild(wrapper);

          // Create a chart
          const ctx = canvas.getContext('2d');
          const chart = new Chart(ctx, {
            type: `${graphType}`, // Type of chart
            data: {
              labels,
              datasets: [
                {
                  label,
                  data: values,
                  backgroundColor,
                  // borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
              ],
            },
            options: {
              responsive: true,
              scales: {
                 y: (graphType != ('pie') ) && {
                  beginAtZero: true,
                },
              },
            },
          });

          // Function to make the chart resizable
          function makeResizable(wrapper) {
            const resizeHandle = wrapper.querySelector('.resize-handle');

            resizeHandle.addEventListener('mousedown', function (event) {
              event.preventDefault();

              const startX = event.clientX;
              const startY = event.clientY;
              const startWidth = parseInt(
                document.defaultView.getComputedStyle(wrapper).width,
                10,
              );
              const startHeight = parseInt(
                document.defaultView.getComputedStyle(wrapper).height,
                10,
              );

              function doDrag(e) {
                wrapper.style.width = startWidth + e.clientX - startX + 'px';
                wrapper.style.height = startHeight + e.clientY - startY + 'px';

                // Update the chart dimensions to match the wrapper
                const canvas = wrapper.querySelector('canvas');
                canvas.width = wrapper.clientWidth;
                canvas.height = wrapper.clientHeight;

                const ctx = canvas.getContext('2d');
                // Recreate the chart to adjust to the new dimensions
                new Chart(ctx, {
                  type: `${graphType}`,
                  data: {
                    labels,
                    datasets: [
                      {
                        label: 'Demo Chart',
                        data: values,
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                      },
                    ],
                  },
                  options: {
                    responsive: true,
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  },
                });
              }

              function stopDrag() {
                document.documentElement.removeEventListener(
                  'mousemove',
                  doDrag,
                  false,
                );
                document.documentElement.removeEventListener(
                  'mouseup',
                  stopDrag,
                  false,
                );
              }

              document.documentElement.addEventListener(
                'mousemove',
                doDrag,
                false,
              );
              document.documentElement.addEventListener(
                'mouseup',
                stopDrag,
                false,
              );
            });
          }

          makeResizable(wrapper);

          // Create a chart
        });
      } else if (this.#type == 'addLink') {
        const input = clone.querySelector('input');
        let actionButton = clone.querySelectorAll('.action')[0];
        actionButton.addEventListener('click', () => {
          const editor = getEditorElement();
          editor.focus();
          execCommandInIframe('createLink', input.value);
          let links = editor.getElementsByTagName('a');
          for (var i = 0; i < links.length; i++) {
            links[i].setAttribute('target', '_blank');
            links[i].setAttribute('style', 'color : blue');

            links[i].addEventListener('click', () => {
              window.open(event.target.href, '_blank');
            });
          }
          this.#modal.style.display = 'none';
        });
      }
    };

    action();

    this.#modal.replaceChildren(clone);

    // console.log(modal)
  };
  

  showModal() {
    this.#button.addEventListener('click', () => {
      // debugger
      this.#modal.style.display = 'flex';
      this.#cloneContent(this.#modalcontent);
    });
    return;
  }

  hidemodal() {
    this.#button.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    return;
  }
}

