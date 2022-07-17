import { useState } from "react"

const ProductForm = () => {
    const [name, setName] = useState('')

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const product = { name }
        const response = await fetch('/api/products', {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            setName('')
            console.log('add new product', json);
        }
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Product</h3>
            <label>Name: </label>
            <input type="text" onChange={(e) => { setName(e.target.value) }} value={name} />

            <button>Add Product</button>
            {error &&
                <div className="error">
                    {error}
                </div>
            }
        </form>
    )
}

export default ProductForm