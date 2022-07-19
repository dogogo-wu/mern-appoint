import { useEffect, useState } from "react"
import AppointDetail from "../components/AppointDetail"

const MyAppoint = () => {
    const [appoints, setAppoints] = useState(null)

    useEffect(() => {
        const fetchMyAppoints = async () => {
            const response = await fetch('/api/appoints/myappoint')
            const json = await response.json()
            // console.log(json);
            if (response.ok) {
                setAppoints(json)
            }
        }
        fetchMyAppoints()
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

export default MyAppoint