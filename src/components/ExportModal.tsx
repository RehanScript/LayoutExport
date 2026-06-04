import React, { useState } from 'react';
import type { LandingPageConfig } from '../types/landingPage';
import { COLOR_PALETTES, getThemeClasses } from './ThemeStyles';

interface ExportModalProps {
  config: LandingPageConfig;
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ config, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const { theme, paletteId, sections } = config;
  const palette = COLOR_PALETTES.find((p) => p.id === paletteId) || COLOR_PALETTES[0];
  const c = getThemeClasses(theme, palette);

  // Helper to generate the exact inline SVG string for the exported code
  const getIconString = (name: string) => {
    switch (name.toLowerCase()) {
      case 'zap':
        return `(
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )`;
      case 'shield':
        return `(
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )`;
      case 'globe':
        return `(
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  )`;
      case 'sparkles':
        return `(
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )`;
      case 'code':
        return `(
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  )`;
      case 'heart':
        return `(
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  )`;
      case 'rocket':
        return `(
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
    </svg>
  )`;
      default:
        return `(
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
    </svg>
  )`;
    }
  };

  // Generate complete JSX code structure
  const generateExportCode = () => {
    let componentsJsx = '';
    const hasFaq = sections.some((s) => s.type === 'faqs');

    sections.forEach((sect) => {
      const data = sect.data;
      switch (sect.type) {
        case 'hero':
          componentsJsx += `
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 px-6 max-w-5xl mx-auto text-center flex flex-col items-center">
        ${
          theme === 'glassmorphism' && palette.glowColor
            ? `<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-1/4 left-1/3 w-[350px] h-[350px] rounded-full blur-[120px] opacity-35 bg-indigo-500/30" />
        </div>`
            : ''
        }
        ${
          theme === 'linear' && palette.glowColor
            ? `<div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-[600px] h-[250px] rounded-full blur-[120px] opacity-20 bg-emerald-500/20" />
        </div>`
            : ''
        }
        ${
          data.badge
            ? `<div className="mb-6">
          <span className="${c.badge}">${data.badge}</span>
        </div>`
            : ''
        }
        <h1 className="${c.headingText} text-4xl md:text-6xl font-black max-w-4xl leading-tight md:leading-none mb-6">
          ${data.headline}
        </h1>
        <p className="${c.globalText} text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          ${data.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full sm:w-auto">
          ${
            data.primaryBtn?.text
              ? `<a href="${data.primaryBtn.link || '#'}" className="${c.buttonPrimary}">
            ${data.primaryBtn.text}
          </a>`
              : ''
          }
          ${
            data.secondaryBtn?.text
              ? `<a href="${data.secondaryBtn.link || '#'}" className="${c.buttonSecondary}">
            ${data.secondaryBtn.text}
          </a>`
              : ''
          }
        </div>
      </section>
`;
          break;

        case 'what-you-get':
          componentsJsx += `
      {/* What You Get Section */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="${c.headingText} text-3xl md:text-4xl font-extrabold mb-4">
            ${data.title}
          </h2>
          ${data.subtitle ? `<p className="${c.globalText} text-lg max-w-xl mx-auto">${data.subtitle}</p>` : ''}
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          ${data.items
            .map(
              (item: any) => `
          <div className="${c.card} p-6 flex items-start gap-4">
            <div className="flex-shrink-0 mt-1">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-black">
                ✓
              </div>
            </div>
            <div>
              <h3 className="${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-100'} font-bold text-lg mb-1">
                ${item.text}
              </h3>
              ${
                item.description
                  ? `<p className="${c.globalText} text-sm">
                ${item.description}
              </p>`
                  : ''
              }
            </div>
          </div>`
            )
            .join('')}
        </div>
      </section>
`;
          break;

        case 'why-choose-us':
          componentsJsx += `
      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="${c.headingText} text-3xl md:text-4xl font-extrabold mb-4">
            ${data.title}
          </h2>
          ${data.subtitle ? `<p className="${c.globalText} text-lg max-w-xl mx-auto">${data.subtitle}</p>` : ''}
        </div>

        ${
          data.comparisonType === 'table' || data.comparisonType === 'both'
            ? `<div className="overflow-x-auto mb-12">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="${c.tableHeader}">Feature</th>
                <th className="${c.tableHeader}">Our Solution</th>
                <th className="${c.tableHeader}">Competitors</th>
              </tr>
            </thead>
            <tbody>
              ${data.rows
                .map(
                  (row: any) => `
              <tr>
                <td className="${c.tableCell} font-semibold text-left">${row.feature}</td>
                <td className="${c.tableCell} text-center font-medium">
                  ${
                    typeof row.usValue === 'boolean'
                      ? row.usValue
                        ? '<span className="text-emerald-500 inline-block font-black text-xl">✓</span>'
                        : '<span className="text-rose-500 inline-block font-black text-xl">✗</span>'
                      : `<span className="${c.globalText}">${row.usValue}</span>`
                  }
                </td>
                <td className="${c.tableCell} text-center font-medium opacity-70">
                  ${
                    typeof row.themValue === 'boolean'
                      ? row.themValue
                        ? '<span className="text-emerald-500 inline-block font-black text-xl">✓</span>'
                        : '<span className="text-rose-500 inline-block font-black text-xl">✗</span>'
                      : `<span className="${c.globalText}">${row.themValue}</span>`
                  }
                </td>
              </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>`
            : ''
        }

        ${
          data.comparisonType === 'cards' || data.comparisonType === 'both'
            ? `<div className="grid md:grid-cols-3 gap-6">
          ${data.cards
            .map(
              (card: any) => `
          <div className="${c.card} p-6">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-400 mb-4">
              ${getIconString(card.icon)}
            </div>
            <h3 className="${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-100'} font-bold text-lg mb-2">
              ${card.title}
            </h3>
            <p className="${c.globalText} text-sm leading-relaxed">
              ${card.description}
            </p>
          </div>`
            )
            .join('')}
        </div>`
            : ''
        }
      </section>
`;
          break;

        case 'features':
          componentsJsx += `
      {/* Features Section */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="${c.headingText} text-3xl md:text-4xl font-extrabold mb-4">
            ${data.title}
          </h2>
          ${data.subtitle ? `<p className="${c.globalText} text-lg max-w-2xl mx-auto">${data.subtitle}</p>` : ''}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          ${data.items
            .map(
              (feat: any) => `
          <div className="${c.card} p-6 transition-all hover:-translate-y-1 duration-200">
            <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 mb-6 border border-emerald-500/20">
              ${getIconString(feat.icon)}
            </div>
            <h3 className="${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-100'} font-bold text-xl mb-3">
              ${feat.title}
            </h3>
            <p className="${c.globalText} text-sm leading-relaxed">
              ${feat.description}
            </p>
          </div>`
            )
            .join('')}
        </div>
      </section>
`;
          break;

        case 'pricing':
          componentsJsx += `
      {/* Pricing Section */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto" id="pricing">
        <div className="text-center mb-16">
          <h2 className="${c.headingText} text-3xl md:text-4xl font-extrabold mb-4">
            ${data.title}
          </h2>
          ${data.subtitle ? `<p className="${c.globalText} text-lg max-w-xl mx-auto">${data.subtitle}</p>` : ''}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          ${data.plans
            .map((plan: any) => {
              const popularClass = plan.isPopular
                ? theme === 'neubrutalism'
                  ? 'border-4 border-yellow-500 shadow-[6px_6px_0px_rgba(0,0,0,1)] ring-2 ring-black bg-white scale-105'
                  : 'border-2 border-indigo-500 scale-105 ring-4 ring-indigo-500/10'
                : '';
              return `
          <div className="${c.card} ${popularClass} p-8 flex flex-col justify-between relative">
            ${
              plan.isPopular
                ? `<span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-bold tracking-widest text-white bg-indigo-500 uppercase rounded-full">
              Popular
            </span>`
                : ''
            }
            <div>
              <h3 className="${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-100'} font-extrabold text-xl mb-2">
                ${plan.name}
              </h3>
              <p className="${c.globalText} text-sm mb-6">${plan.description}</p>
              
              <div className="flex items-baseline mb-6">
                <span className="${theme === 'neubrutalism' ? 'text-black' : 'text-white'} text-4xl font-black">
                  ${plan.price}
                </span>
                ${plan.period ? `<span className="${c.globalText} ml-2 text-sm">${plan.period}</span>` : ''}
              </div>

              <ul className="space-y-3 mb-8 text-left">
                ${plan.features
                  .map(
                    (f: string) => `
                <li className="flex items-start gap-2.5 text-sm">
                  <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                  <span className="${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-300'}">${f}</span>
                </li>`
                  )
                  .join('')}
              </ul>
            </div>

            <a href="${plan.buttonLink || '#'}" className="${c.buttonPrimary} w-full text-center">
              ${plan.buttonText}
            </a>
          </div>`;
            })
            .join('')}
        </div>
      </section>
`;
          break;

        case 'cta':
          componentsJsx += `
      {/* Call to Action Section */}
      <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-center">
        <div className="${c.card} p-8 md:p-12 relative overflow-hidden">
          <h2 className="${c.headingText} text-3xl md:text-5xl font-black mb-6">
            ${data.title}
          </h2>
          <p className="${c.globalText} text-lg md:text-xl max-w-xl mx-auto mb-8">
            ${data.subtitle}
          </p>
          <a href="${data.buttonLink || '#'}" className="${c.buttonPrimary}">
            ${data.buttonText}
          </a>
        </div>
      </section>
`;
          break;

        case 'testimonials':
          componentsJsx += `
      {/* Testimonials Section */}
      <section className="py-16 md:py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="${c.headingText} text-3xl md:text-4xl font-extrabold mb-4">
            ${data.title}
          </h2>
          ${data.subtitle ? `<p className="${c.globalText} text-lg max-w-xl mx-auto">${data.subtitle}</p>` : ''}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${data.items
            .map(
              (test: any) => `
          <div className="${c.card} p-6 flex flex-col justify-between text-left">
            <div>
              {/* Star Rating */}
              <div className="flex gap-1 mb-4 text-amber-400">
                ${Array.from({ length: 5 })
                  .map(
                    () => `
                <span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </span>`
                  )
                  .join('')}
              </div>
              <p className="${theme === 'neubrutalism' ? 'text-black' : 'text-zinc-200'} text-sm italic mb-6 leading-relaxed">
                "${test.feedback}"
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <img
                src="${test.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${test.name}`}"
                alt="${test.name}"
                className="w-10 h-10 rounded-full border border-zinc-700/50 object-cover"
              />
              <div>
                <h4 className="${theme === 'neubrutalism' ? 'text-black font-extrabold' : 'text-zinc-100 font-bold'} text-sm">
                  ${test.name}
                </h4>
                <p className="${c.globalText} text-xs">
                  ${test.role} ${test.company ? `@ ${test.company}` : ''}
                </p>
              </div>
            </div>
          </div>`
            )
            .join('')}
        </div>
      </section>
`;
          break;

        case 'faqs':
          componentsJsx += `
      {/* FAQs Section */}
      <section className="py-16 md:py-24 px-6 max-w-3xl mx-auto" id="faq">
        <div className="text-center mb-12">
          <h2 className="${c.headingText} text-3xl md:text-4xl font-extrabold mb-4">
            ${data.title}
          </h2>
          ${data.subtitle ? `<p className="${c.globalText} text-lg max-w-xl mx-auto">${data.subtitle}</p>` : ''}
        </div>

        <div className="space-y-4 text-left">
          ${data.items
            .map(
              (faq: any, idx: number) => `
          <div className="${c.faqItem}">
            <button
              className="w-full flex justify-between items-center text-left py-2 font-bold text-base focus:outline-none"
              onClick={() => setActiveFaq(activeFaq === ${idx} ? null : ${idx})}
            >
              <span className="${theme === 'neubrutalism' ? 'text-black font-black' : 'text-zinc-100'}">
                ${faq.question}
              </span>
              <span className="${
                theme === 'neubrutalism' ? 'text-black' : 'text-zinc-400'
              } font-bold transition-transform duration-200 \${activeFaq === ${idx} ? 'rotate-180' : ''}">
                ▼
              </span>
            </button>
            <div className={\`mt-3 pt-3 border-t \${theme === 'neubrutalism' ? 'border-black text-black' : 'border-zinc-800 text-zinc-400'} text-sm leading-relaxed \${activeFaq === ${idx} ? 'block' : 'hidden'}\`}>
              ${faq.answer}
            </div>
          </div>`
            )
            .join('')}
        </div>
      </section>
`;
          break;

        case 'about-me':
          componentsJsx += `
      {/* About Me Section */}
      <section className="py-16 md:py-24 px-6 max-w-4xl mx-auto">
        <div className="${c.card} p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-shrink-0">
            <img
              src="${data.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${data.name}`}"
              alt="${data.name}"
              className="w-32 h-32 md:w-40 md:h-40 object-cover ${
                theme === 'neubrutalism' ? 'border-4 border-black rounded-none shadow-neubrutalism-sm' : 'border-2 border-zinc-700 rounded-2xl'
              }"
            />
          </div>

          <div className="text-center md:text-left flex-grow">
            <span className="${c.badge}">${data.role || 'Founder'}</span>
            <h2 className="${c.headingText} text-3xl font-black mt-2 mb-4">
              ${data.title || `About ${data.name}`}
            </h2>
            <p className="${c.globalText} text-sm md:text-base leading-relaxed mb-6">
              ${data.bio}
            </p>

            <div className="flex justify-center md:justify-start gap-4">
              ${
                data.twitterUrl
                  ? `<a href="${data.twitterUrl}" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>`
                  : ''
              }
              ${
                data.githubUrl
                  ? `<a href="${data.githubUrl}" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>`
                  : ''
              }
              ${
                data.linkedinUrl
                  ? `<a href="${data.linkedinUrl}" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>`
                  : ''
              }
            </div>
          </div>
        </div>
      </section>
`;
          break;

        case 'footer':
          componentsJsx += `
      {/* Footer Section */}
      <footer className="py-12 px-6 border-t ${c.borderColor} mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="${theme === 'neubrutalism' ? 'text-black font-black' : 'text-zinc-100 font-bold'} text-lg">
              ${data.brandName}
            </h3>
            <p className="${c.globalText} text-xs mt-1 max-w-sm">
              ${data.description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            ${data.links
              .map(
                (link: any) => `
            <a href="${link.href || '#'}" className="${
                  theme === 'neubrutalism' ? 'text-black font-black hover:underline' : 'text-zinc-400 hover:text-zinc-200'
                } transition-all">
              ${link.label}
            </a>`
              )
              .join('')}
          </div>
        </div>

        <div className="max-w-5xl mx-auto text-center mt-8 pt-8 border-t border-zinc-800/40">
          <p className="${c.globalText} text-xs">
            ${data.copyrightText}
          </p>
        </div>
      </footer>
`;
          break;

        default:
          break;
      }
    });

    return `import React${hasFaq ? ', { useState }' : ''} from 'react';

/**
 * Clean Modular Landing Page Component
 * Framework: Next.js (React) + Tailwind CSS
 * Styling Preset: ${theme.toUpperCase()} (${palette.name})
 * 
 * Generated with LayoutExport
 * Simply copy this code and save it as 'page.tsx' or 'index.tsx' in your project.
 */
export default function StartupLandingPage() {
  ${hasFaq ? 'const [activeFaq, setActiveFaq] = useState<number | null>(null);' : ''}

  return (
    <div className="min-h-screen ${c.globalBg} ${c.globalText} font-sans antialiased flex flex-col selection:bg-indigo-500/30 selection:text-white">
      ${componentsJsx}
    </div>
  );
}
`;
  };

  const codeText = generateExportCode();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([codeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'StartupLandingPage.tsx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-zinc-950 border border-zinc-850 rounded-xl w-full max-w-4xl max-h-[85vh] flex flex-col shadow-2xl">
        
        {/* Modal Header */}
        <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/20">
          <div>
            <h3 className="text-base font-black text-white">Next.js + Tailwind CSS Code Export</h3>
            <p className="text-xs text-zinc-500">Fully self-contained component, ready to paste in Vercel/Netlify setups.</p>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white text-sm font-bold bg-zinc-900 hover:bg-zinc-850 p-1.5 rounded"
          >
            ✕ Close
          </button>
        </div>

        {/* Code Content Preview */}
        <div className="flex-grow overflow-auto p-4 bg-zinc-950">
          <pre className="text-xs font-mono text-zinc-300 p-4 bg-zinc-900/40 border border-zinc-900 rounded-lg overflow-x-auto leading-relaxed select-all whitespace-pre">
            {codeText}
          </pre>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={handleCopy}
            className={`px-5 py-2.5 font-bold text-xs rounded transition-all flex items-center justify-center gap-1.5 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-800 hover:bg-zinc-700 text-zinc-200'
            }`}
          >
            {copied ? 'Copied to Clipboard! ✓' : 'Copy Code'}
          </button>
          <button
            onClick={handleDownload}
            className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-white font-bold text-xs rounded shadow transition-all hover:scale-[1.01]"
          >
            Download StartupLandingPage.tsx
          </button>
        </div>

      </div>
    </div>
  );
};
