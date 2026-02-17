
import React from 'react';
import { AppState } from '../types';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface PreviewAreaProps {
  state: AppState;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ state }) => {
  const { content, design, viewMode } = state;

  const mockData = [
    { name: 'Standard', roi: 120 },
    { name: 'Lander Pro', roi: 340 },
  ];

  return (
    <div className="flex-1 bg-gray-200 p-8 flex justify-center overflow-y-auto">
      <div 
        className={`bg-white shadow-2xl transition-all duration-500 overflow-hidden ${
          viewMode === 'desktop' ? 'w-full max-w-5xl rounded-xl' : 'w-[375px] h-[667px] rounded-[3rem] border-[8px] border-gray-900 relative'
        }`}
        style={{ 
            backgroundColor: design.bgColor,
            minHeight: viewMode === 'desktop' ? '120%' : '667px'
        }}
      >
        {/* Mock Mobile Camera Notch */}
        {viewMode === 'mobile' && (
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-2xl z-20" />
        )}

        <div className={`p-8 md:p-16 space-y-12 ${viewMode === 'mobile' ? 'pt-12' : ''}`}>
          {/* Header */}
          <div className="flex justify-between items-center">
            <div className="text-xl font-black text-gray-900">BRAND</div>
            <div className="flex space-x-6 text-sm font-medium text-gray-600 hidden md:flex">
              <span>Features</span>
              <span>Pricing</span>
              <span>Contact</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="text-center space-y-6">
            <h1 
              className={`font-extrabold leading-tight tracking-tight ${viewMode === 'desktop' ? 'text-6xl' : 'text-3xl'}`}
              style={{ color: design.textColor }}
            >
              {content.headline}
            </h1>
            <p className={`text-gray-600 max-w-2xl mx-auto ${viewMode === 'desktop' ? 'text-xl' : 'text-base'}`}>
              {content.subheadline}
            </p>
            
            <div className="pt-6">
              <a 
                href={content.buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-10 py-5 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95"
                style={{ backgroundColor: design.buttonColor, color: design.buttonTextColor }}
              >
                {content.buttonText}
              </a>
              <p className="mt-4 text-xs text-gray-400">Join 10,000+ marketers winning today</p>
            </div>
          </div>

          {/* Visual Proof / Chart */}
          <div className={`bg-gray-50 p-8 rounded-3xl border border-gray-100 ${viewMode === 'desktop' ? 'grid grid-cols-2 gap-8 items-center' : 'space-y-8'}`}>
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-800">Proven ROI Growth</h2>
              <p className="text-sm text-gray-600">Our data shows that campaigns launched via Lander Pro see a significant jump in conversion rates within 72 hours.</p>
              <ul className="space-y-3">
                {content.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center text-sm font-medium text-gray-700">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="h-48 md:h-64 bg-white p-4 rounded-xl border">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockData}>
                  <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={12} />
                  <YAxis hide />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="roi" radius={[10, 10, 0, 0]}>
                    {mockData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 1 ? design.buttonColor : '#cbd5e1'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Testimonial */}
          <div className="max-w-3xl mx-auto text-center space-y-4 py-8">
            {content.socialProof.map((sp, i) => (
              <div key={i} className="space-y-2">
                <p className="italic text-lg text-gray-700">"{sp.quote}"</p>
                <p className="text-sm font-bold text-gray-900">— {sp.author}</p>
              </div>
            ))}
          </div>

          {/* Footer Mock */}
          <div className="border-t pt-8 pb-12 flex flex-col items-center space-y-4">
            <div className="text-sm text-gray-400">© 2024 Lander Pro. All rights reserved.</div>
            <div className="flex space-x-4">
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
                <div className="w-6 h-6 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewArea;
