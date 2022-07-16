const ProductDetail = ({product})=>{
    return (
        <div>
            <p>Item: {product.name}</p>
            <p>img: {product.img}</p>
            <p>myid: {product.myid}</p>
        </div>
    )
}

export default ProductDetail