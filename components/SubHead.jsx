import Image from "next/image"

const SubHead = ({imagePath, title, subTitle}) => {
    return (
        <div>
            <img
                src={imagePath}
                className="w-full"
            />
            <div className="absolute top-[235px] left-[250px]">
                <div className="flex flex-col justify-center">
                    <p className="font-workSans font-normal text-[18px] text-primary">
                        Home / {subTitle}
                    </p>
                    <h1 className="font-merriweather font-normal text-[48px] text-primary">
                        {title}
                    </h1>
                </div>
            </div>
        </div>
        /* <div
            className="bg-cover bg-center w-full h-[250px] flex flex-col justify-center"
            style={{ backgroundImage: `url(${imagePath})`}}
        >
            <div className="flex flex-col justify-center ml-[248px]">
                <p className="font-workSans font-normal text-[18px] text-primary">
                    Home / {subTitle}
                </p>
                <h1 className="font-merriweather font-normal text-[48px] text-primary">
                    {title}
                </h1>
            </div>
        </div> */
    )
}

export default SubHead