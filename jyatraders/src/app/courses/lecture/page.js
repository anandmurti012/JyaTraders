"use client"
import React, { useState } from 'react';
import styles from './PlaylistWithPlayer.module.css';

const videos = [
  { id: 'M7lc1UVf-VE', title: 'Introduction to React' },
  { id: 'kYkTo_q5EO0', title: 'React Hooks' },
  { id: 'O5G2sDsC8Po', title: 'React State Management' },
  // Add more videos as needed
];

const PlaylistWithPlayer = () => {
  const [selectedVideo, setSelectedVideo] = useState(videos[0].id);

  const handleVideoSelect = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <section className={styles.aboutSection}>
      <div className={styles.container}>
        <div className={styles.playlist}>
          <h2>Playlist</h2>
          <ul>
            {videos.map((video) => (
              <li 
                key={video.id} 
                onClick={() => handleVideoSelect(video.id)} 
                className={styles.playlistItem}
              >
                {video.title}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.player}>
          <div className={styles.iframeWrapper}>
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo}?controls=1`}
              title="YouTube video player"
              className={styles.iframe}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaylistWithPlayer;
