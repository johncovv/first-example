const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');
const { dependencies } = require('./package.json');

module.exports = {
	entry: './src/index',
	mode: 'development',
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		port: 3001,
	},
	output: {
		publicPath: 'http://localhost:3001/',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: ['@babel/preset-react'],
				},
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'chat',
			library: { type: 'var', name: 'chat' },
			filename: 'remoteEntry.js',
			exposes: {
				'./Button': './src/Button',
			},
			shared: {
				react: {
					requiredVersion: dependencies['react'],
					singleton: true,
				},
				'react-dom': {
					requiredVersion: dependencies['react-dom'],
					singleton: true,
				},
			},
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};
