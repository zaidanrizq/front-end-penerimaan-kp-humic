import { IoCheckmarkCircleOutline } from "react-icons/io5";

const BerhasilHapusBatchModal = ({ show, onConfirm }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex justify-center items-center bg-white rounded-xl">
                <div className="flex flex-col justify-center items-center mx-[64px] my-[32px]">
                    <IoCheckmarkCircleOutline 
                        className="w-[50px] h-[50px] text-primary text-center"
                    />
                    <h3 className="font-inter font-bold text-[20px] my-[8px]">
                        Hapus Berhasil
                    </h3>
                    <div className="flex justify-center items-center gap-[32px] font-inter font text-[16px]">
                        <button 
                            className="w-[85px] h-[35px] border-solid border-[1px] border-black/[.50] rounded-md hover:border-none hover:bg-primary hover:text-white transition-all	duration-300"
                            onClick={onConfirm}
                        >
                            Ok
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BerhasilHapusBatchModal;