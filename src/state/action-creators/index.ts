import { ActionType } from '../action-types';
import {
	DeleteCellAction,
	MoveCellAction,
	InsertCellAfterAction,
	UpdateCellAction,
} from '../actions';
import { CellTypes, MoveCellDirection } from '../cell';

export const deleteCell = (id: string): DeleteCellAction => {
	return { type: ActionType.DELETE_CELL, payload: { id } };
};

export const moveCell = (
	id: string,
	direction: MoveCellDirection
): MoveCellAction => {
	return { type: ActionType.MOVE_CELL, payload: { id, direction } };
};

export const insertCellAfter = (
	id: string | null,
	type: CellTypes
): InsertCellAfterAction => {
	return { type: ActionType.INSERT_CELL_AFTER, payload: { id, type } };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
	return { type: ActionType.UPDATE_CELL, payload: { id, content } };
};
