import WhatsAppButton from "./WhatsAppButton.jsx";

export default function ProductCard({ product, onView }) {
  const hasImage = !!product.images?.[0];

  return (
    <div className="group relative bg-white/80 backdrop-blur-sm rounded-3xl border border-theme-salmon/20 shadow-[0_18px_40px_rgba(255,85,85,0.12)] hover:shadow-[0_22px_50px_rgba(255,85,85,0.22)] transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1 animate-fade-in">
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-theme-salmon/20 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 rounded-full bg-theme-lightGreen/25 blur-3xl" />
      </div>

      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-theme-lightGreen/30 via-theme-salmon/20 to-white" />
        {hasImage ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="relative z-[1] w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="relative z-[1] w-full h-full flex flex-col items-center justify-center text-xs text-neutral-500">
            <span className="text-3xl mb-1">🎁</span>
            <span>Image coming soon</span>
          </div>
        )}
        {product.isTopPick && (
          <div className="absolute top-3 left-3 z-[2] px-2.5 py-1 rounded-full bg-white/90 text-[10px] font-semibold text-theme-red shadow-md flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-theme-red animate-pulse" />
            Top pick
          </div>
        )}
      </div>

      <div className="relative z-[1] p-3.5 md:p-4 flex-1 flex flex-col">
        <h3 className="text-sm md:text-base font-semibold text-neutral-900 line-clamp-2">
          {product.name}
        </h3>
        {product.shortDescription && (
          <p className="mt-1 text-[11px] md:text-xs text-neutral-600 line-clamp-2">
            {product.shortDescription}
          </p>
        )}
        {product.priceFrom && (
          <p className="mt-2 text-xs font-semibold text-theme-red">
            From ₹{product.priceFrom}
            {product.priceTo ? ` - ₹${product.priceTo}` : ""}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between gap-2">
<button
  type="button"
  onClick={onView}
  className="group w-full flex items-center justify-center gap-2 
    bg-gradient-to-r from-theme-red to-theme-salmon 
    hover:from-theme-salmon hover:to-theme-red 
    text-white shadow-lg shadow-theme-red/30 hover:shadow-theme-salmon/40 
    transition-all duration-300 py-3 rounded-xl text-sm font-semibold"
>
  <span className="text-neutral-700 group-hover:text-black">
    View details
  </span>

  <span
    className="text-neutral-700 group-hover:text-black inline-block transform transition-transform duration-200 group-hover:translate-x-1"
  >
    ↗
  </span>
</button>



          {/* <WhatsAppButton
            text={`Hi Kalanjay, I'm interested in ${product.name}.`}
            className="bg-theme-green hover:bg-theme-lightGreen text-neutral-900 shadow-theme-lightGreen/40"
          /> */}
        </div>
      </div>
    </div>
  );
}

