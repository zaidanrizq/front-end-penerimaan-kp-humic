"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import SubHead from "@components/SubHead"
import IsiProfileModal from "@components/IsiProfileModal"
import KonfirmasiDaftarMagangModal from "@components/KonfirmasiDaftarMagangModal"
import BerhasilDaftarMagangModal from "@components/BerhasilDaftarMagangModal"
import GagalDaftarMagangModal from "@components/GagalDaftarMagangModal"
import SudahMendaftarMagangModal from "@components/SudahMendaftarMagangModal"

import { FaCheck } from "react-icons/fa";

const Page = ({ params }) => {

    const router = useRouter()
    const id = params.id;
    const token = localStorage.getItem('authToken');
    const [role, setRole] = useState([]);
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showIsiProfileModal, setShowIsiProfileModal] = useState(false)
    const [showConfirmModal, setShowConfirmModal] = useState(false)
    const [showFailedModal, setShowFailedModal] = useState(false)
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [showAlreadyRegistered, setShowAlreadyRegistered] = useState(false)

    useEffect(() => {

        const checkAuth = async () => {

            if (!token) {
                router.push("/login")
                setTimeout(() => {
                    location.reload()
                }, 200);
                return;
            }
    
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
    
                const data = await response.json();
    
                if (!response.ok || !data.valid) {
                    localStorage.removeItem("authToken");
                    router.push("/login")
                    setTimeout(() => {
                        location.reload()
                    }, 200);
                } else {
                    setUser(data.data)
                }
            } catch (error) {
                console.error("Error verifying token:", error);
            } 
        }

        checkAuth();

        const fetchRole = async (id) => {
            
            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-kp/${id}`)

                const result = await response.json()

                if (response.ok) {

                    const now = new Date();

                    if (now >= new Date(result.data.batch.opened_at) && now <= new Date(result.data.batch.closed_at)) {
                        setRole(result.data)
                    } else {
                        router.push('/penerimaan-magang')
                        return;
                    }
                } else {
                    throw new Error(result.message || "Failed to fetch roles KP.")
                }
            
            } catch (err) {
                setError(err.message);
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                }, 250)
            }
        };

        fetchRole(id);
    },[router]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    const handleDaftar = () => {

        if (user.kp_application !== null) {
            setShowAlreadyRegistered(true)
            return;
        }

        const optionalFields = ['profile_picture', 'portfolio', 'kp_application'];

        const missingFields = Object.keys(user)
        .filter(key => !optionalFields.includes(key))
        .filter(key => user[key] == null || user[key] == "");

        if (missingFields.length > 0) {
            setShowIsiProfileModal(true)
        } else {
            setShowConfirmModal(true)
        }

    }

    const handleConfirm = async (e) => {

        e.preventDefault();

        try {

            const roleId = role.role_id

            const response = await fetch( `${process.env.NEXT_PUBLIC_API_URL}/application-kp`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ roleId })
            });
    
            const result = await response.json();
            
            if (response.ok) {
                setShowConfirmModal(false);
                setShowSuccessModal(true);
            } else {
                setError(result.message);
                setShowConfirmModal(false);
                setShowFailedModal(true)
            }

        } catch (error) {

            setError(error)

        }

    }

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-role.svg"
                title={role.name}
                subTitle={`Penerimaan Magang / ${role.name}`}
            />
            <div>
                <div className="flex flex-row justify-center items-center mx-[164px] my-[48px]">
                    <div className="my-[100px] mr-[100px]">
                        <img
                            src={role.role_image}
                            alt={role.name}
                            className="max-w-[400px] max-h-[400px] object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        <h1 className="font-yesevaOne font-normal text-[32px] text-primary">{role.name}</h1>
                        <div className="flex flex-col font-workSans font-normal text-[16px] gap-[8px]">
                            <h3>Job Description</h3>
                            <p>{role.description}</p>
                        </div>
                        <div className="flex flex-row font-workSans font-medium text-[16px] gap-[48px] mb-[16px]">
                            <h3 className="w-[350px]">Kemampuan yang diperlukan</h3>
                            <p>{role.kualifikasi}</p>
                        </div>
                        {
                            !user.kp_application
                            ?
                            (
                                <button 
                                    className="accent-square-btn w-[150px] hover:bg-primary transition-all duration-300"
                                    onClick={handleDaftar}
                                >
                                    Daftar
                                </button>
                            )
                            :
                            user.kp_application.role_id === role.role_id
                            ?
                            (
                                <div className="flex flex-row justify-center items-center bg-accent hover:bg-primary rounded-lg max-w-[200px] gap-[8px] h-[42px]"> 
                                    <p className="font-workSans font-normal text-[16px] text-white select-none"> 
                                        Sudah Terdaftar
                                    </p>
                                    <FaCheck
                                        className="text-white w-[16px] h-[16px]"
                                    />
                                </div>
                            )
                            :
                            (
                                <button 
                                    className="accent-square-btn w-[150px] hover:bg-primary transition-all duration-300"
                                    onClick={handleDaftar}
                                >
                                    Daftar
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
            <IsiProfileModal
                show={showIsiProfileModal}
                onEdit={() => router.push('/profile/ubah-profile')}
                onClose={() => setShowIsiProfileModal(false)}
            />
            <KonfirmasiDaftarMagangModal
                show={showConfirmModal}
                onConfirm={handleConfirm}
                onBatal={() => setShowConfirmModal(false)}
                onClose={() => setShowConfirmModal(false)}
            />
            <BerhasilDaftarMagangModal
                show={showSuccessModal}
                onConfirm={() => location.reload()}
            />
            <GagalDaftarMagangModal 
                show={showFailedModal}
                onConfirm={() => setShowFailedModal(false)}
            />
            <SudahMendaftarMagangModal
                show={showAlreadyRegistered}
                onEdit={() => router.push('/profile/ubah-profile')}
                onBatal={() => setShowAlreadyRegistered(false)}
                onClose={() => setShowAlreadyRegistered(false)}
            />
        </>
    )
}

export default Page