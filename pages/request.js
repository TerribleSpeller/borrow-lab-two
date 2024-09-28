import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, push } from "firebase/database";
import { database } from "./firebase";
import { auth } from "./firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Modal, Button, Form } from 'react-bootstrap';
import { RulesBorrow } from "./components/rules.jsx";


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
    const [selectedEquipment, setSelectedEquipment] = useState(id ? [id]: []);
    const [searchQuery, setSearchQuery] = useState("");
    const [labOptions, setLabOptions] = useState([]);
    const [availableQty, setAvailableQty] = useState(0);
    const user = useAuth();
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
        endDate: ""
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

    useEffect(() => {
        if (!user) {
            alert("Please Log In")
            router.push('/login');
        } else {
            console.log("Confirmed")
        }
    })

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

    const handleEquipmentChange = (event) => {
        const value = event.target.value;
        setSelectedEquipment((prevSelected) =>
            [...prevSelected, value]
        );
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Request Equipment</h2>
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
            <button type="" className="btn btn-primary mt-3" disabled={availableQty === 0} onClick={handleEquipmentChange}>Add to List</button>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Submission</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <h3>Peraturan Peminjaman Barang Laboratorium:</h3>
                        <p>
                            <strong>Penggunaan Dalam Kampus</strong>
                            <br/>
                            Barang laboratorium hanya diperbolehkan digunakan di area kampus.
                        </p>
                        <p>
                            <strong>Durasi Peminjaman</strong>
                            <br/>
                            Peminjaman barang laboratorium disarankan untuk jangka waktu 1 hari. Jika memerlukan waktu lebih dari 1 hari, maka peminjam harus berkoordinasi terlebih dahulu dengan dosen pembimbing.
                        </p>
                        <p>
                            <strong>Pengajuan Peminjaman Jangka Panjang</strong>
                            <br/>
                            Jika dosen pembimbing mengizinkan peminjaman jangka panjang, maka peminjam wajib mengirimkan email kepada kepala laboratorium  (benedictus.rahardjo@binus.edu) dan cc kepala program untuk diketahui bersama-sama.
                        </p>
                        <p>
                            <strong>Batas Maksimal Peminjaman</strong>
                            <br/>
                            Batas maksimal peminjaman barang laboratorium adalah 1 bulan .
                        </p>
                        <p>
                            <strong>Perpanjangan Peminjaman</strong>
                            <br/>
                            Setelah 1 bulan, jika peminjam masih memerlukan barang yang dipinjam, maka peminjam perlu mengajukan permohonan ulang peminjaman dari proses awal.
                        </p>
                        <p>
                            <strong>Pengembalian Barang Pinjaman</strong>
                            <br/>
                            Peminjam wajib mengembalikan barang yang dipinjam kepada laboran secara langsung.
                        </p>
                        <p>
                            <strong>Tanggung Jawab atas Kerusakan atau Kehilangan</strong>
                            <br/>
                            Jika peminjam merusak atau menghilangkan barang laboratorium, peminjam wajib mengganti rugi senilai harga barang tersebut atau mengganti barang baru dengan tipe dan spesifikasi yang sama persis.
                        </p>
                        <p>
                            Semua peminjam wajib mematuhi peraturan ini demi kelancaran dan keamanan penggunaan barang laboratorium. Terima kasih atas kerjasamanya.
                        </p>
                        <p>
                            Tertanda,
                        </p>
                        <p>
                            Laboratorium
                        </p>
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