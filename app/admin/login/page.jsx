import AdminLoginForm from "@components/AdminLoginForm"

const AdminLogin = () => {
    return (
        <div className="flex flex-col justify-center py-[92px] px-[184px]">
            <div className="flex flex-col justify-center text-center mb-[64px]">
                <h1 className="font-yesevaOne font-normal text-[32px] text-primary">
                    Selamat Datang Admin
                </h1>
                <h2 className="font-workSans font-bold text-[18px] text-black tracking-[0.15em]">
                    ISI FORM BERIKUT UNTUK MELANJUTKAN.
                </h2>
            </div>
            <AdminLoginForm
                /* data={data}
                showNotValid={showNotValid}
                showError = {showError}
                handleChange={handleChange}
                handleSubmit={handleSubmit} */
            />
        </div>
    )
}

export default AdminLogin