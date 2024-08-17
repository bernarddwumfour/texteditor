/**
 * creates new element from post template
 * @param {PostTemplateArgs} param0
 *
 * @typedef PostTemplateArgs
 * @prop {string} title
 * @prop {string} price
 * @prop {string} image
 */
export function clonePostTemplate({ title, price, image }) {
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
export function cloneCheckoutCard({ title, price, image, type }) {
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
export function cloneSocialPost({
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
