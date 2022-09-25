import React, {useState, useEffect } from 'react';
import Link from 'next/link';
import Spinner from '../../components/Spinner';
import GenreItem from '../../components/genres/GenreItem';
import getConfig from 'next/config';
import { useRouter } from 'next/router';

import { fetchWrapper } from '../../helpers/fetch-wrapper';

const { publicRuntimeConfig } = getConfig();
const API_URL = `${publicRuntimeConfig.apiUrl}/genres/`;

const Genres = () => {
	const [genres, setGenres] = useState([]);
	const [deleteSuccessful, setDeleteSuccessful] = useState(false);
	const router = useRouter();

	const getGenres = async () => {
		try {
			const data = await fetchWrapper.get(`${API_URL}`);
			setGenres(data)
		}
		catch (err) {
			console.log(`Error: ${err}`)
		}
	}

	useEffect(() => {
		getGenres();
	}, []);

	const handleEdit = (event) => {
		const genreId = event.target.value;
		router.push('/genres/edit/' + genreId);
	};
	
	const handleDelete = async (event, name) => {
		const genreId = event.target.value;
		if (confirm(`Are you sure you want to delete the genre ${name}?`)) {
			try {
				await fetchWrapper.delete(`${API_URL}/${genreId}`);
				setDeleteSuccessful(true);
				setGenres(genres => genres.filter(x => x.genreId != genreId));
			}
			catch (err) {
				console.log(error);
			}
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
					<table className="table table-striped table-hover border">
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