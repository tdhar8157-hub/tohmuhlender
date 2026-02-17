
import React from 'react';
import { AppState, LandingPageContent, DesignConfig } from '../types';

interface SidebarProps {
  state: AppState;
  onUpdateContent: (updates: Partial<LandingPageContent>) => void;
  onUpdateDesign: (updates: Partial<DesignConfig>) => void;
  onGenerateAI: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ state, onUpdateContent, onUpdateDesign, onGenerateAI }) => {
  return (
    <aside className="w-80 h-full bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0 flex flex-col">
      <div className="p-6 space-y-8">
        {/* AI Action */}
        <section>
          <button 
            onClick={onGenerateAI}
            disabled={state.isGenerating}
            className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl font-bold text-white transition-all 
              ${state.isGenerating 
                ? 'bg-purple-400 cursor-not-allowed' 
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:scale-[1.02] active:scale-95'}`}
          >
            {state.isGenerating ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                <span>Thinking...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                <span>Generate AI Campaign</span>
              </>
            )}
          </button>
        </section>

        {/* Design Controls */}
        <section className="space-y-4">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Design Controls</h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">BG COLOR</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="color" 
                  value={state.design.bgColor}
                  onChange={(e) => onUpdateDesign({ bgColor: e.target.value })}
                  className="w-10 h-10 p-1 rounded-lg border cursor-pointer"
                />
                <input 
                  type="text" 
                  value={state.design.bgColor}
                  onChange={(e) => onUpdateDesign({ bgColor: e.target.value })}
                  className="flex-1 text-sm border rounded-lg px-2 py-2 uppercase font-mono"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">BUTTON COLOR</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="color" 
                  value={state.design.buttonColor}
                  onChange={(e) => onUpdateDesign({ buttonColor: e.target.value })}
                  className="w-10 h-10 p-1 rounded-lg border cursor-pointer"
                />
                <input 
                  type="text" 
                  value={state.design.buttonColor}
                  onChange={(e) => onUpdateDesign({ buttonColor: e.target.value })}
                  className="flex-1 text-sm border rounded-lg px-2 py-2 uppercase font-mono"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content Controls */}
        <section className="space-y-4 pb-10">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Content & Links</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Headline</label>
              <textarea 
                value={state.content.headline}
                onChange={(e) => onUpdateContent({ headline: e.target.value })}
                className="w-full text-sm border rounded-lg px-3 py-2 h-20 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Hook your audience..."
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Button Text</label>
              <input 
                type="text"
                value={state.content.buttonText}
                onChange={(e) => onUpdateContent({ buttonText: e.target.value })}
                className="w-full text-sm border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Call to Action"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Button Link</label>
              <input 
                type="text"
                value={state.content.buttonLink}
                onChange={(e) => onUpdateContent({ buttonLink: e.target.value })}
                className="w-full text-sm border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="https://..."
              />
            </div>
          </div>
        </section>
      </div>
      
      <div className="mt-auto p-4 border-t text-center text-[10px] text-gray-400">
        POWERED BY GEMINI AI • LANDER PRO V1.2
      </div>
    </aside>
  );
};

export default Sidebar;
