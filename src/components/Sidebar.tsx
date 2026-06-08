import React from 'react';
import type {
  LandingPageConfig,
  LandingPageSection,
  ThemePreset,
} from '../types/landingPage';
import { COLOR_PALETTES } from './ThemeStyles';

interface SidebarProps {
  config: LandingPageConfig;
  onChangeConfig: (newConfig: LandingPageConfig) => void;
  activeSectionId: string | null;
  onSelectSectionId: (id: string | null) => void;
  onExport: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  config,
  onChangeConfig,
  activeSectionId,
  onSelectSectionId,
  onExport,
}) => {
  const { theme, paletteId, sections } = config;
  const activeSection = sections.find((s) => s.id === activeSectionId);
  const [draggedIdx, setDraggedIdx] = React.useState<number | null>(null);

  // Helper to update global config values
  const setGlobalStyle = (newTheme: ThemePreset, newPaletteId: string) => {
    onChangeConfig({
      ...config,
      theme: newTheme,
      paletteId: newPaletteId,
    });
  };



  // Delete section
  const deleteSection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSections = sections.filter((s) => s.id !== id);
    onChangeConfig({
      ...config,
      sections: newSections,
    });
    if (activeSectionId === id) {
      onSelectSectionId(null);
    }
  };

  // Add section
  const addSection = (type: LandingPageSection['type']) => {
    const newId = `${type}-${Date.now()}`;
    let initialData = {};

    switch (type) {
      case 'hero':
        initialData = {
          badge: '⚡ Introducing LayoutExport',
          headline: 'Launch your startup landing page in minutes',
          subheadline: 'A premium, modular builder that helps you design and export production-ready React code for free.',
          primaryBtn: { text: 'Start Building', link: '#pricing' },
          secondaryBtn: { text: 'Learn More', link: '#features' },
        };
        break;
      case 'what-you-get':
        initialData = {
          title: 'What You Get inside the Box',
          subtitle: 'Everything you need to successfully launch and scale your startup.',
          items: [
            { text: 'Modular Next.js Codebase', description: 'Clean React code using standard Tailwind CSS classes.' },
            { text: '3 Ready-to-go Themes', description: 'Linear aesthetic, Neubrutalism, and Glassmorphism.' },
            { text: 'Highly Customized Sections', description: 'Reorder, tweak copy, and inject routes visually.' },
          ],
        };
        break;
      case 'why-choose-us':
        initialData = {
          title: 'Why choose LayoutExport?',
          subtitle: 'Here is how we compare to spending hours coding from scratch.',
          comparisonType: 'both',
          rows: [
            { feature: 'Setup Time', usValue: '5 Minutes', themValue: '20+ Hours' },
            { feature: 'Cost', usValue: '$0 (Free Hosting)', themValue: '$50+/mo' },
            { feature: 'Tailwind Support', usValue: true, themValue: false },
            { feature: 'Responsive Code', usValue: true, themValue: true },
          ],
          cards: [
            { title: 'Zero Setup Cost', description: 'Runs in the browser. Exported files can be hosted entirely on free plans.', icon: 'zap' },
            { title: 'Modern Aesthetics', description: 'Stunning visual presets matching standard 2026 tech startup designs.', icon: 'sparkles' },
            { title: 'Clean Components', description: 'Inline SVG icons and standard layouts with no bloated npm libraries.', icon: 'code' },
          ],
        };
        break;
      case 'features':
        initialData = {
          title: 'Packed with Power',
          subtitle: 'An MVP builder designed specifically to convert visitors into active customers.',
          items: [
            { title: 'Lightning Fast', description: 'Next.js rendering with static optimizations out of the box.', icon: 'zap' },
            { title: 'Highly Adaptable', description: 'Modify variables or add new sections instantly to keep scaling.', icon: 'shield' },
            { title: 'SEO Optimized', description: 'Semantic markup built in for high search engine crawl rankings.', icon: 'globe' },
          ],
        };
        break;
      case 'pricing':
        initialData = {
          title: 'Simple, Fair Pricing',
          subtitle: 'Start for free and unlock higher tiers as your product grows.',
          plans: [
            { name: 'Starter', price: '$0', period: '/forever', description: 'Perfect for testing ideas and launching quick MVPs.', features: ['1 Landing Page Export', 'Standard Themes', 'Self-contained code'], buttonText: 'Get Started', buttonLink: '#', isPopular: false },
            { name: 'Pro Launch', price: '$19', period: '/month', description: 'Complete customization and unlimited exports for growing startups.', features: ['Unlimited Page Exports', 'Premium Support', 'Tailwind Config Access', 'Custom domain setup support'], buttonText: 'Upgrade to Pro', buttonLink: '#', isPopular: true },
          ],
        };
        break;
      case 'cta':
        initialData = {
          title: 'Ready to launch your Startup?',
          subtitle: 'Stop planning. Start building. Tweak visually and export your Next.js site right now.',
          buttonText: 'Export Landing Page Code',
          buttonLink: '#',
        };
        break;
      case 'testimonials':
        initialData = {
          title: 'Loved by Founders Worldwide',
          subtitle: 'Read how simple MVPs launched using our exported components.',
          items: [
            { name: 'Sarah Jenkins', role: 'Founder', company: 'DevFlow', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80', feedback: 'We shipped our landing page in 10 minutes. Got 100 signups on Product Hunt on day one using the Linear dark theme.', rating: 5 },
            { name: 'Alex Rivera', role: 'Solopreneur', company: 'Saasify', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80', feedback: 'The Neubrutalism export code was so clean. I dropped it into my Next.js codebase, and it worked without a single edit.', rating: 5 },
          ],
        };
        break;
      case 'faqs':
        initialData = {
          title: 'Frequently Asked Questions',
          subtitle: 'Everything you need to know about our visual builder.',
          items: [
            { question: 'What language does the exporter output?', answer: 'It exports clean Next.js/React component code utilizing standard Tailwind CSS styles. All icons are embedded directly as SVGs.' },
            { question: 'Are there any hosting fees?', answer: 'Absolutely not! Since we export static-friendly React components, you can host them for $0 on Vercel, Netlify, or GitHub Pages.' },
            { question: 'How do I bind links to the buttons?', answer: 'You can easily customize each button in the sidebar control panel, specifying routes like /about, anchors like #pricing, or external URLs.' },
          ],
        };
        break;
      case 'about-me':
        initialData = {
          title: 'Meet the Creator',
          name: 'Rehan',
          role: 'Founder & Lead Developer',
          bio: 'Hey! I am a student building tools to help startups bootstrap for $0. I designed this visual editor to save developers and founders hours of design work.',
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
          twitterUrl: 'https://twitter.com',
          githubUrl: 'https://github.com',
        };
        break;
      case 'footer':
        initialData = {
          brandName: 'MVPMaker',
          description: 'Visually construct startup landing pages and export responsive Tailwind components in seconds.',
          copyrightText: `© ${new Date().getFullYear()} MVPMaker. All rights reserved.`,
          links: [
            { label: 'Features', href: '#features' },
            { label: 'Pricing', href: '#pricing' },
            { label: 'FAQs', href: '#faq' },
            { label: 'Privacy Policy', href: '#' },
          ],
        };
        break;
    }

    const newSection: LandingPageSection = {
      id: newId,
      type,
      data: initialData,
    };

    onChangeConfig({
      ...config,
      sections: [...sections, newSection],
    });
    onSelectSectionId(newId);
  };

  // Helper to update specific active section fields
  const updateSectionData = (updatedFields: any) => {
    if (!activeSection) return;
    const newSections = sections.map((s) => {
      if (s.id === activeSection.id) {
        return {
          ...s,
          data: {
            ...s.data,
            ...updatedFields,
          },
        };
      }
      return s;
    });
    onChangeConfig({
      ...config,
      sections: newSections,
    });
  };

  const renderSectionEditor = () => {
    if (!activeSection) {
      return (
        <div className="text-center py-12 px-4 border border-zinc-800 rounded-lg bg-zinc-900/20 text-zinc-500">
          <p className="text-sm">Select a section from the preview or the list to modify its content.</p>
        </div>
      );
    }

    const data = activeSection.data;

    // Helper input field renderer
    const renderInput = (label: string, value: string, fieldName: string, subKey?: string) => {
      const val = value;
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (subKey) {
          updateSectionData({
            [fieldName]: {
              ...data[fieldName],
              [subKey]: e.target.value,
            },
          });
        } else {
          updateSectionData({ [fieldName]: e.target.value });
        }
      };

      return (
        <div className="mb-4">
          <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">{label}</label>
          <input
            type="text"
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-zinc-650"
            value={val || ''}
            onChange={handleInputChange}
          />
        </div>
      );
    };

    const renderTextarea = (label: string, value: string, fieldName: string) => {
      return (
        <div className="mb-4">
          <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">{label}</label>
          <textarea
            rows={3}
            className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-sm text-zinc-200 focus:outline-none focus:border-zinc-650 resize-y"
            value={value || ''}
            onChange={(e) => updateSectionData({ [fieldName]: e.target.value })}
          />
        </div>
      );
    };

    const renderImageInput = (
      label: string,
      value: string,
      onChangeCallback: (base64OrUrl: string) => void
    ) => {
      const fileInputRef = React.useRef<HTMLInputElement>(null);

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64String = reader.result as string;
            onChangeCallback(base64String);
          };
          reader.readAsDataURL(file);
        }
      };

      return (
        <div className="mb-4">
          <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">{label}</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="flex-grow bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-zinc-650"
              placeholder="Paste image URL..."
              value={value || ''}
              onChange={(e) => onChangeCallback(e.target.value)}
            />
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 border border-zinc-700 hover:border-zinc-600 text-zinc-300 text-xs font-bold rounded flex items-center justify-center transition-all"
              title="Upload local PNG, JPG, or SVG"
            >
              Upload
            </button>
          </div>
        </div>
      );
    };

    switch (activeSection.type) {
      case 'hero':
        return (
          <div>
            {renderInput('Badge', data.badge, 'badge')}
            {renderInput('Headline', data.headline, 'headline')}
            {renderTextarea('Subheadline', data.subheadline, 'subheadline')}
            
            <div className="border-t border-zinc-800 my-4 pt-4">
              <h4 className="text-sm font-semibold text-zinc-300 mb-3">Primary Button</h4>
              {renderInput('Button Text', data.primaryBtn?.text, 'primaryBtn', 'text')}
              {renderInput('Link / Route (e.g. #pricing)', data.primaryBtn?.link, 'primaryBtn', 'link')}
            </div>

            <div className="border-t border-zinc-800 my-4 pt-4">
              <h4 className="text-sm font-semibold text-zinc-300 mb-3">Secondary Button</h4>
              {renderInput('Button Text', data.secondaryBtn?.text, 'secondaryBtn', 'text')}
              {renderInput('Link / Route (e.g. #features)', data.secondaryBtn?.link, 'secondaryBtn', 'link')}
            </div>
          </div>
        );

      case 'what-you-get': {
        const updateItem = (index: number, fields: any) => {
          const newItems = [...data.items];
          newItems[index] = { ...newItems[index], ...fields };
          updateSectionData({ items: newItems });
        };
        const addItem = () => {
          updateSectionData({ items: [...data.items, { text: 'New deliverable', description: 'Brief description' }] });
        };
        const removeItem = (index: number) => {
          updateSectionData({ items: data.items.filter((_: any, i: number) => i !== index) });
        };

        return (
          <div>
            {renderInput('Section Title', data.title, 'title')}
            {renderInput('Section Subtitle', data.subtitle, 'subtitle')}

            <div className="border-t border-zinc-800 my-4 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-zinc-300">Deliverables List</h4>
                <button
                  onClick={addItem}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded"
                >
                  + Add Item
                </button>
              </div>

              {data.items.map((item: any, idx: number) => (
                <div key={idx} className="bg-zinc-900/60 p-3 rounded border border-zinc-850 mb-3 relative group">
                  <button
                    onClick={() => removeItem(idx)}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-rose-450 text-xs"
                    title="Remove"
                  >
                    ✕
                  </button>
                  <div className="mb-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Item text</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                      value={item.text}
                      onChange={(e) => updateItem(idx, { text: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Description</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                      value={item.description || ''}
                      onChange={(e) => updateItem(idx, { description: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'why-choose-us': {
        const headers = data.headers || ['Feature', 'Our Solution', 'Competitors'];

        const updateHeader = (hIdx: number, val: string) => {
          const newHeaders = [...headers];
          newHeaders[hIdx] = val;
          updateSectionData({ headers: newHeaders });
        };

        const addCompetitorColumn = () => {
          const newHeaders = [...headers, 'New Competitor'];
          const newRows = data.rows.map((row: any) => {
            const rowValues = row.values || [
              row.usValue !== undefined ? row.usValue : true,
              row.themValue !== undefined ? row.themValue : false
            ];
            return {
              ...row,
              values: [...rowValues, false]
            };
          });
          updateSectionData({ headers: newHeaders, rows: newRows });
        };

        const removeCompetitorColumn = (colIdx: number) => {
          if (headers.length <= 2) return; // Must have at least Feature + Our Solution
          const newHeaders = headers.filter((_: string, i: number) => i !== colIdx);
          const valIdxToRemove = colIdx - 1; // rowValues indices are offset by 1
          const newRows = data.rows.map((row: any) => {
            const rowValues = row.values || [
              row.usValue !== undefined ? row.usValue : true,
              row.themValue !== undefined ? row.themValue : false
            ];
            return {
              ...row,
              values: rowValues.filter((_: any, i: number) => i !== valIdxToRemove)
            };
          });
          updateSectionData({ headers: newHeaders, rows: newRows });
        };

        const updateRow = (index: number, fields: any) => {
          const newRows = [...data.rows];
          newRows[index] = { ...newRows[index], ...fields };
          updateSectionData({ rows: newRows });
        };

        const addRow = () => {
          const defaultValues = Array(headers.length - 1).fill(false);
          updateSectionData({
            rows: [...data.rows, { feature: 'New Feature', values: defaultValues }]
          });
        };

        const removeRow = (index: number) => {
          updateSectionData({ rows: data.rows.filter((_: any, i: number) => i !== index) });
        };

        const updateCard = (index: number, fields: any) => {
          const newCards = [...data.cards];
          newCards[index] = { ...newCards[index], ...fields };
          updateSectionData({ cards: newCards });
        };
        const addCard = () => {
          updateSectionData({ cards: [...data.cards, { title: 'New Benefit', description: 'Benefit explanation', icon: 'zap' }] });
        };
        const removeCard = (index: number) => {
          updateSectionData({ cards: data.cards.filter((_: any, i: number) => i !== index) });
        };

        return (
          <div>
            {renderInput('Section Title', data.title, 'title')}
            {renderInput('Section Subtitle', data.subtitle, 'subtitle')}

            <div className="mb-4">
              <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase tracking-wider">Display Type</label>
              <select
                className="w-full bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-sm text-zinc-200 focus:outline-none"
                value={data.comparisonType}
                onChange={(e) => updateSectionData({ comparisonType: e.target.value })}
              >
                <option value="both">Both Table & Cards</option>
                <option value="table">Table Only</option>
                <option value="cards">Cards Only</option>
              </select>
            </div>

            {(data.comparisonType === 'table' || data.comparisonType === 'both') && (
              <div className="border-t border-zinc-800 my-4 pt-4">
                {/* Column Headers Manager */}
                <div className="mb-4 bg-zinc-900/40 p-3 rounded border border-zinc-850">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Comparison Columns</h4>
                    <button
                      onClick={addCompetitorColumn}
                      className="px-2 py-0.5 bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-750 text-indigo-200 text-[10px] font-bold rounded"
                    >
                      + Add Competitor
                    </button>
                  </div>
                  <div className="space-y-2">
                    {headers.map((header: string, hIdx: number) => (
                      <div key={hIdx} className="flex gap-2 items-center">
                        <span className="text-[10px] font-bold text-zinc-600 w-16">
                          Col {hIdx + 1}:
                        </span>
                        <input
                          type="text"
                          className="flex-grow bg-zinc-950 border border-zinc-850 rounded px-2 py-1 text-xs text-zinc-250 focus:outline-none"
                          value={header}
                          onChange={(e) => updateHeader(hIdx, e.target.value)}
                          disabled={hIdx === 0}
                        />
                        {hIdx > 1 && (
                          <button
                            onClick={() => removeCompetitorColumn(hIdx)}
                            className="text-zinc-500 hover:text-rose-455 text-xs px-1"
                            title="Remove Column"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-semibold text-zinc-300">Comparison Table Rows</h4>
                  <button
                    onClick={addRow}
                    className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded"
                  >
                    + Add Row
                  </button>
                </div>

                {data.rows.map((row: any, idx: number) => (
                  <div key={idx} className="bg-zinc-900/60 p-3 rounded border border-zinc-850 mb-3 relative">
                    <button
                      onClick={() => removeRow(idx)}
                      className="absolute top-2 right-2 text-zinc-500 hover:text-rose-455 text-xs"
                    >
                      ✕
                    </button>
                    <div className="mb-2">
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase">Feature Name</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                        value={row.feature}
                        onChange={(e) => updateRow(idx, { feature: e.target.value })}
                      />
                    </div>
                    
                    <div className="space-y-3 mt-2 border-t border-zinc-800/40 pt-2">
                      {headers.slice(1).map((headerName: string, colIdx: number) => {
                        const valIdx = colIdx;
                        const rowValues = row.values || [
                          row.usValue !== undefined ? row.usValue : true,
                          row.themValue !== undefined ? row.themValue : false
                        ];
                        const val = rowValues[valIdx] !== undefined ? rowValues[valIdx] : false;

                        return (
                          <div key={colIdx} className="bg-zinc-950/40 p-2 rounded border border-zinc-900/60">
                            <label className="block text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                              {headerName} Value
                            </label>
                            <div className="flex gap-2 items-center">
                              <select
                                className="bg-zinc-900 border border-zinc-850 rounded px-2 py-1 text-xs text-zinc-200 focus:outline-none"
                                value={typeof val === 'boolean' ? (val ? 'yes' : 'no') : 'custom'}
                                onChange={(e) => {
                                  const newVals = [...rowValues];
                                  if (e.target.value === 'yes') newVals[valIdx] = true;
                                  else if (e.target.value === 'no') newVals[valIdx] = false;
                                  else newVals[valIdx] = 'Custom';
                                  updateRow(idx, { values: newVals });
                                }}
                              >
                                <option value="yes">✓ (Yes)</option>
                                <option value="no">✗ (No)</option>
                                <option value="custom">Custom Text</option>
                              </select>
                              {typeof val !== 'boolean' && (
                                <input
                                  type="text"
                                  className="flex-grow bg-zinc-900 border border-zinc-850 rounded px-2 py-0.5 text-xs text-zinc-200 focus:outline-none"
                                  value={val}
                                  onChange={(e) => {
                                    const newVals = [...rowValues];
                                    newVals[valIdx] = e.target.value;
                                    updateRow(idx, { values: newVals });
                                  }}
                                />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {(data.comparisonType === 'cards' || data.comparisonType === 'both') && (
              <div className="border-t border-zinc-800 my-4 pt-4">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-semibold text-zinc-300">Feature Highlight Cards</h4>
                  <button
                    onClick={addCard}
                    className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded"
                  >
                    + Add Card
                  </button>
                </div>

                {data.cards.map((card: any, idx: number) => (
                  <div key={idx} className="bg-zinc-900/60 p-3 rounded border border-zinc-850 mb-3 relative">
                    <button
                      onClick={() => removeCard(idx)}
                      className="absolute top-2 right-2 text-zinc-500 hover:text-rose-455 text-xs"
                    >
                      ✕
                    </button>
                    <div className="mb-2">
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase">Card Icon</label>
                      <select
                        className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                        value={card.icon || 'zap'}
                        onChange={(e) => updateCard(idx, { icon: e.target.value })}
                      >
                        <option value="zap">Zap (Speed)</option>
                        <option value="shield">Shield (Security)</option>
                        <option value="globe">Globe (Global)</option>
                        <option value="sparkles">Sparkles (Aesthetics)</option>
                        <option value="code">Code (Developers)</option>
                        <option value="heart">Heart (Love)</option>
                      </select>
                    </div>
                    <div className="mb-2">
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase">Card Title</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-955 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                        value={card.title}
                        onChange={(e) => updateCard(idx, { title: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase">Description</label>
                      <textarea
                        className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none resize-none"
                        rows={2}
                        value={card.description}
                        onChange={(e) => updateCard(idx, { description: e.target.value })}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }

      case 'features': {
        const updateFeat = (index: number, fields: any) => {
          const newItems = [...data.items];
          newItems[index] = { ...newItems[index], ...fields };
          updateSectionData({ items: newItems });
        };
        const addFeat = () => {
          updateSectionData({ items: [...data.items, { title: 'Dynamic Integration', description: 'Explain how it works.', icon: 'zap' }] });
        };
        const removeFeat = (index: number) => {
          updateSectionData({ items: data.items.filter((_: any, i: number) => i !== index) });
        };

        return (
          <div>
            {renderInput('Section Title', data.title, 'title')}
            {renderInput('Section Subtitle', data.subtitle, 'subtitle')}

            <div className="border-t border-zinc-800 my-4 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-zinc-300">Features List</h4>
                <button
                  onClick={addFeat}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded"
                >
                  + Add Feature
                </button>
              </div>

              {data.items.map((feat: any, idx: number) => (
                <div key={idx} className="bg-zinc-900/60 p-3 rounded border border-zinc-850 mb-3 relative">
                  <button
                    onClick={() => removeFeat(idx)}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-rose-455 text-xs"
                  >
                    ✕
                  </button>
                  <div className="mb-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Icon</label>
                    <select
                      className="w-full bg-zinc-950 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                      value={feat.icon || 'zap'}
                      onChange={(e) => updateFeat(idx, { icon: e.target.value })}
                    >
                      <option value="zap">Zap (Lightning)</option>
                      <option value="shield">Shield (Lock)</option>
                      <option value="globe">Globe (Web)</option>
                      <option value="sparkles">Sparkles (Quality)</option>
                      <option value="code">Code (Clean)</option>
                      <option value="rocket">Rocket (Launch)</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Feature Title</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-955 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                      value={feat.title}
                      onChange={(e) => updateFeat(idx, { title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Description</label>
                    <textarea
                      className="w-full bg-zinc-955 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none resize-none"
                      rows={2}
                      value={feat.description}
                      onChange={(e) => updateFeat(idx, { description: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'pricing': {
        const updatePlan = (index: number, fields: any) => {
          const newPlans = [...data.plans];
          newPlans[index] = { ...newPlans[index], ...fields };
          updateSectionData({ plans: newPlans });
        };
        const addPlan = () => {
          updateSectionData({
            plans: [
              ...data.plans,
              {
                name: 'Scale Plan',
                price: '$49',
                period: '/month',
                description: 'Full features for teams.',
                features: ['All Pro features', 'Dedicated hosting', 'Priority backups'],
                buttonText: 'Buy Scale License',
                buttonLink: '#',
                isPopular: false,
              },
            ],
          });
        };
        const removePlan = (index: number) => {
          updateSectionData({ plans: data.plans.filter((_: any, i: number) => i !== index) });
        };

        return (
          <div>
            {renderInput('Section Title', data.title, 'title')}
            {renderInput('Section Subtitle', data.subtitle, 'subtitle')}

            <div className="border-t border-zinc-800 my-4 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-zinc-300">Pricing Packages</h4>
                <button
                  onClick={addPlan}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded"
                >
                  + Add Plan
                </button>
              </div>

              {data.plans.map((plan: any, idx: number) => (
                <div key={idx} className="bg-zinc-900/60 p-3 rounded border border-zinc-850 mb-3 relative">
                  <button
                    onClick={() => removePlan(idx)}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-rose-455 text-xs"
                  >
                    ✕
                  </button>
                  <div className="mb-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Plan Name</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-955 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                      value={plan.name}
                      onChange={(e) => updatePlan(idx, { name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase">Price</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-955 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                        value={plan.price}
                        onChange={(e) => updatePlan(idx, { price: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase">Period (e.g. /month)</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-955 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                        value={plan.period || ''}
                        onChange={(e) => updatePlan(idx, { period: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="mb-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Description</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-955 border border-zinc-855 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                      value={plan.description || ''}
                      onChange={(e) => updatePlan(idx, { description: e.target.value })}
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Features (Comma separated)</label>
                    <textarea
                      className="w-full bg-zinc-955 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none resize-none"
                      rows={2}
                      value={plan.features.join(', ')}
                      onChange={(e) =>
                        updatePlan(idx, {
                          features: e.target.value.split(',').map((x) => x.trim()).filter(Boolean),
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase">Button Text</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-955 border border-zinc-855 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                        value={plan.buttonText}
                        onChange={(e) => updatePlan(idx, { buttonText: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase">Button Link</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-955 border border-zinc-855 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                        value={plan.buttonLink}
                        onChange={(e) => updatePlan(idx, { buttonLink: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <input
                      type="checkbox"
                      id={`popular-${idx}`}
                      checked={plan.isPopular || false}
                      onChange={(e) => updatePlan(idx, { isPopular: e.target.checked })}
                      className="rounded border-zinc-800 bg-zinc-950 text-indigo-500 focus:ring-0 w-4 h-4"
                    />
                    <label htmlFor={`popular-${idx}`} className="text-xs text-zinc-400 font-bold uppercase select-none">
                      Mark as Popular Tier
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'cta':
        return (
          <div>
            {renderInput('CTA Title', data.title, 'title')}
            {renderTextarea('CTA Subtitle', data.subtitle, 'subtitle')}
            <div className="border-t border-zinc-800 my-4 pt-4">
              <h4 className="text-sm font-semibold text-zinc-300 mb-3">Button Settings</h4>
              {renderInput('Button Text', data.buttonText, 'buttonText')}
              {renderInput('Button Link / Route', data.buttonLink, 'buttonLink')}
            </div>
          </div>
        );

      case 'testimonials': {
        const updateTest = (index: number, fields: any) => {
          const newItems = [...data.items];
          newItems[index] = { ...newItems[index], ...fields };
          updateSectionData({ items: newItems });
        };
        const addTest = () => {
          updateSectionData({
            items: [
              ...data.items,
              {
                name: 'Jane Doe',
                role: 'CTO',
                company: 'StackApp',
                avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80',
                feedback: 'Fantastic product. Made our landing page code easy to scale!',
                rating: 5,
              },
            ],
          });
        };
        const removeTest = (index: number) => {
          updateSectionData({ items: data.items.filter((_: any, i: number) => i !== index) });
        };

        return (
          <div>
            {renderInput('Section Title', data.title, 'title')}
            {renderInput('Section Subtitle', data.subtitle, 'subtitle')}

            <div className="border-t border-zinc-800 my-4 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-zinc-300">Customer Testimonials</h4>
                <button
                  onClick={addTest}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded"
                >
                  + Add Testimonial
                </button>
              </div>

              {data.items.map((test: any, idx: number) => (
                <div key={idx} className="bg-zinc-900/60 p-3 rounded border border-zinc-850 mb-3 relative">
                  <button
                    onClick={() => removeTest(idx)}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-rose-455 text-xs"
                  >
                    ✕
                  </button>
                  <div className="mb-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Customer Name</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-955 border border-zinc-850 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                      value={test.name}
                      onChange={(e) => updateTest(idx, { name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase">Role</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-955 border border-zinc-855 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                        value={test.role}
                        onChange={(e) => updateTest(idx, { role: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-500 uppercase">Company</label>
                      <input
                        type="text"
                        className="w-full bg-zinc-955 border border-zinc-855 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                        value={test.company || ''}
                        onChange={(e) => updateTest(idx, { company: e.target.value })}
                      />
                    </div>
                  </div>
                  {renderImageInput('Avatar Image', test.avatarUrl, (val) => updateTest(idx, { avatarUrl: val }))}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Feedback Quotes</label>
                    <textarea
                      className="w-full bg-zinc-955 border border-zinc-855 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none resize-none"
                      rows={2.5}
                      value={test.feedback}
                      onChange={(e) => updateTest(idx, { feedback: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'faqs': {
        const updateFaq = (index: number, fields: any) => {
          const newItems = [...data.items];
          newItems[index] = { ...newItems[index], ...fields };
          updateSectionData({ items: newItems });
        };
        const addFaq = () => {
          updateSectionData({
            items: [...data.items, { question: 'New Question?', answer: 'Answer content.' }],
          });
        };
        const removeFaq = (index: number) => {
          updateSectionData({ items: data.items.filter((_: any, i: number) => i !== index) });
        };

        return (
          <div>
            {renderInput('Section Title', data.title, 'title')}
            {renderInput('Section Subtitle', data.subtitle, 'subtitle')}

            <div className="border-t border-zinc-800 my-4 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-zinc-300">FAQ List</h4>
                <button
                  onClick={addFaq}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded"
                >
                  + Add FAQ
                </button>
              </div>

              {data.items.map((faq: any, idx: number) => (
                <div key={idx} className="bg-zinc-900/60 p-3 rounded border border-zinc-850 mb-3 relative">
                  <button
                    onClick={() => removeFaq(idx)}
                    className="absolute top-2 right-2 text-zinc-500 hover:text-rose-455 text-xs"
                  >
                    ✕
                  </button>
                  <div className="mb-2">
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Question</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-955 border border-zinc-855 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none"
                      value={faq.question}
                      onChange={(e) => updateFaq(idx, { question: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-500 uppercase">Answer</label>
                    <textarea
                      className="w-full bg-zinc-955 border border-zinc-855 rounded px-2.5 py-1 text-xs text-zinc-200 focus:outline-none resize-none"
                      rows={2.5}
                      value={faq.answer}
                      onChange={(e) => updateFaq(idx, { answer: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'about-me':
        return (
          <div>
            {renderInput('Headline Title', data.title, 'title')}
            {renderInput('Full Name', data.name, 'name')}
            {renderInput('Role / Title', data.role, 'role')}
            {renderTextarea('Bio Paragraph', data.bio, 'bio')}
            {renderImageInput('Avatar Image', data.avatarUrl, (val) => updateSectionData({ avatarUrl: val }))}
            
            <div className="border-t border-zinc-800 my-4 pt-4">
              <h4 className="text-sm font-semibold text-zinc-300 mb-3">Social Handles</h4>
              {renderInput('Twitter URL', data.twitterUrl || '', 'twitterUrl')}
              {renderInput('GitHub URL', data.githubUrl || '', 'githubUrl')}
              {renderInput('LinkedIn URL', data.linkedinUrl || '', 'linkedinUrl')}
            </div>
          </div>
        );

      case 'footer': {
        const updateLink = (index: number, fields: any) => {
          const newLinks = [...data.links];
          newLinks[index] = { ...newLinks[index], ...fields };
          updateSectionData({ links: newLinks });
        };
        const addLink = () => {
          updateSectionData({ links: [...data.links, { label: 'New Link', href: '#' }] });
        };
        const removeLink = (index: number) => {
          updateSectionData({ links: data.links.filter((_: any, i: number) => i !== index) });
        };

        return (
          <div>
            {renderInput('Brand Name', data.brandName, 'brandName')}
            {renderInput('Brand Description', data.description, 'description')}
            {renderInput('Copyright Notice', data.copyrightText, 'copyrightText')}

            <div className="border-t border-zinc-800 my-4 pt-4">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm font-semibold text-zinc-300">Footer Links</h4>
                <button
                  onClick={addLink}
                  className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded"
                >
                  + Add Link
                </button>
              </div>

              {data.links.map((link: any, idx: number) => (
                <div key={idx} className="grid grid-cols-2 gap-2 bg-zinc-900/60 p-3 rounded border border-zinc-850 mb-2 relative">
                  <button
                    onClick={() => removeLink(idx)}
                    className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-zinc-800 text-zinc-400 hover:text-rose-455 text-[10px] flex items-center justify-center rounded-full"
                  >
                    ✕
                  </button>
                  <div>
                    <label className="block text-[9px] font-bold text-zinc-500 uppercase">Label</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded px-2 py-0.5 text-xs text-zinc-200 focus:outline-none"
                      value={link.label}
                      onChange={(e) => updateLink(idx, { label: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-zinc-500 uppercase">Href / Anchor</label>
                    <input
                      type="text"
                      className="w-full bg-zinc-950 border border-zinc-850 rounded px-2 py-0.5 text-xs text-zinc-200 focus:outline-none"
                      value={link.href}
                      onChange={(e) => updateLink(idx, { href: e.target.value })}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="w-80 md:w-96 bg-zinc-950 border-r border-zinc-900 flex flex-col h-full overflow-hidden select-none">
      
      {/* Top Brand Banner */}
      <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/10">
        <div>
          <h1 className="text-base font-black text-white flex items-center gap-1.5">
            <span className="w-5 h-5 rounded bg-indigo-650 flex items-center justify-center text-[11px] text-white font-bold">L</span>
            LayoutExport
          </h1>
        </div>
        <button
          onClick={onExport}
          className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded shadow transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          Export Code
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        
        {/* Style Themes & Colors Section */}
        <div>
          <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">1. Theme Style & Palette</h3>
          
          {/* Themes */}
          <div className="grid grid-cols-3 gap-1.5 mb-3 bg-zinc-900/30 p-1 border border-zinc-900 rounded">
            {(['linear', 'neubrutalism', 'glassmorphism'] as ThemePreset[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  // Switch to theme and pick its first matching palette
                  const firstPalette = COLOR_PALETTES.find((p) => p.id.startsWith(t === 'neubrutalism' ? 'neubrutalism' : t === 'glassmorphism' ? 'glass' : 'linear')) || COLOR_PALETTES[0];
                  setGlobalStyle(t, firstPalette.id);
                }}
                className={`py-1 px-2 text-center text-xs font-bold rounded uppercase transition-colors ${
                  theme === t
                    ? 'bg-zinc-800 text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {t === 'neubrutalism' ? 'Neubrutalism' : t === 'glassmorphism' ? 'Glass' : 'Minimalist'}
              </button>
            ))}
          </div>

          {/* Color Palettes Dropdown */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1">Color Combination</label>
            <select
              className="w-full bg-zinc-900 border border-zinc-850 rounded px-2.5 py-1.5 text-xs text-zinc-200 focus:outline-none"
              value={paletteId}
              onChange={(e) => setGlobalStyle(theme, e.target.value)}
            >
              {COLOR_PALETTES.filter((p) => {
                if (theme === 'neubrutalism') return p.id.startsWith('neubrutalism');
                if (theme === 'glassmorphism') return p.id.startsWith('glass');
                return p.id.startsWith('linear');
              }).map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sections Organizer */}
        <div>
          <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-3">2. Manage Sections</h3>
          
          <div className="space-y-1.5 mb-4 max-h-48 overflow-y-auto pr-1 border-b border-zinc-900 pb-3">
            {sections.map((sect, idx) => (
              <div
                key={sect.id}
                onClick={() => onSelectSectionId(sect.id)}
                draggable
                onDragStart={(e) => {
                  setDraggedIdx(idx);
                  e.dataTransfer.effectAllowed = 'move';
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDragEnter={() => {
                  if (draggedIdx !== null && draggedIdx !== idx) {
                    const newSections = [...sections];
                    const temp = newSections[draggedIdx];
                    newSections[draggedIdx] = newSections[idx];
                    newSections[idx] = temp;
                    onChangeConfig({
                      ...config,
                      sections: newSections,
                    });
                    setDraggedIdx(idx);
                  }
                }}
                onDragEnd={() => {
                  setDraggedIdx(null);
                }}
                className={`p-2 border rounded flex justify-between items-center cursor-pointer transition-all ${
                  draggedIdx === idx ? 'opacity-40 border-dashed border-indigo-500 bg-zinc-900/50' : ''
                } ${
                  activeSectionId === sect.id
                    ? 'bg-indigo-950/20 border-indigo-900/50 text-zinc-250 ring-1 ring-indigo-500/10'
                    : 'bg-zinc-900/30 border-zinc-900 text-zinc-400 hover:bg-zinc-900/60'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {/* Drag Grip Icon */}
                  <svg className="w-3 h-3 text-zinc-650 cursor-grab active:cursor-grabbing shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <circle cx="9" cy="5" r="1.5" fill="currentColor"/>
                    <circle cx="9" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="9" cy="19" r="1.5" fill="currentColor"/>
                    <circle cx="15" cy="5" r="1.5" fill="currentColor"/>
                    <circle cx="15" cy="12" r="1.5" fill="currentColor"/>
                    <circle cx="15" cy="19" r="1.5" fill="currentColor"/>
                  </svg>
                  <span className="text-[10px] text-zinc-600 font-bold">#{idx + 1}</span>
                  <span className="text-xs font-semibold capitalize">{sect.type.replace('-', ' ')}</span>
                </div>

                <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                  {/* Delete */}
                  <button
                    onClick={(e) => deleteSection(sect.id, e)}
                    className="w-5 h-5 flex items-center justify-center bg-zinc-900/60 border border-zinc-850 hover:bg-rose-950/40 hover:border-rose-900/50 hover:text-rose-400 text-zinc-550 rounded-full transition-all"
                    title="Delete"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
            {sections.length === 0 && (
              <p className="text-[11px] text-zinc-600 text-center py-2">No sections added yet. Add one below!</p>
            )}
          </div>

          {/* Add Section Controls */}
          <div>
            <label className="block text-[10px] font-bold text-zinc-500 uppercase mb-1.5">Add Section to Page</label>
            <div className="grid grid-cols-2 gap-1 text-center">
              {(['hero', 'what-you-get', 'why-choose-us', 'features', 'pricing', 'cta', 'testimonials', 'faqs', 'about-me', 'footer'] as LandingPageSection['type'][]).map((type) => (
                <button
                  key={type}
                  onClick={() => addSection(type)}
                  className="py-1.5 px-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-850 text-zinc-400 hover:text-white rounded text-[10px] font-bold transition-all capitalize"
                >
                  + {type.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active Section Content Editor */}
        <div className="border-t border-zinc-900 pt-5">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-black text-zinc-400 uppercase tracking-widest">
              3. Edit {activeSection ? activeSection.type.replace('-', ' ') : 'Section'}
            </h3>
            {activeSection && (
              <span className="text-[9px] font-black uppercase text-indigo-400 py-0.5 px-1 bg-indigo-950/40 border border-indigo-900/50 rounded">
                Active
              </span>
            )}
          </div>
          {renderSectionEditor()}
        </div>

      </div>

      {/* Footer Branding */}
      <div className="p-3 border-t border-zinc-900 text-center bg-zinc-950">
        <p className="text-[9px] text-zinc-600">Created for bootstrapped SaaS founders</p>
      </div>

    </div>
  );
};
