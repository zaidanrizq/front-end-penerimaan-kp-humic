import SubHead from "@components/SubHead";
import QuotesSlider from "@components/QuotesSlider";
import TeamSlider from "@components/TeamSlider";
import Image from "next/image";

const AboutUs = () => {
    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-about-us.svg"
                title="About us"
                subTitle="About us"
            />
            <div>
                <div className="flex flex-row justify-center items-center mx-[236px] my-[64px]">
                    <Image
                        src="/assets/images/visi-misi.svg"
                        alt="Visi Misi"
                        width={416}
                        height={276}
                    />
                    <div className="flex flex-col ml-[92px]">
                        <div className="flex flex-col">
                            <h2 className="font-workSans font-bold text-[18px] text-primary">
                                WELCOME HUMIC ENGINEERING
                            </h2>
                            <h1 className="font-merriweather font-normal text-[48px] text-primary">
                                VISION & MISSION

                            </h1>
                        </div>
                        <div className="font-workSans font-normal text-[16px]">
                            <p><span className="font-bold text-primary">| </span>Vision</p>
                            <p>To become an excellent research center in the field of engineering to improve the human health and prosperity</p>
                        </div>
                        <div className="font-workSans font-normal text-[16px] mt-[16px]">
                            <p><span className="font-bold text-primary">| </span>Mission</p>
                            <ol className="list-decimal ml-[24px]">
                                <li>Becoming the science and technology excellent center in the field of embedded sensor systems to support biomedical applications based on the Internet of Things (IoT).</li>
                                <li>Becoming the science and technology excellent center on development  remote health monitoring systems based on Internet of Things (IoT).</li>
                                <li>Becoming the science and technology excellent center on Big Data Analytic.</li>
                                <li>Becoming the science and technology excellent center on health development of Information and Communication Technology (ICT).</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
            <QuotesSlider/>
            <div>
                <div className="flex flex-col my-[92px] justify-center items-center">
                    <div className="flex flex-col justify-center items-center text-center mb-[48px]">
                        <h2 className="font-workSans font-bold text-[18px] text-primary">MEET</h2>
                        <h1 className="font-yesevaOne font-normal text-[32px] text-primary">Our Team</h1>
                    </div>
                    <div>
                        <TeamSlider/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AboutUs;