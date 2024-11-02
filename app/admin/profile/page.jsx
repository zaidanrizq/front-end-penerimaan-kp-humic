"use client"

import SubHead from "@components/SubHead"
import LogoutModal from "@components/LogoutModal"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const AdminProfilePage = () => {

    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const handleLogout = () => {
        sessionStorage.removeItem('authToken');
        router.push("/admin/login")
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)

    useEffect(() => {

        const checkAuth = async () => {

            const token = sessionStorage.getItem('authToken');

            if (!token) {
                router.push('/admin/login');
                setTimeout(() => {
                    location.reload()
                }, 200);
                return;
            }

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
                    method: "GET",
                    headers: {
                        "Authorization" : `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })

                const result = await response.json();

                if (!response.ok || !result.valid) {
                    sessionStorage.removeItem('authToken');
                    router.push('/admin/login');
                    setTimeout(() => {
                        location.reload()
                    }, 200);
                    return;
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            }
        };

        checkAuth();

    },[router])

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-profile.svg"
                title="Profile"
                subTitle="Profile"
            />
            <div className="flex flex-col justify-center items-center">
                <div className="font-workSans font-medium text-[26px] text-black mt-[64px] mb-[48px] mr-[496px]">
                    <h2>Data Pribadi</h2>
                </div>
                <div className="absolute top-[520px] left-1/2 transform -translate-x-1/2">
                    <img 
                        src="/assets/icons/profile.svg" 
                        alt="Profile Icon" 
                        className="w-[100px] h-[100px] rounded-full"
                    />
                </div>
                <div className="pt-[92px] pb-[64px] px-[64px] bg-primary rounded-[30px] flex flex-col mb-[92px]">
                    <table className="table-auto text-left w-[525px]">
                        <tbody className="font-workSans font-normal text-[16px] text-white">
                            <tr >
                                <td className="pb-[24px] w-[200px]">Nama Lengkap</td>
                                <td className="pb-[24px]">:</td>
                                <td className="pl-2 pb-[24px]">Admin</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-row justify-end items-end mt-[64px] mx-[32px]">
                        <button 
                            onClick={() => setShowModal(true)} 
                            className="nav-white-btn hover:bg-primary hover:text-white transition-all duration-300"
                        >
                            Log Out
                        </button>
                    </div>
                </div>
            </div>
            <LogoutModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleLogout}
            />
        </>
        
    )
}

export default AdminProfilePage