import React from 'react';
import { Sparkles, Trash2 } from 'lucide-react';
import { GigExtra } from '../../types';

interface CreateGigViewProps {
  newGigTitle: string;
  setNewGigTitle: (val: string) => void;
  newGigCat: string;
  setNewGigCat: (val: string) => void;
  newGigDesc: string;
  setNewGigDesc: (val: string) => void;
  newGigPrice: number;
  setNewGigPrice: (val: number) => void;
  newGigDays: number;
  setNewGigDays: (val: number) => void;
  isOptimizingGig: boolean;
  handleOptimizeGigWithAI: () => void;
  newGigExtras: GigExtra[];
  extraTitleInput: string;
  setExtraTitleInput: (val: string) => void;
  extraPriceInput: number;
  setExtraPriceInput: (val: number) => void;
  handleAddGigExtra: () => void;
  handleRemoveGigExtra: (id: string) => void;
  handlePublishGig: (e: React.FormEvent) => void;
}

export const CreateGigView: React.FC<CreateGigViewProps> = ({
  newGigTitle,
  setNewGigTitle,
  newGigCat,
  setNewGigCat,
  newGigDesc,
  setNewGigDesc,
  newGigPrice,
  setNewGigPrice,
  newGigDays,
  setNewGigDays,
  isOptimizingGig,
  handleOptimizeGigWithAI,
  newGigExtras,
  extraTitleInput,
  setExtraTitleInput,
  extraPriceInput,
  setExtraPriceInput,
  handleAddGigExtra,
  handleRemoveGigExtra,
  handlePublishGig
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-fiverr-dark">Create a New Service Gig</h1>
        <p className="text-sm text-fiverr-muted">Publish your freelance service and leverage automated tools to optimize conversion.</p>
      </div>

      <form onSubmit={handlePublishGig} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-fiverr-dark uppercase tracking-wider mb-2">Gig Title</label>
          <input 
            type="text" 
            placeholder="I will build a high-performance web app..."
            value={newGigTitle}
            onChange={(e) => setNewGigTitle(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-fiverr-dark uppercase tracking-wider mb-2">Category</label>
          <select 
            value={newGigCat}
            onChange={(e) => setNewGigCat(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none bg-white"
          >
            <option value="Development & IT">Development & IT</option>
            <option value="AI & Data">AI & Data</option>
            <option value="Design & Creative">Design & Creative</option>
            <option value="Mobile Apps">Mobile Apps</option>
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold text-fiverr-dark uppercase tracking-wider">Description</label>
            <button 
              type="button"
              onClick={handleOptimizeGigWithAI}
              disabled={isOptimizingGig}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-semibold hover:bg-emerald-100 transition-colors border border-emerald-200"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isOptimizingGig ? 'Optimizing with Gemini...' : 'Optimize with Gemini AI'}</span>
            </button>
          </div>
          <textarea 
            rows={5}
            placeholder="Describe your service offering, deliverables, and tech stack..."
            value={newGigDesc}
            onChange={(e) => setNewGigDesc(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-fiverr-dark uppercase tracking-wider mb-2">Base Price ($)</label>
            <input 
              type="number" 
              value={newGigPrice}
              onChange={(e) => setNewGigPrice(Number(e.target.value))}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-fiverr-dark uppercase tracking-wider mb-2">Delivery Time (Days)</label>
            <input 
              type="number" 
              value={newGigDays}
              onChange={(e) => setNewGigDays(Number(e.target.value))}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-slate-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Optional Gig Extras Section */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <div>
            <label className="block text-xs font-bold text-fiverr-dark uppercase tracking-wider mb-1">
              Configure Optional Gig Extras (Add-ons)
            </label>
            <p className="text-xs text-fiverr-muted">Allow buyers to add extra fast delivery, source files, or commercial licenses to their order.</p>
          </div>

          {/* Existing configured extras */}
          {newGigExtras.length > 0 && (
            <div className="space-y-2">
              {newGigExtras.map(ext => (
                <div key={ext.id} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                  <span className="font-semibold text-slate-800">{ext.title}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-fiverr-dark">+${ext.price}</span>
                    <button 
                      type="button"
                      onClick={() => handleRemoveGigExtra(ext.id)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add new extra input row */}
          <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
            <input 
              type="text" 
              placeholder="Extra title (e.g. Fast 24h Express Delivery)..." 
              value={extraTitleInput}
              onChange={(e) => setExtraTitleInput(e.target.value)}
              className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none"
            />
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-fiverr-muted">$</span>
              <input 
                type="number" 
                placeholder="50" 
                value={extraPriceInput}
                onChange={(e) => setExtraPriceInput(Number(e.target.value))}
                className="w-20 px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none"
              />
              <button 
                type="button"
                onClick={handleAddGigExtra}
                className="px-3 py-2 bg-slate-900 text-white font-bold rounded-lg text-xs hover:bg-slate-800 whitespace-nowrap cursor-pointer"
              >
                + Add Extra
              </button>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full py-3.5 bg-slate-900 text-white font-semibold rounded-xl hover:bg-slate-800 transition-colors text-sm shadow-md cursor-pointer">
          Publish Gig to Marketplace
        </button>
      </form>
    </div>
  );
};
