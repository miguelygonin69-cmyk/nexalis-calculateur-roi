import React, { useState } from 'react';
import { CalculationResult, ChartDataPoint, CalculatorInputs } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Clock, TrendingUp, Wallet, Sparkles, Copy, Check, Download, Loader2, AlertTriangle, Target, Calendar } from 'lucide-react';

interface Props {
  results: CalculationResult;
  chartData: ChartDataPoint[];
  aiInsight: string | null;
  isAiLoading: boolean;
  inputs: CalculatorInputs;
}

const ResultsDisplay: React.FC<Props> = ({ results, chartData, aiInsight, isAiLoading, inputs }) => {
  const [copied, setCopied] = useState(false);

  // Perte mensuelle (Coût de l'inaction)
  const monthlyLoss = Math.round(results.currentCost / 12);

  const formatCurrency = (val: number) => 
    new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  const formatNumber = (val: number) => 
    new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 }).format(val);

  // Fonction utilitaire pour rendre le Markdown simple (Gras **texte** et sauts de ligne)
  const renderStructuredAnalysis = (text: string) => {
    if (!text) return null;
    return text.split('\n').map((line, i) => {
      if (line.trim() === '') return <div key={i} className="h-2" />;
      
      const parts = line.split('**');
      return (
        <div key={i} className={`mb-1 ${line.trim().startsWith('-') ? 'pl-4 relative' : ''}`}>
           {line.trim().startsWith('-') && <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-brand-accent rounded-full opacity-70"></span>}
           {parts.map((part, j) => 
             j % 2 === 1 ? <strong key={j} className="text-brand-accent font-bold">{part}</strong> : <span key={j}>{part.replace(/^- /, '')}</span>
           )}
        </div>
      );
    });
  };

  const handleDownloadPDF = () => {
    // Préparer l'affichage pour l'impression
    const toolbar = document.getElementById('action-toolbar');
    const cta = document.getElementById('cta-section');
    const header = document.getElementById('report-header');
    
    // Cacher les éléments non-nécessaires
    if (toolbar) toolbar.style.display = 'none';
    if (cta) cta.style.display = 'none';
    
    // Afficher le header PDF
    if (header) {
      header.classList.remove('hidden');
      header.style.display = 'block';
    }
    
    // Lancer l'impression (l'utilisateur peut choisir "Enregistrer en PDF")
    setTimeout(() => {
      window.print();
      
      // Remettre l'affichage normal après impression
      setTimeout(() => {
        if (toolbar) toolbar.style.display = 'flex';
        if (cta) cta.style.display = 'block';
        if (header) {
          header.classList.add('hidden');
          header.style.display = 'none';
        }
      }, 500);
    }, 100);
  };

  const handleCopy = () => {
    const text = `Rapport ROI Nexalis Solutions\nSecteur: ${inputs.industry}\nGain annuel estimé: ${formatCurrency(results.annualSavings)}\nAnalyse: ${aiInsight}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="results-container" className="space-y-6 animate-fade-in bg-white md:bg-transparent relative">
      
      {/* Actions */}
      <div id="action-toolbar" className="flex justify-end gap-3 print:hidden mb-2">
        <button onClick={handleCopy} className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
          {copied ? <Check size={16} className="text-green-600" /> : <Copy size={16} />}
          {copied ? 'Copié' : 'Copier'}
        </button>
        <button onClick={handleDownloadPDF} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-brand-dark rounded-lg hover:bg-slate-800 transition-colors shadow-sm">
          <Download size={16} />
          Exporter PDF
        </button>
      </div>

      {/* Header PDF Only */}
      <div id="report-header" className="hidden mb-8 border-b-2 border-brand-dark pb-4">
        <div className="flex justify-between items-center">
             <div className="flex items-center gap-3">
                 <Sparkles className="h-6 w-6 text-yellow-400 fill-yellow-400" />
                 <h1 className="text-2xl font-bold text-brand-dark uppercase">Nexalis Solutions</h1>
             </div>
            <span className="text-sm text-gray-500 font-medium">Rapport d'opportunité IA</span>
        </div>
        <div className="mt-4 text-sm text-gray-600">
            Audit généré le {new Date().toLocaleDateString('fr-FR')} pour une entreprise du secteur <b>{inputs.industry}</b> ({inputs.employees} employés).
        </div>
      </div>

      {/* Warning: Cost of Inaction */}
      <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-start gap-4 shadow-sm">
        <div className="bg-orange-100 p-2 rounded-lg shrink-0">
             <AlertTriangle className="text-orange-600 h-6 w-6" />
        </div>
        <div>
            <h4 className="font-bold text-orange-900 text-sm uppercase tracking-wide mb-1">Coût de l'inaction</h4>
            <p className="text-orange-800 text-sm leading-relaxed">
                Sans modernisation, vos processus actuels vous coûtent environ <span className="font-bold underline decoration-orange-300 decoration-2">{formatCurrency(monthlyLoss)} chaque mois</span>.
            </p>
        </div>
      </div>

      {/* Main Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-5 rounded-2xl shadow-soft border border-gray-100 flex flex-col justify-between h-full">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Productivité</p>
                    <p className="text-2xl font-extrabold text-brand-dark mt-1">{formatNumber(results.totalHoursSaved)} h</p>
                </div>
                <div className="bg-blue-50 p-2 rounded-lg">
                    <Clock className="h-5 w-5 text-brand-dark" />
                </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                <div className="bg-brand-dark h-1.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Heures économisées / an</p>
        </div>

        {/* Card 2 */}
        <div className="bg-white p-5 rounded-2xl shadow-soft border border-gray-100 ring-2 ring-brand-accent/10 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-brand-accent/10 rounded-bl-full -mr-4 -mt-4"></div>
            <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                    <p className="text-xs font-bold text-brand-accent uppercase tracking-wider">Économies Annuelles</p>
                    <p className="text-2xl font-extrabold text-brand-accent mt-1">{formatCurrency(results.annualSavings)}</p>
                </div>
                <div className="bg-green-50 p-2 rounded-lg">
                    <Wallet className="h-5 w-5 text-brand-accent" />
                </div>
            </div>
             <p className="text-xs text-green-700/80 mt-auto bg-green-50 inline-block px-2 py-1 rounded font-medium self-start">
                + Impact marge immédiat
            </p>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-5 rounded-2xl shadow-soft border border-gray-100 flex flex-col justify-between h-full">
             <div className="flex items-start justify-between mb-4">
                <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">ROI 3 Ans</p>
                    <p className="text-2xl font-extrabold text-brand-dark mt-1">{formatCurrency(results.threeYearRoi)}</p>
                </div>
                <div className="bg-indigo-50 p-2 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-indigo-600" />
                </div>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2">
                <div className="bg-indigo-600 h-1.5 rounded-full" style={{ widt