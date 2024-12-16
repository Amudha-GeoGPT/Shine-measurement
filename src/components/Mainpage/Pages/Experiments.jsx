import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExperimentList from "../../Experiments/ExperimentList/ExperimentList";
import ExperimentHeader from "../../Experiments/ExperimentHeader/ExperimentHeader";
import { setView, setSearchTerm } from "../../../store/Swatchslice/swatchslice";
import { fetchSwatchName } from "../../../store/Swatchslice/swatchthunk";
import  * as thunk from "../../../store/Swatchlistview/swatchlistviewthunk";
import s from "./Experiments.module.scss";

const Experiements = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error } = useSelector((state) => state.Swatchlistview);
  const { view, searchTerm, experiments, swatchName, status } = useSelector(
    (state) => state.experiments
  );

  
  const handleSearchChange = (term) => {
    dispatch(setSearchTerm(term));
  };
//swatchname api
  const handleCreateNew = async () => {
    try {
      const resultAction = await dispatch(fetchSwatchName());
      
      // Extract the payload or any relevant data from the result

      console.log("resultAction?.payload"+JSON.stringify(resultAction?.payload.data.results.swatchname.swatch_name));
      const swatchName =resultAction?.payload.data.results.swatchname.swatch_name || "DefaultSwatch";
  
      console.log("check", JSON.stringify(swatchName));
  
      navigate("/CreateExperiment", {
        state: { swatchName },
      });
    } catch (error) {
      console.error("Error generating swatch name", error);
    }
  };

  //getallswatches-api[swatchlist]
  useEffect(() => {
    dispatch(thunk.fetchSwatchList())
    console.log("data"+JSON.stringify(data));

    if (status === "failed") {
      console.error("Failed to load swatch name");
    }
  }, [status]);

  const filteredExperiments = data?.data?.results.filter((experiment) =>
    experiment.user_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

console.log("data"+JSON.stringify(data?.data?.results))
  
  return (
    <div className={s.layout}>
      <div className={s.mapParentCont}>
        <ExperimentHeader
          onSearchChange={handleSearchChange}
          onCreateNew={handleCreateNew}
        />
        <div style={{height:'100%',overflow:'scroll'}}>
        <ExperimentList experiments={filteredExperiments} />
        </div>
      </div>
    </div>
  );
};

export default Experiements;
