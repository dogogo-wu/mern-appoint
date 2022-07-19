import AppointForm from '../components/AppointForm'

const ProductDetail = ({ product }) => {

    const handleDelete = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/products/' + product._id, {
            method: 'DELETE'
        })
        const json = await response.json()
        if (!response.ok) {
            console.log(json.error)
        }
        if (response.ok) {
            console.log('Delete one product', json);
            window.location.reload();
        }
    }
    return (
        <div>
            <p>Item: {product.name}</p>
            <p>img: {product.img}</p>
            <p>my_id: {product.my_id}</p>

            <AppointForm  prod_base_id={product._id} />

            <button onClick={handleDelete}>Delete</button>
        </div>
    )
}

export default ProductDetail