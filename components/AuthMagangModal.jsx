import { IoClose } from "react-icons/io5";

const AuthMagangModal = ({ show, onClose, onRegister, onLogin }) => {
    if (!show) {
        return null
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col justify-center items-center bg-white rounded-xl">
                <button 
                    className="self-end mr-[16px] mt-[16px]"
                    onClick={onClose}
                >
                    <IoClose
                        className="w-[20px] h-[20px] text-[#7E84A3] hover:text-primary text-center"
                    />
                </button>
                <div className="flex flex-col justify-center items-start mx-[24px] mb-[8px]">  
                    <div className="w-[475px]">
                        <h3 className="font-inter font-bold text-[20px] mb-[8px]">
                            Log In Untuk Melanjutkan
                        </h3>
                        <p className="font-inter font text-[16px] mb-[16px]">
                            Silakan log in untuk melanjutkan. Jika Kamu belum memiliki akun, register terlebih dahulu.
                        </p>
                    </div>                  
                    <div className="flex flex-row self-end items-center gap-[32px] font-inter font text-[16px] mr-[48px] mb-[16px]">
                        <button 
                            className="w-[85px] h-[35px] border-solid border-[1px] border-black/[.50] rounded-md hover:border-none hover:bg-primary hover:text-white transition-all	duration-300"
                            onClick={onRegister}
                        >
                            Register
                        </button>
                        <button 
                            className="w-[85px] h-[35px] border-solid border-[1px] border-black/[.50] rounded-md hover:border-none hover:bg-primary hover:text-white transition-all	duration-300"
                            onClick={onLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthMagangModal