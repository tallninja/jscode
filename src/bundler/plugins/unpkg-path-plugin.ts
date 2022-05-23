import esbuild from 'esbuild-wasm';

export const unpkgPathPlugin = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			// resolve root entry file i.e 'index.js'
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return { path: 'index.js', namespace: 'a' };
			});

			// resolve relative paths in a module i.e ./ or ../
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				return {
					path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href, // add a / for URL to work correctly
					namespace: 'a',
				};
			});

			// handle main file of a module
			build.onResolve({ filter: /.*/ }, async (args: esbuild.OnResolveArgs) => {
				return {
					path: `https://unpkg.com/${args.path}`,
					namespace: 'a',
				};
			});
		},
	};
};
