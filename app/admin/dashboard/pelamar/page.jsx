"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import SubHead from "@components/SubHead";
import applicants from "@constants/Applicants";
import roleData from "@constants/InternshipRoles";
import DropDownPosisi from "@components/DropDownPosisi";
import DropdownStatus from "@components/DropdownStatus";
import DropdownActionDashboard from "@components/DropdownActionDashboard";
import HapusModal from "@components/HapusModal";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

const DashboardPelamar = () => {
    
    const router = useRouter();
    const status = ['Lolos', 'Proses', 'Gagal']
    const [isDropdownPosisiVisible, setIsDropdownPosisiVisible] = useState(false);
    const [isDropdownStatusVisible, setIsDropdownStatusVisible] = useState(false);
    const [isDropdownActionVisible, setIsDropdownActionVisible] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [dropdownActionIndex, setDropdownActionIndex] = useState(null);
    const [selectedRole, setSelectedRole] = useState('Posisi');
    const [selectedStatus, setSelectedStatus] = useState('Status Penerimaan');

    const handleHapusButton = () => {
        setIsDropdownActionVisible(false)
        setShowModal(false)
    }

    const handleToggleDropdownPosisi = () => {
        setIsDropdownPosisiVisible(!isDropdownPosisiVisible);
    };

    const handleToggleDropdownStatus = () => {
        setIsDropdownStatusVisible(!isDropdownStatusVisible)
    };

    const handleSelectRole = (role) => {
        setSelectedRole(role);
        setIsDropdownPosisiVisible(false); // Close dropdown after selection
    };

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        setIsDropdownStatusVisible(false);
    };

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
        router.push(`/admin/dashboard/pelamar/detail/${id}`);
    }

    const filteredApplicants = 
        (!selectedRole || selectedRole === "Posisi") && (!selectedStatus || selectedStatus === "Status Penerimaan")
            ? applicants 
            : (selectedRole !== "Posisi") && (selectedStatus !== "Status Penerimaan") 
            ? applicants.filter((applicant) => applicant.position === selectedRole && applicant.status_penerimaan === selectedStatus)
            : selectedRole !== "Posisi"
            ? applicants.filter((applicant) => applicant.position === selectedRole)
            : applicants.filter((applicant) => applicant.status_penerimaan === selectedStatus)

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-dashboard.svg"
                title="Dashboard"
                subTitle="Dashboard"
            />
            <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center mx-[7.5%] my-[32px] w-full">
                    <div className="flex flex-row justify-evenly w-full mb-[24px]">
                        <div className="flex flex-col justify-center items-center bg-[#FFFFAE] w-[70%] py-[16px] rounded-xl hover:shadow-xl transition-all duration-[250ms]">
                            <h1 className="font-workSans font-medium text-[26px]">Jumlah Pelamar</h1>
                            <h1 className="font-yesevaOne font-normal text-[32px]">{applicants.length}</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-[#C1FFB2] ml-[16px] w-full rounded-xl hover:shadow-xl transition-all duration-[250ms]">
                            <h1 className="font-workSans font-medium text-[26px]">Jumlah Posisi Magang</h1>
                            <h1 className="font-yesevaOne font-normal text-[32px]">{roleData.length}</h1>
                        </div>
                    </div>
                    <div className="w-full ">
                        <table className="w-full table-auto font-workSans text-white bg-primary rounded-xl border-collapse hover:shadow-xl transition-all duration-[250ms]">
                            <thead>
                                <tr className="text-center">
                                    <th 
                                        colSpan="6" 
                                        className="font-medium text-[26px] pt-[16px] pb-[8px]"
                                    >
                                        Pelamar Kerja Praktik
                                    </th>
                                </tr>
                                <tr className="text-left">
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent">Nama Lengkap</th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300">
                                        <button 
                                            className="inline-flex items-center hover:text-accent"
                                            type="button"
                                            onClick={handleToggleDropdownPosisi}
                                        >
                                            {selectedRole}
                                            { isDropdownPosisiVisible ? (
                                                <FaAngleUp className="ml-[8px] w-[15px] h-[15px]"/>
                                            ) : (
                                                <FaAngleDown className="ml-[8px] w-[15px] h-[15px]"/>
                                            )}
                                        </button>
                                        <DropDownPosisi 
                                            roles={roleData}
                                            isVisible={isDropdownPosisiVisible}
                                            onSelect={handleSelectRole}
                                        />
                                    </th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent">CV</th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent">Portofolio</th>
                                    <th className="text-center font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent">
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
                                        <DropdownStatus 
                                            stats={status}
                                            isVisible={isDropdownStatusVisible}
                                            onSelect={handleSelectStatus}
                                        />
                                    </th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300"></th> {/* For action button */}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApplicants.map((applicant, index) => (
                                    <tr 
                                        key={index} 
                                        className={`text-left text-black border-2 border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                                    >
                                        <td className="px-[24px] py-[20px] ">{applicant.fullname}</td>
                                        <td className="px-[24px] py-[20px] ">{applicant.position}</td>
                                        <td className="px-[24px] py-[20px] hover:underline underline-offset-4">
                                            <a href="">
                                                {applicant.cv}
                                            </a>
                                        </td>
                                        <td className="px-[24px] py-[20px]  hover:underline underline-offset-4">
                                            <a 
                                                href={`https://${applicant.portfolio}`} 
                                                target="_blank" rel="noopener noreferrer">{applicant.portfolio}
                                            </a>
                                        </td>
                                        <td className="px-[24px] py-[20px] flex justify-center">
                                            <div 
                                                className={`w-[124px] py-[4px] rounded-full ${applicant.status_penerimaan === 'Lolos' ? ('bg-[#2FB425]') : applicant.status_penerimaan === 'Gagal' ? ('bg-primary') : applicant.status_penerimaan === 'Proses' ? ('bg-accent') : ('bg-black') }`}
                                            >
                                                <p className="text-center text-white">{applicant.status_penerimaan}</p>
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
                                                    isVisible={isDropdownActionVisible} // The dropdown is visible when the row index matches
                                                    onClickDelete={() => setShowModal(true)}
                                                    onClickDetail={() => handleDetailButton(applicant.id)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <HapusModal
                show={showModal}
                onClose={() => {setShowModal(false)}}
                onConfirm={handleHapusButton}
            />
        </>
    )
}

export default DashboardPelamar