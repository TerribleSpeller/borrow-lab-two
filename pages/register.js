import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';
import { app } from './firebase';

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        nim: '',
        jurusan: 'ARE'
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        const auth = getAuth(app);
        const db = getDatabase(app);

        //Check if the email ends with @binus.ac.id
        if (!formData.email.endsWith('@binus.ac.id')) {
            setError('Email must end with @binus.ac.id');
            setSuccess('');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
            const user = userCredential.user;

            //Save to users

            await set(ref(db, 'users/' + user.uid), {
                email: formData.email,
                name: formData.name,
                phone: formData.phone,
                nim: formData.nim,
                jurusan: formData.jurusan
            });

            setSuccess('User registered successfully!');
            setError('');
        } catch (error) {
            setError(error.message);
            setSuccess('');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Register your Lab Account</h2>
            <form onSubmit={handleRegister}>
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="text"
                            className="form-control"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col">
                        <label htmlFor="name" className="form-label">Jurusan</label>
                        <select
                            className="form-select"
                            aria-label="Default select example"
                            name="jurusan"
                            value={formData.jurusan}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="ARE">Automotive and Robotics Engineering</option>
                            <option value="PDE">Product Design Engineering</option>
                            <option value="BE">Business Engineering</option>
                        </select>
                    </div>
                    <div className="mb-3 col">
                        <label htmlFor="phone" className="form-label">NIM</label>
                        <input
                            type="text"
                            className="form-control"
                            id="nim"
                            name="nim"
                            value={formData.nim}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>


                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
}

export default Register;