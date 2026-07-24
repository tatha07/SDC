function pad(n) {
  return String(n + 1).padStart(2, '0');
}

function Frame({ slide, n }) {
  return (
    <figure className="frame">
      {slide.image ? (
        <img src={slide.image} alt={slide.title} />
      ) : (
        <div className="frame-empty">
          <span className="fidx">{pad(n)}</span>
        </div>
      )}
      <figcaption>
        <span className="cidx">{pad(n)}</span>
        {slide.title}
      </figcaption>
    </figure>
  );
}

// Free-flowing strip: the track is duplicated so the CSS animation loops
// seamlessly with no visible jump. Pauses on hover; still on reduced-motion.
function Marquee({ slides, reverse = false }) {
  const loop = [...slides, ...slides];

  return (
    <div className="marquee" aria-label="Event photos">
      <div className={reverse ? 'marquee-track reverse' : 'marquee-track'}>
        {loop.map((slide, i) => (
          <Frame key={`${slide.title}-${i}`} slide={slide} n={i % slides.length} />
        ))}
      </div>
    </div>
  );
}

export default Marquee;
