"use client"

import SubHead from "@components/SubHead"
import EditedModal from "@components/EdittedModal";
import GagalEditPosisiMagangModal from "@components/GagalEditPosisiMagangModal";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image"

import { TfiInfoAlt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

const DetailPosisiMagangPage = ({ params }) => {
    const router = useRouter()
    const id = params.id
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState({});
    const fileInputRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [showError, setShowError] = useState(false);
    const [batches, setBatches] = useState([]);
    const [ selectedBatch, setSelectedBatch ] = useState('Pilih Batch');
    const [showDropdown, setShowDropdown] = useState(false);
    const [ imageUrl, setImageUrl ] = useState("")

    const handleChange = (e) => {
        const { name, value } = e.target
        setRole({
            ...role,
            [name]: value
        })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            
            setImageUrl(URL.createObjectURL(file))

            handleChange({
                target: {
                    name: 'role_image',
                    value: file
                }
            });
        }

    };

    const handleIconClick = () => {
        fileInputRef.current.click();
    };

    const handleBatchChange = (batch) => {

        setSelectedBatch(`Batch ${batch.number} Semester ${batch.semester} ${batch.year}`);

        const id = batch.batch_id

        if (id) {    
            handleChange({
                target: {
                    name: 'batch_id',
                    value: id
                }
            });
         }

        setShowDropdown(false);
    };

    const handleSimpan = async (e) => {

        e.preventDefault()

        const token = sessionStorage.getItem('authToken');

        if (!token) {
            router.push("/login");
            setTimeout(() => {
            location.reload()
            }, 200);
            return;
        }

        try {

            const formData = new FormData();

            Object.keys(role).forEach((key) => {
              formData.append(key, role[key]);
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-kp/${id}`, {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                setRole(result.data);
                setShowModal(true)
            } else {
                throw new Error(result.message || "Failed to update role KP.")
            }

        } catch (err) {

            setError(err.message);
            setShowError(true);

        }
    }

    const onOk = () => {

        location.reload();

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
                        "Content-Type" : "application/json"
                    }
                });

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

    }, [router]);

    useEffect(() => {

        const fetchRoleKp = async () => {

            try {

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-kp/${id}`);

                const result = await response.json();

                if (response.ok) {
                    setRole(result.data)
                    setImageUrl(result.data.role_image)
                    setSelectedBatch(`Batch ${result.data.batch.number} Semester ${result.data.batch.semester} ${result.data.batch.year}`)
                } else {
                    throw new Error(result.message || "Error fetching role KP");
                }

            } catch (err) {
                setError(err.message);
            } finally {
                setTimeout(() => {
                    setIsLoading(false);
                }, 250);
            }
        };

        fetchRoleKp();

    }, []);

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
                        'Authorization' : `Bearer ${token}`,
                    }
                });

                const result = await response.json();

                if (response.ok) {
                    setBatches(result.data);
                } else {
                    throw new Error (result.message || "Error fetching batches");
                }

            } catch (err) {
                setError(err.message);
            }
        };

        fetchBatches();
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }
    
    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-dashboard.svg"
                title="Detail"
                subTitle="Form Penerimaan Magang / Detail"
            />
            <div className="flex justify-center items-center">
                <form onSubmit={handleSimpan} className="flex flex-col items-center justify-center w-full mx-[25%] my-[64px]">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={imageUrl}
                                alt="KP Role Image"
                                className="max-w-[400px] max-h-[400px] object-cover"
                            />
                            <div onClick={handleIconClick} className="absolute bottom-0 right-0 cursor-pointer p-2 rounded-full">
                                <Image
                                    src="/assets/icons/camera.svg"
                                    alt="upload"
                                    width={48}
                                    height={48}
                                />
                            </div>
                        </div>
                        {/* Hidden File Input */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="hidden"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-[48px] w-full gap-[24px] font-workSans font-normal text-[16px] text-black">
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Posisi</label>
                            <input
                                    name="name"
                                    value={role.name}
                                    onChange={handleChange}
                                    type="text"
                                    required
                                    className="w-full px-[16px] py-[8px] border border-1 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Deskripsi</label>
                            <textarea
                                name="description"
                                value={role.description}
                                onChange={handleChange}
                                type="text"
                                required
                                className="text-start w-full h-[200px] px-[16px] py-[8px] border border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Skills yang diperlukan</label>
                            <textarea
                                name="kualifikasi"
                                value={role.kualifikasi}
                                onChange={handleChange}
                                type="text"
                                required
                                className="text-start w-full h-[100px] px-[16px] py-[8px] border border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div className="relative flex flex-col justify-center items-start w-full gap-[8px]">
                            <label>Batch</label>
                            <div className="flex flex-col outline outline-[1px] rounded-md">
                                <button 
                                    type="button"
                                    className="flex flex-row justify-start items-center w-full px-4 py-2"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                >
                                    {selectedBatch}
                                    {
                                        showDropdown 
                                        ?
                                        (
                                            <FaAngleUp
                                                className="ml-[8px] text-accent"
                                                />
                                        )
                                        :
                                        (
                                            <FaAngleDown
                                                className="ml-[8px] text-accent"
                                                />
                                        )
                                    }
                                </button>
                            </div>
                            <div className={`z-10 ${showDropdown ? 'block' : 'hidden'} absolute top-full left-0 bg-white min-w-[275px] mt-[4px] rounded-md shadow-lg`}>
                                <ul className="text-[14px] text-gray-700 dark:text-gray-200">
                                    {batches.map((batch, index) => (
                                        <li key={index}>
                                            <button 
                                                className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left font-inter font-normal text-[14px] text-black"
                                                type="button"
                                                onClick={() => handleBatchChange(batch)}
                                            >
                                                {`Batch ${batch.number} Semester ${batch.semester} ${batch.year}`}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between w-full mt-[64px]">
                            <button 
                                className="accent-square-btn w-[200px] hover:bg-primary transition-all duration-300"
                                type="button"
                                onClick={() => router.push('/admin/dashboard/posisi-magang')}
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
                onConfirm={onOk}
            />
            <GagalEditPosisiMagangModal
                show={showError}
                error={error}
                onConfirm={() => setShowError(false)}
            />
        </>
    )
}

export default DetailPosisiMagangPage