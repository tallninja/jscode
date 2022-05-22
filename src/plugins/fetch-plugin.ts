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
			build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
				console.log('onLoad', args);
				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: userInput,
					};
				}

				// chack to see if file is in cache
				const chachedFile = await fileCache.getItem<esbuild.OnLoadResult>(
					args.path
				);
				// if it is return the file from the cache
				if (chachedFile) {
					console.log('Fetched from cache!');
					return chachedFile;
				}
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
