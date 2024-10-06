"use client"

import { useState } from "react"
import Link from "next/link";
import RegisterForm from "@components/RegisterForm"

const Register = () => {

    const [data, setData] = useState({
        full_name: "",
        nim: "",
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
        const REST_API_ENDPOINT = "http://localhost:5000/register"

        e.preventDefault()

        try {
            const response = await fetch(REST_API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const responseData = await response.json()

            if (response.ok) {
                alert('Registration successful!');
            } else {
                alert(`Registration failed: ${responseData.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during registration.');
        }
    }

    return (
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
    )
};

export default Register