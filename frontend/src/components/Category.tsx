import type { CategoryType } from "../types/CategoryType";


export function Category(props: CategoryType) {
    return (
        <li key={props.id}>
            <a href="#!" className={`hover:text-rose-500 text-xl duration-200 ${props.className}`}>
                {props.name}
            </a>
        </li>
    );
}