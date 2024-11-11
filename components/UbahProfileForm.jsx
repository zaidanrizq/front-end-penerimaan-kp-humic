import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react"

import Image from "next/image";

import Datepicker from "react-tailwindcss-datepicker";
import { BiSolidFilePdf } from "react-icons/bi";


const UbahProfileForm = ({ userData, application, handleChange, handleTarikLamaran, handleSimpan }) => {

    const userBirthDate = userData.birth_date === null ? null : new Date(userData.birth_date) 
    const [ imageUrl, setImageUrl ] = useState(!userData.profile_picture ? "/assets/icons/profile.svg" : userData.profile_picture)
    const [ cvUrl , setCVUrl] = useState(!userData.cv ? null : userData.cv)
    const [ portfolioUrl , setPortfolioUrl] = useState(!userData.portfolio ? null : userData.portfolio)

    const [value, setValue] = useState({ 
        startDate: userBirthDate,
        endDate: userBirthDate
    });

    const handleDateChange = (newValue) => {

        setValue(newValue);
    
        const formattedDate = newValue?.startDate?.toISOString()
    
        const event = {
            target: {
                name: 'birth_date',
                value: formattedDate,
            }
        };
        handleChange(event);
    };

    const router = useRouter();

    const fileInputRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file) {

            if (file.size > 2 * 1024 * 1024) {
                alert("The file size should not exceed 2 MB.");
                return; // Exit the function if the file is too large
            }
            
            setImageUrl(URL.createObjectURL(file));

            handleChange({
                target: {
                    name: 'profile_picture',
                    value: file
                }
            });
        }

    };

    const handleIconClick = () => {
        fileInputRef.current.click();  // Trigger the file input when the icon is clicked
    };

    const handleFileCVChange = (e) => {
        const file = e.target.files[0];

        if (file) {

            if (file.size > 2 * 1024 * 1024) {
                alert("The file size should not exceed 2 MB.");
                return; // Exit the function if the file is too large
            }
            
            setCVUrl(URL.createObjectURL(file))

            handleChange({
                target: {
                    name: 'cv',
                    value: file
                }
            });
        }

    };

    const handleFilePortfolioChange = (e) => {
        const file = e.target.files[0];

        if (file) {

            if (file.size > 2 * 1024 * 1024) {
                alert("The file size should not exceed 2 MB.");
                return; // Exit the function if the file is too large
            } else {
            
                setPortfolioUrl(URL.createObjectURL(file))

                handleChange({
                    target: {
                        name: 'portfolio',
                        value: file
                    }
                });
            }
        }

    };

    return (
        <form onSubmit={handleSimpan} className="flex flex-col items-start my-[64px]">
            <div className="mb-[32px]">
                <h2 className="font-workSans font-medium text-[26px] text-black mb-[16px]">
                    Data Pribadi
                </h2>
                <div className="flex flex-row">
                    <div className="bg-primary rounded-[30px]">
                        <div className="flex flex-col justify-center px-[64px] py-[48px]">
                            <div className="flex flex-col w-[490px] mb-[24px]">
                                <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Nama Lengkap</label>
                                <input
                                    name="full_name"
                                    value={userData.full_name}
                                    onChange={handleChange}
                                    type="text"
                                    className="text-input"
                                    required
                                />
                            </div>
                            <div className="flex flex-col mb-[24px]">
                                <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Gender</label>
                                <div className="font-inter font-normal text-[16px] text-[#131523] leading-[24px] flex flex-row">
                                    <div className="flex flex-row items-center">
                                        <input
                                            id="radio-gender-1"
                                            name="gender"
                                            type="radio"
                                            value="M" // Assign value "M" for Laki-Laki
                                            checked={userData.gender === "M"} // Set checked state based on userData.gender
                                            onChange={handleChange} // Handle change event
                                            className="radio-input"
                                            required
                                        />
                                        <label htmlFor="radio-gender-1" className="ml-[8px]">
                                            Laki - Laki
                                        </label>
                                    </div>
                                    <div className="flex flex-row items-center ml-[64px]">
                                        <input
                                            id="radio-gender-2"
                                            name="gender"
                                            type="radio"
                                            value="F" // Assign value "F" for Perempuan
                                            checked={userData.gender === "F"} // Set checked state based on userData.gender
                                            onChange={handleChange} // Handle change event
                                            className="radio-input"
                                            required
                                        />
                                        <label htmlFor="radio-gender-2" className="ml-[8px]">
                                            Perempuan
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-[24px]">
                                <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Tanggal Lahir</label>
                                <Datepicker 
                                    useRange={false}
                                    asSingle={true}
                                    name="birth_date"
                                    value={value} 
                                    onChange={handleDateChange}
                                    required
                                /> 
                            </div>
                            <div className="flex flex-col mb-[24px]">
                                <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Email</label>
                                <input
                                    name="email"
                                    value={userData.email}
                                    onChange={handleChange}
                                    type="email"
                                    className="text-input"
                                    required
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Nomor Handphone</label>
                                <input
                                    name="phone_number"
                                    value={userData.phone_number}
                                    onChange={handleChange}
                                    type="text"
                                    className="text-input"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-[64px] items-center">
                        <div className="flex flex-col items-center">
                            <div className="relative">
                                <img
                                    src={imageUrl}
                                    alt="Profile Picture"
                                    className="w-[240px] h-[240px] rounded-full object-cover mb-[24px]"
                                />
                                <div onClick={handleIconClick} className="absolute bottom-0 right-0 cursor-pointer p-2 rounded-full">
                                    <Image
                                        src="/assets/icons/camera.svg"
                                        alt="upload"
                                        width={64}
                                        height={64}
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
                        <button type="submit" className="accent-square-btn w-[240px] hover:bg-primary transition-all duration-300">
                            Simpan
                        </button>
                        <button 
                            onClick={() => router.back()} 
                            type="button" 
                            className="accent-square-btn w-[240px] hover:bg-primary transition-all duration-300"
                        >
                            Batal
                        </button>
                    </div>
                </div>
            </div>
            <div className="mb-[32px]">
                <h2 className="font-workSans font-medium text-[26px] text-black mb-[16px]">
                    Data Perguruan Tinggi
                </h2>
                <div className="bg-primary rounded-[30px]">
                    <div className="flex flex-col justify-center px-[64px] py-[48px]">
                        <div className="flex flex-col w-[490px] mb-[24px]">
                            <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">
                                Perguruan Tinggi
                            </label>
                            <input
                                name="perguruan_tinggi"
                                value={userData.perguruan_tinggi}
                                onChange={handleChange}
                                type="text"
                                className="text-input"
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-[24px]">
                            <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">
                                NIM
                            </label>
                            <input
                                name="nim"
                                value={userData.nim}
                                onChange={handleChange}
                                type="text"
                                className="text-input"
                                required
                            />
                        </div>
                        <div className="flex flex-col mb-[24px]">
                            <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Prodi</label>
                            <input
                                name="prodi"
                                value={userData.prodi}
                                onChange={handleChange}
                                type="text"
                                className="text-input"
                                required
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-[32px]">
                <h2 className="font-workSans font-medium text-[26px] text-black mb-[16px]">
                    File Pendaftaran
                </h2>
                <div className="bg-primary rounded-[30px]">
                    <div className="flex flex-col justify-center px-[64px] py-[48px]">
                        <div className="flex flex-col w-[490px] mb-[24px]">
                            <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">
                                CV
                            </label>
                            {cvUrl && (
                                <div className="mb-4">
                                    <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center text-white  text-[13px] hover:underline">
                                        <BiSolidFilePdf className="w-[22px] h-[22px]"/>
                                        View Current CV
                                    </a>
                                </div>
                            )}
                            <label for="cv-input" className="sr-only">Choose file</label>
                            <input 
                                type="file" 
                                name="cv" 
                                id="cv-input" 
                                accept="application/pdf"
                                onChange={handleFileCVChange}
                                required={!userData.cv}
                                className="bg-white block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                    file:bg-gray-50 file:border-0
                                    file:me-4
                                    file:py-3 file:px-4
                                    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                            />
                        </div>
                        <div className="flex flex-col w-[490px] mb-[24px]">
                            <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">
                                Portfolio
                            </label>
                            {portfolioUrl && (
                                <div className="mb-4">
                                    <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="flex flex-row items-center text-white  text-[13px] hover:underline">
                                        <BiSolidFilePdf className="w-[22px] h-[22px]"/>
                                        View Current Portfolio
                                    </a>
                                </div>
                            )}
                            <label for="portfolio-input" className="sr-only">Choose file</label>
                            <input 
                                type="file" 
                                name="cv" 
                                id="portfolio-input" 
                                accept="application/pdf"
                                onChange={handleFilePortfolioChange}
                                required={!userData.portfolio}
                                className="bg-white block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400
                                    file:bg-gray-50 file:border-0
                                    file:me-4
                                    file:py-3 file:px-4
                                    dark:file:bg-neutral-700 dark:file:text-neutral-400"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {
                userData.kp_application
                ?
                (
                    <div className="mb-[32px]">
                        <h2 className="font-workSans font-medium text-[26px] text-black mb-[16px]">
                            Status Penerimaan Magang
                        </h2>
                        <div className="bg-primary rounded-[30px]">
                            <div className="flex flex-col justify-center px-[64px] py-[48px]">
                                <div className="flex flex-col w-[490px] mb-[24px]">
                                    <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">
                                        Batch Magang
                                    </label>
                                    <input
                                        value={`Batch ${application.kp_role.batch.number} Semester ${application.kp_role.batch.semester} ${application.kp_role.batch.year}`}
                                        type="text"
                                        className="text-input"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-[24px]">
                                    <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">
                                        Posisi dilamar
                                    </label>
                                    <input
                                        value={application.kp_role.name}
                                        type="text"
                                        className="text-input"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-[24px]">
                                    <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Status Penerimaan</label>
                                    <input
                                        value={application.status}
                                        type="text"
                                        className="text-input"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col mb-[24px]">
                                    <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Batalkan Pendaftaran</label>
                                    <button 
                                        className="bg-accent text-white w-[164px] h-[40px] rounded-lg text-center hover:bg-white hover:text-primary transition-all duration-200"
                                        type="button"
                                        onClick={handleTarikLamaran}
                                    >
                                        Tarik Lamaran
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    null
                )
            }
            
        </form>
    )
}

export default UbahProfileForm