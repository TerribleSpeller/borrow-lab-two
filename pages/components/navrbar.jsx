"use client";
import React from "react";
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';
import BaseLogo from '../../public/images/logo_BASE.png'
import { useAuth } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";



const Navbar = () => {
    const { user } = useAuth();


    const handleSignOut = async () => {
        await signOut(auth);
    };
    return (
        <div className="container " id="Navbar" >
            <div className="">
                <div className="row bg-light border border-light-subtle border-2 rounded-5 rounded-top-0">
                    <header className="d-flex flex-wrap justify-content-center pt-3">
                        <Image
                            className="bi me-2 icon"
                            width={124}
                            height={96}
                            src={BaseLogo}
                            alt="BASE Logo"
                        />
                        <div className="stacked-title mb-3 mb-md-0 me-md-auto link-body-emphasis  flex-wrap align-self-center">
                            <a
                                href="/"
                                className="d-flex link-module align-items-center mb-0 mb-md-0 me-md-auto link-body-emphasis link-color-unique text-decoration-none"
                            >
                                <span className="fs-4">BINUS ASO SCHOOL OF ENGINEERING LABORATORY WEBSITE</span>
                            </a>
                        </div>
                        <ul className="nav ">
                            {user ? (

                                <li className="nav-item pt-3">
                                    <Link href="/" onClick={handleSignOut} className="nav-link link-module">
                                        <span>Logout</span>
                                    </Link>
                                </li>
                            ) : (
                                <li className="nav-item pt-3">
                                    <Link href="/Login" className="nav-link link-module">
                                        <span>Login</span>
                                    </Link>
                                </li>
                            )

                            }
                            <li className="nav-item pt-3">
                                <div className="dropdown">
                                    <button className="nav-link dropbtn btn">Home</button>
                                    <div class="dropdown-content">
                                        <Link href="/photos" className="nav-link link-module">Photos</Link>
                                        <Link href="/labs" className="nav-link link-module">BASE LABs</Link>
                                    </div>
                                </div>
                            </li>
                            <li className="nav-item pt-3 ">
                                <Link href="/projects" className="nav-link link-module">
                                    <span>Projects</span>
                                </Link>
                            </li>
                            <>

                                {user ? (
                                    <li className="nav-item pt-3">
                                        <div className="dropdown">
                                            < Link href="/equipment" className="nav-link link-module dropbtn">Lab Equipment</Link>
                                            <div class="dropdown-content">
                                                <Link href="/request" className="nav-link link-module">Request Equipment</Link>
                                            </div>
                                        </div>
                                    </li>
                                ) : (
                                    <>
                                    </>
                                )

                                }

                            </>


                            <>
                                {user ? (
                                    <li className="nav-item pt-3 ">
                                        <Link href="/dashboard" className="nav-link link-module">
                                            <span>Dashboard</span>
                                        </Link>
                                    </li>
                                ) : (
                                    <>
                                    </>
                                )}
                            </>


                            <li className="nav-item pt-3 ">
                                <div className="dropdown">
                                    <Link href="/about" className="nav-link link-module dropbtn"><span>About</span></Link>
                                    <div class="dropdown-content">
                                        <Link href="/clubs" className="nav-link link-module">Affliated Clubs</Link>
                                    </div>
                                </div>

                            </li>
                        </ul>
                    </header>
                </div>
                <header className="d-flex flex-wrap justify-content mb-3 pb-2 border-bottom"></header>
            </div>
        </div>

    );
};

export default Navbar;
