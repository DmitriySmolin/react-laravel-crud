import {useEffect, useState} from "react";
import client from "../api/client";
import {Link, useNavigate, useParams} from 'react-router-dom'

const View = () => {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        client.get('/users/'+id+'/edit').then((res)=>{
            setInputs({
                name:res.data.name,
                email:res.data.email,
            });
        });
    }

    return <div>
        <h2>View User</h2>
        <div className="row">
            <div className="col-sm-6 mx-auto justify-content-center">
                <div className="card p-4">
                    <h2>Name</h2>
                    <p>{inputs.name}</p>
                    <h2>Email</h2>
                    <p>{inputs.email}</p>
                </div>
                <Link className="btn btn-warning mt-2" to={{pathname: "/"}}>Back</Link>
            </div>
        </div>
    </div>
}

export default View;