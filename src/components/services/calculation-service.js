
// import { CALCULATION, } from "../constants/api-constants";
// import { apiGet, apiPost } from "../../utils/axios";

// export const getByCalculate =()=>{
//     return  apiPost(`${CALCULATION}`);
// }

import { CALCULATION } from "../constants/api-constants";
import { apiPost } from "../../utils/axios";

export const getByCalculate = (swatchName) => {
  return apiPost(`${CALCULATION}`, { swatch_name: swatchName });
};