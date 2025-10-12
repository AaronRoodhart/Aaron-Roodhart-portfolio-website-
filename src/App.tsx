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
    year: '2020',
    title: 'Driveway Grad',
    shortDescription: 'A socially distanced farewell',
    fullDescription: 'Graduating in 2020 was anything but ordinary. After four unforgettable years, I couldn\'t stand the idea of just receiving our diplomas in the mail, so a few friends and I pitched a new idea to our school board, a driveway graduation. Every student got their own personal ceremony right at home. It was heartfelt, unforgettable, and the perfect way to say goodbye to our high school years.',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    year: '2020',
    title: 'Assemblies Crew',
    shortDescription: 'Redefining what a school assembly could be',
    fullDescription: 'In grade 12, my friends Andy, Ethan, and I became our school\'s "Assembly Ministers." We produced entire cinematic storylines before every assembly, a four-part series complete with a Christmas special. It was chaotic, hilarious, and surprisingly impactful, bringing together hundreds of students with something to look forward to every month.',
    imageUrl: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-green-500'
  },
  {
    id: 3,
    year: '2020',
    title: 'Second Degree Black Belt',
    shortDescription: 'Discipline forged through years of training',
    fullDescription: 'After more than a decade of kickboxing, I earned my second degree black belt. The journey taught me far more than technique. It built my discipline, mental toughness, and respect for growth through repetition. Since then, I have continued to teach and support classes whenever I\'m back at my dojo.',
    imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-purple-500'
  },
  {
    id: 4,
    year: '2020',
    title: 'Brent and Back Challenge',
    shortDescription: '162 km of paddling, 22 km of portaging, 0 hours of sleep',
    fullDescription: 'As part of a charity initiative at Gould Lake Outdoor Centre, our team completed an intense 162 kilometre paddle and 22 kilometre portage in just two days through rain, fog, and pitch darkness. We raised $10,000 to send kids to camp, proving that the hardest challenges are always the most rewarding.',
    imageUrl: 'https://images.pexels.com/photos/3782235/pexels-photo-3782235.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-orange-500'
  },
  {
    id: 5,
    year: '2020',
    title: 'Tutoring Company Launch',
    shortDescription: 'Finding purpose through the pandemic',
    fullDescription: 'When COVID hit, I saw how much students were struggling. So, instead of heading straight to university, I took a gap year to start a tutoring business that blended academics with cognitive behavioural therapy principles. It grew rapidly, helping over 2,000 students and training 23 tutors. It became the foundation of my journey as an entrepreneur and educator.',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-red-500'
  },
  {
    id: 6,
    year: '2021-2022',
    title: 'Gold Duke of Edinburgh Award',
    shortDescription: 'A journey of service, challenge, and adventure',
    fullDescription: 'Over a year of volunteering, fitness, and skill development, I earned the Gold Duke of Edinburgh Award. From expeditions to residential projects, it pushed me to grow as a leader, teammate, and individual. It reminded me that consistency and courage create real impact.',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-cyan-500'
  },
  {
    id: 7,
    year: '2022',
    title: 'Photography Business',
    shortDescription: 'Capturing landscapes, building perspective',
    fullDescription: 'After years of shooting as a hobby, I launched my own photography business in 2022. I taught myself Photoshop and Lightroom, refined my editing style, and started selling landscape prints inspired by my travels through Banff and beyond. What began as curiosity became a creative outlet and my first taste of entrepreneurship.',
    imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-emerald-500'
  },
  {
    id: 8,
    year: '2022',
    title: 'Extracurricular Leadership at McMaster',
    shortDescription: 'Blending business and engineering',
    fullDescription: 'In my second year, I founded a club called EC Com to bridge engineers and commerce students through international competitions. I also joined JDCC to strengthen my case competition skills and contributed to McMaster Formula Electric, helping the team combine technical design with strategic business planning. It was the year I learned how collaboration turns ideas into impact.',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-indigo-500'
  },
  {
    id: 9,
    year: '2022',
    title: 'Custom Gifting Tradition',
    shortDescription: 'Turning gratitude into craftsmanship',
    fullDescription: 'Starting in 2022, I began a yearly tradition of creating handmade gifts for people who had a big impact on me. I learned to sew custom blankets for close friends and carve wooden paddles for mentors, each one representing a shared adventure or lesson learned. It became my way of saying thank you in the most personal way possible.',
    imageUrl: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-pink-500'
  },
  {
    id: 10,
    year: '2023',
    title: '3D Printing and Design',
    shortDescription: 'From prototypes to passion projects',
    fullDescription: 'After discovering 3D printing in an engineering design course, I became obsessed. I taught myself Fusion360 and Blender, started a small online store, and began designing props for franchises like Star Wars, The Legend of Zelda, and Catan. What started as a class project turned into a mini business and a lifelong maker hobby.',
    imageUrl: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-yellow-500'
  },
  {
    id: 11,
    year: '2024',
    title: 'Hot Takes, Cold Tanks',
    shortDescription: 'Conversations that chilled us to the bone',
    fullDescription: 'In our final year of university, my friend and I launched a show called Hot Takes, Cold Tanks, a mix of ice baths and unfiltered interviews. We trained to withstand the cold, filmed several episodes, and hosted backyard premieres for our neighbours. The show ended after our landlord saw the hydro bill, but it was one of the most fun and freezing projects I have ever done.',
    imageUrl: 'https://images.pexels.com/photos/3782235/pexels-photo-3782235.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-teal-500'
  },
  {
    id: 12,
    year: '2024',
    title: 'MARS Apprentice Revival',
    shortDescription: 'Bringing back a legacy',
    fullDescription: 'MARS Apprentice was a legendary business competition that once shaped careers and even sparked a few marriages. After COVID shut it down, I was asked to bring it back. In just four months, I rebuilt the entire program from scratch, secured new sponsors, and helped launch a full semester season. The best part came a year later when a new team took what we built and tripled its size, proving the power of building something that lasts.',
    imageUrl: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-rose-500'
  },
  {
    id: 13,
    year: '2025',
    title: 'Vipassana Retreat',
    shortDescription: 'Ten days of silence, stillness, and self discovery',
    fullDescription: 'In March 2025, I finally took on a lifelong goal, a ten day silent Vipassana meditation retreat. No speaking, no eye contact, no distractions, just ten hours of meditation a day. It was one of the hardest and most transformative experiences of my life, teaching me patience, clarity, and calm in ways I never expected.',
    imageUrl: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-violet-500'
  },
  {
    id: 14,
    year: '2025',
    title: 'DOT',
    shortDescription: 'The notebook that bridges paper and digital',
    fullDescription: 'I have journaled for over five years, but one problem always remained. I couldn\'t bring my digital memories into my notebook. That led me to create DOT, a smart journal that connects physical pages to digital content using NFC technology. After seventy user interviews, twenty three prototypes, and one hundred twenty three pre MVP sales, I joined The Forge incubator and began developing the companion app. Launch coming soon.',
    imageUrl: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-slate-500'
  },
  {
    id: 15,
    year: '2025',
    title: 'Backpacking Across Asia and Hawaii',
    shortDescription: 'Two months of discovery and perspective',
    fullDescription: 'Right after building DOT and completing Vipassana, I spent two months traveling through Hawaii, Japan, Vietnam, Cambodia, and Thailand. Backpacking through these places taught me about gratitude, simplicity, and how differently people around the world define happiness. It was the perfect reset and a reminder of how much there is to learn by simply exploring.',
    imageUrl: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-amber-500'
  },
  {
    id: 16,
    year: '2025',
    title: 'Zingos',
    shortDescription: 'Building the next generation of makers',
    fullDescription: 'To inspire my younger cousins\' curiosity about entrepreneurship, I started Zingos, a mini family business. I taught them to use CAD, 3D print their own toys, and launch an Etsy shop. Watching them sell their first creations was even more rewarding than selling my own. It showed me how contagious creativity can be.',
    imageUrl: 'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=800',
    type: 'image',
    color: 'bg-lime-500'
  },
  {
    id: 17,
    year: '2025',
    title: 'Cansbridge Fellowship Application',
    shortDescription: 'Pursuing international opportunities and global impact',
    fullDescription: 'Applied for the prestigious Cansbridge Fellowship, seeking to expand my horizons internationally and contribute to global innovation. This represents my commitment to continuous learning, cultural exchange, and making a meaningful impact on a global scale.',
    imageUrl: 'https://www.youtube.com/watch?v=q27jHvFEjiA',
    type: 'youtube',
    color: 'bg-fuchsia-500'
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
