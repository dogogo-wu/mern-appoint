import { useState } from "react"

const ProductForm = () => {
    const [prod, setProd] = useState({
        title: '',
        img: '',
        content: ''
    })

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const product = prod
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
            setProd({
                title: '',
                img: '',
                content: ''
            })
            console.log('add new product', json);
            window.location.reload();
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target
        setProd((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add a New Product</h3>

            <label>Name: </label>
            <input type="text" onChange={handleChange} value={prod.title} name="title" required />
            <label>img: </label>
            <input type="text" onChange={handleChange} value={prod.img} name="img" required />
            <label>describe: </label>
            <input type="text" onChange={handleChange} value={prod.content} name="content" required />

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