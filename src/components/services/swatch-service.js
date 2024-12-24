
import {  SWATCHNAME, } from "../constants/api-constants";
import { apiGet } from "../../utils/axios";

export const newSwatchName =()=>{
    return  apiGet(`${SWATCHNAME}`);
}