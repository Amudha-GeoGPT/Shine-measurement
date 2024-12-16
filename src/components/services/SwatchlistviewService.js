import {  SWATCHLIST } from "../constants/api-constants";
import { apiGet, apiPost } from "../../utils/axios";

export const getBySwatchlist =()=>{
    return  apiGet(`${SWATCHLIST}`);
}