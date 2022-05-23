import React from 'react';
import CodeCell from './CodeCell';
import TextCell from './TextCell';

const App: React.FC = () => {
	return (
		<>
			<h1>JScode</h1>
			<div>
				{/* <CodeCell /> */}
				<TextCell />
			</div>
		</>
	);
};

export default App;
