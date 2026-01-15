import React, { useState, useEffect } from 'react';
import { HeroSection } from './components/HeroSection';
import { RaceList } from './components/RaceList';
import { Highlights } from './components/Highlights';
import { Statistics } from './components/Statistics';
import { RunningShoes } from './components/RunningShoes';
import { UpcomingRaces } from './components/UpcomingRaces';
import { ThemeToggle } from './components/ThemeToggle';
import { WorkoutsSection } from './components/workouts/WorkoutsSection';
import { personalInfo, races, runningShoes, upcomingRaces } from './data/data';

function App() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <div className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
      }`}>
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        <HeroSection info={personalInfo} isDark={isDark} />
        <Highlights races={races} isDark={isDark} />
        <UpcomingRaces races={upcomingRaces} isDark={isDark} />
        <RunningShoes shoes={runningShoes} isDark={isDark} />
        <WorkoutsSection isDark={isDark} />
        <Statistics races={races} isDark={isDark} />
        <RaceList races={races} isDark={isDark} />
      </div>
    </div>
  );
}

export default App