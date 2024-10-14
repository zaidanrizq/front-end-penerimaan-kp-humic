import Image from "next/image";

const Loading = () => {
    return (
        <html lang="en">
            <body>
                <main>
                    <Image
                        src="/assets/icons/spinner.svg"
                        alt="loading"
                        width={25}
                        height={25}
                    />
                </main>
            </body>
        </html>
    )
}

export default Loading