import { Outlet } from "react-router-dom";
import React from 'react'
import SideMenu from "../../main-pages/side-menu/side-menu";
import Header from "../../common/header/header";
import s from "./layout.module.scss";
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

          <div style={{height:'100%',overflow:'scroll',backgroundColor:'#F6F8F7'}}>  
            <Outlet/>
            {children}
            </div>
        </div>
        </div>
  </>
);

export default DashboardLayout;



