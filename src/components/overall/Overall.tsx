import OverallRow from './OverallRow'

function Overall() {
	return (
		<>
			<thead>
				<tr>
					<th className="th" ></th>
					<th className="th" scope="col">Category</th>
					<th className="th" scope="col">Active</th>
					<th className="th" scope="col">Archived</th>
				</tr>
			</thead>
			<tbody id="table-body">
				<OverallRow />
			</tbody>
		</>
	)
}

export default Overall