import React, { useState } from 'react';
import bundle from '../bundler';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';

const CodeCell: React.FC = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const onSubmit = async () => {
		const output = await bundle(input);
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

export default CodeCell;
