$(document).ready(function () {
  $(".app_notification_footer").on("click", function () {
    window.location.href = "notification.html";
  });
  $("#explore").on("click", function () {
    window.location.href = "notification.html";
  });
  // $("#noti-header").on("click", function () {
  //   window.location.href = "no_list_page.html";
  // });

  //   header modal
  $("#header_modal_list").addClass("hide-list");

  $("#show_header_modal").on("click", function () {
    $("#header_modal_list").removeClass("hide-list");
    console.log("clikkked");
  });

  $(" #Switch-modal").addClass("hide-list");

  $(".switch-account").on("click", function () {
    $("#Switch-modal").removeClass("hide-list");
    $("#header_modal_list").addClass("hide-list");
  });
  $(" #Add-account-modal ").addClass("hide-list");

  $(".add-account").on("click", function () {
    $("#Add-account-modal").removeClass("hide-list");
    // $(".header_modal_content").addClass("hide-list");
  });
  $(".header_modal").click(function (e) {
    if (!$(e.target).hasClass("header_modal")) return;
    $(".header_modal").addClass("hide-list");
  });

  $(".close-switch").on("click", function () {
    $(".header_modal").addClass("hide-list");
    $("#Add-account-modal").addClass("hide-list");
    console.log("clicked");
  });

  $("#mobile_header_modal").on("click", function () {
    $("#header_modal_list").removeClass("hide-list");
  });

  // Modal for Advertisment
  $("#ad-modal").addClass("hidden-modal");

  $(".Ad").on("click", function () {
    $("#ad-modal").removeClass("hidden-modal");
    console.log("clicked");
  });

  $("#Seeing").addClass("hidden-modal");

  $(".Why").on("click", function () {
    $("#Seeing").removeClass("hidden-modal");
  });

  $(".close-ad").on("click", function () {
    $(".modal").addClass("hidden-modal");
  });

  $(".ad-yes").on("click", function () {
    $(".modal").addClass("hidden-modal");
  });

  $(".ad-no").on("click", function () {
    $(".modal").addClass("hidden-modal");
  });

  $("#hide-report-modal").addClass("hidden-modal");

  $(".Hide").on("click", function () {
    $("#hide-report-modal").removeClass("hidden-modal");
  });

  $("#Report").addClass("hidden-modal");

  $(".report-ad").on("click", function () {
    $("#Report").removeClass("hidden-modal");
  });

  let currentSection = "all"; // Default section is "all"

  // Show all lists when 'All' is clicked
  $(".all").on("click", function () {
    $(".notifiy-list, .notification-request-list").removeClass("hide-list");
    $("#No-list").remove(); // Remove No-list from both sections
    $(".notification").removeClass("checked");
    $(".all").addClass("checked");
    $(".requests").removeClass("checked");
    currentSection = "all"; // Update current section
  });

  // Show only the notify-list when 'Notification' is clicked
  $(".notification").on("click", function () {
    $(".notifiy-list").removeClass("hide-list");
    $(".notification-request-list").addClass("hide-list");
    $("#No-list").remove(); // Remove No-list from both sections
    $(".notification").addClass("checked");
    $(".all").removeClass("checked");
    $(".requests").removeClass("checked");
    currentSection = "notification"; // Update current section
  });

  // Show only the notification-request-list when 'Request' is clicked
  $(".requests").on("click", function () {
    $(".notifiy-list").addClass("hide-list");
    $(".notification-request-list").removeClass("hide-list");
    $(".notification").removeClass("checked");

    $(".requests").addClass("checked");

    $(".all").removeClass("checked");
    // Check if all request lists are deleted
    if ($(".notification-request-list .list").length === 0) {
      if (!$("#No-list").length) {
        $("#request-section").append(`
          <div id="No-list" class="-mx-6 px-6">
            <div class="no-scrollbar nolist_main pb-4">
              <div class="create-list">
                <div class="page-element">
                  <div class="element-header">
                    <img src="./icons/notification_icons/no-list.svg" />
                    <span>No Notification Request</span>
                    <p>
                      You haven't created any list yet. Organize your items,
                      tasks or posts by creating your first list.
                    </p>
                  </div>
                  <button>
                    <div>Notifications</div>
                    <img src="./icons/notification_icons/Arrow_right.svg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        `);
      }
    }

    currentSection = "request"; // Update current section
  });

  // Delete request list independently
  $(document).on("click", ".cancel-req", function () {
    $(this).closest(".list").remove();

    // Check if all request lists are deleted
    if ($(".notification-request-list .list").length === 0) {
      // Ensure no "No-list" message is rendered in the all section
      if (currentSection === "request") {
        $("#request-section").append(`
          <div id="No-list" class="-mx-6 px-6">
            <div class="no-scrollbar nolist_main pb-4">
              <div class="create-list">
                <div class="page-element">
                  <div class="element-header">
                    <img src="./icons/notification_icons/no-list.svg" />
                    <span>No Notification Request</span>
                    <p>
                      You haven't created any list yet. Organize your items,
                      tasks or posts by creating your first list.
                    </p>
                  </div>
                  <button>
                    <div>Notifications</div>
                    <img src="./icons/notification_icons/Arrow_right.svg" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        `);
      }
    }
  });
});
