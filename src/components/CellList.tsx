import { useTypedSelector } from '../hooks';
import CellListItem from './CellListItem';
import AddCell from './AddCell';
import React from 'react';

const CellList = () => {
	const cells = useTypedSelector(({ cells }) =>
		cells?.order.map((id, idx) => {
			return cells.data[id];
		})
	);

	const renderedCells = cells?.length
		? cells?.map((cell, idx) => (
				<React.Fragment key={idx}>
					<CellListItem cell={cell} />
					<AddCell previousCellId={cell.id} />
				</React.Fragment>
		  ))
		: null;

	return (
		<div>
			<AddCell previousCellId={null} forceVisible={cells?.length === 0} />
			{renderedCells}
		</div>
	);
};

export default CellList;
