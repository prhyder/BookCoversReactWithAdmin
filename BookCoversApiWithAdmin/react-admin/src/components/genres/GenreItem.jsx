export default function GenreItem({genre, onClickEdit, onClickDelete }) {
	const { genreId, name } = genre;

	return (
		<tr className="align-middle">
			<td>{genreId}</td>
			<td>{name}</td>
			<td>
				<button
					value={genreId}
					type="button"
					className="btn btn-dark d-inline me-2"
					onClick={onClickEdit}
				>
					Edit
				</button>
				<button
					value={genreId}
					type="button"
					className="btn btn-dark d-inline"
					onClick={(event) => { onClickDelete(event, name) }}
				>
					Delete
				</button>
			</td>
		</tr>
	);
}