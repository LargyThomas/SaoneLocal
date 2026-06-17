import { useState } from 'react'
import { FaShoppingCart, FaUser } from 'react-icons/fa'

function NavbarPublic() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <div className="flex justify-between items-center text-black py-6 px-8 md:px-32 bg-white drop-shadow-md">
            <a href="#"> <img src="logo.png" alt="Logo Site" className="w-15 hover:scale-105 transition-all"/></a>
            <ul className="hidden xl:flex items-center gap-12 font-semibold text-base">
                <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer"><a href="#">Catalogue</a></li>
                <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer"><a href="#">Producteurs</a></li>
                <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer"><a href="#">Calendrier</a></li>
                <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer"><a href="#">A Propos</a></li>
                <li className="inline-flex items-center gap-3 rounded-md bg-sky-500 px-5 py-3 font-medium text-white shadow-md transition-all cursor-pointer hover:bg-sky-600"><FaUser /><a href="#">Se Connecter</a></li>
                <li className="inline-flex items-center gap-3 rounded-md bg-sky-500 px-5 py-3 font-medium text-white shadow-md transition-all cursor-pointer hover:bg-sky-600"><FaShoppingCart /><a href="#">Mon Panier</a></li>
            </ul>

            <i className="bx bx-menu xl:hidden block text-5xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}></i>

            <div className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center items-center gap-6 font-semibold text-lg transform transition-transform ${isMenuOpen ? "opacity-100" : "opacity-0"}`} 
            style={{transition: "transform 0.3 ease, opacity 0.3 ease"}}>
                <li className="list-none  w-full text-center p-4 hover:bg-sky-400 hover:text-white hover:underline transition-all cursor-pointer"><a href="#">Catalogue Produits</a></li>
                <li className="list-none  w-full text-center p-4 hover:bg-sky-400 hover:text-white hover:underline transition-all cursor-pointer"><a href="#">Calendrier</a></li>
                <li className="list-none  w-full text-center p-4 hover:bg-sky-400 hover:text-white hover:underline transition-all cursor-pointer"><a href="#">Fiches Producteurs</a></li>
                <li className="list-none  w-full text-center inline-flex items-center gap-3 rounded-md bg-sky-500 px-5 py-3 font-medium text-white shadow-md transition-all cursor-pointer hover:bg-sky-600"><a href="#">Mon Panier</a></li>
                <li className="list-none  w-full text-center inline-flex items-center gap-3 rounded-md bg-sky-500 px-5 py-3 font-medium text-white shadow-md transition-all cursor-pointer hover:bg-sky-600"><a href="#">Me connecter</a></li>
            </div>
        </div>
    )
}

export default NavbarPublic