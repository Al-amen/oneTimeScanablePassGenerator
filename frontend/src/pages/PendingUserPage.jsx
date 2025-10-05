import React from 'react'
import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';


const PendingUserPage = () => {

    const [pendingUsers, setPendingUsers] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPendingUsers = async () => {
            try {
                const response = await api.get('pending/');
                setPendingUsers(response.data);
            } catch (error) {
                console.error('Error fetching pending users:', error);
            }
        };

        fetchPendingUsers();
    }, []);

    const handleApprove = async (unique_id) => {
        try {
            console.log(unique_id);
            await api.put(`approve/${unique_id}/`);
            alert('User approved successfully!');
            setPendingUsers(pendingUsers => pendingUsers.filter(user => user.unique_id !== unique_id));
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h2 className='text-center mb-4'>Pending Users</h2>
            <table className="table">
                <thead>
                    <tr className='table-dark text-center'>
                        <th scope="col">#</th>
                        <th scope="col">Roll Number</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {pendingUsers.map((user, index) => (
                        <tr key={user.roll_number} className='text-center'>
                            <th scope="row">{index + 1}</th>
                            <td>{user.roll_number}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>
                                <button className="btn btn-success btn-sm mx-2" onClick={() => handleApprove(user.unique_id)} >Approve</button>
                                {/* <Link to={`/reject/${user.unique_id}`} className="btn btn-danger btn-sm">Reject</Link> */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    </div>
  )
}

export default PendingUserPage
