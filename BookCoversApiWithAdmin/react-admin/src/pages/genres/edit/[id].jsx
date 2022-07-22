import AddEditGenre from "../../../components/genres/AddEditGenre.jsx"

export async function getServerSideProps({ params }) {
	return {
		props: { id: params.id }
	}
}

export default AddEditGenre;