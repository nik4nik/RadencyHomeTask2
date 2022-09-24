import { MouseEventHandler } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { AppDispatch } from '../../redux/store'
import Switch from './Switch'

interface Props {
	openModal: () => void
}

const AddControl = ({ openModal }: Props) => {
	const handleOpenModal: MouseEventHandler<HTMLButtonElement> = () => {
		openModal()
	}
	return (
	<div id="container" className="d-flex align-items-center">
		<span className="p-3">Active</span>
		<Switch/>
		<span className="p-3">Archived</span>
		<button id="createNote" className="btn btn-primary" onClick={handleOpenModal}>Create Note</button>
	</div>
)},

mapDispatchToProps = (dispatch: AppDispatch) => ({
	openModal: () => dispatch(actions.openAdd(''))
})

export default connect(null, mapDispatchToProps)(AddControl)