"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import SubHead from "@components/SubHead";
import DropdownStatusPenerimaan from "@components/DropdownStatusPenerimaan";
import EditedModal from "@components/EdittedModal";

import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";


const DetailPelamarPage = ({ params }) => {

    const router = useRouter();
    const id = params.id; // Use router.query to retrieve dynamic route parameters
    const statusOptions = ['Lulus', 'Proses', 'Gagal'];

    const [isDropdownStatusVisible, setIsDropdownStatusVisible] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const [application, setApplication] = useState({});
    const [selectedStatus, setSelectedStatus] = useState(''); // Initialize as an empty string or any default value
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handleToggleDropdownStatus = () => {
        setIsDropdownStatusVisible(!isDropdownStatusVisible);
    };

    const handleSelectStatus = (status) => {
        setSelectedStatus(status);
        setIsDropdownStatusVisible(false);
    };

    const handleSubmit = async (e) => { 

        e.preventDefault();

        const token = sessionStorage.getItem('authToken')
        
        if (!token) {
            router.push('/admin/login');
            setTimeout(() => {
                location.reload()
            }, 200);
            return;
        }

        try {

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application-kp/${id}`, {
                method: "PUT",
                headers: {
                    "Authorization" : `Bearer ${token}`,
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({ status: selectedStatus })
            });

            const result = await response.json();

            if (response.ok) {
                setShowModal(true);
            } else {
                throw new Error(result.message || "Failed to update user data.")
            }

        } catch (err) {
            setError(err.message);
        }
    };

    // Check Authentication
    useEffect(() => {
        const checkAuth = async () => {
            const token = sessionStorage.getItem('authToken');
            
            if (!token) {
                router.push('/admin/login');
                setTimeout(() => {
                    location.reload();
                }, 200);
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-token`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();

                if (!response.ok || !result.valid) {
                    sessionStorage.removeItem('authToken');
                    router.push('/admin/login');
                    setTimeout(() => {
                        location.reload();
                    }, 200);
                    return;
                }
            } catch (err) {
                setError(err.message);
            }
        };

        checkAuth();
    }, [router]);

    // Fetch Application Data
    useEffect(() => {
        if (!id) return; // Ensure `id` is available before fetching

        const fetchApplication = async () => {
            const token = sessionStorage.getItem('authToken');

            if (!token) {
                router.push('/admin/login');
                setTimeout(() => {
                    location.reload();
                }, 200);
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/application-kp/${id}`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });

                const result = await response.json();

                if (response.ok) {
                    setApplication(result.data);
                    setSelectedStatus(result.data.status); // Set selected status after fetching
                } else {
                    throw new Error(result.message || "Failed to fetch application.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 200);
            }
        };

        fetchApplication();
    }, [id, router]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-dashboard.svg"
                title="Detail"
                subTitle="Dashboard / Detail"
            />
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full mx-[25%] my-[64px]">
                    <div>
                        <img
                            src={application.user.profile_picture === null ? '/assets/icons/profile.svg' : application.user.profile_picture}
                            alt="Profile Picture"
                            className="w-[250px] h-[250px] rounded-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-[48px] w-full gap-[24px] font-workSans font-normal text-[16px] text-black">
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Nama Lengkap</label>
                            <input
                                    type="text"
                                    value={application.user.full_name}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Gender</label>
                            <input
                                    type="text"
                                    value={application.user.gender === "M" ? "Laki-laki" : "Perempuan"}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Tanggal Lahir</label>
                            <input
                                    type="text"
                                    value={(new Date(application.user.birth_date)).toLocaleDateString('en-GB')}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Email</label>
                            <input
                                    type="text"
                                    value={application.user.email}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Nomor Handphone</label>
                            <input
                                    type="text"
                                    value={application.user.phone_number}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Perguruan Tinggi</label>
                            <input
                                    type="text"
                                    value={application.user.perguruan_tinggi}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>NIM</label>
                            <input
                                    type="text"
                                    value={application.user.nim}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Prodi</label>
                            <input
                                    type="text"
                                    value={application.user.prodi}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>CV</label>
                            <input
                                    type="text"
                                    value={application.user.cv}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Portofolio</label>
                            <input
                                    type="text"
                                    value={application.user.portfolio}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Posisi</label>
                            <input
                                    type="text"
                                    value={application.kp_role.name}
                                    className="w-full px-[16px] py-[8px] border border-2 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Batch</label>
                            <input
                                    type="text"
                                    value={`Batch ${application.kp_role.batch.number} Semester ${application.kp_role.batch.semester} ${application.kp_role.batch.year}`}
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
                                    stats={statusOptions}
                                    isVisible={isDropdownStatusVisible}
                                    onSelect={handleSelectStatus}
                                />
                            </div>
                        </div>
                        <div className="flex flex-row justify-between w-full mt-[64px]">
                            <button 
                                className="accent-square-btn w-[200px] hover:bg-primary transition-all duration-300"
                                type="button"
                                onClick={() => router.push('/admin/dashboard/pelamar')}
                            >
                                Batal
                            </button>
                            <button 
                                className="accent-square-btn w-[200px] hover:bg-primary transition-all duration-300"
                                type="submit"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <EditedModal
                show={showModal}
                onConfirm={() => router.push('/admin/dashboard/pelamar')}
            />
        </>
    )
}

export default DetailPelamarPage;