import { cloneCheckoutCard, clonePostTemplate } from './_templates';
import { randomImage } from './utils';

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
