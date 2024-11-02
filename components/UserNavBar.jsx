import Link from "next/link"

const UserNavBar = ({profile_picture}) => {
    return (
        <nav className="bg-primary flex flex-row justify-around items-center">
            <div className="text-white font-workSans font-normal text-lg m-[20px]">
                <Link href="/" className="transition-all hover:text-accent mr-4">
                    Home
                </Link>
                <Link href="/about-us" className="transition-all hover:text-accent mr-4">
                    About Us
                </Link>
                <Link href="/penerimaan-magang" className="transition-all hover:text-accent mr-4">
                    Penerimaan Magang
                </Link>
                <Link href="/contact" className="transition-all hover:text-accent">
                    Contact
                </Link>
            </div>
            <Link href="/profile">
                 <img 
                    src={profile_picture === null ? ("/assets/icons/profile.svg" ) : (profile_picture)}
                    alt="Profile Icon" 
                    className="w-[48px] h-[48px] rounded-full object-cover"
                />
            </Link>
        </nav>
    )
}

export default UserNavBar