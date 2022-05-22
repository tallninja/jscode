import React, { useState } from 'react';
import CodeCell from './CodeCell';

const App: React.FC = () => {
	return (
		<div>
			<CodeCell />
			<CodeCell />
		</div>
	);
};

export default App;
