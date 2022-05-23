import { ActionType } from '../action-types';
import { CellTypes, MoveCellDirection } from '../cell';

export interface DeleteCellAction {
	type: ActionType.DELETE_CELL;
	payload: {
		id: string;
	};
}

export interface MoveCellAction {
	type: ActionType.MOVE_CELL;
	payload: {
		id: string;
		direction: MoveCellDirection;
	};
}

export interface InsertCellAfterAction {
	type: ActionType.INSERT_CELL_AFTER;
	payload: {
		id: string | null;
		type: CellTypes;
	};
}

export interface UpdateCellAction {
	type: ActionType.UPDATE_CELL;
	payload: {
		id: string;
		content: string;
	};
}

export type Action =
	| DeleteCellAction
	| MoveCellAction
	| InsertCellAfterAction
	| UpdateCellAction;
