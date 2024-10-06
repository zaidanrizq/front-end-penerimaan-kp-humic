import Link from "next/link"
import Image from "next/image"

const Topmost = () => {
    return (
        <header className="flex flex-row justify-around items-center">
            <Link href="/" className="m-2">
                <Image
                    src="/assets/images/logo-humic-text.svg"
                    alt="Humic Logo Text"
                    width={150}
                    height={76}
                />
            </Link>
            <div className="flex flex-row font-workSans font-medium text-base text-primary m-2">
                <div className="flex flex-row mr-4">
                    <Image
                        src="/assets/icons/email.svg"
                        alt="Email"
                        width={40}
                        height={30}
                        className="mr-2"
                    />
                    <div>
                        <p>EMAIL</p>
                        <a href="mailto:humic@telkomuniversity.ac.id">
                            humic@telkomuniversity.ac.id
                        </a>
                    </div>
                </div>
                <div className="flex flex-row ml-4">
                    <Image
                        src="/assets/icons/location.svg"
                        alt="Location"
                        width={30}
                        height={36}
                        className="mr-2"
                    />
                    <div>
                        <p>LOCATION</p>
                        <a href="https://maps.app.goo.gl/mMXbJDbWr3JjmYNr6">
                            Telkom University
                        </a>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Topmost