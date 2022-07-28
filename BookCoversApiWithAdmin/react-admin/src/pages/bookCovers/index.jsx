import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';
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

	const handleEdit = (event, cellValues) => {
		const bookCoverId = cellValues.row.bookCoverId;
		router.push('/bookCovers/edit/' + bookCoverId);
	};
	
	const handleDelete = (event, cellValues) => {
		const bookCoverId = cellValues.row.bookCoverId;
		const bookCoverName = cellValues.row.title;
		if (confirm("Are you sure you want to delete the book cover " + bookCoverName + "?") == true) {
			axios.delete(API_URL + bookCoverId )
			.then(response => {
				setDeleteSuccessful(true);
				setBookCovers(bookCovers => bookCovers.filter(x => x.bookCoverId !== bookCoverId));
			}).catch(error => {
				console.log(error);
		})
		}
	};
	
	const columns = [
		{
			field: 'imageUrl',
			headerName: 'Image',
			width: 140,
			renderCell: (cellValues) => {
				return (
					<>
						{cellValues.row.imageUrl
							&& <Image
								src={cellValues.row.imageUrl}
								width={75}
								height={120}
								key={cellValues.row.bookCoverId}
							/>
						}
					</>
				)
			}
		},
		{ field: 'bookCoverId', headerName: 'ID', width: 90 },
		{ field: 'title', headerName: 'Title', width: 180 },
		{ field: 'authorName', headerName: 'Author', width: 120 },
		{
			field: 'genreName', headerName: 'Genre', width: 140
		},
		{
			field: "EditDelete",
			flex: 1,
			sortable: false,
			headerName: '',
			renderCell: (cellValues) => {
				return (
					<>
						<Button
							variant="contained"
							color="secondary"
							size="small"
							sx={{margin:1}}
							onClick={(event) => {
								handleEdit(event, cellValues);
							}}
						>
							Edit
						</Button>
						<Button
							variant="contained"
							color="secondary"
							size="small"
							sx={{marginTop:1, marginBottom:1}}
							onClick={(event) => {
								handleDelete(event, cellValues);
							}}
						>
							Delete
						</Button>
					</>
			  );
			}
		  },
	]
	
	return (
		<>
			<h1>Book Covers</h1>
			<div>
				<Link href='/bookCovers/add'>
					<Button variant="contained" color="secondary" className="add-button">Add New Book Cover</Button>
				</Link>
			</div>
			<div>
				{deleteSuccessful && <p>Item successfully deleted.</p>}
			</div>

			{bookCovers.length == 0
				? < CircularProgress color="secondary" />
				: <Box sx={{ height: 600, width: '100%' }}>
					<DataGrid
						rows={bookCovers}
						columns={columns}
						getRowId={row => row.bookCoverId}
						getRowHeight={() => "auto"}
						disableSelectionOnClick 
						initialState={{
							sorting: {
								sortModel: [{ field: 'bookCoverId', sort: 'desc' }],
							},
						}}
					/>
				</Box>
			}
		</>
	);
}

export default BookCovers;