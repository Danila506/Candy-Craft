import { TopHeader } from "./TopHeader";



function Header() {
    

    return (
        <header className="pt-14.75 mb-9 bg-white">
            <TopHeader/>
            <ul className="grid grid-cols-7 items-center justify-between py-15 container ">
                <li className="text-center">
                    <a href="#!">СЛАДКИЕ ДНИ</a>
                </li>
                <li className="text-center">
                    <a href="#!">ПОДАРОЧНЫЕ НАБОРЫ</a>
                </li>
                <li className="text-center">
                    <a href="#!">СОБРАТЬ НАБОР</a>
                </li>
                <li className="text-center">
                    <a className="text-2xl" href="#!">
                        Logo
                    </a>
                </li>
            </ul>
        </header>
    );
}

export default Header;
