import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const fileCache = localForage.createInstance({
	name: 'filecache',
});

export const fetchPlugin = (userInput: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			// load root entry file i.e index.js
			build.onLoad({ filter: /^index\.js/ }, (args: any) => {
				return {
					loader: 'jsx',
					contents: userInput,
				};
			});

			// implements caching logic if no cache proceeds to the other onLoad functions
			build.onLoad({ filter: /.*/ }, async (args: any) => {
				// check to see if file is in cache
				const chachedFile = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				);

				// if it is return the file from the cache
				if (chachedFile) {
					console.log('Fetched from cache!');
					return chachedFile;
				}
			});

			// load css
			build.onLoad({ filter: /.css&/ }, async (args: any) => {
				// if not fetch the file from unpkg and return it
				const { data, request } = await axios.get(args.path); // contains the responseURL where unpkg redirected us to

				const escapedCSS = data
					.replace(/\n/g, '')
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'");

				const contents = `
                    const style = document.createElement('style');
                    style.innerText = '${escapedCSS}';
                    document.head.appendChild(style);
                `;

				const fetchedFile: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: contents,
					resolveDir: new URL('./', request.responseURL).pathname,
				};

				// store the file in cache
				await fileCache.setItem(args.path, fetchedFile);

				return fetchedFile;
			});

			// load JS files
			build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
				// if not fetch the file from unpkg and return it
				const { data, request } = await axios.get(args.path); // contains the responseURL where unpkg redirected us to

				const fetchedFile: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};

				// store the file in cache
				await fileCache.setItem(args.path, fetchedFile);

				return fetchedFile;
			});
		},
	};
};
