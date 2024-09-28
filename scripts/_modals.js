class Modal {
  #button;
  #modalcontent;
  #modal;
  constructor(button, modalContent, modal = "#dummymodal") {
    this.#button = document.querySelectorAll(button);
    this.#modal = document.querySelector(modal);
    this.#modalcontent = document.querySelector(modalContent);
    this.#modal.addEventListener('click', (e) => {
        console.log(this)
        if(e.target == this.#modal){
            this.#modal.style.display = 'none';
        }
      // modal.style.display = 'none';
    });
    this.showModal();
  }

  #cloneContent = () => {
    let clone = this.#modalcontent.content.cloneNode(true);

    clone.querySelector('.modalCancel') &&
      clone.querySelector('.modalCancel').addEventListener('click', () => {
        this.#modal.style.display = 'none';
      });

    let action = () => {
        
    };

    action();

    this.#modal.replaceChildren(clone);

    // console.log(modal)
  };

  showModal() {
    for (let i = 0; i < this.#button.length; i++) {
      this.#button[i].addEventListener('click', () => {
        // debugger
        // alert('clicked');
        this.#modal.style.display = 'flex';
        this.#cloneContent(this.#modalcontent);
      });
    }
  }
}

const peopleModal = new Modal('.people', '#peopleModal');
const postsSlider = new Modal('.social_post', '#commentModal');
const sliderModal = new Modal('post-attachment-footer',"#postsSlider","#subModal")


// Tab
// const followerBtn = document.querySelector(".follow_modal_header_switch_button button:first-child");
// const followingBtn = document.querySelector(".follow_modal_header_switch_button button:last-child");
const followerTab = document.querySelector('.follow_users .followings');
const followingTab = document.querySelector('.follow_users .followers');
// followerBtn.addEventListener("click", () => followTabHandler.call(followerBtn, "remove", "add"));
// followingBtn.addEventListener("click", () => followTabHandler.call(followingBtn, "add", "remove"));

function followTabHandler(tab1, tab2) {
  document
    .querySelectorAll('.follow_modal_header_switch_button button')
    .forEach((btn) => btn.classList.remove('active'));
  this.classList.add('active');

  followerTab.classList[tab1](HIDDEN);
  followingTab.classList[tab2](HIDDEN);
}
