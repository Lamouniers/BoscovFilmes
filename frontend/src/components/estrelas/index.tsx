"use client";
import { useState } from "react";
import styles from "./styles.module.scss";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  editable: boolean;
}

export default function StarRating({
  rating,
  onRatingChange,
  editable,
}: StarRatingProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className={styles.starRating}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`${styles.star} ${
            (hover || rating) >= star ? styles.filled : ""
          }`}
          onClick={() => editable && onRatingChange && onRatingChange(star)}
          onMouseEnter={() => editable && setHover(star)}
          onMouseLeave={() => editable && setHover(0)}
          disabled={!editable}
        >
          ★
        </button>
      ))}
    </div>
  );
}
