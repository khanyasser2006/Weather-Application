import React from 'react';
import PageShell from '../components/PageShell';

export default function About() {
  return (
    <PageShell 
      title="About Us" 
      subtitle="Discover the story behind Skyrora and our mission to democratize meteorological data."
    >
      <h3>Our Mission</h3>
      <p>
        At Skyrora, we believe that understanding the weather is fundamental to navigating our daily lives. 
        Our mission is to provide the most accurate, accessible, and beautiful weather data platform in the world. 
        Whether you are planning a weekend hike or tracking severe storms, we empower you with the insights you need.
      </p>

      <h3>The Technology</h3>
      <p>
        We aggregate data from leading meteorological agencies and utilize advanced machine learning models to 
        deliver hyper-local forecasts. Our interactive radar systems and air quality indices are processed in 
        real-time, ensuring you never miss a critical update.
      </p>
      
      <h3>Our Team</h3>
      <p>
        Built by a passionate team of meteorologists, data scientists, and product designers, Skyrora represents 
        the intersection of robust atmospheric science and exceptional user experience design.
      </p>
    </PageShell>
  );
}
