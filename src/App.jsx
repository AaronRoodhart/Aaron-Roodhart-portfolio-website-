import React, { useState, useRef, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Instagram, Linkedin, Github, X } from 'lucide-react';

// --- Configuration & Data ---

const CATEGORIES = {
  CAREER: { 
    id: 'career', 
    label: 'Career', 
    color: '#0ea5e9', // Sky 500
    bg: '#f0f9ff', // Sky 50
    startAngle: 0, 
    endAngle: 120 
  },
  PROJECTS: { 
    id: 'projects', 
    label: 'Projects', 
    color: '#a855f7', // Purple 500
    bg: '#faf5ff', // Purple 50
    startAngle: 120, 
    endAngle: 240 
  },
  SIDE_QUESTS: { 
    id: 'side-quests', 
    label: 'Side Quests 😎', 
    color: '#f59e0b', // Amber 500
    bg: '#fffbeb', // Amber 50
    startAngle: 240, 
    endAngle: 360 
  }
};

const DATA = [
  // Career
  {
    id: 1,
    category: 'career',
    title: 'Tutoring Company Launch',
    role: 'Founder',
    year: '2020',
    description: 'When COVID hit, I saw how much students were struggling. So, instead of heading straight to university, I took a gap year to start a tutoring business that blended academics with cognitive-behavioural therapy principles. It grew fast, with over 2,000 students helped, and a team of tutors helping students across Canada, becoming the foundation of my journey as an entrepreneur and educator.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800',
    tags: ['Education', 'Entrepreneurship', 'Mental Health']
  },
  {
    id: 2,
    category: 'career',
    title: 'Extracurricular Leadership at McMaster',
    role: 'Student Leader',
    year: '2022',
    description: 'In my second year I became very involved on campus. From putting together a team of engineering and business students to participate in international competitions, to joining JDCC to strengthen my case competition skills, and becoming the first business member on McMaster Formula Electric, where I helped the team combine technical design with strategic business planning. It was an incredible year of learning that made me fall in love with the McMaster community.',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800',
    tags: ['Leadership', 'Competitions', 'Engineering']
  },
  {
    id: 3,
    category: 'career',
    title: 'MARS Apprentice Revival',
    role: 'Program Director',
    year: '2024',
    description: 'MARS Apprentice was a historic 20 year old business competition that once shaped the careers of hundreds of students and even sparked a few marriages. After COVID shut it down, I was asked if I would be interested in bringing it back. I couldn\'t say no. In just four months, I rebuilt the entire program from scratch, secured new sponsors, and helped launch a full semester-long season. The best part: a year later, a new team took what we built and tripled its size, proving the power of building something that lasts beyond you.',
    image: 'https://images.unsplash.com/photo-1569974493393-5f096898d9cc?auto=format&fit=crop&q=80&w=800',
    tags: ['Leadership', 'Business', 'Revival']
  },
  {
    id: 4,
    category: 'career',
    title: 'DOT',
    role: 'Founder & Product Designer',
    year: '2025',
    description: 'I\'ve journaled for over five years, but one problem always remained: I couldn\'t add my photos into my notebook. That led me to create DOT, a paper journal that connects physical pages to digital content using NFC technology. After 70+ user interviews, 23 prototypes, and 123 pre-MVP sales, I joined The Forge incubator and began developing the companion app. Launch coming soon 👀',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800',
    tags: ['Product Design', 'Hardware', 'NFC', 'Startup']
  },
  
  // Projects
  {
    id: 5,
    category: 'projects',
    title: 'Photography Business',
    role: 'Photographer',
    year: '2022',
    description: 'I have always loved cameras since I got my first Sony Powershot when I was in grade 2, but it wasn\'t until I launched my own photography business in 2022 where I really fell in love with it. I taught myself Photoshop and Lightroom, refined my editing style, and started selling landscape prints from my travels. As someone who grew up in the outdoors and learned to appreciate the beauty and gifts the outdoors can give us, I fell in love with capturing that beauty and sharing it with others.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800',
    tags: ['Photography', 'Business', 'Creative']
  },
  {
    id: 6,
    category: 'projects',
    title: '3D Printing and Design',
    role: 'Designer & Maker',
    year: '2023',
    description: 'After discovering 3D printing in an engineering design course, I became obsessed. I taught myself Fusion360 and Blender, started a small online store, and began designing props for franchises like Star Wars, The Legend of Zelda, and Catan. What started as a class project turned into a mini business and a lifelong maker hobby.',
    image: 'https://images.unsplash.com/photo-1631541909061-71e34f9111f9?auto=format&fit=crop&q=80&w=800',
    tags: ['3D Printing', 'CAD', 'Design', 'Fabrication']
  },
  {
    id: 7,
    category: 'projects',
    title: 'Hot Takes, Cold Tanks',
    role: 'Creator & Host',
    year: '2024',
    description: 'In our final year of university, my friend and I launched a show called Hot Takes, Cold Tanks as a fun project for the two of us to do. We trained to withstand the cold, filmed several episodes, and hosted backyard "premieres" for our neighbours. The show ended after our landlord saw the hydro bill, but it was a very fun project while it lasted and if anything I can now say I can be in an ice bath for over 10 minutes.',
    image: 'https://images.unsplash.com/photo-1552554228-5696d7448377?auto=format&fit=crop&q=80&w=800',
    tags: ['Video', 'Content Creation', 'Fun']
  },

  // Side Quests
  {
    id: 8,
    category: 'side-quests',
    title: 'Driveway Grad',
    role: 'Organizer',
    year: '2020',
    description: 'Graduating in 2020 was anything but ordinary. After four incredible years, I couldn\'t stand the idea of just receiving our diplomas in the mail, so a few friends and I pitched an idea to our school board — a driveway graduation. Every student got their own personal ceremony right at home. It was pretty awesome getting to see how much it meant to my peers and their families and was the perfect way to say goodbye to our high school classmates and friends.',
    image: 'https://images.unsplash.com/photo-1541459521795-316499645903?auto=format&fit=crop&q=80&w=800',
    tags: ['Community', 'Innovation', 'Graduation']
  },
  {
    id: 9,
    category: 'side-quests',
    title: 'Second Degree Black Belt',
    role: 'Martial Artist & Instructor',
    year: '2020',
    description: 'After more than a decade of kickboxing, I earned my second-degree black belt. The journey taught me so much more beyond technique. It built my discipline, mental toughness, and respect that the best things come with time. Since then, I\'ve continued to teach and support classes whenever I\'m back at my dojo and now teach at McMaster to new students coming into the sport.',
    image: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=800',
    tags: ['Martial Arts', 'Teaching', 'Discipline']
  },
  {
    id: 10,
    category: 'side-quests',
    title: 'Brent and Back Challenge',
    role: 'Participant',
    year: '2020',
    description: 'For most of my young adult years, I worked as an outdoor educator at a camp called Gould Lake. I would take students on 1-3 week-long leadership trips across North America. As part of a charity initiative at Gould Lake, the staff completed an intense 162-kilometre paddle and 22-kilometre portage in just two days. Through constant rain, no sleep, and just a bit of hypothermia, we raised $10,000 to send kids to camp.',
    image: 'https://images.unsplash.com/photo-1541459521795-316499645903?auto=format&fit=crop&q=80&w=800',
    tags: ['Adventure', 'Charity', 'Outdoor Education']
  },
  {
    id: 11,
    category: 'side-quests',
    title: 'Gold Duke of Edinburgh Award',
    role: 'Award Recipient',
    year: '2021–2022',
    description: 'Over a year of volunteering, fitness, and skill development, I earned the Gold Duke of Edinburgh Award. From expeditions to residential projects at Queens University, it pushed me to grow as a leader, teammate, and individual. I also got a cool pin ;)',
    image: 'https://images.unsplash.com/photo-1541459521795-316499645903?auto=format&fit=crop&q=80&w=800',
    tags: ['Award', 'Leadership', 'Service']
  },
  {
    id: 12,
    category: 'side-quests',
    title: 'Custom Gifting Tradition',
    role: 'Craftsman',
    year: '2022',
    description: 'Starting in 2022 I began a yearly tradition of creating handmade blankets and paddles for people who had a big impact on me. I learned to sew custom blankets for close friends and carve wooden paddles for mentors, each one representing a shared adventure or lesson learned. It became my way of saying thank you in a very Aaron way, I guess.',
    image: 'https://images.unsplash.com/photo-1552554228-5696d7448377?auto=format&fit=crop&q=80&w=800',
    tags: ['Craft', 'Gratitude', 'Handmade']
  },
  {
    id: 13,
    category: 'side-quests',
    title: 'Vipassana Retreat',
    role: 'Participant',
    year: '2025',
    description: 'In March 2025, I decided to take some time off school to work on some personal goals of mine, one of the biggest being to take part in a ten-day silent Vipassana meditation retreat. No verbal or non-verbal communication for 10 days, I wasn\'t even allowed to bring a notebook. I just spent 10 hours a day meditating. It was one of the hardest and most transformative experiences of my life. There were countless lessons, but I think one of the largest ones that ran true for me was to accept reality for how it is, not how you want it to be.',
    image: 'https://images.unsplash.com/photo-1541459521795-316499645903?auto=format&fit=crop&q=80&w=800',
    tags: ['Meditation', 'Personal Growth', 'Mindfulness']
  },
  {
    id: 14,
    category: 'side-quests',
    title: 'Backpacking Across Asia and Hawaii',
    role: 'Traveler',
    year: '2025',
    description: 'Right after building DOT and completing my Vipassana retreat, I spent two months travelling through Hawaii, Japan, Vietnam, Cambodia, and Thailand. Backpacking across these places gave me so much perspective of life outside of the traditional Western and European perspectives. Seeing how so many live their lives in such different yet purposeful and intentional ways gave me a lot to think about as I came to the end of my university career and was the perfect reset. It was a reminder of how much there is to learn by simply exploring.',
    image: 'https://images.unsplash.com/photo-1541459521795-316499645903?auto=format&fit=crop&q=80&w=800',
    tags: ['Travel', 'Adventure', 'Cultural Exploration']
  }
];

// --- Math Utilities ---

const toRad = (deg) => (deg * Math.PI) / 180;
const toDeg = (rad) => (rad * 180) / Math.PI;

// Gaussian function for line length
const calculateTickLength = (tickAngle, mouseAngle, isHovering, isActive) => {
  const baseLength = 10; 
  
  // If active (collapsed state), return uniform small lines
  if (isActive) return baseLength;

  const amplitude = 30;  
  const sigma = 8;       

  if (!isHovering || mouseAngle === null) return baseLength;

  let diff = Math.abs(tickAngle - mouseAngle);
  if (diff > 180) diff = 360 - diff;

  const gaussian = amplitude * Math.exp(-(Math.pow(diff, 2)) / (2 * Math.pow(sigma, 2)));
  return baseLength + gaussian;
};

// Color Utilities
const hexToRgb = (hex) => {
  const bigint = parseInt(hex.slice(1), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const interpolateColor = (color1, color2, factor) => {
  const [r1, g1, b1] = hexToRgb(color1);
  const [r2, g2, b2] = hexToRgb(color2);
  const r = Math.round(r1 + factor * (r2 - r1));
  const g = Math.round(g1 + factor * (g2 - g1));
  const b = Math.round(b1 + factor * (b2 - b1));
  return `rgb(${r}, ${g}, ${b})`;
};

const getTickColor = (angle) => {
  const normalizedAngle = angle % 360;
  if (normalizedAngle >= 0 && normalizedAngle < 120) {
    const factor = normalizedAngle / 120;
    return interpolateColor(CATEGORIES.CAREER.color, CATEGORIES.PROJECTS.color, factor);
  } else if (normalizedAngle >= 120 && normalizedAngle < 240) {
    const factor = (normalizedAngle - 120) / 120;
    return interpolateColor(CATEGORIES.PROJECTS.color, CATEGORIES.SIDE_QUESTS.color, factor);
  } else {
    const factor = (normalizedAngle - 240) / 120;
    return interpolateColor(CATEGORIES.SIDE_QUESTS.color, CATEGORIES.CAREER.color, factor);
  }
};

// --- Components ---

const DonutSegment = ({ id, startAngle, endAngle, color, onClick, label }) => {
  const outerRadius = 120; 
  const center = 150;
  
  // Full pie slice - from center to outer edge
  const x1 = center + outerRadius * Math.cos(toRad(startAngle));
  const y1 = center + outerRadius * Math.sin(toRad(startAngle));
  const x2 = center + outerRadius * Math.cos(toRad(endAngle));
  const y2 = center + outerRadius * Math.sin(toRad(endAngle));

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  // Path for full pie slice (from center, arc to edge, back to center)
  const d = [
    "M", center, center,
    "L", x1, y1,
    "A", outerRadius, outerRadius, 0, largeArcFlag, 1, x2, y2,
    "Z"
  ].join(" ");

  // --- Straight Text Positioning ---
  const midAngle = (startAngle + endAngle) / 2;
  // Position text closer to center (50% of radius) to ensure it fits
  const textRadius = outerRadius * 0.5;
  
  // Calculate text position at the midpoint of the segment
  const textX = center + textRadius * Math.cos(toRad(midAngle));
  const textY = center + textRadius * Math.sin(toRad(midAngle));
  
  // Create a tighter clip path - inset from edges to ensure text fits
  const clipRadius = outerRadius * 0.85; // Leave 15% margin from edges
  const clipX1 = center + clipRadius * Math.cos(toRad(startAngle));
  const clipY1 = center + clipRadius * Math.sin(toRad(startAngle));
  const clipX2 = center + clipRadius * Math.cos(toRad(endAngle));
  const clipY2 = center + clipRadius * Math.sin(toRad(endAngle));
  
  const clipPathId = `clip-${id}`;
  const clipD = [
    "M", center, center,
    "L", clipX1, clipY1,
    "A", clipRadius, clipRadius, 0, largeArcFlag, 1, clipX2, clipY2,
    "Z"
  ].join(" ");

  // Split label into words for stacking
  const words = label.split(' ');
  const lineHeight = 16; // Spacing between lines
  const startY = textY - ((words.length - 1) * lineHeight) / 2;

  return (
    <g 
      className="cursor-pointer transition-opacity duration-300 hover:opacity-90"
      onClick={onClick}
    >
      <defs>
        <clipPath id={clipPathId} clipPathUnits="userSpaceOnUse">
          <path d={clipD} />
        </clipPath>
      </defs>
      
      <path d={d} fill={color} className="transition-all duration-300" stroke="white" strokeWidth="2" />
      
      {/* Stacked text - each word on its own line */}
      <text 
        x={textX}
        y={startY}
        fill="white" 
        className="text-[13px] font-bold uppercase tracking-wider pointer-events-none select-none"
        textAnchor="middle"
        clipPath={`url(#${clipPathId})`}
      >
        {words.map((word, index) => (
          <tspan 
            key={index} 
            x={textX} 
            dy={index === 0 ? 0 : lineHeight}
          >
            {word}
          </tspan>
        ))}
      </text>
    </g>
  );
};

const NavigationWheel = ({ activeCategory, setActiveCategory, isMobile = false }) => {
  const [mouseAngle, setMouseAngle] = useState(null);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  const tickCount = 72;
  const ticks = useMemo(() => Array.from({ length: tickCount }, (_, i) => i * (360 / tickCount)), []);

  const handleMouseMove = (e) => {
    // Disable hover effects on mobile
    if (isMobile || activeCategory || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = e.clientX - centerX;
    const y = e.clientY - centerY;
    let angle = toDeg(Math.atan2(y, x));
    if (angle < 0) angle += 360;
    
    setMouseAngle(angle);
  };

  const handleTickClick = (angle) => {
    if (activeCategory) {
        // If active, acting as close button
        setActiveCategory(null);
        return;
    }

    const normalized = angle % 360;
    if (normalized < 120) setActiveCategory('CAREER');
    else if (normalized < 240) setActiveCategory('PROJECTS');
    else setActiveCategory('SIDE_QUESTS');
  };

  return (
    <motion.div 
      className={`relative z-20 flex items-center justify-center select-none w-full h-full ${activeCategory ? 'cursor-pointer' : ''}`}
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => { setIsHovering(false); setMouseAngle(null); }}
      onClick={() => activeCategory && setActiveCategory(null)}
      // Layout Transition Props
      layout
      style={{
        width: activeCategory ? '6rem' : '100%', 
        height: activeCategory ? '6rem' : '100%',
      }}
      transition={{ type: "spring", stiffness: 150, damping: 25, duration: 0.8 }}
    >
      {/* Center Close Icon (Only visible when active) */}
      <AnimatePresence>
        {activeCategory && (
            <motion.div
                initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="absolute z-50 pointer-events-none text-gray-400"
            >
                <X size={24} strokeWidth={2.5} />
            </motion.div>
        )}
      </AnimatePresence>

      <svg 
        viewBox="0 0 300 300" 
        className="w-full h-full filter drop-shadow-xl"
        style={{ overflow: 'visible' }}
      >
        {/* Ticks Layer */}
        <g transform="translate(150, 150)">
          {ticks.map((angle, i) => {
            // Pass activeCategory to disable gaussian logic
            const length = calculateTickLength(angle, mouseAngle, isHovering && !activeCategory, !!activeCategory);
            
            const baseColor = '#374151'; // Dark Grey
            
            let blendFactor = 0;
            let mouseQuadrantColor = null;
            
            // Enhanced hover detection logic - blend towards quadrant color when mouse is near (disabled on mobile)
            if (!isMobile && isHovering && !activeCategory && mouseAngle !== null) {
                let diff = Math.abs(angle - mouseAngle);
                if (diff > 180) diff = 360 - diff;
                // Wider spread for smoother gradient transitions between quadrants
                blendFactor = Math.exp(-(Math.pow(diff, 2)) / (2 * Math.pow(25, 2))); 
                
                // Determine which quadrant the mouse is in
                const mouseNormalized = mouseAngle % 360;
                if (mouseNormalized >= 0 && mouseNormalized < 120) {
                  mouseQuadrantColor = CATEGORIES.CAREER.color;
                } else if (mouseNormalized >= 120 && mouseNormalized < 240) {
                  mouseQuadrantColor = CATEGORIES.PROJECTS.color;
                } else {
                  mouseQuadrantColor = CATEGORIES.SIDE_QUESTS.color;
                }
            }
            
            // If active, just use grey, otherwise blend base color with mouse quadrant color based on proximity
            // This creates smooth transitions as the mouse moves between quadrants
            const tickColor = activeCategory 
              ? '#94a3b8' 
              : mouseQuadrantColor && blendFactor > 0
                ? interpolateColor(baseColor, mouseQuadrantColor, blendFactor)
                : baseColor;
            
            const isNear = mouseAngle !== null && Math.abs(angle - mouseAngle) < 30;
            const opacity = !isMobile && isHovering && !activeCategory ? (isNear ? 1 : 0.6) : 1;

            return (
              <g key={i} transform={`rotate(${angle})`} onClick={(e) => { e.stopPropagation(); handleTickClick(angle); }} className="cursor-pointer group">
                 {/* Invisible Hit Area */}
                 <line
                    x1={122} 
                    y1={0}
                    x2={122 + length}
                    y2={0}
                    stroke="transparent"
                    strokeWidth={12} 
                />
                {/* Visible Line */}
                <line
                  x1={122}
                  y1={0}
                  x2={122 + length}
                  y2={0}
                  stroke={tickColor}
                  strokeWidth={2}
                  strokeLinecap="round"
                  opacity={opacity}
                  style={{ transition: 'all 0.1s ease-out' }}
                />
              </g>
            );
          })}
        </g>

        {/* Donut Segments - Fade out when active */}
        <AnimatePresence>
            {!activeCategory && (
                <motion.g
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <DonutSegment 
                    id="career"
                    startAngle={0} 
                    endAngle={120} 
                    color={CATEGORIES.CAREER.color} 
                    label="Career"
                    onClick={() => setActiveCategory('CAREER')}
                    />
                    <DonutSegment 
                    id="projects"
                    startAngle={120} 
                    endAngle={240} 
                    color={CATEGORIES.PROJECTS.color} 
                    label="Projects"
                    onClick={() => setActiveCategory('PROJECTS')}
                    />
                    <DonutSegment 
                    id="side-quests"
                    startAngle={240} 
                    endAngle={360} 
                    color={CATEGORIES.SIDE_QUESTS.color} 
                    label="Side Quests 😎"
                    onClick={() => setActiveCategory('SIDE_QUESTS')}
                    />
                </motion.g>
            )}
        </AnimatePresence>
      </svg>
    </motion.div>
  );
};

const AccordionItem = ({ item, isOpen, onClick }) => {
  return (
    <motion.div 
      initial={false}
      className="border-b border-gray-200 last:border-0 bg-white first:rounded-t-lg last:rounded-b-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <button 
        onClick={onClick}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
      >
        <div className="flex items-center gap-4 flex-1">
          {/* Image beside title */}
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <img 
              src={item.image} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col flex-1">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-widest mb-1">{item.year}</span>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{item.title}</h3>
            <span className="text-sm text-gray-500 font-medium mt-1">{item.role}</span>
          </div>
        </div>
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="text-gray-400 flex-shrink-0"
        >
          <ChevronDown />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-6 pt-0">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-4 bg-gray-100 group">
                 <img 
                   src={item.image} 
                   alt={item.title}
                   className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                        View Details <ExternalLink className="w-3 h-3"/>
                    </span>
                 </div>
              </div>
              
              <p className="text-gray-600 leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {item.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold rounded-full uppercase tracking-wider">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// --- Main App Component ---

export default function App() {
  const [activeCategory, setActiveCategory] = useState(null); 
  const [expandedId, setExpandedId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const bgColor = activeCategory 
    ? CATEGORIES[activeCategory].bg 
    : '#f8fafc'; 

  const filteredContent = useMemo(() => {
    if (!activeCategory) return [];
    const catId = CATEGORIES[activeCategory].id;
    return DATA.filter(item => item.category === catId);
  }, [activeCategory]);

  return (
    <div 
      className="h-screen w-full transition-colors duration-700 ease-in-out overflow-hidden flex flex-col relative"
      style={{ backgroundColor: bgColor }}
    >
      <nav className="fixed top-0 left-0 w-full p-6 sm:p-10 z-30 pointer-events-none">
        
        <div 
          className="absolute top-6 right-6 sm:top-10 sm:right-10 flex gap-4 pointer-events-auto"
        >
             <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-900 transition-colors"><Github className="w-5 h-5"/></a>
             <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition-colors"><Linkedin className="w-5 h-5"/></a>
             <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-600 transition-colors"><Instagram className="w-5 h-5"/></a>
        </div>
      </nav>

      <main className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
        {!activeCategory ? (
          /* Home Layout - Flex column for dynamic spacing */
          <div className="flex-1 flex flex-col items-center justify-center gap-[min(4vh,2rem)] sm:gap-[min(6vh,3rem)] px-6 py-[min(4vh,2rem)] sm:py-[min(6vh,3rem)] min-h-0">
            {/* Intro Text Section */}
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex-shrink-0 w-full max-w-2xl"
                style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
              >
                <div className="flex flex-col sm:flex-row items-center gap-4 mb-4 sm:mb-6">
                  {/* Profile Pic */}
                  <div 
                    className="rounded-full bg-gray-200 flex-shrink-0 overflow-hidden"
                    style={{ 
                      width: 'clamp(4rem, 8vw, 5rem)', 
                      height: 'clamp(4rem, 8vw, 5rem)' 
                    }}
                  >
                    {/* Placeholder for profile picture */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400"></div>
                  </div>
                  
                  <h1 
                    className="font-bold text-gray-900 text-center sm:text-left"
                    style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}
                  >
                    Hi There 👋
                  </h1>
                </div>
                
                <p 
                  className="text-center text-gray-700 leading-relaxed"
                  style={{ fontSize: 'clamp(0.875rem, 1.5vw, 1rem)' }}
                >
                  My name's <span className="font-semibold">Aaron Roodhart</span>. Below is a timeline of some of my favourite projects, hobbies, and achievements I've worked on over the past few years.
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Wheel - Scales with viewport */}
            <div className="flex-1 flex items-center justify-center w-full min-h-0" style={{ minHeight: 0 }}>
              <div 
                className="w-full aspect-square"
                style={{ 
                  width: 'min(60vh, 60vw, 28rem)',
                  height: 'min(60vh, 60vw, 28rem)',
                  maxWidth: '100%',
                  maxHeight: '100%'
                }}
              >
                <NavigationWheel 
                  activeCategory={activeCategory} 
                  setActiveCategory={setActiveCategory}
                  isMobile={isMobile}
                />
              </div>
            </div>
          </div>
        ) : (
          /* Category Active - Absolute positioning */
          <>
            <motion.div 
              layout
              className="absolute top-6 left-6 sm:top-10 sm:left-10 z-20"
              transition={{ 
                type: "spring", 
                stiffness: 150, 
                damping: 25, 
                duration: 0.8,
                delay: 0.25
              }}
            >
              <NavigationWheel 
                activeCategory={activeCategory} 
                setActiveCategory={setActiveCategory}
                isMobile={isMobile}
              />
            </motion.div>
          </>
        )}

        <AnimatePresence>
          {activeCategory && (
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ 
                enter: { delay: 0.3, duration: 0.5 },
                exit: { duration: 0.2, delay: 0 }
              }}
              className="absolute inset-0 pt-32 sm:pt-0 sm:pl-48 flex flex-col h-full"
            >
              <div className="h-full w-full max-w-4xl mx-auto overflow-y-auto px-4 sm:px-10 pb-20 pt-10 sm:pt-32 scrollbar-hide">
                <div className="mb-8">
                  <span 
                    className="text-xs font-bold uppercase tracking-widest mb-2 block"
                    style={{ color: CATEGORIES[activeCategory].color }}
                  >
                    Category
                  </span>
                  <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 tracking-tight">
                    {CATEGORIES[activeCategory].label}
                  </h2>
                  <div className="w-12 h-1 bg-gray-900 rounded-full mb-8"></div>
                </div>

                <div className="flex flex-col gap-4">
                  {filteredContent.map((item) => (
                    <AccordionItem 
                      key={item.id} 
                      item={item} 
                      isOpen={expandedId === item.id}
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    />
                  ))}
                </div>

                <div className="mt-12 p-8 bg-white/50 rounded-xl border border-white/60 text-center">
                    <p className="text-gray-500 italic">End of list. Navigate via the compass to explore more.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>


      </main>
    </div>
  );
}
