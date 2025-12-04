// import WhatsAppButton from "./WhatsAppButton.jsx";

// export default function ProductModal({ product, onClose }) {
//   if (!product) return null;

//   return (
//     <div className="fixed inset-0 z-40 flex items-center justify-center px-3">
//       {/* <div className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm animate-fade-in" /> */}
//       <div className="absolute inset-0 bg-white/40 animate-fade-in" />
//       <div className="relative bg-gradient-to-br from-white via-theme-lightGreen/5 to-theme-salmon/5 max-w-3xl w-full rounded-3xl overflow-hidden shadow-[0_28px_80px_rgba(15,23,42,0.65)] animate-scale-in">
//         <div className="absolute -top-20 -right-10 w-44 h-44 rounded-full bg-theme-salmon/25 blur-3xl" />
//         <div className="absolute -bottom-24 -left-16 w-52 h-52 rounded-full bg-theme-lightGreen/30 blur-3xl" />

//         <div className="relative flex flex-col md:flex-row">
//           <div className="md:w-1/2 bg-gradient-to-br from-theme-lightGreen/40 via-white to-theme-salmon/30">
//             <div className="aspect-square overflow-hidden">
//               {product.images?.[0] ? (
//                 <img
//                   src={product.images[0]}
//                   alt={product.name}
//                   className="w-full h-full object-cover transform scale-100 md:group-hover:scale-105 transition-transform duration-700"
//                 />
//               ) : (
//                 <div className="w-full h-full flex flex-col items-center justify-center text-sm text-neutral-600">
//                   <span className="text-4xl mb-2">🎁</span>
//                   <span>Preview coming soon</span>
//                 </div>
//               )}
//             </div>
//           </div>
//           <div className="md:w-1/2 p-4 md:p-6 flex flex-col bg-white">
//             <div className="flex justify-between items-start gap-3">
//               <div>
//                 <h2 className="text-lg md:text-xl font-semibold text-neutral-900">
//                   {product.name}
//                 </h2>
//                 {product.category?.name && (
//                   <p className="text-xs text-neutral-500 mt-1">
//                     {product.category.name}
//                   </p>
//                 )}
//               </div>
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/80 text-neutral-500 hover:text-neutral-900 hover:bg-white shadow-sm transition-colors text-xs"
//               >
//                 ✕
//               </button>
//             </div>
//             {product.description && (
//               <p className="mt-3 text-xs md:text-sm text-neutral-700 whitespace-pre-line">
//                 {product.description}
//               </p>
//             )}

//             {product.customizationDetails && (
//               <div className="mt-3">
//                 <div className="text-[11px] font-semibold text-neutral-900 uppercase tracking-wide">
//                   Customization
//                 </div>
//                 <p className="text-xs text-neutral-700 mt-1 whitespace-pre-line">
//                   {product.customizationDetails}
//                 </p>
//               </div>
//             )}

//             {product.options?.length > 0 && (
//               <div className="mt-3 space-y-1.5">
//                 {product.options.map((opt) => (
//                   <div key={opt.label} className="text-[11px] text-neutral-700">
//                     <span className="font-semibold">{opt.label}: </span>
//                     <span>{opt.values.join(", ")}</span>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {product.deliveryTime && (
//               <p className="mt-2 text-[11px] text-neutral-500">
//                 Expected delivery: {product.deliveryTime}
//               </p>
//             )}

//             <div className="mt-4 flex items-center justify-between gap-3">
//               {product.priceFrom && (
//                 <div className="text-sm font-semibold text-neutral-900">
//                   Price from ₹{product.priceFrom}
//                   {product.priceTo ? ` - ₹${product.priceTo}` : ""}
//                 </div>
//               )}
//               <WhatsAppButton
//                 text={`Hi Kalanjay, I'm interested in ${product.name}. Here are my requirements:`}
//                 className="bg-theme-red hover:bg-theme-salmon text-white shadow-theme-red/50"
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import WhatsAppButton from "./WhatsAppButton.jsx";

export default function ProductModal({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
      {/* Backdrop with enhanced blur */}
      <div 
        className="absolute inset-0 bg-white/30 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />
      
      {/* Main modal container */}
      <div className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-[0_28px_100px_rgba(15,23,42,0.3)] animate-scale-in">
        {/* Decorative background elements */}
        <div className="absolute -top-20 -right-10 w-64 h-64 rounded-full bg-theme-salmon/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-16 w-72 h-72 rounded-full bg-theme-lightGreen/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-white/50 blur-3xl" />

        <div className="relative flex flex-col md:flex-row bg-gradient-to-br from-white via-theme-lightGreen/5 to-theme-salmon/5">
          {/* Image Section */}
          <div className="md:w-1/2 bg-gradient-to-br from-theme-lightGreen/20 via-white/50 to-theme-salmon/10 p-4 md:p-6">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/30 shadow-lg">
              {product.images?.[0] ? (
                <div className="relative w-full h-full overflow-hidden rounded-xl">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  {/* Image overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent" />
                </div>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center rounded-xl bg-gradient-to-br from-white to-theme-lightGreen/10 border-2 border-dashed border-theme-lightGreen/30">
                  <span className="text-5xl mb-3">🎁</span>
                  <span className="text-sm font-medium text-neutral-600">Preview coming soon</span>
                  <span className="text-xs text-neutral-500 mt-1">Beautiful design awaits</span>
                </div>
              )}
            </div>
            
            {/* Decorative corner elements */}
            <div className="absolute top-3 left-3 w-3 h-3 rounded-full bg-theme-salmon/30" />
            <div className="absolute bottom-3 right-3 w-3 h-3 rounded-full bg-theme-lightGreen/30" />
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-5 md:p-7 flex flex-col bg-white/95 backdrop-blur-sm">
            {/* Header with close button */}
            <div className="flex items-start justify-between mb-4">
              <div className="pr-2">
                <div className="inline-flex items-center px-2 py-1 rounded-full bg-theme-lightGreen/10 text-theme-lightGreen text-[10px] font-semibold uppercase tracking-wide mb-2">
                  {product.category?.name || "Product"}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 leading-tight">
                  {product.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex-shrink-0 w-8 h-8 rounded-full bg-white border border-neutral-200 text-neutral-500 hover:text-neutral-900 hover:border-neutral-300 hover:shadow-sm transition-all duration-200 flex items-center justify-center"
                aria-label="Close"
              >
                <span className="text-sm">×</span>
              </button>
            </div>

            {/* Description */}
            {product.description && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-theme-salmon/60" />
                  <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    About this product
                  </h3>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line pl-3.5">
                  {product.description}
                </p>
              </div>
            )}

            {/* Customization */}
            {product.customizationDetails && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-theme-lightGreen/60" />
                  <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    Customization Options
                  </h3>
                </div>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line pl-3.5 border-l-2 border-theme-lightGreen/20">
                  {product.customizationDetails}
                </p>
              </div>
            )}

            {/* Options */}
            {product.options?.length > 0 && (
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-theme-salmon/60" />
                  <h3 className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">
                    Available Options
                  </h3>
                </div>
                <div className="space-y-2.5 pl-3.5">
                  {product.options.map((opt) => (
                    <div key={opt.label} className="text-sm">
                      <span className="font-medium text-neutral-900">{opt.label}:</span>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {opt.values.map((value, index) => (
                          <span 
                            key={index}
                            className="inline-flex items-center px-2 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs"
                          >
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery & Price */}
            <div className="mt-auto space-y-4 pt-4 border-t border-neutral-200/60">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  {product.deliveryTime && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-lightGreen/60" />
                      <span className="text-xs text-neutral-600">
                        Expected delivery: <span className="font-medium text-neutral-900">{product.deliveryTime}</span>
                      </span>
                    </div>
                  )}
                  
                  {product.priceFrom && (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-theme-salmon/60" />
                      <div className="text-sm font-bold text-neutral-900">
                        Price from ₹{product.priceFrom}
                        {product.priceTo ? ` - ₹${product.priceTo}` : ""}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* WhatsApp Button */}
              <WhatsAppButton
                text={`Hi Kalanjay, I'm interested in ${product.name}. Here are my requirements:`}
                className="w-full bg-gradient-to-r from-theme-red to-theme-salmon hover:from-theme-salmon hover:to-theme-red text-white shadow-lg shadow-theme-red/30 hover:shadow-theme-salmon/40 transition-all duration-300 py-3 rounded-xl font-medium"
              />
            </div>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className="h-1 bg-gradient-to-r from-theme-lightGreen/30 via-theme-salmon/30 to-theme-red/30" />
      </div>
    </div>
  );
}