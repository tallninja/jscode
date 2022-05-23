import React from 'react';
import CodeCell from './CodeCell';
import TextCell from './TextCell';
import CellList from './CellList';

const App: React.FC = () => {
	return (
		<>
			<div className='title-bar'>
				<h1 className='title is-2'>
					<span className='icon'>
						<i className='fa-solid fa-angle-left'></i>
					</span>
					<i className='fa-brands fa-js' style={{ color: '#FFDF00' }}></i>code
					<span className='icon'>
						<i className='fa-solid fa-angle-right'></i>
					</span>
				</h1>
			</div>
			<div>
				<CellList />
			</div>
		</>
	);
};

export default App;
