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
} from "lucide-react";
import { useState, useEffect } from "react";
import { ContentData, Section, Speaker, DaySchedule } from "./types";

const Navbar = ({ data }: { data: ContentData }) => {
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
          ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a
          href="#"
          className={`font-bold text-xl tracking-tight transition-colors ${
            isScrolled ? "text-slate-900" : "text-white"
          }`}
        >
          {data.school.title}
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:opacity-70 ${
                isScrolled ? "text-slate-600" : "text-white/90"
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className={isScrolled ? "text-slate-900" : "text-white"} />
          ) : (
            <Menu className={isScrolled ? "text-slate-900" : "text-white"} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-white border-b border-slate-100 p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-slate-600 font-medium"
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
    className="group bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
  >
    <div className="aspect-square overflow-hidden bg-slate-100">
      <img
        src={speaker.image}
        alt={speaker.name}
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        referrerPolicy="no-referrer"
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-900 mb-1">{speaker.name}</h3>
      <p className="text-sm font-semibold text-blue-600 mb-3">
        {speaker.affiliation}
      </p>
      <div className="h-px w-8 bg-slate-200 mb-3" />
      <p className="text-sm text-slate-500 italic leading-relaxed">
        "{speaker.topic}"
      </p>
    </div>
  </motion.div>
);

const Schedule = ({ schedule }: { schedule: DaySchedule[] }) => (
  <div className="space-y-12">
    {schedule.map((day, idx) => (
      <div key={idx} className="grid md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <h3 className="text-2xl font-bold text-slate-900 sticky top-24">
            {day.day}
          </h3>
        </div>
        <div className="md:col-span-3 space-y-4">
          {day.events.map((event, eIdx) => (
            <div
              key={eIdx}
              className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors"
            >
              <div className="flex items-center gap-2 text-slate-400 font-mono text-sm min-w-[140px]">
                <Clock className="w-4 h-4" />
                {event.time}
              </div>
              <div className="font-semibold text-slate-800 text-lg">
                {event.title}
              </div>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

const SectionWrapper = ({ section }: { section: Section; key?: any }) => {
  return (
    <section
      id={section.id}
      className="py-24 border-b border-slate-100 last:border-0"
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-12 tracking-tight flex items-center gap-4">
            <span className="w-12 h-1 bg-blue-600 rounded-full" />
            {section.title}
          </h2>

          {section.content && (
            <div className="max-w-3xl">
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {section.content}
              </p>
              <ul className="list-disc pl-5">
                {section?.points?.map((point, index) => (
                  <li
                    key={index}
                    className="text-lg text-slate-500 leading-relaxed"
                  >
                    {point}
                  </li>
                ))}
              </ul>
              {section.address && (
                <div className="flex items-start gap-3 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                  <div>
                    <p className="font-bold text-slate-900">
                      Heinz Nixdorf Institute
                    </p>
                    <p className="text-slate-500">{section.address}</p>
                  </div>
                </div>
              )}
              {section.deadline && (
                <div className="flex flex-col sm:flex-row gap-8 mt-12">
                  <div className="flex-1 p-8 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200">
                    <p className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-2">
                      Application Deadline
                    </p>
                    <p className="text-3xl font-bold">{section.deadline}</p>
                  </div>
                  <div className="flex-1 flex items-center">
                    <a
                      href={section.link}
                      className="w-full py-4 px-6 border-2 border-slate-900 text-slate-900 font-bold rounded-2xl text-center hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2"
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

          {section.schedule && <Schedule schedule={section.schedule} />}
        </motion.div>
      </div>
    </section>
  );
};

const Sponsors = ({ data }: { data: ContentData }) => (
  <section className="py-20 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6 text-center">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-10">
        Supported By
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-50 grayscale hover:grayscale-0 transition-all">
        {data.sponsors.map((sponsor, idx) => (
          <img
            key={idx}
            src={sponsor.logo}
            alt={sponsor.name}
            className="h-12 md:h-16 object-contain"
            referrerPolicy="no-referrer"
          />
        ))}
      </div>
    </div>
  </section>
);

const Footer = ({ data }: { data: ContentData }) => (
  <footer className="bg-slate-900 text-white py-20">
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // "https://raw.githubusercontent.com/alperyeg/ieee-summer-school/refs/heads/main/src/data/content.json",
          "/data/content.json",
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
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar data={data} />
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
