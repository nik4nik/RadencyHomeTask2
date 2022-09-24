import { alert } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Angeler.css';

import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { AppDispatch } from '../../redux/store'
import { ChangeEvent, FormEvent, useState } from 'react'
import { ModalData, State, SubmitEdit } from '../../types'
import {v4 as uuid} from 'uuid'

interface Props {
    modalData: ModalData,
    closeModal: () => void,
    submitEdit: (editObj: SubmitEdit) => void,
}

function Modal({ modalData, closeModal, submitEdit }: Props) {
	const
		[name, setName] = useState(modalData.name),
		[text, setText] = useState(modalData.text),
		[category, setCategory] = useState(modalData.category),

	handleNoteName = (e: ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value)
	},

	handleNoteText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
    },

    handleNoteCategory = (e: ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value)
    },

    handleSubmitEdit = (e: FormEvent) => {
        if (text === '') {
            alert({text: 'Note is empty', type: 'notice', delay: 2000, styling: 'angeler', icons: 'angeler'})
            return
        } else if (category === '') {
            alert({ text: 'Select a category', type: 'notice', delay: 2000, styling: 'angeler', icons: 'angeler' })
            return
        } else if (name === '') {
            alert({ text: 'Name is empty', type: 'notice', delay: 2000, styling: 'angeler', icons: 'angeler' })
            return
        }
		
		const id = (e.target as HTMLButtonElement).id || uuid()
		
        submitEdit({ name, text, category, id, time:modalData.time, archived:modalData.archived })
		setName('')
        setCategory('')
        setText('')
        closeModal()
    }

    return (
        <div className="modal" tabIndex={-1} id="modal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Note</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                    </div>
                    <div className="modal-body">
                        <div className="form-group">
							<h6>Name</h6>
							<input id="name"
								className="form-control"
								value={name}
								onChange={handleNoteName}
							/>
                            <textarea id="modal-input-text" className="form-control my-2" aria-label="With textarea" value={text} onChange={handleNoteText}></textarea>
                            <select className="form-select" id="modal-selection" value={category} onChange={handleNoteCategory}>
                                <option value="">Select category</option>
                                <option value="Task">Task</option>
                                <option value="Idea">Idea</option>
								<option value="Quote">Quote</option>
                                <option value="Random Thought">Random Thought</option>
                            </select>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                        <button id={modalData.id} onClick={handleSubmitEdit} type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
	)
}

const mapStateToProps = (state: State) => ({ modalData: state.modal }),

	mapDispatchToProps = (dispatch: AppDispatch) => ({
		closeModal: () => dispatch(actions.closeModal()),
		submitEdit: (editObj: SubmitEdit) => dispatch(actions.edit(editObj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);