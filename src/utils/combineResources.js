// src/utils/combineResources.js

export const combineResources = (books, videos) => {
    // Add a type property to distinguish between books and videos in the combined array
    const formattedBooks = books?.map((book) => ({
      ...book,
      type: 'book',
    }));
  
    const formattedVideos = videos?.map((video) => ({
      ...video,
      type: 'video',
    }));
  
    // Combine both arrays
    return [...formattedBooks, ...formattedVideos];
  };
  