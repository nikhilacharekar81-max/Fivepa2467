import React, { useState, useMemo } from 'react';
import { Star, ShieldCheck, CheckCircle2, Filter, ThumbsUp, Calendar, ArrowUpDown, MessageSquare } from 'lucide-react';

export interface UserReview {
  id: string;
  orderId?: string;
  reviewerId?: string;
  reviewerName: string;
  reviewerAvatar?: string;
  reviewerCountry?: string;
  reviewerCountryFlag?: string;
  targetUserId: string;
  rating: number;
  comment: string;
  orderTitle?: string;
  createdAt: string;
}

interface UserReviewsModuleProps {
  reviews: UserReview[];
  targetUserName?: string;
  targetUserId?: string;
  className?: string;
}

export const UserReviewsModule: React.FC<UserReviewsModuleProps> = ({
  reviews,
  targetUserName = 'Freelancer',
  className = ''
}) => {
  const [ratingFilter, setRatingFilter] = useState<'all' | number>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  // Compute live rating statistics
  const totalCount = reviews.length;
  const averageRating = useMemo(() => {
    if (totalCount === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    return Number((sum / totalCount).toFixed(1));
  }, [reviews, totalCount]);

  const ratingDistribution = useMemo(() => {
    const dist: Record<number, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    for (const r of reviews) {
      const rounded = Math.min(5, Math.max(1, Math.round(r.rating)));
      dist[rounded] = (dist[rounded] || 0) + 1;
    }
    return dist;
  }, [reviews]);

  // Filter & sort
  const filteredReviews = useMemo(() => {
    let result = [...reviews];
    if (ratingFilter !== 'all') {
      result = result.filter(r => Math.round(r.rating) === ratingFilter);
    }
    result.sort((a, b) => {
      if (sortBy === 'highest') return b.rating - a.rating;
      if (sortBy === 'lowest') return a.rating - b.rating;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return result;
  }, [reviews, ratingFilter, sortBy]);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const paginatedReviews = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReviews.slice(start, start + itemsPerPage);
  }, [filteredReviews, currentPage]);

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5 text-amber-400">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rating)
                ? 'fill-amber-400 text-amber-400'
                : 'fill-slate-100 text-slate-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SECTION HEADER & SUMMARY */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-fiverr-dark tracking-tight">
                Verified Client Feedback & Ratings
              </h3>
              <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase rounded-full border border-emerald-200 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>100% Escrow Verified</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Feedback submitted directly upon milestone approval and escrow release.
            </p>
          </div>

          {/* OVERALL SCORE BADGE */}
          {totalCount > 0 && (
            <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl px-5 py-3">
              <div className="text-3xl font-extrabold text-fiverr-dark tracking-tight">
                {averageRating.toFixed(1)}
              </div>
              <div>
                {renderStars(averageRating)}
                <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                  Based on {totalCount} {totalCount === 1 ? 'client review' : 'client reviews'}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* RATING BREAKDOWN DISTRIBUTION */}
        {totalCount > 0 ? (
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((star) => {
                const count = ratingDistribution[star] || 0;
                const percentage = totalCount > 0 ? Math.round((count / totalCount) * 100) : 0;
                return (
                  <button
                    key={star}
                    onClick={() => {
                      setRatingFilter(ratingFilter === star ? 'all' : star);
                      setCurrentPage(1);
                    }}
                    className={`w-full flex items-center gap-3 text-xs group cursor-pointer p-1 rounded-lg transition-colors ${
                      ratingFilter === star ? 'bg-amber-50/70' : 'hover:bg-slate-50'
                    }`}
                  >
                    <span className="w-12 text-slate-600 font-bold flex items-center gap-1">
                      {star} <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </span>
                    <div className="flex-1 h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-slate-400 font-mono text-[11px]">
                      {count} ({percentage}%)
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-fiverr-dark">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Authentic Review Guarantee</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Every review shown here is tied directly to a funded Escrow transaction. Reviews cannot be submitted without an actual completed order and full escrow release.
              </p>
            </div>
          </div>
        ) : (
          <div className="pt-6 text-center py-8 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Star className="w-6 h-6 stroke-slate-300" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-fiverr-dark">No Client Reviews Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
                {targetUserName} has not received any client feedback yet. When orders are completed in a workstream, verified ratings and feedback will appear here.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* FILTER & SORT TOOLBAR */}
      {totalCount > 0 && (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-2xl p-3 shadow-xs">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1 pl-2">
              <Filter className="w-3.5 h-3.5" />
              <span>Filter:</span>
            </span>
            {(['all', 5, 4, 3] as const).map((star) => (
              <button
                key={star}
                onClick={() => {
                  setRatingFilter(star as any);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  ratingFilter === star
                    ? 'bg-slate-900 text-white font-bold'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {star === 'all' ? 'All Reviews' : `${star} Stars`}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 justify-end">
            <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1 text-xs text-fiverr-dark focus:outline-none font-medium cursor-pointer"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
        </div>
      )}

      {/* REVIEWS LIST */}
      {paginatedReviews.length > 0 && (
        <div className="space-y-3">
          {paginatedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 transition hover:border-slate-300"
            >
              {/* REVIEWER HEADER */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      rev.reviewerAvatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(rev.reviewerName)}&background=0f172a&color=fff`
                    }
                    alt={rev.reviewerName}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-100"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-fiverr-dark">{rev.reviewerName}</span>
                      {rev.reviewerCountryFlag && <span>{rev.reviewerCountryFlag}</span>}
                      <span className="px-1.5 py-0.2 bg-emerald-50 text-emerald-700 text-[10px] font-bold rounded flex items-center gap-0.5 border border-emerald-200">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>Verified Buyer</span>
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>{rev.createdAt}</span>
                      {rev.reviewerCountry && (
                        <>
                          <span>•</span>
                          <span>{rev.reviewerCountry}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-xl border border-slate-200/60">
                  {renderStars(rev.rating)}
                  <span className="text-xs font-bold text-fiverr-dark font-mono ml-0.5">
                    {rev.rating}.0
                  </span>
                </div>
              </div>

              {/* COMMENT TEXT */}
              <p className="text-xs text-slate-700 leading-relaxed italic bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                "{rev.comment}"
              </p>

              {/* ASSOCIATED ORDER BADGE */}
              {rev.orderTitle && (
                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-100">
                  <div className="flex items-center gap-1.5 truncate max-w-md">
                    <MessageSquare className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="font-medium text-slate-600 truncate">{rev.orderTitle}</span>
                  </div>
                  {rev.orderId && (
                    <span className="font-mono text-[10px] text-slate-400 shrink-0">
                      Order #{rev.orderId}
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
            <button
              key={pg}
              onClick={() => setCurrentPage(pg)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition cursor-pointer ${
                currentPage === pg
                  ? 'bg-slate-900 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {pg}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
