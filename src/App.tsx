/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Mail,
  Globe,
  Twitter,
  ChevronRight,
  Menu,
  X,
  ExternalLink,
  Sun,
  Moon,
  Coffee,
  ChevronDown,
  ChevronUp,
  Plane,
  Train,
  Hotel,
  Wifi,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ContentData, Section, Speaker, DaySchedule } from "./types";

const Navbar = ({
  data,
  theme,
  toggleTheme,
}: {
  data: ContentData;
  theme: string;
  toggleTheme: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = data.sections.map((s) => ({
    name: s.title,
    href: `#${s.id}`,
  }));

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a
          href="#"
          className={`font-bold text-xl tracking-tight transition-colors ${
            isScrolled ? "text-slate-900 dark:text-white" : "text-white"
          }`}
        >
          {data.school.title}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:opacity-70 ${
                isScrolled
                  ? "text-slate-600 dark:text-slate-300"
                  : "text-white/90"
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isScrolled
                ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-colors ${
              isScrolled
                ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X
                className={
                  isScrolled ? "text-slate-900 dark:text-white" : "text-white"
                }
              />
            ) : (
              <Menu
                className={
                  isScrolled ? "text-slate-900 dark:text-white" : "text-white"
                }
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-600 dark:text-slate-300 font-medium"
            >
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const Hero = ({ data }: { data: ContentData }) => (
  <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
    <div className="absolute inset-0 z-0">
      <img
        src={data.school.heroImage}
        alt="Paderborn"
        className="w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900" />
    </div>

    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-blue-600/20 border border-blue-500/30 rounded-full">
          IEEE CIS Summer School 2026
        </span>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
          {data.school.subtitle}
        </h1>
        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          {data.school.description}
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
          <div className="flex items-center gap-3 text-white/90">
            <Calendar className="w-5 h-5 text-blue-400" />
            <span className="font-medium">{data.school.dates}</span>
          </div>
          <div className="hidden md:block w-px h-4 bg-white/20" />
          <div className="flex items-center gap-3 text-white/90">
            <MapPin className="w-5 h-5 text-blue-400" />
            <span className="font-medium">{data.school.location}</span>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <a
            href="#registration"
            className="px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-2 group"
          >
            Apply Now
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

const SpeakerCard = ({ speaker }: { speaker: Speaker; key?: any }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
  >
    <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
      {speaker.image ? (
        <img
          src={speaker.image}
          alt={speaker.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
          referrerPolicy="no-referrer"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-600 text-slate-400 dark:text-slate-500">
          <Users className="w-12 h-12" />
        </div>
      )}
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
        {speaker.name}
      </h3>
      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
        {speaker.affiliation}
      </p>
      <div className="h-px w-8 bg-slate-200 dark:bg-slate-700 mb-3" />
      <p className="text-sm text-slate-800 dark:text-slate-200 font-medium mb-2">
        {speaker.topic}
      </p>
      {speaker.abstract && (
        <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4 line-clamp-3 group-hover:line-clamp-none transition-all">
          {speaker.abstract}
        </p>
      )}
      {speaker.website && (
        <a
          href={speaker.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 inline-flex items-center gap-1"
        >
          Speaker Profile <ExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  </motion.div>
);

const SocialCard = ({ item }: { item: any; key?: any }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-xl transition-all flex flex-col gap-4"
  >
    <div className="flex items-center justify-between">
      <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
        {item.day}
      </span>
      <Coffee className="w-5 h-5 text-slate-300 dark:text-slate-600" />
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {item.title}
      </h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
        {item.description}
      </p>
    </div>
  </motion.div>
);

const FAQAccordion = ({ items }: { items: any[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 mt-12">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex items-center justify-between p-6 text-left bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
          >
            <span className="font-bold text-slate-900 dark:text-white text-lg">
              {item.question}
            </span>
            {openIndex === index ? (
              <ChevronUp
                className="text-blue-600 dark:text-blue-400"
                size={24}
              />
            ) : (
              <ChevronDown
                className="text-slate-400 dark:text-slate-600"
                size={24}
              />
            )}
          </button>
          <motion.div
            initial={false}
            animate={{ height: openIndex === index ? "auto" : 0 }}
            className="overflow-hidden bg-slate-50 dark:bg-slate-900/50"
          >
            <div className="p-6 text-slate-600 dark:text-slate-400 border-t border-slate-200 dark:border-slate-700 leading-relaxed">
              {item.answer}
            </div>
          </motion.div>
        </div>
      ))}
    </div>
  );
};

const Schedule = ({ schedule }: { schedule: DaySchedule[] }) => {
  const [activeDay, setActiveDay] = useState(0);

  return (
    <div className="space-y-10">
      {/* Day Selector */}
      <div className="flex flex-wrap gap-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        {schedule.map((day, idx) => (
          <button
            key={idx}
            onClick={() => setActiveDay(idx)}
            className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${
              activeDay === idx
                ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                : "bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
          >
            {day.day}
          </button>
        ))}
      </div>

      {/* Events List */}
      <motion.div
        key={activeDay}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        {schedule[activeDay].events.map((event, eIdx) => (
          <div
            key={eIdx}
            className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all group"
          >
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-mono text-sm font-bold min-w-[140px] bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg w-fit">
              <Clock className="w-4 h-4" />
              {event.time}
            </div>
            <div className="font-bold text-slate-800 dark:text-slate-200 text-lg group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
              {event.title}
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const SectionWrapper = ({ section }: { section: Section; key?: any }) => {
  return (
    <section
      id={section.id}
      className="py-24 border-b border-slate-100 dark:border-slate-800 last:border-0"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-12 tracking-tight flex items-center gap-4">
            <span className="w-12 h-1 bg-blue-600 rounded-full" />
            {section.title}
          </h2>

          {section.content && (
            <div>
              <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                {section.content}
              </p>

              {section.points && (
                <ul className="grid sm:grid-cols-2 gap-4 mb-12">
                  {section.points.map((point, pIdx) => (
                    <li
                      key={pIdx}
                      className="flex items-start gap-3 text-slate-600 dark:text-slate-400"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span className="text-base font-medium">{point}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.address && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Address Card */}
                    <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                        <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white mb-1">
                          Address
                        </p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                          {section.address}
                        </p>
                      </div>
                    </div>

                    {/* Airports Card */}
                    {section.airports && (
                      <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                          <Plane className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white mb-2">
                            Nearest Airports
                          </p>
                          <ul className="space-y-1">
                            {section.airports.map((airport, aIdx) => (
                              <li
                                key={aIdx}
                                className="text-slate-500 dark:text-slate-400 text-sm"
                              >
                                {airport}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* Train Card */}
                    {section.train && (
                      <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                          <Train className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white mb-1">
                            Train
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            {section.train}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Accommodation Card */}
                    {section.accommodation && (
                      <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                          <Hotel className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white mb-1">
                            Accommodation
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            {section.accommodation}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Wi-Fi Card */}
                    {section.wifi && (
                      <div className="flex items-start gap-4 p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm">
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                          <Wifi className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white mb-1">
                            Wi-Fi
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            {section.wifi}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {section.googleMaps && (
                    <div className="w-full h-[450px] rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-lg">
                      <iframe
                        src={section.googleMaps}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  )}
                </div>
              )}
              {section.deadline && (
                <div className="flex flex-col sm:flex-row gap-8 mt-12">
                  <div className="flex-1 p-8 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none">
                    <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-2">
                      Application Deadline
                    </p>
                    <p className="text-3xl font-bold">{section.deadline}</p>
                  </div>
                  <div className="flex-1 flex items-center">
                    <a
                      href={section.link}
                      className="w-full py-4 px-6 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold rounded-2xl text-center hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                    >
                      Registration Portal
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {section.items && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.items.map((speaker, idx) => (
                <SpeakerCard key={idx} speaker={speaker} />
              ))}
            </div>
          )}

          {section.socialItems && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.socialItems.map((item, idx) => (
                <SocialCard key={idx} item={item} />
              ))}
            </div>
          )}

          {section.faqItems && <FAQAccordion items={section.faqItems} />}

          {section.schedule && <Schedule schedule={section.schedule} />}
        </motion.div>
      </div>
    </section>
  );
};

const Sponsors = ({ data }: { data: ContentData }) => (
  <section className="py-20 bg-slate-50 dark:bg-slate-900/50">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-10">
        Supported By
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 transition-all">
        {data.sponsors.map((sponsor, idx) => (
          <a
            key={idx}
            href={sponsor.link}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="h-16 md:h-24 object-contain"
              referrerPolicy="no-referrer"
            />
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Footer = ({ data }: { data: ContentData }) => (
  <footer className="bg-slate-900 dark:bg-black text-white py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold mb-6">{data.school.title}</h2>
          <p className="text-slate-400 max-w-md mb-8">
            An IEEE Computational Intelligence Society initiative hosted by
            Paderborn University.
          </p>
          <div className="flex gap-6">
            <a
              href={`mailto:${data.contact.email}`}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href={data.contact.website}
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Globe className="w-6 h-6" />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Twitter className="w-6 h-6" />
            </a>
          </div>
        </div>
        <div className="text-right md:text-right text-slate-500 text-sm">
          <p>© 2026 IEEE CIS Summer School. All rights reserved.</p>
          <p className="mt-2">
            Designed for the Computational Intelligence in Robotics community.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default function App() {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/alperyeg/ieee-summer-school/refs/heads/main/public/data/content.json",
          // "/data/content.json",
        );
        if (!response.ok) {
          throw new Error("Failed to fetch content");
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-slate-900">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p className="text-slate-600">{error || "Failed to load content"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900 transition-colors duration-300">
      <Navbar data={data} theme={theme} toggleTheme={toggleTheme} />
      <Hero data={data} />

      <main>
        {data.sections.map((section) => (
          <SectionWrapper key={section.id} section={section} />
        ))}
      </main>

      <Sponsors data={data} />
      <Footer data={data} />
    </div>
  );
}
