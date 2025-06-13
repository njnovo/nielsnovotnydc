'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Card from '../../components/card';

interface ExperienceItem {
  img: string; 
  id: string;
  title: string;
  organization?: string;
  year: string;
  description?: string;
  category: 'tech' | 'music' | 'sports' | 'volunteer' | 'academic';
}

const RESUME_DATA = {
  freshman: [
    {
      id: '01',
      title: "UT Austin Robotics Camp",
      year: "2024",
      category: "tech" as const,
      description: "Attended intensive robotics program at University of Texas Austin",
      img: "placeholder"
    },
    {
      id: '02',
      title: "First Tech Challenge - Automated Androids",
      year: "2024-2025",
      category: "tech" as const,
      description: "Participated in robotics competition focusing on autonomous robot design",
      img: "https://photos.fife.usercontent.google.com/pw/AP1GczMuIZhBUD3ahJg4CkZfQpjlZFwxoQfzUrK7Wo99BIFnjePv_bTtBXX_Ueun3AsM7Rc38mjVFNLlIW6Gp9APkYoSVxMSTlA=w1082-h1624-s-no-gm?authuser=0"
    },
    {
      id: '03',
      title: "USACO Bronze",
      year: "2024",
      category: "academic" as const,
      description: "Achieved Bronze level in USA Computing Olympiad",
      img: "placeholder"
    },
    {
      id: '04',
      title: "USACO Camp",
      year: "2024",
      category: "academic" as const,
      description: "Attended competitive programming training camp",
      img: "placeholder"
    },
    {
      id: '05',
      title: "Find the Future Website Build",
      year: "2024-2025",
      category: "tech" as const,
      description: "Developed website for educational initiative",
      img: "placeholder"
    },
    {
      id: '06',
      title: "FBLA Coding Category - State Competition",
      year: "2024",
      category: "academic" as const,
      description: "Awarded prize in coding category, advanced to state level competition",
      img: "placeholder"
    },
    {
      id: '07',
      title: "Science Research - Controlled Grow Project",
      organization: "Holly Lab Collaboration",
      year: "2024-2025",
      category: "academic" as const,
      description: "Conducted research on controlled plant growth systems",
      img: "placeholder"
    },
    {
      id: '08',
      title: "Blackrock Neuroscience Project",
      year: "2025",
      category: "academic" as const,
      description: "Participated in neuroscience research initiative",
      img: "placeholder"
    },
    {
      id: '09',
      title: "Principal Cello",
      organization: "Symphonic Orchestra",
      year: "2024-2025",
      category: "music" as const,
      description: "Lead cellist in symphonic orchestra",
      img: "placeholder"
    },
    {
      id: '10',
      title: "Piano Guild Participant",
      organization: "Colorado Cantabile - Year 10",
      year: "2024",
      category: "music" as const,
      description: "Advanced piano performance and theory program",
      img: "placeholder"
    },
    {
      id: '11',
      title: "Data Science Student",
      organization: "Juni Learning - Year 9",
      year: "2024",
      category: "tech" as const,
      description: "Completed data science curriculum and projects",    
      img: "placeholder"
    },
    {
      id: '12',
      title: "Squash Competitions",
      organization: "Hashim Khan, Silver Level Squash Zone, Greenwood Men's League",
      year: "2024",
      category: "sports" as const,
      description: "Competitive squash player in multiple leagues",
      img: "placeholder"
    },
    {
      id: '13',
      title: "Orchestra Cellist",
      organization: "Hadestown Musical",
      year: "2024-2025",
      category: "music" as const,
      description: "Performed as cellist in musical theater production",
      img: "placeholder"
    }
  ],
  sophomore: [
    {
      id: '14',
      title: "Orchestra Volunteer",
      year: "2025",
      category: "volunteer" as const,
      description: "Volunteer work supporting orchestra programs",
      img: "placeholder"
    },
    {
      id: '15',
      title: "Senior Volunteer",
      organization: "Caley Ridge",
      year: "2025",
      category: "volunteer" as const,
      description: "Community service supporting senior citizens",
      img: "placeholder"
    },
    {
      id: '16',
      title: "Amaxa Impact Intern",
      year: "2025",
      category: "tech" as const,
      description: "Website building and design for Amaxa Impact, a non-profit organization that provides education and resources to underserved communities.",
      img: "placeholder"
    }
  ]
};

const sections = ['about', 'sophomore', 'freshman'];

function useScrollHighlight(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting && entry.intersectionRatio > 0
        );

        if (visibleEntries.length > 0) {
          visibleEntries.sort((a, b) => {
            const ratioA = a.intersectionRatio;
            const ratioB = b.intersectionRatio;
            
            if (Math.abs(ratioA - ratioB) < 0.1) {
              return a.boundingClientRect.top - b.boundingClientRect.top;
            }
            
            return ratioB - ratioA;
          });

          const topEntry = visibleEntries[0];
          if (topEntry) {
            const section = topEntry.target.getAttribute("data-section");
            if (section && section !== activeSection) {
              setActiveSection(section);
            }
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      }
    );

    sectionIds.forEach((section) => {
      const element = document.querySelector(`[data-section="${section}"]`);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, activeSection]);

  return { activeSection, setActiveSection };
}

function SectionNavigationSidebar({
  sections,
  activeSection,
  onSectionClick,
}: {
  sections: string[];
  activeSection: string;
  onSectionClick: (section: string) => void;
}) {
  const sectionLabels: Record<string, string> = {
    about: 'About',
    sophomore: 'Soph',
    freshman: 'Fresh'
  };

  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex-col items-end justify-center overflow-hidden py-20 pl-4 pr-6 sm:pl-6 sm:pr-8 md:pl-8 md:pr-12">
      <div className="flex flex-col space-y-6 sm:space-y-8">
        {sections.map((section) => (
          <button
            key={section}
            type="button"
            className={`cursor-pointer font-bold transition-all duration-500 hover:scale-105 hover:opacity-90 ${
              activeSection === section
                ? "scale-110 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-4xl tracking-wider text-white"
                : "text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-lg opacity-60 text-gray-500"
            }`}
            onClick={() => onSectionClick(section)}
          >
            {sectionLabels[section]}
          </button>
        ))}
      </div>
    </aside>
  );
}

function ExperienceCard({ item }: { item: ExperienceItem }) {
  return (
    <Card>
      <Card.Header>
        <img src={item.img} alt="Niels Novotny" className="w-full h-full object-cover" />
      </Card.Header>

      <Card.Content>
        <span className="mr-2 text-gray-500">{item.id}</span>
        <div className="flex-1">
          <h3 className="truncate font-medium text-white">{item.title}</h3>
          {item.organization && (
            <p className="text-xs text-gray-400 mt-1">{item.organization}</p>
          )}
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs text-gray-500 uppercase">{item.category}</span>
            <span className="text-xs text-gray-400">{item.year}</span>
          </div>
          {item.description && (
            <p className="text-xs text-gray-300 mt-2 leading-relaxed">{item.description}</p>
          )}
        </div>
      </Card.Content>
    </Card>
  );
}

function ExperienceGrid({ experiences }: { experiences: ExperienceItem[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {experiences.map((item) => (
        <ExperienceCard key={item.id} item={item} />
      ))}
    </div>
  );
}

function AboutSection() {
  const categories = ['tech', 'music', 'sports', 'volunteer', 'academic'];
  
  return (
    <section
      id="about"
      data-section="about"
      className="space-y-8"
    >
      <header className="border-b border-gray-800 pb-4">
        <h2 className="text-4xl font-bold text-white opacity-20 lg:text-5xl xl:text-6xl">
          About
        </h2>
      </header>
      <div className="space-y-6">
        <div className="bg-gray-900 border border-gray-800 p-8">
          <h1 className="text-4xl font-bold text-white mb-4">Niels Novotny</h1>
          <p className="text-xl text-gray-300 mb-6">Student • Developer • Musician • Researcher</p>
          <div className="flex flex-wrap gap-2">
            <span className="border border-gray-600 text-white px-3 py-1 text-sm">High School Student</span>
            <span className="border border-gray-600 text-white px-3 py-1 text-sm">USACO Bronze</span>
            <span className="border border-gray-600 text-white px-3 py-1 text-sm">Principal Cellist</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {categories.map((category) => {
            const count = [...RESUME_DATA.freshman, ...RESUME_DATA.sophomore].filter(item => item.category === category).length;
            return (
              <div key={category} className="text-center p-4 border border-gray-800 bg-gray-900 hover:bg-gray-800 transition-colors">
                <div className="font-semibold text-white capitalize">{category}</div>
                <div className="text-sm text-gray-400">{count} activities</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function YearSection({
  year,
  experiences,
}: {
  year: string;
  experiences: ExperienceItem[];
}) {
  const yearLabels: Record<string, string> = {
    sophomore: 'Sophomore Year (2025-2026)',
    freshman: 'Freshman Year (2024-2025)'
  };

  return (
    <section
      id={year}
      data-section={year}
      className="space-y-8"
    >
      <header className="border-b border-gray-800 pb-4">
        <h2 className="text-4xl font-bold text-white opacity-20 lg:text-5xl xl:text-6xl">
          {yearLabels[year]}
        </h2>
      </header>
      <ExperienceGrid experiences={experiences} />
    </section>
  );
}

function BottomLeftIndicator() {
  return (
    <div className="fixed bottom-8 left-8 z-10 flex h-10 w-10 items-center justify-center border border-gray-600">
      <div className="h-2 w-2 bg-gray-600" />
    </div>
  );
}

export default function ResumePage() {
  const { activeSection, setActiveSection } = useScrollHighlight(sections);

  const handleSectionClick = useCallback((section: string) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [setActiveSection]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-black text-white">
      <SectionNavigationSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSectionClick}
      />

      <main className="ml-[40%] sm:ml-[33.333333%] md:ml-[25%] lg:ml-[20%] xl:ml-[16.666667%] flex-1 space-y-20 overflow-y-auto px-4 sm:px-6 md:px-8 py-20 scroll-smooth">
        <AboutSection />
        <YearSection year="sophomore" experiences={RESUME_DATA.sophomore} />
        <YearSection year="freshman" experiences={RESUME_DATA.freshman} />
      </main>

      <BottomLeftIndicator />
    </div>
  );
}
