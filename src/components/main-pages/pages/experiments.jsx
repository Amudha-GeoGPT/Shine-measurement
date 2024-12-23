import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import ExperimentList from "../../experiments-page/experiment-list/experiment-list";
import ExperimentHeader from "../../experiments-page/experiment-header/experiment-header";
import { setSearchTerm } from "../../../store/swatch-page/swatch-slice";
import s from "./experiments.module.scss";
import { fetchSwatchName } from "../../../store/swatch-page/swatch-thunk";
import * as thunk from "../../../store/swatchListView-page/swatchListView-thunk";

const Experiments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data = {}, loading, error } = useSelector((state) => state.Swatchlistview);
  const { searchTerm } = useSelector((state) => state.experiments);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredExperiments, setFilteredExperiments] = useState([]);
  const loaderRef = useRef(null);

  const PAGE_SIZE = 10;

  // Fetch Swatch List on Mount
  useEffect(() => {
    dispatch(thunk.fetchSwatchList());
  }, [dispatch]);

  // Filter and Deduplicate Experiments
  const filterAndDeduplicate = useCallback(() => {
    if (!data?.results) return;

    const filtered = data.results.filter((experiment) =>
      !searchTerm || experiment.swatch_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const unique = Array.from(
      new Map(filtered.map((exp) => [exp.swatch_name, exp])).values()
    );

    setFilteredExperiments(unique);
  }, [data, searchTerm]);

  useEffect(() => {
    filterAndDeduplicate();
    setCurrentPage(1);
  }, [filterAndDeduplicate]);

  // Paginate Experiments
  const paginatedExperiments = filteredExperiments.slice(
    0,
    currentPage * PAGE_SIZE
  );

  const loadMoreExperiments = useCallback(() => {
    if (currentPage * PAGE_SIZE < filteredExperiments.length) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, filteredExperiments]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          loadMoreExperiments();
        }
      },
      { root: null, rootMargin: "100px", threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMoreExperiments, loading]);

  // Debounced Search Handler
  const debouncedSearchChange = useCallback(
    debounce((term) => {
      dispatch(setSearchTerm(term));
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (term) => {
    debouncedSearchChange(term);
  };

  // Handle Creating a New Experiment
  const handleCreateNew = async () => {
    try {
      const resultAction = await dispatch(fetchSwatchName()).unwrap();
      const swatchName = resultAction?.data?.results?.swatchname?.swatch_name || "DefaultSwatch";
console.log("reultAction",resultAction?.data?.results?.swatchname?.swatch_name);

      navigate("/CreateExperiment", {
        state: { swatchName },
      });
    } catch (error) {
      console.error("Error generating swatch name:", error);
    }
  };

  return (
    <div className={s.layout}>
      <div className={s.mapParentCont}>
        <ExperimentHeader
          onSearchChange={handleSearchChange}
            onCreateNew={handleCreateNew}
        />
        <div style={{ height: "100%", overflowY: "scroll" ,overflowX:'hidden'}}>
        <ExperimentList experiments={paginatedExperiments} loading={loading} />
        {loading && <p></p>}
          <div ref={loaderRef} style={{ height: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default Experiments;