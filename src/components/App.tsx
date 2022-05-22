import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin, fetchPlugin } from '../plugins';

import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';

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
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
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
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});
		setCode(result.outputFiles[0].text);
	};

	return (
		<>
			<h1>JScode</h1>
			<div>
				<CodeEditor
					initialValue="console.log('Hello World!');"
					onChange={(value) => setInput(value)}
				/>
				<br />
				<button onClick={onSubmit}>Submit</button>
				<CodePreview code={code} />
			</div>
		</>
	);
};

export default App;
