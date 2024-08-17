import { randomID, unit } from './utils';

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
