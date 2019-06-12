
const js = {
    test: /\.js$/,
    exclude: /node_modules/
};

const config = {
    entry: './src/index',
    output: { path: __dirname + '/dist', filename: 'index.js', libraryTarget: 'commonjs2' },
    module: { rules: [js] },
    stats: { children: false }
};

module.exports = [config];