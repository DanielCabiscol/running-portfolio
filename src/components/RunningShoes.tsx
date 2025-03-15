import React from 'react';
import { motion } from 'framer-motion';
import { RunningShoe } from '../types';

interface RunningShoesProps {
  shoes: RunningShoe[];
}

export const RunningShoes: React.FC<RunningShoesProps> = ({ shoes }) => {
  const categories = ['training', 'racing', 'trail'] as const;

  return (
    <div className="bg-gray-800 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-2">
          <span>My equipment</span>
          <span className="text-2xl">👟</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, categoryIndex) => (
            <div key={category} className="space-y-4">
              <h3 className="text-xl font-semibold text-amber-500 capitalize mb-4">
                {category} Shoes
              </h3>
              {shoes
                .filter(shoe => shoe.type === category)
                .map((shoe, index) => (
                  <motion.div
                    key={shoe.id}
                    className="bg-gray-900 rounded-lg p-4 shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: categoryIndex * 0.2 + index * 0.1 }}
                  >
                    <div className="flex gap-4">
                      <img
                        src={shoe.image}
                        alt={shoe.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div>
                        <h4 className="font-semibold text-white">{shoe.name}</h4>
                        <p className="text-gray-400">{shoe.brand}</p>
                        <p className="text-sm text-gray-500">
                          {shoe.kilometers}km · Since {new Date(shoe.purchaseDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};