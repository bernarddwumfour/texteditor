import { unit, wrap } from './utils';
// Prevent closing from click inside dropdown

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
