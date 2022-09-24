import { configureStore, createReducer } from '@reduxjs/toolkit'
import * as actions from './actions'

const initialState = {
	notes: [
		{
			name: 'title1',
			text: 'Execute the task1 at 06/01/2022 to 06/02/2022 ipsum',
			time: '2022/02/03 16:21',
			category: 'Task',
			archived: false,
			id: "1",
		},
		{
			name: 'title2',
			text: 'Realize an idea1',
			time: '2022/02/03 12:33',
			category: 'Idea',
			archived: false,
			id: "2",
		},
		{
			name: 'title3',
			text: "It's random thought",
			time: '2022/02/02 11:33',
			category: 'Random Thought',
			archived: false,
			id: "3",
		},
		{
			name: 'title4',
			text: 'Realize an idea1',
			time: '2022/02/01 13:53',
			category: 'Idea',
			archived: false,
			id: "4",
		},
		{
			name: 'title5',
			text: 'Execute the task2',
			time: '2022/02/10 10:00',
			category: 'Task',
			archived: true,
			id: "5",
		}
	],
	tableData: [],
	modal: {
		text: '',
		category: '',
		edit: false,
		add: false,
		id: '',
	},
	showArchived: false,
}

const reducer = createReducer(initialState, (builder) =>
	builder
		.addCase(
			actions.removeNote, (state, action) => ({
				...state,
				notes: state.notes.filter((note: any) => note.id !== action.payload)
			})
	)
		.addCase(
			actions.closeModal, (state, action) => ({
				...state,
				modal: {text: '', category: '', edit: false, add:false, id: ''},
			})
	)
		.addCase(
			actions.openEdt, (state, action) => {
				const newModal = {
					name: state.notes.filter(note => note.id === action.payload)[0].name,
					text: state.notes.filter(note => note.id === action.payload)[0].text,
					category: state.notes.filter(note => note.id === action.payload)[0].category,
					edit: true,
					add: false,
					id: action.payload,
				}
				return {
					...state,
					modal: newModal,
				}
			}
	)
		.addCase(
			actions.openAdd, (state, action) => {
				const newModal = {
					name: '',
					text: '',
					category: '',
					edit: false,
					add: true,
					id: action.payload,
				}
				return {
					...state,
					modal: newModal,
				}
			}
	)
		.addCase(
			actions.edit, (state, action) => ({
				...state,
				notes: ~state.notes.findIndex((note) => note.id === action.payload.id)?
						state.notes.map((note) => (
						note.id === action.payload.id ?
						{
							...note,
							name: action.payload.name,
							text: action.payload.text,
							category: action.payload.category
						}:
						note
					)):
						[...state.notes,
						{
							name: action.payload.name,
							text: action.payload.text,
							category: action.payload.category,
							archived: false,
							time: (new Date().toLocaleString()).replaceAll('"', ''),
							id: action.payload.id.toString()
						}
						]
			})
	)
		.addCase(
			actions.archive, (state, action) => {
				const newNotes = state.notes.map((note) => {
					if (note.id === action.payload) {
					return {...note, archived: true};
					}
					return note
				})
				return {
					...state,
					notes: newNotes,
				}
			}
	)
		.addCase(
			actions.unarchive, (state, action) => {
			const newNotes = state.notes.map((note) => {
				if (note.id === action.payload) {
					return {...note, archived: false};
				}
				return note
			})
			return {
				...state,
				notes: newNotes,
			}
		}
	)
		.addCase(
			actions.toggleShowArchived, (state, action) => {
			return {
				...state,
				showArchived: !state.showArchived
			}
		}
	)
		.addCase(
			actions.changeTableData, (state, action) => {
				return {
					...state,
					tableData: action.payload
				}
		}
	)
)

const store = configureStore({
	reducer: reducer,
	devTools: process.env.NODE_ENV === "development",
})

export default store;

export type AppDispatch = typeof store.dispatch