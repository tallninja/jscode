import React, { useEffect, useRef, useState } from 'react';
import bundler from '../bundler';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';

const App: React.FC = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const onSubmit = async () => {
		const output = await bundler(input);
		setCode(output);
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
