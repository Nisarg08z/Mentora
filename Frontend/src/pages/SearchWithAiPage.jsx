import React, { useState } from 'react'
import ai from "../assets/ai.png"
import ai1 from "../assets/SearchAi.png"
import { RiMicAiFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import start from "../assets/start.mp3"
import { FaArrowLeftLong } from "react-icons/fa6";
import { getRecommendations } from '../utils/api.js';
import Card from '../components/Card.jsx'

const SearchWithAiPage = () => {
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [listening, setListening] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const startSound = new Audio(start);

  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  if (!recognition) {
    console.log("Speech recognition not supported");
  }

  const handleSearch = async () => {
    if (!recognition) return;
    setListening(true);
    startSound.play();
    recognition.start();

    recognition.onresult = async (e) => {
      const transcript = e.results[0][0].transcript.trim();
      setInput(transcript);
      await handleRecommendation(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleRecommendation = async (query) => {
    try {
      setIsSearching(true);
      const result = await getRecommendations(query);
      setRecommendations(result);
      if (result.length > 0) {
        speak("These are the top courses I found for you");
      } else {
        speak("No courses found");
      }
    } catch (error) {
      console.error(error);
      speak("Sorry, something went wrong while fetching recommendations.");
    } finally {
      setListening(false);
      setIsSearching(false);
    }
  };

  console.log("--->>>  ",recommendations)

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 text-gray-900 flex flex-col items-center px-4 py-16">

      {/* Search Container */}
      <div className="relative bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-2xl text-center">
        <FaArrowLeftLong
          className="text-gray-700 w-6 h-6 cursor-pointer absolute top-6 left-6 hover:text-purple-600 transition-colors"
          onClick={() => navigate("/")}
          role="button"
          aria-label="Go back"
        />

        <h1 className="text-2xl sm:text-3xl font-extrabold mb-8 flex items-center justify-center gap-3 select-none">
          <img src={ai} alt="AI" className="w-8 h-8 sm:w-10 sm:h-10" />
          Search with <span className="text-purple-600">AI</span>
        </h1>

        <div className="flex items-center bg-gray-100 rounded-full overflow-hidden shadow relative w-full max-w-xl mx-auto">

          <input
            type="text"
            className="flex-grow px-5 py-3 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm sm:text-base transition-colors"
            placeholder="What do you want to learn? (e.g. AI, MERN, Cloud...)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Search courses"
            spellCheck={false}
            disabled={isSearching || listening}
          />

          {input && (
            <button
              onClick={() => handleRecommendation(input)}
              className={`absolute right-16 bg-purple-600 rounded-full p-2 shadow-md transition-transform
                ${isSearching || listening ? 'opacity-50 cursor-not-allowed hover:scale-100' : 'hover:scale-105 active:scale-95'}`}
              aria-label="Get AI Recommendations"
              type="button"
              disabled={isSearching || listening}
            >
              <img src={ai} alt="AI Icon" className="w-6 h-6 rounded-full" />
            </button>
          )}

          <button
            className={`absolute right-2 bg-purple-600 rounded-full w-10 h-10 flex items-center justify-center shadow-md transition-transform
              ${(listening || isSearching) ? 'animate-pulse opacity-50 cursor-not-allowed hover:scale-100' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
            onClick={handleSearch}
            aria-label="Start voice search"
            type="button"
            disabled={isSearching || listening}
          >
            <RiMicAiFill className="w-6 h-6 text-white" />
          </button>
        </div>

        {isSearching && (
          <p className="mt-4 text-purple-600 font-semibold select-none text-center">
            AI is searching...
          </p>
        )}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 ? (
  <section className="w-full max-w-6xl mt-14 px-2 sm:px-4">
    <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center flex items-center justify-center gap-4 select-none text-gray-900">
      <img
        src={ai1}
        alt="AI Results"
        className="w-12 h-12 sm:w-16 sm:h-16 p-2 rounded-full shadow-lg"
      />
      AI Search Results
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
      {recommendations.map((course, index) => (
        <Card
          key={course._id || index}
          id={course._id}
          thumbnail={course.thumbnail}        
          title={course.title}
          category={course.category}
          price={course.price}
          reviews={course.reviews}
        />
      ))}
    </div>
  </section>
) : (
  <h1 className="text-center text-xl sm:text-2xl mt-14 text-gray-500 select-none">
    {listening ? "Listening..." : "No Courses Found"}
  </h1>
)}

    </div>
  );
}

export default SearchWithAiPage;
