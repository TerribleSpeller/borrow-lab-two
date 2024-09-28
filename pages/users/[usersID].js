import React, { useState, useEffect } from 'react';
import { get, query, ref, orderByChild, equalTo } from 'firebase/database';
import { database } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

const db = database;

export default function Users() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const [requests, setRequests] = useState([]);
    const router = useRouter();
    const { usersID } = router.query;

    useEffect(() => {
        console.log('Router query:', router.query); //Debugging statement
        if (usersID) {
            const fetchUserData = async () => {
                try {
                    console.log('Fetching data for UID:', usersID); //Debugging statement
                    const userRef = ref(db, `users/${usersID}`);
                    const snapshot = await get(userRef);

                    if (snapshot.exists()) {
                        console.log('Data fetched successfully:', snapshot.val()); // ebugging statement
                        setUserData(snapshot.val());
                        setError('');
                    } else {
                        console.log('No user found with this UID.'); //Debugging 
                        setUserData(null);
                        setError('No user found with this UID.');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error); //Debuging statement
                    setError(error.message);
                    setUserData(null);
                }
            };
            fetchUserData();
        }
    }, [usersID]);

    useEffect(() => {
        if (userData) {
            const fetchUserRequests = async () => {
                try {
                    console.log('Fetching requests for UID:', usersID);
                    const requestsRef = ref(db, 'requests');
                    const requestsQuery = query(requestsRef, orderByChild('requesterInfo/uid'), equalTo(usersID));
                    const snapshot = await get(requestsQuery);

                    if (snapshot.exists()) {
                        console.log('Requests fetched successfully:', snapshot.val());
                        setRequests(Object.values(snapshot.val()));
                    } else {
                        console.log('No requests found for this UID.');
                        setRequests([]);
                    }
                } catch (error) {
                    console.error('Error fetching requests:', error);
                    setError(error.message);
                    setRequests([]);
                }
            };
            fetchUserRequests();
        }
    }, [userData, usersID]);

    return (
        <div className="container mt-5">
            <h2 className="text-center">User Information</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {userData ? (
                <>
                    <div className="card mt-3">
                        <div className="card-header">
                            <h3>User Information</h3>
                        </div>
                        <div className="card-body">
                            <p className="mb-2">
                                <strong>Name:</strong> {userData.name}
                            </p>
                            <p className="mb-2">
                                <strong>NIM:</strong> {userData.nim}
                            </p>
                            <p className="mb-2">
                                <strong>Email:</strong> {userData.email}
                            </p>
                            <p className="mb-2">
                                <strong>Phone:</strong> {userData.phone}
                            </p>
                            <p className="mb-2">
                                <strong>Jurusan:</strong> {userData.jurusan}
                            </p>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <div className="card-header">
                            <h3>Past Requests</h3>
                        </div>
                        <div className="card-body">
                            {requests.length > 0 ? (
                                <ul className="list-group">
                                    {requests.map((request, index) => (
                                        <li key={index} className="list-group-item">
                                            <strong>Requested Object:</strong> {request.equipmentName}<br />
                                            <strong>Purpose:</strong> {request.requesterInfo.purpose}<br />
                                            <strong>Request On:</strong> {new Date(request.timestamp).toLocaleString()} <br/>
                                            <strong>Start Date:</strong> {request.requesterInfo.startDate}<br />
                                            <strong>End Date:</strong> {request.requesterInfo.endDate}<br />
                                            <strong>Approval:</strong> {request.requesterInfo.approval}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>No past requests found.</p>
                            )}
                        </div>
                    </div>
                </>


            ) : (
                !error && <div className="text-center">Loading...</div>
            )}
        </div>
    );
}