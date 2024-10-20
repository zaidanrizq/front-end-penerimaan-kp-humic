"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import SubHead from "@components/SubHead"
import UbahProfileForm from "@components/UbahProfileForm"

const UbahProfile = () => {

    const router = useRouter()

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
                title="Data"
                subTitle="Profile / Data"
            />
            <div className="flex justify-center items-center">
                <UbahProfileForm/>
            </div>
        </>
    )
}

export default UbahProfile