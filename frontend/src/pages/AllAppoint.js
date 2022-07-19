import { useEffect, useState } from "react"
import AppointDetail from "../components/AppointDetail"

const AllApoint = () => {
    const [appoints, setAppoints] = useState(null)

    useEffect(() => {
        const fetchAppoints = async () => {
            const response = await fetch('/api/appoints')
            const json = await response.json()
            if (response.ok) {
                setAppoints(json)
            }
        }
        fetchAppoints()
    }, [])

    return (
        <div className="home">
            <div className="appoints">
                {appoints && appoints.map((item) => {
                    return <AppointDetail key={item._id} appoint={item} />
                })}
            </div>
        </div>
    )
}

export default AllApoint