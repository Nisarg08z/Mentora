import React from 'react'
import { MdCastForEducation } from "react-icons/md"
import { SiOpenaccess } from "react-icons/si"
import { FaSackDollar, FaUsers } from "react-icons/fa6"
import { BiSupport } from "react-icons/bi"

const features = [
  {
    icon: <MdCastForEducation className="w-6 h-6 text-[#03394b]" />,
    text: "20k+ Online Courses",
  },
  {
    icon: <SiOpenaccess className="w-6 h-6 text-[#03394b]" />,
    text: "Lifetime Access",
  },
  {
    icon: <FaSackDollar className="w-6 h-6 text-[#03394b]" />,
    text: "Value For Money",
  },
  {
    icon: <BiSupport className="w-6 h-6 text-[#03394b]" />,
    text: "Lifetime Support",
  },
  {
    icon: <FaUsers className="w-6 h-6 text-[#03394b]" />,
    text: "Community Support",
  },
]

const Logos = () => {
  return (
    <div className="w-full py-8 px-4 md:px-12 flex flex-wrap items-center justify-center gap-4">
      {features.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 bg-white hover:bg-gray-100 px-5 py-3 rounded-xl shadow-md transition duration-300 cursor-pointer"
        >
          {item.icon}
          <span className="text-[#03394b] font-medium text-sm md:text-base">{item.text}</span>
        </div>
      ))}
    </div>
  )
}

export default Logos
