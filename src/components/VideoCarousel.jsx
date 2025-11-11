import React, { useState } from 'react';

export default function VideoCarousel({ videos, width = '100%', height = '400px' }) {
  const [current, setCurrent] = useState(0);
  const total = videos.length;

  const prev = () => setCurrent((current - 1 + total) % total);
  const next = () => setCurrent((current + 1) % total);

  return (
    <div style={{ position: 'relative', width, height }}>
      <video
        key={current}
        src={videos[current]}
        controls
        style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }}
      />
      <button
        onClick={prev}
        style={{ position: 'absolute', top: '50%', left: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.5rem' }}
      >‹</button>
      <button
        onClick={next}
        style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '1.5rem' }}
      >›</button>
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px' }}>
        {videos.map((_, i) => (
          <span key={i} onClick={() => setCurrent(i)} style={{ width: '10px', height: '10px', borderRadius: '50%', background: i === current ? 'white' : 'rgba(255,255,255,0.5)', cursor: 'pointer' }} />
        ))}
      </div>
    </div>
  );
}
