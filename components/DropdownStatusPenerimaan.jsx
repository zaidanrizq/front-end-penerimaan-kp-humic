const DropdownStatusPenerimaan = ({stats, isVisible, onSelect}) => {
    return (
        <div
            className={`z-10 ${isVisible ? 'block' : 'hidden'} flex mt-[24px] w-[100px] bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700`}
        >
            <ul className="w-[100px] py-2 text-[14px] text-gray-700 dark:text-gray-200">
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

export default DropdownStatusPenerimaan