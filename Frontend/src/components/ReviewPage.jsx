import React, { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import { useSelector } from "react-redux";

const ReviewPage = () => {
  const [latestReview, setLatestReview] = useState([]);
  const { allReview } = useSelector((state) => state.review);

  useEffect(() => {
    setLatestReview(allReview.slice(0, 6));
  }, [allReview]);

  return (
    <section className="bg-gray-50 py-16 px-4 md:px-10">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6">
          Real Reviews from Real Learners
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-3xl mx-auto mb-12">
          Discover how our virtual courses are transforming learning experiences through real feedback from students and professionals worldwide.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {latestReview.map((item, index) => (
            <div
              key={index}
              className="animate-fade-in transition-opacity duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <ReviewCard
                rating={item.rating}
                image={item.user.photoUrl}
                text={item.comment}
                name={item.user.name}
                role={item.user.role}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ReviewPage;
