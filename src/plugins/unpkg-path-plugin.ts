import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				console.log('onResolve', args);
				if (args.path === 'index.js') {
					return { path: args.path, namespace: 'a' };
				}

				if (args.path.includes('./') || args.path.includes('../')) {
					return {
						path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`)
							.href, // add a / for URL to work correctly
						namespace: 'a',
					};
				}

				return {
					path: `https://unpkg.com/${args.path}`,
					namespace: 'a',
				};

				// else if (args.path === 'tiny-test-pkg') {
				// 	return {
				// 		path: 'https://unpkg.com/tiny-test-pkg@1.0.0/index.js',
				// 		namespace: 'a',
				// 	};
				// }
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				console.log('onLoad', args);
				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: `
                            import React from 'react';
                            console.log(React);
                        `,
					};
				}

				const { data, request } = await axios.get(args.path); // contains the responseURL where unpkg redirected us to
				return {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};
			});
		},
	};
};
