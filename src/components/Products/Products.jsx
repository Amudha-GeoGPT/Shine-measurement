import cx from "classnames";
import s from "./Products.module.scss";
import Filters from "./Filters/Filters";
import Pagination from "../common/Pagination/Pagination";

export default function Products() {
    return (
        <div className={s.productSection}>
            <Filters />
            Table
            <Pagination />
        </div>
    )
}
