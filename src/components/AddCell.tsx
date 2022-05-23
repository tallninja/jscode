import { useActionCreator } from '../hooks';

interface AddCellProps {
	previousCellId: string | null;
	forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ previousCellId, forceVisible }) => {
	const { insertCellAfter } = useActionCreator();

	return (
		<div className={`add-cell ${forceVisible ? 'force-visible' : ''}`}>
			<div className='add-cell-buttons'>
				<button
					className='button is-rounded is-success is-small'
					onClick={() => insertCellAfter(previousCellId, 'code')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus'></i>
					</span>
					<span>Code</span>
				</button>
				<button
					className='button is-rounded is-success is-small'
					onClick={() => insertCellAfter(previousCellId, 'text')}
				>
					<span className='icon is-small'>
						<i className='fas fa-plus'></i>
					</span>
					<span>Text</span>
				</button>
			</div>
			<div className='divider'></div>
		</div>
	);
};

export default AddCell;
