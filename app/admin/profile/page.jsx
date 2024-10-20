"use client"

import SubHead from "@components/SubHead"
import LogoutModal from "@components/LogoutModal"

import { useState } from "react"
import { useRouter } from "next/navigation"

const AdminProfilePage = () => {

    const router = useRouter()
    const [showModal, setShowModal] = useState(false)

    const handleLogout = () => {
        router.push("/admin/login")
        setTimeout(() => {
            window.location.reload();
        }, 100);
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
                <div className="py-[92px] px-[64px] bg-primary rounded-[30px] flex flex-col mb-[92px]">
                    <table className="table-auto text-left w-[300px]">
                        <tbody className="font-workSans font-normal text-[16px] text-white">
                            <tr >
                                <td className="pb-[24px]">Nama Lengkap</td>
                                <td className="pb-[24px]">:</td>
                                <td className="pl-2 pb-[24px]">Admin</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="flex flex-row justify-end mt-[64px] mx-[32px]">
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

export default AdminProfilePage