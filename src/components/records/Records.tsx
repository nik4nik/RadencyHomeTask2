import { connect } from 'react-redux'
import * as actions from '../../redux/actions'

import Empty from './Empty'

import { SubmitNote, State } from '../../types'
import { MouseEventHandler } from 'react'
import { AppDispatch } from '../../redux/store'

interface Props {
	notesArr: SubmitNote[],
	removeNote:	(id: string) => void,
	archiveNote:(id: string) => void,
	openModal:	(id: string) => void,
}

function Records({ notesArr, removeNote, archiveNote, openModal }: Props) {
  const
	handleOpenModal: MouseEventHandler<HTMLImageElement> = e => {
		openModal((e.target! as HTMLImageElement).id)
	},

	handleArchiveNote: MouseEventHandler<HTMLImageElement> = e => {
		archiveNote((e.target! as HTMLImageElement).id)
	},

	handleRemoveNote: MouseEventHandler<HTMLImageElement> = e => {
		removeNote((e.target! as HTMLImageElement).id)
	},

	allActive = notesArr.filter(note => !note.archived),

	dates = allActive.map(note =>
		[...note.text.matchAll(/(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]\d{4}/g)]
			.map(match => match[0])
			.join(', ')
	),

	recordsMarkup = allActive.map((note, idx) =>
		<tr key={idx}>
			<td><img className='pict' src={'./img/' + note.category.replaceAll(' ', '') + '.svg'} alt=''/></td>
			<td>{note.name}</td>
			<td>{note.time}</td>
			<td>{note.category}</td>
			<td>{note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
			<td>{dates[idx].length > 0 ? dates[idx] : null}</td>
			<td><img className="pict" id={note.id} onClick={handleOpenModal}  src='./img/edit.svg'	alt='Edit'	 /></td>
			<td><img className="pict" id={note.id} onClick={handleArchiveNote}src='./img/archive.svg' alt='Archive'/></td>
			<td><img className="pict" id={note.id} onClick={handleRemoveNote} src='./img/trash.svg'	alt='Delete' /></td>
		</tr>
	)

	return recordsMarkup.length ?
		<>
		<thead>
			<tr>
			{[
				'',	'Name',	'Created', 'Category', 'Content', 'Dates', '',
				<div id="thArchiv" className="pict"></div>,
				<div id="thTrash" className="pict"></div>
			].map((e, i) => <th key={i} className="th">{e}</th>)}
			</tr>
		</thead>
		<tbody id="todoItems">
			{recordsMarkup}
		</tbody>
		</>:
		<Empty/>
}

const mapStateToProps = (state: State) => ({ notesArr: state.notes}),

	mapDispatchToProps = (dispatch: AppDispatch) => ({
		removeNote:	(id: string) => dispatch(actions.removeNote(id)),
		archiveNote:(id: string) => dispatch(actions.archive(id)),
		openModal:	(id: string) => dispatch(actions.openEdt(id))
	})

export default connect(mapStateToProps, mapDispatchToProps)(Records);