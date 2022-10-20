import {useState} from "react";
import client from "../api/client";
import {useNavigate} from 'react-router-dom'

const Create = () => {

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();

    const handleChange = ({target}) => {
        const name = target.name;
        const value = target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const submitForm = (e) => {
        client.post('/users', inputs).then((res) => {
            navigate("/");
        })
    }
    
    return <div>
        <h2>New User</h2>
        <div className="row">
            <div className="col-sm-6 mx-auto justify-content-center ">
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

                <label>Password</label>
                <input type="password" name="password" className="form-control mb-2"
                       value={inputs.password || ''}
                       onChange={handleChange}
                />
                <button onClick={submitForm} type="button" className="btn btn-info mt-2">Create</button>
            </div>
        </div>
    </div>
}

export default Create;