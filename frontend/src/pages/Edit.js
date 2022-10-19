import {useEffect, useState} from "react";
import client from "../api/client";
import {Link, useNavigate, useParams} from 'react-router-dom'

const Edit = (props) => {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const {id} = useParams();


    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = () => {
        client.get('/users/' + id + '/edit').then((res) => {
            setInputs({
                name: res.data.name,
                email: res.data.email,
            });
        });
    }

    const handleChange = ({target}) => {
        const name = target.name;
        const value = target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const submitForm = (e) => {
        client.put('/users/' + id, inputs).then((res) => {
            navigate("/");
        })
    }

    return <div>
        <h2>Edit User</h2>
        <div className="row">
            <div className="col-sm-6 mx-auto justify-content-center">
                <label>Name</label>
                <input type="text" name="name" className="form-control mb-2"
                       value={inputs.name || ''}
                       onChange={handleChange}
                />

                <label>Email</label>
                <input type="email" name="email" className="form-control mb-2"
                       value={inputs.email || ''}
                       onChange={handleChange}
                />
                <div className="d-flex justify-content-center gap-3">
                    <button onClick={submitForm} type="button" className="btn btn-info ">Update</button>
                    <Link className="btn btn-warning" to={{pathname: "/"}}>Back</Link>
                </div>
            </div>
        </div>
    </div>
}

export default Edit;