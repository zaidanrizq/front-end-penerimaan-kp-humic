"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import LoginForm from "@components/LoginForm"

const Login = () => {

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        const REST_API_ENDPOINT = "http://localhost:5000/login"

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

                const { token } = responseData;

                localStorage.setItem('authToken', token)

                router.push('/penerimaan_kp')
            } else {
                alert(`Registration failed: ${responseData.message}`);
            }

        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during log in.');
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
                handleChange={handleChange}
                handleSubmit={handleSubmit}
            />
        </div>
    )
}

export default Login