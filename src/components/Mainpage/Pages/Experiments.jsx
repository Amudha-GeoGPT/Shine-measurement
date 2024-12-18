import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExperimentList from "../../Experiments/ExperimentList/ExperimentList";
import ExperimentHeader from "../../Experiments/ExperimentHeader/ExperimentHeader";
import { setSearchTerm } from "../../../store/Swatchslice/swatchslice";
import { fetchSwatchName } from "../../../store/Swatchslice/swatchthunk";
import * as thunk from "../../../store/Swatchlistview/swatchlistviewthunk";
import s from "./Experiments.module.scss";

const Experiements = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error } = useSelector((state) => state.Swatchlistview);
  const { searchTerm, status } = useSelector((state) => state.experiments);

  const handleSearchChange = (term) => {
    dispatch(setSearchTerm(term));
  };

  const handleCreateNew = async () => {
    try {
      const resultAction = await dispatch(fetchSwatchName());
      const swatchName =
        resultAction?.payload.data.results.swatchname.swatch_name || "DefaultSwatch";

      navigate("/CreateExperiment", {
        state: { swatchName },
      });
    } catch (error) {
      console.error("Error generating swatch name", error);
    }
  };

  useEffect(() => {
    dispatch(thunk.fetchSwatchList());
  }, [dispatch]);

  const filteredExperiments = data?.data?.results.filter((experiment) => {
    if (!searchTerm) return true; // Show all if searchTerm is empty
    return experiment.id_1?.toString().toLowerCase().includes(searchTerm.toLowerCase());
  });
  

  return (
    <div className={s.layout}>
      <div className={s.mapParentCont}>
        <ExperimentHeader
          onSearchChange={handleSearchChange}
          onCreateNew={handleCreateNew} // Pass the function here
        />
        <div style={{ height: "100%", overflow: "scroll" }}>
          <ExperimentList experiments={filteredExperiments} />
        </div>
      </div>
    </div>
  );
};

export default Experiements;
