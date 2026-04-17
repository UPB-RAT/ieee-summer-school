/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import {
  Calendar,
  MapPin,
  Users,
  Mail,
  Globe,
  Phone,
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
  Mic,
  BookOpen,
  FlaskConical,
  Target,
  Building,
  Linkedin,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ContentData, Section, Speaker, DaySchedule } from "./types";
import { label } from "motion/react-client";

const VITE_GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

const getEventMeta = (title: string) => {
  const t = title.toLowerCase();

  if (t.includes("welcome speech")) return { icon: Sun, color: "bg-pink-500" };
  if (t.includes("plenary")) return { icon: Mic, color: "bg-purple-500" };
  if (t.includes("lecture")) return { icon: BookOpen, color: "bg-blue-500" };
  if (t.includes("lab")) return { icon: FlaskConical, color: "bg-green-500" };
  if (t.includes("break")) return { icon: Coffee, color: "bg-gray-400" };
  if (t.includes("tour") || t.includes("visit") || t.includes("museum"))
    return { icon: MapPin, color: "bg-orange-500" };
  if (t.includes("dinner")) return { icon: Users, color: "bg-pink-500" };
  if (t.includes("activity")) return { icon: Target, color: "bg-indigo-700" };

  return { icon: BookOpen, color: "bg-slate-500" };
};

const getTimeSlots = (schedule: DaySchedule[]) => {
  const set = new Set<string>();
  schedule.forEach((day) => day.events.forEach((e) => set.add(e.time)));
  return Array.from(set).sort();
};

const LegalModal = ({
  show,
  setShow,
  legal,
  initialTab,
}: {
  show: boolean;
  setShow: (b: boolean) => void;
  legal: any;
  initialTab: "impressum" | "privacy";
}) => {
  const [activeTab, setActiveTab] = useState(initialTab);

  // IMPORTANT: sync when user clicks different footer link
  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (show) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show]);

  if (!show) return null;

  const current = legal[activeTab];

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => setShow(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 max-h-[90vh] overflow-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {current.title}
          </h2>
          <button onClick={() => setShow(false)}>✕</button>
        </div>

        {/* Tabs */}
        <div className="flex gap-6 border-b mb-6">
          <button
            onClick={() => setActiveTab("impressum")}
            className={`pb-2 font-semibold ${
              activeTab === "impressum"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-slate-500"
            }`}
          >
            Impressum
          </button>

          <button
            onClick={() => setActiveTab("privacy")}
            className={`pb-2 font-semibold ${
              activeTab === "privacy"
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-slate-500"
            }`}
          >
            Datenschutz
          </button>
        </div>

        {/* Content */}
        <div className="space-y-6 text-sm text-slate-700 dark:text-slate-300">
          {current.sections.map((section: any, idx: number) => (
            <div key={idx}>
              <h3 className="font-semibold mb-1">{section.heading}</h3>
              <p className="whitespace-pre-line leading-relaxed">
                {section.text}
              </p>
            </div>
          ))}
          {activeTab === "impressum" && (
            <p>
              Created with the{" "}
              <a href="https://impressum-generator.de" rel="dofollow">
                Impressum-Generator
              </a>{" "}
              from WebsiteWissen.com, the guide for{" "}
              <a
                href="https://websitewissen.com/website-erstellen"
                rel="dofollow"
              >
                Website creation
              </a>
              ,{" "}
              <a
                href="https://websitewissen.com/homepage-baukasten-vergleich"
                rel="dofollow"
              >
                Homepage construction kits
              </a>{" "}
              und{" "}
              <a
                href="https://websitewissen.com/shopsysteme-vergleich"
                rel="dofollow"
              >
                Shop systems
              </a>
              . Legal text from the{" "}
              <a href="https://www.kanzlei-hasselbach.de/" rel="dofollow">
                Hasselbach Law Firm
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const FloatingActions = () => (
  <div className="fixed bottom-8 right-8 z-[5555] flex flex-col gap-3">
    <motion.a
      href="#registration"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-5 rounded-3xl font-semibold shadow-2xl active:scale-95"
    >
      Register Now <ChevronRight className="w-6 h-6" />
    </motion.a>

    <motion.a
      href="#scholarships"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-5 rounded-3xl font-semibold shadow-2xl active:scale-95"
    >
      Scholarships <Target className="w-6 h-6" />
    </motion.a>
  </div>
);

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
          className={`font-bold text-md tracking-tight transition-colors ${
            isScrolled ? "text-slate-900 dark:text-white" : "text-white"
          }`}
        >
          {data.school.pageTitle}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-4 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-small transition-colors hover:opacity-70 ${
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
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
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
              className="text-slate-600 dark:text-slate-300 font-medium py-2"
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
    {/* Background */}
    <div className="absolute inset-0 z-0">
      <img
        src={data.school.heroImage}
        alt="Paderborn"
        className="w-full h-full object-cover opacity-40"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-transparent to-slate-900" />
    </div>

    {/* Sponsors Strip */}
    <div className="absolute top-[96px] md:top-[120px] left-0 w-full z-20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {data.sponsors?.map((sponsor, i) => {
          const Logo = (
            <div className="bg-white/90 dark:bg-slate-200/90 backdrop-blur-sm px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition flex items-center">
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="h-8 sm:h-10 md:h-12 object-contain"
              />
            </div>
          );

          return sponsor.link ? (
            <a
              key={i}
              href={sponsor.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {Logo}
            </a>
          ) : (
            <div key={i}>{Logo}</div>
          );
        })}
      </div>
    </div>

    {/* Content */}
    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase bg-blue-600/20 border border-blue-500/30 rounded-full">
          {data.school.chipText}
        </span>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
          {data.school.title}
        </h1>

        <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-white/90">
          {data.school.subtitle}
        </h2>

        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
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

        <div className="mt-6 text-sm text-white/70 italic">
          <p>{data.school.extraText}</p>
        </div>
      </motion.div>
    </div>
  </section>
);

const AccommodationModal = ({
  show,
  setShow,
  accommodations,
}: {
  show: boolean;
  setShow: (b: boolean) => void;
  accommodations: any[];
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setShow(false)}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 overflow-auto max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Recommended Accommodations
          </h2>
          <button
            onClick={() => setShow(false)}
            className="text-slate-500 hover:text-slate-800 dark:hover:text-white text-xl font-bold"
          >
            ✕
          </button>
        </div>

        {/* Accommodation List */}
        <div className="flex flex-col gap-6">
          {accommodations.map((hotel, idx) => (
            <div
              key={idx}
              className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <h3 className="text-md md:text-lg font-bold text-slate-900 dark:text-white mb-2">
                {hotel.name}
              </h3>
              <ul className="list-disc list-inside text-sm md:text-base text-slate-700 dark:text-slate-300 space-y-1">
                <li>
                  <span className="font-semibold">Location:</span>{" "}
                  {hotel.location}
                </li>
                <li>
                  <span className="font-semibold">Room types:</span>{" "}
                  {hotel.rooms}
                </li>
                <li>
                  <span className="font-semibold">Price range:</span>{" "}
                  {hotel.price}
                </li>
                <li>
                  <span className="font-semibold">Contact/Rates:</span>{" "}
                  <a
                    href={hotel.contact}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {hotel.contact}
                  </a>
                </li>
                <li>
                  <span className="font-semibold">Booking:</span>{" "}
                  {hotel.booking}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SpeakerCard = ({ speaker }: { speaker: Speaker }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all active:scale-[0.985] cursor-pointer touch-manipulation"
      onClick={() => setIsExpanded(!isExpanded)} // Click anywhere on card to toggle on mobile
    >
      {/* Image Section */}
      <div className="aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700 relative">
        {speaker.image ? (
          <img
            src={speaker.image}
            alt={speaker.name}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-200 dark:bg-slate-600 text-slate-400">
            <Users className="w-16 h-16" />
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
          {speaker.name}
        </h3>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-3">
          {speaker.affiliation}
        </p>

        <div className="h-px w-10 bg-slate-200 dark:bg-slate-700 mb-4" />

        <p className="text-sm text-slate-700 dark:text-slate-200 font-medium mb-3">
          {speaker.topic}
        </p>

        {/* Abstract - Now properly expandable on mobile */}
        {speaker.abstract && (
          <div className="mt-2">
            <p
              className={`text-sm text-slate-500 dark:text-slate-400 leading-relaxed transition-all duration-300 overflow-hidden ${
                isExpanded ? "line-clamp-none" : "line-clamp-3"
              }`}
            >
              {speaker.abstract}
            </p>

            {/* Expand/Collapse Button - Visible on all devices, but especially helpful on mobile */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering card click twice
                setIsExpanded(!isExpanded);
              }}
              className="mt-3 text-blue-600 dark:text-blue-400 text-sm font-medium flex items-center gap-1 hover:underline active:underline focus:outline-none"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Read More <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        )}

        {/* Speaker Website Link */}
        {speaker.website && (
          <a
            href={speaker.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()} // Prevent card click
            className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 transition-colors"
          >
            Speaker Profile <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const SocialCard = ({ item }: { item: any }) => (
  <motion.div
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-xl transition-all flex flex-col overflow-hidden"
  >
    {/* Top image */}
    <div className="relative w-full h-40 md:h-48 overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

      {/* Day badge */}
      <span className="absolute top-3 left-3 px-3 py-1 bg-blue-50 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider shadow-md">
        {item.day}
      </span>

      {/* Icon */}
      <Coffee className="absolute top-3 right-3 w-5 h-5 text-slate-200 dark:text-slate-400" />
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col gap-3">
      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
        {item.title}
      </h3>
      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
        {item.description}
      </p>

      {/* Optional footer for links or tags */}
      {item.link && (
        <a
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline"
        >
          Learn More →
        </a>
      )}
    </div>
  </motion.div>
);

const SessionCard = ({ item }: { item: any }) => (
  <motion.div
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-xl transition-all flex flex-col overflow-hidden"
  >
    {/* Top image */}
    <div className="relative w-full h-40 md:h-48 overflow-hidden">
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col gap-3">
      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
        {item.title}
      </h3>
      <p className="text-sm md:text-base text-slate-500 dark:text-slate-400 leading-relaxed">
        {item.description}
      </p>
    </div>
  </motion.div>
);

const OrganizerCard = ({ organizer }: { organizer: any }) => (
  <motion.div
    whileHover={{ y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="group bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-xl transition-all flex flex-col overflow-hidden"
  >
    {/* Top image */}
    <div className="relative w-full h-40 md:h-48 overflow-hidden rounded-t-2xl">
      <img
        src={organizer.image}
        alt={organizer.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
    </div>

    {/* Content */}
    <div className="p-6 flex flex-col gap-2 text-center">
      <h4 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white">
        {organizer.name}
      </h4>
      {organizer.link && (
        <a
          href={organizer.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline"
        >
          View Profile →
        </a>
      )}
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
  const [showPreview, setShowPreview] = useState(false);

  const parseTime = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const formatTime = (m: number) => {
    const h = String(Math.floor(m / 60)).padStart(2, "0");
    const min = String(m % 60).padStart(2, "0");
    return `${h}:${min}`;
  };

  // build boundaries
  const timeSet = new Set<number>();
  schedule.forEach((day) =>
    day.events.forEach((e) => {
      timeSet.add(parseTime(e.start));
      timeSet.add(parseTime(e.end));
    }),
  );

  const times = Array.from(timeSet).sort((a, b) => a - b);

  const slots = [];
  for (let i = 0; i < times.length - 1; i++) {
    const start = times[i];
    const end = times[i + 1];

    // ✅ keep ONLY slots that have at least one event
    const hasEvent = schedule.some((day) =>
      day.events.some(
        (e) => parseTime(e.start) <= start && parseTime(e.end) >= end,
      ),
    );

    if (hasEvent) {
      slots.push([start, end]);
    }
  }

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-3 border-b border-slate-200 dark:border-slate-800 pb-6">
          {schedule.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeDay === idx
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {day.day}
            </button>
          ))}

          <button
            onClick={() => setShowPreview(true)}
            className="px-6 py-2 rounded-xl text-sm font-semibold bg-orange-500 hover:bg-orange-600 text-white shadow"
          >
            Preview
          </button>
        </div>
      </div>

      {/* TIMELINE (unchanged) */}
      <div className="relative">
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700" />

        <motion.div key={activeDay} className="space-y-12">
          {schedule[activeDay].events.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            const { icon: Icon, color } = getEventMeta(event.title);

            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row md:items-center ${
                  isLeft ? "md:justify-start" : "md:justify-end"
                }`}
              >
                <div
                  className={`absolute left-8 md:left-1/2 -translate-x-1/2 w-9 h-9 ${color} rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900`}
                >
                  <Icon className="w-4 h-4 text-white" />
                </div>

                <div
                  className={`w-full md:w-[45%] p-5 rounded-xl border bg-white/80 dark:bg-slate-800/80 ml-12 md:ml-0 ${
                    isLeft ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"
                  }`}
                >
                  <div className="text-blue-600 dark:text-blue-400 font-mono text-xs mb-1">
                    {event.start} - {event.end}
                  </div>

                  <div className="font-semibold flex gap-2 text-slate-800 dark:text-slate-100">
                    <Icon className="w-4 h-4" />
                    {event.title}
                  </div>

                  {event.speaker && (
                    <div className="text-xs mt-1 text-slate-500 dark:text-slate-400">
                      {event.speaker}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* GRID MODAL */}
      {showPreview && (
        <div className="fixed inset-0 z-6666 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-700/40"
            onClick={() => setShowPreview(false)}
          />

          <div className="relative z-10 w-full max-w-7xl bg-white dark:bg-slate-900 rounded-2xl p-8 overflow-auto text-slate-900 dark:text-slate-100">
            {/* HEADER */}
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-semibold">Schedule</h2>
              <button className="text-lg" onClick={() => setShowPreview(false)}>
                ✕
              </button>
            </div>

            {/* GRID */}
            <div className="overflow-auto rounded-xl border border-white dark:border-slate-900">
              <div
                className="grid bg-slate-50 dark:bg-slate-900"
                style={{
                  gridTemplateColumns: `110px repeat(${schedule.length}, minmax(160px, 1fr))`,
                  gridTemplateRows: `auto repeat(${slots.length}, minmax(56px, auto))`,
                  gap: "8px",
                  padding: "8px",
                }}
              >
                {/* HEADER */}
                <div className="sticky top-0 z-20 bg-white dark:bg-slate-500 rounded-md p-3 text-center text-sm font-semibold border border-slate-200 dark:border-slate-700">
                  Time
                </div>

                {schedule.map((d, i) => (
                  <div
                    key={i}
                    className="sticky top-0 z-20 bg-white dark:bg-slate-500 rounded-md p-3 text-center text-sm font-semibold border border-slate-200 dark:border-slate-700"
                  >
                    {d.day}
                  </div>
                ))}

                {/* TIME */}
                {slots.map(([s, e], i) => (
                  <div
                    key={i}
                    className="sticky left-0 z-10 bg-white dark:bg-slate-500 rounded-md 
               flex items-center justify-center 
               text-xs font-mono border border-slate-200 dark:border-slate-700 px-2 py-1"
                    style={{
                      gridRow: i + 2,
                      gridColumn: 1,
                    }}
                  >
                    <div className="flex flex-col items-center leading-tight gap-1">
                      <span className="font-medium">{formatTime(s)}</span>
                      {"--"}
                      <span className="font-medium">{formatTime(e)}</span>
                    </div>
                  </div>
                ))}

                {/* EVENTS */}
                {schedule.map((day, colIdx) =>
                  day.events.map((event, i) => {
                    const start = parseTime(event.start);
                    const end = parseTime(event.end);

                    const rowStart = slots.findIndex(([s]) => s === start) + 2;

                    const endIndex = slots.findIndex(([s]) => s >= end);
                    const rowEnd =
                      endIndex !== -1 ? endIndex + 2 : slots.length + 2;

                    const { icon: Icon, color } = getEventMeta(event.title);
                    const isBreak = event.title.toLowerCase().includes("break");

                    return (
                      <div
                        key={`${colIdx}-${i}`}
                        style={{
                          gridColumn: colIdx + 2,
                          gridRow: `${rowStart} / ${rowEnd}`,
                        }}
                      >
                        <div
                          className={`
                      h-full w-full rounded-lg px-3 py-2 flex flex-col items-center justify-center text-center
                      text-sm leading-snug font-medium
                      ${
                        isBreak
                          ? "bg-yellow-200 dark:bg-yellow-400 text-yellow-900"
                          : `${color} text-white`
                      }
                    `}
                        >
                          {!isBreak && (
                            <Icon className="w-4 h-4 mb-1 opacity-90" />
                          )}

                          <span className="break-words">{event.title}</span>

                          {event.speaker && !isBreak && (
                            <span className="opacity-80 text-xs mt-1">
                              {event.speaker}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  }),
                )}
              </div>
            </div>

            {/* LEGEND */}
            <div className="mx-2 mt-8 flex flex-wrap gap-3 text-sm">
              {[
                { label: "Plenary", color: "bg-purple-500" },
                { label: "Lecture", color: "bg-blue-500" },
                { label: "Lab", color: "bg-green-500" },
                { label: "Visit", color: "bg-orange-500" },
                { label: "Break", color: "bg-yellow-400 text-black" },
                { label: "Activity", color: "bg-indigo-700" },
                { label: "Welcome Sessions", color: "bg-pink-500" },
              ].map((item, i) => (
                <div
                  key={i}
                  className={`px-3 py-1.5 rounded-md text-white bold ${item.color}`}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const SectionWrapper = ({ section }: { section: Section }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <section
      id={section.id}
      className="py-20 md:py-24 border-b border-slate-100 dark:border-slate-800 last:border-0"
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

              {section.airports && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 p-6 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm">
                        {/* Icon */}
                        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex-shrink-0">
                          <Hotel className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                        </div>

                        {/* Text */}
                        <div className="flex-1">
                          <p className="font-bold text-slate-900 dark:text-white mb-1">
                            Accommodation
                          </p>
                          <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                            {section.accommodation.description}
                          </p>
                        </div>

                        {/* Button */}
                        <div className="mt-3 md:mt-0 md:ml-auto">
                          <button
                            onClick={() => setShowModal(true)}
                            className="inline-flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-500 text-white dark:from-blue-500 dark:to-blue-400 rounded-xl text-sm font-semibold shadow-lg hover:scale-105 hover:shadow-2xl active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-700 cursor-pointer"
                          >
                            <Hotel className="w-4 h-4" />
                            View Options
                          </button>
                        </div>

                        {/* Modal */}
                        <AccommodationModal
                          show={showModal}
                          setShow={setShowModal}
                          accommodations={section.accommodation?.hotels}
                        />
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
                </div>
              )}

              {section.deadlines && (
                <div className="flex flex-col gap-12 mt-12">
                  <div className="flex flex-col gap-6">
                    {/* Deadlines Grid */}
                    <div className="flex flex-col sm:flex-row flex-wrap gap-6">
                      {section.deadlines?.map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex-1 p-6 rounded-2xl shadow-lg relative overflow-hidden text-white ${item.bgGradient} transform transition hover:-translate-y-1 hover:shadow-2xl active:scale-95`}
                        >
                          {/* Decorative Accent */}
                          <div
                            className={`absolute -top-6 -right-6 w-24 h-24 opacity-20 rounded-full ${item.accentColor}`}
                          ></div>

                          {/* Optional icon */}
                          {item.icon && (
                            <item.icon className="w-6 h-6 mb-2 text-white z-10 relative" />
                          )}

                          <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-2 z-10 relative">
                            {item.label}
                          </p>
                          <p className="text-3xl font-extrabold z-10 relative">
                            {item.date}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Registration Button at Bottom */}
                    <div className="flex justify-center mt-4">
                      <a
                        href={section.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full max-w-md py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-500 dark:to-blue-400 text-white font-bold rounded-2xl text-center hover:scale-105 hover:shadow-2xl active:scale-95 transition transform cursor-pointer flex items-center justify-center gap-3"
                      >
                        <Hotel className="w-5 h-5" />
                        Registration Portal
                      </a>
                    </div>
                  </div>

                  {section.fees && (
                    <div className="flex flex-col gap-8">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Registration Fees
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {section.fees.map((fee, idx) => (
                          <div
                            key={idx}
                            className="relative p-6 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-tr from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-700 flex flex-col gap-4 hover:scale-105 hover:shadow-2xl active:scale-95 transition-transform duration-300"
                          >
                            {/* Decorative Circle */}
                            <div className="absolute -top-4 -right-4 w-16 h-16 bg-blue-100 dark:bg-blue-900/30 opacity-30 rounded-full"></div>

                            {/* Icon + Category */}
                            <div className="flex items-center gap-3 z-10 relative">
                              <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
                                {fee.category}
                              </p>
                            </div>

                            {/* Fee Details */}
                            <div className="flex flex-col gap-2 z-10 relative">
                              {/* Member Fee */}
                              <div className="flex justify-between items-center bg-green-50 dark:bg-green-900/30 px-3 py-2 rounded-lg">
                                <span className="text-sm font-semibold text-green-700 dark:text-green-400">
                                  Member Fee
                                </span>
                                <span className="text-lg font-bold text-green-600 dark:text-green-400">
                                  {fee.memberFee}
                                </span>
                              </div>

                              {/* Non-Member Fee */}
                              <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-700 px-3 py-2 rounded-lg">
                                <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">
                                  Non-Member Fee
                                </span>
                                <span className="text-lg font-bold text-slate-700 dark:text-slate-200">
                                  {fee.nonMemberFee}
                                </span>
                              </div>

                              <span className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                                * IEEE CIS members enjoy discounted rates
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {section.categories && (
                <div className="flex flex-col gap-10">
                  {/* Free Registration Row */}
                  {section.categories.find(
                    (c) => c.category === "Free Registration",
                  ) && (
                    <div>
                      <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">
                        Free Registrations
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {section.categories
                          .find((c) => c.category === "Free Registration")
                          .subcategories.map((sub, idx) => (
                            <div
                              key={idx}
                              className="relative p-4 rounded-2xl shadow-lg bg-gradient-to-tr from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-700 flex flex-col gap-3 hover:scale-105 hover:shadow-2xl active:scale-95 transition-transform duration-300 min-h-[160px]"
                            >
                              <div className="absolute -top-4 -right-4 w-16 h-16 opacity-20 rounded-full bg-blue-100 dark:bg-blue-900/30"></div>
                              <p className="font-semibold text-blue-600 dark:text-blue-300 text-sm uppercase tracking-wide">
                                {sub.subcategory}
                              </p>
                              <p className="text-slate-700 dark:text-slate-300 text-sm mt-1">
                                {sub.details}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Combined Travel + Accommodation Row */}
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4">
                      Travel & Accommodation
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
                      {section.categories
                        .filter(
                          (c) =>
                            c.category === "Travel" ||
                            c.category === "Accommodation",
                        )
                        .map((item, idx) => (
                          <div
                            key={idx}
                            className="relative p-6 rounded-2xl shadow-lg bg-gradient-to-tr from-white to-slate-50 dark:from-slate-800 dark:to-slate-700 border border-slate-200 dark:border-slate-700 flex flex-col gap-3 hover:scale-105 hover:shadow-2xl active:scale-95 transition-transform duration-300 min-h-[160px]"
                          >
                            <div className="absolute -top-4 -right-4 w-16 h-16 opacity-20 rounded-full bg-blue-100 dark:bg-blue-900/30"></div>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-blue-50 dark:bg-blue-800 rounded-full flex items-center justify-center text-xl">
                                {item.category === "Travel" ? "✈️" : "🏨"}
                              </div>
                              <p className="font-bold text-slate-800 dark:text-slate-200 text-sm uppercase tracking-wide">
                                {item.category}
                              </p>
                            </div>
                            <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                              {item.details}
                            </p>
                          </div>
                        ))}
                    </div>
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

          {section.organizers && (
            <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6">
              {section.organizers.map((org, idx) => (
                <OrganizerCard key={idx} organizer={org} />
              ))}
            </div>
          )}

          {section.faqItems && <FAQAccordion items={section.faqItems} />}

          {section.schedule && <Schedule schedule={section.schedule} />}

          {section.contact_data && (
            <ContactSection data={section.contact_data} />
          )}

          {section.sessionCards && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.sessionCards.map((item, idx) => (
                <SessionCard key={idx} item={item} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

const ContactSection = ({ data }: { data: any }) => {
  return (
    <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-stretch py-10">
      {/* Contact Info */}
      <div className="flex flex-col gap-6 bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl shadow-lg min-h-full">
        {/* Email */}
        <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-sm">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600">
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {data.email}
          </span>
        </div>

        {/* Phone */}
        {/* <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-sm">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {data.phone}
          </span>
        </div> */}

        {/* Address */}
        <div className="flex items-center gap-4 p-4 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors cursor-pointer shadow-sm">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-slate-700 dark:text-slate-300 font-medium">
            {data.address}
          </span>
        </div>
      </div>

      {/* Map */}
      <div className="min-h-full h-full rounded-2xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700 relative">
        <iframe
          src={data.mapEmbed}
          className="w-full h-full border-0 rounded-2xl"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

const Sponsors = ({ data }: { data: ContentData }) => (
  <section className="py-20 bg-slate-50 dark:bg-slate-900/50 relative overflow-hidden">
    {/* Background decorative circles */}
    <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-200/20 dark:bg-blue-900/30 rounded-full filter blur-3xl animate-slow-spin"></div>
    <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-pink-200/20 dark:bg-pink-900/30 rounded-full filter blur-3xl animate-slow-spin-reverse"></div>

    <div className="relative max-w-7xl mx-auto px-6 text-center">
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
            className="relative group transform transition-transform hover:scale-105 active:scale-95"
          >
            {/* Circular badge container */}
            <div
              className="p-4 rounded-full bg-white shadow-md dark:shadow-black/30 
                   ring-1 ring-slate-200 flex items-center justify-center 
                   w-48 h-48"
            >
              <img
                src={sponsor.logo}
                alt={sponsor.name}
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Optional hover pulse ring */}
            <span className="absolute inset-0 rounded-full border-2 border-blue-400/30 opacity-0 group-hover:opacity-100 animate-pulse transition-all"></span>
          </a>
        ))}
      </div>
    </div>
  </section>
);

const Footer = ({
  data,
  openModal,
}: {
  data: ContentData;
  openModal: (tab: "impressum" | "privacy") => void;
}) => {
  const socialClass =
    "text-slate-400 hover:text-white transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-white/30 rounded";

  const legalClass =
    "hover:text-white transition-colors cursor-pointer focus:outline-none focus:underline";

  const linkClass = "text-slate-400 hover:text-white transition-colors";

  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* LEFT */}
          <div>
            <p className="text-slate-600 dark:text-slate-300 text-sm mb-6">
              {data.school.slogan}
            </p>

            {/* Social Links */}
            <div className="flex gap-6 mb-6">
              <a
                href={`mailto:${data.footer.email}`}
                aria-label="Send email"
                className={socialClass}
              >
                <Mail className="w-6 h-6" />
              </a>

              <a
                href={data.footer.website}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit website"
                className={socialClass}
              >
                <Globe className="w-6 h-6" />
              </a>

              <a
                href={data.footer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className={socialClass}
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* CENTER */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg font-semibold mb-4">Sponsors</h3>

            <ul className="flex flex-col gap-3 text-sm items-center">
              {data.sponsors.map((sponsor, idx) => (
                <li key={idx}>
                  <a
                    href={sponsor.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {sponsor.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start md:items-end text-slate-500 text-sm gap-4">
            {/* Legal Links */}
            <div className="flex gap-6 text-slate-400">
              <button
                onClick={() => openModal("impressum")}
                className={legalClass}
              >
                Impressum
              </button>

              <button
                onClick={() => openModal("privacy")}
                className={legalClass}
              >
                Datenschutz
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const CookieConsent = ({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] bg-slate-900 text-white p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-300">
          We use cookies (Google Analytics) to analyze website traffic. You can
          accept or reject analytics tracking.
        </p>

        <div className="flex gap-3">
          <button
            onClick={onReject}
            className="px-4 py-2 text-sm bg-slate-700 hover:bg-slate-600 rounded cursor-pointer"
          >
            Reject
          </button>

          <button
            onClick={onAccept}
            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded cursor-pointer"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [data, setData] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLegal, setShowLegal] = useState(false);
  const [consent, setConsent] = useState<"accepted" | "rejected" | null>(null);
  const [activeLegalTab, setActiveLegalTab] = useState<"impressum" | "privacy">(
    "impressum",
  );
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme) return savedTheme;

      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }

    return "light";
  });

  const openLegal = (tab: "impressum" | "privacy") => {
    setActiveLegalTab(tab);
    setShowLegal(true);
  };

  useEffect(() => {
    const saved = localStorage.getItem("cookie-consent");

    if (saved === "accepted") {
      setConsent("accepted");
      loadGoogleAnalytics();
    } else if (saved === "rejected") {
      setConsent("rejected");
    }
  }, []);

  const loadGoogleAnalytics = () => {
    if (window.gtag) return; // prevent duplicate load

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${VITE_GOOGLE_ANALYTICS_ID}`;
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }

    window.gtag = gtag;

    gtag("js", new Date());

    gtag("config", VITE_GOOGLE_ANALYTICS_ID, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    });
  };

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setConsent("accepted");
    loadGoogleAnalytics();
  };

  const handleReject = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setConsent("rejected");
  };

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
        const response = await fetch("/ieee-summer-school/data/content.json");
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
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="h-screen flex items-center justify-center bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Oops!</h2>
          <p className="text-slate-600 dark:text-slate-400">
            {error || "Failed to load content"}
          </p>
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

      <Footer data={data} openModal={openLegal} />
      <LegalModal
        show={showLegal}
        setShow={setShowLegal}
        legal={data.legal}
        initialTab={activeLegalTab}
      />
      <FloatingActions />
      {consent === null && (
        <CookieConsent onAccept={handleAccept} onReject={handleReject} />
      )}
    </div>
  );
}
