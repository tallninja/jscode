import MDEditor from '@uiw/react-md-editor';
import { useEffect, useState, useRef } from 'react';

const TextCell = () => {
	const [value, setValue] = useState('# Hello World!');
	const [editing, setEditing] = useState(false);
	const editorRef = useRef<HTMLDivElement>(null);

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
				<MDEditor value={value} onChange={(text) => setValue(text || '')} />
			</div>
		);
	}

	return (
		<div className='text-cell card' onClick={() => setEditing(true)}>
			<div className='card-content'>
				<MDEditor.Markdown source={value} />
			</div>
		</div>
	);
};

export default TextCell;
