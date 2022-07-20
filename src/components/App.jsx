import { useState, useEffect, useRef } from 'react';

import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './SearchBar/SearchBar';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import { fetchImgs, getIsLastPage } from 'services/api-pixabay';

import { GlobalStyle } from 'styles/GlobalStyle';
import { Container } from './Container.styled';

export const App = () => {
  const isMounted = useRef(false);

  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [error, setError] = useState('');
  const [scrollHeight, setScrollHeight] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (isMounted.current) {
      fetchNewImgs(query, page);
    }

    isMounted.current = true;
  }, [page, query]);

  useEffect(() => {
    scrollToNewImg(scrollHeight);
  }, [scrollHeight, images]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
    setScrollHeight(document.documentElement.scrollHeight - 150);
  };

  const handleQuery = query => {
    setQuery(prevQuery => {
      if (prevQuery !== query) {
        setPage(1);
        setImages([]);
        setError('');
        setScrollHeight(0);
        return query;
      }
    });
  };

  const fetchNewImgs = async (query = '', page = 1) => {
    try {
      setIsLoading(true);

      const respImgs = await fetchImgs(query, page);

      if (respImgs.length === 0) {
        throw new Error(`No results were found for ${query}...`);
      }

      const newImgs = respImgs.map(
        ({ id, webformatURL, largeImageURL, tags }) => ({
          id,
          webformatURL,
          largeImageURL,
          tags,
        })
      );

      setImages(prevImgs => [...prevImgs, ...newImgs]);
      setIsLastPage(getIsLastPage());
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (largeImageURL, tags) => {
    setLargeImageURL(largeImageURL);
    setTags(tags);
  };

  const closeModal = () => {
    setLargeImageURL('');
  };

  const scrollToNewImg = scrollHeight => {
    window.scrollTo({
      top: scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <Searchbar handleQuery={handleQuery} />
        {error !== '' && <p className="message">{error}</p>}
        {error === '' && <ImageGallery images={images} openModal={openModal} />}
        {isLoading && <Loader />}
        {!isLoading &&
          error === '' &&
          (isLastPage ? (
            <p className="noContent">No more content</p>
          ) : (
            images.length !== 0 && <Button handleClick={handleLoadMore} />
          ))}
        {largeImageURL && (
          <Modal
            onClose={closeModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
      </Container>
    </>
  );
};
