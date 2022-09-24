import { useEffect } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../redux/actions'
import { SubmitNote, State } from '../../types'
import { AppDispatch } from '../../redux/store'

interface Props {
	notesArr: SubmitNote[],
	onUpdate: (data: TableData) => void,
}

type TableData = {[key: string]: {active: number, archived: number}}[]
type Category = {[key: string]: {active: number, archived: number}}

const OverallRow = ({ notesArr, onUpdate }: Props) => {

	useEffect(() => {
		const data = getTableData()
		onUpdate(data)
	})

	const getTableData = () => Array.from(new Set(notesArr.map(note => note.category)))
		.map(e => {
			const res = notesArr.reduce((acc, note) => {
				if (note.category === e)
					acc[+note.archived]++
				return acc
			}, [0, 0])
			return {[e]: {active: res[0], archived:res[1]}}
		})

	const tableData = getTableData()

	const tableMarkup = (tableData: TableData) => {
		const markup = tableData.map((category: Category, index: number) => {
			const key = Object.keys(category)
			const id = key[0]
			return (
				<tr key={index}>
					<td width="10px">
						<img className='pict' src={`./img/${key[0].replaceAll(' ', '')}.svg`} alt=''/>
					</td>
					<td>{key}</td>
					<td>{category[id].active}</td>
					<td>{category[id].archived}</td>
				</tr>
			)
		})
		return markup
	}
	return <>{ tableData.length > 0 ? tableMarkup(tableData) :
		<h3 className="mt-3" style={{ color: 'grey', fontSize: 18 + 'px' }} >No data</h3> }</>
}

const mapStateToProps = (state: State) => ({
	notesArr: state.notes,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
	onUpdate: (data: TableData) => dispatch(actions.changeTableData(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(OverallRow);