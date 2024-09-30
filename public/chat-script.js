const $headerDropdown = $(".header_dropdown");

$(document).on("click", "#suggestions_expand", (event) => {
  const $el = $(event.currentTarget);

  const list = $el.parent().find("ul");
  const isExpanded = list.attr("aria-expanded") === "true";
  list.css("--item-count", list.children().length);
  list.attr("aria-expanded", isExpanded ? "false" : "true");
});

$(document).on("click", ".popup_trigger", (event) => {
  const $el = $(event.currentTarget);
  const $target = $($el.attr("data-popup-target"));
  const dialog = $target.get(0);

  if (!dialog) return;
  const isOpen = dialog.open;

  if (isOpen) {
    $target.removeClass("open");
    setTimeout(() => dialog.close(), 200);
  } else {
    dialog.show();
    setTimeout(() => $target.addClass("open"), 1);
  }

  $el.attr("data-active", isOpen);
});

$(document).on("click", ".sidebar_trigger", (event) => {
  const $sidebar = $("#sidebar");
  const isOpen = $sidebar.attr("aria-expanded") === "true";
  $sidebar.attr("aria-expanded", !isOpen);

  const $tabs = $(".tabs");
  const $header = $(".chat-search-icons");
  const $btn = $(".options-hover-button");
  const $icon = $(".my-camera-group");
  if (isOpen) {
    $tabs.hide();
    $header.hide();
    $icon.hide();
    $btn.addClass("no-hover");
  } else {
    $tabs.show();
    $header.show();
    $icon.show();
    $btn.removeClass("no-hover");
  }
});

$(window).on("resize", () => {
  if (window.innerWidth > 768) {
    $(".popup").each((_, el) => {
      el.close();
    });
  }
});

// File upload popup
$(document).ready(function () {
  $("#attachment-icon").click(function () {
    $("#popup-menu").toggle();
  });

  var btn = $(".close-more-action-mobile");

  btn.on("click", function () {
    $("#popup-menu").hide();
  });

  $(document).click(function (event) {
    if (!$(event.target).closest("#popup-menu, #attachment-icon").length) {
      $("#popup-menu").hide();
    }
  });
});

// Imoji popup
$(document).ready(function () {
  $("#imoji-attachment").click(function () {
    $("#emoji-popup").toggle();
    var $span = $(this);
    $span.toggleClass("clicked");
  });

  $(document).click(function (event) {
    if (!$(event.target).closest("#emoji-popup, #imoji-attachment").length) {
      $("#emoji-popup").hide();
    }
  });

  $("#close-moji").click(function () {
    $("#emoji-popup").hide();
  });
});

$(document).ready(function () {
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    } else {
      return text;
    }
  }

  function createChatItem(chat, index) {
    if (!chat.messages || chat.messages.length === 0) {
      return "";
    }

    let latestConversation = chat.messages[chat.messages.length - 1];
    let latestMessage =
      latestConversation.messages[latestConversation.messages.length - 1];
    let uniqueId = `optionsModal${index}`;
    let uniqueTriggerId = `optionsTrigger${index}`;
    let chatCountOrCameraIcon;

    if (window.innerWidth <= 768) {
      chatCountOrCameraIcon =
        latestConversation.messages.length > 2
          ? '<i class="fa-solid fa-camera my-camera"></i>'
          : `<span class="chat-count">${chat.count}</span>`;
    } else {
      chatCountOrCameraIcon = `
        <div>
          <i class="fa-solid fa-camera my-camera"></i>
          <span class="chat-count">${chat.count}</span>
        </div>
    `;
    }

    return `
    <div class="chat-item" 
      data-name="${chat.name}" 
      data-unread="${chat.unread}" 
      data-favourite="${chat.favourite}" 
      data-group="${chat.group}">
      <img src="${chat.avatar}" alt="${chat.name}" class="avatar" />
      <div class="chat-details">
        <div class="chat-header">
          <div class="name-time-card">
            <span class="chat-name">${chat.name}</span>
            <div class='time-card'>
              <div class="chat-time">${latestMessage.time}</div>
            </div>
          </div>
          ${chatCountOrCameraIcon}
        </div>
        <div class="chat-message-side">
          <div class="chat-message">${truncateText(
            latestMessage.message,
            54
          )}</div>
          <span class='dots' id='${uniqueTriggerId}'>
            <span class='dot black-dot'>.</span>
            <span class='dot yellow-dot'>.</span>
            <span class='dot blue-dot'>.</span>
          </span>
        </div>
      </div>
      <button class="options-hover-button" data-modal-id="${uniqueId}">
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
        <i class="fa-solid fa-ellipsis"></i>
      </button>
      <div id="${uniqueId}" class="options-modal">
        <div class="options-modal-box">
          <button class="options-modal-close">
            <i class="fa fa-times close" aria-hidden="true"></i>
          </button>
          <div class="options-modal-content">
            <ul class="grid-container">
              <li class="grid-item"><span class="icon"><i class="fa fa-heart-o" aria-hidden="true"></i></span> Favourite</li>
              <li class="grid-item" id="openCallModalOut"><span class="icon"><i class="fa fa-phone" aria-hidden="true"></i></span> Voice call</li>
              <li class="grid-item"><a href="./video-chat.html" class="icon"><i class="fa fa-video-camera" aria-hidden="true"></i></a> Video call</li>
              <li class="grid-item"><span class="icon"><img src="./assets/unread.png" /></span> Unread</li>
              <li class="grid-item" id="openModalDelete">
                    <span class="icon"><i class="fa fa-trash-o" aria-hidden="true"></i></span>
                    Delete
                  </li>
              <li class="grid-item" id='openModalBlock'><span class="icon"><i class="fa fa-ban" aria-hidden="true"></i></span> Block</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;
  }

  $(document).ready(function () {
    $(document).on("click", "#openCallModalOut", function (event) {
      event.stopPropagation();
      $("#callModal").show();
      $("#media-modal").hide();
    });

    $(document).on("click", ".options-modal-close", function (event) {
      event.stopPropagation();
      $(this).closest(".options-modal").hide();
    });

    $(document).on("click", function (event) {
      if (!$(event.target).closest(".chat-item").length) {
        $(".options-modal").hide();
      }
    });
  });

  function createChatConversation(chat) {
    let conversationHtml = chat.messages
      .map((conversation) =>
        conversation.messages
          .map((message, index) => {
            const isSender =
              index % 2 === 0 || (index === 0 && !conversation.recipient);
            const messageClass = isSender ? "sender" : "recipient";
            const avatar = isSender
              ? conversation.sender?.avatar || chat.avatar
              : conversation.recipient?.avatar || chat.avatar;
            const name = isSender
              ? conversation.sender?.name || chat.name
              : conversation.recipient?.name || chat.name;

            return `
            <div class="chat-message ${messageClass}">
              <img src="${avatar}" alt="${name}" class="avatar" />
              <div>
                <div class="message-content">
                  <p>
                    ${
                      index === 0
                        ? '<img src="./assets/message-file.png" alt="Image description" class="message-img" />'
                        : ""
                    }
                    ${message.message}
                  </p>
                  <div class='message-option-modal'>
                    <div class='message-option-modal-box'>
                      <button class="message-options-modal-close close-message">
                        <i class="fa fa-times close" aria-hidden="true"></i>
                      </button>
                      <div class="message-options-modal-content">
                        <ul class="grid-container">
                          <li class="grid-item"><span class="icon"><i class="fa-solid fa-share-from-square"></i></span> Forward</li>
                          <li class="grid-item"><span class="icon"><i class="fa-solid fa-pencil"></i></span> Reply</li>
                          <li class="grid-item"><span class="icon"><i class="fa-regular fa-copy"></i></span> Copy</li>
                          <li class="grid-item" id="openModalDelete"><span class="icon"><i class="fa fa-trash-o" aria-hidden="true"></i></span> Delete</li>
                          <li class="grid-item" id="openModalBlock"><span class="icon"><i class="fa-regular fa-circle-question"></i></span> Report</li>
                        </ul>
                      </div>
                    </div>
 
                  </div>
                </div>
                <span class="message-time">${message.time}</span>
              </div>
              <button class='message-options-button'>
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
              </button>
              <button class="message-options-modal-close">
                <i class="fa fa-times close" aria-hidden="true"></i>
              </button>
            </div>
            `;
          })
          .join("")
      )
      .join("");

    $("#chat-box").html(conversationHtml);
    $("#chat-box").show();
    $(".welcome-text").hide();
    $(".chat-container").css("display", "flex");
    $(".profile-component").css("display", "flex");
    $(".chat-layout").css("display", "grid");
    $(document).ready(function () {
      if (window.innerWidth <= 768) {
        $("#sidebar").hide();
        $(".chat-input-container").css("display", "flex");
      }
    });
  }

  function createGroupConversation(group) {
    let conversationHtml = group.conversations
      .map((conversation) =>
        conversation.messages
          .map((message, index) => {
            const isSender =
              index % 2 === 0 || (index === 0 && !conversation.recipient);
            const messageClass = isSender ? "sender" : "recipient";
            const avatar = isSender
              ? conversation.sender?.avatar || group.imgSrc
              : conversation.recipient?.avatar || group.imgSrc;
            const name = isSender
              ? conversation.sender?.name || group.name
              : conversation.recipient?.name || group.name;

            return `
            <div class="chat-message ${messageClass}">
              <img src="${avatar}" alt="${name}" class="avatar" />
              <div>
                <div class="message-content">
                  <p>${message.message}</p>
                 <div class='message-option-modal'>
                    <div class='message-option-modal-box'>
                      <button class="message-options-modal-close close-message">
                        <i class="fa fa-times close" aria-hidden="true"></i>
                      </button>
                      <div class="message-options-modal-content">
                        <ul class="grid-container">
                          <li class="grid-item"><span class="icon"><i class="fa-solid fa-share-from-square"></i></span> Forward</li>
                          <li class="grid-item"><span class="icon"><i class="fa-solid fa-pencil"></i></span> Reply</li>
                          <li class="grid-item"><span class="icon"><i class="fa-regular fa-copy"></i></span> Copy</li>
                          <li class="grid-item"><span class="icon"><i class="fa fa-trash-o" aria-hidden="true"></i></span> Delete</li>
                          <li class="grid-item"><span class="icon"><i class="fa-regular fa-circle-question"></i></span> Report</li>
                          <li class="grid-item"><span class="icon"><img src="./assets/mug.png" class='mug' /></span> Mug</li>
                        </ul>
                      </div>
                    </div>
 
                  </div>
                </div>
                <span class="message-time">${message.time}</span>
              </div>
              <button class='message-options-button'>
                <i class="fa fa-arrow-right" aria-hidden="true"></i>
              </button>
              <button class="message-options-modal-close">
                <i class="fa fa-times close" aria-hidden="true"></i>
              </button>
            </div>
          `;
          })
          .join("")
      )
      .join("");

    $("#chat-box").html(conversationHtml);
    $("#chat-box").show();
    $(".welcome-text").hide();
    $(".chat-container").css("display", "flex");
    $(".profile-component").css("display", "flex");
    $(".chat-layout").css("display", "grid");

    $(document).ready(function () {
      if (window.innerWidth <= 768) {
        $("#sidebar").hide();
        $(".chat-input-container").css("display", "flex");
      }
    });
  }

  function createOptionsModal() {
    // $(document).on("click", ".options-hover-button", function (event) {
    //   event.stopPropagation();
    //   let modalId = $(this).data("modal-id");
    //   $(`#${modalId}`).toggle();

    // });

    $(document).on("click", ".options-modal-close", function (event) {
      event.stopPropagation();
      $(this).closest(".options-modal-group").hide();
    });

    $(document).on("click", ".message-options-button", function (event) {
      event.stopPropagation();
      $(this).siblings(".message-option-modal").toggle();
    });

    $(document).on("click", ".message-options-modal-close", function (event) {
      event.stopPropagation();
      $(this).closest(".message-option-modal").hide();
    });
  }

  $(".profile-component").on("click", "#close-chat", function () {
    $(".chat-layout").css("display", "none");
    $("#sidebar").show();
  });

  function toggleMessageOptionsModal() {
    $("#chat-box").on("click", ".message-options-button", function (event) {
      event.stopPropagation();

      var $thisButton = $(this);
      var $chatMessage = $thisButton.closest(".chat-message");
      var $modal = $chatMessage.find(".message-option-modal");
      var $closeButton = $chatMessage.find(".message-options-modal-close");
      var $openDelete = $modal.find("#openModalDelete");
      var $openBlock = $modal.find("#openModalBlock");

      $($openDelete).click(function (e) {
        e.stopPropagation();
        $("#deleteModal").css("display", "flex");
        $modal.hide();
        $thisButton.show();
        $closeButton.hide();
      });

      $($openBlock).click(function (e) {
        e.stopPropagation();
        $("#deleteModal").css("display", "flex");
        $modal.hide();
        $thisButton.show();
        $closeButton.hide();
      });

      $thisButton.hide();
      $modal.show();
      $closeButton.show();

      function hideModal() {
        $modal.hide();
        $thisButton.show();
        $closeButton.hide();
      }

      $closeButton.one("click", function (event) {
        event.stopPropagation();
        hideModal();
      });

      $(window).one("click", function (event) {
        if (
          $modal.is(":visible") &&
          !$(event.target).closest(
            ".message-option-modal, .message-options-button, .message-options-modal-close"
          ).length
        ) {
          hideModal();
        }
      });

      $modal.click(function (event) {
        event.stopPropagation();
      });
    });
  }

  function createGroupItem(group, index) {
    if (!group.conversations || group.conversations.length === 0) {
      return "";
    }

    let latestConversation =
      group.conversations[group.conversations.length - 1];

    let uniqueId = `optionsModalGroup${index}`;
    let uniqueTriggerId = `optionsTriggerGroup${index}`;

    let chatCountOrCameraIcon;

    if (window.innerWidth <= 768) {
      chatCountOrCameraIcon =
        latestConversation.messages.length > 2
          ? '<i class="fa-solid fa-camera my-camera-group"></i>'
          : `<span class="chat-count group">3</span>`;
    } else {
      chatCountOrCameraIcon = `
        <div>
          <i class="fa-solid fa-camera my-camera-group"></i>
          <span class="chat-count group">3</span>
        </div>
    `;
    }

    return `
    <div class="group-item" data-index="${index}">
      <div class="group-avatar">
        <img src="${group.imgSrc}" alt="${group.altText}">
        <div class="group-count">${group.count}</div>
      </div>
      <div class="group-info">
        <div class="group-name">${group.name}</div>
        <div class="group-description">${group.description}</div>
        <span class='group-dots' id='${uniqueTriggerId}'>
          <span class='dot black-dot'>.</span>
          <span class='dot yellow-dot'>.</span>
          <span class='dot blue-dot'>.</span>
        </span>
      </div>
      ${chatCountOrCameraIcon}
      <button class="options-hover-button group" data-modal-id="${uniqueId}">
        <i class="fa fa-arrow-right" aria-hidden="true"></i>
        <i class="fa-solid fa-ellipsis"></i>
      </button>
      <div id="${uniqueId}" class="options-modal-group">
       <div class="options-modal-group-box">
        <button class="options-modal-close">
          <i class="fa fa-times close" aria-hidden="true"></i>
        </button>
        <div class="options-modal-content">
          <ul class='grid-container'>
            <li class='grid-item'><span class="icon"><i class="fa fa-heart-o" aria-hidden="true"></i></span> Favourite</li>
            <li class='grid-item'><span class="icon"><i class="fa fa-phone" aria-hidden="true"></i></span> Voice call</li>
            <li class='grid-item'><span class="icon"><i class="fa fa-video-camera" aria-hidden="true"></i></span> Video call</li>
            <li class='grid-item'><span class="icon"><img src="./assets/unread.png" /></span> Unread</li>
            <li class='grid-item'><span class="icon"><i class="fa fa-trash-o" aria-hidden="true"></i></span> Delete</li>
            <li class='grid-item'><span class="icon"><i class="fa fa-ban" aria-hidden="true"></i></span> Block</li>
          </ul>
        </div>
       </div>

      </div>
    </div>
  `;
  }

  function renderGroups(groupsData) {
    const $chatList = $("#chat-list");
    $chatList.empty();
    groupsData.forEach((group, index) => {
      $chatList.append(createGroupItem(group, index));
    });

    $(".group-item").click(function () {
      const groupIndex = $(this).data("index");
      const selectedGroup = groupsData[groupIndex];
      $(".only-group").css("display", "block");
      createGroupConversation(selectedGroup);
    });

    createOptionsModal();
  }

  function setupEventListeners(chatsData, groupsData) {
    $(".tab-link").click(function () {
      $(".tab-link").removeClass("active");
      $(this).addClass("active");
      var filter = $(this).data("tab");
      if (filter === "groups") {
        renderGroups(groupsData);
      } else {
        renderChats(chatsData);
        filterChats(filter, chatsData);
      }
    });

    $("#chat-list").on("click", ".chat-item", function () {
      var chatName = $(this).data("name");
      var chat = chatsData.find((c) => c.name === chatName);
      if (chat) {
        createChatConversation(chat);
      }
    });

    createOptionsModal();
    toggleMessageOptionsModal();
  }

  function filterChats(filter, chatsData) {
    let visibleCount = 0;

    $("#chat-list .chat-item").each(function () {
      const chatName = $(this).data("name");
      const chat = chatsData.find((c) => c.name === chatName);

      if (!chat) {
        $(this).hide();
        return;
      }

      const unread = $(this).data("unread");
      const favourite = $(this).data("favourite");
      const group = $(this).data("group");
      let shouldShow = false;

      switch (filter) {
        case "all":
          shouldShow = true;
          break;
        case "unread":
          shouldShow = unread && visibleCount < 3;
          break;
        case "favourites":
          if (!$(".chat-name").find(".fa-heart").length) {
            $(".chat-name").append(`
            <i class="fa-solid fa-heart"></i>
          `);
          }

          shouldShow = favourite && visibleCount < 4;
          break;
        case "groups":
          shouldShow = group;
          break;
        default:
          shouldShow = true;
      }

      if (shouldShow) {
        $(this).show();
        visibleCount++;
      } else {
        $(this).hide();
      }
    });
  }

  function initialize() {
    let chatsData = [];
    let groupsData = [];

    $.when(
      $.getJSON("data/chats.json", function (data) {
        chatsData = data;
      }),
      $.getJSON("data/groups.json", function (data) {
        groupsData = data;
      })
    ).then(function () {
      renderChats(chatsData);
      setupEventListeners(chatsData, groupsData);
    });

    $("#chat-box").hide();
  }

  function renderChats(chatsData) {
    const $chatList = $("#chat-list");
    $chatList.empty();
    chatsData.forEach((chat, index) => {
      let chatItemHtml = createChatItem(chat, index);
      if (chatItemHtml) {
        $chatList.append(chatItemHtml);
      }
    });

    $(".chat-item").click(function () {
      var chatName = $(this).data("name");
      var chat = chatsData.find((c) => c.name === chatName);
      $(".only-group").css("display", "none");
      if (chat) {
        createChatConversation(chat);
      }
    });

    $(".options-hover-button").click(function (event) {
      event.stopPropagation();
      const modalId = $(this).data("modal-id");
      $(`#${modalId}`).show();

      var $openDelete = $(`#${modalId}`).find("#openModalDelete");
      var $openBlock = $(`#${modalId}`).find("#openModalBlock");

      $($openDelete).click(() => {
        $("#deleteModal").css("display", "flex");
        $(`#${modalId}`).hide();
      });

      $($openBlock).click(() => {
        $("#deleteModal").css("display", "flex");
        $(`#${modalId}`).hide();
      });

      $(event.target).closest(".options-hover-button").addClass("hide-button");
    });

    $(".options-modal-close").click(function (event) {
      event.stopPropagation();
      $(this).closest(".options-modal").hide();
      $(event.target)
        .closest(".options-hover-button")
        .removeClass("hide-button");
    });
  }

  initialize();
});

$(document).ready(function () {
  $("#openModal").click(function () {
    $("#myModal").show();
  });

  $("#cancelBt").click(function () {
    $("#myModal").hide();
  });

  $("#createBtn").click(function () {
    $("#myModal").hide();
  });

  $(window).on("click", function (event) {
    if ($(event.target).is("#myModal")) {
      $("#myModal").hide();
    }
  });

  $("#selectAll").change(function () {
    $(".user-checkbox").prop("checked", $(this).prop("checked"));
  });

  $(".user-checkbox").change(function () {
    if (!$(this).prop("checked")) {
      $("#selectAll").prop("checked", false);
    } else if (
      $(".user-checkbox:checked").length === $(".user-checkbox").length
    ) {
      $("#selectAll").prop("checked", true);
    }
  });
});

$(document).ready(function () {
  function checkSidebar() {
    if ($("#sidebar").attr("aria-expanded") === "false") {
      $(".welcome-text .img").css({
        "max-width": "55%",
        height: "auto",
      });
    } else {
      $(".welcome-text .img").css({
        "max-width": "40%",
        height: "auto",
      });
    }
  }

  checkSidebar();

  const sidebar = document.getElementById("sidebar");
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "aria-expanded") {
        checkSidebar();
      }
    });
  });

  observer.observe(sidebar, { attributes: true });
});

let addedUserNames = [];

$(document).ready(function () {
  function fetchUsers() {
    return $.getJSON("data/users.json");
  }

  function renderUsers(users) {
    const userList = $(".user-list");
    const container = $(".container");
    userList.empty();

    users.forEach((user, index) => {
      const isChecked = index === 0 ? "checked" : ""; // Check the first user by default
      const userItem = $(`
          <li>
            <div class="image-card">
              <img src="${user.img}" alt="${user.name}" />
              <span>${user.name}</span>
            </div>
            <input type="checkbox" class="user-checkbox" ${isChecked} />
          </li>
        `);
      userList.append(userItem);

      // Add the first user to the container by default
      if (index === 0 && !addedUserNames.includes(user.name)) {
        const userCard = $(`
            <div class="user-card">
              <img src="${user.img}" alt="${user.name}" />
            </div>
          `);
        container.append(userCard);
        addedUserNames.push(user.name);
      }
    });
  }

  function addUserCards(selectedUsers) {
    const container = $(".container");
    selectedUsers.forEach((user) => {
      if (!addedUserNames.includes(user.name)) {
        const userCard = $(`
            <div class="user-card">
              <img src="${user.img}" alt="${user.name}" />
            </div>
          `);
        container.append(userCard);
        addedUserNames.push(user.name);
      }
    });
  }

  const modal = $("#invite-modal");
  const btn = $(".invite-button");
  const span = $(".close");

  btn.click(function () {
    fetchUsers().done(function (users) {
      renderUsers(users);
      modal.show();
    });
  });

  fetchUsers().done(function (users) {
    renderUsers(users);
  });

  span.click(function () {
    modal.hide();
  });

  $(window).click(function (event) {
    if ($(event.target).is("#invite-modal")) {
      modal.hide();
    }
  });

  $("#selectAll").change(function () {
    const isChecked = $(this).is(":checked");
    $(".user-checkbox").prop("checked", isChecked);
  });

  $("#createBtn").click(function () {
    const selectedUsers = $(".user-checkbox:checked")
      .map(function () {
        const userCard = $(this).siblings(".image-card");
        return {
          name: userCard.find("span").text(),
          img: userCard.find("img").attr("src"),
        };
      })
      .get();
    addUserCards(selectedUsers);
    modal.hide();
  });
});

const storedMediaFiles = [];
let mediaFiles = [
  "./assets/user1.png",
  "./assets/user2.png",
  "./assets/user3.png",
  "./assets/user4.png",
  "./assets/user5.png",
  "./assets/user1.png",
  "./assets/user2.png",
  "./assets/user3.png",
  "./assets/user4.png",
  "./assets/user5.png",
  "./assets/user1.png",
  "./assets/user2.png",
  "./assets/user3.png",
  "./assets/user4.png",
  "./assets/user5.png",
  "./assets/user1.png",
  "./assets/user2.png",
  "./assets/user3.png",
];

let imagesToBeSent = 0;

$(document).ready(function () {
  function renderMediaModal() {
    let mediaModalContent = "";
    for (let i = 0; i < 1; i++) {
      mediaFiles.forEach((file) => {
        mediaModalContent += `
          <div class="media-file-card">
            <img src="${file}" alt="image" />
            <input type="checkbox" class="media-checkbox" data-file="${file}" />
          </div>
        `;
      });
    }

    $(".media-files-container").html(mediaModalContent);
  }

  function updateSelectedMedia() {
    const selectedCount = $(".media-checkbox:checked").length;
    $(".media-modal-header span").text(`(${selectedCount} Selected)`);
  }

  function renderSelectedMedia(selectedFiles) {
    let selectedMediaContent = selectedFiles
      .map(
        (file, index) => `
      <div class="chat-input-image-card" data-file="${file}">
        <img src="${file}" alt="Selected image" class="selectable-image" />
        <div class="image-overlay"></div>
        <i class="fa fa-times-circle remove-icon" aria-hidden="true" data-index="${index}"></i>
      </div>
    `
      )
      .join("");

    $("#chat-input-image-container").html(selectedMediaContent);
    updateImagesToBeSent();
  }

  function updateImagesToBeSent() {
    imagesToBeSent = $(".chat-input-image-card.selected").length;
    $(".send-button-images")
      .toggle(imagesToBeSent > 0)
      .html(
        `Send ${imagesToBeSent} <i class="fa fa-paper-plane" aria-hidden="true"></i>`
      );
  }

  renderMediaModal();

  $("#toggle-media-modal").click(function () {
    $("#media-modal").toggle();
  });

  $(document).on("change", ".media-checkbox", function () {
    const file = $(this).data("file");

    if ($(this).is(":checked")) {
      storedMediaFiles.push(file);
    } else {
      const index = storedMediaFiles.indexOf(file);
      if (index > -1) {
        storedMediaFiles.splice(index, 1);
      }
    }

    updateSelectedMedia();
    renderSelectedMedia(storedMediaFiles);
  });

  $(document).on("click", ".remove-icon", function (event) {
    event.stopPropagation();
    const file = $(this).closest(".chat-input-image-card").data("file");
    const index = storedMediaFiles.indexOf(file);
    if (index > -1) {
      storedMediaFiles.splice(index, 1);
    }

    $(`.media-checkbox[data-file="${file}"]`).prop("checked", false);

    updateSelectedMedia();
    renderSelectedMedia(storedMediaFiles);
  });

  $(document).on("click", ".selectable-image", function (event) {
    event.stopPropagation();

    const file = $(this).closest(".chat-input-image-card").data("file");
    const isSelected = $(this)
      .closest(".chat-input-image-card")
      .toggleClass("selected")
      .hasClass("selected");

    if (isSelected) {
      storedMediaFiles.push(file);
    } else {
      const index = storedMediaFiles.indexOf(file);
      if (index > -1) {
        storedMediaFiles.splice(index, 1);
      }
    }

    updateSelectedMedia();
    updateImagesToBeSent();
  });

  $(window).click(function (event) {
    if (!$(event.target).closest("#media-modal, #toggle-media-modal").length) {
      $("#media-modal").hide();
    }
  });

  $(".select-button").click(function () {
    $("#file-upload").click();
  });

  $("#file-upload").change(function (event) {
    const files = event.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileContent = e.target.result;
        if (!mediaFiles.includes(fileContent)) {
          let i = 0;
          mediaFiles = [fileContent, ...mediaFiles];
          i++;
          renderMediaModal();

          console.log(mediaFiles.length);
        }
      };
      reader.onerror = function (e) {
        console.error("File reading error:", e);
      };
      reader.readAsDataURL(file);
    }
  });

  updateImagesToBeSent();
});

const selectedFiles = [];
let allFiles = [];

$(document).ready(function () {
  function fetchFiles() {
    return $.getJSON("data/files.json");
  }

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      var truncated = text.substring(0, maxLength) + "...";
      return truncated;
    } else {
      return text;
    }
  }

  function renderFileCards(files) {
    const fileCardsContainer = $("#file-cards-container");
    fileCardsContainer.empty();

    files.forEach((file, index) => {
      const fileCard = `
        <div class="file-card">
          <div class="file-content">
            <img src="${file.icon}" alt="file" />
            <span>${truncateText(file.name, 48)}</span>
          </div>
          <input type="checkbox" class="file-checkbox" data-index="${index}" data-name="${
        file.name
      }" data-icon="${file.icon}" />
        </div>
      `;
      fileCardsContainer.append(fileCard);
    });

    $("#file-count").text(files.length);
  }

  function renderSelectedFiles() {
    const fileContainer = $("#chat-input-file-container");
    let selectedFilesContent = selectedFiles
      .map(
        (file, index) => `
          <div class="chat-input-file-card" data-index="${index}">
            <div>
              <img src="${file.icon}" alt="file" />
              <span>${truncateText(file.name, 38)}</span>
            </div>
            <i class="fa fa-times-circle remove-file-icon" aria-hidden="true"></i>
          </div>
        `
      )
      .join("");

    fileContainer.html(selectedFilesContent);
  }

  $("#open-modal-btn").click(function () {
    fetchFiles().done(function (files) {
      allFiles = files;
      renderFileCards(allFiles);
      $("#file-modal").toggle();
    });
  });

  $(document).on("click", ".chat-input-file-card", function (event) {
    event.stopPropagation();
    $(this).toggleClass("selected");
    updateFilesToBeSent();
  });

  $(document).ready(function () {
    updateFilesToBeSent();
  });

  function updateFilesToBeSent() {
    var filesToBeSent = $(".chat-input-file-card.selected").length;
    $(".send-button-images")
      .toggle(filesToBeSent > 0)
      .html(
        `Send ${filesToBeSent} <i class="fa fa-paper-plane" aria-hidden="true"></i>`
      );
  }

  $(document).on("change", ".file-checkbox", function () {
    const fileName = $(this).data("name");
    const fileIcon = $(this).data("icon");
    const fileCard = $(this).closest(".file-card");

    if ($(this).is(":checked")) {
      selectedFiles.push({ name: fileName, icon: fileIcon });
      fileCard.addClass("selected-file-card");
    } else {
      const index = selectedFiles.findIndex((file) => file.name === fileName);
      if (index > -1) {
        selectedFiles.splice(index, 1);
      }
      fileCard.removeClass("selected-file-card");
    }

    $(".file-modal-header span").text(`(${selectedFiles.length} Selected)`);
    renderSelectedFiles();
  });

  $(document).on("click", ".remove-file-icon", function (event) {
    event.stopPropagation();

    const $fileCard = $(this).closest(".chat-input-file-card");
    const fileName = $fileCard.find("span").text();
    const index = selectedFiles.findIndex((file) => file.name === fileName);
    if (index > -1) {
      selectedFiles.splice(index, 1);
    }

    $(`.file-checkbox[data-name="${fileName}"]`).prop("checked", false);

    $(".file-modal-header span").text(`(${selectedFiles.length} Selected)`);
    renderSelectedFiles();
  });

  $(document).on("click", ".chat-input-file-card", function (event) {
    event.stopPropagation();
    $(this).toggleClass("active-file-card");
  });

  $(".select-button-files").click(function () {
    $("#upload-files").click();
  });

  $("#upload-files").change(function (event) {
    const files = event.target.files;
    const fileReaders = [];

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const fileContent = e.target.result;
        const uploadedFile = { name: file.name, icon: fileContent };
        allFiles.unshift(uploadedFile);
        fileReaders.push(reader);
        if (fileReaders.length === files.length) {
          renderFileCards(allFiles);
        }
      };
      reader.onerror = function (e) {
        console.error("File reading error:", e);
      };
      reader.readAsDataURL(file);
    }
  });

  $(window).click(function (event) {
    if (
      !$(event.target).closest(
        "#file-modal, #open-modal-btn, .remove-file-icon"
      ).length
    ) {
      $("#file-modal").hide();
    }
  });
});

$(document).ready(function () {
  function fetchLinks() {
    return $.getJSON("data/links.json");
  }

  function renderLinkCards(links) {
    const linkCardsContainer = $("#link-cards-container");
    linkCardsContainer.empty();

    links.forEach((link) => {
      const linkCard = `
        <div class="link-card">
          <div class="link-content">
            <img src="${link.icon}" alt="file" />
            <span>${link.name}</span>
          </div>
          <input type="checkbox" class="link-checkbox" />
        </div>
      `;
      linkCardsContainer.append(linkCard);
    });
  }

  $("#open-link-modal-btn").click(function () {
    fetchLinks().done(function (links) {
      console.log(links);
      if (links) {
        renderLinkCards(links);
        $("#link-modal").toggle();
      }
    });
  });

  $(document).on("change", ".link-checkbox", function () {
    let selectedCount = $(".link-checkbox:checked").length;
    $(".link-modal-header span").text(`(${selectedCount} Selected)`);
  });

  $(window).click(function (event) {
    if (!$(event.target).closest("#link-modal, #open-link-modal-btn").length) {
      $("#link-modal").hide();
    }
  });
});

$(document).ready(function () {
  $(".file-icon-card").click(function () {
    $(".file-icon-card").removeClass("active");
    $(this).addClass("active");
  });
});

$(document).ready(function () {
  var modal = $("#createGroupModal");
  var btn = $("#openGroupModal");
  var span = $(".close");
  var cancelBtn = $(".cancel");
  var uploadContainer = $("#uploadContainer");
  var fileInput = $("#groupImage");
  var imagePreview = $("#imagePreview");

  btn.click(function () {
    modal.css('display', 'flex')
    btn.addClass("clicked");
  });

  span.click(function () {
    modal.hide();
    btn.removeClass("clicked");
  });

  cancelBtn.click(function () {
    modal.hide();
    btn.removeClass("clicked");
  });

  $(window).click(function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
      btn.removeClass("clicked");
    }
  });

  $("#createGroupForm").submit(function (event) {
    event.preventDefault();
    modal.hide();
    btn.removeClass("clicked");

    $("#addMemberModal").css('display', 'flex')
  });

  // Drag and Drop functionality
  uploadContainer.on("dragover", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).addClass("dragover");
  });

  uploadContainer.on("dragleave", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).removeClass("dragover");
  });

  uploadContainer.on("drop", function (event) {
    event.preventDefault();
    event.stopPropagation();
    $(this).removeClass("dragover");
    var files = event.originalEvent.dataTransfer.files;
    fileInput.prop("files", files);

    fileInput.change();
  });

  fileInput.change(function () {
    var files = this.files;
    imagePreview.empty();
    if (files.length > 0) {
      $.each(files, function (index, file) {
        var reader = new FileReader();
        reader.onload = function (e) {
          var img = $("<img>").attr("src", e.target.result);
          imagePreview.append(img);
        };
        reader.readAsDataURL(file);
      });
      imagePreview.show();
    }
  });
});

$(document).ready(function () {
  var modal = $("#callModal");
  var btn = $("#openCallModal");
  var moreModal = $("#moreModal");
  var span = $(".close");
  var endCall = $(".end-call");

  btn.click(function () {
    modal.show();
    moreModal.hide();
  });

  span.click(function () {
    modal.hide();
  });

  endCall.click(function () {
    modal.hide();
  });

  $(window).click(function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
    }
  });
});

$(document).ready(function () {
  var modal = $("#sendCoinModal");
  var btn = $(".send-coin-button");
  var span = $(".cancel-button");

  btn.on("click", function () {
    modal.show();
  });

  span.on("click", function () {
    modal.hide();
  });

  $(window).on("click", function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
    }
  });

  $(".coin-button").on("click", function () {
    $(".coin-button").removeClass("selected");
    $(this).addClass("selected");
    var amount = $(this).text();
    $(".coin-summary").text(amount + " coins to Sophia Vera");
  });
});

$(document).ready(function () {
  var modal = $("#sendGiftModal");
  var btn = $(".send-gift-button");
  var span = $(".cancel-button");

  btn.on("click", function () {
    modal.show();
  });

  span.on("click", function () {
    modal.hide();
  });

  $(window).on("click", function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
    }
  });

  $(".gift-button").on("click", function () {
    $(".gift-button").removeClass("selected");
    $(this).addClass("selected");
  });
});

$(document).ready(function () {
  const members = [
    { name: "Jenny Wilson", image: "./assets/user1.png" },
    { name: "Jenny Wilson", image: "./assets/user2.png" },
    { name: "Jenny Wilson", image: "./assets/user3.png" },
    { name: "Jenny Wilson", image: "./assets/user4.png" },
    { name: "Jenny Wilson", image: "./assets/user1.png" },
    { name: "Jenny Wilson", image: "./assets/user2.png" },
    { name: "Jenny Wilson", image: "./assets/user3.png" },
    { name: "Jenny Wilson", image: "./assets/user4.png" },
  ];

  function renderMembers() {
    const membersList = $("#members-list");
    membersList.empty();

    members.forEach((member, index) => {
      const memberItem = `
        <div class="member-item">
          <div class="image-content">
            <img src="${member.image}" alt="image" />
            <div class="name-content">
              <h3>${member.name}</h3>
              <span>Visit Profile <i class="fa fa-angle-right" aria-hidden="true"></i></span>
            </div>
          </div>
          <button class="ellipsis-button" data-index="${index}">
            <i class="fa fa-ellipsis-h" aria-hidden="true"></i>
          </button>
          
          <div id="optionsGroupsModal-${index}" class="options-modal-groups">
            <button class="options-modal-close" data-index="${index}">
              <i class="fa fa-times close" aria-hidden="true"></i>
            </button>
            <div class="options-group-modal-content">
              <ul>            
                <li>
                  <span class="icon"><i class="fa fa-arrow-up" aria-hidden="true"></i></span>
                  Make admin
                </li>
                <li>
                  <span class="icon"><i class="fa fa-minus-square-o" aria-hidden="true"></i></span>
                  Remove
                </li>
                <li>
                  <span class="icon"><i class="fa fa-ban" aria-hidden="true"></i></span>
                  Block
                </li>
              </ul>
            </div>
          </div>
        </div>
      `;
      membersList.append(memberItem);
    });

    $(".ellipsis-button").on("click", function (event) {
      const index = $(this).data("index");
      $(`#optionsGroupsModal-${index}`).show();
      $(event.target).closest(".options-hover-button").addClass("hide-button");
    });

    $(".options-modal-close").on("click", function (event) {
      event.stopPropagation();
      const index = $(this).data("index");
      $(`#optionsGroupsModal-${index}`).hide();
      $(event.target)
        .closest(".options-hover-button")
        .removeClass("hide-button");
    });
  }

  renderMembers();
});

$(document).ready(function () {
  $("#openAddMemberModal").click(function () {
    $("#addMemberModal").show();
  });

  $("#cancelBtn").click(function () {
    $("#addMemberModal").hide();
  });

  $(window).click(function (event) {
    if ($(event.target).is("#addMemberModal")) {
      $("#addMemberModal").hide();
    }
  });

  $("#addMembersBtn").click(function () {
    $("#addMemberModal").hide();
  });

  $(".modal-tabs h2").click(function () {
    const tab = $(this).data("tab");
    $(".modal-tabs h2").removeClass("active");
    $(this).addClass("active");

    if (tab === "following") {
      $("#searchInput").attr("placeholder", "Search following");
      $("#followingList").show();
      $("#followersList").hide();
    } else {
      $("#searchInput").attr("placeholder", "Search followers");
      $("#followingList").hide();
      $("#followersList").show();
    }
  });

  $("#selectAllCheckbox").change(function () {
    const isChecked = $(this).is(":checked");
    $(".members-list-modal:visible .member-checkbox").prop(
      "checked",
      isChecked
    );
  });

  $(".members-list-modal").on("change", ".member-checkbox", function () {
    if (!$(this).is(":checked")) {
      $("#selectAllCheckbox").prop("checked", false);
    } else if (
      $(".members-list-modal:visible .member-checkbox:checked").length ===
      $(".members-list-modal:visible .member-checkbox").length
    ) {
      $("#selectAllCheckbox").prop("checked", true);
    }
  });
});

$(document).ready(function () {
  $("#url-input").keyup(function (event) {
    if (event.keyCode === 13 || event.keyCode === 32) {
      fetchMetaData();
    }
  });

  $("#url-input").focusout(function () {
    fetchMetaData();
  });

  function fetchMetaData() {
    const urlInput = $("#url-input").val().trim();
    if (!urlInput) {
      return;
    }

    $.ajax({
      url: "http://localhost:3000/fetch-metadata",
      method: "POST",
      contentType: "application/json",
      data: JSON.stringify({ url: urlInput }),
      success: function (metadata) {
        console.log(metadata);
        displayMetaData(metadata);
      },
      error: function (error) {
        console.error("There was a problem with the fetch operation:", error);
      },
    });
  }

  function displayMetaData(metadata) {
    $("#metadata-display").html(`
          <div class="metadata-card">
            <div class="metadata-image">
              <img src="${metadata.image}" alt="Image" />
            </div>
            <div class="metadata-content">
              <h3>${metadata.title}</h3>
              <p>${metadata.description}</p>
            </div>
          </div>
        `);
  }
});

$(document).ready(function () {
  let isRecording = false;
  const placeholderText = $("#url-input").attr("placeholder");

  $("#microphone-icon").click(function () {
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  });

  function startRecording() {
    $("#url-input").addClass("recording").attr("placeholder", "");
    $("#microphone-icon").addClass("recording-icon");

    const svgIcon = `
      <i class="fa fa-microphone" aria-hidden="true"></i>
      <div class='wave-icon'>
        <svg xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 50.000001 62.50000125" x="0px" y="0px"><g transform="translate(0,-1002.3622)"><rect y="1026.9871" x="0.91559875" height="0.74997121" width="0.20737724" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20737983" height="3.520968" x="1.344709" y="1025.6017" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.2753" x="1.7738204" height="2.1739619" width="0.20738164" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20737724" height="6.00775" x="2.202935" y="1024.3583" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1023.0889" x="2.6320484" height="8.5463409" width="0.20737511" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20737883" height="4.4017029" x="3.0611587" y="1025.1613" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.3788" x="3.4902701" height="1.9667301" width="0.20738198" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20738372" height="1.0341885" x="3.9193816" y="1026.8452" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.1873" x="4.348496" height="4.349895" width="0.20737889" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20737568" height="7.8210287" x="4.7776098" y="1023.4517" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.3944" x="5.2067208" height="3.935431" width="0.20737936" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect  width="0.20738223" height="1.8113066" x="5.6358309" y="1026.4567" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.5239" x="6.0649452" height="3.6763916" width="0.20737964" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20738214" height="1.8631142" x="6.4940557" y="1026.4305" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.1976" x="6.9231677" height="2.3293855" width="0.20738141" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20738296" height="1.3968436" x="7.3522787" y="1026.6638" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.9644" x="7.7813911" height="2.7956569" width="0.20738076" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20737724" height="6.00775" x="8.2105055" y="1024.3583" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1022.1307" x="8.6396198" height="10.463237" width="0.20737369" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20737186" height="13.260869" x="9.0687313" y="1020.7318" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1021.3536" x="9.4978447" height="12.017476" width="0.20737265" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20737495" height="8.7535734" x="9.9269543" y="1022.9855" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1024.3583" x="10.356065" height="6.00775" width="0.20737724" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20737422" height="9.7379246" x="10.785178" y="1022.4932" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1023.8145" x="11.21429" height="7.095717" width="0.20737629" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect width="0.20737241" height="12.380133" x="11.643402" y="1021.1722" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1022.7783" x="12.072513" height="9.1680374" width="0.20737463" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737724" height="6.00775" x="12.501623" y="1024.3583" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.6796" x="12.930734" height="3.3655438" width="0.20738003" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737523" height="8.3909168" x="13.359848" y="1023.1669" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1023.7626" x="13.788959" height="7.1993332" width="0.20737618" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737971" height="3.6245837" x="14.21807" y="1025.55" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.9644" x="14.647183" height="2.7956569" width="0.20738076" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.2073825" height="1.6558828" x="15.076297" y="1026.5343" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.4203" x="15.505409" height="3.8836234" width="0.20737942" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737414" height="9.8415413" x="15.934526" y="1022.4413" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1023.5035" x="16.363636" height="7.7174129" width="0.20737575" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738308" height="1.3450357" x="16.792746" y="1026.6897" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1024.3583" x="17.650974" height="6.00775" width="0.20737724" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738022" height="3.2101202" x="17.221859" y="1025.7572" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738062" height="2.8992727" x="18.509197" y="1025.9125" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.5862" x="18.938311" height="1.5522671" width="0.20738268" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738043" height="3.0546963" x="18.080086" y="1025.8348" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738029" height="3.1583121" x="19.367424" y="1025.783" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.1354" x="19.796539" height="4.4535108" width="0.20737877" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.5239" x="20.225651" height="3.6763916" width="0.20737964" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737855" height="4.6607428" x="20.654764" y="1025.0317" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.3529" x="21.083876" height="2.018538" width="0.20738189" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738317" height="1.2932278" x="21.512989" y="1026.7157" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1027.0264" x="21.942099" height="0.67153394" width="0.20738462" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738289" height="1.4486513" x="22.371214" y="1026.6378" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.2908" x="22.800329" height="4.1426635" width="0.20737912" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738091" height="2.6920409" x="23.658554" y="1026.0162" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.4567" x="23.229441" height="1.8113066" width="0.20738223" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1023.0113" x="24.516783" height="8.7017651" width="0.20737498" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737681" height="5.2824359" x="24.945894" y="1024.7211" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1022.4155" x="24.087671" height="9.8933487" width="0.2073741" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.783" x="25.375006" height="3.1583121" width="0.20738029" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737724" height="6.00775" x="25.804121" y="1024.3583" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738029" height="3.1583121" x="26.233231" y="1025.783" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.6638" x="26.662344" height="1.3968436" width="0.20738296" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738016" height="3.2619281" x="27.091457" y="1025.7312" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1024.3583" x="27.520573" height="6.00775" width="0.20737724" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737563" height="7.8728366" x="27.949684" y="1023.4259" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1022.6746" x="28.378799" height="9.3752689" width="0.20737448" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737724" height="6.00775" x="28.807911" y="1024.3583" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.2753" x="29.666134" height="2.1739619" width="0.20738164" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738003" height="3.3655438" x="29.237022" y="1025.6796" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738016" height="3.2619281" x="30.524361" y="1025.7312" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.4048" x="30.953474" height="1.9149221" width="0.20738205" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738055" height="2.9510806" x="30.095247" y="1025.8867" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738022" height="3.2101202" x="31.382586" y="1025.7572" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1024.3583" x="31.811703" height="6.00775" width="0.20737724" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1023.374" x="32.24081" height="7.9764528" width="0.20737556" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737877" height="4.4535108" x="32.669922" y="1025.1354" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1023.9179" x="33.099033" height="6.8884854" width="0.20737645" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737964" height="3.6763916" x="33.528145" y="1025.5239" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.2391" x="33.957256" height="4.2462792" width="0.207379" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737778" height="5.4378624" x="34.386368" y="1024.6432" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1024.3583" x="34.815475" height="6.00775" width="0.20737724" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738198" height="1.9667301" x="35.673695" y="1026.3788" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.8091" x="35.244587" height="3.1065044" width="0.20738035" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.7415" x="36.531918" height="1.2414199" width="0.20738328" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738111" height="2.536617" x="36.961033" y="1026.0939" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.8091" x="36.10281" height="3.1065044" width="0.20738035" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.6378" x="37.390137" height="1.4486513" width="0.20738289" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737997" height="3.417352" x="37.819252" y="1025.6534" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737971" height="3.6245837" x="38.248363" y="1025.55" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1024.8506" x="38.677475" height="5.0233984" width="0.20737818" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737997" height="3.417352" x="39.106586" y="1025.6534" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1024.3583" x="39.535698" height="6.00775" width="0.20737724" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737444" height="9.4270763" x="39.964806" y="1022.6488" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.0317" x="40.393917" height="4.6607428" width="0.20737855" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738003" height="3.3655438" x="40.823029" y="1025.6796" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.7572" x="41.681252" height="3.2101202" width="0.20738022" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738173" height="2.1221538" x="41.252136" y="1026.301" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738158" height="2.2257698" x="42.539467" y="1026.2493" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.5343" x="42.968575" height="1.6558828" width="0.2073825" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738308" height="1.3450357" x="42.110355" y="1026.6897" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738395" height="0.93057281" x="43.397686" y="1026.8969" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1020.8613" x="43.826805" height="13.001829" width="0.20737202" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1021.6642" x="44.255913" height="11.395781" width="0.20737307" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737086" height="14.918724" x="44.685028" y="1019.9028" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1020.9908" x="45.114136" height="12.742788" width="0.20737219" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737374" height="10.411429" x="45.543243" y="1022.1565" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1023.4775" x="45.972355" height="7.7692204" width="0.20737572" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20737867" height="4.5571265" x="46.401466" y="1025.0835" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.2493" x="46.83057" height="2.2257698" width="0.20738158" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738135" height="2.3811934" x="47.688797" y="1026.1715" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.8348" x="47.259686" height="3.0546963" width="0.20738043" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1025.7312" x="48.54702" height="3.2619281" width="0.20738016" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect style="" width="0.20738296" height="1.3968436" x="48.976128" y="1026.6638" fill="#f706060" fill-opacity="1" stroke-width="0"/><rect y="1026.6378" x="48.117905" height="1.4486513" width="0.20738289" style="" fill="#f706060" fill-opacity="1" stroke-width="0"/></g></svg>
      </div>
    `;
    $("#audio-waves").html(svgIcon);

    console.log("Recording started...");

    isRecording = true;
  }

  function stopRecording() {
    $("#url-input")
      .removeClass("recording")
      .attr("placeholder", placeholderText);
    $("#microphone-icon").removeClass("recording-icon");

    $("#audio-waves").html("");

    console.log("Recording stopped.");

    isRecording = false;
  }
});

$(document).ready(function () {
  var groupModal = $("#group-modal");

  $("#open-group-modal-btn").click(function () {
    groupModal.toggle();
  });

  $(window).click(function (event) {
    if ($(event.target).is(groupModal)) {
      groupModal.css("display", "none");
    }
  });
});

$(document).ready(function () {
  $("#attachment-icon").on("click", function () {
    var $img = $(this).find(".attachment-icon");
    var imgSrc = $img.attr("src");

    var $span = $(this);
    $span.toggleClass("clicked");

    $.ajax({
      url: imgSrc,
      type: "GET",
      dataType: "xml",
      success: function (data) {
        var $svg = $(data).find("svg");
        $svg.attr("class", "attachment-icon clicked");
        $svg.find("stop").attr("stop-color", "#31C6FE");

        $img.replaceWith($svg);
      },
    });

    var icon = $("#svg");

    if (icon) {
      icon.find("stop").each(function () {
        if ($(this).attr("stop-color") === "#31C6FE") {
          $(this).attr("stop-color", "#000");
        } else {
          $(this).attr("stop-color", "#31C6FE");
        }
      });
    }
  });
});

$(document).ready(function () {
  var modal = $("#moreModal");
  var btn = $(".action-button.more");
  var span = $("#close-more-action");
  var closeBtn = $(".close-more-action-mobile");

  btn.on("click", function () {
    modal.show();
    $("#close-more-action").show();
    btn.css("color", "#fff");
  });

  closeBtn.on("click", function () {
    modal.hide();
    $("#close-more-action").hide();
    btn.css("color", "#000");
  });

  span.on("click", function () {
    modal.hide();
    btn.css("color", "#000");
    $("#close-more-action").hide();
  });

  $(window).on("click", function (event) {
    if ($(event.target).is(modal)) {
      modal.hide();
      btn.css("color", "#000");
      $("#close-more-action").hide();
    }
  });
});

$(document).ready(function () {
  function addHoverClass(event) {
    $(event.currentTarget).addClass("hover");
  }

  function removeHoverClass(event) {
    $(event.currentTarget).removeClass("hover");
  }

  $(".chat-item, .group-item").on("touchstart", function (event) {
    addHoverClass(event);
  });

  $(".chat-item, .group-item").on("touchend", function (event) {
    removeHoverClass(event);
  });
});

$(document).ready(function () {
  $("#openModalBtn").click(function () {
    $(".invite-modal").fadeIn();
  });

  $("#close-invite-modal").click(function () {
    $(".invite-modal").fadeOut();
  });

  $(window).click(function (event) {
    if ($(event.target).is(".invite-modal")) {
      console.log("new here");
      $(".invite-modal").fadeOut();
    }
  });

  $("#expandBtn").click(function () {
    $(".video-container").toggleClass("full-screen");
  });
});

$(document).ready(function () {
  $("#openHomeModalBtn").click(function () {
    $("#homModal").show();
  });

  $("#home-close-btn").click(function () {
    $("#homModal").hide();
  });

  $(window).click(function (event) {
    if ($(event.target).is("#homModal")) {
      $("#homModal").hide();
    }
  });
});

$(document).ready(function () {
  function openModal() {
    $("#background-modal").css("display", "flex");
  }

  function closeModal() {
    $("#background-modal").hide();
  }

  $("#open-modal-button").on("click", function () {
    openModal();
  });

  $("#close-modal-button").on("click", function (event) {
    closeModal();
  });

  $(".background-modal-content").on("click", function (event) {
    event.stopPropagation();
  });

  $(window).click(function (event) {
    if ($(event.target).is("#background-modal")) {
      $("#background-modal").hide();
    }
  });
});

$(document).ready(function () {
  var btn = $(".action-button.more");
  var span = $("#close-more-action");

  $("#openModalDelete").click(function () {
    $("#deleteModal").css("display", "flex");
    $("#moreModal").hide();
    span.hide();
    btn.css("color", "#000");
  });

  $("#openModalBlock").click(function () {
    $("#deleteModal").css("display", "flex");
    $("#moreModal").hide();
    span.hide();
    btn.css("color", "#000");
  });

  $(".close-delete, .delete-modal").click(function (event) {
    if (
      $(event.target).is(".close-delete") ||
      $(event.target).is(".delete-modal")
    ) {
      $("#deleteModal").hide();
    }
  });

  $(".modal-content-delete").click(function (event) {
    event.stopPropagation();
  });
});

$(document).ready(function () {
  $(".mobile").click(() => {
    $("#callModal").show();
  });
});
