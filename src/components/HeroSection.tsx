import React from 'react';
import { motion } from 'framer-motion';
import type { PersonalInfo } from '../types';
import avatar from '../images/profile.webp';

interface HeroSectionProps {
  info: PersonalInfo;
  isDark: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ info, isDark }) => {
  return (
    <div className={`${isDark ? 'bg-gray-900' : 'bg-white'} text-${isDark ? 'white' : 'gray-900'} py-16`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <motion.div 
            className="w-48 h-48 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={avatar}
              alt={info.name}
              className="rounded-full w-full h-full object-cover shadow-lg border-4 border-amber-500"
            />
          </motion.div>
          <div className="flex-1 text-center md:text-left">
            <motion.h1 
              className="text-4xl font-bold mb-2"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {info.name}
            </motion.h1>
            <motion.p 
              className="text-amber-500 font-semibold mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {info.team}
            </motion.p>
            <motion.p 
              className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-lg mb-6`}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {info.bio}
            </motion.p>
            <motion.div 
              className="flex gap-4 justify-center md:justify-start"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href={info.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 text-white"
              >
                Instagram
              </a>
              <a
                href={info.social.strava}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 text-white"
              >
                Strava
              </a>
              <a
                href={info.social.championchip}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 text-white"
              >
                Championchip
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};