import { ImageList, ImageListItem } from '@mui/material';
import React from 'react';
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
  // const [searchQuery, setSearchQuery] = React.useState("");

  const query = useSelector((state: RootStateOrAny) => state.search.value);

  // const { value, nama, jenis_kelamin } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  const getGif = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    fetch(
      `http://api.giphy.com/v1/gifs/search?api_key=${REACT_APP_GIPHY_API_KEY}&q=${query}&limit=20`
    )
      .then((response) => response.json())
      .then((result) => {
        setSearchResults(result.data);
      });
  };

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
