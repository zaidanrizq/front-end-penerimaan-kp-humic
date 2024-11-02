"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import AdminLoginForm from "@components/AdminLoginForm"


const AdminLogin = () => {

    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showNotValid, setShowNotValid] = useState(false);
    const [showError, setShowError] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin-login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {

                const { token } = result

                sessionStorage.setItem('authToken', token);

                router.push('/admin/dashboard/pelamar');

                setTimeout(() => {
                    window.location.reload();
                }, 100);

            } else {

                setShowNotValid(true);
            }

        } catch (error) {
            setShowError(true);
        }
    };

    useEffect(() => {

        const checkAuth = async () => {

            const token = sessionStorage.getItem('authToken');

            if (!token) {
                return;
            }

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                });

                const result = await response.json();

                if (!response.ok || !result.valid) {
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
        router.push('/admin/dashboard/pelamar');
        return;
    }

    return (
        <div className="flex flex-col justify-center py-[92px] px-[184px]">
            <div className="flex flex-col justify-center text-center mb-[64px]">
                <h1 className="font-yesevaOne font-normal text-[32px] text-primary">
                    Selamat Datang Admin
                </h1>
                <h2 className="font-workSans font-bold text-[18px] text-black tracking-[0.15em]">
                    ISI FORM BERIKUT UNTUK MELANJUTKAN.
                </h2>
            </div>
            <AdminLoginForm
                data={data}
                showNotValid={showNotValid}
                showError = {showError}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default AdminLogin