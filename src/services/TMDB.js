import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;

// 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1'
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query({
      query: () => `genre/movie/list?language=en&api_key=${tmdbApiKey}`,
    }),

    //* Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Get Movies by Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }

        //* Get Movies by category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        //* Get Movies by Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }
        //* Get Popular Movies
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    //* Get Movie
    getMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`,
    }),

    //* Get User Specific Lists
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => {
        const storedSessionId = sessionId || localStorage.getItem('session_id');
        const storedAccountId = accountId || localStorage.getItem('account');

        if (!storedSessionId || !storedAccountId) return null;

        return `account/${storedAccountId}/${listName}?api_key=${tmdbApiKey}&session_id=${storedSessionId}&page=${page}`;
      },
    }),
    getRecommendations: builder.query({
      query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`,
    }),

    getActorsDetails: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}`,
    }),

    getMoviesByActorId: builder.query({
      query: ({ id, page }) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetListQuery,
  useGetRecommendationsQuery,
  useGetActorsDetailsQuery,
  useGetMoviesByActorIdQuery,
} = tmdbApi;
