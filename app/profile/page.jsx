"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import LogoutModal from "@components/LogoutModal"
import SubHead from "@components/SubHead"
import Link from "next/link"

const Profile = () => {

    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem("authToken")
        router.push("/login")
        setTimeout(() => {
            window.location.reload();
        }, 100);
    }

    useEffect(() => {

        const checkAuth = async () => {
            const REST_API_ENDPOINT = "http://localhost:5000/verify-token";
            const token = localStorage.getItem('authToken');

            if (!token) {
                router.push("/login")
                return;
            }

            try {

                const response = await fetch(REST_API_ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'authToken': token,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (!response.ok || !data.valid) {
                    router.push("/login")
                } else {
                    return;
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                setIsLoading(false);
            }
        };

        checkAuth();
            
    }, [router]);

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
                <div className="py-[92px] px-[64px] bg-primary rounded-[30px] flex flex-col mb-[92px]">
                    <table className="table-auto text-left">
                        <tbody className="font-workSans font-normal text-[16px] text-white">
                            <tr >
                                <td className="pb-[24px]">Nama Lengkap</td>
                                <td className="pb-[24px]">:</td>
                                <td className="pl-2 pb-[24px]">Zaidan Rizq</td>
                            </tr>
                            <tr >
                                <td className="pb-[24px]">NIM</td>
                                <td className="pb-[24px]">:</td>
                                <td className="pl-2 pb-[24px]">1301213203</td>
                            </tr>
                            <tr >
                                <td className="pb-[24px]">Prodi</td>
                                <td className="pb-[24px]">:</td>
                                <td className="pl-2 pb-[24px]">S1 Informatika</td>
                            </tr>
                            <tr >
                                <td className="pr-[24px] pb-[24px]">Nomor Handphone</td>
                                <td className="pb-[24px]">:</td>
                                <td className="pl-2 pb-[24px]">087822880485</td>
                            </tr>
                            <tr >
                                <td className="pb-[24px]">Email</td>
                                <td className="pb-[24px]">:</td>
                                <td className="pl-2 pb-[24px]">rizqzaidan@student.telkomuniversity.ac.id</td>
                            </tr>
                            <tr >
                                <td className="pb-[24px]">Status Pendaftaran</td>
                                <td className="pb-[24px]">:</td>
                                <td className="pl-2 pb-[24px]">Non</td>
                            </tr>
                            <tr >
                                <td className="pb-[24px]">CV</td>
                                <td className="pb-[24px]">:</td>
                                <td className="pl-2 pb-[24px]">cv.pdf</td>
                            </tr>
                            <tr >
                                <td>Portfolio</td>
                                <td>:</td>
                                <td className="pl-2">portfolio.pdf</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-row justify-between mt-[64px] mx-[32px]">
                        <Link href="/profile/ubah-profile" className="nav-white-btn">
                            Edit
                        </Link>
                        <button 
                            onClick={() => setShowModal(true)} 
                            className="nav-white-btn"
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

export default Profile