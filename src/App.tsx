import { connect } from 'react-redux'
import './App.css'
import { State, ModalData } from './types'
import AddConrol from './components/forms/AddControl'
import Archive from './components/records/Archive'
import Records from './components/records/Records'
import Modal from './components/forms/Modal'
import Overall from './components/overall/Overall'

type Props = {
  modalData: ModalData,
  showArchived: boolean
}

function App({modalData, showArchived}: Props) {
  return (
    <div className="App my-3 px-5">
		{(modalData.edit || modalData.add) && <Modal/>}
		{showArchived ? <Archive/> : <Records/>}
		<AddConrol/>
		<Overall/>
    </div>
  )
}

const mapStateToProps = (state: State) => ({
	modalData: state.modal,
	showArchived: state.showArchived
})

export default connect(mapStateToProps)(App)