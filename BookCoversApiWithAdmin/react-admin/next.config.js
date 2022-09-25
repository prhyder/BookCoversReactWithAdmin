/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret: '92PXzBz0jk6iJs59g6DBMeW51PBFbXAmksUI5nVOx2ieKWnQlFnMyo48h4EGvFa',
    // secondSecret: process.env.SECOND_SECRET, // Pass through env variables 
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
     ? 'https://localhost:44306/api' //development api
     // ? 'https://localhost:5001/api' //development api
      : 'https://localhost:5001/api' //production api
  }
}