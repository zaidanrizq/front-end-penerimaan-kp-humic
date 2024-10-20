import Image from "next/image"

const ContactSquare = ({bgColor, textColor, iconColor, iconWidth, iconHeight, icon, title, description, isLink}) => {
    return !isLink ? (
        <div className={`flex justify-start items-center w-[233px] h-[233px] m-[8px] rounded-md ${bgColor} hover:shadow-xl transition-all duration-[250ms]`}>
            <div className={`flex flex-col mx-[24px] my-[32px] font-workSans ${textColor} gap-[4px]`}>
                <Image
                    src={icon}
                    alt={title}
                    width={iconWidth}
                    height={iconHeight}
                    className={`fill-${iconColor}`}
                />
                <h2 className="font-bold text-[18px]">
                    {title}
                </h2>
                <p className="font-normal text-[16px]">
                    {description}
                </p>
            </div>
        </div>
    ) : (
        <div className={`flex justify-start items-center w-[233px] h-[233px] m-[8px] rounded-md ${bgColor} hover:shadow-xl transition-all duration-[250ms]`}>
            <div className={`flex flex-col mx-[24px] my-[32px] font-workSans ${textColor}`}>
                <Image
                    src={icon}
                    alt={title}
                    width={40}
                    height={38}
                    className={`fill-${iconColor}`}
                />
                <h2 className="font-bold text-[18px]">
                    {title}
                </h2>
                <a 
                    href={description} 
                    className="font-normal text-[16px] hover:underline underline-offset-auto"
                >
                    {description}
                </a>
            </div>
        </div>
    )
}

export default ContactSquare