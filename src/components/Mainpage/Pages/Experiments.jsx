import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ExperimentList from "../../Experiments/ExperimentList/ExperimentList";
import ExperimentHeader from "../../Experiments/ExperimentHeader/ExperimentHeader";
import { setSearchTerm } from "../../../store/Swatchslice/swatchslice";
import { fetchSwatchName } from "../../../store/Swatchslice/swatchthunk";
import * as thunk from "../../../store/Swatchlistview/swatchlistviewthunk";
import s from "./Experiments.module.scss";

const Experiments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading, error } = useSelector((state) => state.Swatchlistview);
  const { searchTerm } = useSelector((state) => state.experiments);

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

  // Helper function to remove duplicates based on id_1
  const getUniqueExperiments = (experiments) => {
    const seenIds = new Set();
    return experiments.filter((experiment) => {
      if (seenIds.has(experiment.id_1)) {
        return false; // Skip duplicate
      }
      seenIds.add(experiment.id_1);
      return true;
    });
  };

  // Apply search filtering and remove duplicates
  const filteredExperiments = getUniqueExperiments(
    data?.data?.results.filter((experiment) => {
      if (!searchTerm) return true; // Show all if searchTerm is empty
      return experiment.id_1?.toString().toLowerCase().includes(searchTerm.toLowerCase());
    }) || []
  );

  return (
    <div className={s.layout}>
      <div className={s.mapParentCont}>
        <ExperimentHeader
          onSearchChange={handleSearchChange}
          onCreateNew={handleCreateNew}
        />
        <div style={{ height: "100%", overflow: "scroll" }}>
          <ExperimentList experiments={filteredExperiments} />
        </div>
      </div>
    </div>
  );
};

export default Experiments;
