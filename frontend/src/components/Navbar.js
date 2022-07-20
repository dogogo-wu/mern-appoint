import {Link} from 'react-router-dom'

const Navbar = ()=>{
    const handleLogout = async(e)=>{
        e.preventDefault()
        const response = await fetch('/api/users/logout', {
            method: 'POST'
        })
        const json = await response.json()
        if (!response.ok) {
            console.log(json.error)
        }
        if (response.ok) {
            console.log('logout', json);
            window.location.reload();
        }
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h2>All Products</h2>
                </Link>
                <Link to="/register">
                    <p>Register</p>
                </Link>
                <Link to="/login">
                    <p>Login</p>
                </Link>
                <Link to="/myappoint_page">
                    <p>My appoint</p>
                </Link>
                <Link to="/allappoint">
                    <p>All appoint</p>
                </Link>

                <button onClick={handleLogout}>Logout</button>
            </div>
        </header>
    )

}

export default Navbar