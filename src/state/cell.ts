export type CellTypes = 'code' | 'text';

export type MoveCellDirection = 'up' | 'down';

export interface Cell {
	id: string;
	type: CellTypes;
	content: string;
}
