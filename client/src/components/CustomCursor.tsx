import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device supports hover (not mobile)
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (!hasHover) return;

    setIsVisible(true);

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    document.addEventListener('mousemove', updatePosition);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, .skill-card, .project-card, .cert-header, [data-testid*="button"], [data-testid*="link"], [data-testid*="card"]'
    );

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`custom-cursor hidden lg:block fixed pointer-events-none z-50 transition-all duration-100 ${
        isHovering 
          ? 'scale-150 border-secondary' 
          : 'scale-100 border-primary'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
      }}
      data-testid="custom-cursor"
    />
  );
};

export default CustomCursor;
