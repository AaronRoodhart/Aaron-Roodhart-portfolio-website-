import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface Milestone {
  id: number;
  year: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  type: 'image' | 'video' | 'youtube';
}

const milestones: Milestone[] = [
  {
    id: 1,
    year: '2020',
    title: 'First Major Project Launch',
    shortDescription: 'Launched innovative web platform',
    fullDescription: 'Successfully launched a comprehensive web platform that revolutionized how users interact with digital content. This project involved cutting-edge technologies and reached over 10,000 users in the first month.',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image'
  },
  {
    id: 2,
    year: '2021',
    title: 'Award Recognition',
    shortDescription: 'Received industry excellence award',
    fullDescription: 'Honored with the Innovation Excellence Award for outstanding contributions to the tech industry. This recognition validated years of hard work and dedication to pushing boundaries in software development.',
    imageUrl: 'https://images.pexels.com/photos/3782235/pexels-photo-3782235.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image'
  },
  {
    id: 3,
    year: '2022',
    title: 'Team Expansion',
    shortDescription: 'Grew team to 50+ members',
    fullDescription: 'Successfully scaled the team from 10 to over 50 talented individuals across multiple departments. This growth enabled us to take on more ambitious projects and deliver exceptional results consistently.',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image'
  },
  {
    id: 4,
    year: '2023',
    title: 'Product Evolution',
    shortDescription: 'Released version 2.0 with AI features',
    fullDescription: 'Launched a completely reimagined version of our flagship product, incorporating advanced AI capabilities that transformed user experience. The release was met with overwhelming positive feedback and drove significant market growth.',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image'
  },
  {
    id: 5,
    year: '2024',
    title: 'Global Expansion',
    shortDescription: 'Opened offices in 5 new countries',
    fullDescription: 'Expanded operations globally with new offices across Europe, Asia, and South America. This strategic move positioned us as a truly international company and opened doors to exciting new market opportunities.',
    imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image'
  },
  {
    id: 6,
    year: '2025',
    title: 'Innovation Showcase',
    shortDescription: 'Demonstrating cutting-edge technology',
    fullDescription: 'Showcasing our latest innovations and breakthroughs in technology. This presentation highlights the future direction of our products and services, demonstrating our commitment to staying at the forefront of industry advancement.',
    imageUrl: 'https://www.youtube.com/watch?v=UDGCL-_OLHo',
    type: 'youtube'
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
          Aaron Roodhart's Portfolio
        </h1>
        <p className="text-center text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">
          Hey Cansbridge 👋<br />
          This is a quick little timeline of projects, achievements, and accomplishments from my journey over these past few years
        </p>
        
        {/* Cansbridge Video Application Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Video Application
          </h2>
          <div className="relative w-full max-w-4xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border border-gray-800 hover:border-blue-500 transition-all duration-300">
              <iframe
                src="https://www.youtube-nocookie.com/embed/q27jHvFEjiA"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Cansbridge Video Application"
              />
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Timeline
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-1 bg-blue-500 h-full"></div>

          <div className="space-y-8 sm:space-y-12 lg:space-y-16">
            {milestones.map((milestone, index) => (
              <div
                key={milestone.id}
                className="relative"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`
                }}
              >
                <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-blue-500 rounded-full border-2 sm:border-4 border-black z-10 hover:scale-125 transition-transform duration-300 shadow-lg shadow-blue-500/50"></div>
                <div className="absolute left-8 sm:left-1/2 sm:transform sm:translate-x-4 top-1/2 sm:top-1/2 sm:-translate-y-1/2 bg-gray-900 border border-blue-500 rounded-lg px-2 py-1 text-blue-400 font-bold text-sm sm:text-base shadow-lg">
                  {milestone.year}
                </div>

                <div className={`flex items-center ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className="hidden sm:block sm:w-1/2"></div>
                  <div className={`w-full sm:w-1/2 pl-12 ${index % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12'}`}>
                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 shadow-xl">
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
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-300 mb-4 text-sm sm:text-base">
                          {milestone.shortDescription}
                        </p>

                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            expandedId === milestone.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <p className="text-gray-400 mb-4 leading-relaxed text-sm sm:text-base">
                            {milestone.fullDescription}
                          </p>
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
