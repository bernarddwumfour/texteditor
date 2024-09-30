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

  const $mainContent = $(".content_area");
  if (isOpen) {
    $mainContent.css("grid-template-columns", "1fr 20fr");
  } else {
    if (window.innerWidth > 3000) {
      $mainContent.css("grid-template-columns", "1fr 7fr");
    } else {
      $mainContent.css("grid-template-columns", "1fr 4fr");
    }
  }
});

$(window).on("resize", () => {
  if (window.innerWidth > 768) {
    $(".popup").each((_, el) => {
      el.close();
    });
  }
});

$(document).ready(function () {
  $(function () {
    $("#my-file").on("click", function (event) {
      event.preventDefault();
      $("#sub-dropdown").toggle();

      if ($("#sub-dropdown").is(":visible")) {
        $("#fa-play").hide();
        $("#fa-caret-down").show();
      } else {
        $("#fa-play").show();
        $("#fa-caret-down").hide();
      }
    });
  });
});

$(document).ready(function () {
  $(function () {
    $("#file-mobile").on("click", function (event) {
      event.preventDefault();
      $("#sub-dropdown-mobile").toggle();
    });
    $("#sub-dropdown-mobile").on(
      "click",
      ".sidebar_nav__link",
      function (event) {
        event.stopPropagation();
      }
    );
  });
});

const data = [
  {
    name: "Finance.pdf",
    img: "/assets/files/docx1.png",
    date: "June, 20, 2023",
  },
  {
    name: "Study of rocks.pdf",
    img: "/assets/files/pdf1.png",
    date: "June, 20, 2023",
  },
  {
    name: "Sci-fi.pdf",
    img: "/assets/files/pdf1.png",
    date: "June, 20, 2023",
  },
  {
    name: "Machine learning.pdf",
    img: "/assets/files/docx1.png",
    date: "June, 20, 2023",
  },
  {
    name: "Artificial Intelligence.pdf",
    img: "/assets/files/docx1.png",
    date: "June, 20, 2023",
  },
  {
    name: "Robotic Fundamentals.docx",
    img: "/assets/files/pdf1.png",
    date: "June, 20, 2023",
  },
  {
    name: "Mathematics.pdf",
    img: "/assets/files/docx1.png",
    date: "June, 20, 2023",
  },
  {
    name: "Study of the Past.pdf",
    img: "/assets/files/pdf1.png",
    date: "June, 20, 2023",
  },
  {
    name: "Social Sciences.pdf",
    img: "/assets/files/pdf1.png",
    date: "June, 20, 2023",
  },
  {
    name: "Animal farm.pdf",
    img: "/assets/files/docx1.png",
    date: "June, 20, 2023",
  },
  {
    name: "The Art of War.pdf",
    img: "/assets/files/pdf1.png",
    date: "June, 20, 2023",
  },
  {
    name: "Mathematics.pdf",
    img: "/assets/files/docx1.png",
    date: "June, 20, 2023",
  },
];

$(document).ready(function () {
  const $fileContainer = $("#file-container");
  const $compactList = $("#compact-list");
  const $heading = $("#heading");

  function hideAllContainers() {
    $fileContainer.hide();
    $compactList.hide();
    $heading.hide();
  }

  function showFileContainer() {
    hideAllContainers();
    $fileContainer.show();
  }

  function showCompactList() {
    hideAllContainers();
    $compactList.show();
    $heading.show();
  }

  showFileContainer();

  $("#toggleButtonGrid").on("click", function () {
    showFileContainer();
    $("#toggleButtonGrid i").attr("data-active", "");
    $("#toggleButtonList i").removeAttr("data-active");
  });

  $("#toggleButtonList").on("click", function () {
    showCompactList();
    $("#toggleButtonGrid i").removeAttr("data-active");
    $("#toggleButtonList i").attr("data-active", "");
  });

  function createFileCard(element, index, isCompact) {
    const fileCardHTML = isCompact
      ? `<div class="quick-access-card-compact">
          <div class="icons-compact">
            <i class="fa fa-ellipsis-v share" id="ellipsis-${
              index + 10
            }" aria-hidden="true"></i>
            <img class="icon-file-compact" src="${element.img}" alt="${
          element.name
        }" />
            <h4 class="icons-compact-h4">${element.name}</h4>
          </div>
          <div class="text-container-compact">
            <div class="card-text-compact">
              <h4>${element.name}</h4>
              <p>${element.date}</p>
            </div>
            <span class="toggle-action-card" id="first-action">...</span>
          </div>
          <div class="action-card">
            <div class='action-card-box'>
              <button class='close-button'>
                <i class="fa-solid fa-xmark"></i>
              </button>
              <div class='action-card-content'>
                <div class="share-link">
                  <i class="fa fa-external-link"></i>
                  <span>Open</span>
                </div>
                <div class="share-link share-modal" id="share-card">
                  <i class="fa fa-share"></i>
                  <span>Share</span>
                </div>
                <div class="share-link share-delete-modal" id="openDelete-${
                  index + 10
                }">
                  <i class="fa fa-trash"></i>
                  <span>Delete</span>
                </div>
              </div>
            </div>
         
          </div>
          <div class="start-date">
            <p>${element.date}</p>
          </div>
          <div class="end-date">
            <p>${element.date}</p>
          </div>
          <div class="share-card-list" id="share-card-list-${index + 10}">
            <div class="share-link">
              <i class="fa fa-external-link"></i>
              <span>Open</span>
            </div>
            <div class="share-link share-modal" id="share-card">
              <i class="fa fa-share"></i>
              <span>Share</span>
            </div>
            <div class="share-link share-delete-modal" id="openDelete-${
              index + 10
            }">
              <i class="fa fa-trash"></i>
              <span>Delete</span>
            </div>
          </div>
        </div>`
      : `<div class="file-card">
          <i class="fa fa-ellipsis-v elipsis" id="ellipsis-${index}" aria-hidden="true"></i>
          <img src="${element.img}" alt="${element.name}">
          <div class="file-text">
            <p>${element.name.substring(0, 11) + "..."}</p> 
            <p>${element.date}</p>  
          </div>
          <div class="share-card-small" id="share-card-small-${index}">
            <div class='modal-box'>
              <button class='close-button'>
                <i class="fa-solid fa-xmark"></i>
              </button>
              <div class='share-card-small-content'>
                <div class="share-link">
                  <span class='share-icon'>
                    <i class="fa fa-external-link"></i>
                  </span>
                  
                  <span>Open</span>
                </div>
                <div class="share-link share-modal" id="share-card">
                  <span class='share-icon'>
                    <i class="fa fa-share"></i>
                  </span>
                  <span>Share</span>
                </div>
                <div class="share-link share-delete-modal" id="openDelete-${
                  index + 10
                }">
                  <span class='share-icon'>
                    <i class="fa fa-trash"></i>
                  </span>
                  <span>Delete</span>
                </div>
              </div>
            </div>

          </div>
        </div>`;

    return fileCardHTML;
  }

  data.forEach((element, index) => {
    $fileContainer.append(createFileCard(element, index, false));
    $compactList.append(createFileCard(element, index, true));
  });

  $("#quick-access-card-grid-button").on("click", function () {
    $("#quick-access-container").show();
    $("#quick-access-container-compact").hide();
    $(".heading").hide();
    $("#quick-access-card-grid-button i").attr("data-active", "");
    $("#quick-access-card-compact-button i").removeAttr("data-active");
  });

  $("#quick-access-card-compact-button").on("click", function () {
    $("#quick-access-container").hide();
    $("#quick-access-container-compact").show();
    $(".heading").show();
    $("#quick-access-card-grid-button i").removeAttr("data-active");
    $("#quick-access-card-compact-button i").attr("data-active", "");
  });
});

$(document).ready(function () {
  $(function () {
    $(document).on("click", ".toggle-action-card", function (event) {
      event.stopPropagation();

      const clickedIndex = $(this).index(".toggle-action-card");
      const targetedSpans = $(".action-card");

      if (targetedSpans.length > 0) {
        const targetedSpan = targetedSpans.eq(clickedIndex);
        targetedSpan.toggle();
      }
    });

    $(".close-button").click(function () {
      $(".action-card").hide();
    });

    $(document).on("click", function (event) {
      const targetedSpans = $(".action-card");

      if (targetedSpans.length > 0) {
        const isClickedInsideCard =
          $(event.target).closest(".action-card").length > 0;

        if (!isClickedInsideCard) {
          targetedSpans.hide();
        }
      }
    });
  });
});

$(document).ready(function () {
  $(function () {
    $("#header-menu").on("click", function (event) {
      event.preventDefault();
      $("#mobile-nav").toggle();
      if ($("#mobile-nav").is(":visible")) {
        $("#content_area").css("filter", "blur(5px)");
      } else {
        $("#content_area").css("filter", "none");
      }
    });
  });
});

$(document).ready(function () {
  $(function () {
    $("#sidebar_nav__mobile").on("click", function (event) {
      event.preventDefault();
      $("#mobile-nav").toggle();
      if ($("#mobile-nav").is(":visible")) {
        $("#content_area").css("filter", "blur(5px)");
      } else {
        $("#content_area").css("filter", "none");
      }
    });
  });
});

$(document).ready(function () {
  $(function () {
    function renderQuickAccessCards(data, containerId) {
      const $quickAccessContainer = $(`#${containerId}`);
      $quickAccessContainer.empty();

      for (let i = 0; i < 3 && i < data.length; i++) {
        const element = data[i];
        const cardHTML = `
        <div class="quick-access-card">
          <div class="icons">
            <img class="icon-file" src="${element.img}" alt="file-img" />
            <img class="group-icons" src="/assets/files/group-cons.png" alt="group-cons" />
          </div>
          <div class="text-container">
            <div class="card-text">
              <h4>${element.name}</h4>
              <p>${element.date}</p>
            </div>
            <span class="toggle-action-card" id="action-${i}">...</span>
          </div>
          <div class="action-card">
            <div class='action-card-box'>
              <button class='close-button'>
                <i class="fa-solid fa-xmark"></i>
              </button>
              <div class='action-card-content'>
                <div class="share-link">
                  <i class="fa fa-external-link" ></i>
                  <span>Open</span>
                </div>
                <div class="share-link" id="share-card">
                  <i class="fa fa-share"></i>
                  <span>Share</span>
                </div>
                <div class="share-link share-delete share-delete-modal" id="openDelete-${i}">
                  <i class="fa fa-trash"></i>
                  <span>Delete</span>
                </div>
            </div>
          </div>
            </div>
          </div>
        </div>
      `;

        $quickAccessContainer.append(cardHTML);
      }
    }

    function renderQuickAccessCardsCompact(data, containerId) {
      const $quickAccessContainerCompact = $(`#${containerId}`);
      $quickAccessContainerCompact.empty();

      for (let i = 0; i < 3 && i < data.length; i++) {
        const element = data[i];
        const cardHTML = `
        <div class="quick-access-card-compact">
          <div class="icons-compact">
          <i class="fa fa-ellipsis-v share" id=${`ellipsis-${i}`} aria-hidden="true"></i>

            <img class="icon-file-compact" src="${
              element.img
            }" alt="file-img" />
            <h4 class="icons-compact-h4">${element.name}</h4>
          </div>
          <div class="text-container-compact">
            <div class="card-text-compact">
              <h4>${element.name}</h4>
              <p>${element.date}</p>
            </div>
            <span class="toggle-action-card" id="action-${i}">...</span>
          </div>
          <div class="action-card-f" id='action-card-${i}'>
            <div class='action-card-box'>
              <button class='close-button'>
                <i class="fa-solid fa-xmark"></i>
              </button>
              <div class='action-card-content'>
                <div class="share-link">
                  <i class="fa fa-external-link" ></i>
                  <span>Open</span>
                </div>
                <div class="share-link" id="share-card">
                  <i class="fa fa-share"></i>
                  <span>Share</span>
                </div>
                <div class="share-link share-delete share-delete-modal" id="openDelete-${i}">
                  <i class="fa fa-trash"></i>
                  <span>Delete</span>
                </div>
              </div>
            </div>
          </div>
          <div class="start-date">
            <p>${element.date}</p>
          </div>
          <div class="end-date">
            <p>${element.date}</p>
          </div>

          <div class="share-card-list" id=${`share-card-list-${i}`}>
            <div class="share-link">
              <i class="fa fa-external-link" ></i>
              <span>Open</span>
            </div>
            <div class="share-link" id="share-card">
              <i class="fa fa-share"></i>
              <span>Share</span>
            </div>
            <div class="share-link share-delete" id="openDelete-${i}">
              <i class="fa fa-trash"></i>
              <span>Delete</span>
            </div>
          </div>
        </div>
      `;

        $quickAccessContainerCompact.append(cardHTML);

        $(`#ellipsis-${i}`).on("click", function () {
          $(`#action-card-${i}`).css("display", "flex");
        });

        $(`#close-button-${i}`).on("click", function () {
          $(`#action-card-${i}`).hide();
        });

        $(document).on("click", function (event) {
          if (!$(event.target).closest(".quick-access-card-compact").length) {
            $(".action-card-f").hide();
          }
        });
      }
    }

    renderQuickAccessCards(data, "quick-access-container");
    renderQuickAccessCardsCompact(data, "quick-access-container-compact");

    $(".close-button").click(function () {
      $(".action-card").hide();
    });

    $(window).click(function (event) {
      if ($(event.target).is(".action-card")) {
        $(".action-card").hide();
      }
    });

    $("#quick-access-container-compact").hide();
    $(".heading").hide();
  });
});

$(document).ready(function () {
  var currentPageUrl = window.location.href;

  var sidebarLinks = $(".sidebar_nav__link");

  sidebarLinks.each(function () {
    var linkUrl = $(this).attr("href");
    if (currentPageUrl.includes(linkUrl)) {
      $(this).attr("data-active", "");
    }
  });
});

$(document).ready(function () {
  $("#select-all").on("click", function () {
    var isChecked = $(this).prop("checked");

    $('.modal-content input[type="checkbox"]').prop("checked", isChecked);
  });
});

$(document).ready(function () {
  const profiles = [
    {
      name: "Wade Warren",
      img: "./assets/user4.png",
    },
    {
      name: "Jenny Wilson",
      img: "./assets/user5.png",
    },
    {
      name: "Cameron Williamson",
      img: "./assets/user3.png",
    },
    {
      name: "Esther Howard",
      img: "./assets/user2.png",
    },
  ];

  const followers = [
    {
      name: "Mwape John",
      img: "./assets/user1.png",
    },
    {
      name: "Dave Samuel",
      img: "./assets/user2.png",
    },
    {
      name: "Mercy Gabby",
      img: "./assets/user3.png",
    },
    {
      name: "Sharon Mathews",
      img: "./assets/user5.png",
    },
  ];

  function generateProfileCards(cardId, data) {
    const $card = $(`#${cardId}`);
    $card.empty();
    data.forEach((item) => {
      const cardHtml = `
        <li>
          <div class="profile-card">
            <div class="modal-profile">
              <img style="border-radius: 50%; height: 1.5rem; width: 1.5rem" loading="lazy" src="${item.img}" />
              <span>${item.name}</span>
            </div>
            <div>
              <input type="checkbox" />
            </div>
          </div>
        </li>
      `;
      $card.append(cardHtml);
    });
  }

  // Generate profile cards initially
  generateProfileCards("modal-profiles", profiles);

  // Handle click on "Following" button
  $('.menu-nav span:contains("Following")').on("click", function () {
    generateProfileCards("modal-profiles", profiles);
  });

  // Handle click on "Followers" button
  $('.menu-nav span:contains("Followers")').on("click", function () {
    generateProfileCards("modal-profiles", followers);
  });
});

$(document).ready(function () {
  $(".elipsis").on("click", function (e) {
    e.stopPropagation();
    const index = $(this).attr("id").split("-")[1];
    const shareCard = $(`#share-card-small-${index}`);
    if (shareCard.css("display") === "flex") {
      shareCard.css("display", "none");
    } else {
      shareCard.css("display", "flex");
    }
  });

  $(".close-button").click(function () {
    $(".share-card-small").css("display", "none");
  });

  $(window).click(function (event) {
    if ($(event.target).is(".share-card-small")) {
      $(".share-card-small").hide();
    }
  });

  $(document).on("click", function (e) {
    const shareCards = $(".share-card-small");
    if (!shareCards.is(e.target) && shareCards.has(e.target).length === 0) {
      shareCards.css("display", "none");
    }
  });
});

$(document).ready(function () {
  $(".share").on("click", function (e) {
    e.stopPropagation();
    const index = $(this).attr("id").split("-")[1];
    const shareCard = $(`#share-card-list-${index}`);
    if (shareCard.css("display") === "flex") {
      shareCard.css("display", "none");
    } else {
      shareCard.css("display", "flex");
      $(".share-card-small").css("display", "none");
    }
  });

  $(document).on("click", function (e) {
    const shareCards = $(".share-card-list");
    if (!shareCards.is(e.target) && shareCards.has(e.target).length === 0) {
      shareCards.css("display", "none");
    }
  });
});

$(document).ready(function () {
  const $modal = $("#modal");
  const $deleteModal = $("#deleteModal");
  const $overlay = $("<div class='overlay'></div>");

  function showModal() {
    $modal.show();
    $(".share-card-small").hide();
    $("body").append($overlay);
    $("body").addClass("body-no-scroll");
  }

  function hideModal() {
    $modal.hide();
    $overlay.remove();
    $("body").removeClass("body-no-scroll");
  }

  function showDeleteModal() {
    $deleteModal.show();
    $(".share-card-small").hide();

    $("body").append($overlay);
    $("body").addClass("body-no-scroll");
  }

  function hideDeleteModal() {
    $deleteModal.hide();
    $overlay.remove();
    $("body").removeClass("body-no-scroll");
  }

  $(document).on("click", "#share-card", function () {
    showModal();
  });

  $(document).on("click", ".share-modal", function () {
    showModal();
  });

  $(document).on("click", ".close-modal", function () {
    hideModal();
  });

  $(document).on("click", ".share-delete-modal", function () {
    showDeleteModal();
  });

  $(document).on("click", ".close-delete", function () {
    hideDeleteModal();
  });

  $(window).click(function (event) {
    if ($(event.target).is($modal)) {
      $modal.hide();
    }
  });

  $(window).click(function (event) {
    if ($(event.target).is($deleteModal)) {
      $deleteModal.hide();
    }
  });
});

$(document).ready(function () {
  $(".menu-nav span:first").addClass("clicked");

  $(".menu-nav span").on("click", function () {
    $(".menu-nav span").removeClass("clicked");
    $(this).addClass("clicked");
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
