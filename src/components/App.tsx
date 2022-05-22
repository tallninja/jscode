import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from '../plugins/unpkg-path-plugin';

const App: React.FC = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');
	const serviceRef = useRef<any>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	useEffect(() => {
		textAreaRef?.current?.focus();
	}, []);

	const startService = async () => {
		serviceRef.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm',
		});
	};

	useEffect(() => {
		startService();
	}, []);

	const onSubmit = async () => {
		if (!serviceRef.current) return;
		const result = await serviceRef?.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin()],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});
		// console.log(result);
		setCode(result.outputFiles[0].text);
	};

	return (
		<>
			<h1>jscode</h1>
			<div>
				<textarea
					ref={textAreaRef}
					cols={50}
					rows={7}
					value={input}
					onChange={(e) => setInput(e.target.value)}
				></textarea>
				<br />
				<button onClick={onSubmit}>Submit</button>
				<pre>{code}</pre>
			</div>
		</>
	);
};

export default App;
