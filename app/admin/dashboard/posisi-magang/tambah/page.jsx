"use client"

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

import SubHead from "@components/SubHead";
import GagalTambahPosisiMagangModal from "@components/GagalTambahPosisiMagangModal";
import BerhasilTambahPosisiMagangModal from "@components/BerhasilTambahPosisiMagangModal";

import { TfiInfoAlt } from "react-icons/tfi";
import { FaAngleDown } from "react-icons/fa6";
import { FaAngleUp } from "react-icons/fa6";

const TambahPosisiMagang = () => {

    const router = useRouter();

    const [role, setRole] = useState({
        slug: "",
        name: "",
        description: "",
        kualifikasi: "",
        role_image: null,
        batch_id: ""
    });

    const [batches, setBatches] = useState([]);

    const [ imageUrl, setImageUrl ] = useState("/assets/icons/profile.svg")
    const [ selectedBatch, setSelectedBatch ] = useState('Pilih Batch');
 
    const fileInputRef = useRef(null);

    const [showInfo, setShowInfo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

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

    const handleChange = (e) => {

        const { name, value } = e.target;
    
        setRole((prevRole) => ({
            ...prevRole,
            [name]: value,
        }));

    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            
            setImageUrl(URL.createObjectURL(file));

            handleChange({
                target: {
                    name: 'role_image',
                    value: file
                }
            });
        }

    };

    const handleIconClick = () => {
        fileInputRef.current.click();  // Trigger the file input when the icon is clicked
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const token = sessionStorage.getItem('authToken');

        if (!token) {
            router.push('/admin/login');
            setTimeout(() => {
                location.reload()
            }, 200);
            return;
        }

        try {

            const formData = new FormData();

            Object.keys(role).forEach(key =>{
                formData.append(key, role[key]);
            });

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/role-kp`, {
                method: 'POST',
                headers: {
                    'Authorization' : `Bearer ${token}`,
                },
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                setShowSuccess(true);
            } else {
                throw new Error(result.message || "Failed to add role KP.");
            }

        } catch (err) {
            setError(err.message);
            setShowError(true);
        }
    }

    useEffect(() => {

        const verifyToken = async () => {

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
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
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
                setShowError(true);
            } finally {
                setTimeout(() => {
                    setIsLoading(false)
                }, 250);
            }
        };

        verifyToken();

    }, [router]);

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
                title="Tambah Magang"
                subTitle="Form Penerimaan Magang / Tambah"
            />
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full mx-[25%] my-[64px]">
                    <div className="flex flex-col items-center">
                        <div className="relative">
                            <img
                                src={imageUrl}
                                alt="KP Role Image"
                                className={`${imageUrl === "/assets/icons/profile.svg" ? "w-[200px] h-[200px]" : "max-w-[400px] max-h-[400px]"} object-cover`}
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
                                type="text"
                                required
                                onChange={handleChange}
                                className="w-full px-[16px] py-[8px] border border-1 border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary focus:text-black;]"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <div className="flex flex-row items-center justify-left gap-[10px]">
                                <label>Slug</label>
                                <button 
                                    onClick={() => setShowInfo(!showInfo)}
                                    type="button"
                                    className="mt-[3px]"
                                >
                                    <TfiInfoAlt 
                                        className="w-[16px] h-[16px] hover:text-primary"
                                    />
                                </button>
                            </div>
                            <p className={`${showInfo ? "text-blac" : "hidden"} text-[14px]`}>
                                    Slug adalah bagian dari URL yang mengidentifikasi halaman posisi magang tertentu.<br/>
                                    Format : /posisi-magang/<span className="text-primary">[slug]</span> <br/>
                                    Contoh : /posisi-magang/<span className="text-primary">devops-engineer</span> <br/>
                                    (Berarti slug adalah "<span className="text-primary">devops-engineer</span>" tanpa tanda petik)
                            </p>
                            <input
                                    name="slug"
                                    value={role.slug}
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
                                required
                                onChange={handleChange}
                                className="text-start w-full h-[200px] px-[16px] py-[8px] border border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-left w-full gap-[8px]">
                            <label>Skills yang diperlukan</label>
                            <textarea
                                name="kualifikasi"
                                required
                                onChange={handleChange}
                                className="text-start w-full h-[100px] px-[16px] py-[8px] border border-black rounded-md focus:outline-none text-[16px] text-black focus:ring-1 focus:ring-primary focus:border-primary"
                            />
                        </div>
                        <div className="relative flex flex-col justify-center items-start w-full gap-2">
                            <label htmlFor="batch-select" className="font-medium">
                                Batch <span className="text-red-500">*</span>
                            </label>
                            <div className="flex flex-col outline outline-1 rounded-md">
                                <button 
                                    type="button"
                                    className="flex flex-row justify-start items-center w-full px-4 py-2"
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    aria-required="true"
                                >
                                    {selectedBatch || <span className="text-gray-500">Please select a batch</span>}
                                    {showDropdown ? (
                                        <FaAngleUp className="ml-2 text-accent" />
                                    ) : (
                                        <FaAngleDown className="ml-2 text-accent" />
                                    )}
                                </button>
                            </div>
                            <div className={`z-10 ${showDropdown ? 'block' : 'hidden'} absolute top-full left-0 bg-white min-w-[275px] mt-1 rounded-md shadow-lg`}>
                                <ul className="text-sm text-gray-700 dark:text-gray-200">
                                    {batches.map((batch, index) => (
                                        <li key={index}>
                                            <button 
                                                className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                                                type="button"
                                                onClick={() => handleBatchChange(batch)}
                                            >
                                                {`Batch ${batch.number} Semester ${batch.semester} ${batch.year}`}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {!selectedBatch && (
                                <p className="text-red-500 text-sm mt-1">This field is required.</p>
                            )}
                        </div>
                        <div className="flex flex-row justify-between w-full mt-[64px]">
                            <button
                                onClick={() => router.push('/admin/dashboard/posisi-magang')}
                                type="button"
                                className="accent-square-btn w-[200px] hover:bg-primary transition-all duration-300"
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                className="accent-square-btn w-[200px] hover:bg-primary transition-all duration-300"
                            >
                                Simpan
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            <GagalTambahPosisiMagangModal
                show={showError}
                error={error}
                onConfirm={() => setShowError(false)}
            />
            <BerhasilTambahPosisiMagangModal
                show={showSuccess}
                onConfirm={() => router.push('/admin/dashboard/posisi-magang')}
            />
        </>
    );
};

export default TambahPosisiMagang;