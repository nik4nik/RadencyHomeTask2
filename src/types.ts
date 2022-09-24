export type State = {
    notes: SubmitNote[],
    tableData: {[key: string]: {active: number, archived: number}}[],
    modal: ModalData,
    showArchived: boolean
}

export type ModalData = {
	name: string,
    text: string,
    category: string,
    edit: boolean,
	add: boolean,
    archived: boolean,
    time: string,
    id: string,
}

export type Id = number | string;

export type SubmitNote = {
	name: string;
    text: string;
    category: string;
    archived: boolean;
    time: string;
    id: string;
}

export type SubmitEdit = {
	name: string,
    text: string;
    category: string;
    archived: boolean,
    time: string,
    id: Id;
}