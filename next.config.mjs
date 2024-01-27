/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'fakestoreapi.com',
              port: '',
              pathname: '/img/**', // Adjust the pathname pattern as needed
            },
          ],
    },

};

export default nextConfig;
