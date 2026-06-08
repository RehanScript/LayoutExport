import { useState, useEffect } from 'react';
import type { LandingPageConfig } from './types/landingPage';
import { Sidebar } from './components/Sidebar';
import { SectionRenderer } from './components/SectionTemplates';
import { ExportModal } from './components/ExportModal';
import { COLOR_PALETTES } from './components/ThemeStyles';

const EMPTY_CANVAS_CONFIG: LandingPageConfig = {
  theme: 'linear',
  paletteId: 'linear-dark-emerald',
  sections: [],
};



function App() {
  const [config, setConfig] = useState<LandingPageConfig>(() => {
    const saved = localStorage.getItem('mvp_page_config');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved config, loading default preset', e);
      }
    }
    return EMPTY_CANVAS_CONFIG;
  });

  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPreviewOnly, setIsPreviewOnly] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('mvp_page_config', JSON.stringify(config));
  }, [config]);

  const handleUpdateSectionData = (sectionId: string, newData: any) => {
    setConfig((prev) => ({
      ...prev,
      sections: prev.sections.map((s) => (s.id === sectionId ? { ...s, data: newData } : s)),
    }));
  };

  const activePalette = COLOR_PALETTES.find((p) => p.id === config.paletteId) || COLOR_PALETTES[0];

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-300 overflow-hidden font-sans">
      {/* Editor Control Sidebar */}
      {!isPreviewOnly && (
        <Sidebar
          config={config}
          onChangeConfig={setConfig}
          activeSectionId={activeSectionId}
          onSelectSectionId={setActiveSectionId}
          onExport={() => setIsExportOpen(true)}
        />
      )}

      {/* Main Canvas Area */}
      <div className="flex-grow flex flex-col h-full overflow-hidden relative">
        
        {/* Canvas Toolbar Header */}
        <div className="h-14 border-b border-zinc-900 flex justify-between items-center px-6 bg-zinc-950 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-zinc-400">Live Canvas Editor</span>
          </div>

          <div className="flex items-center gap-3">
            {!isPreviewOnly && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all sections and start fresh?')) {
                      setConfig(EMPTY_CANVAS_CONFIG);
                      setActiveSectionId(null);
                    }
                  }}
                  className="px-2.5 py-1 bg-rose-950/40 hover:bg-rose-900/60 border border-rose-900/50 text-rose-300 text-[10px] font-bold rounded"
                >
                  Clear Canvas
                </button>
              </div>
            )}

            <button
              onClick={() => setIsPreviewOnly(!isPreviewOnly)}
              className="px-3.5 py-1.5 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-zinc-350 font-bold text-xs rounded transition-all"
            >
              {isPreviewOnly ? 'Exit Preview' : 'Preview Live Page'}
            </button>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLScoPJIrdsJ4DVOZm2ZWaTQX4TWIoi2v4y0ap4YA56m2IQv3NQ/viewform?usp=sharing&ouid=110472994291449701441"
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-1.5 bg-indigo-650 hover:bg-indigo-600 text-white font-bold text-xs rounded transition-all flex items-center shadow-sm"
            >
              Give Feedback
            </a>
          </div>
        </div>

        {/* Live Render Preview Container */}
        <div className="flex-grow overflow-y-auto h-[calc(100vh-3.5rem)] bg-zinc-900/10 p-6 flex justify-center items-start">
          <div
            className={`w-full max-w-5xl min-h-full flex flex-col shadow-2xl transition-colors duration-300 ${activePalette.background}`}
          >
            {config.sections.map((sect) => (
              <SectionRenderer
                key={sect.id}
                section={sect}
                theme={config.theme}
                palette={activePalette}
                isActive={activeSectionId === sect.id}
                onSelect={() => !isPreviewOnly && setActiveSectionId(sect.id)}
                isPreviewOnly={isPreviewOnly}
                onUpdateSectionData={handleUpdateSectionData}
              />
            ))}

            {config.sections.length === 0 && (
              <div className="flex-grow flex flex-col items-center justify-center py-20 text-center text-zinc-500">
                <p className="font-bold text-lg mb-2">Your Page is Empty</p>
                <p className="text-sm max-w-xs mx-auto">Use the "+ Add Section" buttons in the sidebar to build your layout.</p>
              </div>
            )}
          </div>
        </div>

        {/* Floating preview badge for full screen visual check */}
        {isPreviewOnly && (
          <div className="fixed bottom-4 right-4 z-40 bg-zinc-950/80 border border-zinc-800 px-3 py-1.5 rounded-full text-xs font-bold text-zinc-300 backdrop-blur flex items-center gap-2 shadow-lg">
            <span>Visual Preview Mode</span>
            <button
              onClick={() => setIsPreviewOnly(false)}
              className="px-2 py-0.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-[10px] uppercase font-black"
            >
              Edit
            </button>
          </div>
        )}

      </div>

      {/* Export Code Modal */}
      <ExportModal
        config={config}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}

export default App;
