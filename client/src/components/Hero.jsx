import images from '../utils/images';

export default function Hero() {
  const heroImages = [
    images.product1,
    images.product8,
    images.product9,
    images.product11,
    images.product17,
    images.product21,
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-theme-lightGreen/30 via-white to-theme-salmon/20 pt-16 pb-24 md:pt-24 md:pb-32">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-theme-red/10 blur-3xl animate-blob" />
        <div className="absolute top-[30%] right-[10%] w-[40%] h-[40%] rounded-full bg-theme-green/15 blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-[10%] left-[20%] w-[35%] h-[35%] rounded-full bg-theme-salmon/10 blur-3xl animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <div className="space-y-8 animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-sm border-2 border-theme-red/30 shadow-lg">
            <span className="w-2 h-2 rounded-full bg-theme-red animate-pulse" />
            <span className="text-theme-red font-bold text-xs tracking-widest uppercase">
              Personalized Gifts Made With Love
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight tracking-tight">
            Turn every{" "}
            <span className="relative inline-block">
              <span className="text-theme-red font-extrabold">
                moment
              </span>
              <svg className="absolute w-full h-4 -bottom-2 left-0 text-theme-salmon/50" viewBox="0 0 200 10" preserveAspectRatio="none">
                <path d="M0 5 Q 100 10 200 5" stroke="currentColor" strokeWidth="8" fill="none" />
              </svg>
            </span>
            {" "}into a beautiful memory
          </h1>

          <p className="text-base md:text-lg text-neutral-700 max-w-lg leading-relaxed font-medium">
           Tell your story with our custom hampers, frames, cakes, and keepsakes. Each <span className="text-theme-red font-bold">premium design</span> carries a personal touch that speaks volumes.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
  <a
    href="#shop"
    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-theme-green bg-white hover:bg-theme-lightGreen text-neutral-900 text-base font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <span>Explore Collections</span>
    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </a>

  <a
    href="https://wa.me/919825600097?text=Hi%20Kalanjay%2C%20I%20would%20like%20to%20create%20a%20custom%20gift."
    target="_blank"
    rel="noreferrer"
    className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-theme-green bg-white hover:bg-theme-lightGreen text-neutral-900 text-base font-semibold px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-300"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5">
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
    </svg>
    <span>Chat on WhatsApp</span>
  </a>
</div>


          {/* <div className="flex items-center gap-6 pt-6 animate-fade-in">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-11 h-11 rounded-full border-3 border-white bg-gradient-to-br from-theme-salmon to-theme-red flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm">
              <p className="font-bold text-neutral-900 text-base">500+ Happy Customers</p>
              <div className="flex items-center gap-1 text-theme-red mt-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-xs font-bold">5.0 Rating</span>
              </div>
            </div>
          </div> */}
        </div>

        {/* Right Content - Image Grid */}
        <div className="relative animate-scale-in">
          {/* Floating gift icon */}
          <div className="absolute -top-6 -right-6 z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-theme-red to-theme-salmon shadow-2xl shadow-theme-red/40 flex items-center justify-center text-3xl animate-float">
            🎁
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-6">
            {/* Column 1 */}
            <div className="space-y-4 md:space-y-6 mt-12">
              <div className="group relative h-56 md:h-72 rounded-3xl overflow-hidden shadow-2xl hover:shadow-theme-red/30 transition-all duration-500 animate-slide-up">
                <img
                  src={heroImages[0]}
                  alt="Gift 1"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-red/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="group relative h-48 md:h-56 rounded-3xl overflow-hidden shadow-2xl hover:shadow-theme-salmon/30 transition-all duration-500 animate-slide-up animation-delay-200">
                <img
                  src={heroImages[1]}
                  alt="Gift 2"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-salmon/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="space-y-4 md:space-y-6">
              <div className="group relative h-48 md:h-56 rounded-3xl overflow-hidden shadow-2xl hover:shadow-theme-green/30 transition-all duration-500 animate-slide-up animation-delay-400">
                <img
                  src={heroImages[2]}
                  alt="Gift 3"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-green/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="group relative h-56 md:h-72 rounded-3xl overflow-hidden shadow-2xl hover:shadow-theme-red/30 transition-all duration-500 animate-slide-up animation-delay-600">
                <img
                  src={heroImages[3]}
                  alt="Gift 4"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-theme-red/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-theme-lightGreen/60 blur-2xl animate-pulse" />
          <div className="absolute -top-4 right-1/3 w-20 h-20 rounded-full bg-theme-salmon/40 blur-xl animate-pulse animation-delay-1000" />
        </div>
      </div>
    </section>
  );
}
