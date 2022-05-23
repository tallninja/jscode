import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';
import produce from 'immer';

interface CellState {
	loading: boolean;
	error: string | null;
	order: string[];
	data: {
		[key: string]: Cell;
	};
}

const initialState: CellState = {
	loading: false,
	error: null,
	order: [],
	data: {},
};

const reducer = produce(
	(state: CellState = initialState, action: Action): CellState => {
		switch (action.type) {
			case ActionType.DELETE_CELL:
				delete state.data[action.payload.id];
				state.order = state.order.filter((id) => id != action.payload.id);
				return state;
			case ActionType.MOVE_CELL:
				const { direction } = action.payload;
				const index = state.order.findIndex((id) => id === action.payload.id);
				const targetIndex = direction === 'up' ? index - 1 : index + 1;
				if (targetIndex < 0 || targetIndex >= state.order.length) return state;
				state.order[index] = state.order[targetIndex];
				state.order[targetIndex] = action.payload.id;
				return state;
			case ActionType.INSERT_CELL_BEFORE:
				const cell: Cell = {
					id: generateId(),
					content: '',
					type: action.payload.type,
				};
				state.data[cell.id] = cell;
				const foundIndex = state.order.findIndex(
					(id) => id === action.payload.id
				);
				if (foundIndex < 0) state.order.push(cell.id);
				else state.order.splice(foundIndex, 0, cell.id);
				return state;
			case ActionType.UPDATE_CELL:
				const { id, content } = action.payload;
				state.data[id].content = content;
				return state;
			default:
				return state;
		}
	}
);

const generateId = () => {
	return Math.random().toString(36).substring(2, 5);
};

export default reducer;
