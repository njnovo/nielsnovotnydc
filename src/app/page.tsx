import Link from "next/link";
import Hero from "../components/hero";
import Card from "../components/card";

export default function Home() {
  return (
    <>
      <Hero />
      
      <section className="min-h-screen flex items-center justify-center px-8" style={{backgroundColor: 'var(--color-tertiary-light)'}}>
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-8">
            <h2 className="text-6xl font-dark tracking-wider lg:text-7xl xl:text-8xl" style={{color: 'var(--color-primary)'}}>
              Portfolio
            </h2>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white border-gray-300">
                <Card.Header>
                  <div className="h-full w-full bg-gray-200 transition-transform duration-300 group-hover:scale-110" />
                </Card.Header>
                <Card.Content className="flex-col items-start text-left space-y-4 p-8">
                  <h3 className="text-3xl font-medium text-black">Projects</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    A curated collection of technical work spanning robotics, web development, 
                    and data science. From competitive programming platforms to volunteer 
                    management systems, each project represents growth and exploration 
                    in different domains of technology.
                  </p>
                  <Link 
                    href="/projects" 
                    className="inline-block border border-gray-400 text-black px-6 py-3 text-sm uppercase tracking-wider hover:border-gray-600 transition-colors"
                  >
                    View Projects
                  </Link>
                </Card.Content>
              </Card>
              
              <Card className="bg-white border-gray-300">
                <Card.Header>
                  <div className="h-full w-full bg-gray-200 transition-transform duration-300 group-hover:scale-110" />
                </Card.Header>
                <Card.Content className="flex-col items-start text-left space-y-4 p-8">
                  <h3 className="text-3xl font-medium text-black">Resume</h3>
                  <p className="text-lg leading-relaxed text-gray-700">
                    An interactive journey through academic achievements, research collaborations, 
                    musical performances, and volunteer work. Spanning technology competitions, 
                    neuroscience research, orchestral leadership, and community service across 
                    multiple years of high school.
                  </p>
                  <Link 
                    href="/resume" 
                    className="inline-block border border-gray-400 text-black px-6 py-3 text-sm uppercase tracking-wider hover:border-gray-600 transition-colors"
                  >
                    View Resume
                  </Link>
                </Card.Content>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
