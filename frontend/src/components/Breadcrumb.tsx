import { Link } from "react-router-dom";

export function Breadcrumb(props: { text: string; className?: string; path: string }) {
    return (
        <div className="mb-5">
            <Link className="text-gray-400" to={'/'}>Главная</Link> {"> "}
            <Link className="text-blue-500" to={`${props.path}`}>{props.text}</Link>
        </div>
    );
}
