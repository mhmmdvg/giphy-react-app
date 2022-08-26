import { ImageList, ImageListItem } from '@mui/material';
import React, { useEffect } from 'react';
import { RootStateOrAny, useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchForm from '../../component/searchComp/SearchForm';

import { searchQuery } from '../../redux/slice';

type ResultGif = {
  id: string;
  url: string;
  title: string;
  images: {
    original: {
      url: string;
    };
  };
};

type ResultGifs = ResultGif[];

function Search() {
  const { REACT_APP_GIPHY_API_KEY } = process.env;
  const [searchResults, setSearchResults] = React.useState<ResultGifs>([]);

  const query = useSelector((state: RootStateOrAny) => state.search.value);

  const dispatch = useDispatch();

  const getGif = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${REACT_APP_GIPHY_API_KEY}&q=${query}&limit=20`
    )
      .then((response) => response.json())
      .then((result) => {
        setSearchResults(result.data);
      });
  };

  useEffect(() => {
    const fetchingData = async () => {
      // /sanctum/csrf-cookie

      const getCsrfToken = await fetch(
        'https://eling-api.qiffyamuhammad.my.id/sanctum/csrf-cookie',
        {
          method: 'GET',
          credentials: 'include',
        }
      );

      const data = getCsrfToken.json();
      console.log(data);

      await fetch('https://eling-api.qiffyamuhammad.my.id/api/login', {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          username: 'qiffym',
          password: '12345',
        }),
      }).then((res) => console.log(res));
    };

    fetchingData();
  }, []);

  return (
    <>
      <Link to="/trending">Trending Gif</Link>
      <h1>Giphy Search</h1>

      <SearchForm
        data-testid="search-form"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          dispatch(searchQuery(e.target.value))
        }
        onSubmit={getGif}
      />

      <div className="container">
        <ImageList
          sx={{ width: '80%', height: '100%' }}
          variant="woven"
          cols={3}
          gap={8}
        >
          {searchResults.map((gif) => (
            <ImageListItem key={gif.id}>
              <img
                src={`${gif.images.original.url}?w=161&fit=crop&auto=format`}
                srcSet={`${gif.images.original.url}?w=161&fit=crop&auto=format&dpr=2 2x`}
                alt={gif.title}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    </>
  );
}

export default Search;
