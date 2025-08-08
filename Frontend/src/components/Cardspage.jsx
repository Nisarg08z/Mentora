import React, { useEffect, useState } from 'react';
import Card from './Card.jsx';
import { useSelector } from 'react-redux';
import { SiViaplay } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

const Cardspage = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const { courseData } = useSelector(state => state.course);
  const navigate = useNavigate();

  useEffect(() => {
    setPopularCourses(courseData.slice(0, 6));
  }, [courseData]);

  return (
    <section className="w-full flex flex-col items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-white text-gray-800 transition-all">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        Our Popular Courses
      </h1>
      <p className="text-lg text-center text-gray-600 max-w-2xl mb-12">
        Explore top-rated courses to level up your skills, boost your career, and stay ahead in tech, business, and more.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl px-4 mb-16">
        {popularCourses.map((item, index) => (
          <Card
            key={index}
            id={item._id}
            thumbnail={item.thumbnail}
            title={item.title}
            price={item.price}
            category={item.category}
            reviews={item.reviews}
          />
        ))}
      </div>

      <button
        onClick={() => navigate('/allcourses')}
        className="flex items-center gap-3 px-6 py-3 border border-gray-800 bg-gray-800 text-white rounded-lg text-lg font-medium hover:bg-transparent hover:text-gray-800 transition-all duration-300"
      >
        View all Courses
        <SiViaplay className="w-5 h-5" />
      </button>
    </section>
  );
};

export default Cardspage;
