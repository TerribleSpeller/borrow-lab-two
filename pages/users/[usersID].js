import React, { useState, useEffect } from 'react';
import { get, ref } from 'firebase/database';
import { database } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from 'next/router';

const db = database;

export default function Users() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();
    const { usersID } = router.query; // Ensure you are using the correct parameter name

    useEffect(() => {
        console.log('Router query:', router.query); // Debugging statement
        if (usersID) {
            const fetchUserData = async () => {
                try {
                    console.log('Fetching data for UID:', usersID); // Debugging statement
                    const userRef = ref(db, `users/${usersID}`);
                    const snapshot = await get(userRef);

                    if (snapshot.exists()) {
                        console.log('Data fetched successfully:', snapshot.val()); // Debugging statement
                        setUserData(snapshot.val());
                        setError('');
                    } else {
                        console.log('No user found with this UID.'); // Debugging statement
                        setUserData(null);
                        setError('No user found with this UID.');
                    }
                } catch (error) {
                    console.error('Error fetching data:', error); // Debugging statement
                    setError(error.message);
                    setUserData(null);
                }
            };

            fetchUserData();
        }
    }, [usersID]);

    return (
        <div className="container mt-5">
            <h2 className="text-center">User Information</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {userData ? (
                <div className="mt-3">
                    <p><strong>Name:</strong> {userData.name}</p>
                    <p><strong>NIM:</strong> {userData.nim}</p>
                    <p><strong>Email:</strong> {userData.email}</p>
                    <p><strong>Phone:</strong> {userData.phone}</p>
                    <p><strong>Jurusan:</strong> {userData.jurusan}</p>
                </div>
            ) : (
                !error && <div className="text-center">Loading...</div>
            )}
        </div>
    );
}