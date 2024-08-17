import './_dropdown';
import './_templates';
import './_dialog';
import './_sidebar';
import './_ribbon';
import { getPPI } from './utils';

$(() => {
  const ppi = getPPI();
  $(document.body).css('--device-ppi', ppi);
});
