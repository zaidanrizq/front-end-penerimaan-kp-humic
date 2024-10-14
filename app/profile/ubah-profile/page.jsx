"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import SubHead from "@components/SubHead"
import UbahProfileForm from "@components/UbahProfileForm"

const UbahProfile = () => {

    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("authToken");
    
        if (!token) {
            router.push("/login")
        }
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