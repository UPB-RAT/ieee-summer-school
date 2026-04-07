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
  Mic,
  BookOpen,
  FlaskConical,
  Target,
  Building,
  Linkedin,
} from "lucide-react";
import { useState, useEffect } from "react";
import { ContentData, Section, Speaker, DaySchedule } from "./types";
import ReactGA from "react-ga4";

const getEventMeta = (title: string) => {
  const t = title.toLowerCase();

  if (t.includes("plenary")) return { icon: Mic, color: "bg-purple-500" };

  if (t.includes("lecture")) return { icon: BookOpen, color: "bg-blue-500" };

  if (t.includes("lab")) return { icon: FlaskConical, color: "bg-green-500" };

  if (t.includes("break")) return { icon: Coffee, color: "bg-gray-400" };

  if (t.includes("tour") || t.includes("visit"))
    return { icon: MapPin, color: "bg-orange-500" };

  if (t.includes("dinner")) return { icon: Users, color: "bg-pink-500" };

  if (t.includes("activity")) return { icon: Target, color: "bg-indigo-500" };

  if (t.includes("museum")) return { icon: Building, color: "bg-yellow-500" };

  return { icon: BookOpen, color: "bg-slate-500" };
};

const getTimeSlots = (schedule: DaySchedule[]) => {
  const set = new Set<string>();
  schedule.forEach((day) => day.events.forEach((e) => set.add(e.time)));
  return Array.from(set).sort();
};

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
        <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
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
    className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-xl transition-all flex flex-col overflow-hidden"
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

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* Day Selector */}
        <div className="flex flex-wrap gap-3 border-b border-slate-200 dark:border-slate-800 pb-6">
          {schedule.map((day, idx) => (
            <button
              key={idx}
              onClick={() => setActiveDay(idx)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition ${
                activeDay === idx
                  ? "bg-blue-600 text-white shadow"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {day.day}
            </button>
          ))}
          <button
            onClick={() => setShowPreview(true)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition bg-blue-600 text-white shadow`}
          >
            Preview
          </button>
        </div>
      </div>

      {/* Timeline View */}
      <div className="relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700" />

        <motion.div
          key={activeDay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-12"
        >
          {schedule[activeDay].events.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            const { icon: Icon, color } = getEventMeta(event.title);

            return (
              <div
                key={idx}
                className={`relative flex items-center ${
                  isLeft ? "justify-start" : "justify-end"
                }`}
              >
                {/* Dot */}
                <div
                  className={`absolute left-1/2 -translate-x-1/2 w-10 h-10 ${color} rounded-full flex items-center justify-center border-4 border-white dark:border-slate-900 z-10 shadow-md`}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Card */}
                <div
                  className={`w-[45%] p-5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-md transition ${
                    isLeft ? "mr-auto pr-8" : "ml-auto pl-8"
                  }`}
                >
                  <div className="text-blue-600 dark:text-blue-400 font-mono text-sm font-semibold mb-1">
                    {event.time}
                  </div>

                  <div className="text-slate-800 dark:text-slate-200 font-semibold flex items-center gap-2">
                    <Icon className="w-4 h-4 opacity-70" />
                    {event.title}
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>

      {/* MODAL: Grid Schedule */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPreview(false)}
          />

          {/* Modal */}
          <div className="relative z-10 w-[95%] max-w-6xl bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-6 overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                Weekly Schedule – Quick Preview
              </h2>

              <button
                onClick={() => setShowPreview(false)}
                className="text-slate-500 hover:text-slate-800 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                    <th className="p-3 border">Time</th>
                    {schedule.map((d, i) => (
                      <th key={i} className="p-3 border font-semibold">
                        {d.day}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {getTimeSlots(schedule).map((slot, idx) => {
                    const rowEvents = schedule.map((day) =>
                      day.events.find((e) => e.time === slot),
                    );

                    const isBreak = rowEvents.some((e) =>
                      e?.title.toLowerCase().includes("break"),
                    );

                    return (
                      <tr key={idx}>
                        {/* Time */}
                        <td className="border p-3 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                          {slot}
                        </td>

                        {/* Break row */}
                        {isBreak ? (
                          <td
                            colSpan={schedule.length}
                            className="border p-3 text-center italic bg-yellow-100 dark:bg-yellow-900/30"
                          >
                            {rowEvents.find((e) => e)?.title}
                          </td>
                        ) : (
                          rowEvents.map((event, i) => {
                            if (!event)
                              return <td key={i} className="border p-3" />;

                            const { icon: Icon, color } = getEventMeta(
                              event.title,
                            );

                            return (
                              <td
                                key={i}
                                className="border p-3 text-center align-middle"
                              >
                                <div
                                  className={`inline-flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg text-white ${color}`}
                                >
                                  <Icon className="w-4 h-4" />
                                  <span className="font-semibold text-xs leading-tight">
                                    {event.title}
                                  </span>
                                </div>
                              </td>
                            );
                          })
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-3 text-xs">
              {[
                { label: "Plenary", color: "bg-blue-500" },
                { label: "Lecture", color: "bg-green-500" },
                { label: "Lab", color: "bg-purple-500" },
                { label: "Visit", color: "bg-orange-500" },
                { label: "Break", color: "bg-yellow-400 text-black" },
                { label: "Evening", color: "bg-pink-500" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`px-3 py-1 rounded-md text-white ${item.color}`}
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
                <div className="flex flex-col gap-12 mt-12">
                  {section.fees && (
                    <div className="flex flex-col gap-6">
                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
                        Registration Fees
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {section.fees.map((fee, idx) => (
                          <div
                            key={idx}
                            className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col gap-4"
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                                {/* Optional icon placeholder */}
                                <span className="text-slate-400 dark:text-slate-300 text-xs">
                                  💰
                                </span>
                              </div>
                              <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
                                {fee.category}
                              </p>
                            </div>
                            <div className="flex justify-between items-center text-lg font-bold">
                              <span className="text-green-500">
                                {fee.memberFee}
                              </span>
                              <span className="text-slate-600 dark:text-slate-400">
                                {fee.nonMemberFee}
                              </span>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                              * IEEE CIS members enjoy discounted rates
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-8">
                    <div className="flex-1 p-8 rounded-2xl shadow-lg shadow-blue-200 dark:shadow-none relative overflow-hidden bg-blue-600 text-white">
                      {/* Decorative Accent */}
                      <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400 opacity-20 rounded-full"></div>
                      <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-2 z-10 relative">
                        Application Deadline
                      </p>
                      <p className="text-3xl font-extrabold z-10 relative">
                        {section.deadline}
                      </p>
                    </div>

                    <div className="flex-1 flex items-center">
                      <a
                        href={section.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-12 px-6 border-2 border-slate-900 dark:border-white text-slate-900 dark:text-white font-bold rounded-2xl text-center hover:bg-slate-900 dark:hover:bg-white hover:text-white dark:hover:text-slate-900 transition-all transform hover:-translate-y-1 shadow hover:shadow-md flex items-center justify-center gap-3"
                      >
                        Registration Portal
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              )}
              {section.categories && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
                  {section.categories.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col gap-4"
                    >
                      {/* Header with optional icon */}
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                          {/* Optional icon placeholder */}
                          <span className="text-slate-400 dark:text-slate-300 text-xs">
                            🎓
                          </span>
                        </div>
                        <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm uppercase tracking-wider">
                          {item.category}
                        </p>
                      </div>

                      {/* Scholarship details */}
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-2">
                        {item.details}
                      </p>
                    </div>
                  ))}
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
            className="relative group transform transition-transform hover:scale-105"
          >
            {/* Circular badge container */}
            <div className="p-4 rounded-full bg-white dark:bg-slate-800 shadow-md dark:shadow-black/20 flex items-center justify-center w-48 h-48 md:w-48 md:h-48">
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
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href={data.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Globe className="w-6 h-6" />
            </a>
            <a
              href={data.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
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

  // useEffect(() => {
  //   ReactGA.send({ hitType: "pageview", page: "/" });
  // }, []);

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
          // "https://raw.githubusercontent.com/UPB-RAT/ieee-summer-school/refs/heads/main/public/data/content.json",
          "/ieee-summer-school/data/content.json",
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
