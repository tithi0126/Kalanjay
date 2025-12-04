export default function ReviewCard({ review }) {
  if (!review) return null;

  const { customerName, rating, text } = review;

  return (
    <div className="bg-white rounded-2xl border border-pink-50 p-4 md:p-5 flex gap-3">
      <div className="h-10 w-10 rounded-full bg-brand-light flex items-center justify-center text-xs font-semibold text-gray-700">
        {customerName?.[0]}
      </div>
      <div>
        <div className="flex items-center justify-between mb-1">
          <div className="text-xs font-semibold text-gray-900">{customerName}</div>
          <div className="text-[10px] text-amber-500">
            {"★".repeat(rating || 5)}
          </div>
        </div>
        <p className="text-xs text-gray-600">{text}</p>
      </div>
    </div>
  );
}
