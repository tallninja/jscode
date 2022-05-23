import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState, useRef } from 'react';
import { useActionCreator } from '../hooks';
import { Cell } from '../state';

interface TextCellProps {
	cell: Cell;
}

const TextCell: React.FC<TextCellProps> = ({ cell }) => {
	const [editing, setEditing] = useState(false);
	const editorRef = useRef<HTMLDivElement>(null);

	const { updateCell } = useActionCreator();

	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (
				editorRef.current &&
				event.target &&
				editorRef.current.contains(event.target as Node)
			) {
				return;
			}
			setEditing(false);
		};

		document.addEventListener('click', listener, { capture: true });

		return () => {
			document.removeEventListener('click', listener, { capture: true });
		};
	}, []);

	if (editing) {
		return (
			<div className='text-cell' ref={editorRef}>
				<MDEditor
					value={cell.content}
					onChange={(text) => updateCell(cell.id, text as string)}
				/>
			</div>
		);
	}

	return (
		<div className='text-cell card' onClick={() => setEditing(true)}>
			<div className='card-content'>
				<MDEditor.Markdown
					source={cell.content || '# Hello World!\nClick to Edit'}
				/>
			</div>
		</div>
	);
};

export default TextCell;
