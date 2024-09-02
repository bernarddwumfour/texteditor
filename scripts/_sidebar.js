import { cloneSocialPost } from './_templates';
import { randomImage } from './utils';

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

for (let i = 0; i < 10; i++) {
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
