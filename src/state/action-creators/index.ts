import { ActionType } from '../action-types';
import {
	Action,
	DeleteCellAction,
	MoveCellAction,
	InsertCellBeforeAction,
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

export const insertCellBefore = (
	id: string,
	type: CellTypes
): InsertCellBeforeAction => {
	return { type: ActionType.INSERT_CELL_BEFORE, payload: { id, type } };
};

export const updateCell = (id: string, content: string): UpdateCellAction => {
	return { type: ActionType.UPDATE_CELL, payload: { id, content } };
};
