/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, //운영환경에서는 true로 바꾸기 : 개발환경에서 useEffect가 두번씩 실행되는 문제 때문에
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
      },
    ];
  },
  //trailingSlash: true,
};

export default nextConfig;
