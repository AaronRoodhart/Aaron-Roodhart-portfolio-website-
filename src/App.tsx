import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Milestone {
  id: number;
  year: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl: string;
  type: 'image' | 'video' | 'youtube';
  link?: string;
  gallery?: string[];
  category: 'career' | 'projects' | 'cool stuff';
}

const milestones: Milestone[] = [
  {
    id: 1,
    year: '2020',
    title: 'Driveway Grad',
    shortDescription: 'A socially distanced farewell',
    fullDescription: 'Graduating in 2020 was anything but ordinary. After four incredible years, I couldn\'t stand the idea of just receiving our diplomas in the mail, so a few friends and I pitched an idea to our school board — a driveway graduation. Every student got their own personal ceremony right at home. It was pretty awesome getting to see how much it meant to my peers and their families and was the perfect way to say goodbye to our high school classmates and friends.',
    imageUrl: 'https://youtu.be/UTGcwufq_Jc?si=qoq_KWVwMuMXsjlz',
    type: 'youtube',
    category: 'cool stuff',
    gallery: [
      '/IMG_1572.JPG',
      '/IMG_1873.JPG',
      '/IMG_0350.JPG',
      '/4298327E-377B-4D54-8A1A-56697C2C9640.jpeg'
    ]
  },
  {
    id: 3,
    year: '2020',
    title: 'Second Degree Black Belt',
    shortDescription: '10+ years of training',
    fullDescription: 'After more than a decade of kickboxing, I earned my second-degree black belt. The journey taught me so much more beyond technique. It built my discipline, mental toughness, and respect that the best things come with time. Since then, I\'ve continued to teach and support classes whenever I\'m back at my dojo and now teach at McMaster to new students coming into the sport.',
    imageUrl: '/Header Photo.png',
    type: 'image',
    category: 'cool stuff',
    gallery: [
      '/cm-chat-media-video-1_4e594edc-6233-5e4e-9efc-fef0483eba62_67_0_0.mov'
    ]
  },
  {
    id: 4,
    year: '2020',
    title: 'Brent and Back Challenge',
    shortDescription: '162 km of paddling, 22 km of portaging, 0 hours of sleep',
    fullDescription: 'For most of my young adult years, I worked as an outdoor educator at a camp called Gould Lake. I would take students on 1-3 week-long leadership trips across North America. As part of a charity initiative at Gould Lake, the staff completed an intense 162-kilometre paddle and 22-kilometre portage in just two days. Through constant rain, no sleep, and just a bit of hypothermia, we raised $10,000 to send kids to camp.',
    imageUrl: '/IMG_2458.JPG',
    type: 'image',
    category: 'cool stuff',
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
    fullDescription: 'When COVID hit, I saw how much students were struggling. So, instead of heading straight to university, I took a gap year to start a tutoring business that blended academics with cognitive-behavioural therapy principles. It grew fast, with over 2,000 students helped, and a team of tutors helping students across Canada, becoming the foundation of my journey as an entrepreneur and educator.',
    imageUrl: '/Header Image.png',
    type: 'image',
    category: 'career'
  },
  {
    id: 6,
    year: '2021–2022',
    title: 'Gold Duke of Edinburgh Award',
    shortDescription: 'A journey of service, challenge, and adventure',
    fullDescription: 'Over a year of volunteering, fitness, and skill development, I earned the Gold Duke of Edinburgh Award. From expeditions to residential projects at Queens University, it pushed me to grow as a leader, teammate, and individual. I also got a cool pin ;)',
    imageUrl: '/Main Image.jpg',
    type: 'image',
    category: 'cool stuff',
    gallery: [
      '/IMG_5982.JPG'
    ]
  },
  {
    id: 7,
    year: '2022',
    title: 'Photography Business',
    shortDescription: 'Capturing landscapes, building perspective',
    fullDescription: 'I have always loved cameras since I got my first Sony Powershot when I was in grade 2, but it wasn\'t until I launched my own photography business in 2022 where I really fell in love with it. I taught myself Photoshop and Lightroom, refined my editing style, and started selling landscape prints from my travels. As someone who grew up in the outdoors and learned to appreciate the beauty and gifts the outdoors can give us, I fell in love with capturing that beauty and sharing it with others.',
    imageUrl: '/photography-main.png',
    type: 'image',
    category: 'projects',
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
    fullDescription: 'In my second year I became very involved on campus. From putting together a team of engineering and business students to participate in international competitions, to joining JDCC to strengthen my case competition skills, and becoming the first business member on McMaster Formula Electric, where I helped the team combine technical design with strategic business planning. It was an incredible year of learning that made me fall in love with the McMaster community.',
    imageUrl: '/mcmaster-main.png',
    type: 'image',
    category: 'career',
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
    fullDescription: 'Starting in 2022 I began a yearly tradition of creating handmade blankets and paddles for people who had a big impact on me. I learned to sew custom blankets for close friends and carve wooden paddles for mentors, each one representing a shared adventure or lesson learned. It became my way of saying thank you in a very Aaron way, I guess.',
    imageUrl: '/custom-main.jpg',
    type: 'image',
    category: 'cool stuff',
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
    category: 'projects',
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
    fullDescription: 'In our final year of university, my friend and I launched a show called Hot Takes, Cold Tanks as a fun project for the two of us to do. We trained to withstand the cold, filmed several episodes, and hosted backyard "premieres" for our neighbours. The show ended after our landlord saw the hydro bill, but it was a very fun project while it lasted and if anything I can now say I can be in an ice bath for over 10 minutes.',
    imageUrl: '/hot-takes-christmas.mp4',
    type: 'video',
    category: 'projects',
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
    fullDescription: 'MARS Apprentice was a historic 20 year old business competition that once shaped the careers of hundreds of students and even sparked a few marriages. After COVID shut it down, I was asked if I would be interested in bringing it back. I couldn\'t say no. In just four months, I rebuilt the entire program from scratch, secured new sponsors, and helped launch a full semester-long season. The best part: a year later, a new team took what we built and tripled its size, proving the power of building something that lasts beyond you.',
    imageUrl: '/mars-main.png',
    type: 'image',
    category: 'career',
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
    shortDescription: 'Ten days of no talking',
    fullDescription: 'In March 2025, I decided to take some time off school to work on some personal goals of mine, one of the biggest being to take part in a ten-day silent Vipassana meditation retreat. No verbal or non-verbal communication for 10 days, I wasn\'t even allowed to bring a notebook. I just spent 10 hours a day meditating. It was one of the hardest and most transformative experiences of my life. There were countless lessons, but I think one of the largest ones that ran true for me was to accept reality for how it is, not how you want it to be.',
    imageUrl: '/vipassana-main.JPG',
    type: 'image',
    category: 'cool stuff'
  },
  {
    id: 14,
    year: '2025',
    title: 'DOT',
    shortDescription: 'The notebook that bridges paper and digital',
    fullDescription: 'I\'ve journaled for over five years, but one problem always remained: I couldn\'t add my photos into my notebook. That led me to create DOT, a paper journal that connects physical pages to digital content using NFC technology. After 70+ user interviews, 23 prototypes, and 123 pre-MVP sales, I joined The Forge incubator and began developing the companion app. Launch coming soon 👀',
    imageUrl: '/dot-main.png',
    type: 'image',
    category: 'career',
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
    fullDescription: 'Right after building DOT and completing my Vipassana retreat, I spent two months travelling through Hawaii, Japan, Vietnam, Cambodia, and Thailand. Backpacking across these places gave me so much perspective of life outside of the traditional Western and European perspectives. Seeing how so many live their lives in such different yet purposeful and intentional ways gave me a lot to think about as I came to the end of my university career and was the perfect reset. It was a reminder of how much there is to learn by simply exploring.',
    imageUrl: '/backpack-video.mov',
    type: 'video',
    category: 'cool stuff',
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
  }
];


function App() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<'career' | 'projects' | 'cool stuff' | 'all'>('all');
  
  // Extract years from milestones and determine range
  const extractYear = (yearString: string): number => {
    // Handle ranges like "2021–2022" by taking the first year
    const firstYear = yearString.split('–')[0].split('-')[0].trim();
    return parseInt(firstYear, 10);
  };
  
  const allYears = milestones.map(m => extractYear(m.year));
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  
  const [yearRange, setYearRange] = useState<[number, number]>([minYear, maxYear]);
  const [activeHandle, setActiveHandle] = useState<'start' | 'end' | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  
  const getYearFromPosition = (clientX: number): number => {
    if (!sliderRef.current) return minYear;
    const rect = sliderRef.current.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    return Math.round(minYear + (maxYear - minYear) * percentage);
  };
  
  const handleMouseDown = (handle: 'start' | 'end', e: React.MouseEvent) => {
    e.preventDefault();
    setActiveHandle(handle);
    isDraggingRef.current = true;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const newYear = getYearFromPosition(e.clientX);
      
      if (handle === 'start') {
        if (newYear <= yearRange[1]) {
          setYearRange([newYear, yearRange[1]]);
        }
      } else {
        if (newYear >= yearRange[0]) {
          setYearRange([yearRange[0], newYear]);
        }
      }
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
      setActiveHandle(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };
  
  const handleSliderClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only handle clicks on the track, not on handles
    if ((e.target as HTMLElement).classList.contains('slider-handle')) return;
    
    const clickedYear = getYearFromPosition(e.clientX);
    const startPos = (yearRange[0] - minYear) / (maxYear - minYear);
    const endPos = (yearRange[1] - minYear) / (maxYear - minYear);
    const clickPos = (clickedYear - minYear) / (maxYear - minYear);
    const startDistance = Math.abs(clickPos - startPos);
    const endDistance = Math.abs(clickPos - endPos);
    
    if (startDistance < endDistance) {
      // Closer to start handle
      if (clickedYear <= yearRange[1]) {
        setYearRange([clickedYear, yearRange[1]]);
      }
    } else {
      // Closer to end handle
      if (clickedYear >= yearRange[0]) {
        setYearRange([yearRange[0], clickedYear]);
      }
    }
  };
  
  // Helper function to get the correct path for assets (handles base URL for GitHub Pages)
  const getAssetPath = (path: string): string => {
    if (path.startsWith('http') || path.startsWith('//')) {
      return path; // External URLs
    }
    return `${import.meta.env.BASE_URL}${path.startsWith('/') ? path.slice(1) : path}`;
  };
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

  const getYoutubeVideoId = (url: string): string => {
    if (url.includes('youtube.com/watch?v=')) {
      return url.split('v=')[1]?.split('&')[0] || '';
    } else if (url.includes('youtu.be/')) {
      return url.split('youtu.be/')[1]?.split('?')[0] || '';
    }
    return '';
  };

  const getYoutubeEmbedUrl = (url: string) => {
    const videoId = getYoutubeVideoId(url);
    return `https://www.youtube-nocookie.com/embed/${videoId}`;
  };

  const getYoutubeThumbnail = (url: string) => {
    const videoId = getYoutubeVideoId(url);
    return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };


  // Filter milestones based on selected category and year range
  const filteredMilestones = milestones.filter(m => {
    // Category filter
    const matchesCategory = selectedFilter === 'all' || m.category === selectedFilter;
    
    // Year range filter
    const milestoneYear = extractYear(m.year);
    const matchesYearRange = milestoneYear >= yearRange[0] && milestoneYear <= yearRange[1];
    
    return matchesCategory && matchesYearRange;
  });

  // Filter button configuration
  const filterButtons = [
    { id: 'all', label: 'All', color: '#4CAF50', hoverColor: '#45a049' },
    { id: 'career', label: 'Career', color: '#298DEE', hoverColor: '#1a6bb8' },
    { id: 'projects', label: 'Projects', color: '#FAB900', hoverColor: '#d9a000' },
    { id: 'cool stuff', label: 'Cool stuff😎', color: '#F44F1B', hoverColor: '#d13e15' }
  ] as const;

  return (
    <>
      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: transparent;
          cursor: grab;
          border: none;
        }
        input[type="range"]:active::-webkit-slider-thumb {
          cursor: grabbing;
        }
        input[type="range"]::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: transparent;
          cursor: grab;
          border: none;
        }
        input[type="range"]:active::-moz-range-thumb {
          cursor: grabbing;
        }
        input[type="range"]::-webkit-slider-runnable-track {
          background: transparent;
          height: 2px;
        }
        input[type="range"]::-moz-range-track {
          background: transparent;
          height: 2px;
        }
      `}</style>
      <div className="min-h-screen overflow-x-hidden" style={{ backgroundColor: '#F4F1EA' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-12 lg:py-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
          Hi There 👋
        </h1>
        <p className="text-center mb-6 sm:mb-8 text-sm sm:text-base" style={{ color: '#666' }}>
          My name's Aaron Roodhart. Below is a timeline of some of my favourite projects, hobbies, and achievements I've worked on over the past few years.
        </p>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8" style={{ minHeight: '40px' }}>
          {filterButtons.map((filter) => {
            const isActive = selectedFilter === filter.id;
            const rgbaColor = filter.color.match(/\d+/g)?.map(Number) || [41, 141, 238];
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id as typeof selectedFilter)}
                className="px-4 py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-200"
                style={{
                  backgroundColor: isActive ? filter.color : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#1a1a1a',
                  border: isActive ? 'none' : '1px solid rgba(0, 0, 0, 0.1)',
                  boxShadow: isActive ? `0 2px 4px rgba(${rgbaColor[0]}, ${rgbaColor[1]}, ${rgbaColor[2]}, 0.2)` : 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isActive ? filter.hoverColor : '#F9F9F9';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isActive ? filter.color : '#FFFFFF';
                }}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Year Range Slider */}
        <div className="mb-8 sm:mb-12 lg:mb-16 px-2 sm:px-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm sm:text-base font-medium" style={{ color: '#1a1a1a' }}>
              {yearRange[0]}
            </span>
            <span className="text-xs sm:text-sm font-medium" style={{ color: '#666' }}>
              Year Range
            </span>
            <span className="text-sm sm:text-base font-medium" style={{ color: '#1a1a1a' }}>
              {yearRange[1]}
            </span>
          </div>
          <div 
            ref={sliderRef}
            className="relative" 
            style={{ height: '50px', paddingTop: '15px' }}
            onClick={handleSliderClick}
          >
            {/* Track Background */}
            <div 
              className="absolute top-1/2 left-0 right-0 h-2 rounded-full"
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.08)',
                transform: 'translateY(-50%)'
              }}
            />
            {/* Active Range */}
            <div 
              className="absolute top-1/2 h-2 rounded-full"
              style={{ 
                backgroundColor: '#298DEE',
                left: `${((yearRange[0] - minYear) / (maxYear - minYear)) * 100}%`,
                width: `${((yearRange[1] - yearRange[0]) / (maxYear - minYear)) * 100}%`,
                transform: 'translateY(-50%)',
                transition: activeHandle ? 'none' : 'all 0.2s ease'
              }}
            />
            {/* Start Handle */}
            <div
              className="slider-handle absolute top-1/2 rounded-full border-2 transition-all cursor-grab active:cursor-grabbing"
              style={{
                backgroundColor: '#298DEE',
                borderColor: '#FFFFFF',
                left: `calc(${((yearRange[0] - minYear) / (maxYear - minYear)) * 100}% - 12px)`,
                transform: `translateY(-50%) scale(${activeHandle === 'start' ? 1.3 : 1})`,
                width: activeHandle === 'start' ? '28px' : '24px',
                height: activeHandle === 'start' ? '28px' : '24px',
                boxShadow: activeHandle === 'start' 
                  ? '0 4px 12px rgba(41, 141, 238, 0.6)' 
                  : '0 2px 6px rgba(41, 141, 238, 0.4)',
                zIndex: 30
              }}
              onMouseDown={(e) => handleMouseDown('start', e)}
            />
            {/* End Handle */}
            <div
              className="slider-handle absolute top-1/2 rounded-full border-2 transition-all cursor-grab active:cursor-grabbing"
              style={{
                backgroundColor: '#298DEE',
                borderColor: '#FFFFFF',
                left: `calc(${((yearRange[1] - minYear) / (maxYear - minYear)) * 100}% - 12px)`,
                transform: `translateY(-50%) scale(${activeHandle === 'end' ? 1.3 : 1})`,
                width: activeHandle === 'end' ? '28px' : '24px',
                height: activeHandle === 'end' ? '28px' : '24px',
                boxShadow: activeHandle === 'end' 
                  ? '0 4px 12px rgba(41, 141, 238, 0.6)' 
                  : '0 2px 6px rgba(41, 141, 238, 0.4)',
                zIndex: 30
              }}
              onMouseDown={(e) => handleMouseDown('end', e)}
            />
          </div>
        </div>

        <div className="relative">
          {/* Timeline line - hidden on mobile, visible on desktop */}
          <div className="hidden sm:block absolute left-1/2 transform -translate-x-1/2 w-1" style={{ height: 'calc(100% - 120px)', backgroundColor: '#298DEE', opacity: 0.3 }}></div>
          {/* Mobile timeline line */}
          <div className="sm:hidden absolute left-4 w-0.5" style={{ height: 'calc(100% - 80px)', backgroundColor: '#298DEE', opacity: 0.3 }}></div>

          <div className="space-y-6 sm:space-y-12 lg:space-y-16">
            {filteredMilestones.map((milestone, index) => {
              const originalIndex = milestones.findIndex(m => m.id === milestone.id);
              return (
              <div
                key={milestone.id}
                className="relative"
                style={{
                  opacity: 0,
                  animation: `fadeInUp 0.6s ease-out ${index * 0.2}s forwards`
                }}
              >
                {/* Timeline dot - positioned for mobile and desktop */}
                <div className="absolute left-2 sm:left-1/2 sm:transform sm:-translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 sm:border-4 z-10 hover:scale-125 transition-transform duration-300 shadow-lg" style={{ backgroundColor: originalIndex % 3 === 0 ? '#298DEE' : originalIndex % 3 === 1 ? '#FAB900' : '#F44F1B', borderColor: '#F4F1EA', top: '0.5rem' }}></div>

                {/* Card container - all cards on left for mobile, alternating for desktop */}
                <div className={`flex items-start ${index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                  <div className="hidden sm:block sm:w-1/2"></div>
                  <div className={`w-full sm:w-1/2 pl-10 sm:pl-12 ${index % 2 === 0 ? 'sm:pl-12' : 'sm:pr-12'}`}>
                    <div 
                      className="rounded-lg overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                      style={{ backgroundColor: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)' }}
                    >
                      <div className="relative h-48 sm:h-48 lg:h-56 overflow-hidden">
                        {milestone.type === 'image' ? (
                          <img
                            src={getAssetPath(milestone.imageUrl)}
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
                            src={getAssetPath(milestone.imageUrl)}
                            className="w-full h-full object-cover"
                            controls
                            autoPlay
                            muted
                            loop
                            playsInline
                          />
                        )}
                        <div className="absolute top-2 left-2 sm:top-4 sm:left-4 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base font-bold shadow-sm" style={{ backgroundColor: originalIndex % 3 === 0 ? '#298DEE' : originalIndex % 3 === 1 ? '#FAB900' : '#F44F1B' }}>
                          {milestone.year}
                        </div>
                      </div>

                      <div className="p-4 sm:p-6">
                        <div className="mb-2">
                          <h3 className="text-lg sm:text-2xl font-bold mb-2" style={{ color: '#1a1a1a' }}>
                            {milestone.title}
                          </h3>
                          {milestone.link && (
                            <div className="mb-2">
                              <a
                                href={milestone.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 transition-colors duration-200 font-medium text-sm"
                                style={{ color: '#298DEE' }}
                                onMouseEnter={(e) => e.currentTarget.style.color = '#1a6bb8'}
                                onMouseLeave={(e) => e.currentTarget.style.color = '#298DEE'}
                                title="Visit website"
                              >
                                <span>🔗</span>
                                <span>Website</span>
                                <ExternalLink size={16} />
                              </a>
                            </div>
                          )}
                        </div>
                        <p className="mb-4 text-sm sm:text-base" style={{ color: '#666' }}>
                          {milestone.shortDescription}
                        </p>

                        <div
                          className={`overflow-hidden transition-all duration-500 ease-in-out ${
                            expandedId === milestone.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <p className="mb-4 leading-relaxed text-sm sm:text-base" style={{ color: '#555' }}>
                            {milestone.fullDescription}
                          </p>

                          {milestone.gallery && milestone.gallery.length > 0 && (
                            <div className="mt-4">
                              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 -mx-1 sm:mx-0">
                                {milestone.gallery.map((mediaUrl, idx) => {
                                  const isVideo = mediaUrl.toLowerCase().match(/\.(mp4|mov|avi|webm)$/);
                                  const isYouTube = mediaUrl.includes('youtube.com') || mediaUrl.includes('youtu.be');
                                  
                                  return (
                                    <div
                                      key={idx}
                                      className="relative aspect-square rounded-lg overflow-hidden transition-all duration-300 group cursor-pointer"
                                      style={{ border: '1px solid rgba(0, 0, 0, 0.08)' }}
                                      onClick={() => openGallery(milestone.gallery!, milestone.title, idx)}
                                    >
                                      {isYouTube ? (
                                        <div className="relative w-full h-full">
                                          <img
                                            src={getAssetPath(getYoutubeThumbnail(mediaUrl))}
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
                                          src={getAssetPath(mediaUrl)}
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                          muted
                                        />
                                      ) : (
                                        <img
                                          src={getAssetPath(mediaUrl)}
                                          alt={`${milestone.title} gallery ${idx + 1}`}
                                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                      )}
                                      <div className="absolute inset-0 transition-all duration-300 flex items-center justify-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'} onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0)'}>
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                          <div className="rounded-full p-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
                                            {isYouTube ? (
                                              <svg className="w-6 h-6" style={{ color: '#298DEE' }} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                              </svg>
                                            ) : isVideo ? (
                                              <svg className="w-6 h-6" style={{ color: '#298DEE' }} fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M8 5v14l11-7z"/>
                                              </svg>
                                            ) : (
                                              <svg className="w-6 h-6" style={{ color: '#298DEE' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                          className="flex items-center gap-2 text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium text-sm sm:text-base shadow-sm hover:shadow-md transform hover:scale-105"
                          style={{ backgroundColor: originalIndex % 3 === 0 ? '#298DEE' : originalIndex % 3 === 1 ? '#FAB900' : '#F44F1B' }}
                          onMouseEnter={(e) => {
                            const colors = originalIndex % 3 === 0 ? ['#298DEE', '#1a6bb8'] : originalIndex % 3 === 1 ? ['#FAB900', '#d9a000'] : ['#F44F1B', '#d13e15'];
                            e.currentTarget.style.backgroundColor = colors[1];
                          }}
                          onMouseLeave={(e) => {
                            const colors = originalIndex % 3 === 0 ? '#298DEE' : originalIndex % 3 === 1 ? '#FAB900' : '#F44F1B';
                            e.currentTarget.style.backgroundColor = colors;
                          }}
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
              );
            })}
          </div>
          
          {/* To be continued message */}
          <div className="text-center mt-20 mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold" style={{ color: '#1a1a1a' }}>
              To be continued...
            </h2>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {galleryModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
          <div className="relative w-full h-full max-w-6xl max-h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-10 text-white rounded-full p-2 transition-all duration-200"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
            >
              <X size={24} />
            </button>

            {/* Navigation Arrows */}
            {galleryModal.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 z-10 text-white rounded-full p-3 transition-all duration-200"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 z-10 text-white rounded-full p-3 transition-all duration-200"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
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
                  src={getAssetPath(galleryModal.images[galleryModal.currentIndex])}
                  controls
                  className="max-w-full max-h-full object-contain rounded-lg"
                  autoPlay
                  loop
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={getAssetPath(galleryModal.images[galleryModal.currentIndex])}
                  alt={`${galleryModal.title} - Media ${galleryModal.currentIndex + 1}`}
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              )}
            </div>

            {/* Image Counter */}
            {galleryModal.images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white px-4 py-2 rounded-full text-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
                {galleryModal.currentIndex + 1} / {galleryModal.images.length}
              </div>
            )}

            {/* Title */}
            <div className="absolute top-4 left-4 text-white px-4 py-2 rounded-lg text-sm" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(10px)' }}>
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
    </>
  );
}

export default App;
