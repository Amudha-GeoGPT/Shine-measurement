import React from 'react';
import ExperimentCard from '../ExperimentCard/ExperimentCard';
import styles from './ExperimentList.module.scss';

const ExperimentList = ({ experiments }) => {
  return (
    <div className={styles.container}>
      {experiments.map((experiment) => (
        <ExperimentCard key={experiment.id} experiment={experiment} />
      ))}
    </div>
  );
};

export default ExperimentList;
