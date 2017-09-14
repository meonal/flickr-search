let Root: any;

if (process.env.NODE_ENV === 'production') {
  Root = require('./Root.prod').default;
} else {
  Root = require('./Root.dev').default;
}
export default Root;