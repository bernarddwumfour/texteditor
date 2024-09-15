/**
 * generates random images from unsplash
 * @param {Record<string,string>} param0
 */
export function randomImage({ size, ...params } = {}) {
  const random = Math.floor(Math.random() * 1000) + 1;
  const baseURL = new URL('https://picsum.photos/500x500');
  // const baseURL = new URL('https://https://api.unsplash.com/photos');

  if (size) {
    baseURL.pathname = `/${size}/`;
  }
  const searchParams = baseURL.searchParams;
  searchParams.append(random, '');
  searchParams;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, value === true ? '' : value);
    });
  }
  return baseURL.toString();
}

export const unit = {
  mm: (val = 0) => {
    if (typeof val === 'string') {
      val = parseInt(val);
    }
    const result = val + 'mm';
    console.log(window.devicePixelRatio);
    const toPixels = () => (window.devicePixelRatio * val * 96) / 25.4;
    return Object.assign(result, { toPixels });
  },
  px: (val = 0) => val + 'px',
  pt: (val = 0) => val + 'pt',
  inch: (val = 0) => val + 'inch',
  percent: (val = 0) => val + '%',
};

/** calculates the device pixel per inch */
export function getPPI() {
  const $div = $(`<div />`).css('width', '1in').appendTo(document.body);
  const ppi = $div.width();
  $div.remove();
  return ppi;
}

/** wrap the value in min-max boundary */
export function wrap(val, min, max) {
  return val < min ? min : val > max ? max : val;
}

/**
 * generates a random id with specified length
 * @param {number} length
 * @param {string} prefix
 * @returns
 */
export function randomID(length = 6, prefix = '') {
  let result = '';
  const characters = '0123456789ABCDEF';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return prefix + result;
}
