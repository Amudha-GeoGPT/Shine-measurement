import { Outlet } from "react-router-dom";
import React from 'react'
import SideMenu from "../../Mainpage/SideMenu/SideMenu";
import Header from "../../common/Header/Header";
import s from "./Layout.module.scss";
const DashboardLayout = ({children}) => (
  <>
  <div style={{
    height:' 100vh',
    overflow: 'scroll',
    display:'flex',
    flexDirection:'column'
  }}> 
  <Header/>
  
 < div className={s.mainLayout}>
          
          <SideMenu />

          <div style={{overflow:'scroll',backgroundColor:'#F6F8F7'}}>  
            <Outlet/>
            {children}
            </div>
        </div>
        </div>
  </>
);

export default DashboardLayout;



