"use client"

import SubHead from "@components/SubHead"
import { useRouter } from "next/navigation"
import roleData from "@constants/InternshipRoles"
import Image from "next/image"

const Page = ({ params }) => {

    const role = roleData.find((data) => data.slug === params.slug)
    const router = useRouter()

    if (!role) {
        router.push('/404')
        return null
    }

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-role.svg"
                title={role.name}
                subTitle={`Penerimaan Magang / ${role.name}`}
            />
            <div>
                <div className="flex flex-row justify-center items-center mx-[216px] my-[48px]">
                    <div className="m-[100px]">
                        <Image
                            src={role.image}
                            alt={role.name}
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        <h1 className="font-yesevaOne font-normal text-[32px] text-primary">{role.name}</h1>
                        <div className="flex flex-col font-workSans font-normal text-[16px] gap-[8px]">
                            <h3>Job Description</h3>
                            <p>{role.description}</p>
                        </div>
                        <div className="flex flex-row font-workSans font-medium text-[16px] gap-[48px]">
                            <h3>Kemampuan yang diperlukan</h3>
                            <p>{role.skills}</p>
                        </div>
                        <button className="accent-square-btn w-[150px] hover:bg-primary transition-all duration-300">
                            Daftar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page