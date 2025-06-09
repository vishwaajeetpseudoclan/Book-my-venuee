import React from 'react';
import { SectionWrapper } from '../components/About us Components/SectionWrapper';

const sections = [
  {
    title: 'Our Story',
    subtitles: [
      'Born to simplify event planning.',
      'Connecting hosts with the best venues and vendors.'
    ],
    content: [
      'BookMyVenue started with a vision: to make event planning effortless, elegant, and enjoyable.',
      'From intimate gatherings to grand celebrations, we bridge the gap between your vision and execution with trusted partners.'
    ],
    image: 'public/Images/Hr.jpg'
  },
  {
    title: 'Our Mission',
    subtitles: [    
      'Empowering celebrations.',
      'One booking at a time.'
    ],
    content: [
      'We aim to be the most reliable platform for event hosts by offering curated listings, user-friendly bookings, and dedicated support.',
      'BookMyVenue is more than a service—it’s your celebration companion.'
    ],
    image: 'public/Images/Hr.jpg'
  },
  {
    title: 'Our Team',
    subtitles: [
      'Behind every celebration, a passionate team.',
      'Driven by technology, powered by people.'
    ],
    content: [
      'We’re a team of designers, developers, and event experts united by a passion for simplifying event planning.',
      'Every feature we build, every partnership we form, is guided by our goal to bring joy to your event journey.'
    ],
    image: 'public/Images/Hr.jpg'
  },
  {
    title: 'Join Us',
    subtitles: [
      'Be a part of something unforgettable.',
      'Help us transform the event industry.'
    ],
    content: [
      'Whether you’re a vendor, venue owner, or someone who believes in great experiences—we want you on board.',
      'Let’s create celebrations worth remembering, together.'
    ],
    image: 'public/Images/Hr.jpg'
  }
];

const AboutUs: React.FC = () => {
  return (
    <div className="bg-white text-gray-800">
      {sections.map((section, index) => (
        <SectionWrapper
          key={index}
          reverse={index % 2 !== 0}
          title={section.title}
          subtitles={section.subtitles}
          content={section.content}
          image={section.image}
        />
      ))}
    </div>
  );
};

export default AboutUs;
