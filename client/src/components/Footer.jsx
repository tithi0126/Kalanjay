export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold bg-gradient-to-r from-brand-500 to-theme-gold bg-clip-text text-transparent tracking-tight">Kalanjay</span>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed max-w-xs">
              Thoughtfully curated personalized gifts, hampers, frames and cakes
              for every occasion. Making memories beautiful.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-brand-600 hover:to-brand-700 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
              </a>
              <a href="https://instagram.com/kalanjay_" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-theme-peach hover:to-theme-gold flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-gradient-to-br hover:from-green-600 hover:to-green-700 flex items-center justify-center transition-all duration-300 hover:scale-110">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c1.005.572 1.913.846 3.256.846 3.18 0 5.767-2.587 5.768-5.766.001-3.18-2.585-5.767-5.766-5.767zm0 10.162c-1.055 0-1.855-.251-2.761-.759l-1.606.422.429-1.562c-.592-.943-.907-1.785-.907-2.75 0-2.67 2.172-4.842 4.844-4.842 2.668 0 4.842 2.172 4.842 4.842 0 2.67-2.174 4.842-4.842 4.842z" /></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-white mb-5 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><a href="/" className="hover:text-theme-peach transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-theme-peach opacity-0 group-hover:opacity-100 transition-opacity" />Home</a></li>
              <li><a href="/products" className="hover:text-theme-peach transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-theme-peach opacity-0 group-hover:opacity-100 transition-opacity" />Shop Collection</a></li>
              <li><a href="/about-us" className="hover:text-theme-peach transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-theme-peach opacity-0 group-hover:opacity-100 transition-opacity" />Our Story</a></li>
              <li><a href="/contact" className="hover:text-theme-peach transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-theme-peach opacity-0 group-hover:opacity-100 transition-opacity" />Contact Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-bold text-white mb-5 text-lg">Categories</h3>
            <ul className="space-y-3 text-sm text-neutral-300">
              <li><a href="/products?category=gifts" className="hover:text-theme-gold transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-theme-gold opacity-0 group-hover:opacity-100 transition-opacity" />Personalized Gifts</a></li>
              <li><a href="/products?category=hampers" className="hover:text-theme-gold transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-theme-gold opacity-0 group-hover:opacity-100 transition-opacity" />Custom Hampers</a></li>
              <li><a href="/products?category=frames" className="hover:text-theme-lightBlue transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-theme-lightBlue opacity-0 group-hover:opacity-100 transition-opacity" />Photo Frames</a></li>
              <li><a href="/products?category=cakes" className="hover:text-theme-peach transition-colors inline-flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-theme-peach opacity-0 group-hover:opacity-100 transition-opacity" />Cakes & Bakes</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-5 text-lg">Get in Touch</h3>
            <ul className="space-y-4 text-sm text-neutral-300">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-theme-peach" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-1">Phone / WhatsApp</p>
                  <p className="text-white font-medium">+91-9825600097</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-theme-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-1">Email</p>
                  <p className="text-white font-medium">tithishah26@gmail.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-theme-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div>
                  <p className="text-xs text-neutral-400 mb-1">Studio Address</p>
                  <p className="text-white font-medium">Divya Jyoti Appt, Adajan, Surat 395009</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-neutral-400">
              © {new Date().getFullYear()} Kalanjay. All rights reserved. Made with ❤️ in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}