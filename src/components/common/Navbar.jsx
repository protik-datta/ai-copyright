import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";
import logo from "../../assets/logo.svg";
import Container from "./Container";

const navLinks = [
  { id: 1, title: "Home", path: "/" },
  { id: 2, title: "Dashboard", path: "/dashboard" },
  { id: 3, title: "Profile", path: "/profile" },
  { id: 4, title: "History", path: "/history" },
  { id: 5, title: "Docs", path: "/docs" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed w-full z-50 backdrop-blur-xl">
      <Container>
        {/* ── Desktop Nav ── */}
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
                hover: transition-all duration-250 group cursor-pointer"
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

      {/* ── Mobile Menu ── */}
      {menuOpen && (
        <div
          className="md:hidden border-t border-purple-500/10 min-h-screen bg-white px-4 pb-5 pt-3
          animate-[slideDown_0.25s_ease]"
        >
          <div className="flex flex-col items-center justify-center gap-3">
            {navLinks.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className="text-black text-[15px] font-medium px-3 py-2.5 rounded-lg hover:bg-purple-500/10 transition-all duration-200"
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
              className="mt-3 flex items-center justify-center gap-2 py-3 px-8 rounded-xl
                bg-[#5044E5] text-white text-sm font-semibold
                shadow-[0_4px_20px_rgba(124,58,237,0.3)] hover:opacity-90 transition group"
            >
              Get Started
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
