import { useState } from "react"
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const [error, setError] = useState(null)

    const handleChange = (e) => {
        const { value, name } = e.target
        setData(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = { username: data.username, password: data.password }
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            // setData('')
            console.log('user login', json);
            // window.location.reload();
            navigate("/");
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input type="email" value={data.username} name="username" onChange={handleChange} required/>
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={data.password} name="password" onChange={handleChange} required />
                </div>
                <button>Login</button>
                {error &&
                    <div className="error">
                        {error}
                    </div>
                }
            </form>
        </div>
    )
}

export default Login