$(() => {
  const ppi = getPPI();
  $(document.body).css('--device-ppi', ppi);
});

//#region templates
/**
 * creates new element from post template
 * @param {PostTemplateArgs} param0
 *
 * @typedef PostTemplateArgs
 * @prop {string} title
 * @prop {string} price
 * @prop {string} image
 */
function clonePostTemplate({ title, price, image }) {
  if (!title || !price) {
    console.error('title and price are required');
    return;
  }

  const $clone = $('template#post_template').contents().clone();

  $clone.find('.template__header_price').text(price);
  $clone.find('.template__title > p').text(title);
  $clone.find('.template__image').attr('src', image);

  return $clone;
}

/**
 * create new element from checkout card template
 * @param {PostTemplateArgs} param0
 *
 * @typedef PostTemplateArgs
 * @prop {string} title
 * @prop {string} price
 * @prop {string} type
 * @prop {string} image
 */
function cloneCheckoutCard({ title, price, image, type }) {
  if (!title || !price) {
    console.error('title and price are required');
    return;
  }

  const $clone = $('template#checkout_card_template').contents().clone();

  $clone.find('.checkout_card__body_price').text(price);
  $clone.find('.checkout_card__body_title').text(title);
  $clone.find('.checkout_card__image small').text(type);
  $clone.find('.checkout_card__image img').attr('src', image);

  return $clone;
}

/**
 * creates new element from post template
 * @param {SocialPostArgs} param0
 *
 * @typedef SocialPostArgs
 * @prop {string} title
 * @prop {string} [permalink]
 * @prop {string} date
 * @prop {string} views
 * @prop {SocialPostAuthor} author
 * @prop {string} image
 *
 * @typedef SocialPostAuthor
 * @prop {string} name
 * @prop {string} avatar
 */
function cloneSocialPost({
  title,
  permalink = '#',
  date,
  image,
  views,
  author,
}) {
  if (!title || !author) {
    console.error('title and author are required');
    return;
  }

  const $clone = $('template#social_post').contents().clone();

  $clone.find('.social_post__author h5').text(author.name);
  $clone.find('.social_post__author img').attr('src', author.avatar);
  $clone.find('.social_post__title').text(title);
  $clone.find('.social_post__image').attr('src', image);
  $clone.find('a').attr('aria-label', title);
  $clone.find('a').attr('href', permalink);
  $clone.find('.social_post__date').text(date);
  $clone.find('.social_post__views').text(views);

  return $clone;
}
//#endregion

//#region dialog

// default modal action
$('.modal').on('show.bs.modal', (event) => {
  const $modal = $(event.target);
  const $button = $(event.relatedTarget);
  // use data-modal-size
  const size = $button.attr('data-modal-size');
  const sizeExtensions = ['sm', 'lg', 'xl'];
  if (size && [...sizeExtensions, 'base'].includes(size)) {
    const $dialog = $modal.find('.modal-dialog');
    sizeExtensions.forEach((s) => {
      $dialog.removeClass(`modal-${s}`);
    });
    if (size !== 'base') {
      $dialog.addClass(`modal-${size}`);
    }
  }
});

// import url modal dynamic params
$('#import_url_modal').on('show.bs.modal', (event) => {
  const $modal = $(event.target);
  const $button = $(event.relatedTarget);
  // use data-modal-label
  const label = $button.attr('data-modal-label');
  if (label) {
    $modal.find('.modal-body label>small')?.text(label);
  }
  // use data-modal-placeholder
  const placeholder = $button.attr('data-modal-placeholder');
  if (placeholder)
    $modal.find('.modal-body label>input')?.attr('placeholder', placeholder);
});

// import url modal dynamic params
$('#diagram_modal').on('show.bs.modal', (event) => {
  const $modal = $(event.target);
  const $button = $(event.relatedTarget);

  const title = $button.attr('data-modal-title');
  if (title) {
    $modal.find('.modal-header>h5')?.text(title);
  }
  const aspectRatio = $button.attr('data-modal-aspect-ratio') ?? '1/1';
  const cellWidth = $button.attr('data-modal-cell-width') ?? '38px';
  const $modalBody = $modal.find('.modal-body');
  $modalBody.css('--cell-width', cellWidth);
  $modalBody.css('--cell-aspect-ratio', aspectRatio);
  if ($button.attr('data-modal-label') === 'true') {
    $modalBody?.attr('data-has-label', '');
  } else {
    $modalBody?.removeAttr('data-has-label');
  }
});

// import url modal dynamic params
$('#confirmation_modal').on('show.bs.modal', (event) => {
  const $modal = $(event.target);
  const $button = $(event.relatedTarget);
  const message = $button.attr('data-modal-message');
  console.log(message);
  const $modalBody = $modal.find('.modal-body');
  if (message) {
    $modalBody.text(message);
  }
});

// checkout modal
$('#checkout_modal').on('show.bs.modal', (event) => {
  const $modal = $(event.target);

  const $container = $modal.find('.checkout_modal__body');
  $container.empty();

  for (let i = 0; i < 3; i++) {
    const $card = cloneCheckoutCard({
      title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit',
      price: '$10',
      image: randomImage(),
      type: i > 1 ? 'slide' : 'template',
    });
    $container.append($card);
  }
});

// find buy buttons and assign checkout modals
$('[data-role="checkout"]').each((_, el) => {
  $(el).attr('data-bs-toggle', 'modal');
  $(el).attr('data-bs-target', '#checkout_modal');
});

/** Toggles template modal */
function toggleTemplateModal({ title, search, size = 'normal' }) {
  const modal = new bootstrap.Modal($('#template_modal'));
  modal.toggle();
  const isActive = modal._isShown;
  const $modal = $(modal._element);
  // update title
  if (title) {
    $modal.find('h5.modal-title').text(title);
  }
  // search input placeholder
  if (search) {
    const $search = $modal.find(".modal-body input[type='search']");
    $search.attr('placeholder', search);
  }
  // clear out container
  const $container = $modal.find('.template_modal__contents');
  $container.attr('data-size', size);
  $container.empty();
  return { $modal, $container, isActive };
}

// handles on click event of TEMPLATES TAB
$(document).on('click', '#tab_template_toggle', () => {
  const { $modal, $container, isActive } = toggleTemplateModal({
    title: 'Templates',
    search: 'Search Templates',
  });
  if (isActive) {
    for (let index = 0; index < 5; index++) {
      const $post = clonePostTemplate({
        title: 'Lorem ipsum dolor sit amet consectetu',
        price: '$10',
        image: randomImage(),
      });
      $container.append($post);
    }
  }
});

// handles on click event of SLIDES TAB
$(document).on('click', '#tab_slide_toggle', () => {
  const { $modal, $container, isActive } = toggleTemplateModal({
    title: 'Slides',
    search: 'Search slides',
    size: 'large',
  });
  if (isActive) {
    for (let index = 0; index < 5; index++) {
      const $post = clonePostTemplate({
        title: 'Lorem ipsum dolor sit amet consectetu',
        price: '$10',
        image: randomImage(),
      });
      $container.append($post);
    }
  }
});

//#endregion

//#region dropdown
$(document).on('click', '[data-action=print]', () => {
  window.print();
});

// Insert Table Dropdown
(() => {
  const $el = $('.insert_table_dropdown');
  const cols = parseInt($el.attr('data-cols') ?? '12');
  const rows = parseInt($el.attr('data-rows') ?? '12');

  $el.css('--cols', cols);
  $el.css('--rows', rows);

  $el.find('.selection')?.on('mousemove', (event) => {
    const $target = $(event.currentTarget);
    // get dimension of each cell
    let cellWidth = $target.width() / cols;
    let cellHeight = $target.height() / rows;
    // get mouse position relative to the container
    let offsetX = event.pageX - $target.offset().left;
    let offsetY = event.pageY - $target.offset().top;
    // convert mouse position to percent
    let percentX = (offsetX / $target.width()) * 100;
    let percentY = (offsetY / $target.height()) * 100;
    // cet selected column and row
    const selected = {
      col: wrap(Math.ceil((percentX / cellWidth) * 2), 1, cols),
      row: wrap(Math.ceil((percentY / cellHeight) * 2), 1, rows),
    };
    // set selected column and row as data value
    $el.css('--selected-col', selected.col);
    $el.css('--selected-row', selected.row);
    $el.attr('data-selected-col', selected.col);
    $el.attr('data-selected-row', selected.row);
  });
})();

//#endregion

//#region ribbon

$(document).on('mouseenter', '[data-tooltip]', (event) => {
  const $el = $(event.currentTarget);
  const text = $el.attr('data-tooltip');

  const tooltipId = randomID(12, 'tooltip-');
  $el.attr('aria-labelledby', `#${tooltipId}`);
  const $tooltip = $(`<div class='tooltip' role='tooltip'/>`);
  $tooltip.attr('id', tooltipId);
  $tooltip.text(text);
  $tooltip.appendTo('body');

  Popper.createPopper($el.get(0), $tooltip.get(0), {
    placement: 'bottom',
    strategy: 'fixed',
    modifiers: [{ name: 'offset', options: { offset: [0, 3] } }],
  });
});

$(document).on('mouseleave', '[data-tooltip][aria-labelledby]', (event) => {
  const $el = $(event.currentTarget);
  const targetId = $el.attr('aria-labelledby');
  if (!targetId) return;
  const $target = $(targetId);
  $target.remove();
  // $el.removeAttr('aria-labelledby');
});

//#endregion

//#region sidebar

const $sidebar = $('#post_sidebar');

$(document).on('click', '#sidebar_toggle', (e) => {
  const isVisible = $sidebar.attr('aria-expanded') === 'true';
  $sidebar.attr('aria-expanded', !isVisible);
  calcRibbonWidth();
});

function calcRibbonWidth() {
  const $ribbonTemplates = $('.ribbon_templates');
  const $ribbonCarousel = $('.ribbon_carousel');
  let maxWidth = $ribbonCarousel.width();
  let width = 148; // minnimum width
  $ribbonCarousel.find('.ribbon_content__wrapper').each((_, el) => {
    el && (width += $(el).outerWidth());
  });
  // const MIN_WIDTH = 1234;
  if (width < maxWidth) {
    $ribbonTemplates.attr('aria-expanded', 'true');
  } else {
    $ribbonTemplates.attr('aria-expanded', 'false');
  }
}

// recalculate visibility on window resize
$(window).on('resize', (e) => {
  calcRibbonWidth();
});
// recalculate visibility on window load
$(() => calcRibbonWidth());

for (let i = 0; i < 2; i++) {
  const $clone = cloneSocialPost({
    permalink: '/#custom-post',
    image: randomImage(),
    author: {
      avatar: randomImage({ size: '48x48' }),
      name: 'Atque vel eveniet',
    },
    title: 'Corrupti voluptatem dolorum earum tempora',
    date: '6 days ago',
    views: '84 views',
  });
  $sidebar.append($clone);
}

//#endregion
