import { useState } from "react"

const AppointForm = ({ prod_base_id }) => {

    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [error, setError] = useState(null)

    const handleStartChange = (e) => {
        setStart(e.target.value);
    }
    const handleEndChange = (e) => {
        setEnd(e.target.value);
    }
    const handleAppoint = async (e) => {
        e.preventDefault()
        const appoint = { time_start: start, time_end: end, prod_base_id }
        const response = await fetch('/api/appoints', {
            method: 'POST',
            body: JSON.stringify(appoint),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
        }
        if (response.ok) {
            // setName('')
            console.log('add new appoint', json);
            console.log('prod myid', json.prod.name);
            // window.location.reload();
        }

    }
    return (
        <form>
            <input type="datetime-local" onChange={handleStartChange} required />
            <input type="datetime-local" onChange={handleEndChange} required />

            <p>{start}</p>
            <p>{end}</p>

            <button onClick={handleAppoint}>Appoint</button>
            {error &&
                <div className="error">
                    {error}
                </div>
            }
        </form>
    )
}

export default AppointForm