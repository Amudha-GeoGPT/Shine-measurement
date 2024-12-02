import s from "./Header.module.scss";
import cx from "classnames";
import notifyIcon from "../../../assets/svg/notify.svg";
import userIcon from "../../../assets/svg/user.svg";
import LogoutIcon from "../../../assets/svg/logout.svg";
import { ReactSVG } from "react-svg";

export default function Header() {
    return (
        <div className={cx(s.header)}>
            <div></div>
            <div className={s.title}>
                <h2>Shine Quantification</h2>
            </div>
            <div className={s.rightMenu}>
                <ul>
                    <li>
                        <ReactSVG src={notifyIcon} />
                    </li>
                    <li>
                        <ReactSVG src={userIcon} />
                    </li>
                    <li>
                        <ReactSVG src={LogoutIcon} />
                    </li>
                </ul>
            </div>
        </div>
    )
}
