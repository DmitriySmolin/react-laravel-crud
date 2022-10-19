import {useEffect, useState} from "react";
import client from '../api/client';
import {Link} from "react-router-dom";

const Home = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const fetchAllUsers = () => {
        client.get('/users').then(res => setUsers(res.data));
    }

    const onDeleteUser = (id) => {
        client.delete('/users/' + id).then((res) => {
            fetchAllUsers();
        })
    }

    return <div>
        <h2>Users</h2>
        <table className="table">
            <thead>
            <tr>
                <th>№</th>
                <th>Name</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody>
            {users.map((u, i) => {
                return <tr key={u.id}>
                    <td>{++i}</td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td className="d-flex gap-3">
                        <Link className="btn btn-info" to={{pathname: "/edit/" + u.id}}>Edit</Link>
                        <Link className="btn btn-primary" to={{pathname: "/view/" + u.id}}>View</Link>
                        {/*<Link className="btn btn-danger" to={{pathname: "/delete/" + u.id}}>Delete</Link>*/}
                        <button onClick={() => onDeleteUser(u.id)} className="btn btn-danger">Delete</button>
                    </td>
                </tr>
            })}
            </tbody>
        </table>
    </div>
}

export default Home;