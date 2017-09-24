// constants
export const dateFormat = 'YYYY-MM-DD HH:mm:ss';

// flickr constants
export const userUrl = 'https://www.flickr.com/photos/';

export const sortSearch = [
  'relevance',
  'date-posted-desc',
  'date-posted-asc',
  'date-taken-desc',
  'date-taken-asc',
  'interestingness-desc',
  'interestingness-asc',
];

export const sortPopular = [
  'views',
  'interesting',
  'faves',
  'comments',
];

// flickr.api
export const apiEndpoint = 'https://flickr.azurewebsites.net/api/HttpTriggerJS1?code=dmd737ng/My0nxYL/LJ0MulQa9ewZrUjex/eF/SqM686SRyudGH4Rw==';

const commonParams = {
  format: 'json',
  nojsoncallback: 1,
  per_page: 25,
  extras: 'path_alias,views,owner_name,date_upload,date_taken,last_update,url_s,url_l,url_o',
};

export const searchParams = {
  ...commonParams,
  method: 'flickr.photos.search',
  sort: 'date-posted-desc',
  text: '',
};

export const popularParams = {
  ...commonParams,
  method: 'flickr.photos.getPopular',
  sort: 'interesting',
  user_id: '',
};