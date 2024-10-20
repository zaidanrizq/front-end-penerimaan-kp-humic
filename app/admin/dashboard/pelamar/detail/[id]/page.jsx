"use client"

import SubHead from "@components/SubHead";
import DropdownStatusPenerimaan from "@components/DropdownStatusPenerimaan";
import EditedModal from "@components/EdittedModal";
import Image from "next/image";
import applicants from "@constants/Applicants";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

const DetailPelamarPage = ({ params }) => {
    const status = ['Lolos', 'Proses', 'Gagal']
    const [isDropdownStatusVisible, setIsDropdownStatusVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()
    const id = params.id
    const applicantData = applicants.filter((applicant) => applicant.id == id)[0]

    if (!applicantData) {
        router.push('/404')
        return null;
    }

    const [selectedStatus, setSelectedStatus] = useState(applicantData.status_penerimaan);

    const handleToggleDropdownStatus = () => {
        setIsDropdownStatusVisible(!isDropdownStatusVisible)
    };

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        setIsDropdownStatusVisible(false);
    };

    const handleConfirmation = () => {
        setShowModal(false)
        router.push('/admin/dashboard/pelamar')
    }

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-dashboard.svg"
                title="Detail"
                subTitle="Dashboard / Detail"
            />
            <div className="flex justify-center items-center">
                <div className="flex flex-col items-center justify-center w-full mx-[25%] my-[64px]">
                    <div>
                        <Image
                            src="/assets/icons/profile.svg"
                            alt="Profile Picture"
                            width={250}
                            height={250}
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-[48px] w-full gap-[24px] font-workSans font-normal text-[16px] text-black">
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Nama Lengkap</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Gender</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Tanggal Lahir</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Email</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Nomor Handphone</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Perguruan Tinggi</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>NIM</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Prodi</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>CV</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Portofolio</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Posisi</label>
                            <input
                                    type="text"
                                    value="TEXT"
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Status Penerimaan</label>
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
                                <DropdownStatusPenerimaan
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

export default DetailPelamarPage;