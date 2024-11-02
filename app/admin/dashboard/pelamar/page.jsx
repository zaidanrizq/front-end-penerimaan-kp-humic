"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import SubHead from "@components/SubHead";
import DropDownPosisi from "@components/DropDownPosisi";
import DropdownBatch from "@components/DropdownBatch";
import DropdownStatus from "@components/DropdownStatus";
import DropdownActionDashboard from "@components/DropdownActionDashboard";
import HapusModal from "@components/HapusModal";
import GagalHapusLamaranModal from "@components/GagalHapusLamaranModal";
import BerhasilHapusLamaranModal from "@components/BerhasilHapusLamaranModal";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";

/* const exportToPDF = () => {
    const table = document.getElementById('applicationTable'); // Ensure your table has this ID
    
    html2canvas(table).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'pt', 'a4');
        const imgWidth = 500;
        const pageHeight = 800;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 20, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save('applications.pdf');
    });
}; */


const DashboardPelamar = () => {
    
    const router = useRouter();
    const status = ['Lulus', 'Proses', 'Gagal']
    const [isDropdownPosisiVisible, setIsDropdownPosisiVisible] = useState(false);
    const [isDropdownBatchVisible, setIsDropdownBatchVisible] = useState(false);
    const [isDropdownStatusVisible, setIsDropdownStatusVisible] = useState(false);
    const [isDropdownActionVisible, setIsDropdownActionVisible] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [dropdownActionIndex, setDropdownActionIndex] = useState(null);
    const [selectedRole, setSelectedRole] = useState('Posisi');
    const [selectedBatch, setSelectedBatch] = useState('Batch')
    const [selectedStatus, setSelectedStatus] = useState('Status Penerimaan');
    const [applications, setApplications] = useState([]);
    const [roles, setRoles] = useState([]);
    const [batches, setBatches] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
    const [id, setId] = useState(null);
    const [showSuccessDelete, setShowSuccessDelete] = useState(false);
    const [showFailedDelete, setShowFailedDelete] = useState(false);

    const handleClickDelete = (showModal, applicationId) => {
        setIsDropdownActionVisible(!isDropdownActionVisible);
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application-kp/${id}`, {
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
                throw new Error(result.message || "Gagal menghapus lamaran KP!")
            }
        } catch (err) {
            setError(err.message)
            setShowFailedDelete(true);
        }
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

    const handleSelectBatch = (batch) => {
        setSelectedBatch(batch);
        setIsDropdownBatchVisible(false)
    }

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

        const fetchRoles = async () => {

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-kp`)

                const result = await response.json()

                if(response.ok) {

                    setRoles(result.data);

                } else {

                    throw new Error(result.message || "Failed to fetch roles KP.")

                }

            } catch (err) {

                setError(err.message)

            }
        }

        fetchRoles();

        const fetchApplications = async () => {

            const token = sessionStorage.getItem('authToken');

            if (!token) {
                router.push('/admin/login');
                setTimeout(() => {
                    location.reload()
                }, 200);
                return;
            }

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application-kp`, {
                    method: "GET",
                    headers: {
                        "Authorization" : `Bearer ${token}`,
                        "Content-Type"  : "application/json"
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    setApplications(result.data)
                } else {
                    throw new Error(result.message || "Failed to fetch applications")
                }

            } catch (err) {

                setError(err.message);

            } 
        }

        fetchApplications();

    },[router]);

    useEffect(() => {

        const fetchBatches = async () => {

            const token = sessionStorage.getItem('authToken');

            if (!token) {
                router.push('/admin/login');
                setTimeout(() => {
                    location.reload()
                }, 200);
                return;
            }

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/batch`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    setBatches(result.data);
                } else {
                    throw new Error (result.message || "Error fetching batches.")
                }

            } catch (err) {

                setError(err.message);

            } finally {

                setTimeout(() => {
                    setIsLoading(false);
                }, 200);

            }
        };

        fetchBatches();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error {error}</p>
    }

    const filteredApplications = 
        (!selectedRole || selectedRole === "Posisi") && 
        (!selectedStatus || selectedStatus === "Status Penerimaan") && 
        (!selectedBatch || selectedBatch === "Batch")
            ? applications 
            : (selectedRole !== "Posisi") && (selectedStatus !== "Status Penerimaan") && (selectedBatch !== "Batch")
            ? applications.filter((application) => 
                application.kp_role.name === selectedRole && 
                application.status === selectedStatus &&
                application.kp_role.batch.number === selectedBatch
            )
            : selectedRole !== "Posisi" && selectedBatch !== "Batch"
            ? applications.filter((application) => 
                application.kp_role.name === selectedRole && 
                application.kp_role.batch.number === selectedBatch
            )
            : selectedStatus !== "Status Penerimaan" && selectedBatch !== "Batch"
            ? applications.filter((application) => 
                application.status === selectedStatus &&
                application.kp_role.batch.number === selectedBatch
            )
            : selectedRole !== "Posisi"
            ? applications.filter((application) => application.kp_role.name === selectedRole)
            : selectedStatus !== "Status Penerimaan"
            ? applications.filter((application) => application.status === selectedStatus)
            : applications.filter((application) => application.kp_role.batch.number === selectedBatch);

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
                            <h1 className="font-yesevaOne font-normal text-[32px]">{applications.length}</h1>
                        </div>
                        <div className="flex flex-col justify-center items-center bg-[#C1FFB2] ml-[16px] w-full rounded-xl hover:shadow-xl transition-all duration-[250ms]">
                            <h1 className="font-workSans font-medium text-[26px]">Jumlah Posisi Magang</h1>
                            <h1 className="font-yesevaOne font-normal text-[32px]">{roles.length}</h1>
                        </div>
                    </div>
                    <div className="w-full ">
                        <table id="applicationTable" className="w-full table-auto font-workSans text-white bg-primary rounded-xl border-collapse hover:shadow-xl transition-all duration-[250ms]">
                            <thead>
                                <tr className="text-center">
                                    <th 
                                        colSpan="7" 
                                        className="font-medium text-[26px] pt-[16px] pb-[8px]"
                                    >
                                        Pelamar Kerja Praktik
                                    </th>
                                </tr>
                                <tr className="text-center">
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
                                            roles={roles}
                                            isVisible={isDropdownPosisiVisible}
                                            onSelect={handleSelectRole}
                                        />
                                    </th>
                                    <th className="font-normal text-[18px] py-[8px] px-[24px] border-gray-300">
                                        <button 
                                            className="inline-flex items-center hover:text-accent"
                                            type="button"
                                            onClick={() => setIsDropdownBatchVisible(!isDropdownBatchVisible)}
                                        >
                                            {selectedBatch}
                                            { isDropdownBatchVisible ? (
                                                <FaAngleUp className="ml-[8px] w-[15px] h-[15px]"/>
                                            ) : (
                                                <FaAngleDown className="ml-[8px] w-[15px] h-[15px]"/>
                                            )}
                                        </button>
                                        <DropdownBatch 
                                            batches={batches}
                                            isVisible={isDropdownBatchVisible}
                                            onSelect={handleSelectBatch}
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
                                {filteredApplications.map((application, index) => (
                                    <tr 
                                        key={index} 
                                        className={`text-center text-black border-2 border-gray-100 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                                    >
                                        <td className="px-[24px] py-[20px] ">{application.user.full_name}</td>
                                        <td className="px-[24px] py-[20px] ">{application.kp_role.name}</td>
                                        <td className="px-[24px] py-[20px] ">{application.kp_role.batch.number}</td>
                                        <td className="px-[24px] py-[20px] hover:underline underline-offset-4">
                                            <a 
                                                href={`${application.user.cv}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                Click Here
                                            </a>
                                        </td>
                                        <td className="px-[24px] py-[20px]  hover:underline underline-offset-4">
                                            <a 
                                                href={`${application.user.portfolio}`}
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                Click Here
                                            </a>
                                        </td>
                                        <td className="px-[24px] py-[20px] flex justify-center">
                                            <div 
                                                className={`w-[124px] py-[4px] rounded-full ${application.status === 'Lulus' ? ('bg-[#2FB425]') : application.status === 'Gagal' ? ('bg-primary') : application.status === 'Proses' ? ('bg-accent') : ('bg-black') }`}
                                            >
                                                <p className="text-center text-white">{application.status}</p>
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
                                                    onClickDelete={() => handleClickDelete(true, application.application_id)}
                                                    onClickDetail={() => handleDetailButton(application.application_id)}
                                                />
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="self-end ">
                        <button 
                            onClick={() => router.push('/admin/dashboard/pelamar/download')} 
                            className="bg-accent text-white p-3 rounded-md hover:bg-primary transition mt-[24px] w-[250px]"
                        >
                            Download as PDF
                        </button>
                    </div>
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

export default DashboardPelamar