import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "../../assets/logo.svg";
import Container from "./Container";

const navLinks = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Generator", path: "/generator" },
  { id: 3, title: "History", path: "/history" },
  { id: 4, title: "Docs", path: "/docs" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed w-full z-50 backdrop-blur-xl">
        <Container>
          {/* Desktop Nav */}
          <nav className="flex justify-between items-center py-3.5">
            {/* Logo */}
            <div
              className="flex gap-2.5 items-center cursor-pointer"
              onClick={() => navigate("/")}
            >
              <img src={logo} alt="logo" className="w-32 h-10 object-contain" />
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex gap-1 items-center">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="relative text-gray-600 text-[15px] font-medium px-3.5 py-1.5 rounded-lg
                    transition-all duration-200 hover:text-[#5044E5]"
                >
                  {item.title}
                </Link>
              ))}
            </div>

            {/* CTA + Hamburger */}
            <div className="flex items-center gap-3">
              {/* Get Started Button — desktop */}
              <button
                onClick={() => navigate("/")}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl
                  bg-[#5044E5] text-white text-sm font-semibold
                  shadow-[0_4px_20px_rgba(124,58,237,0.35)]
                  hover:shadow-[0_6px_28px_rgba(124,58,237,0.55)]
                  transition-all duration-250 group cursor-pointer"
              >
                Get Started
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </button>

              {/* Hamburger — mobile only */}
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                className="md:hidden p-1.5 rounded-lg text-purple-400 hover:bg-purple-500/10 transition"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </nav>
        </Container>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`md:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm
          transition-opacity duration-300
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Slide-in Panel */}
      <div
        className={`md:hidden fixed top-0 left-0 w-full h-screen z-50 bg-white
          flex flex-col
          transition-transform duration-300 ease-in-out
          ${menuOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Top bar — logo + close button */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <img src={logo} alt="logo" className="w-28 h-9 object-contain" />
          <button
            onClick={() => setMenuOpen(false)}
            className="p-1.5 rounded-lg text-purple-400 hover:bg-purple-500/10 transition"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex flex-col flex-1 items-center justify-center gap-2 px-6">
          {navLinks.map((item, index) => (
            <Link
              key={item.id}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="w-full text-center text-[#3B3B3B] text-[16px] font-medium px-4 py-3 rounded-xl
                hover:bg-purple-500/8 hover:text-[#5044E5]
                transition-all duration-200"
              style={{
                transitionDelay: menuOpen ? `${index * 40}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(10px)",
                opacity: menuOpen ? 1 : 0,
                transition: `opacity 300ms ease ${index * 40}ms, transform 300ms ease ${index * 40}ms, background 200ms`,
              }}
            >
              {item.title}
            </Link>
          ))}

          {/* Get Started — mobile */}
          <button
            onClick={() => {
              navigate("/");
              setMenuOpen(false);
            }}
            className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 px-8 rounded-xl
              bg-[#5044E5] text-white text-sm font-semibold
              shadow-[0_4px_20px_rgba(124,58,237,0.3)]
              hover:shadow-[0_6px_28px_rgba(124,58,237,0.5)]
              hover:opacity-90 transition-all duration-200 group"
            style={{
              transitionDelay: menuOpen ? `${navLinks.length * 40}ms` : "0ms",
              transform: menuOpen ? "translateY(0)" : "translateY(10px)",
              opacity: menuOpen ? 1 : 0,
              transition: `opacity 300ms ease ${navLinks.length * 40}ms, transform 300ms ease ${navLinks.length * 40}ms, box-shadow 200ms`,
            }}
          >
            Get Started
            <ArrowRight
              size={16}
              className="transition-transform duration-200 group-hover:translate-x-1"
            />
          </button>
        </div>

        {/* Bottom padding */}
        <div className="pb-10" />
      </div>
    </>
  );
};

export default Navbar;
