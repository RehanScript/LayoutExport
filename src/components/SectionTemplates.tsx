import React, { useState } from 'react';
import type { LandingPageSection, ThemePreset, ColorPalette } from '../types/landingPage';
import { getThemeClasses, getIcon } from './ThemeStyles';
import { EditableText } from './EditableText';

// Simple check/x icons helper specifically for comparison rows
function ComparisonValue({ value, themeClasses }: { value: string | boolean; themeClasses: any }) {
  if (typeof value === 'boolean') {
    return value ? (
      <span className="text-emerald-500 inline-block font-black text-xl">✓</span>
    ) : (
      <span className="text-rose-500 inline-block font-black text-xl">✗</span>
    );
  }
  return <span className={themeClasses.globalText}>{value}</span>;
}

interface SectionRendererProps {
  section: LandingPageSection;
  theme: ThemePreset;
  palette: ColorPalette;
  isActive: boolean;
  onSelect: () => void;
  isPreviewOnly?: boolean;
  onUpdateSectionData?: (sectionId: string, newData: any) => void;
}

export const SectionRenderer: React.FC<SectionRendererProps> = ({
  section,
  theme,
  palette,
  isActive,
  onSelect,
  isPreviewOnly = false,
  onUpdateSectionData,
}) => {
  const c = getThemeClasses(theme, palette);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Background glow elements for Glassmorphism & Linear styles
  const renderBackgroundEffects = () => {
    if (theme === 'glassmorphism' && palette.glowColor) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div
            className="absolute -top-12 -left-12 w-[450px] h-[450px] rounded-full blur-[140px] opacity-35 animate-pulse-slow"
            style={{ backgroundColor: palette.glowColor.replace(/[^,]+(?=\))/, '0.45') }}
          />
          <div
            className="absolute top-1/3 right-10 w-[350px] h-[350px] rounded-full blur-[120px] opacity-25"
            style={{ backgroundColor: 'rgba(139, 92, 246, 0.25)' }}
          />
          <div
            className="absolute bottom-10 left-1/4 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20"
            style={{ backgroundColor: 'rgba(6, 182, 212, 0.2)' }}
          />
        </div>
      );
    }
    if (theme === 'linear' && palette.glowColor) {
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full blur-[120px] opacity-20 pointer-events-none"
            style={{ backgroundColor: palette.glowColor.replace(/[^,]+(?=\))/, '0.2') }}
          />
        </div>
      );
    }
    return null;
  };

  // Helper callbacks to update the state of fields
  const updateProp = (key: string, newValue: string) => {
    if (onUpdateSectionData) {
      onUpdateSectionData(section.id, {
        ...section.data,
        [key]: newValue,
      });
    }
  };

  const updateButtonProp = (btnKey: 'primaryBtn' | 'secondaryBtn', nestedKey: string, newValue: string) => {
    if (onUpdateSectionData) {
      onUpdateSectionData(section.id, {
        ...section.data,
        [btnKey]: {
          ...(section.data[btnKey] || {}),
          [nestedKey]: newValue,
        },
      });
    }
  };

  const updateArrayProp = (arrayKey: string, index: number, nestedKey: string, newValue: string) => {
    if (onUpdateSectionData) {
      const arrayCopy = [...(section.data[arrayKey] || [])];
      arrayCopy[index] = {
        ...arrayCopy[index],
        [nestedKey]: newValue,
      };
      onUpdateSectionData(section.id, {
        ...section.data,
        [arrayKey]: arrayCopy,
      });
    }
  };

  const updatePlanFeatureProp = (planIndex: number, featureIndex: number, newValue: string) => {
    if (onUpdateSectionData) {
      const plansCopy = [...(section.data.plans || [])];
      const featuresCopy = [...(plansCopy[planIndex].features || [])];
      featuresCopy[featureIndex] = newValue;
      plansCopy[planIndex] = {
        ...plansCopy[planIndex],
        features: featuresCopy,
      };
      onUpdateSectionData(section.id, {
        ...section.data,
        plans: plansCopy,
      });
    }
  };

  const isEditable = !isPreviewOnly && !!onUpdateSectionData;

  const renderContent = () => {
    switch (section.type) {
      case 'hero': {
        const data = section.data;
        return (
          <div className="relative py-20 md:py-32 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
            {renderBackgroundEffects()}

            {data.badge && (
              <div className="mb-6">
                <span className={c.badge}>
                  <EditableText
                    value={data.badge}
                    onChange={(val) => updateProp('badge', val)}
                    isEditable={isEditable}
                  />
                </span>
              </div>
            )}

            <h1 className={`${c.headingText} text-4xl md:text-6xl font-black max-w-4xl leading-tight md:leading-none mb-6`}>
              <EditableText
                tagName="span"
                value={data.headline}
                onChange={(val) => updateProp('headline', val)}
                isEditable={isEditable}
              />
            </h1>

            <p className={`${c.globalText} text-lg md:text-xl max-w-2xl mb-10 leading-relaxed`}>
              <EditableText
                tagName="span"
                value={data.subheadline}
                onChange={(val) => updateProp('subheadline', val)}
                isEditable={isEditable}
              />
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
              {data.primaryBtn?.text && (
                <span className={c.buttonPrimary}>
                  <EditableText
                    value={data.primaryBtn.text}
                    onChange={(val) => updateButtonProp('primaryBtn', 'text', val)}
                    isEditable={isEditable}
                  />
                </span>
              )}
              {data.secondaryBtn?.text && (
                <span className={c.buttonSecondary}>
                  <EditableText
                    value={data.secondaryBtn.text}
                    onChange={(val) => updateButtonProp('secondaryBtn', 'text', val)}
                    isEditable={isEditable}
                  />
                </span>
              )}
            </div>
          </div>
        );
      }

      case 'what-you-get': {
        const data = section.data;
        return (
          <div className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`${c.headingText} text-3xl md:text-4xl font-extrabold mb-4`}>
                <EditableText
                  tagName="span"
                  value={data.title}
                  onChange={(val) => updateProp('title', val)}
                  isEditable={isEditable}
                />
              </h2>
              {data.subtitle && (
                <p className={`${c.globalText} text-lg max-w-xl mx-auto`}>
                  <EditableText
                    tagName="span"
                    value={data.subtitle}
                    onChange={(val) => updateProp('subtitle', val)}
                    isEditable={isEditable}
                  />
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {data.items.map((item: any, idx: number) => (
                <div key={idx} className={`${c.card} p-6 flex items-start gap-4`}>
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black">
                      ✓
                    </div>
                  </div>
                  <div className="w-full text-left">
                    <h3 className={`${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-100'} font-bold text-lg mb-1`}>
                      <EditableText
                        tagName="span"
                        value={item.text}
                        onChange={(val) => updateArrayProp('items', idx, 'text', val)}
                        isEditable={isEditable}
                      />
                    </h3>
                    {item.description && (
                      <p className={`${c.globalText} text-sm`}>
                        <EditableText
                          tagName="span"
                          value={item.description}
                          onChange={(val) => updateArrayProp('items', idx, 'description', val)}
                          isEditable={isEditable}
                        />
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'why-choose-us': {
        const data = section.data;
        return (
          <div className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`${c.headingText} text-3xl md:text-4xl font-extrabold mb-4`}>
                <EditableText
                  tagName="span"
                  value={data.title}
                  onChange={(val) => updateProp('title', val)}
                  isEditable={isEditable}
                />
              </h2>
              {data.subtitle && (
                <p className={`${c.globalText} text-lg max-w-xl mx-auto`}>
                  <EditableText
                    tagName="span"
                    value={data.subtitle}
                    onChange={(val) => updateProp('subtitle', val)}
                    isEditable={isEditable}
                  />
                </p>
              )}
            </div>

            {/* Comparison Table */}
            {(data.comparisonType === 'table' || data.comparisonType === 'both') && (
              <div className="overflow-x-auto mb-12">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className={c.tableHeader}>Feature</th>
                      <th className={c.tableHeader}>Our Solution</th>
                      <th className={c.tableHeader}>Competitors</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row: any, idx: number) => (
                      <tr key={idx}>
                        <td className={`${c.tableCell} font-semibold text-left`}>
                          <EditableText
                            tagName="span"
                            value={row.feature}
                            onChange={(val) => updateArrayProp('rows', idx, 'feature', val)}
                            isEditable={isEditable}
                          />
                        </td>
                        <td className={`${c.tableCell} text-center font-medium`}>
                          <ComparisonValue value={row.usValue} themeClasses={c} />
                        </td>
                        <td className={`${c.tableCell} text-center font-medium opacity-70`}>
                          <ComparisonValue value={row.themValue} themeClasses={c} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Comparison Cards */}
            {(data.comparisonType === 'cards' || data.comparisonType === 'both') && (
              <div className="grid md:grid-cols-3 gap-6">
                {data.cards.map((card: any, idx: number) => (
                  <div key={idx} className={`${c.card} p-6 text-left`}>
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 mb-4">
                      {getIcon(card.icon || 'sparkles', "w-6 h-6")}
                    </div>
                    <h3 className={`${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-100'} font-bold text-lg mb-2`}>
                      <EditableText
                        tagName="span"
                        value={card.title}
                        onChange={(val) => updateArrayProp('cards', idx, 'title', val)}
                        isEditable={isEditable}
                      />
                    </h3>
                    <p className={`${c.globalText} text-sm leading-relaxed`}>
                      <EditableText
                        tagName="span"
                        value={card.description}
                        onChange={(val) => updateArrayProp('cards', idx, 'description', val)}
                        isEditable={isEditable}
                      />
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      }

      case 'features': {
        const data = section.data;
        return (
          <div className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`${c.headingText} text-3xl md:text-4xl font-extrabold mb-4`}>
                <EditableText
                  tagName="span"
                  value={data.title}
                  onChange={(val) => updateProp('title', val)}
                  isEditable={isEditable}
                />
              </h2>
              {data.subtitle && (
                <p className={`${c.globalText} text-lg max-w-2xl mx-auto`}>
                  <EditableText
                    tagName="span"
                    value={data.subtitle}
                    onChange={(val) => updateProp('subtitle', val)}
                    isEditable={isEditable}
                  />
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-left">
              {data.items.map((feat: any, idx: number) => (
                <div key={idx} className={`${c.card} p-6 transition-all hover:-translate-y-1 duration-200`}>
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20">
                    {getIcon(feat.icon || 'zap', "w-6 h-6")}
                  </div>
                  <h3 className={`${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-100'} font-bold text-xl mb-3`}>
                    <EditableText
                      tagName="span"
                      value={feat.title}
                      onChange={(val) => updateArrayProp('items', idx, 'title', val)}
                      isEditable={isEditable}
                    />
                  </h3>
                  <p className={`${c.globalText} text-sm leading-relaxed`}>
                    <EditableText
                      tagName="span"
                      value={feat.description}
                      onChange={(val) => updateArrayProp('items', idx, 'description', val)}
                      isEditable={isEditable}
                    />
                  </p>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'pricing': {
        const data = section.data;
        return (
          <div className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`${c.headingText} text-3xl md:text-4xl font-extrabold mb-4`}>
                <EditableText
                  tagName="span"
                  value={data.title}
                  onChange={(val) => updateProp('title', val)}
                  isEditable={isEditable}
                />
              </h2>
              {data.subtitle && (
                <p className={`${c.globalText} text-lg max-w-xl mx-auto`}>
                  <EditableText
                    tagName="span"
                    value={data.subtitle}
                    onChange={(val) => updateProp('subtitle', val)}
                    isEditable={isEditable}
                  />
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch text-left">
              {data.plans.map((plan: any, idx: number) => {
                const popularClass = plan.isPopular
                  ? theme === 'neubrutalism'
                    ? 'border-4 border-yellow-500 shadow-[6px_6px_0px_rgba(0,0,0,1)] ring-2 ring-black bg-white scale-105'
                    : 'border-2 border-indigo-500 scale-105 ring-4 ring-indigo-500/10'
                  : '';
                return (
                  <div
                    key={idx}
                    className={`${c.card} ${popularClass} p-8 flex flex-col justify-between relative`}
                  >
                    {plan.isPopular && (
                      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold tracking-widest text-white bg-indigo-500 uppercase rounded-full">
                        Popular
                      </span>
                    )}
                    <div>
                      <h3 className={`${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-100'} font-extrabold text-xl mb-2`}>
                        <EditableText
                          tagName="span"
                          value={plan.name}
                          onChange={(val) => updateArrayProp('plans', idx, 'name', val)}
                          isEditable={isEditable}
                        />
                      </h3>
                      <p className={`${c.globalText} text-sm mb-6`}>
                        <EditableText
                          tagName="span"
                          value={plan.description}
                          onChange={(val) => updateArrayProp('plans', idx, 'description', val)}
                          isEditable={isEditable}
                        />
                      </p>

                      <div className="flex items-baseline mb-6">
                        <span className={`${theme === 'neubrutalism' ? 'text-black' : 'text-white'} text-4xl font-black`}>
                          <EditableText
                            tagName="span"
                            value={plan.price}
                            onChange={(val) => updateArrayProp('plans', idx, 'price', val)}
                            isEditable={isEditable}
                          />
                        </span>
                        {plan.period && (
                          <span className={`${c.globalText} ml-2 text-sm`}>
                            <EditableText
                              tagName="span"
                              value={plan.period}
                              onChange={(val) => updateArrayProp('plans', idx, 'period', val)}
                              isEditable={isEditable}
                            />
                          </span>
                        )}
                      </div>

                      <ul className="space-y-3 mb-8">
                        {plan.features.map((f: string, fIdx: number) => (
                          <li key={fIdx} className="flex items-start gap-2.5 text-sm text-left">
                            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                            <span className={theme === 'neubrutalism' ? 'text-black' : 'text-zinc-300'}>
                              <EditableText
                                tagName="span"
                                value={f}
                                onChange={(val) => updatePlanFeatureProp(idx, fIdx, val)}
                                isEditable={isEditable}
                              />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <span className={`${c.buttonPrimary} w-full text-center`}>
                      <EditableText
                        value={plan.buttonText}
                        onChange={(val) => updateArrayProp('plans', idx, 'buttonText', val)}
                        isEditable={isEditable}
                      />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'cta': {
        const data = section.data;
        return (
          <div className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-center">
            <div className={`${c.card} p-8 md:p-12 relative overflow-hidden`}>
              {renderBackgroundEffects()}
              <h2 className={`${c.headingText} text-3xl md:text-5xl font-black mb-6`}>
                <EditableText
                  tagName="span"
                  value={data.title}
                  onChange={(val) => updateProp('title', val)}
                  isEditable={isEditable}
                />
              </h2>
              <p className={`${c.globalText} text-lg md:text-xl max-w-xl mx-auto mb-8`}>
                <EditableText
                  tagName="span"
                  value={data.subtitle}
                  onChange={(val) => updateProp('subtitle', val)}
                  isEditable={isEditable}
                />
              </p>
              <span className={c.buttonPrimary}>
                <EditableText
                  value={data.buttonText}
                  onChange={(val) => updateProp('buttonText', val)}
                  isEditable={isEditable}
                />
              </span>
            </div>
          </div>
        );
      }

      case 'testimonials': {
        const data = section.data;
        return (
          <div className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className={`${c.headingText} text-3xl md:text-4xl font-extrabold mb-4`}>
                <EditableText
                  tagName="span"
                  value={data.title}
                  onChange={(val) => updateProp('title', val)}
                  isEditable={isEditable}
                />
              </h2>
              {data.subtitle && (
                <p className={`${c.globalText} text-lg max-w-xl mx-auto`}>
                  <EditableText
                    tagName="span"
                    value={data.subtitle}
                    onChange={(val) => updateProp('subtitle', val)}
                    isEditable={isEditable}
                  />
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {data.items.map((test: any, idx: number) => (
                <div key={idx} className={`${c.card} p-6 flex flex-col justify-between`}>
                  <div>
                    {/* Stars */}
                    <div className="flex gap-1 mb-4 text-amber-400">
                      {Array.from({ length: 5 }).map((_, starIdx) => (
                        <span key={starIdx} className="opacity-90">
                          {getIcon('star', 'w-4 h-4')}
                        </span>
                      ))}
                    </div>
                    <p className={`${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-200'} text-sm italic mb-6 leading-relaxed`}>
                      "<EditableText
                        tagName="span"
                        value={test.feedback}
                        onChange={(val) => updateArrayProp('items', idx, 'feedback', val)}
                        isEditable={isEditable}
                      />"
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <img
                      src={test.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${test.name}`}
                      alt={test.name}
                      className="w-10 h-10 rounded-full border border-zinc-700/50 object-cover"
                    />
                    <div>
                      <h4 className={`${theme === 'neubrutalism' ? 'text-black font-extrabold' : 'text-zinc-100 font-bold'} text-sm`}>
                        <EditableText
                          tagName="span"
                          value={test.name}
                          onChange={(val) => updateArrayProp('items', idx, 'name', val)}
                          isEditable={isEditable}
                        />
                      </h4>
                      <p className={`${c.globalText} text-xs`}>
                        <EditableText
                          tagName="span"
                          value={test.role}
                          onChange={(val) => updateArrayProp('items', idx, 'role', val)}
                          isEditable={isEditable}
                        />{' '}
                        @{' '}
                        <EditableText
                          tagName="span"
                          value={test.company || ''}
                          onChange={(val) => updateArrayProp('items', idx, 'company', val)}
                          isEditable={isEditable}
                        />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      case 'faqs': {
        const data = section.data;
        return (
          <div className="py-16 md:py-24 px-6 max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className={`${c.headingText} text-3xl md:text-4xl font-extrabold mb-4`}>
                <EditableText
                  tagName="span"
                  value={data.title}
                  onChange={(val) => updateProp('title', val)}
                  isEditable={isEditable}
                />
              </h2>
              {data.subtitle && (
                <p className={`${c.globalText} text-lg max-w-xl mx-auto`}>
                  <EditableText
                    tagName="span"
                    value={data.subtitle}
                    onChange={(val) => updateProp('subtitle', val)}
                    isEditable={isEditable}
                  />
                </p>
              )}
            </div>

            <div className="space-y-4 text-left">
              {data.items.map((faq: any, idx: number) => {
                const isOpen = activeFaq === idx;
                return (
                  <div key={idx} className={c.faqItem}>
                    <div className="w-full flex justify-between items-center text-left py-2 font-bold text-base">
                      <span className={`${theme === 'neubrutalism' ? 'text-black font-black' : 'text-zinc-100'} flex-grow cursor-pointer`} onClick={() => setActiveFaq(isOpen ? null : idx)}>
                        <EditableText
                          tagName="span"
                          value={faq.question}
                          onChange={(val) => updateArrayProp('items', idx, 'question', val)}
                          isEditable={isEditable}
                        />
                      </span>
                      <button
                        className={`${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-400'} font-bold transition-transform duration-200 ml-2 focus:outline-none ${isOpen ? 'rotate-180' : ''}`}
                        onClick={() => setActiveFaq(isOpen ? null : idx)}
                      >
                        ▼
                      </button>
                    </div>
                    {isOpen && (
                      <div className={`mt-3 pt-3 border-t ${theme === 'neubrutalism' ? 'border-black text-black' : 'border-zinc-800 text-zinc-400'} text-sm leading-relaxed`}>
                        <EditableText
                          tagName="p"
                          value={faq.answer}
                          onChange={(val) => updateArrayProp('items', idx, 'answer', val)}
                          isEditable={isEditable}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      }

      case 'about-me': {
        const data = section.data;
        return (
          <div className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-left">
            <div className={`${c.card} p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center`}>
              <div className="flex-shrink-0">
                <img
                  src={data.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`}
                  alt={data.name}
                  className={`w-32 h-32 md:w-40 md:h-40 object-cover ${theme === 'neubrutalism' ? 'border-4 border-black rounded-none shadow-neubrutalism-sm' : 'border-2 border-zinc-700 rounded-2xl'}`}
                />
              </div>

              <div className="text-center md:text-left flex-grow">
                <span className={c.badge}>
                  <EditableText
                    value={data.role || 'Founder'}
                    onChange={(val) => updateProp('role', val)}
                    isEditable={isEditable}
                  />
                </span>
                <h2 className={`${c.headingText} text-3xl font-black mt-2 mb-4`}>
                  <EditableText
                    tagName="span"
                    value={data.title || `About ${data.name}`}
                    onChange={(val) => updateProp('title', val)}
                    isEditable={isEditable}
                  />
                </h2>
                <p className={`${c.globalText} text-sm md:text-base leading-relaxed mb-6`}>
                  <EditableText
                    tagName="span"
                    value={data.bio}
                    onChange={(val) => updateProp('bio', val)}
                    isEditable={isEditable}
                  />
                </p>

                <div className="flex justify-center md:justify-start gap-4">
                  {data.twitterUrl && (
                    <a href={data.twitterUrl} target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">
                      {getIcon('twitter', 'w-5 h-5')}
                    </a>
                  )}
                  {data.githubUrl && (
                    <a href={data.githubUrl} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                      {getIcon('github', 'w-5 h-5')}
                    </a>
                  )}
                  {data.linkedinUrl && (
                    <a href={data.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                      {getIcon('linkedin', 'w-5 h-5')}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 'footer': {
        const data = section.data;
        return (
          <footer className={`py-12 px-6 border-t ${c.borderColor} mt-auto text-left`}>
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="text-center md:text-left">
                <h3 className={`${theme === 'neubrutalism' ? 'text-black font-black' : 'text-zinc-100 font-bold'} text-lg`}>
                  <EditableText
                    tagName="span"
                    value={data.brandName}
                    onChange={(val) => updateProp('brandName', val)}
                    isEditable={isEditable}
                  />
                </h3>
                <p className={`${c.globalText} text-xs mt-1 max-w-sm`}>
                  <EditableText
                    tagName="span"
                    value={data.description}
                    onChange={(val) => updateProp('description', val)}
                    isEditable={isEditable}
                  />
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm">
                {data.links.map((link: any, idx: number) => (
                  <span
                    key={idx}
                    className={`${theme === 'neubrutalism' ? 'text-black font-black hover:underline' : 'text-zinc-400 hover:text-zinc-200'} transition-all`}
                  >
                    <EditableText
                      value={link.label}
                      onChange={(val) => updateArrayProp('links', idx, 'label', val)}
                      isEditable={isEditable}
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className="max-w-5xl mx-auto text-center mt-8 pt-8 border-t border-zinc-800/40">
              <p className={`${c.globalText} text-xs`}>
                <EditableText
                  tagName="span"
                  value={data.copyrightText}
                  onChange={(val) => updateProp('copyrightText', val)}
                  isEditable={isEditable}
                />
              </p>
            </div>
          </footer>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div
      onClick={onSelect}
      className={`relative group border-2 ${isPreviewOnly
        ? 'border-transparent'
        : isActive
          ? 'border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
          : 'border-transparent hover:border-zinc-700/50'
      } transition-all duration-200 cursor-pointer overflow-hidden w-full shrink-0`}
    >
      {/* Editor helper border overlay */}
      {!isPreviewOnly && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-transparent group-hover:bg-indigo-500/30 transition-colors pointer-events-none z-20">
          <div className="absolute left-4 top-1 py-0.5 px-1.5 bg-indigo-500 text-[10px] text-white font-bold uppercase rounded opacity-0 group-hover:opacity-100 transition-opacity">
            {section.type.replace('-', ' ')} Section
          </div>
        </div>
      )}

      {renderContent()}
    </div>
  );
};
