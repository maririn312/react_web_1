import { Rating } from "react-daisyui";

interface RatingProp {
  rating: number;
  readOnly: boolean;
  size?: "lg" | "md" | "sm" | "xs" | undefined;
}

export function BxRating(props: RatingProp) {

  return (
    <Rating half={true} size={props.size}>
      {Array(10)
        .fill(null)
        .map((_, i) => (
          <Rating.Item
            disabled={props.readOnly}
            readOnly={props.readOnly}
            checked={i+1 === props.rating}
            name="rating-10"
            className={`mask bg-orange-400 mask-star-2 mask-half-${
              i % 2 === 0 ? "1" : "2"
            }`}
          />
        ))}
      <input type="radio" name="rating-10" className="rating-hidden" />
    </Rating>
  );
}
