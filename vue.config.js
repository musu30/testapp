module.exports = {
    chainWebpack: config => {
        config.performance
            .maxEntrypointSize(400000)
            .maxAssetSize(400000)
    }, devServer: {
        host: 'localhost',
        port: '3000'
    }
}