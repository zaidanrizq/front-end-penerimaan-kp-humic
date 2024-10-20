"use client"

import SubHead from "@components/SubHead"
import DropdownStatusMagangDetail from "@components/DropdownStatusMagangDetail";
import EditedModal from "@components/EdittedModal";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image"

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

import roleData from "@constants/InternshipRoles"

const DetailPosisiMagangPage = ({ params }) => {
    const router = useRouter()
    const status = ['Dibuka', 'Ditutup']
    const id = params.id
    const role = roleData.filter((r) => r.id == id)[0]

    if (!role) {
        router.push('/404')
        return null;
    }

    const [isDropdownStatusVisible, setIsDropdownStatusVisible] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(role.status);

    const handleToggleDropdownStatus = () => {
        setIsDropdownStatusVisible(!isDropdownStatusVisible)
    };

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        setIsDropdownStatusVisible(false);
    };

    const [showModal, setShowModal] = useState(false);

    const handleConfirmation = () => {
        setShowModal(false)
        router.push('/admin/dashboard/posisi-magang')
    }

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-dashboard.svg"
                title="Detail"
                subTitle="Form Penerimaan Magang / Detail"
            />
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center justify-center w-full mx-[25%] my-[64px]">
                    <div>
                        <Image
                            src={role.image}
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-[48px] w-full gap-[24px] font-workSans font-normal text-[16px] text-black">
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Posisi</label>
                            <input
                                    type="text"
                                    value={role.name}
                                    className="w-full px-[16px] py-[8px] border border-1 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Deskripsi</label>
                            <textarea
                                value={role.description}
                                className="text-start w-full h-[200px] px-[16px] py-[8px] border border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Skills yang diperlukan</label>
                            <textarea
                                value={role.skills}
                                className="text-start w-full h-[100px] px-[16px] py-[8px] border border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Status Magang</label>
                            <div className="flex flex-col">
                                <button 
                                    className="w-[35%] px-[16px] py-[8px] -mb-[20px] flex flex-row justify-between items-center border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                                    type="button"
                                    onClick={handleToggleDropdownStatus}
                                >
                                    {selectedStatus}
                                    { isDropdownStatusVisible ? (
                                        <FaAngleUp className="ml-[8px] w-[15px] h-[15px]"/>
                                    ) : (
                                        <FaAngleDown className="ml-[8px] w-[15px] h-[15px]"/>
                                    )}
                                </button>
                                <DropdownStatusMagangDetail
                                    stats={status}
                                    isVisible={isDropdownStatusVisible}
                                    onSelect={handleSelectStatus}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between w-full mt-[64px]">
                            <button 
                                className="accent-square-btn w-[200px] hover:bg-primary transition-all duration-300"
                                onClick={router.back}
                            >
                                Batal
                            </button>
                            <button 
                                className="accent-square-btn w-[200px] hover:bg-primary transition-all duration-300"
                                onClick={() => {setShowModal(true)}}
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <EditedModal
                show={showModal}
                onConfirm={handleConfirmation}
            />
        </>
    )
}

export default DetailPosisiMagangPage