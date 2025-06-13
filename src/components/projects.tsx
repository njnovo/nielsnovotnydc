"use client"
import React, { useRef, useEffect, useState, useCallback } from 'react';
import Card from './card';

// Define the structure for a project item
interface Project {
  id: string;
  title: string;
  image: string;
  alt: string;
  year: string;
}

const PROJECTS_DATA: Project[] = [
  {
    id: '01',
    title: 'Personal Portfolio Website',
    image: '/images/project-portfolio.jpg',
    alt: 'Personal Portfolio Website',
    year: '25',
  },
  {
    id: '02',
    title: 'Find the Future Website Build',
    image: '/images/project-findthefuture.jpg',
    alt: 'Find the Future Website Build',
    year: '24',
  },
  {
    id: '03',
    title: "CEA Envirnment",
    image: "/images/project-cea.jpg",
    alt: "CEA Envirnment",
    year: "25",
  },
  {
    id: '04',
    title: "Jetson JetBot",
    image: "/images/project-jetson.jpg",
    alt: "Jetson JetBot",
    year: "22",
  },
  {
    id: '05',
    title: "Intel OpenBot",
    image: "/images/project-openbot.jpg",
    alt: "Intel OpenBot",
    year: "22",
  },
  {
    id: '06',
    title: "Jetson Duckie Bot",
    image: "/images/project-duckie.jpg",
    alt: "Jetson Duckie Bot",
    year: "22",
  },
  {
    id: '07',
    title: "FTC Automated Androids Robot",
    image: "/images/project-ftc.jpg",
    alt: "FTC Automated Androids Robot",
    year: "25",
  },
];

function useProjectsByYear() {
  const projectsByYear = PROJECTS_DATA.reduce<Record<string, Project[]>>(
    (acc, project) => {
      if (!acc[project.year]) {
        acc[project.year] = [];
      }
      acc[project.year]!.push(project);
      return acc;
    },
    {}
  );

  const sortedYears = Object.keys(projectsByYear).sort(
    (a, b) => parseInt(b, 10) - parseInt(a, 10)
  );

  return { projectsByYear, sortedYears };
}

function useScrollHighlight(years: string[]) {
  const [activeYear, setActiveYear] = useState<string>(years[0] ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    // Create new intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that's actually visible
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting && entry.intersectionRatio > 0
        );

        if (visibleEntries.length > 0) {
          // Sort by intersection ratio and position, prefer entries that are more visible
          visibleEntries.sort((a, b) => {
            const ratioA = a.intersectionRatio;
            const ratioB = b.intersectionRatio;
            
            // If ratios are close, prefer the one that's higher on the page
            if (Math.abs(ratioA - ratioB) < 0.1) {
              return a.boundingClientRect.top - b.boundingClientRect.top;
            }
            
            return ratioB - ratioA;
          });

          const topEntry = visibleEntries[0];
          if (topEntry) {
            const year = topEntry.target.getAttribute("data-year");
            if (year && year !== activeYear) {
              setActiveYear(year);
            }
          }
        }
      },
      {
        rootMargin: "-20% 0px -70% 0px", // Trigger when section is in the top 30% of viewport
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5],
      }
    );

    // Observe all year sections
    years.forEach((year) => {
      const element = document.querySelector(`[data-year="${year}"]`);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [years, activeYear]);

  return { activeYear, setActiveYear };
}

function YearNavigationSidebar({
  years,
  activeYear,
  onYearClick,
}: {
  years: string[];
  activeYear: string;
  onYearClick: (year: string) => void;
}) {
  return (
    <aside className="fixed left-0 top-0 z-10 flex h-screen w-2/5 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 flex-col items-end justify-center overflow-hidden py-20 pl-4 pr-6 sm:pl-6 sm:pr-8 md:pl-8 md:pr-12">
      <div className="flex flex-col space-y-6 sm:space-y-8">
        {years.map((year) => (
          <button
            key={year}
            type="button"
            className={`cursor-pointer font-bold transition-all duration-500 hover:scale-105 hover:opacity-90 ${
              activeYear === year
                ? "scale-110 text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-4xl tracking-wider text-white"
                : "text-lg sm:text-xl md:text-2xl lg:text-xl xl:text-lg opacity-60 text-gray-500"
            }`}
            onClick={() => onYearClick(year)}
          >
            20{year}
          </button>
        ))}
      </div>
    </aside>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const isFirstProject = project.id === "01";

  return (
    <Card>
      <Card.Header>
        <img
          src={project.image}
          alt={project.alt}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {isFirstProject && (
          <div className="absolute inset-0 flex items-center justify-center bg-red-600 bg-opacity-75 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="text-4xl font-bold tracking-widest transition-transform duration-300 group-hover:scale-120 sm:text-3xl md:text-4xl lg:text-5xl">
              HELLO
            </span>
          </div>
        )}
      </Card.Header>

      <Card.Content>
        <span className="mr-2 text-gray-500">{project.id}</span>
        <h3 className="truncate font-medium text-white">{project.title}</h3>
      </Card.Content>
    </Card>
  );
}

function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}

function YearSection({
  year,
  projects,
}: {
  year: string;
  projects: Project[];
}) {
  return (
    <section
      id={`year-20${year}`}
      data-year={year}
      className="space-y-8"
    >
      <header className="border-b border-gray-800 pb-4">
        <h2 className="text-4xl font-bold text-white opacity-20 lg:text-5xl xl:text-6xl">
          20{year}
        </h2>
      </header>
      <ProjectsGrid projects={projects} />
    </section>
  );
}

function BottomLeftIndicator() {
  return (
    <div className="fixed bottom-8 left-8 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-gray-600">
      <div className="h-2 w-2 rounded-full bg-gray-600" />
    </div>
  );
}

export default function ProjectsContent() {
  const { projectsByYear, sortedYears } = useProjectsByYear();
  const { activeYear, setActiveYear } = useScrollHighlight(sortedYears);

  const handleYearClick = useCallback((year: string) => {
    setActiveYear(year);
    const element = document.getElementById(`year-20${year}`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [setActiveYear]);

  return (
    <div className="flex min-h-screen w-full overflow-hidden bg-black text-white">
      <YearNavigationSidebar
        years={sortedYears}
        activeYear={activeYear}
        onYearClick={handleYearClick}
      />

      <main className="ml-[40%] sm:ml-[33.333333%] md:ml-[25%] lg:ml-[20%] xl:ml-[16.666667%] flex-1 space-y-20 overflow-y-auto px-4 sm:px-6 md:px-8 py-20 scroll-smooth">
        {sortedYears.map((year) => (
          <YearSection
            key={year}
            year={year}
            projects={projectsByYear[year]!}
          />
        ))}
      </main>

      <BottomLeftIndicator />
    </div>
  );
}