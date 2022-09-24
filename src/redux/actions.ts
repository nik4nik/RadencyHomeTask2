import { createAction } from '@reduxjs/toolkit'
import { Id, SubmitEdit, SubmitNote } from '../types'

export const
	addNote		= createAction<SubmitNote>	('note/ADD'),
	removeNote	= createAction<Id>			('note/REMOVE'),
	edit		= createAction<SubmitEdit>	('note/EDIT'),
	closeModal	= createAction<void>		('modal/CLOSE_MODAL'),
	openEdt		= createAction<any>			('modal/OPEN_EDT'),
	openAdd		= createAction<any>			('modal/OPEN_ADD'),
	archive		= createAction<Id>			('note/ARCHIVE'),
	unarchive	= createAction<Id>			('note/UNARCHIVE'),
	toggleShowArchived	= createAction<void>('page/TOGGLE_SHOW_ARCHIVED'),
	changeTableData		= createAction<any> ('table/CHANGE_TABLE_DATA')