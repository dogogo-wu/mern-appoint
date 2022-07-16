import { useEffect, useState } from "react"
import ProductDetail from "../components/ProductDetail"

const Home = () => {
    const [products, setProducts] = useState(null)

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('/api/products')
            const json = await response.json()
            // console.log(json);
            if (response.ok) {
                setProducts(json)
            }
        }
        fetchProducts()
    }, [])

    return (
        <div className="home">
            <div className="products">
                {products && products.map((item) => {
                    return <ProductDetail key={item._id} product={item} />
                })}
            </div>

        </div>
    )
}

export default Home