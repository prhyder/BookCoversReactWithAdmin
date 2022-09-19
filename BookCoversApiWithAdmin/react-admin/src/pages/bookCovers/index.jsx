import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Spinner from '../../components/Spinner';
import BookCoverItem from '../../components/bookCovers/BookCoverItem';
import { apiUrl } from '../../../config.js';
import { useRouter } from 'next/router';

const API_URL = `${apiUrl}/bookCovers/`;

const BookCovers = () => {
	const [bookCovers, setBookCovers] = useState([]);
	const [deleteSuccessful, setDeleteSuccessful] = useState(false);
	const router = useRouter();

	const getData = async () => {
		try {
			const bookCovers = await axios.get(API_URL);
			setBookCovers(bookCovers.data);

			const genreApi = `${apiUrl}/genres`;
			const genres = await axios.get(genreApi);
			setGenres(genres.data);
		}
		catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	useEffect(() => {
		(async () => {
			getData();
		})();
	}, []);

	const handleEdit = (event) => {
		const bookCoverId = event.target.value;
		router.push('/bookCovers/edit/' + bookCoverId);
	};
	
	const handleDelete = (event) => {
		const bookCoverId = event.target.value;
		const title = event.target.getAttribute("data-title");
		if (confirm("Are you sure you want to delete the book cover " + title + "?") == true) {
			setBookCovers(bookCovers => bookCovers.filter(x => x.bookCoverId != bookCoverId));
			axios.delete(API_URL + bookCoverId )
				.then(() => {
					setDeleteSuccessful(true);
					setBookCovers(bookCovers => bookCovers.filter(x => x.bookCoverId != bookCoverId));
				}).catch(error => {
					console.log(error);
			})
		}
	};
	
	return (
		<>
			<div className='pageRoot'>
				<h1>Book Covers</h1>
				<div>
					<Link href='/bookCovers/add'>
						<button type="button" className="btn btn-dark d-inline mb-3 mt-2">
							Add New Book Cover
						</button>
					</Link>
				</div>
				<div>
					{deleteSuccessful && <p>Item successfully deleted.</p>}
				</div>

			{bookCovers.length == 0
					? <Spinner />
					: <div className="table-responsive me-5 mb-4">
						<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th scope="col">Image</th>	
								<th scope="col">ID</th>
								<th scope="col">Title</th>
								<th scope="col">Author</th>
								<th scope="col">Genre</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
								{bookCovers.map((bookCover) => (
									<BookCoverItem key={bookCover.bookCoverId} bookCover={bookCover} onClickEdit={handleEdit} onClickDelete={handleDelete} />
								))}
						</tbody>
				  	</table>
					</div>
				}
			</div>
		</>

	);
}

export default BookCovers;