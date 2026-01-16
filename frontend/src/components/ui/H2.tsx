export function H2(props: { text: string; className?: string }) {
    return (
        <h2 className={`text-[30px] font-semibold ${props.className}`}>
            {props.text}
        </h2>
    );
}
