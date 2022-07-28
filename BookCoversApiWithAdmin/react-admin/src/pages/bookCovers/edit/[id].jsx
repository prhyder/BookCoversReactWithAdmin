import AddEditBookCover from "../../../components/bookCovers/AddEditBookCover.jsx"

export async function getServerSideProps({ params }) {
	return {
		props: { id: params.id }
	}
}

export default AddEditBookCover;