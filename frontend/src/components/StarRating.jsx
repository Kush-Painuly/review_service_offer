import { useState } from "react";
import { gsap } from "gsap";

export default function StarRating({ onSelect }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleClick = (value, e) => {
    setRating(value);
    onSelect(value);

    gsap.fromTo(
      e.target,
      { scale: 1 },
      { scale: 1.3, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }
    );
  };

  return (
    <div className="flex gap-3 text-3xl">
      {[1, 2, 3, 4, 5].map((star) => {
        const active = star <= (hover || rating);

        return (
          <span
            key={star}
            onClick={(e) => handleClick(star, e)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={`cursor-pointer transition-all duration-200 ${
              active
                ? "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.5)]"
                : "text-white/30"
            } hover:scale-110`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}