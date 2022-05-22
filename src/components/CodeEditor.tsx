import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
	initialValue: string;
	onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ initialValue, onChange }) => {
	const editorRef = useRef<any>();

	const onEditorDidMount: EditorDidMount = (getValue: () => string, editor) => {
		editorRef.current = editor;
		editor.onDidChangeModelContent(() => {
			onChange(getValue());
		});
	};

	const formatCode = () => {
		// get the current value from the editor
		const unformattedText = editorRef.current.getModel().getValue();
		// format the value
		const formatedText = prettier.format(unformattedText, {
			parser: 'babel',
			plugins: [parser],
			useTabs: false,
			semi: true, // add semi colons,
			singleQuote: true, // use single quotes
		});
		// set the formatted value back to the editor
		editorRef.current.setValue(formatedText);
	};

	return (
		<div className='editor-wrapper'>
			<button
				className='button button-format is-info is-small'
				onClick={formatCode}
			>
				Format
			</button>
			<MonacoEditor
				editorDidMount={onEditorDidMount}
				value={initialValue}
				theme='dark'
				language='javascript'
				height='500px'
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 18,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
