var CompressionPlugin = require('compression-webpack-plugin');

module.exports = function(config) {
    let loaderList = config.module.rules[1].oneOf;
    loaderList.splice(0, 1, {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
            'file-loader',
            {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 65
                    },
                    optipng: {
                        enabled: false,
                    },
                    pngquant: {
                        quality: '65-90',
                        speed: 4
                    },
                    gifsicle: {
                        interlaced: false,
                    },
                    webp: {
                        quality: 75
                    }
                }
            },
        ]
    });

    config.plugins.splice(-1, 0, new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        // test: /\.js$|\.css$/,
        test: /\.js$/,
        // deleteOriginalAssets: true,
        cache: true
    }));
}