import React, { useState } from 'react';
import { Sparkles, TrendingUp, Clock, DollarSign, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FormData {
  employees: string;
  hourlySalary: string;
  weeklyHours: string;
  industry: string;
}

interface Results {
  hoursPerYear: number;
  annualSavings: number;
  roi3Years: number;
  currentCost: number;
  costWithAI: number;
  savings: number;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    employees: '',
    hourlySalary: '',
    weeklyHours: '',
    industry: 'ecommerce'
  });

  const [results, setResults] = useState<Results | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateROI = () => {
    const employees = parseInt(formData.employees) || 0;
    const hourlySalary = parseFloat(formData.hourlySalary) || 0;
    const weeklyHours = parseFloat(formData.weeklyHours) || 0;

    // Calculs
    const hoursPerYear = employees * weeklyHours * 52;
    const annualSavings = hoursPerYear * hourlySalary;
    const aiInvestment = 15000; // Coût moyen d'implémentation IA
    const costWithAI = aiInvestment + (annualSavings * 0.3); // 30% du coût reste
    const savings = annualSavings - costWithAI;
    const roi3Years = ((savings * 3 - aiInvestment) / aiInvestment) * 100;

    setResults({
      hoursPerYear,
      annualSavings,
      roi3Years,
      currentCost: annualSavings,
      costWithAI,
      savings
    });
  };

  const chartData = results ? [
    {
      name: 'Coût actuel',
      montant: results.currentCost,
      fill: '#1a365d'
    },
    {
      name: 'Coût avec IA',
      montant: results.costWithAI,
      fill: '#1e40af'
    },
    {
      name: 'Économies',
      montant: results.savings,
      fill: '#38a169'
    }
  ] : [];

  return (
    <div className="min-h-screen bg-brand-light">
      {/* Header */}
      <header className="bg-brand-dark shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-10 h-10 text-yellow-400 fill-yellow-400" />
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
        {/* Titre */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-brand-dark mb-4 tracking-tight">
            Calculateur de ROI IA
          </h2>
          <p className="text-gray-600 text-lg">
            Découvrez combien votre entreprise peut économiser grâce à l'Intelligence Artificielle
          </p>
        </div>

        {/* Formulaire */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10 mb-12">
          <h3 className="text-2xl font-bold text-brand-dark mb-8">
            Informations sur votre entreprise
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-3">
                <Clock className="inline w-4 h-4 mr-2" />
                Nombre d'employés
              </label>
              <input
                type="number"
                name="employees"
                value={formData.employees}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all shadow-sm"
                placeholder="Ex: 50"
                min="1"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-3">
                <DollarSign className="inline w-4 h-4 mr-2" />
                Salaire horaire moyen (€)
              </label>
              <input
                type="number"
                name="hourlySalary"
                value={formData.hourlySalary}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all shadow-sm"
                placeholder="Ex: 35"
                min="0"
                step="0.5"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-3">
                <TrendingUp className="inline w-4 h-4 mr-2" />
                Heures hebdomadaires sur tâches répétitives (par employé)
              </label>
              <input
                type="number"
                name="weeklyHours"
                value={formData.weeklyHours}
                onChange={handleInputChange}
                className="w-full px-5 py-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-accent focus:border-transparent transition-all shadow-sm"
                placeholder="Ex: 10"
                min="0"
                step="0.5"
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
                <option value="ecommerce">E-commerce</option>
                <option value="services">Services</option>
                <option value="industrie">Industrie</option>
                <option value="sante">Santé</option>
                <option value="finance">Finance</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>

          <button
            onClick={calculateROI}
            className="mt-10 w-full bg-brand-accent hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            <TrendingUp className="w-5 h-5" />
            Calculer mon ROI
          </button>
        </div>

        {/* Résultats */}
        {results && (
          <div className="space-y-8">
            {/* Métriques principales */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border-l-4 border-brand-dark shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-brand-dark" />
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Heures économisées / an
                  </h4>
                </div>
                <p className="text-5xl font-bold text-brand-dark">
                  {results.hoursPerYear.toLocaleString('fr-FR')}
                </p>
                <p className="text-sm text-gray-600 mt-2">heures</p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl border-l-4 border-brand-accent shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <DollarSign className="w-6 h-6 text-brand-accent" />
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    Économies annuelles
                  </h4>
                </div>
                <p className="text-5xl font-bold text-brand-accent">
                  {results.savings.toLocaleString('fr-FR')}
                </p>
                <p className="text-sm text-gray-600 mt-2">euros</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-8 rounded-2xl border-l-4 border-yellow-400 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="w-6 h-6 text-yellow-600" />
                  <h4 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                    ROI sur 3 ans
                  </h4>
                </div>
                <p className="text-5xl font-bold text-yellow-600">
                  {results.roi3Years.toFixed(0)}%
                </p>
                <p className="text-sm text-gray-600 mt-2">retour sur investissement</p>
              </div>
            </div>

            {/* Graphique */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
              <h3 className="text-2xl font-bold text-brand-dark mb-8">
                Comparaison des coûts
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: number) => `${value.toLocaleString('fr-FR')} €`}
                  />
                  <Legend />
                  <Bar dataKey="montant" name="Montant (€)" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* CTA Calendly */}
            <div className="bg-gradient-to-r from-brand-dark to-brand-primary rounded-2xl shadow-2xl p-12 text-center text-white">
              <Sparkles className="w-16 h-16 mx-auto mb-6 text-yellow-400 fill-yellow-400" />
              <h3 className="text-3xl font-bold mb-4">
                Prêt à transformer votre entreprise ?
              </h3>
              <p className="text-xl mb-8 text-gray-200">
                Discutons de votre projet lors d'un appel découverte gratuit de 30 minutes
              </p>
              <a
                href="https://calendly.com/votre-lien-calendly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-brand-accent hover:bg-green-600 text-white font-bold py-4 px-10 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                <Calendar className="w-5 h-5" />
                Réserver un appel découverte
              </a>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles className="w-6 h-6 text-yellow-400 fill-yellow-400" />
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