
import {  SWATCHNAME, } from "../constants/api-constants";
import { apiGet, apiPost } from "../../utils/axios";

export const newSwatchName =()=>{
    return  apiGet(`${SWATCHNAME}`);
}