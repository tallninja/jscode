import React, { useEffect, useState } from 'react';
import bundle from '../bundler';
import { Cell } from '../state';
import CodeEditor from './CodeEditor';
import CodePreview from './CodePreview';
import Resizable from './Resizable';
import { useActionCreator } from '../hooks';

interface CodeCellProps {
	cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
	const [code, setCode] = useState<string | null>('');
	const [err, setErr] = useState<string | null>('');

	const { updateCell } = useActionCreator();

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundle(cell.content);
			setCode(output.code);
			setErr(output.err);
		}, 1000);

		return () => clearTimeout(timer);
	}, [cell.content]);

	return (
		<Resizable direction='vertical'>
			<div
				style={{
					height: 'calc(100% - 10px)',
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<Resizable direction='horizontal'>
					<CodeEditor
						initialValue={cell.content || 'show("Hello World!");'}
						onChange={(value) => updateCell(cell.id, value)}
					/>
				</Resizable>
				<CodePreview code={code} err={err} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
