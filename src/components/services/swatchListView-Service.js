import {  SWATCHLIST } from "../constants/api-constants";
import { apiGet } from "../../utils/axios";

export const getBySwatchlist =()=>{
    return  apiGet(`${SWATCHLIST}`);
}