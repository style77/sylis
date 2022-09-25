/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
    // Looks like backward compatibility approach.
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
    };

    return config;
  },
  env: {
    apiKey: `${process.env.apiKey}`,
    authDomain: `${process.env.authDomain}`,
    projectId: `${process.env.projectId}`,
    storageBucket: `${process.env.storageBucket}`,
    messagingSenderId: `${process.env.messagingSenderId}`,
    appId: `${process.env.appId}`,
    measurementId: `${process.env.measurementId}`,

    type: `${process.env.type}`,
    project_id: `${process.env.project_id}`,
    private_key_id: `${process.env.private_key_id}`,
    private_key: process.env.private_key,
    client_email: `${process.env.client_email}`,
    client_id: `${process.env.client_id}`,
    auth_uri: `${process.env.auth_uri}`,
    token_uri: `${process.env.token_uri}`,
    auth_provider_x509_cert_url: `${process.env.auth_provider_x509_cert_url}`,
    client_x509_cert_url: `${process.env.client_x509_cert_url}`,

    storage_link: `${process.env.storage_link}`,
  }
}

module.exports = nextConfig
