import { Outlet } from "react-router-dom";
import React from 'react'
import SideMenu from "../../Mainpage/SideMenu/SideMenu";
import Header from "../../common/Header/Header";
import s from "./Layout.module.scss";
const DashboardLayout = ({children}) => (
  <>
  <Header/>
 <div className={s.mainLayout}>
          
            <SideMenu />
            <Outlet/>
            {children}
        </div>
  </>
);

export default DashboardLayout;



