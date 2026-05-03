import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ReviewCard from "./ReviewCard";

export default function ReviewList({ reviews }) {
  const containerRef = useRef();

  useEffect(() => {
    if (reviews.length > 0) {
      gsap.fromTo(
        containerRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.6,
          ease: "power3.out"
        }
      );
    }
  }, [reviews]);

  return (
    <div ref={containerRef} className="grid gap-4 mt-6">
      {reviews.map((review, i) => (
        <ReviewCard key={i} review={review} />
      ))}
    </div>
  );
}