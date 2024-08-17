import { getPPI, unit } from './utils';

const $pageWrapper = $('#workarea iframe');

$(document).on('change', '#workarea_scale', (e) => {
  const value = e.currentTarget.value;
  const scaleFactor = value / 100;
  const $output = $(e.currentTarget).next('output');
  $output.text(unit.percent(value));
  $pageWrapper.css('width', '');
  $pageWrapper.css('--scale-factor', scaleFactor);
  $pageWrapper.contents().find('html').css('--scale-factor', scaleFactor);
});

$(document).on('dblclick', '#workarea_scale~output', (e) => {
  $('#workarea_scale').val(100);
  $(e.currentTarget).text('100%');
  $pageWrapper.css('--scale-factor', 1);
});

function resizePageToScreen() {
  const $docs = $pageWrapper.contents().find('html');
  const frameWidth = $pageWrapper.width();
  const ppi = Number($pageWrapper.css('--device-ppi') ?? 0);
  const pageWidth = (210 * ppi) / 25.4;

  if ($(document).width() <= 768) {
    $pageWrapper.width(pageWidth);
    $pageWrapper.css('--scale-factor', 1);
    $docs.css('--scale-factor', 1);
    $docs.addClass('mobile_view');
    return;
  }

  const scaleFactor = frameWidth / pageWidth;
  if (scaleFactor <= 1) {
    $pageWrapper.css('--scale-factor', scaleFactor);
    $docs.css('--scale-factor', scaleFactor);
    $docs.removeClass('mobile_view');
  }
}

$(window).on('resize', () => resizePageToScreen());
$(() => resizePageToScreen());
$pageWrapper.on('load', () => {
  resizePageToScreen();
  const ppi = getPPI();
  $(document.body).css('--device-ppi', ppi);
});
