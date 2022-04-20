import React, { useEffect, useState } from 'react';

const { REACT_APP_GIPHY_API_KEY } = process.env;

type TrendingGif = {
  id: string;
  url: string;
  title: string;
  images: {
    original: {
      url: string;
    };
  };
};

type TrendingGifs = TrendingGif[];

export default function Trending() {
  const [trending, setTrending] = useState<TrendingGifs>([]);

  useEffect(() => {
    fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${REACT_APP_GIPHY_API_KEY}`
    )
      .then((response) => response.json())
      .then((result) => {
        setTrending(result.data);
      });
  }, [setTrending]);

  return (
    <>
      <h1>Trending</h1>
      {trending.map((gif) => (
        <img
          key={gif.id}
          className="image-gif"
          src={gif.images.original.url}
          alt={gif.title}
        />
      ))}
    </>
  );
}
