import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import api from '../api'; // make sure this is your axios instance

const QrCodeShow = () => {
  const [entryPassInfo, setEntryPassInfo] = useState(null);
  const { unique_id } = useParams(); // gets the :unique_id from the URL

  useEffect(() => {
    const fetchPassInfo = async () => {
      try {
        const response = await api.get(`/pass_detail/${unique_id}/`);
        console.log("Fetched entry pass:", response.data);
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
    <div className="container mt-5">
      <div className="card shadow-sm p-4 text-center">
        <h2 className="mb-3">Your Entry Pass</h2>
        <p><strong>Name:</strong> {entryPassInfo.name}</p>
        <p><strong>Event:</strong> {entryPassInfo.event_name}</p>
        <p><strong>Status:</strong> {entryPassInfo.is_used ? 'Used' : 'Not Used'}</p>
        <div className="my-3">
          <img
            src={entryPassInfo.qr_code} // full URL from backend
            alt="QR Code"
            style={{ width: '200px' }}
          />
        </div>
        <p><strong>Unique ID:</strong> {entryPassInfo.unique_id}</p>
      </div>
    </div>
  );
};

export default QrCodeShow;
