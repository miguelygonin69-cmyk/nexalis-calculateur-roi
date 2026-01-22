import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    companyName: '',
    employees: '',
    currentCost: '',
    industry: 'services'
  });
  const [results, setResults] = useState<any>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateROI = () => {
    const employees = parseInt(formData.employees) || 0;
    const currentCost = parseFloat(formData.currentCost) || 0;
    
    const gainsProductivite = employees * 5000;
    const reductionCouts = currentCost * 0.3;
    const gainsTotal = gainsProductivite + reductionCouts;
    const investissement = 15000;
    const roi = ((gainsTotal - investissement) / investissement) * 100;
    const payback = investissement / (gainsTotal / 12);
    const coutInaction = gainsTotal / 12;

    setResults({
      gainsProductivite,
      reductionCouts,
      gainsTotal,
      investissement,
      roi,
      payback,
      coutInaction
    });
  };

  const exportPDF = () => {
    const element = document.getElementById('results-section');
    if (!element) return;
    
    // @ts-ignore
    const opt = {
      margin: [15, 10, 15, 10],
      filename: `ROI_Nexalis_${formData.companyName || 'Entreprise'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Header */}
      <header className="bg-brand-dark shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-10 h-10 text-yellow-400" />
            <div>
              <h1 className="text-white font-bold uppercase tracking-tight text-2xl">
                NEXALIS SOLUTIONS
              </h1>
              <p className="text-gray-300 font-medium tracking-wider text-xs uppercase">
                Conseil en Stratégie Digitale & IA
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-brand-dark mb-3 tracking-tight">
            Calculateur de Retour sur Investissement
          </h2>
          <p className="text-gray-600 text-lg">
            Évaluez précisément l'impact financier d'une transformation IA
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-3">
                Nom de l'entreprise
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all shadow-sm"
                placeholder="Ex: Acme Corporation"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-3">
                Nombre d'employés
              </label>
              <input
                type="number"
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all shadow-sm"
                placeholder="Ex: 50"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-3">
                Budget IT annuel actuel (€)
              </label>
              <input
                type="number"
                name="currentCost"
                value={formData.currentCost}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all shadow-sm"
                placeholder="Ex: 80000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-3">
                Secteur d'activité
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all shadow-sm"
              >
                <option value="services">Services professionnels</option>
                <option value="commerce">Commerce & Distribution</option>
                <option value="industrie">Industrie & Manufacturing</option>
                <option value="tech">Technologies & Software</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateROI}
            className="mt-8 w-full bg-brand-accent hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Calculer le ROI
          </button>
        </div>

        {/* Résultats */}
        {results && (
          <div id="results-section" className="space-y-8">
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-10">
              <h3 className="text-2xl font-bold text-brand-dark mb-8 pb-4 border-b-2 border-brand-dark">
                Synthèse Financière — {formData.companyName || 'Votre Entreprise'}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-xl border-l-4 border-brand-accent shadow-md">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">ROI Première Année</p>
                  <p className="text-5xl font-bold text-brand-accent">{results.roi.toFixed(0)}%</p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl border-l-4 border-brand-dark shadow-md">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Retour sur Investissement</p>
                  <p className="text-5xl font-bold text-brand-dark">{results.payback.toFixed(1)} <span className="text-2xl">mois</span></p>
                </div>

                <div className="bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-xl border-l-4 border-red-500 shadow-md">
                  <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-2">Coût de l'Inaction / Mois</p>
                  <p className="text-4xl font-bold text-red-600">-{results.coutInaction.toLocaleString('fr-FR')} €</p>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-8 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Gains de productivité estimés</span>
                  <span className="text-xl font-bold text-brand-accent">+{results.gainsProductivite.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Réduction des coûts opérationnels</span>
                  <span className="text-xl font-bold text-brand-accent">+{results.reductionCouts.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-200">
                  <span className="text-gray-700 font-medium">Investissement initial</span>
                  <span className="text-xl font-bold text-gray-700">-{results.investissement.toLocaleString('fr-FR')} €</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-brand-dark text-white rounded-lg px-4 mt-4">
                  <span className="font-bold text-lg">Bénéfice Net (An 1)</span>
                  <span className="text-2xl font-bold">+{(results.gainsTotal - results.investissement).toLocaleString('fr-FR')} €</span>
                </div>
              </div>

              <button
                onClick={exportPDF}
                className="mt-8 w-full bg-brand-dark hover:bg-blue-900 text-white font-bold py-4 px-12 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                📄 Télécharger le Rapport PDF
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-400" />
            <p className="font-bold uppercase tracking-tight">Nexalis Solutions</p>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Nexalis Solutions. Conseil en Transformation Digitale & Intelligence Artificielle.
          </p>
        </div>
      </footer>
    </div>
  );
}