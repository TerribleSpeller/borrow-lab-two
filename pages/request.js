import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { database } from "./firebase";
import { auth } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";


const db = database;


function useAuth() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return user;
}

function Request() {
    const router = useRouter();
    const { id, name } = router.query;
    const [equipment, setEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(id || "");
    const [searchQuery, setSearchQuery] = useState("");
    const [labOptions, setLabOptions] = useState([]);
    const [availableQty, setAvailableQty] = useState(0);
    const user = useAuth();
    const [requesterInfo, setRequesterInfo] = useState({
        name: "",
        email: "",
        phone: "",
        nim: "",
        jurusan: "ARE", // Set default value here
        purpose: "",
        approval: "Processing",
        startDate: "",
        endDate: ""
    });

    useEffect(() => {
        if (user) {
            // Set the user's email after the component mounts
            setRequesterInfo((prevInfo) => ({
                ...prevInfo,
                email: user.email
            }));
        }
    }, [user]);

    useEffect(() => {
        const equipmentRef = ref(db, 'labequipment');
        onValue(equipmentRef, (snapshot) => {
            const data = snapshot.val();
            const equipmentList = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            setEquipment(equipmentList);
        });
    }, []);

    useEffect(() => {
        if (selectedEquipment) {
            const selected = equipment.find(item => item.id === selectedEquipment);
            if (selected) {
                setLabOptions([selected.Lab]);
                setAvailableQty(selected.Total - selected.Borrowed);
            } else {
                setLabOptions([]);
                setAvailableQty(0);
            }
        }
    }, [selectedEquipment, equipment]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const { startDate, endDate } = requesterInfo;
        const currentDate = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (!startDate || !endDate || start > end) {
            alert("Please ensure the start date is before the end date and both dates are provided.");
            return;
        }
    
        // Check if dates are after the current date
        if (start < currentDate || end < currentDate) {
            alert("Please ensure both dates are in the future.");
            return;
        }
        if (!startDate || !endDate || new Date(startDate) >= new Date(endDate)) {
            alert("Please ensure the start date is before the end date and both dates are provided.");
            return;
        }
        const selected = equipment.find(item => item.id === selectedEquipment);
        const requestRef = ref(db, 'requests');
        const newRequest = {
            equipmentId: selectedEquipment,
            equipmentName: selected.Name,
            requesterInfo,
            lab: labOptions[0],
            timestamp: Date.now()
        };
        push(requestRef, newRequest)
            .then(() => {
                console.log("Request submitted successfully");
                // Optionally, redirect or show a success message
                alert("Request submitted successfully");
            })
            .catch((error) => {
                console.error("Error submitting request: ", error);
                alert("Error! Please try again later");
                alert(error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setRequesterInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };

    const filteredEquipment = equipment.filter(item =>
        item.Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <h2 className="text-center">Request Equipment</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h4 htmlFor="requesterinfo">Requester's Info</h4>
                    <div className="row">
                        <div className="col">
                            <label>Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="requesterinfo"
                                name="name"
                                placeholder="Enter your Name"
                                value={requesterInfo.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label>Email</label>
                            <input
                                type="email"
                                className="form-control"
                                id="requesterinfo"
                                name="email"
                                placeholder={requesterInfo.email}
                                value={requesterInfo.email}
                                readOnly 
                                required
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label>Phone Number</label>
                            <input
                                type="number"
                                className="form-control"
                                id="requesterinfo"
                                name="phone"
                                placeholder="Enter your Phone Number"
                                value={requesterInfo.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label>NIM</label>
                            <input
                                type="number"
                                className="form-control"
                                id="requesterinfo"
                                name="nim"
                                placeholder="Enter your Student ID"
                                value={requesterInfo.nim}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>




                    <label>Jurusan</label>
                    <select
                        className="form-select"
                        aria-label="Default select example"
                        name="jurusan"
                        value={requesterInfo.jurusan}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="ARE">Automotive and Robotics Engineering</option>
                        <option value="PDE">Product Design Engineering</option>
                        <option value="BE">Business Engineering</option>
                    </select>
                    <label>Purpose</label>
                    <textarea
                        className="form-control"
                        id="purpose"
                        name="purpose"
                        placeholder="Enter the purpose of your request"
                        rows="3"
                        value={requesterInfo.purpose}
                        onChange={handleInputChange}
                        required
                    ></textarea>
                    <br />
                    <label>Borrwing Period</label>
                    <div className="row">
                        <div className="col">
                            <label>Start Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="start-date"
                                name="startDate"
                                value={requesterInfo.startDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="col">
                            <label>End Date</label>
                            <input
                                type="date"
                                className="form-control"
                                id="end-date"
                                name="endDate"
                                value={requesterInfo.endDate}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                    </div>
                    <label htmlFor="equipmentSelect">Select Equipment:</label>
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                id="searchInput"
                                className="form-control"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for equipment..."
                            />
                            <div className="row">
                                <div className="col">
                                    <select
                                        id="equipmentSelect"
                                        className="form-control"
                                        value={selectedEquipment}
                                        onChange={(e) => setSelectedEquipment(e.target.value)}
                                    >
                                        {filteredEquipment.map((item) => (
                                            <option key={item.id} value={item.id}>
                                                {item.Name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col align-items-center">
                                    <label className="p-2">From Lab:</label>
                                </div>
                                <div className="col">
                                    <select id="lab-select" className="form-control">
                                        {labOptions.map((lab, index) => (
                                            <option key={index} value={lab}>
                                                {lab}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col">
                                    <label className="p-2">Available Quantity: {availableQty}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3" disabled={availableQty === 0}>Submit Request</button>
            </form>
        </div>
    );
}

export default Request;