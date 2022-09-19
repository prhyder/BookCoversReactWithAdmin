import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Spinner from '../../components/Spinner';
import GenreItem from '../../components/genres/GenreItem';
import { apiUrl } from '../../../config.js';
import { useRouter } from 'next/router';

const API_URL = `${apiUrl}/genres/`;

console.log("apiUrl: ", apiUrl);

const Genres = () => {
	const [genres, setGenres] = useState([]);
	const [deleteSuccessful, setDeleteSuccessful] = useState(false);
	const router = useRouter();

	const getGenres = async () => {
		try {
			const genres = await axios.get(API_URL);
			setGenres(genres.data);
		}
		catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	useEffect(() => {
		(async () => {
			getGenres();
		})();
	}, []);

	const handleEdit = (event) => {
		const genreId = event.target.value;
		router.push('/genres/edit/' + genreId);
	};
	
	const handleDelete = (event) => {
		const genreId = event.target.value;
		const genreName = event.target.getAttribute("data-name");
		if (confirm("Are you sure you want to delete the genre " + genreName + "?") == true) {
			axios.delete(API_URL + genreId )
			.then(() => {
				setDeleteSuccessful(true);
				setGenres(genres => genres.filter(x => x.genreId != genreId));
			}).catch(error => {
				console.log(error);
		})
		}
	};
	
	return (
		<div className='pageRoot'>
			<h1>Genres</h1>
			<div>
				<Link href='/genres/add' >
					<button type="button" className="btn btn-dark d-inline mb-3 mt-2">
						Add New Genre
					</button>
				</Link>
			</div>
			<div>
				{deleteSuccessful && <p>Item successfully deleted.</p>}
			</div>

			{genres.length == 0
				? <Spinner />
				: <div className="table-responsive me-5 mb-4">
					<table className="table table-striped table-hover">
						<thead>
							<tr>
								<th scope="col">ID</th>
								<th scope="col">Name</th>
								<th scope="col"></th>
							</tr>
						</thead>
						<tbody>
							{genres.map((genre) => (
								<GenreItem key={genre.genreId} genre={genre} onClickEdit={handleEdit} onClickDelete={handleDelete} />
							))}
						</tbody>
					</table>
				</div>
			}
		</div>
	);
}

export default Genres;