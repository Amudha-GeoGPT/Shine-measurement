import React, { useEffect, useState, useCallback, useRef } from "react";
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

  const [currentPage, setCurrentPage] = useState(1);
  const [experiments, setExperiments] = useState([]);
  const loaderRef = useRef(null);

  const PAGE_SIZE = 10;

  useEffect(() => {
    dispatch(thunk.fetchSwatchList());
  }, [dispatch]);

  // Load initial data
  useEffect(() => {
    if (data?.data?.results) {
      const initialLoad = data.data.results.slice(0, PAGE_SIZE);
      setExperiments(initialLoad);
    }
  }, [data]);

  // Load more experiments on scroll
  const loadMoreExperiments = useCallback(() => {
    const nextPageStart = currentPage * PAGE_SIZE;
    const nextPageEnd = nextPageStart + PAGE_SIZE;

    if (data?.data?.results) {
      const nextBatch = data.data.results.slice(nextPageStart, nextPageEnd);
      if (nextBatch.length > 0) {
        setExperiments((prev) => [...prev, ...nextBatch]);
        setCurrentPage((prev) => prev + 1);
      }
    }
  }, [data, currentPage]);

  // IntersectionObserver to detect when loaderRef is in view
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

  const handleSearchChange = (term) => {
    dispatch(setSearchTerm(term));
    setCurrentPage(1); // Reset pagination on search
    const filtered = data?.data?.results.filter((experiment) =>
      experiment.id_1?.toString().toLowerCase().includes(term.toLowerCase())
    );
    setExperiments(filtered.slice(0, PAGE_SIZE));
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
        <div style={{ height: "100%", overflow: "scroll" }}>
          <ExperimentList experiments={experiments} />
          {loading && <p>Loading...</p>}
          <div ref={loaderRef} style={{ height: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export default Experiments;
