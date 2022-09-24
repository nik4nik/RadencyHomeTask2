import { ChangeEventHandler } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { AppDispatch } from '../../redux/store'

interface Props {
	showArchived: ChangeEventHandler<HTMLInputElement>
}

const Switch = ({ showArchived }: Props) => (
	<div className="form-check form-switch">
		<input
			className="form-check-input align-middle check-archived-switch"
			type="checkbox"
			role="switch"
			id="flexSwitchCheckDefault"
			onChange={showArchived}
		/>
	</div>
),

mapDispatchToProps = (dispatch: AppDispatch) =>
	({ showArchived: () => dispatch(actions.toggleShowArchived()), })

export default connect(null, mapDispatchToProps)(Switch)