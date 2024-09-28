import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { database } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Modal, Button, Form } from 'react-bootstrap';
import { RulesBorrow } from "./components/rules.jsx";


const db = database;

function useAuth() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
                console.log(user.uid)
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return { user, loading };
}


function Request() {
    const router = useRouter();
    const { id, name } = router.query;
    const [equipment, setEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState(id ? [id] : []);
    const [searchQuery, setSearchQuery] = useState("");
    const [labOptions, setLabOptions] = useState([]);
    const [availableQty, setAvailableQty] = useState(0);
    const { user, loading } = useAuth();

    useEffect(() => {
        if (loading) {
            return; //Do nothing while loading
        }
        if (user) {
            //alert("User is logged in:", user);     
        } else {
            alert("Please Log In");
            router.push("/Login");
        }
    }, [user, loading, router]);

    const [requesterInfo, setRequesterInfo] = useState({
        uid: "",
        name: "",
        email: "",
        phone: "",
        nim: "",
        jurusan: "ARE",
        purpose: "",
        approval: "Processing",
        startDate: "",
        endDate: "",
        startTime: "08:00",
        endTime: "20:00"
    });
    const [showModal, setShowModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false);


    useEffect(() => {
        if (user) {
            //Set the user's email after the component mounts
            setRequesterInfo((prevInfo) => ({
                ...prevInfo,
                uid: user.uid,
                email: user.email
            }));

            //Autofill the rest of the data
            const userRef = ref(db, `users/${user.uid}`);
            onValue(userRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setRequesterInfo((prevInfo) => ({
                        ...prevInfo,
                        name: data.name,
                        phone: data.phone,
                        nim: data.nim,
                        jurusan: data.jurusan
                    }));
                }
            });
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
        setShowModal(true);

    };

    const handleConfirm = (e) => {
        e.preventDefault();
        setShowModal(false);
        const { startDate, endDate } = requesterInfo;
        const currentDate = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        if (!startDate || !endDate || start > end) {
            alert("Please ensure the start date is before the end date and both dates are provided.");
            return;
        }

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
        console.log("Selected Equipment: ", selectedEquipment);
        const newRequest = {
            equipmentId: selectedEquipment,
            equipmentName: selectedEquipment,
            requesterInfo,
            lab: selectedEquipment.replace("Lab ", ""),
            timestamp: Date.now()
        };
        push(requestRef, newRequest)
            .then(() => {
                console.log("Request submitted successfully");
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




    return (
        <div className="container mt-5">
            <h2 className="text-center">Book a Lab</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <h4 htmlFor="requesterinfo">Requester's Info</h4>
                    <div className="row">
                        <div className="col">
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
                                    readOnly
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
                                    readOnly
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
                                    readOnly
                                    required
                                />
                            </div>
                            <div>
                                <label>Jurusan</label>
                                <input
                                    className="form-control"
                                    aria-label="Default select example"
                                    name="jurusan"
                                    value={requesterInfo.jurusan}
                                    onChange={handleInputChange}
                                    required
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className="col">
                            <label>Purpose</label>
                            <textarea
                                className="form-control"
                                id="purpose"
                                name="purpose"
                                placeholder="Enter the purpose of your request"
                                rows="11"
                                value={requesterInfo.purpose}
                                onChange={handleInputChange}
                                required
                            ></textarea>
                        </div>
                    </div>
                    <label>Booking Period</label>
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
                            <label>Start Time</label>
                            <input
                                type="time"
                                className="form-control"
                                id="startTime"
                                name="startTime"
                                value={requesterInfo.startTime  || "08:00"}
                                onChange={handleInputChange}
                                required
                                style={{ display: 'block' }}
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
                        <div className="col">
                            <label>End Time</label>
                            <input
                                type="time"
                                className="form-control"
                                id="endTime"
                                name="endTime"
                                value={requesterInfo.endTime  || "20:00"}
                                onChange={handleInputChange}
                                required
                                style={{ display: 'block' }}
                            />
                        </div>
                    </div>
                    <label htmlFor="equipmentSelect">Select Lab:</label>
                    <div className="row">
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <select
                                        id="equipmentSelect"
                                        className="form-control"
                                        value={selectedEquipment}
                                        onChange={(e) => setSelectedEquipment(e.target.value)}
                                    >
                                        <option value="" disabled>Select Lab</option>
                                        <option value="Lab 103" >Lab 103 Expression Technique</option>
                                        <option value="Lab 104" >Lab 104 Monozukuru</option>
                                        <option value="Lab 106" >Lab 106 Physics </option>
                                        <option value="Lab 107" >Lab 107 Ergonomics </option>
                                        <option value="Lab 111" >Lab 111 Computer</option>
                                        <option value="Lab 207" >Lab 207 3D Design</option>
                                        <option value="Lab 207" >Lab 208 Computer</option>
                                        <option value="Lab 207" >Lab 209 Computer</option>

                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary mt-3" >Submit Request</button>
            </form>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Submission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <h3>Peraturan dan tata tertib pemakaian ruang Laboratorium:</h3>
                        <p>

                            Bacalah semua petunjuk penggunaan peralatan lab sebelum menggunakan Laboratorium
                        </p>
                        <ul className="list-group mt-3">
                            <li className="list-group-item">
                                Gunakan peralatan Laboratorium dengan hati-hati. Dilarang makan dan minum di dalam Laboratorium.
                            </li>
                            <li className="list-group-item">
                                Dilarang berlari-larian maupun melakukan hal yang tidak semestinya yang dapat membahayakan orang lain di dalam Laboratorium.
                            </li>
                            <li className="list-group-item">
                                Bagi yang membawa makanan atau minuman harap disimpan pada tempat yang disediakan, tidak menaruh di atas meja komputer karena dapat membahayakan pengguna lab jika air tumpah mengenai komponen komputer.
                            </li>
                            <li className="list-group-item">
                                Gunakanlah peralatan seperti sarung tangan, kacamata pelindung, dan masker (Khusus expression technique lab).
                            </li>
                            <li className="list-group-item">
                                Simpanlah tas di tempat yang telah ditentukan.
                            </li>
                            <li className="list-group-item">
                                Simpanlah kembali peralatan yang telah dibersihkan setelah digunakan pada tempatnya.
                            </li>
                            <li className="list-group-item">
                                Jagalah kebersihan Laboratorium dan bersihkan kembali ketika selesai menggunakan lab.
                            </li>
                            <li className="list-group-item">
                                Jika terdapat hal yang dirasa butuh bantuan dari asisten laboratorium, harap lapor pada staff laboratorium atau asisten lab yang terkait.
                            </li>
                            <li className="list-group-item">
                                Untuk peminjaman di luar praktikum, mohon menghubungi asisten laboratorium atau staff laboratorium dan kemudian diisi log-book peminjaman. Pengembalian peminjaman, harap diinformasikan kepada asisten laboratorium atau staff laboratorium dengan mengisi log-book.
                            </li>
                        </ul>
                        <br />
                    </>
                    <Form.Check
                        type="checkbox"
                        label="Saya bersetuju dengan peraturan yang diberikan"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleConfirm} disabled={!isChecked}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Request;