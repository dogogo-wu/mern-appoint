
const AppointDetail = ({ appoint }) => {

    return (
        <div>
            <p>Product: {appoint.prod.title}</p>
            <p>Image: {appoint.prod.img}</p>
            <p>Describe: {appoint.prod.content}</p>
            <p>Product_ID: {appoint.prod.my_id}</p>
            <p>Start_Time: {appoint.time_start}</p>
            <p>End_Time: {appoint.time_end}</p>
            <p>my_id: {appoint.my_id}</p>
        </div>
    )
}

export default AppointDetail