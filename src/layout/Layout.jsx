import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <Header />
    <main className="flex-1 container">
      {children}
    </main>
    <Footer />
  </div>
)
