const AdminLoginForm = ({ data, showNotValid, showError, handleChange, handleSubmit }) => {
    return (
        <section>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center">
                <div className="flex flex-col px-[400px] mb-[32px]">
                    <label className="font-inter font-normal text-[14px] text-[#5A607F] mb-[8px]">
                        Email
                    </label>
                    <input
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        type="text"
                        required
                        className="text-input"
                    />
                </div>
                <div className="flex flex-col px-[400px] mb-[16px]">
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
                    {showNotValid ? (
                        <div className="mt-[24px]">
                            <p className="font-inter font-normal text-red-500 text-[14px] text-center">
                                Email atau sandi Anda tidak sesuai!
                            </p>
                        </div>
                    ) : null}
                    {showError ? (
                        <div className="mt-[24px]">
                            <p className="font-inter font-normal text-red-500 text-[14px] text-center">
                                Log In error coba lagi!
                            </p>
                        </div>
                    ) : null}
                </div>
                <button
                    type='submit'
                    className='accent-square-btn mx-[500px] hover:bg-primary transition-all duration-200'
                >
                    Login
                </button>
            </form>
        </section>
    )
}

export default AdminLoginForm