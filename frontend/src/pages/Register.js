import { useState } from "react"


const Register = () => {

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
        const response = await fetch('/api/users', {
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
            console.log('add new user', json);
            // window.location.reload();
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: </label>
                    <input type="email" value={data.username} name="username" onChange={handleChange} />
                </div>
                <div>
                    <label>Password: </label>
                    <input type="password" value={data.password} name="password" onChange={handleChange} />
                </div>
                <button>Register</button>
                {error &&
                    <div className="error">
                        {error}
                    </div>
                }
            </form>
        </div>
    )
}

export default Register