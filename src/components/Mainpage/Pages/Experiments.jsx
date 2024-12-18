import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { debounce } from "lodash"; // Import debounce
import ExperimentList from "../../Experiments/ExperimentList/ExperimentList";
import ExperimentHeader from "../../Experiments/ExperimentHeader/ExperimentHeader";
import { setSearchTerm } from "../../../store/Swatchslice/swatchslice";
import { fetchSwatchName } from "../../../store/Swatchslice/swatchthunk";
import * as thunk from "../../../store/Swatchlistview/swatchlistviewthunk";
import s from "./Experiments.module.scss";
// import Skeleton from 'react-loading-skeleton'
// import 'react-loading-skeleton/dist/skeleton.css'

const Experiments = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { data, loading, error } = useSelector((state) => state.Swatchlistview);
  const { searchTerm } = useSelector((state) => state.experiments);
 
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredExperiments, setFilteredExperiments] = useState([]);
  const loaderRef = useRef(null);
 
  const PAGE_SIZE = 10;

  useEffect(() => {
    dispatch(thunk.fetchSwatchList());
  }, [dispatch]);

  const filterAndDeduplicate = useCallback(() => {
    if (!data?.data?.results) return;
 
    const filtered = data.data.results.filter((experiment) => {
      if (!searchTerm) return true;
      return experiment.swatch_name
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    });
 
    const unique = [];
    const seenIds = new Set();
    for (const experiment of filtered) {
      if (!seenIds.has(experiment.swatch_name)) {
        unique.push(experiment);
        seenIds.add(experiment.swatch_name);
      }
    }
 
    setFilteredExperiments(unique);
  }, [data, searchTerm]);

  useEffect(() => {
    filterAndDeduplicate();
    setCurrentPage(1);
  }, [filterAndDeduplicate]);

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
 
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
 
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loadMoreExperiments, loading]);

  // Debounced search handler
  const debouncedSearchChange = useCallback(
    debounce((term) => {
      dispatch(setSearchTerm(term));
    }, 300),
    [dispatch]
  );

  const handleSearchChange = (term) => {
    debouncedSearchChange(term);
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
 
  return (
    
    <div className={s.layout}>
      <div className={s.mapParentCont}>
        <ExperimentHeader
          onSearchChange={handleSearchChange}
          onCreateNew={handleCreateNew}
        />
        <div style={{ height: "100%", overflowY: "scroll", overflowX: "hidden" }}>
          <ExperimentList experiments={paginatedExperiments} />
          {loading && (
            <>
              <div
                className="placeholder-glow card-img-top"
                style={{ height: "150px" }}
              >
                <span className="placeholder"></span>
              </div>
            </>
          )}
          <div ref={loaderRef} style={{ height: "20px" }} />
        </div>
      </div>
    </div>
  );
};
 
export default Experiments;
 
 