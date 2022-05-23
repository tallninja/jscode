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
					<AddCell nextCellId={cell.id} />
					<CellListItem cell={cell} />
				</React.Fragment>
		  ))
		: null;

	return (
		<div>
			{renderedCells}
			<AddCell nextCellId={null} forceVisible={cells?.length === 0} />
		</div>
	);
};

export default CellList;
