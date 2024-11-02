"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisterForm from "@components/RegisterForm"
import BerhasilRegisterUserModal from "@components/BerhasilRegisterUserModal";

const Register = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [userExisted, setUserExisted] = useState(false)
    const [showError, setShowError] = useState(false)
    const router = useRouter()
    const [showSuccessRegister, setShowSuccessRegister] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('authToken');

            if (!token) {
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (!response.ok || !data.valid) {
                    return;
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Error verifying token:", error);
            }
        };

        checkAuth();
    }, []);

    if (isLoggedIn) {
        router.push('/')
    }

    const [data, setData] = useState({
        full_name: "",
        nim: "",
        perguruan_tingg: "",
        prodi: "",
        phone_number: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                setShowSuccessRegister(true);
            } else {
                setUserExisted(true)
            }
        } catch (error) {
            setShowError(true)
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center py-[92px] px-[184px]">
                <div className="flex flex-col justify-center text-center mb-[64px]">
                    <h1 className="font-yesevaOne font-normal text-[32px] text-primary">
                        Registrasi Sekarang
                    </h1>
                    <h2 className="font-workSans font-bold text-[18px] text-black tracking-[0.15em]">
                        ISI FORM BERIKUT UNTUK MELANJUTKAN.
                    </h2>
                </div>
                <RegisterForm 
                    data={data}
                    userExisted={userExisted}
                    showError={showError}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                />
                <div className="text-black font-inter font-normal text-[16px] text-center mt-[48px]">
                    Sudah memiliki akun?
                    <Link href="/login" className="text-primary hover:underline ml-1">
                        Log In
                    </Link>
                </div>
            </div>
            <BerhasilRegisterUserModal
                show={showSuccessRegister}
                onConfirm={() => router.push('/login')}
            />
        </>
    )
};

export default Register