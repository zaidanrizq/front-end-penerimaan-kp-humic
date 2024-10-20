import Link from "next/link"
import Image from "next/image"

const LoggedInAdminNavBar = () => {
    return (
        <nav className="bg-primary flex flex-row justify-around items-center">
            <div className="text-white font-workSans font-normal text-lg m-4">
                <Link href="/admin/dashboard/pelamar" className="transition-all hover:text-accent ml-8 mr-4">
                    Dashboard
                </Link>
                <Link href="/admin/dashboard/posisi-magang" className="transition-all hover:text-accent mr-4">
                    Form Penerimaan Magang
                </Link>
            </div>
            <Link href="/admin/profile">
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

export default LoggedInAdminNavBar