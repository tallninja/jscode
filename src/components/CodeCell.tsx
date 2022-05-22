import React, { useEffect, useState } from 'react';
import bundle from '../bundler';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import Resizable from './Resizable';

const CodeCell: React.FC = () => {
	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const onSubmit = async () => {
		const output = await bundle(input);
		setCode(output);
	};

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundle(input);
			setCode(output);
		}, 2000);

		return () => clearTimeout(timer);
	}, [input]);

	return (
		<Resizable direction='vertical'>
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue="console.log('Hello World!');"
						onChange={(value) => setInput(value)}
					/>
				</Resizable>
				<CodePreview code={code} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
