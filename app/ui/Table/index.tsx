import styles from "./Table.module.css";

type TableProps = {
    children: React.ReactNode;
    className?: string;
}

export default function Table({ children, className = "" }: TableProps){
    return (
        <table className={ `${ styles.table } ${ className }` }>
            { children }
        </table>
    )
}