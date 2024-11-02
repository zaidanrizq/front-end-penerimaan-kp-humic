"use client"

import SubHead from "@components/SubHead";
import DropdownStatusMagang from "@components/DropdownStatusMagang";
import DropdownActionDashboard from "@components/DropdownActionDashboard";
import HapusModal from "@components/HapusModal";
import GagalHapusLamaranModal from "@components/GagalHapusLamaranModal";
import BerhasilHapusLamaranModal from "@components/BerhasilHapusLamaranModal";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";


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

    const [showModal, setShowModal] = useState(false);
    const [showSuccessDelete, setShowSuccessDelete] = useState(false);
    const [showFailedDelete, setShowFailedDelete] = useState(false);
    const [id, setId] = useState(null);

    const handleClickDelete = (showModal, applicationId) => {
        setIsDropdownActionVisible(false)
        setShowModal(showModal);
        setId(applicationId)
    }

    const handleHapusButton = async () => {
        
        const token = sessionStorage.getItem('authToken');

        if (!token) {
            router.push('/admin/login');
            setTimeout(() => {
                location.reload();
            }, 250);
            return;
        }

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-kp/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const result = await response.json();

            if (response.ok) {
                setShowModal(false);
                setShowSuccessDelete(true);
            } else {
                throw new Error(result.message || "Gagal menghapus posisi KP!")
            }
        } catch (err) {
            setError(err.message)
            setShowFailedDelete(true);
        }
    }

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const [roles, setRoles] = useState([]);

    useEffect(() => {

        const checkAuth = async () => {

            const token = sessionStorage.getItem('authToken');

            if (!token) {
                router.push('/admin/login');
                setTimeout(() => {
                    location.reload()
                }, 200);
                return;
            }

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
                    method: "GET",
                    headers: {
                        "Authorization" : `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })

                const result = await response.json();

                if (!response.ok || !result.valid) {
                    sessionStorage.removeItem('authToken');
                    router.push('/admin/login');
                    setTimeout(() => {
                        location.reload()
                    }, 200);
                    return;
                }

            } catch (err) {
                setError(err.message);
            } 
        };

        checkAuth();

    },[router]);

    useEffect(() => {
        
        const fetchRolesKp = async () => {

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-kp`);

                const result = await response.json();

                if (response.ok) {
                    setRoles(result.data);
                } else {
                    throw new Error(result.status || "Failed to fetch roles KP");
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 250);
            }
        };

        fetchRolesKp();
    }, [router]);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error: {error}</p>
    }

    const filteredRoles = !selectedStatus || selectedStatus === "Status Magang"
    ? roles
    : roles.filter((role) => {
        const now = new Date();
        const isWithinRange = now >= new Date(role.batch.opened_at) && now <= new Date(role.batch.closed_at);
        
        return selectedStatus === "Dibuka" ? isWithinRange : !isWithinRange;
    });

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
                                        colSpan="6" 
                                        className="font-medium text-[26px] pt-[16px] pb-[8px]"
                                    >
                                        Posisi Magang
                                    </th>
                                </tr>
                                <tr className="text-center">
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent">Image</th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent">Posisi</th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300 hover:text-accent">Batch</th>
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
                                {filteredRoles.map((role, index) => (
                                    <tr
                                        key={index} 
                                        className={`text-center text-black border-2 border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                                    >
                                        <td className="px-[24px] py-[20px] ">
                                            <img
                                                src={role.role_image}
                                                width={50}
                                                height={50}
                                                className="w-[50px] h-[50px] object-cover"
                                            />
                                        </td>
                                        <td className="px-[24px] py-[20px] w-[215px]">{role.name}</td>
                                        <td className="px-[24px] py-[20px]"> {role.batch.number}</td>
                                        <td className="px-[24px] py-[20px] text-left">{role.description}</td>
                                        <td className="pl-[40px] py-[20px]">
                                            <div 
                                                className={`w-[124px] py-[4px] rounded-full ${(() => {
                                                    const now = new Date();
                                                    return (now >= new Date(role.batch.opened_at) && now <= new Date(role.batch.closed_at)) 
                                                        ? 'bg-[#2FB425]' 
                                                        : 'bg-primary';
                                                })()}`}
                                            >
                                                <p className="text-center text-white">
                                                    {(() => {
                                                        const now = new Date();
                                                        return (now >= new Date(role.batch.opened_at) && now <= new Date(role.batch.closed_at)) 
                                                            ? 'Dibuka' 
                                                            : 'Ditutup';
                                                    })()}
                                                </p>
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
                                                    onClickDetail={() => handleDetailButton(role.role_id)}
                                                    onClickDelete={() => handleClickDelete(true, role.role_id)}
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
            <GagalHapusLamaranModal
                show={showFailedDelete}
                onConfirm={()=> setShowFailedDelete(false)}
                error={error}
            />
            <BerhasilHapusLamaranModal
                show={showSuccessDelete}
                onConfirm={() => location.reload()}
            />
        </>
    )
}

export default DashboardPosisiMagang