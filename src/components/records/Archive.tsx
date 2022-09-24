import { MouseEventHandler } from 'react'
import { connect } from 'react-redux'
import Empty from './Empty'
import { SubmitNote, State } from '../../types'
import { AppDispatch } from '../../redux/store'
import * as actions from '../../redux/actions'

interface Props {
	notesArr: SubmitNote[],
	unarchiveNote: (id: string) => void
}

function Records({ notesArr, unarchiveNote }: Props) {
	const handleUnarchiveNote: MouseEventHandler<HTMLImageElement> = e => {
		unarchiveNote((e.target! as HTMLImageElement).id)
	}
	const recordsMarkup = notesArr.filter(note => note.archived).map((note, idx) =>
		<tr key={idx}>
			<td width="10px"><img className='pict' src={'./img/' + note.category.replaceAll(' ', '') + '.svg'} alt=''/></td>
			<td>{note.name}</td>
			<td>{note.time}</td>
			<td>{note.category}</td>
			<td>{note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
			<td><img className="pict" id={note.id} onClick={handleUnarchiveNote} src='./img/unarchive.svg' alt='Unarchive'/></td>
		</tr>
	)

	return recordsMarkup.length ?
		<>
			<thead>
				<tr>
				{[
					'', 'Name',	'Created', 'Category', 'Content',
					<div id="thUnarchiv" className="pict"></div>
				].map((e, i) => <th key={i} className="th">{e}</th>)}
				</tr>
			</thead>
			<tbody id="archivedItems">
				{recordsMarkup}
			</tbody>
		</>: 
		<Empty/>
}

const mapStateToProps = (state: State) => ({
	notesArr: state.notes
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
	unarchiveNote: (id: string) => dispatch(actions.unarchive(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Records)