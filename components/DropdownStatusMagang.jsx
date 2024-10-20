const DropdownStatusMagang = ({stats, isVisible, onSelect}) => {
    return (
        <div
            className={`z-10 ${isVisible ? 'block' : 'hidden'} absolute bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
        >
            <ul className="py-2 text-[14px] text-gray-700 dark:text-gray-200">
                <li>
                    <button 
                        className="w-full block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                        type="button"
                        onClick={() => onSelect("Status Magang")}
                    >
                        Tampilkan Semua
                    </button>
                </li>
                {stats.map((stat,index) => (
                    <li key={index}>
                        <button 
                            className="block w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-left"
                            type="button"
                            onClick={() => onSelect(stat)}
                        >
                            {stat}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default DropdownStatusMagang