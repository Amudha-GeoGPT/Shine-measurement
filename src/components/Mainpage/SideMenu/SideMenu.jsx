import React, { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";
import s from "./SideMenu.module.scss";

// Icons
import BookIcon from "../../../assets/svg/book_4.svg";
import Back from "../../../assets/svg/backward_arrow.svg"; // Replace with your icon paths

const SideMenu = () => {
  // const [isCollapsed, setIsCollapsed] = useState(false);
  // useEffect(() => {     
  //   // Function to check the window width
  //   const checkWindowWidth = () => {      

  //     if(window.innerWidth < 800){
  //       setIsCollapsed(true);
  //     }
  //     else{
  //       setIsCollapsed(false);
  //     }
  //           };     
     
  //      checkWindowWidth();     
  //      window.addEventListener('resize', checkWindowWidth);     
   
  //      return () => { window.removeEventListener('resize', checkWindowWidth);

  //       };
  //     },[])
  // const toggleSidebar = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  return (
    
      <nav className={s.nav}>
        {/* Logo Section */}
   

        {/* Main Menu */}
        <div className={s.menu}>
        <h5 className={s.fs_14}>MAIN MENU</h5>
          <div className={s.menuSection}>
            <ReactSVG src={BookIcon} className={s.menuIcon} />
            <h2 className={s.menuTitle}>Experiments</h2>
          </div>
        </div>

        {/* Toggle Button */}
         {/* <button className={s.sidebarToggle} onClick={toggleSidebar}>
        <ReactSVG src={Back} className={s.menuIcon} />
      
        </button>  */}

      </nav>
  
  );
};

export default SideMenu;
