import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { DataGrid } from '@mui/x-data-grid';
import { Button } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const API_URL = 'https://localhost:5001/api/genres/';

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

	const handleEdit = (event, cellValues) => {
		const genreId = cellValues.row.genreId;
		router.push('/genres/edit/' + genreId);
	};
	
	const handleDelete = (event, cellValues) => {
		const genreId = cellValues.row.genreId;
		const genreName = cellValues.row.name;
		if (confirm("Are you sure you want to delete the genre " + genreName + "?") == true) {
			axios.delete(API_URL + genreId )
			.then(response => {
				setDeleteSuccessful(true);
				setGenres(genres => genres.filter(x => x.genreId !== genreId));
			}).catch(error => {
				console.log(error);
		})
		}
	  };

	const columns = [
		{ field: 'genreId', headerName: 'ID', width: 90 },
		{ field: 'name', headerName: 'Name', width: 180 },
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

	const ButtonStyle = {
		marginBottom: "16px"
	}
	
	return (
		<>
			<h1>Genres</h1>
			<div>
				<Link href='/genres/add'>
					<Button variant="contained" color="secondary" style={ButtonStyle}>Add New Genre</Button>
				</Link>
			</div>
			<div>
				{deleteSuccessful && <p>Item successfully deleted.</p>}
			</div>

			{genres.length == 0
				? < CircularProgress color="secondary" />
				: <Box sx={{ height: 600, width: 800 }}>
					<DataGrid
						rows={genres}
						columns={columns}
						getRowId={row => row.genreId}
						initialState={{
							sorting: {
								sortModel: [{ field: 'genreId', sort: 'desc' }],
							},
						}}
					/>
				</Box>
			}
		</>
	);
}

export default Genres;