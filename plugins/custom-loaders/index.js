export default function (context, options) {
    return {
        name: 'custom-loaders',
        configureWebpack(config, isServer) {
            return {
                node:{
                    __dirname: true
                },
                module: {
                    rules: [
                        {
                            test: /\bcanvas\.node\b/,
                            loader: "raw-loader",
                        },
                    ],
                },
                resolve: {
                    extensions: ['.node']
                }
            };
        },
    };
};