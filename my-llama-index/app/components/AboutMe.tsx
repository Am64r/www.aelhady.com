import { HeartIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';

const AboutMe: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer to check when AboutMe is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    const element = document.getElementById('about-me-section');
    if (element) observer.observe(element);
    return () => observer.disconnect();
  }, []);

  // Animation for text entering from the right
  const textSpring = useSpring({
    transform: isVisible ? 'translateX(0%)' : 'translateX(100%)',
    opacity: isVisible ? 1 : 0,
    config: { tension: 120, friction: 20 },
  });

  // Animation for image entering from the left
  const imageSpring = useSpring({
    transform: isVisible ? 'translateX(0%)' : 'translateX(-100%)',
    opacity: isVisible ? 1 : 0,
    config: { tension: 120, friction: 20 },
  });

  return (
    <section id="about-me-section" style={styles.container}>
      <animated.div style={{ ...styles.imageContainer, ...imageSpring }}>
        <img
          src="/Subject.png"
          alt="Your Name"
          style={styles.image}
        />
      </animated.div>
      <animated.div style={{ ...styles.textContainer, ...textSpring }}>
        <h2 style={styles.heading}>About Me</h2>
        <p style={styles.description}>
          Hello! I’m [Your Name], a passionate developer with a focus on
          frontend technologies, blockchain, and data science. I’m driven by
          curiosity and a commitment to innovation, constantly exploring new
          ideas and solutions. With experience in [list key skills or fields],
          I enjoy building seamless, user-friendly applications and meaningful
          projects that make a difference.
        </p>
      </animated.div>
    </section>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '5rem',
    backgroundColor: '#EAE7DC',
    fontFamily: `'Playfair Display', serif`,
    flexWrap: 'wrap' as const,
  },
  imageContainer: {
    flex: '1',
    paddingRight: '1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '150px',
    height: 'auto',
    borderRadius: '8px',
    objectFit: 'cover' as const,
  },
  textContainer: {
    flex: '2',
    paddingLeft: '1rem',
    minWidth: '250px',
    flexGrow: 1,
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '1rem',
    fontFamily: `'Playfair Display', serif`,
  },
  description: {
    fontSize: '1rem',
    lineHeight: '1.5',
    fontFamily: `'Playfair Display', serif`,
  },
};

export default AboutMe;
