"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import LoginForm from "@components/LoginForm"

const Login = () => {
    const [showNotValid, setShowNotValid] = useState(false)
    const [showError, setShowError] = useState(false)

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const router = useRouter()

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
                        'Content-Type': 'application/json',
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
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const responseData = await response.json()

            if (response.ok) {

                const { token } = responseData;

                localStorage.setItem('authToken', token)
                                
                router.push('/')

                setTimeout(() => {
                    window.location.reload();
                }, 100);

            } else {
                setShowNotValid(true);
            }

        } catch (error) {
            setShowError(true);
        }
    }

    return (
        <div className="flex flex-col justify-center py-[92px] px-[184px]">
            <div className="flex flex-col justify-center text-center mb-[64px]">
                <h1 className="font-yesevaOne font-normal text-[32px] text-primary">
                    Selamat Datang
                </h1>
                <h2 className="font-workSans font-bold text-[18px] text-black tracking-[0.15em]">
                    ISI FORM BERIKUT UNTUK MELANJUTKAN.
                </h2>
            </div>
            <LoginForm
                data={data}
                showNotValid={showNotValid}
                showError = {showError}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
            <div className="text-black font-inter font-normal text-[16px] text-center mt-[48px]">
                Belum punya akun?
                <Link href="/register" className="text-primary hover:underline ml-1">
                    Register
                </Link>
            </div>
        </div>
    )
}

export default Login