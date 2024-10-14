import Image from "next/image"

const UbahProfileForm = () => {
    return (
        <form className="flex flex-col items-start my-[64px]">
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
                                    type="text"
                                    value="Zaidan Rizq"
                                    required
                                    className="text-input"
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
                                            required
                                            className="radio-input"
                                        />
                                        <label for="radio-gender-1" className="ml-[8px]">
                                            Laki - Laki
                                        </label>
                                    </div>
                                    <div className="flex flex-row items-center ml-[64px]">
                                        <input
                                            id="radio-gender-2"
                                            name="gender"
                                            type="radio"
                                            required
                                            className="radio-input"
                                        />
                                        <label for="radio-gender-2" className="ml-[8px]">
                                            Perempuan
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col mb-[24px]">
                                <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Tanggal Lahir</label>
                                <input
                                    type="text"
                                    value="Input Text"
                                    required
                                    className="text-input"
                                />
                            </div>
                            <div className="flex flex-col mb-[24px]">
                                <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Email</label>
                                <input
                                    type="text"
                                    value="rizqzaidan@student.telkomuniversity.ac.id"
                                    required
                                    className="text-input"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Nomor Handphone</label>
                                <input
                                    type="text"
                                    value="087822880485"
                                    required
                                    className="text-input"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col ml-[64px]">
                        <Image
                            src="/assets/icons/profile.svg"
                            alt="Profile Picture"
                            width={240}
                            height={240}
                            className="rounded-full mb-[24px]"
                        />
                        <button className="accent-square-btn w-[240px]">
                            Simpan
                        </button>
                        <button className="accent-square-btn w-[240px]">
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
                                type="text"
                                value="Telkom University"
                                required
                                className="text-input"
                            />
                        </div>
                        <div className="flex flex-col mb-[24px]">
                            <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">
                                NIM
                            </label>
                            <input
                                type="text"
                                value="1301213203"
                                required
                                className="text-input"
                            />
                        </div>
                        <div className="flex flex-col mb-[24px]">
                            <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">Prodi</label>
                            <input
                                type="text"
                                value="S1 Informatika"
                                required
                                className="text-input"
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
                            <input
                                type="text"
                                value="Input File"
                                required
                                className="text-input"
                            />
                        </div>
                        <div className="flex flex-col mb-[24px]">
                            <label className="font-inter font-normal text-[14px] text-white leading-[20px] mb-[8px]">
                                Portofolio
                            </label>
                            <input
                                type="text"
                                value="Input Link"
                                required
                                className="text-input"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default UbahProfileForm