import Image from 'next/image';

export default function BookCoverItem({bookCover, onClickEdit, onClickDelete}) {
	const { imageUrl, bookCoverId, title, authorName, genreName } = bookCover;

	return (
		// <li className="align-middle">
		<>
			<div>
				{imageUrl
							&& <Image
								src={imageUrl}
								width={75}
								height={120}
								key={bookCoverId}
							/>
				}
			</div>
			<div>{bookCoverId}</div>
			<div>{title}</div>
			<div>{authorName}</div>
			<div>{genreName}</div>
			<div>
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
			</div>
			</>
		// </li>	
	);
}