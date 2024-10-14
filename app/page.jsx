import Image from "next/image";
import VerticalTimeline from "@components/VerticalTimeline";

const Home = () => {
    return (
        <div>
            <div className="flex justify-center ">
                <Image
                    src="/assets/images/poster.svg"
                    alt="Poster"
                    width={1920}
                    height={1080}
                />
            </div>
            <div className="margin-p-home">
                <div className="flex flex-col justify-center">
                    <h2 className="font-workSans text-lg font-bold text-secondary text-center">
                        WELCOME TO
                    </h2>
                    <h1 className="font-yesevaOne title-home text-primary text-center">
                        HUMIC Engineering
                    </h1>
                </div>
                    <p className="font-workSans text-base font-normal text-center mt-8">
                        Humic Engineering dengan bangga membuka kesempatan magang bagi mahasiswa yang ingin mendapatkan pengalaman berharga dalam dunia kerja. Melalui program magang ini, Anda mendapatkan kesempatan untuk terlibat langsung dalam proyek-proyek inovatif yang kami jalankan serta memperluas pengetahuan dan keterampilan di bidang teknik. Telusuri lebih lanjut mengenai posisi magang yang tersedia, syarat dan ketentuan, serta jadwal pendaftara. Jadilah bagian dari tim kami dan kembangkan karier anda bersama HUMIC!
                    </p>
            </div>
            <div className="flex flex-col justify-center mb-[92px]">
                <h1 className="font-yesevaOne title-home text-primary text-center mb-8">
                    Alur Magang
                </h1>
                <VerticalTimeline/>
            </div>
        </div>
    );
};

export default Home;