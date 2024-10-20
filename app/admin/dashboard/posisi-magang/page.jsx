"use client"

import SubHead from "@components/SubHead";
import DropdownStatusMagang from "@components/DropdownStatusMagang";
import DropdownActionDashboard from "@components/DropdownActionDashboard";
import HapusModal from "@components/HapusModal";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

import roleData from "@constants/InternshipRoles";

const DashboardPosisiMagang = () => {

    const router = useRouter()

    const status_magang = ['Dibuka', 'Ditutup']
    
    const [isDropdownStatusVisible, setIsDropdownStatusVisible] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState('Status Magang')

    const handleToggleDropdownStatus = () => {
        setIsDropdownStatusVisible(!isDropdownStatusVisible)
    }

    const handleSelectedStatus = (status) => {
        setSelectedStatus(status)
        setIsDropdownStatusVisible(!isDropdownStatusVisible)
    }

    const [dropdownActionIndex, setDropdownActionIndex] = useState(null)
    const [isDropdownActionVisible, setIsDropdownActionVisible] = useState(false)

    const handleToggleAction = (index) => {
        if (dropdownActionIndex === index) {
            setDropdownActionIndex(null)
        } else {
            setDropdownActionIndex(index)
        }
        setIsDropdownActionVisible(true)
    }

    const handleDetailButton = (id) => {
        setIsDropdownActionVisible(false)
        router.push(`/admin/dashboard/posisi-magang/detail/${id}`);
    }

    const [showModal, setShowModal] = useState(false)

    const handleHapusButton = () => {
        setIsDropdownActionVisible(false)
        setShowModal(false)
    }

    const filteredRole = !selectedStatus || selectedStatus === "Status Magang"
        ? roleData
        : roleData.filter((role) => role.status === selectedStatus);

    return(
        <>
            <SubHead
                imagePath="/assets/images/sub-head-dashboard-posisi-magang.svg"
                title="Form Penerimaan Magang"
                subTitle="Form Penerimaan Magang"
            />
            <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center mx-[7.5%] my-[92px] w-full">
                    <div className="w-full">
                        <table className="w-full table-auto font-workSans text-white bg-primary rounded-xl border-collapse hover:shadow-xl transition-all duration-[250ms]">
                            <thead>
                                <tr className="text-center">
                                    <th 
                                        colSpan="5" 
                                        className="font-medium text-[26px] pt-[16px] pb-[8px]"
                                    >
                                        Posisi Magang
                                    </th>
                                </tr>
                                <tr className="text-left">
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent">Image</th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent">Posisi</th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent">Deskripsi</th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent w-[205px]">
                                        <button 
                                            className="inline-flex items-center hover:text-accent"
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
                                        <DropdownStatusMagang 
                                            stats={status_magang}
                                            isVisible={isDropdownStatusVisible}
                                            onSelect={handleSelectedStatus}
                                        />
                                    </th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRole.map((role, index) => (
                                    <tr
                                        key={index} 
                                        className={`text-left text-black border-2 border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                                    >
                                        <td className="px-[24px] py-[20px] ">
                                            <Image
                                                src={role.image}
                                                width={50}
                                                height={50}
                                            />
                                        </td>
                                        <td className="px-[24px] py-[20px] w-[215px]">{role.name}</td>
                                        <td className="px-[24px] py-[20px] ">{role.description}</td>
                                        <td className="px-[24px] py-[20px] w-[200px]">
                                            <div 
                                                className={`w-[124px] py-[4px] rounded-full ${role.status === 'Dibuka' ? ('bg-[#2FB425]') : role.status === 'Ditutup' ? ('bg-accent') : ('bg-black') }`}
                                            >
                                                <p className="text-center text-white">{role.status}</p>
                                            </div>
                                        </td>
                                        <td className="px-[24px] py-[20px]">
                                            <button onClick={() => handleToggleAction(index)}>
                                                <BsThreeDots 
                                                    className="w-[25px] h-[25px]"
                                                />
                                            </button>
                                            {dropdownActionIndex === index && (
                                                <DropdownActionDashboard
                                                    link=""
                                                    isVisible={isDropdownActionVisible}
                                                    onClickDetail={() => handleDetailButton(role.id)}
                                                    onClickDelete={() => setShowModal(true)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button 
                        className="accent-square-btn hover:bg-primary transition-all duration-300 self-end"
                        onClick={() => router.push('/admin/dashboard/posisi-magang/tambah')}
                    >
                        Tambah Form Magang
                    </button>
                </div>
            </div>
            <HapusModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleHapusButton}
            />
        </>
    )
}

export default DashboardPosisiMagang