import path from 'path';

const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: 'vspot-headless.local'
        }]
    },
    sassOptions: {
        includePaths: [path.join(process.cwd(), 'src')],
        prependData: `@import "theme-styles/_variables.scss";`
    },
    webpack(config) {
        config.resolve.alias['@'] = path.join(process.cwd(), 'src');
        return config;
    }
};

export default nextConfig;
