"use client"
import React, {  } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';



// ==================== USER TYPE CARD COMPONENT ====================
const UserTypeCard = ({ 
  type, 
  icon: Icon, 
  title, 
  description, 
  features, 
  gradient, 
  borderColor,
  onClick 
}: {
  type: 'client' | 'freelancer';
  icon: any;
  title: string;
  description: string;
  features: string[];
  gradient: string;
  borderColor: string;
  onClick: () => void;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    whileHover={{ scale: 1.03, y: -8 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className="cursor-pointer"
  >
    <Card className={`h-full border-2 ${borderColor} transition-all duration-300 hover:shadow-2xl bg-white/50 backdrop-blur-sm`}>
      <CardContent className="p-8">
        <motion.div 
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-6 shadow-lg`}
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <Icon className="text-white" size={32} />
        </motion.div>
        <h2 className="text-2xl font-bold mb-3">{title}</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">{description}</p>
        <ul className="space-y-3 mb-6">
          {features.map((feature, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-2 text-sm text-gray-700"
            >
              <CheckCircle className="text-green-500 flex-shrink-0" size={16} />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
        <Button className={`w-full bg-gradient-to-r ${gradient} hover:opacity-90 transition-opacity shadow-md`}>
          Register as {type === 'client' ? 'Client' : 'Freelancer'}
        </Button>
      </CardContent>
    </Card>
  </motion.div>
);
export default UserTypeCard;