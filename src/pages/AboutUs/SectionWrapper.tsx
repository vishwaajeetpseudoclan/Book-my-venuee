import React, { useEffect, useRef, useState } from 'react';

type Props = {
  reverse?: boolean;
  title: string;
  subtitles: string[];
  content: string[];
  image: string;
};

export const SectionWrapper: React.FC<Props> = ({
  reverse = false,
  title,
  subtitles,
  content,
  image
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Simple scroll reveal logic
  useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => setIsVisible(entry.isIntersecting),
    { threshold: 0.3 }
  );

  if (ref.current) observer.observe(ref.current);

  return () => {
    if (ref.current) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      observer.unobserve(ref.current); 
    }
  };
}, []);

  return (
    <section className="py-16 px-4 sm:px-8 md:px-20 bg-white">
      <div
        ref={ref}
        className={`transition-all duration-1000 ease-in-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        } flex flex-col md:flex-row items-center ${
          reverse ? 'md:flex-row-reverse' : ''
        } gap-12`}
      >
        {/* Image Side */}
        <div className="w-full md:w-2/5">
          <img
            src={image}
            alt={title}
            className="rounded-2xl shadow-xl w-full object-cover hover:scale-105 transition-transform duration-500 ease-in-out"
          />
        </div>

        {/* Text Side */}
        <div className="w-full md:w-3/5 space-y-4">
          <h2 className="text-4xl font-bold text-pink-600 mb-4">{title}</h2>
          {subtitles.map((sub, idx) => (
            <h3 key={idx} className="text-xl font-semibold text-gray-700">{sub}</h3>
          ))}
          {content.map((para, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed">{para}</p>
          ))}
        </div>
      </div>
    </section>
  );
};