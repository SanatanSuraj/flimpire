// import React, { useEffect } from 'react';
// import { Typography, Button, Box } from '@mui/material';
// import { useSelector } from 'react-redux';
// import { ExitToApp } from '@mui/icons-material';

// import { useGetListQuery } from '../../services/TMDB';

// import { userSelector } from '../../features/auth';
// import RatedCards from '../RatedCards/RatedCards';

// const Profile = () => {
//   const { user } = useSelector(userSelector);

//   const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
//     listName: 'favorite/movies',
//     accountId: user?.id,
//     sessionId: localStorage.getItem('session_id'),
//     page: 1,
//   });

//   const { data: watchlistMovies, refetch: refetchWatchlisted } = useGetListQuery({
//     listName: 'watchlist/movies',
//     accountId: user?.id,
//     sessionId: localStorage.getItem('session_id'),
//     page: 1,
//   });

//   useEffect(() => {
//     refetchFavorites();
//     refetchWatchlisted();
//   }, []);

//   const logout = () => {
//     localStorage.clear();

//     window.location.href = '/';
//   };

//   return (
//     <Box>
//       <Box display="flex" justifyContent="space-between">
//         <Typography variant="h4" gutterBottom>
//           My Profile
//         </Typography>
//         <Button color="inherit" onClick={logout}>
//           Logout &nbsp; <ExitToApp />
//         </Button>
//       </Box>
//       {!favoriteMovies.results.length && !watchlistMovies.results.length ? (
//         <Typography variant="h5">Add favorite or watchlist some movies to see them here</Typography>
//       ) : (
//         <Box>
//           <RatedCards title="Favorite Movies" data={favoriteMovies} />
//           <RatedCards title="Watchlist" data={watchlistMovies} />
//         </Box>
//       )}
//       ;
//     </Box>
//   );
// };

// export default Profile;

import React, { useEffect } from 'react';
import { Typography, Button, Box, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';

import { useGetListQuery } from '../../services/TMDB';
import { userSelector } from '../../features/auth';
import RatedCards from '../RatedCards/RatedCards';

const Profile = () => {
  const { user } = useSelector(userSelector);

  const {
    data: favoriteMovies = { results: [] },
    isFetching: isFavLoading,
    isError: favError,
    refetch: refetchFavorites,
  } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user?.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  const {
    data: watchlistMovies = { results: [] },
    isFetching: isWatchLoading,
    isError: watchError,
    refetch: refetchWatchlisted,
  } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user?.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, [refetchFavorites, refetchWatchlisted]);

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  // Show a loader while either query is fetching
  if (isFavLoading || isWatchLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Show an error message if something went wrong
  if (favError || watchError) {
    return (
      <Typography color="error" align="center" mt={4}>
        Oops! Couldn’t load your movies. Please try again.
      </Typography>
    );
  }

  const noMovies = favoriteMovies.results.length === 0 && watchlistMovies.results.length === 0;

  return (
    <Box p={2}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4">My Profile</Typography>
        <Button color="inherit" onClick={logout} startIcon={<ExitToApp />}>
          Logout
        </Button>
      </Box>

      {noMovies ? (
        <Typography variant="h6" mt={4} align="center">
          Add some favorites or watchlist movies to see them here!
        </Typography>
      ) : (
        <Box mt={4}>
          {favoriteMovies.results.length > 0 && (
            <RatedCards title="Favorite Movies" data={favoriteMovies} />
          )}
          {watchlistMovies.results.length > 0 && (
            <RatedCards title="Watchlist" data={watchlistMovies} />
          )}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
