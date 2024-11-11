"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Image from "next/image";

import AuthMagangModal from "./AuthMagangModal";

const RoleMagangCard = ({ role }) => {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            const REST_API_ENDPOINT = `${process.env.NEXT_PUBLIC_API_URL}/verify-token`;
            const token = localStorage.getItem('authToken');

            if (!token) {
                return
            }

            try {
                const response = await fetch(REST_API_ENDPOINT, {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                const data = await response.json();

                if (!response.ok || !data.valid) {
                    return
                } else {
                    setIsLoggedIn(true);
                }
            } catch (error) {
                console.error("Error verifying token:", error);
                setIsLoading(false);
            }
        }

        checkAuth()

    }, [])

    return (
        <div className="flex flex-col justify-evenly w-[360px] h-[500px] border-2 rounded-lg border-primary/[.15] shadow-md hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center items-center h-full my-[16px]">
                <img
                    src={role.role_image}
                    alt={role.name}
                    className="w-[250px] h-[250px] object-cover"
                />
            </div>
            <div className="flex flex-col mx-[24px] mb-[24px] font-workSans">
                <h1 className="font-medium text-[26px] text-primary">
                    {role.name}
                </h1>
                <p className="font-medium text-[18px] mt-[8px] line-clamp-3">
                    {`${new Date(role.batch.opened_at).toLocaleDateString('en-GB')} - ${new Date(role.batch.closed_at).toLocaleDateString('en-GB')}`}
                </p>
                <p className="font-light text-[16px] mt-[8px] line-clamp-3">
                    {role.description}
                </p>
                {isLoggedIn ? (
                    <button
                        className="w-[66px] flex flex-row items-center mt-[16px] hover:underline hover:decoration-primary"
                        onClick={() => router.push(`/penerimaan-magang/${role.role_id}`)}
                    >
                        <p className="font-normal text-[16px] text-primary">
                            Detail
                        </p>
                        <Image
                            src="/assets/icons/right-arrow.svg"
                            alt="arrow"
                            width={11}
                            height={10}
                            className="fill-accent ml-[8px]"
                        />
                    </button>
                ) : (
                    <button
                        className="w-[66px] flex flex-row items-center mt-[16px] hover:underline hover:decoration-primary"
                        onClick={() => setShowModal(true)}
                    >
                        <p className="font-normal text-[16px] text-primary">
                            Detail
                        </p>
                        <Image
                            src="/assets/icons/right-arrow.svg"
                            alt="arrow"
                            width={11}
                            height={10}
                            className="fill-accent ml-[8px]"
                        />
                    </button>
                )}
            </div>
            <AuthMagangModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onRegister={() => router.push("/register")}
                onLogin={() => router.push("/login")}
            />
        </div>
    )
}

export default RoleMagangCard;