import {ClerkProvider} from "@clerk/nextjs";
import '../globals.css';

export const metadata = {
    title: 'Social App',
    description: 'Social Media App'
}

export default  function RootLayout({ children }) {
    return (
        <ClerkProvider>
        <html lang="en">
        <body>{children}</body>
        </html>
        </ClerkProvider>
    )
}