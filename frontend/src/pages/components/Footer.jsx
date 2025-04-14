import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaInstagram, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  const { colors } = useContext(ThemeContext);

  return (
    <footer
      className="w-full text-center py-6 px-4 border-t"
      style={{
        backgroundColor: colors.background,
        color: colors.text,
        borderTopColor: `${colors.text}33`,
      }}
    >
      <p className="text-sm mb-3">
        &copy; {new Date().getFullYear()} <b>FinFlow</b> — Modern Banking, Made for You.
      </p>

      <div className="flex justify-center items-center space-x-4">
        <a
          href="https://www.instagram.com/cdn_lgn"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <FaInstagram size={20} color={colors.primary} />
        </a>
        <a
          href="https://github.com/cdn-lgn"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <FaGithub size={20} color={colors.primary} />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform hover:scale-110"
        >
          <FaLinkedin size={20} color={colors.primary} />
        </a>
      </div>
    </footer>
  );
}
