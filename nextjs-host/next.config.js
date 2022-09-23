const NextFederationPlugin = require('@module-federation/nextjs-mf');
const { dependencies } = require('./package.json');

module.exports = {
	webpack(config, options) {
		if (!options.isServer) {
			config.plugins.push(
				new NextFederationPlugin({
					name: 'host',
					remotes: {
						chat: 'chat@http://localhost:3001/remoteEntry.js',
					},
				})
			);
		}

		return config;
	},
};
