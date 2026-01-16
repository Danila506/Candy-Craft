function HeaderLink(props: {text: string, className?:string, href?: string; onClick?: ()=> void}) {

    return (
        <li className="text-center">
            <a 
                className={`transition-colors ${props.className || "text-gray-700 hover:text-rose-600"}`} 
                href={props.href || "#"}
                onClick={props.onClick}
            >
                {props.text}
            </a>
        </li>
    );
}

export default HeaderLink;