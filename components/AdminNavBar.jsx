import Link from "next/link"

const AdminNavBar = () => {
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
            <div className="flex flex-row m-4">
                <Link href="/admin/login" className="nav-white-btn mr-8 hover:bg-primary hover:text-white transition-all duration-[250ms]">
                    Log In
                </Link>
            </div>
        </nav>
    )
}

export default AdminNavBar