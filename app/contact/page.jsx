import SubHead from "@components/SubHead"
import ContactSquare from "@components/ContactSquare"
import Image from "next/image"

const Contact = () => {
    return(
        <>
            <SubHead
                imagePath="/assets/images/sub-head-contact.svg"
                title="Our Contacts"
                subTitle="Contact"
            />
            <div className="flex justify-center">
                <div className="flex flex-col justify-center items-center w-[1001px] my-[64px]">
                    <Image
                        src="/assets/images/map.svg"
                        alt="Map"
                        width={1001}
                        height={554}
                        className="mb-[48px]"
                    />
                    <div className="flex flex-row w-full justify-between">
                        <div className="flex flex-col">
                            <h3 className="font-workSans font-bold text-[18px] text-primary tracking-widest">
                                GET IN TOUCH
                            </h3>
                            <h2 className="font-yesevaOne font-normal text-[32px] text-primary mb-[8px]">
                                Contact
                            </h2>
                            <Image
                                src="/assets/images/contact-qr.svg"
                                alt="Contact QR"
                                width={407}
                                height={399}
                            />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex flex-row">
                                <ContactSquare 
                                    bgColor="bg-accent"
                                    textColor="text-primary"
                                    iconColor="fill-primary"
                                    iconWidth={40}
                                    iconHeight={38}
                                    icon="/assets/icons/phone.svg"
                                    title="Layanan Keluhan"
                                    description="https://bit.ly/Layanan_ Keluhan_RCHUMIC"
                                    isLink={true}
                                />
                                <ContactSquare 
                                    bgColor="bg-primary"
                                    textColor="text-accent"
                                    iconColor="fill-accent"
                                    iconWidth={30}
                                    iconHeight={36}
                                    icon="/assets/icons/location-accent.svg"
                                    title="Location"
                                    description="Telkom University Gedung F - IF3.01.08"
                                    isLink={false}
                                />
                            </div>
                            <div className="flex flex-row">
                                <ContactSquare 
                                    bgColor="bg-accent"
                                    textColor="text-primary"
                                    iconColor="fill-primary"
                                    iconWidth={35}
                                    iconHeight={29}
                                    icon="/assets/icons/email.svg"
                                    title="Email"
                                    description="humic@telkomuniver sity.ac.id"
                                    isLink={false}
                                />
                                <ContactSquare 
                                    bgColor="bg-accent"
                                    textColor="text-primary"
                                    iconColor="fill-primary"
                                    iconWidth={35}
                                    iconHeight={29}
                                    icon="/assets/icons/clock.svg"
                                    title="Working Hours"
                                    description="Mon-Fri 09:00-18:00"
                                    isLink={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default Contact