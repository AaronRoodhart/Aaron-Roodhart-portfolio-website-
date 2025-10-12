import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';

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
    imageUrl: 'https://youtu.be/UTGcwufq_Jc?si=qoq_KWVwMuMXsjlz',
    type: 'youtube',
    color: 'bg-blue-500',
    gallery: [
      '/IMG_1572.JPG',
      '/IMG_1873.JPG',
      '/IMG_0350.JPG',
      '/4298327E-377B-4D54-8A1A-56697C2C9640.jpeg'
    ]
  },
  {
    id: 2,
    year: '2020',
    title: 'Assemblies Crew',
    shortDescription: 'Redefining what a school assembly could be',
    fullDescription: 'In grade 12, my friends Andy, Ethan, and I became our school\'s "Assembly Ministers." We produced entire cinematic storylines before every assembly, a four-part series complete with a Christmas special. It was chaotic, hilarious, and surprisingly impactful, bringing together hundreds of students with something to look forward to every month.',
    imageUrl: '/assemblies-main.png',
    type: 'image',
    color: 'bg-green-500',
    gallery: [
      'https://youtu.be/wOVy9dmfSuM?si=m7eKJaOJZiDw9Kde',
      'https://youtu.be/4_8DvywPuCA?si=XqtZXwluvY1Bk9wL',
      'https://youtu.be/5JBq8jC-8-Y?si=ByF0HAeX9OHRD2Os',
      'https://youtu.be/yIPuWSSmLfU?si=CxmtkyDgwowQP8Ll'
    ]
  },
  {
    id: 3,
    year: '2020',
    title: 'Second Degree Black Belt',
    shortDescription: 'Discipline forged through years of training',
    fullDescription: 'After more than a decade of kickboxing, I earned my second degree black belt. The journey taught me far more than technique. It built my discipline, mental toughness, and respect for growth through repetition. Since then, I have continued to teach and support classes whenever I\'m back at my dojo.',
    imageUrl: '/Header Photo.png',
    type: 'image',
    color: 'bg-purple-500',
    gallery: [
      '/cm-chat-media-video-1_4e594edc-6233-5e4e-9efc-fef0483eba62_67_0_0.mov'
    ]
  },
  {
    id: 4,
    year: '2020',
    title: 'Brent and Back Challenge',
    shortDescription: '162 km of paddling, 22 km of portaging, 0 hours of sleep',
    fullDescription: 'As part of a charity initiative at Gould Lake Outdoor Centre, our team completed an intense 162 kilometre paddle and 22 kilometre portage in just two days through rain, fog, and pitch darkness. We raised $10,000 to send kids to camp, proving that the hardest challenges are always the most rewarding.',
    imageUrl: '/IMG_2458.JPG',
    type: 'image',
    color: 'bg-orange-500',
    gallery: [
      '/IMG_3175.JPG',
      '/IMG_3177_Original.JPG'
    ]
  },
  {
    id: 5,
    year: '2020',
    title: 'Tutoring Company Launch',
    shortDescription: 'Finding purpose through the pandemic',
    fullDescription: 'When COVID hit, I saw how much students were struggling. So, instead of heading straight to university, I took a gap year to start a tutoring business that blended academics with cognitive behavioural therapy principles. It grew rapidly, helping over 2,000 students and training 23 tutors. It became the foundation of my journey as an entrepreneur and educator.',
    imageUrl: '/Header Image.png',
    type: 'image',
    color: 'bg-[#EFA013]'
  },
  {
    id: 6,
    year: '2021-2022',
    title: 'Gold Duke of Edinburgh Award',
    shortDescription: 'A journey of service, challenge, and adventure',
    fullDescription: 'Over a year of volunteering, fitness, and skill development, I earned the Gold Duke of Edinburgh Award. From expeditions to residential projects, it pushed me to grow as a leader, teammate, and individual. It reminded me that consistency and courage create real impact.',
    imageUrl: '/Main Image.jpg',
    type: 'image',
    color: 'bg-cyan-500',
    gallery: [
      '/IMG_5982.JPG'
    ]
  },
  {
    id: 7,
    year: '2022',
    title: 'Photography Business',
    shortDescription: 'Capturing landscapes, building perspective',
    fullDescription: 'After years of shooting as a hobby, I launched my own photography business in 2022. I taught myself Photoshop and Lightroom, refined my editing style, and started selling landscape prints inspired by my travels through Banff and beyond. What began as curiosity became a creative outlet and my first taste of entrepreneurship.',
    imageUrl: '/photography-main.png',
    type: 'image',
    color: 'bg-emerald-500',
    link: 'https://aaronroodhart20.pixieset.com/aaronportfolio/',
    gallery: [
      '/photo1.png',
      '/photo2.png',
      '/photo3.png',
      '/photo4.png',
      '/photo5.png',
      '/photo6.png',
      '/photo7.png',
      '/photo8.png'
    ]
  },
  {
    id: 8,
    year: '2022',
    title: 'Extracurricular Leadership at McMaster',
    shortDescription: 'Blending business and engineering',
    fullDescription: 'In my second year, I founded a club called EC Com to bridge engineers and commerce students through international competitions. I also joined JDCC to strengthen my case competition skills and contributed to McMaster Formula Electric, helping the team combine technical design with strategic business planning. It was the year I learned how collaboration turns ideas into impact.',
    imageUrl: '/mcmaster-main.png',
    type: 'image',
    color: 'bg-indigo-500',
    gallery: [
      '/mcmaster-1.jpg',
      '/mcmaster-2.JPG',
      '/mcmaster-3.JPG'
    ]
  },
  {
    id: 9,
    year: '2022',
    title: 'Custom Gifting Tradition',
    shortDescription: 'Turning gratitude into craftsmanship',
    fullDescription: 'Starting in 2022, I began a yearly tradition of creating handmade gifts for people who had a big impact on me. I learned to sew custom blankets for close friends and carve wooden paddles for mentors, each one representing a shared adventure or lesson learned. It became my way of saying thank you in the most personal way possible.',
    imageUrl: '/custom-main.jpg',
    type: 'image',
    color: 'bg-pink-500',
    gallery: [
      '/custom-1.jpg',
      '/custom-2.JPG',
      '/custom-3.jpg',
      '/custom-4.JPG',
      '/custom-5.jpg'
    ]
  },
  {
    id: 10,
    year: '2023',
    title: '3D Printing and Design',
    shortDescription: 'From prototypes to passion projects',
    fullDescription: 'After discovering 3D printing in an engineering design course, I became obsessed. I taught myself Fusion360 and Blender, started a small online store, and began designing props for franchises like Star Wars, The Legend of Zelda, and Catan. What started as a class project turned into a mini business and a lifelong maker hobby.',
    imageUrl: '/3d-main.JPG',
    type: 'image',
    color: 'bg-yellow-500',
    gallery: [
      '/3d-1.png',
      '/3d-2.png',
      '/3d-3.png',
      '/3d-4.png',
      '/3d-video.MOV'
    ]
  },
  {
    id: 11,
    year: '2024',
    title: 'Hot Takes, Cold Tanks',
    shortDescription: 'Conversations that chilled us to the bone',
    fullDescription: 'In our final year of university, my friend and I launched a show called Hot Takes, Cold Tanks, a mix of ice baths and unfiltered interviews. We trained to withstand the cold, filmed several episodes, and hosted backyard premieres for our neighbours. The show ended after our landlord saw the hydro bill, but it was one of the most fun and freezing projects I have ever done.',
    imageUrl: '/hot-takes-christmas.mp4',
    type: 'video',
    color: 'bg-teal-500',
    gallery: [
      '/hot-takes-1.png',
      '/hot-takes-2.png',
      '/hot-takes-3.png'
    ]
  },
  {
    id: 12,
    year: '2024',
    title: 'MARS Apprentice Revival',
    shortDescription: 'Bringing back a legacy',
    fullDescription: 'MARS Apprentice was a legendary business competition that once shaped careers and even sparked a few marriages. After COVID shut it down, I was asked to bring it back. In just four months, I rebuilt the entire program from scratch, secured new sponsors, and helped launch a full semester season. The best part came a year later when a new team took what we built and tripled its size, proving the power of building something that lasts.',
    imageUrl: '/mars-main.png',
    type: 'image',
    color: 'bg-rose-500',
    gallery: [
      '/mars-1.png',
      '/mars-2.png',
      '/mars-3.png',
      '/mars-4.png',
      '/mars-5.png',
      '/mars-6.png'
    ]
  },
  {
    id: 13,
    year: '2025',
    title: 'Vipassana Retreat',
    shortDescription: 'Ten days of silence, stillness, and self discovery',
    fullDescription: 'In March 2025, I finally took on a lifelong goal, a ten day silent Vipassana meditation retreat. No speaking, no eye contact, no distractions, just ten hours of meditation a day. It was one of the hardest and most transformative experiences of my life, teaching me patience, clarity, and calm in ways I never expected.',
    imageUrl: '/vipassana-main.JPG',
    type: 'image',
    color: 'bg-violet-500'
  },
  {
    id: 14,
    year: '2025',
    title: 'DOT',
    shortDescription: 'The notebook that bridges paper and digital',
    fullDescription: 'I have journaled for over five years, but one problem always remained. I couldn\'t bring my digital memories into my notebook. That led me to create DOT, a smart journal that connects physical pages to digital content using NFC technology. After seventy user interviews, twenty three prototypes, and one hundred twenty three pre MVP sales, I joined The Forge incubator and began developing the companion app. Launch coming soon.',
    imageUrl: '/dot-main.png',
    type: 'image',
    color: 'bg-slate-500',
    link: 'https://dotbooks.ca',
    gallery: [
      '/dot-1.jpeg',
      '/dot-2.JPG',
      '/dot-3.JPG',
      '/dot-4.JPG',
      '/dot-5.JPG',
      '/dot-6.png',
      '/dot-video.mov'
    ]
  },
  {
    id: 15,
    year: '2025',
    title: 'Backpacking Across Asia and Hawaii',
    shortDescription: 'Two months of discovery and perspective',
    fullDescription: 'Right after building DOT and completing Vipassana, I spent two months traveling through Hawaii, Japan, Vietnam, Cambodia, and Thailand. Backpacking through these places taught me about gratitude, simplicity, and how differently people around the world define happiness. It was the perfect reset and a reminder of how much there is to learn by simply exploring.',
    imageUrl: '/backpack-video.mov',
    type: 'video',
    color: 'bg-amber-500',
    gallery: [
      '/backpack-main.png',
      '/backpack-1.jpeg',
      '/backpack-2.jpeg',
      '/backpack-3.jpeg',
      '/backpack-4.JPG',
      '/backpack-5.jpg',
      '/backpack-6.jpg',
      '/backpack-7.jpg',
      '/backpack-8.JPG',
      '/backpack-9.JPG'
    ]
  },
  {
    id: 16,
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
  const [galleryModal, setGalleryModal] = useState<{
    isOpen: boolean;
    images: string[];
    currentIndex: number;
    title: string;
  }>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: ''
  });
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openGallery = (images: string[], title: string, startIndex: number = 0) => {
    setGalleryModal({
      isOpen: true,
      images,
      currentIndex: startIndex,
      title
    });
  };

  const closeGallery = () => {
    setGalleryModal({
      isOpen: false,
      images: [],
      currentIndex: 0,
      title: ''
    });
  };

  const nextImage = () => {
    setGalleryModal(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length
    }));
  };

  const prevImage = () => {
    setGalleryModal(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1
    }));
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

  const getYoutubeThumbnail = (url: string) => {
    let videoId = '';

    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    }

    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };


  // Group milestones by year
  const groupedMilestones = milestones.reduce((acc, milestone) => {
    const year = milestone.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(milestone);
    return acc;
  }, {} as Record<string, Milestone[]>);

  // Get years in chronological order
  const years = Object.keys(groupedMilestones).sort();

  return (
    <div className="min-h-screen text-white overflow-x-hidden bg-gradient-to-br from-black via-gray-900 to-blue-900">
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-12 lg:py-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4 text-white">
          Hi Cansbridge 👋
        </h1>
        <p className="text-center text-gray-400 mb-8 sm:mb-12 lg:mb-16 text-sm sm:text-base">
          Here are a few of my favorite projects, hobbies, and achievements I've worked on over the past few years.
        </p>

        <div className="relative">
          <div className="absolute left-4 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-1 bg-blue-500" style={{ height: 'calc(100% - 120px)' }}></div>

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

                <div className={`flex items-center ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className="hidden sm:block sm:w-1/2"></div>
                  <div className={`w-full sm:w-1/2 pl-12 ${index % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12'}`}>
                    <div 
                      ref={(el) => (cardRefs.current[milestone.id] = el)}
                      className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-blue-500 transition-all duration-300 shadow-xl"
                    >
                      <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
                        {milestone.type === 'image' ? (
                          <img
                            src={milestone.imageUrl}
                            alt={milestone.title}
                            className={`w-full h-full hover:scale-110 transition-transform duration-500 ${
                              milestone.title === 'Second Degree Black Belt' ? 'object-top object-cover' : 
                              milestone.title === 'Tutoring Company Launch' ? 'object-contain' : 'object-cover'
                            }`}
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
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        )}
                        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-lg">
                          {milestone.year}
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="mb-2">
                          <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                            {milestone.title}
                          </h3>
                          {milestone.link && (
                            <div className="mb-2">
                              <a
                                href={milestone.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200 font-medium text-sm"
                                title="Visit website"
                              >
                                <span>🔗</span>
                                <span>Website</span>
                                <ExternalLink size={16} />
                              </a>
                            </div>
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
                                {milestone.gallery.map((mediaUrl, idx) => {
                                  const isVideo = mediaUrl.toLowerCase().match(/\.(mp4|mov|avi|webm)$/);
                                  const isYouTube = mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be');
                                  
                                  return (
                                    <div
                                      key={idx}
                                      className="relative aspect-square rounded-lg overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 group cursor-pointer"
                                      onClick={() => openGallery(milestone.gallery!, milestone.title, idx)}
                                    >
                                      {isYouTube ? (
                                        <div className="relative w-full h-full">
                                          <img
                                            src={getYoutubeThumbnail(mediaUrl)}
                                            alt={`${milestone.title} YouTube video ${idx + 1}`}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            onError={(e) => {
                                              // Fallback to a default YouTube thumbnail if the image fails to load
                                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjE4MCIgdmlld0JveD0iMCAwIDMyMCAxODAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMjAiIGhlaWdodD0iMTgwIiBmaWxsPSIjMDAwIi8+CjxwYXRoIGQ9Ik0xMzcuNzcgOTAuMDAwMUwxMTcuNzcgMTAwVjgwTDEzNy43NyA5MC4wMDAxWiIgZmlsbD0iI0ZGRiIvPgo8L3N2Zz4K';
                                            }}
                                          />
                                          <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-red-600 rounded-full p-3 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                                              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                              </svg>
                                            </div>
                                          </div>
                                        </div>
                                      ) : isVideo ? (
                                        <video
                                          src={mediaUrl}
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                          muted
                                        />
                                      ) : (
                                        <img
                                          src={mediaUrl}
                                          alt={`${milestone.title} gallery ${idx + 1}`}
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                      )}
                                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                          <div className="bg-white bg-opacity-20 rounded-full p-2">
                                            {isYouTube ? (
                                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                              </svg>
                                            ) : isVideo ? (
                                              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                              </svg>
                                            ) : (
                                              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                              </svg>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => toggleExpand(milestone.id)}
                          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:scale-105"
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
          
          {/* To be continued message */}
          <div className="text-center mt-20 mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              To be continued...
            </h2>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {galleryModal.isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            {galleryModal.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all duration-200"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-3 transition-all duration-200"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            {/* Image, Video, or YouTube */}
            <div className="relative w-full h-full flex items-center justify-center">
              {galleryModal.images[galleryModal.currentIndex].includes('youtube.com') || galleryModal.images[galleryModal.currentIndex].includes('youtu.be') ? (
                <iframe
                  src={getYoutubeEmbedUrl(galleryModal.images[galleryModal.currentIndex])}
                  className="w-full h-full max-w-4xl max-h-[80vh] rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : galleryModal.images[galleryModal.currentIndex].toLowerCase().match(/\.(mp4|mov|avi|webm)$/) ? (
                <video
                  src={galleryModal.images[galleryModal.currentIndex]}
                  controls
                  className="max-w-full max-h-full object-contain rounded-lg"
                  autoPlay
                  loop
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={galleryModal.images[galleryModal.currentIndex]}
                  alt={`${galleryModal.title} - Media ${galleryModal.currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}
            </div>

            {/* Image Counter */}
            {galleryModal.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full text-sm">
                {galleryModal.currentIndex + 1} / {galleryModal.images.length}
              </div>
            )}

            {/* Title */}
            <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm">
              {galleryModal.title}
            </div>
          </div>
        </div>
      )}

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
