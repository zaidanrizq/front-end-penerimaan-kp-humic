import Link from "next/link"
import Image from "next/image"

const Footer = () => {
    return (
        <footer className="bg-primary">
            <div className="px-[184px] py-[64px]">
                <div className="flex flex-row justify-between mb-[32px]">
                    <div className="flex flex-col">
                        <Link href='/' className="font-yesevaOne font-normal text-accent text-4xl mb-[24px]">
                            HUMIC
                        </Link>
                        <p className="font-workSans font-normal text-lg text-white w-[250px]">
                            To become an excellent research center in the field of engineering to improve the human health and prosperity
                        </p>
                    </div>
                    <div>
                        <h2 className="font-workSans font-semibold text-lg text-white mb-[33.5px]">
                            Important Links
                        </h2>
                        <div className="flex flex-col font-workSans font-normal text-base text-white">
                            <Link href="/penerimaan-magang" className="hover:text-accent">
                                Penerimaan KP
                            </Link>
                            <Link href="/contact" className="hover:text-accent">
                                Contact
                            </Link>
                            <Link href="/about-us" className="hover:text-accent">
                                About Us
                            </Link>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-workSans font-semibold text-lg text-white mb-[33.5px]">
                            Contact Us
                        </h2>
                        <div className="flex flex-col font-workSans font-normal text-base text-white">
                            <a href="mailto:humic@telkomuniversity.ac.id" className="hover:text-accent">
                                Email: humic@telkomuniversity.ac.id
                            </a>
                            <a href="https://maps.app.goo.gl/mMXbJDbWr3JjmYNr6" className="hover:text-accent">
                                Address: Telkom University
                            </a>
                        </div>
                    </div>
                    <div>
                        <h2 className="font-workSans font-semibold text-lg text-white mb-[33.5px]">
                            Form Layanan Keluhan RC HUMIC:
                        </h2>
                        <a href="https://bit.ly/Layanan_Keluhan_RCHUMIC" className="font-workSans font-normal text-base text-white hover:text-accent hover:underline hover:decoration-accent">
                            https://bit.ly/Layanan_Keluhan_RCHUMIC
                        </a>
                    </div>
                </div>
                <hr/>
                <div className="flex flex-row justify-between mt-[24px]">
                    <p className="font-workSans font-normal text-base text-white"> 
                        © 2024 HUMIC Engineering
                    </p>
                    <div className="flex flex-row">
                        <Image
                            src="/assets/icons/linkedin.svg"
                            alt="linkedin"
                            width={24}
                            height={24}
                            className="mr-4"
                        />
                        <Image
                            src="/assets/icons/facebook.svg"
                            alt="linkedin"
                            width={24}
                            height={24}
                            className="mr-4"
                        />
                        <Image
                            src="/assets/icons/instagram.svg"
                            alt="linkedin"
                            width={24}
                            height={24}
                        />
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer