"use client";

interface HeroProps {
    text?: string
    small_text?: string
    bg_img?: string
}

const Hero = ({ text, small_text, bg_img }: HeroProps) => {
    return (
        <div 
            className="min-h-screen w-full flex flex-col items-center justify-center" 
            style={{ 
                backgroundColor: 'var(--color-primary)',
                color: 'var(--color-secondary)',
                backgroundImage: bg_img ? `url(${bg_img})` : undefined,
                backgroundSize: 'cover', 
                backgroundPosition: 'center' 
            }}
        >
            <h1 
                className="text-6xl md:text-8xl font-bold mb-4 animate-fade-in-up transition-all duration-500 hover:scale-105"
                style={{ 
                    color: 'var(--color-secondary)',
                    transition: 'all 0.5s ease'
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'var(--color-tertiary-light)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'var(--color-secondary)'}
            >
                {text ?? "Niels Novotny"}
            </h1>
            <h2 
                className="text-2xl md:text-4xl font-light animate-fade-in-up animation-delay-300 transition-all duration-500 hover:scale-105"
                style={{ color: 'var(--color-secondary)' }}
            >
                {small_text ?? "Software Developer, Aspiring Engineer"}
            </h2>
        </div>
    )
}

export default Hero;