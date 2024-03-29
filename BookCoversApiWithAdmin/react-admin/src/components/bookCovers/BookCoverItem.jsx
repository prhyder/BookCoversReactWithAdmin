import Image from 'next/image';

export default function BookCoverItem({bookCover, onClickEdit, onClickDelete, provided, innerRef}) {
	const { imageUrl, bookCoverId, title, authorName, genreName } = bookCover;

	return (
		<tr className="align-middle"
			key={bookCoverId}
			ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}
		>
			<td>
				{imageUrl
							&& <Image
								src={imageUrl}
								width={75}
								height={120}
								key={bookCoverId}
							/>
				}
			</td>
			<td>{bookCoverId}</td>
			<td>{title}</td>
			<td>{authorName}</td>
			<td>{genreName}</td>
			<td>
				<button
					value={bookCoverId}
					type="button"
					className="btn btn-dark d-inline me-2"
					onClick={onClickEdit}
				>
					Edit
				</button>
				<button
					value={bookCoverId}
					type="button"
					className="btn btn-dark d-inline"
					onClick={(event) => { onClickDelete(event, title) }}
				>
					Delete
				</button>
			</td>
		</tr>	
	);
}