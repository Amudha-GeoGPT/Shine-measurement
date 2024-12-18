
import { FORMDATA } from "../constants/api-constants";
import { apiPost } from "../../utils/axios";
import { useDispatch } from "react-redux";
import { addresult } from "../../store/fileuploadSlice/finaldataSlice";
import { dispatch } from "../../store/store";





export const processImage = async (userName, swatchName, inputImageName, outputImageName, expName) => {
  try {
    console.log('cfgvhjk',userName)
    const response = await apiPost(`${FORMDATA}`, {
      user_name: userName,
      swatch_name: swatchName,
      inputImage_name: inputImageName,
      outputImage_name: outputImageName,
      exp_name: expName,
    });
    console.log("Process Image Response:", response);
    dispatch(addresult(response.data));

    

    return response;
  } catch (error) {
    console.error("Error processing image:", error);
    throw error;
  }
};
