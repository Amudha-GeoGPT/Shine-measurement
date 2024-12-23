import { Outlet } from "react-router-dom";
import React from 'react'
import SideMenu from "../../main-pages/side-menu/side-menu";
import Header from "../../common/Header/Header";
import s from "./layout.module.scss";
import GraphPage from "../../graph-page/graph-page";
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



