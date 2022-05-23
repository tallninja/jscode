import { useActionCreator } from '../hooks/useActionCreator';
import { deleteCell } from '../state/action-creators';

interface ActionBarProps {
	id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
	const { moveCell, deleteCell } = useActionCreator();

	return (
		<div className='action-bar'>
			<button
				className='button is-primary is-small action-bar-button'
				onClick={() => moveCell(id, 'up')}
			>
				<span className='icon'>
					<i className='fas fa-arrow-up'></i>
				</span>
			</button>
			<button
				className='button is-primary is-small action-bar-button'
				onClick={() => moveCell(id, 'down')}
			>
				<span className='icon'>
					<i className='fas fa-arrow-down'></i>
				</span>
			</button>
			<button
				className='button is-primary is-small action-bar-button'
				onClick={() => deleteCell(id)}
			>
				<span className='icon'>
					<i className='fas fa-times'></i>
				</span>
			</button>
		</div>
	);
};

export default ActionBar;
