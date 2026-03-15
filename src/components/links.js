// src/Links.js
import React from 'react';

function Links() {
  return (
    <div className="links-container">
      <button
        className="link-button spotify"
        onClick={() => window.open("https://open.spotify.com/intl-es/artist/6KImCVD70vtIoJWnq6nGn3?si=2avYSxwaTk-EFZ6zm4L9Zg", "_blank")}
      >
        Spotify
      </button>
    </div>
  );
}

export default Links;