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
});

$(window).on("resize", () => {
  if (window.innerWidth > 768) {
    $(".popup").each((_, el) => {
      el.close();
    });
  }
});

function eventHandlers() {
  // To hide the modal during outside click
  $(".modal").click(function (e) {
    if (!$(e.target).hasClass("modal")) return;
    $(".modal").addClass("hidden-modal");
  });

  // The icons in each list
  $(".toggle-icon").click(function () {
    const containerId = $(this).closest(".saved-item").data("id");
    console.log(containerId);

    var target = $(`div[data-id='${containerId}']`).find(".nav-menu");
    $(this).hide();
    $(this).siblings(".close-icon").show();
    $(target).slideDown();
  });
  $(".close-icon").click(function () {
    const containerId = $(this).closest(".saved-item").data("id");

    var target = $(`div[data-id='${containerId}']`).find(".nav-menu");
    $(this).hide();
    $(this).siblings(".toggle-icon").show();
    $(target).slideUp();
  });
  // Modal for edit btn
  $(".edit-btn").on("click", function () {
    const elId = $(this).data("id");
    var title = $(this)
      .closest(`div[data-id='${elId}']`)
      .find(".editable-title")
      .text();
    console.log("=-=-=-=-=-=-=--", title);
    $("#editModal").data(
      "titleElement",
      $(this).closest(".flex-col-2").find(".editable-title")
    );
    $("#editModal #title").val(title);
    $("#editModal").removeClass("hidden-modal");
    $("#save-btn").on("click", function () {
      var newTitle = $("#editModal #title").val();
      console.log("title", newTitle);
      $(`div[data-id='${elId}']`).find(".editable-title").text(newTitle);
      $("#editModal").addClass("hidden-modal");
    });
  });

  // modal for delete-btn
  $("#deleteModal").addClass("hidden-modal");
  $(".delete-btn").on("click", function () {
    $("#deleteModal").removeClass("hidden-modal");
  });

  $(".cancel-btn").on("click", function () {
    $("#deleteModal").addClass("hidden-modal");
  });

  $(".delete").on("click", function () {
    $("#deleteModal").addClass("hidden-modal");
  });
}

$(document).ready(function () {
  eventHandlers();

  // for filter list
  $(".filter-list").addClass("hidden-modal");
  $(".filter").on("click", function (event) {
    event.stopPropagation();
    $(".filter-list").removeClass("hidden-modal");
  });

  $(".filter-list .list").on("click", function () {
    // Remove 'active-list' class from all list items
    $(".filter-list .list").removeClass("active-list");
    // Add 'active-list' class to the clicked list item
    $(this).addClass("active-list");
  });

  $(document).on("click", function (event) {
    var $target = $(event.target);
    if (
      !$target.closest(".modal").length &&
      !$target.closest(".filter-list .list").length
    ) {
      $(".filter-list").addClass("hidden-modal");
    }
  });
  // Notification container

  $(".app_notification").addClass("hidden-modal");

  let activeContent = "notification";

  function showContent() {
    if (activeContent === "notification") {
      $("#notification-content").show().addClass("active");
      $("#request-content").hide().removeClass("active");
      $("#notification-center").prop("checked", true);
      $("#request-center").prop("checked", false);
    } else {
      $("#notification-content").hide().removeClass("active");
      $("#request-content").show().addClass("active");
      $("#notification-center").prop("checked", false);
      $("#request-center").prop("checked", true);
    }
  }

  $("#Notification-btn").on("click", function () {
    $(".app_notification").removeClass("hidden-modal");
    $(".top-message").addClass("hidden-modal");
    showContent();
  });

  $("#Request-btn").on("click", function () {
    $(".app_notification").removeClass("hidden-modal");
    $(".top-message").addClass("hidden-modal");
    showContent();
  });

  $("#notification-center").on("click", function () {
    activeContent = "notification";
    showContent();
  });

  $("#request-center").on("click", function () {
    activeContent = "request";
    showContent();
  });

  showContent();

  $(".close-notification").on("click", function () {
    $(".app_notification").addClass("hidden-modal");
  });

  ////// Request for following functionalities button

  $(".confirm-following").addClass("hidden-modal");

  $(".following-link").on("click", function () {
    const mId = $(this).data("id");
    console.log(mId);
    $(this).addClass("hidden-modal");
    $("#confirm-following-" + mId).removeClass("hidden-modal");
  });
  $("#No-req-list").addClass("hidden-modal");
  $(".confirm-cancel , .confirm-done").on("click", function () {
    $(this).closest("li.req-list").remove();
    // // Check if there are any list items left
    if ($(".req-list-container").children("li.req-list").length === 0) {
      $(".req-list-container").append(` <div id="No-req-list">
          <div class="no-scrollbar pb-4">
            <div class="">
              <div class="page-element">
                <div class="element-header">
                  <img src="./icons/notification_icons/no-list.svg" />
                  <span>No Notification Request</span>
                  <p>
                    You haven't created any list yet. <br />
                    Organize your items, tasks or posts <br />
                    by creating your first list.
                  </p>
                </div>
                <button>
                  <div>Notifications</div>
                  <img src="./icons/notification_icons/Arrow_right.svg" />
                </button>
              </div>
            </div>
          </div>
        </div>`);
    }
  });

  // $(".confirm-done").on("click", function () {
  //   const mId = $(this).data("id");
  //   $(this).closest(".confirm-following").addClass("hidden-modal");
  //   $('.following-link[data-id="' + mId + '"]')
  //     .text("Following")
  //     .removeClass("hidden-modal");
  // });
  // message;

  $(".top-message").addClass("hidden-modal");
  $("#Message-btn").on("click", function (event) {
    event.stopPropagation();
    $(".top-message").toggleClass("hidden-modal");
    $(".app_notification").addClass("hidden-modal");
  });

  $(".close-message").on("click", function () {
    $(".top-message").addClass("hidden-modal");
    $(".app_notification").addClass("hidden-modal");
  });
  // out side click for message and notification
  $(document).on("click", function (event) {
    if (
      !$(event.target).closest(
        ".app_notification, #Notification-btn , .top-message , .confirm-cancel , .confirm-done"
      ).length
    ) {
      $(".app_notification , .top-message").addClass("hidden-modal");
    }
  });
});

// Modal

$(document).ready(function () {
  var modal = $("#myModal");
  var btn = $("#new-list-btn");
  var span = $(".close");
  var cancelBtn = $(".cancel-btn");
  var addBtn = $(".add-btn");

  modal.addClass("hidden-modal");
  btn.on("click", function () {
    console.log("btn clicked");
    modal.removeClass("hidden-modal");
  });
  span.on("click", function () {
    modal.addClass("hidden-modal");
  });

  cancelBtn.on("click", function () {
    modal.addClass("hidden-modal");
  });
  // // Hide the modal when clicking outside of the modal content
  $(window).on("click", function (event) {
    if ($(event.target).is($("myModal"))) {
      console.log(event.target);
      modal.addClass("hidden-modal");
    }
  });
  // Handle form submission
  addBtn.on("click", function (event) {
    event.preventDefault();
    const prevDataSet = $(".cards .saved-item:last-child").data().id;
    console.log(prevDataSet);
    // Get the title from the form
    var title = $("#title").val();
    // Create a new item
    var newItem = `
      <div data-id='${
        +prevDataSet + 1
      }' class="saved-item px-2 flex-col-1 size-10 border-2 py-2-4">
       
          <div class="list_image">
            <img loading="lazy" src="image-placeholder.png" />
          </div>
          <div class="flex space-between">
            <div class="flex-col-2">
              <span class="text-dark editable-title text-medium font-medium">${title}</span>
              <div class="button">
                <button class="text-gray-500 text-smm font-regular" type="button">24 Saved post</button>
              </div>
            </div>
            <div class="items-center">
              <div class="icon-box px-2 rounded-x border-2 items-center">
                <img loading="lazy" class="toggle-icon" data-target="#school-nav" src="./icons/Meatballs_menu.svg" />
                <img loading="lazy" class="close-icon" data-target="#school-nav" src="./icons/Close_round.svg" />
              </div>
            </div>
            <div id="school-nav" class="nav-menu px-2 rounded-xll" style="display: none">
              <div class="px-2 py-2">
                <div class="nav-menu-list flex items-center text-base font-medium gap-2">
                  <img loading="lazy" src="icons/Edit.svg" class="size-6" />
                  <div>
                    <button data-id='${
                      +prevDataSet + 1
                    }' class="edit-btn">Edit</button>
                  </div>
                </div>
                <div class="nav-menu-list flex items-center text-base font-medium gap-2">
                  <img  loading="lazy" src="icons/Trash.svg" class="size-6" />
                  <div>
                    <button class="delete-btn">Delete</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    `;

    // Append the new item to the saved-detail container
    $(".cards").append(newItem);

    // Clear the form
    $("#title").val("");

    // Hide the modal
    modal.addClass("hidden-modal");
    eventHandlers();
  });
  $("#editModal").addClass("hidden-modal");
  $("#edit-list-btn").on("click", function () {
    $("#editModal").removeClass("hidden-modal");
  });
  $("#delete-list-btn").on("click", function () {
    $("#deleteModal").removeClass("hidden-modal");
  });
  $(".cancel-btn").on("click", function () {
    $("#editModal").addClass("hidden-modal");
  });
});

// for routes of index.html and work.html

$(document).ready(function () {
  $("#savedPage").on("click", function () {
    window.location.href = "index.html";
  });
  $("#myButton").on("click", function () {
    window.location.href = "work.html";
  });
  $(".app_notification_footer").on("click", function () {
    window.location.href = "notification.html";
  });
  $("#explore").on("click", function () {
    window.location.href = "notification.html";
  });
});

// Modal for responsive Add button

$(document).ready(function () {
  var modal = $("#addResponsive");
  var btn = $("#new-list-btn");
  var span = $(".close");
  var cancelBtn = $(".cancel-btn");
  var icon = $(".float-icon");
  var addBtn = $(".add-btn-res");
  modal.addClass("hidden-modal");
  btn.on("click", function () {
    console.log("btn clicked");
    modal.removeClass("hidden-modal");
  });
  span.on("click", function () {
    modal.addClass("hidden-modal");
  });
  cancelBtn.on("click", function () {
    modal.addClass("hidden-modal");
  });
  icon.on("click", function () {
    modal.addClass("hidden-modal");
  });

  modal.on("click", function (event) {
    if ($(event.target).is(modal)) {
      $(modal).addClass("hidden-modal");
    }
  });

  $("#navResponsive").addClass("hidden-modal");

  $("#nav_mobile").on("click", function () {
    $("#navResponsive").removeClass("hidden-modal");
  });

  $("#navResponsive").on("click", function (event) {
    if ($(event.target).is("#navResponsive")) {
      $("#navResponsive").addClass("hidden-modal");
    }
  });
});

// Modal for responsive edit-btn

$(document).ready(function () {
  $("#editResponsive").addClass("hidden-modal");

  // Open modal on edit button click
  $(".edit-btn").on("click", function () {
    const elId = $(this).data("id");
    var title = $(this)
      .closest(`div[data-id='${elId}']`)
      .find(".editable-title")
      .text();
    console.log("=-=-=-=-=-=-=--", title);

    $("#editResponsive").data(
      "titleElement",
      $(this).closest(".flex-col-2").find(".editable-title")
    );

    $("#editResponsive #title").val(title);
    $("#editResponsive").removeClass("hidden-modal");
  });
  $(".float-icon").on("click", function () {
    $("#editResponsive").addClass("hidden-modal");
  });
  $(".cancel-btn").on("click", function () {
    $("#editResponsive").addClass("hidden-modal");
  });
  $("#edit-list-btn").on("click", function () {
    $("#editResponsive").removeClass("hidden-modal");
  });

  $("#editResponsive").on("click", function (event) {
    if ($(event.target).is("#editResponsive")) {
      $("#editResponsive").addClass("hidden-modal");
    }
  });
});

// Modal for responsive delete button

$(document).ready(function () {
  $("#deleteResponsive").addClass("hidden-modal");
  $(".delete-btn").on("click", function () {
    $("#deleteResponsive").data("boxElement", $(this).closest(".flex-col-2"));
    $("#deleteResponsive").removeClass("hidden-modal");
  });
  $(".float-icon").on("click", function () {
    $("#deleteResponsive").addClass("hidden-modal");
  });
  $(".cancel-btn").on("click", function () {
    $("#deleteResponsive").addClass("hidden-modal");
  });
  $(".delete").on("click", function () {
    $("#deleteResponsive").addClass("hidden-modal");
  });
  $("#delete-list-btn").on("click", function () {
    $("#deleteResponsive").removeClass("hidden-modal");
  });

  $("#deleteResponsive").on("click", function (event) {
    if ($(event.target).is("#deleteResponsive")) {
      $("#deleteResponsive").addClass("hidden-modal");
    }
  });
});

// slider image list in the work page

$(document).ready(function () {
  $(".card-box").each(function () {
    let currentIndex = 0;
    const images = $(this).find(".slider_img img");
    const dots = $(this).find(".dot");

    function showImage(index) {
      images.hide().eq(index).show();
      if (index < 2) {
        dots.removeClass("active").eq(index).addClass("active");
      } else {
        dots.removeClass("active").eq(2).addClass("active");
      }
    }

    dots.eq(0).click(function () {
      currentIndex = 0;
      showImage(currentIndex);
    });

    dots.eq(1).click(function () {
      currentIndex = 1;
      showImage(currentIndex);
    });

    dots.eq(2).click(function () {
      currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 2;
      showImage(currentIndex);
    });

    // Initial display
    showImage(currentIndex);
  });

  // Hover functionality for the overlay
  $(".card-box").find(".popular_overlay").css("display", "none");
  $(".card-box").hover(
    function () {
      $(this).find(".popular_overlay").css("display", "flex");
    },
    function () {
      $(this).find(".popular_overlay").css("display", "none");
    }
  );

  // For the nav menu in each image
  $(".list-nav").css({
    position: "absolute", // Ensure the element is positioned
    "z-index": "100",
  });
  $(".toggle").click(function () {
    console.log("Clicked toggle");
    $(this).hide();
    $(this).siblings(".close-icon").show();
    $(this)
      .closest(".popular_task_ellipsis")
      .find(".list-nav")

      .removeClass("hidden-modal");

    // $(".dot").addClass("hidden-modal");
  });

  $(".close-icon").click(function () {
    console.log("Clicked close-icon");
    $(this).hide();
    $(this).siblings(".toggle").show();
    $(this)
      .closest(".popular_task_ellipsis")
      .find(".list-nav")

      .addClass("hidden-modal");

    // $(".dot").removeClass("hidden-modal");
  });

  // For comment modal

  $(".over_lay").addClass("hidden-modal");

  $(".row-4").on("click", function () {
    $(".over_lay").removeClass("hidden-modal");
  });

  $(".post-close").on("click", function () {
    $(".over_lay").addClass("hidden-modal");
  });

  $("#commentModal").on("click", function (event) {
    if ($(event.target).is("#commentModal")) {
      $("#commentModal").addClass("hidden-modal");
    }
  });

  $(".content-see-more").click(function () {
    var content = $(this).next(".see-more-content");
    var rightIcon = $(this).find(".fa-chevron-right");
    var downIcon = $(this).find(".fa-chevron-down");

    content.slideToggle(function () {
      rightIcon.toggleClass("hidden-seemore", content.is(":visible"));
      downIcon.toggleClass("hidden-seemore", !content.is(":visible"));
    });
  });
});

///////////////////////////////////////////////
////////// HomePage Task Music Playing  /////////
///////////////////////////////////////////////

$(document).ready(function () {
  let audio;
  let playing = false;

  $(".play_popular_music_button").click(function (e) {
    const $closest = $(this).closest(".play_popular_music_button");
    const $playBtn = $closest.find(".fa-play");
    const $pauseBtn = $closest.find(".fa-pause");

    if (audio) {
      if (!playing) {
        audio.play();
        playing = true;
        $playBtn.addClass("hidden-modal");
        $pauseBtn.removeClass("hidden-modal");
      } else {
        playing = false;
        audio.pause();
        $playBtn.removeClass("hidden-modal");
        $pauseBtn.addClass("hidden-modal");
      }
    } else {
      audio = new Audio("./music/Salam-Alaikum.mp3");
      playing = true;
      audio.play();
      $playBtn.addClass("hidden-modal");
      $pauseBtn.removeClass("hidden-modal");
    }
  });

  // ////////////////// For the slider image ///////////
  $(".popup-overlay").addClass("hidden-modal");

  $(".avatar-item").on("click", function () {
    $(".popup-overlay").removeClass("hidden-modal");
    console.log("clicked");
  });

  $("#secondModal").on("click", function (event) {
    if ($(event.target).is("#secondModal")) {
      $("#secondModal").addClass("hidden-modal");
    }
  });
  // Modal for marketings
  const HIDDEN = "marketing-hidden";

  // Close Overlay
  $(".overlay").on("click", function (e) {
    if ($(e.target).hasClass("overlay")) {
      $(this).addClass(HIDDEN);
    }
  });

  // Show
  $(".task_option_share").on("click", function () {
    $(".share_modal").removeClass(HIDDEN);
  });

  // Hide
  $(".share_modal--main .share_modal--heading button").on(
    "click",
    function (e) {
      $(e.target).closest(".overlay").addClass(HIDDEN);
    }
  );

  // Copy (Clipboard)
  const shareURL = $(".share_modal--main .clipboard p").text();
  $(".share_modal--main .clipboard button").on("click", function () {
    navigator.clipboard.writeText(shareURL).then(() => {
      $(".copy").addClass(HIDDEN);
      $(".copied").removeClass(HIDDEN);

      setTimeout(() => {
        $(".copy").removeClass(HIDDEN);
        $(".copied").addClass(HIDDEN);
      }, 3000);
    });
  });

  $(".res-header").on("click", function () {
    $(".share_modal , .follow-overlay").addClass(HIDDEN);
  });

  // Follower / Following
  $(".share_modal-grid .share_follower--tab").on("click", function () {
    $(".follow-overlay").removeClass(HIDDEN);
    $(".share_modal").addClass(HIDDEN);
  });

  $(".share_modal-grid .share_following--tab").on("click", function () {
    $(".follow-overlay").removeClass(HIDDEN);
    $(".share_modal").addClass(HIDDEN);
  });

  // Tab
  $(".follow_modal_header_switch_button button:first-child").on(
    "click",
    function () {
      followTabHandler.call(this, "remove", "add");
    }
  );

  $(".follow_modal_header_switch_button button:last-child").on(
    "click",
    function () {
      followTabHandler.call(this, "add", "remove");
    }
  );

  function followTabHandler(tab1, tab2) {
    $(".follow_modal_header_switch_button button").removeClass("active");
    $(this).addClass("active");

    $(".follow_users .followings").toggleClass(HIDDEN, tab1 === "add");
    $(".follow_users .followers").toggleClass(HIDDEN, tab2 === "add");
  }

  // Follow Row Buttons
  $(".follow_modal_row button").on("click", function () {
    $(this).toggleClass("active");
  });

  // Hide Follow Modal
  $(".modal_footer button:first-child").on("click", function () {
    $(".follow-overlay").addClass(HIDDEN);
  });
});

// for no list

$(document).ready(function () {
  var currentListItem; // Variable to store the current list item to be deleted
  $("#No-list").addClass("hidden-modal");
  // Show the delete modal when the delete option is clicked
  $(".delete-list").on("click", function () {
    currentListItem = $(this).closest(".card-box"); // Store the current list item
    $("#deleteModal").removeClass("hidden-modal"); // Show the modal
  });

  // Close the modal when cancel is clicked
  $(".cancel-btn").on("click", function () {
    $("#deleteModal").addClass("hidden-modal");
  });

  // Delete the list item when the delete button is clicked
  $("#delete-it").on("click", function () {
    currentListItem.remove(); // Remove the current list item
    $("#deleteModal").addClass("hidden-modal"); // Hide the modal

    // Check if there are any list items left
    if ($("#work_list .card-box").length === 0) {
      $("#No-list").removeClass("hidden-modal"); // Show the "No List Created" message
    }
  });
});
