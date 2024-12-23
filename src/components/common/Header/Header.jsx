import s from "./header.module.scss";
import cx from "classnames";
import notifyIcon from "../../../assets/svg/notify.svg";
import userIcon from "../../../assets/svg/user.svg";
import LogoutIcon from "../../../assets/svg/logout.svg";
import { ReactSVG } from "react-svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate=useNavigate();
    const handletomenu = () => {
        navigate("/")
      }
    return (
        <div className={cx(s.header)}>
            
            <div></div>
            <div className={s.title}>
                <p style={{marginBottom:0}} onClick={handletomenu}>Shine Quantification</p>
            </div>
            <div className={s.rightMenu}>
                <ul>
                    <li>
                        <ReactSVG src={   
                            notifyIcon} />
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
