import SubHead from "@components/SubHead"
import RoleMagangCard from "@components/RoleMagangCard"
import roleData from "@constants/InternshipRoles"

const PenerimaanMagang = () => {

    return (
        <>
            <SubHead
                imagePath="/assets/images/sub-head-penerimaan-magang.svg"
                title="Penerimaan Magang"
                subTitle="Penerimaan Magang"
            />
            <div className="flex justify-center">
                <div className="flex flex-wrap w-full max-w-[1128px] my-[64px] gap-[24px]">
                    {roleData.map((role, index) => (
                        <RoleMagangCard
                            key={index}
                            role={role}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default PenerimaanMagang