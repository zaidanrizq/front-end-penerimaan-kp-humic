const RegisterForm = ({ data, handleChange, handleSubmit }) => {
    return (
        <section>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <div className="flex flex-col px-[400px] mb-[32px]">
                    <label className="font-inter font-normal text-[14px] text-[#5A607F] mb-[8px]">
                        Nama Lengkap
                    </label>
                    <input
                        name="full_name"
                        value={data.full_name}
                        onChange={handleChange}
                        type="text"
                        required
                        className="text-input"
                    />
                </div>
                <div className="flex flex-col px-[400px] mb-[32px]">
                    <label className="font-inter font-normal text-[14px] text-[#5A607F] mb-[8px]">
                        NIM
                    </label>
                    <input
                        name="nim"
                        value={data.nim}
                        onChange={handleChange}
                        type="text"
                        required
                        className="text-input"
                    />
                </div>
                <div className="flex flex-col px-[400px] mb-[32px]">
                    <label className="font-inter font-normal text-[14px] text-[#5A607F] mb-[8px]">
                        Prodi
                    </label>
                    <input
                        name="prodi"
                        value={data.prodi}
                        onChange={handleChange}
                        type="text"
                        required
                        className="text-input"
                    />
                </div>
                <div className="flex flex-col px-[400px] mb-[32px]">
                    <label className="font-inter font-normal text-[14px] text-[#5A607F] mb-[8px]">
                        Nomor Handphone (Whatsapp)
                    </label>
                    <input
                        name="phone_number"
                        value={data.phone_number}
                        onChange={handleChange}
                        type="text"
                        required
                        className="text-input"
                    />
                </div>
                <div className="flex flex-col px-[400px] mb-[32px]">
                    <label className="font-inter font-normal text-[14px] text-[#5A607F] mb-[8px]">
                        Email
                    </label>
                    <input
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        type="email"
                        required
                        className="text-input"
                    />
                </div>
                <div className="flex flex-col px-[400px] mb-[32px]">
                    <label className="font-inter font-normal text-[14px] text-[#5A607F] mb-[8px]">
                        Sandi
                    </label>
                    <input
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        type="password"
                        required
                        className="text-input"
                    />
                </div>
                <button
                    type='submit'
                    className='accent-square-btn'
                >
                    Register
                </button>
            </form>
        </section>
    )
}

export default RegisterForm