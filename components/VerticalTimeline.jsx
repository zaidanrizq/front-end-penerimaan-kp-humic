import Image from "next/image"

const VerticalTimeline = () => {
    return(
        <div className="flex flex-col justify-center items-center">
            <ul>
                <li className="relative flex gap-6 mb-[48px]">
                    <div className="before:absolute before:left-[6.5px] before:top-[17px] before:h-[60px] before:w-[2px] before:bg-accent">
                        <Image
                            src="/assets/icons/timeline-dot.svg"
                            width={16}
                            height={16}
                        />
                    </div>
                    <div>
                        <p className="font-workSans text-lg font-normal text-black">
                            Log in
                        </p>
                    </div>
                </li>
                <li className="relative flex gap-6 mb-[48px]">
                    <div className="before:absolute before:left-[6.5px] before:top-[17px] before:h-[60px] before:w-[2px] before:bg-accent">
                        <Image
                            src="/assets/icons/timeline-dot.svg"
                            width={16}
                            height={16}
                        />
                    </div>
                    <div>
                        <p className="font-workSans text-lg font-normal text-black">
                            Input data yang dibutuhkan
                        </p>
                    </div>
                </li>
                <li className="relative flex gap-6 mb-[48px]">
                    <div className="before:absolute before:left-[6.5px] before:top-[17px] before:h-[60px] before:w-[2px] before:bg-accent">
                        <Image
                            src="/assets/icons/timeline-dot.svg"
                            width={16}
                            height={16}
                        />
                    </div>
                    <div>
                        <p className="font-workSans text-lg font-normal text-black">
                            Pendaftaran KP
                        </p>
                    </div>
                </li>
                <li className="relative flex gap-6 mb-[48px]">
                    <div className="before:absolute before:left-[6.5px] before:top-[17px] before:h-[60px] before:w-[2px] before:bg-accent">
                        <Image
                            src="/assets/icons/timeline-dot.svg"
                            width={16}
                            height={16}
                        />
                    </div>
                    <div>
                        <p className="font-workSans text-lg font-normal text-black">
                            Seleksi
                        </p>
                    </div>
                </li>
                <li className="relative flex gap-6 mb-[48px]">
                    <div className="before:absolute before:left-[6.5px] before:top-[17px] before:h-[60px] before:w-[2px] before:bg-accent">
                        <Image
                            src="/assets/icons/timeline-dot.svg"
                            width={16}
                            height={16}
                        />
                    </div>
                    <div>
                        <p className="font-workSans text-lg font-normal text-black">
                            On Job
                        </p>
                    </div>
                </li>
                <li className="relative flex gap-6">
                    <div>
                        <Image
                            src="/assets/icons/timeline-dot.svg"
                            width={16}
                            height={16}
                        />
                    </div>
                    <div>
                        <p className="font-workSans text-lg font-normal text-black">
                           Lulus
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default VerticalTimeline