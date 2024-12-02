import { Outlet } from "react-router-dom";
import React from 'react'
import SideMenu from "../../Mainpage/SideMenu/SideMenu";
import Header from "../../common/Header/Header";
import s from "./Layout.module.scss";
import GraphPage from "../../GraphPage/GraphPage";
const Graphlayout = ({children}) => (
  <>
  <Header/>
  <GraphPage/>
 <div className={s.mainLayout}>
          
            <SideMenu />
           
            <Outlet/>
            {children}
        </div>
  </>
);

export default Graphlayout;



