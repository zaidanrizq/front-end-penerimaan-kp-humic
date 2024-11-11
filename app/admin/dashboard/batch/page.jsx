"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import SubHead from "@components/SubHead";
import DropdownActionDashboard from "@components/DropdownActionDashboard";
import ErrorModal from "@components/ErrorModal";
import HapusModal from "@components/HapusModal";
import GagalHapusBatchModal from "@components/GagalHapusBatchModal";
import BerhasilHapusBatchModal from "@components/BerhasilHapusBatchModal";

import { BsThreeDots } from "react-icons/bs";


const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const DashboardBatch = () => {

    const router = useRouter();

    const [batches, setBatches] = useState([]);
    const [id, setId] = useState(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [dropdownActionIndex, setDropdownActionIndex] = useState(null);
    const [isDropdownActionVisible, setIsDropdownActionVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showSuccessDelete, setShowSuccessDelete] = useState(false);
    const [showFailedDelete, setShowFailedDelete] = useState(false);

    const handleToggleAction = (index) => {
        if (dropdownActionIndex === index) {
            setDropdownActionIndex(null)
        } else {
            setDropdownActionIndex(index)
        }
        setIsDropdownActionVisible(true)
    };

    const handleClickDelete = (showModal, batchId) => {
        setIsDropdownActionVisible(false)
        setShowModal(showModal);
        setId(batchId)
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

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/batch/${id}`, {
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
                throw new Error(result.message || "Gagal menghapus batch!")
            }
        } catch (err) {
            setError(err.message)
            setShowFailedDelete(true);
        }
    }

    useEffect(() => {

        const validateToken = async () => {

            const token = sessionStorage.getItem('authToken');

            if (!token) {
                router.push('/admin/login');
                setTimeout(() => {
                    location.reload
                }, 200);
                return;
            }

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const result = await response.json();

                if (!response.ok || !result.valid) {
                    sessionStorage.removeItem('authToken')
                    router.push('/admin/login')
                    setTimeout(() => {
                        location.reload
                    }, 200);
                }

            } catch (err) {
                setError(err.message);
                setShowError(true);
            }
        }

        validateToken();
    }, [router]);

    useEffect(() => {

        const fetchBatches = async () => {

            const token = sessionStorage.getItem('authToken');

            if (!token) {
                router.push('/admin/login');
                setTimeout(() => {
                    location.reload
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
                    setBatches(result.data)
                } else {
                    throw new Error(result.message || "Failed to fetch batches.")
                }
            } catch (err) {
                setError(err.message);
                setShowError(true);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 200);
            }

        }

        fetchBatches();
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <SubHead
                imagePath={"/assets/images/sub-head-dashboard.svg"}
                title="Batch Magang"
                subTitle="Batch Magang"
            />
            <div className="flex justify-center items-center">
                <div className="flex flex-col justify-center items-center mx-[7.5%] my-[92px] w-full">
                    <div className="w-full">
                        <table className="w-full table-auto font-workSans text-white bg-primary rounded-xl border-collapse hover:shadow-xl transition-all duration-250">
                            <thead>
                                <tr className="text-center">
                                    <th colSpan="6" className="font-medium text-2xl pt-4 pb-2">Daftar Batch Magang</th>
                                </tr>
                                <tr>
                                    <th className="font-normal text-lg py-2 px-6 hover:text-accent">Batch</th>
                                    <th className="font-normal text-lg py-2 px-6 hover:text-accent">Semester</th>
                                    <th className="font-normal text-lg py-2 px-6 hover:text-accent">Tahun</th>
                                    <th className="font-normal text-lg py-2 px-6 hover:text-accent">Periode</th>
                                    <th className="font-normal text-lg py-2 px-6 hover:text-accent">Release Pengumuman</th>
                                    <th className="font-normal text-lg py-2 px-6"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {batches.map((batch, index) => (
                                    <tr
                                        key={index} 
                                        className={`text-center text-black border border-gray-200 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}`}
                                    >
                                        <td className="px-6 py-4">{batch.number}</td>
                                        <td className="px-6 py-4">{batch.semester}</td>
                                        <td className="px-6 py-4">{batch.year}</td>
                                        <td className="px-6 py-4">{formatDate(batch.opened_at)} - {formatDate(batch.closed_at)}</td>
                                        <td className="px-6 py-4">{batch.selection_announcement ? "Diumumkan" : "Belum Diumumkan"}</td>
                                        <td className="px-6 py-4">
                                            <button onClick={() => handleToggleAction(index)}>
                                                <BsThreeDots className="w-6 h-6" />
                                            </button>
                                            {dropdownActionIndex === index && (
                                                <DropdownActionDashboard
                                                    link=""
                                                    isVisible={isDropdownActionVisible}
                                                    onClickDetail={() => router.push(`/admin/dashboard/batch/detail/${batch.batch_id}`)}
                                                    onClickDelete={() => handleClickDelete(true, batch.batch_id)}
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
                        onClick={() => router.push('/admin/dashboard/batch/tambah')}
                    >
                        Tambah Batch
                    </button>
                </div>
            </div>
            <HapusModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleHapusButton}
            />
            <ErrorModal
                show={showError}
                title="Error"
                message={error}
                onConfirm={() => setShowError(false)}
            />
            <GagalHapusBatchModal
                show={showFailedDelete}
                onConfirm={()=> setShowFailedDelete(false)}
                error={error}
            />
            <BerhasilHapusBatchModal
                show={showSuccessDelete}
                onConfirm={() => location.reload()}
            />
        </>
    );
};

export default DashboardBatch;