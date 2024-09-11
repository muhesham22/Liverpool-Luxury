import React, { useState } from "react";
import ReviewImg from "../../assets/images/review.png";
import ReviewImg2 from "../../assets/images/review2.png";
import RightArrow from "../../assets/icons/right-arrow.svg";

const reviews = [
  {
    name: "John Doe",
    avatar: ReviewImg,
    stars: 5,
    text: "This is an amazing product! Highly recommend.",
    img: ReviewImg,
  },
  {
    name: "Ali Smith",
    avatar: ReviewImg2,
    stars: 4,
    text: "But also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    img: ReviewImg2,
  },
  // Add more reviews as needed
];

const ReviewsSection = () => {
  const [viewedIndex, setViewedIndex] = useState(0);

  const handlePrevClick = () => {
    setViewedIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  const handleNextClick = () => {
    setViewedIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const currentReview = reviews[viewedIndex];

  return (
    <section className="py-24 bg-white center flex-col space-y-5">
      <h1 className="text-4xl text-center font-bold">Reviews</h1>
<p className="text-center font-semibold text-base max-w-6xl">
  Hear from our satisfied clients and discover why Liverpool Car Rental is the top choice for luxury vehicles in Dubai. 
  Read real experiences and testimonials that showcase our commitment to exceptional service and quality.
</p>

      <div className="flex items-center justify-center space-x-4 w-full px-2">
        <button
          onClick={handlePrevClick}
          className="p-4 px-5  bg-gray-200 rounded-full hover:bg-gray-300 rotate-180"
        >
          <img src={RightArrow} alt="RightArrow" />
        </button>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl border rounded-lg overflow-hidden">
          <div className="hidden md:block">
            <img
              src={currentReview.img}
              alt="Review"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-4 flex flex-col justify-start">
            <div className="flex items-center space-x-4">
              <img
                src={currentReview.avatar}
                alt="Avatar"
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">{currentReview.name}</h3>
                <div className="flex">
                  {Array(currentReview.stars)
                    .fill()
                    .map((_, i) => (
                      <svg
                        key={i}
                        className="w-4 h-4 text-yellow-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927C9.218 2.526 9.782 2.526 9.951 2.927l1.316 3.845c.072.211.282.36.504.36h4.036c.458 0 .648.58.281.859l-3.256 2.36c-.17.124-.24.341-.171.533l1.316 3.845c.17.4-.287.728-.593.447l-3.256-2.36a.585.585 0 00-.684 0l-3.256 2.36c-.306.281-.763-.047-.593-.447l1.316-3.845a.495.495 0 00-.171-.533l-3.256-2.36c-.367-.279-.177-.859.281-.859h4.036c.222 0 .432-.149.504-.36l1.316-3.845z" />
                      </svg>
                    ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-gray-600 max-h-32">{currentReview.text}</p>
          </div>
        </div>
        <button
          onClick={handleNextClick}
          className="p-4 px-5  bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <img src={RightArrow} alt="RightArrow" />
        </button>
      </div>
    </section>
  );
};

export default ReviewsSection;
