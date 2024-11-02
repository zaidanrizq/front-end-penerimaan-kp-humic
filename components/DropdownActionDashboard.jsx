const DropdownActionDashboard = ({isVisible, onClickDetail, onClickDelete}) => {
    return (
        <div
            className={`z-10 ${isVisible ? 'block' : 'hidden'} absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
        >
            <ul className="py-2 text-[14px] text-gray-700 dark:text-gray-200">
                <li>
                    <button 
                        className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                        type="button"
                        onClick={onClickDetail}
                    >
                        Detail
                    </button>
                </li>
                <li>
                    <button 
                        className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                        type="button"
                        onClick={onClickDelete}
                    >
                        Hapus
                    </button>
                </li>
            </ul>

        </div>
    )
}

export default DropdownActionDashboard