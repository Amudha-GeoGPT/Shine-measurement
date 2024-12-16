import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages } from '../../../store/thunks/imageResultThunks';
import s from './ImageResult.module.scss';

const ImageCard = ({ item }) => {
  return (
    <div className={`${s.gridItem}`}>
      <div className={s.imageWrapper}>
        <div className={s.imageContainer}>
          <img
            src={item.imageUrl}
            alt={item.title}
            className={s.image}
          />
        </div>
      </div>
      <div className={s.contentWrapper}>
        <h3 className={s.title}>{item.title}</h3>
        <a
          href={item.downloadLink}
          className={s.downloadLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          Download Graph
        </a>
      </div>
    </div>
  );
};

const ImageResult = () => {
  const dispatch = useDispatch();
  const { images, loading, error } = useSelector((state) => state.imageResult);

  useEffect(() => {
    dispatch(fetchImages('A004'));
  }, [dispatch]);

  if (loading) {
    return <div className='p-3'>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className={s.imageResult}>
      <div className="container-fluid">
        <div className={s.gridContainer}>
          {images.map((item) => (
            <ImageCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageResult;