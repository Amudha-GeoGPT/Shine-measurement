import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExperimentList from "../../Experiments/ExperimentList/ExperimentList";
import ExperimentHeader from "../../Experiments/ExperimentHeader/ExperimentHeader";
import { setView, setSearchTerm } from "../../../store/Swatchslice/swatchslice";
import { fetchSwatchName } from "../../../store/Swatchslice/swatchthunk";
import s from "./Experiments.module.scss";

const Experiements = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { view, searchTerm, experiments, swatchName, status } = useSelector(
    (state) => state.experiments
  );

  const handleSearchChange = (term) => {
    dispatch(setSearchTerm(term));
  };

  const handleCreateNew = async () => {
    const resultAction = await dispatch(fetchSwatchName());
    if (fetchSwatchName.fulfilled.match(resultAction)) {
      navigate("/CreateExperiment", {
        state: { swatchName: resultAction.payload },
      });
      dispatch(setView("upload"));
    } else {
      console.error(resultAction.payload || "Error generating swatch name");
    }
  };

  const filteredExperiments = experiments.filter((experiment) =>
    experiment.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (status === "failed") {
      console.error("Failed to load swatch name");
    }
  }, [status]);

  return (
    <div className={s.layout}>
      <div className={s.mapParentCont}>
        <ExperimentHeader
          onSearchChange={handleSearchChange}
          onCreateNew={handleCreateNew}
        />
        <div style={{height:'66vh',overflow:'scroll'}}>
        <ExperimentList experiments={filteredExperiments} /></div>
      </div>
    </div>
  );
};

export default Experiements;
