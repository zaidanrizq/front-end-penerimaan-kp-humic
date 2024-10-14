import Link from "next/link"
import Image from "next/image"

const UserNavBar = () => {
    return (
        <nav className="bg-primary flex flex-row justify-around items-center">
            <div className="text-white font-workSans font-normal text-lg m-[20px]">
                <Link href="/" className="transition-all hover:text-accent mr-4">
                    Home
                </Link>
                <Link href="" className="transition-all hover:text-accent mr-4">
                    About Us
                </Link>
                <Link href="/penerimaan-magang" className="transition-all hover:text-accent mr-4">
                    Penerimaan Magang
                </Link>
                <Link href="" className="transition-all hover:text-accent">
                    Contact
                </Link>
            </div>
            <Link href="/profile">
                <Image
                    src="/assets/icons/profile.svg"
                    alt="User"
                    width={36}
                    height={36}
                />
            </Link>
        </nav>
    )
}

export default UserNavBar