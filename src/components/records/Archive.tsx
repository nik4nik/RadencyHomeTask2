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
		<div key={idx}
			className="mx-4 my-2"
			style={{ width: 18 + 'rem' }}
		>
			<td>{note.name}</td>
			<td>{note.time}</td>
			<td>{note.text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
			<td>{note.category}</td>
			<td><img className="pict" id={note.id} onClick={handleUnarchiveNote} src='./img/unarchive.svg' alt='Unarchive'/></td>
		</div>
	)
	return <>{recordsMarkup.length ? recordsMarkup : <Empty/> }</>
}

const mapStateToProps = (state: State) => ({
	notesArr: state.notes
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
	unarchiveNote: (id: string) => dispatch(actions.unarchive(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Records)