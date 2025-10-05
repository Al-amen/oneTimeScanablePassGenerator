import React from 'react'

const ApproveUserPage = () => {
    const [userData, setUserData] = useState(null);
    const { unique_id } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`pending/${unique_id}/`);
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [unique_id]);

    const handleApprove = async () => {
        try {
            await api.post(`approve/${unique_id}/`);
            alert('User approved successfully!');
        } catch (error) {
            console.error('Error approving user:', error);
        }
    };

    if (!userData) {
        return <div>Loading...</div>;
    }   
    return (
    <div>
      <h2 className='text-center mb-4'>Approve User</h2>
      <p><strong>Roll Number:</strong> {userData.roll_number}</p>
      <p><strong>Name:</strong> {userData.name}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Status:</strong> {userData.status}</p>
      <button className="btn btn-success" onClick={handleApprove}>Approve</button>
    </div>
  )
}

export default ApproveUserPage
