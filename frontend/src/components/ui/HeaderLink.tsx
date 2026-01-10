function HeaderLink(props: {text: string, className?:string, href?: string; onClick?: ()=> void}) {

    return (
        <li className="text-center">
            <a className={`${props.className}`} href={`${props.href}`}>{props.text}</a>
        </li>
    );
}

export default HeaderLink;