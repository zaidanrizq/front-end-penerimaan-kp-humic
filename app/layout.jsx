import "@styles/global.css"
import Topmost from "@components/Topmost";
import NavBar from "@components/NavBar";
import Footer from "@components/Footer";

const RootLayout = ({ children }) => {
    
    return (
        <html lang="en">
            <body>
                <main>
                    <Topmost/>
                    <NavBar/>
                    {children}
                    <Footer/>
                </main>
            </body>
        </html>
    )
}

export default RootLayout;