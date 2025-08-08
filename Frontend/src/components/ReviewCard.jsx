import React from "react";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";

const ReviewCard = ({ text, name, image, rating, role }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] max-w-sm w-full">

      {/* Rating */}
      <div className="flex items-center mb-3 text-yellow-400 text-sm">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <span key={i}>
              {i < rating ? <FaStar className="w-4 h-4" /> : <FaRegStar className="w-4 h-4" />}
            </span>
          ))}
      </div>

      {/* Review Text */}
      <p className="text-gray-700 text-[15px] leading-relaxed mb-6 line-clamp-4">
        “{text}”
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={name}
          className="w-11 h-11 rounded-full object-cover ring-1 ring-gray-200"
        />
        <div>
          <h4 className="font-semibold text-gray-800 text-sm">{name}</h4>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
