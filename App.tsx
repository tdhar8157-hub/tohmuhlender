
import React, { useState, useCallback } from 'react';
import Sidebar from './components/Sidebar';
import PreviewArea from './components/PreviewArea';
import { AppState, LandingPageContent, DesignConfig } from './types';
import { generateCampaignContent } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    content: {
      headline: 'Stop Wasting Money on Facebook Ads',
      subheadline: 'Unlock the secret to high-converting campaigns with our proven AI-driven framework.',
      buttonText: 'Launch Your Ad Campaign',
      buttonLink: 'https://facebook.com/ads/manager',
      benefits: [
        'Reduce Cost Per Acquisition by 40%',
        'Scalable targeting strategies',
        'Auto-optimized copy that converts'
      ],
      socialProof: [
        { quote: "Lander Pro tripled our ROI in just 2 weeks.", author: "Alex Rivers, SaaS Founder" }
      ]
    },
    design: {
      bgColor: '#ffffff',
      buttonColor: '#2563eb',
      textColor: '#1f2937',
      buttonTextColor: '#ffffff'
    },
    isGenerating: false,
    viewMode: 'desktop'
  });

  const handleUpdateContent = (updates: Partial<LandingPageContent>) => {
    setState(prev => ({
      ...prev,
      content: { ...prev.content, ...updates }
    }));
  };

  const handleUpdateDesign = (updates: Partial<DesignConfig>) => {
    setState(prev => ({
      ...prev,
      design: { ...prev.design, ...updates }
    }));
  };

  const handleGenerateAI = async () => {
    setState(prev => ({ ...prev, isGenerating: true }));
    try {
      const newContent = await generateCampaignContent(state.content.headline);
      if (newContent) {
        setState(prev => ({
          ...prev,
          content: {
            ...prev.content,
            ...newContent
          },
          isGenerating: false
        }));
      }
    } catch (error) {
      console.error("AI Generation failed:", error);
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const toggleViewMode = () => {
    setState(prev => ({
      ...prev,
      viewMode: prev.viewMode === 'desktop' ? 'mobile' : 'desktop'
    }));
  };

  return (
    <div className="flex h-screen w-full bg-gray-100">
      <Sidebar 
        state={state} 
        onUpdateContent={handleUpdateContent}
        onUpdateDesign={handleUpdateDesign}
        onGenerateAI={handleGenerateAI}
      />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Top Header Actions */}
        <div className="h-16 border-b bg-white flex items-center justify-between px-6 shadow-sm z-10">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Lander Pro</h1>
            <span className="text-xs font-semibold px-2 py-1 bg-blue-100 text-blue-700 rounded-full">v1.2</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={toggleViewMode}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600"
              title="Toggle View Mode"
            >
              {state.viewMode === 'desktop' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
              )}
            </button>
            <div className="h-6 w-px bg-gray-200 mx-2" />
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900">View</button>
            <button className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">Edit</button>
            <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all transform active:scale-95">Download Lander</button>
          </div>
        </div>

        <PreviewArea state={state} />
      </main>
    </div>
  );
};

export default App;
