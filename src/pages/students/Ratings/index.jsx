import React from "react";
import { motion } from "framer-motion";
import { Star, Trophy, TrendingUp, Award } from "lucide-react";
import { PageHeader } from "../../../components/ui/page-header";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";

const MOCK_RATINGS = [
  { id: 1, name: "Azizbek Rahimov", group: "Frontend React", points: 950, rank: 1, trend: "up", badge: "Gold" },
  { id: 2, name: "Sardor Ibragimov", group: "Python Backend", points: 890, rank: 2, trend: "up", badge: "Silver" },
  { id: 3, name: "Madina Aliyeva", group: "English B2", points: 820, rank: 3, trend: "down", badge: "Bronze" },
  { id: 4, name: "Javohir Vohidov", group: "Frontend React", points: 750, rank: 4, trend: "up", badge: "None" },
];

export default function Ratings() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="p-6 md:p-8 max-w-7xl mx-auto space-y-8"
    >
      <PageHeader 
        title="O'quvchilar Reytingi" 
        description="Kunlik baholar va o'quvchilarning umumiy reytingi."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-gradient-to-br from-amber-50 to-yellow-100/50 border-amber-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-amber-800 mb-1">Eng yaxshi o'quvchi</p>
              <h3 className="text-2xl font-bold text-amber-900">Azizbek Rahimov</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-amber-200 flex items-center justify-center text-amber-700">
              <Trophy className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-100/50 border-blue-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-800 mb-1">Eng faol guruh</p>
              <h3 className="text-2xl font-bold text-blue-900">Frontend React</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center text-blue-700">
              <UsersIcon className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-emerald-100/50 border-green-200">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-800 mb-1">O'rtacha davomat</p>
              <h3 className="text-2xl font-bold text-green-900">94%</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-200 flex items-center justify-center text-green-700">
              <TrendingUp className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {MOCK_RATINGS.map((student, idx) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={student.id} 
                className="flex items-center justify-between p-6 hover:bg-gray-50/50 transition-colors"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-10 h-10 flex items-center justify-center font-bold rounded-xl ${student.rank === 1 ? 'bg-amber-100 text-amber-600' : student.rank === 2 ? 'bg-gray-200 text-gray-600' : student.rank === 3 ? 'bg-orange-100 text-orange-600' : 'bg-blue-50 text-blue-600'}`}>
                    #{student.rank}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{student.name}</h4>
                    <p className="text-sm text-gray-500">{student.group}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  {student.badge !== 'None' && (
                    <Badge variant="outline" className="gap-1.5 hidden md:flex">
                      <Award className={`w-3.5 h-3.5 ${student.badge === 'Gold' ? 'text-amber-500' : student.badge === 'Silver' ? 'text-gray-400' : 'text-orange-500'}`} />
                      {student.badge}
                    </Badge>
                  )}
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end mb-0.5">
                      <span className="text-xl font-bold text-gray-900">{student.points}</span>
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    </div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Ball</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Inline helper to avoid extra import
function UsersIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
