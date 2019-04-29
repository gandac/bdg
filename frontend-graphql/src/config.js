// graphql api url
let url = 'http://localhost:8080/graphql';

// If we're running on Docker, use the WordPress container hostname instead of localhost.
if (process.env.HOME === '/home/node') {
  url = 'http://wp-headless:8080/graphql';
}
console.log('node enviroment: ' , process.env.ENV);
if (process.env.NODE_ENV === 'production' || process.env.ENV === 'production' ) {
  url = 'http://http://37.251.146.230:8080/graphql';
}
const Config = {
  gqlUrl: url,
};

export default Config;
