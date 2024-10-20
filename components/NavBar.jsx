import Link from "next/link"

const NavBar = () => {
    return (
        <nav className="bg-primary flex flex-row justify-around items-center">
            <div className="text-white font-workSans font-normal text-lg m-4">
                <Link href="/" className="transition-all hover:text-accent ml-8 mr-4">
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
            <div className="flex flex-row m-4">
                <Link href="/register" className="nav-white-btn mr-4 hover:bg-primary hover:text-white transition-all duration-[250ms]">
                    Register
                </Link>
                <Link href="/login" className="nav-white-btn mr-8 hover:bg-primary hover:text-white transition-all duration-[250ms]">
                    Log In
                </Link>
            </div>
        </nav>
    )
}

export default NavBar