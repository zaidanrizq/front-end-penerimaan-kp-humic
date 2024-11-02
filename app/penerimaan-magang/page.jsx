"use client"

import { useEffect, useState } from "react"

import SubHead from "@components/SubHead"
import RoleMagangCard from "@components/RoleMagangCard"


const PenerimaanMagang = () => {

    const [roleData, setRoleData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchRole = async () => {

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-kp`);

                const result = await response.json();

                if (response.ok) {
                    setRoleData(result.data)
                } else {
                    throw new Error(result.status || "Failed to fetch roles KP.")
                }
            } catch (err) {
                setError(err.message)
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                }, 250)
            }
        };

        fetchRole();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-penerimaan-magang.svg"
                title="Penerimaan Magang"
                subTitle="Penerimaan Magang"
            />
            <div className="flex justify-center">
                <div className="flex flex-wrap w-full max-w-[1128px] my-[64px] gap-[24px]">
                    {roleData.filter((role) => {
                        const now = new Date();
                        const openedAt = new Date(role.batch.opened_at);
                        const closedAt = new Date(role.batch.closed_at);
                        return now >= openedAt && now <= closedAt;
                    }).map((role, index) => (
                        <RoleMagangCard
                            key={index}
                            role={role}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default PenerimaanMagang