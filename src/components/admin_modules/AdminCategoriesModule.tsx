import React from 'react';
import { Grid } from 'lucide-react';

export const AdminCategoriesModule: React.FC = () => {
  const categories = [
    { id: '1', name: 'Web Development', slug: 'web-development', count: 1240 },
    { id: '2', name: 'UI/UX Design', slug: 'ui-ux-design', count: 850 },
    { id: '3', name: 'Mobile Apps', slug: 'mobile-apps', count: 620 },
    { id: '4', name: 'AI & Machine Learning', slug: 'ai-machine-learning', count: 410 },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900">Categories, Subcategories & Slugs</h3>
          <p className="text-sm text-slate-600">Configure marketplace taxonomy and SEO slugs.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer">
          Add Category
        </button>
      </div>

      <div className="space-y-3">
        {categories.map((c) => (
          <div key={c.id} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-slate-900">{c.name}</h4>
              <p className="text-xs text-slate-500 mt-0.5">Slug: /{c.slug} • {c.count} gigs</p>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold">Active</span>
          </div>
        ))}
      </div>
    </div>
  );
};
