import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import api from '../api';

const ValidPage = () => {
    const [entryPassInfo, setEntryPassInfo] = useState(null);
    const { unique_id } = useParams();

    useEffect(() => {
        const fetchPassInfo = async () => {
            try {
                const response = await api.get(`/validate/${unique_id}/`);
                setEntryPassInfo(response.data);
            } catch (err) {
                console.error("Error fetching pass info:", err);
            }
        };

        if (unique_id) {
            fetchPassInfo();
        }
    }, [unique_id]);

    if (!entryPassInfo) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    return (
        <div className='container mt-5'>
            <div className={`card shadow-sm p-4 text-center ${entryPassInfo.valid ? 'text-success' : 'text-danger'}`}>
                <h2>{entryPassInfo.valid ? 'Pass Validated Successfully' : 'Invalid Pass'}</h2>
                <p>{entryPassInfo.message}</p>
                {entryPassInfo.valid && (
                    <p>
                        The pass for <strong>{entryPassInfo.name}</strong> is successfully validated for the event <strong>{entryPassInfo.event_name}</strong>.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ValidPage;
