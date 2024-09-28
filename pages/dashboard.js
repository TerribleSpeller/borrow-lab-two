import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { database } from "./firebase";
import Link from 'next/link';
import { useRouter } from "next/router";

const db = database;
function useAuth2() {
    const [userCheck, setUserCheck] = useState(null);
    const [loadingCheck, setLoadingCheck] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (userCheck) => {
            if (userCheck) {
                setUserCheck(userCheck);
            } else {
                setUserCheck(null);
            }
            setLoadingCheck(false);
        });

        return () => unsubscribe();
    }, []);

    return { userCheck, loadingCheck };
}

function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
}

function Dashboard() {
    const [requests, setRequests] = useState([]);
    const [user, setUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const { userCheck, loadingCheck } = useAuth2();
    const router = useRouter();

    useEffect(() => {
        if (loadingCheck) {
            return; //Do nothing while loading
        }
        if (userCheck) {
            alert("User is logged in:", userCheck);
        } else {
            alert("Please Log In");
            router.push("/Login");
        }
    }, [userCheck, loadingCheck, router]);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                checkAdmin(user.email);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const checkAdmin = (email) => {
        const adminRef = ref(database, 'admin');
        onValue(adminRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const isAdmin = Object.values(data).some(admin => admin.email === email);
                setIsAdmin(isAdmin);
            } else {
                setIsAdmin(false);
            }
        });
    };


    useEffect(() => {
        if (user) {
            const requestsRef = ref(db, 'requests');
            onValue(requestsRef, (snapshot) => {
                const data = snapshot.val();

                if (isAdmin) {
                    const userRequests = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
                    setRequests(userRequests);

                } else {
                    const userRequests = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })).filter(request => request.requesterInfo.email === user.email) : [];
                    setRequests(userRequests);

                }
            });
        }
    }, [user]);

    const handleWithdraw = (requestId) => {
        const requestRef = ref(database, `requests/${requestId}/requesterInfo`);
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        update(requestRef, { approval: "Withdrawn", returnDate: currentDate })
            .then(() => {
                console.log("Request withdrawn successfully");
            })
            .catch((error) => {
                console.error("Error withdrawing request: ", error);
            });
    };

    const handleReturn = (requestId) => {
        const requestRef = ref(database, `requests/${requestId}/requesterInfo`);
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        update(requestRef, { approval: "Returned", returnDate: currentDate })
            .then(() => {
                console.log("Request marked as returned successfully");
            })
            .catch((error) => {
                console.error("Error marking request as returned: ", error);
            });
    };

    const handleApprove = (requestId) => {
        const requestRef = ref(database, `requests/${requestId}/requesterInfo`);
        update(requestRef, { approval: "Approved" })
            .then(() => {
                console.log("Request approved successfully");
            })
            .catch((error) => {
                console.error("Error approving request: ", error);
            });
    };

    const handleDeny = (requestId) => {
        const requestRef = ref(database, `requests/${requestId}/requesterInfo`);
        const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        update(requestRef, { approval: "Denied", returnDate: currentDate })
            .then(() => {
                console.log("Request denied successfully");
            })
            .catch((error) => {
                console.error("Error denying request: ", error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">{isAdmin ? "Admin Dashboard" : "Your Applications"}</h2>
            {requests.length > 0 ? (
                <table className="table">
                    <thead>
                        <tr>
                            <th>Equipment Name</th>
                            <th>Lab</th>
                            <th>Purpose</th>
                            <th>Borrower</th>
                            <th>Time Requested</th>
                            <th>Borrow Date</th>
                            <th>Return Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests
                            .sort((a, b) => b.timestamp - a.timestamp) // Sort requests in descending order
                            .map((request) => (
                                <tr key={request.id}>
                                    <td>{request.equipmentName}</td>
                                    <td>{request.lab}</td>
                                    <td>{request.requesterInfo.purpose}</td>
                                    <td>
                                        <Link href={`/users/${request.requesterInfo.uid}`}>
                                            {request.requesterInfo.name} | {request.requesterInfo.nim}
                                        </Link>
                                    </td>
                                    <td>{new Date(request.timestamp).toLocaleString()}</td>
                                    <td>{request.requesterInfo.startDate}</td>
                                    <td>{request.requesterInfo.returnDate || "None"}</td>
                                    <td>{request.requesterInfo.approval || "Processing"}</td>
                                    <td>
                                        {request.requesterInfo.approval === "Processing" && (
                                            <button
                                                className="btn btn-warning m-1"
                                                onClick={() => handleWithdraw(request.id)}
                                            >
                                                Withdraw
                                            </button>
                                        )}
                                        {!isAdmin && request.requesterInfo.approval === "Approved" && (
                                            <>
                                                To Return, Contact Pak Faisal
                                            </>
                                        )}
                                        {isAdmin && request.requesterInfo.approval === "Processing" && (
                                            <>
                                                <button
                                                    className="btn btn-success m-1"
                                                    onClick={() => handleApprove(request.id)}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    className="btn btn-danger m-1"
                                                    onClick={() => handleDeny(request.id)}
                                                >
                                                    Deny
                                                </button>
                                            </>
                                        )}
                                        {isAdmin && request.requesterInfo.approval === "Approved" && (
                                            <button
                                                className="btn btn-success m-1"
                                                onClick={() => handleReturn(request.id)}
                                            >
                                                Mark as Returned
                                            </button>
                                        )

                                        }
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            ) : (
                <p className="text-center">No applications found.</p>
            )}
        </div>
    );
}

export default Dashboard;