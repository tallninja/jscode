import React, { useEffect, useRef, useState } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin, fetchPlugin } from '../plugins';

const App: React.FC = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');
	const serviceRef = useRef<any>(null);
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);

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
		// console.log(result);
		// setCode(result.outputFiles[0].text);
		iframeRef?.current?.contentWindow?.postMessage(
			result.outputFiles[0].text,
			'*'
		);
	};

	const html = `
		<html lang="en">
		<head></head>
		<body>
			<div id="root"></div>
		<script>
			window.addEventListener('message', (e) => {
				try {
				eval(e.data);
				} catch (err) {
					const root = document.querySelector("#root");
					root.innerHTML = '<div style="color: red;"><h4>Error:</h4>' + err + '</div>';
					console.error(err);
				}
			})
		</script>
		</body>
		</html>
	`;

	return (
		<>
			<h1>JScode</h1>
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
				<iframe
					ref={iframeRef}
					srcDoc={html}
					frameBorder='5'
					sandbox='allow-scripts'
					style={{ display: 'block' }}
				></iframe>
			</div>
		</>
	);
};

export default App;
