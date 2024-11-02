import { IoClose } from "react-icons/io5";
import { FaTriangleExclamation } from "react-icons/fa6";


const IsiProfileModal = ({show, onEdit, onClose}) => {

    if (!show) {
        return null
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="flex flex-col justify-center items-center bg-white rounded-xl gap-[8px] w-[32%]">
                <div className="flex self-end mt-[8px] mr-[8px]">
                    <button onClick={onClose}>
                        <IoClose className="w-[24px] h-[24px] text-accent"/>
                    </button>
                </div>
                <div className="flex flex-col justify-center tet-center font-inter items-center gap-[8px] mb-[32px]">
                    <FaTriangleExclamation className="w-[64px] h-[64px] text-primary"/>
                    <h2 className="font-bold text-[20px mt-[16px]">Isi Daftar Profile</h2>
                    <p className="font-normal text-[16px] mb-[8px]">Silahkan isi file syarat pendaftaran terlebih dahulu</p>
                    <button
                        onClick={onEdit}
                        className="bg-accent font-workSans font-medium text-[16px] text-white rounded-full w-[106px] h-[42px] hover:bg-primary transition-all duration-200"
                    >
                        Edit
                    </button>
                </div>
            </div>
        </div>
    )
}

export default IsiProfileModal;