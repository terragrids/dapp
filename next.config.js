module.exports = {
    webpack: (config) => {
        config.module.rules.push({
            test: /\.svg$/i,
            use: ['@svgr/webpack']
        })
        return config
    },
    eslint: {
        dirs: ['pages', 'components', 'repository', 'hooks', 'errors', 'context', 'strings', 'utils', 'tests']
    }
}