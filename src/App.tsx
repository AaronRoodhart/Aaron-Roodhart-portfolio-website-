import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

interface Milestone {
  id: number;
  year: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  type: 'image' | 'video' | 'youtube';
  color: string;
  link?: string;
  gallery?: string[];
}

const milestones: Milestone[] = [
  {
    id: 1,
    year: '2017',
    title: 'High School Graduation & University Journey Begins',
    shortDescription: 'Graduated high school and began my academic journey in technology',
    fullDescription: 'Completed high school with honors and embarked on my university education, laying the foundation for my career in technology and innovation. This marked the beginning of my formal education in computer science and engineering.',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    year: '2018',
    title: 'First Programming Projects',
    shortDescription: 'Developed initial software applications and web projects',
    fullDescription: 'Began creating my first programming projects, learning various programming languages and frameworks. Built several web applications and software tools that demonstrated my growing technical skills and passion for problem-solving through code.',
    imageUrl: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-green-500'
  },
  {
    id: 3,
    year: '2019',
    title: 'Academic Excellence & Research',
    shortDescription: 'Achieved academic milestones and began research projects',
    fullDescription: 'Maintained excellent academic performance while beginning to engage in research projects. Started exploring advanced topics in computer science and began contributing to open-source projects, building a strong foundation for future innovations.',
    imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    year: '2020',
    title: 'Pandemic Adaptation & Remote Learning',
    shortDescription: 'Adapted to remote learning and continued academic growth',
    fullDescription: 'Successfully navigated the challenges of remote learning during the pandemic, maintaining academic excellence while developing new skills in remote collaboration and digital communication. This period strengthened my adaptability and resilience.',
    imageUrl: 'https://images.pexels.com/photos/3782235/pexels-photo-3782235.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-orange-500'
  },
  {
    id: 5,
    year: '2021',
    title: 'Advanced Technical Skills Development',
    shortDescription: 'Mastered advanced programming languages and frameworks',
    fullDescription: 'Dedicated significant time to mastering advanced programming languages, frameworks, and development tools. Built complex applications and contributed to meaningful projects that showcased my technical growth and problem-solving abilities.',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-red-500'
  },
  {
    id: 6,
    year: '2022',
    title: 'Internship & Industry Experience',
    shortDescription: 'Gained valuable industry experience through internships',
    fullDescription: 'Secured and completed internships that provided hands-on experience in the technology industry. Worked on real-world projects, collaborated with professional teams, and gained insights into industry best practices and workflows.',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-cyan-500'
  },
  {
    id: 7,
    year: '2023',
    title: 'Leadership & Project Management',
    shortDescription: 'Took on leadership roles in academic and personal projects',
    fullDescription: 'Stepped into leadership roles, managing teams and overseeing complex projects from conception to completion. Developed strong project management skills and learned to balance technical excellence with effective team coordination and communication.',
    imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-emerald-500'
  },
  {
    id: 8,
    year: '2024',
    title: 'Innovation & Entrepreneurship',
    shortDescription: 'Launched innovative projects and explored entrepreneurial opportunities',
    fullDescription: 'Began exploring entrepreneurial opportunities and launched innovative projects that addressed real-world problems. Developed business acumen alongside technical skills, creating solutions that demonstrated both technical excellence and market understanding.',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-indigo-500'
  },
  {
    id: 9,
    year: '2025',
    title: 'Cansbridge Fellowship Application',
    shortDescription: 'Pursuing international opportunities and global impact',
    fullDescription: 'Applied for the prestigious Cansbridge Fellowship, seeking to expand my horizons internationally and contribute to global innovation. This represents my commitment to continuous learning, cultural exchange, and making a meaningful impact on a global scale.',
    imageUrl: 'https://www.youtube.com/watch?v=q27jHvFEjiA',
    type: 'youtube',
    color: 'bg-pink-500'
  }
];

function App() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const getYoutubeEmbedUrl = (url: string) => {
    let videoId = '';

    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }

    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          My Journey
        </h1>
        <p className="text-center text-gray-400 mb-8 sm:mb-12 lg:mb-16 text-sm sm:text-base">
          A timeline of milestones and achievements
        </p>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-1 top-10 sm:top-12 bottom-0 flex flex-col">
            <div className="flex-1 bg-gradient-to-b from-orange-500 to-red-500"></div>
            <div className="flex-1 bg-gradient-to-b from-red-500 to-purple-600"></div>
            <div className="flex-1 bg-gradient-to-b from-purple-600 to-emerald-500"></div>
            <div className="flex-1 bg-gradient-to-b from-emerald-500 to-cyan-500"></div>
            <div className="flex-1 bg-gradient-to-b from-cyan-500 to-pink-500"></div>
            <div className="flex-1 bg-pink-500"></div>
          </div>

          <div className="space-y-12 sm:space-y-16 lg:space-y-20">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className="relative pt-10 sm:pt-12"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`
                }}
              >
                <div className={`absolute left-[18px] sm:left-1/2 top-10 sm:top-12 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 ${milestone.color} rounded-full border-2 sm:border-4 border-black z-10 hover:scale-125 transition-transform duration-300 shadow-lg`}></div>

                <div className={`absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 top-0 ${milestone.color} text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded text-base sm:text-lg font-bold z-20 whitespace-nowrap shadow-lg`}>
                  {milestone.year}
                </div>

                <div className={`flex items-center ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className="hidden sm:block sm:w-1/2"></div>
                  <div className={`w-full sm:w-1/2 pl-10 sm:pl-12 ${index % 2 === 0 ? '' : 'sm:pr-12 sm:pl-0'}`}>
                    <div className={`bg-gray-900 rounded-lg overflow-hidden border-l-4 ${milestone.color.replace('bg-', 'border-l-')} border-r border-t border-b border-gray-800 transition-all duration-300 shadow-xl hover:shadow-2xl`}>
                      <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
                        {milestone.type === 'image' ? (
                          <img
                            src={milestone.imageUrl}
                            alt={milestone.title}
                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          />
                        ) : milestone.type === 'youtube' ? (
                          <iframe
                            src={getYoutubeEmbedUrl(milestone.imageUrl)}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <video
                            src={milestone.imageUrl}
                            className="w-full h-full object-cover"
                            controls
                          />
                        )}
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            {milestone.title}
                          </h3>
                          {milestone.link && (
                            <a
                              href={milestone.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0 text-blue-400 hover:text-blue-300 transition-colors duration-200 mt-1"
                              title="Visit external link"
                            >
                              <ExternalLink size={20} />
                            </a>
                          )}
                        </div>
                        <p className="text-gray-300 mb-4 text-sm sm:text-base">
                          {milestone.shortDescription}
                        </p>

                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            expandedId === milestone.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <p className="text-gray-400 mb-4 leading-relaxed text-sm sm:text-base">
                            {milestone.fullDescription}
                          </p>

                          {milestone.gallery && milestone.gallery.length > 0 && (
                            <div className="mt-4">
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
                                {milestone.gallery.map((imgUrl, idx) => (
                                  <div
                                    key={idx}
                                    className="relative aspect-square rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 group"
                                  >
                                    <img
                                      src={imgUrl}
                                      alt={`${milestone.title} gallery ${idx + 1}`}
                                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => toggleExpand(milestone.id)}
                          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium text-sm sm:text-base"
                        >
                          {expandedId === milestone.id ? (
                            <>
                              <span>Show Less</span>
                              <ChevronUp size={18} className="sm:w-5 sm:h-5" />
                            </>
                          ) : (
                            <>
                              <span>Read More</span>
                              <ChevronDown size={18} className="sm:w-5 sm:h-5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default App;
