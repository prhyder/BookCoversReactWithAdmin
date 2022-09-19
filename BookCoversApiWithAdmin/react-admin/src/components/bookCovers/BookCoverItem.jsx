import Image from 'next/image';

export default function BookCoverItem({bookCover, onClickEdit, onClickDelete}) {
	const { imageUrl, bookCoverId, title, authorName, genreName } = bookCover;

	return (
		<tr className="align-middle">
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
					data-title={title}
					value={bookCoverId}
					type="button"
					className="btn btn-dark d-inline"
					onClick={onClickDelete}
				>
					Delete
				</button>
			</td>
		</tr>	
	);
}