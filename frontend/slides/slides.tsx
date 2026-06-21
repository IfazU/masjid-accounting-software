"use client";

import { useState, useEffect } from "react";

type Direction = "forward" | "backward";

const TOTAL_SLIDES = 15;

function SlideWrapper({
  children,
  direction,
  slideKey,
}: {
  children: React.ReactNode;
  direction: Direction;
  slideKey: number;
}) {
  const cls =
    direction === "forward" ? "anim-slide-right" : "anim-slide-left";
  return (
    <div
      key={slideKey}
      className={`${cls} w-full h-full`}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </div>
  );
}

function SlideShell({
  slideNum,
  label,
  children,
  accent = false,
}: {
  slideNum: number;
  label?: string;
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className="relative w-full h-full flex flex-col"
      style={{ background: "#fff" }}
    >
      {/* top bar */}
      <div
        className="flex items-center justify-between px-10 pt-8 pb-0 shrink-0"
        style={{ borderBottom: "1.5px solid #e7f3ee" }}
      >
        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: "#16a34a" }}
          >
            Noor Treasury
          </span>
          {label && (
            <>
              <span style={{ color: "#d1fae5" }}>·</span>
              <span
                className="text-xs font-medium tracking-wide"
                style={{ color: "#9ca3af" }}
              >
                {label}
              </span>
            </>
          )}
        </div>
        <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>
          {String(slideNum).padStart(2, "0")} / {String(TOTAL_SLIDES).padStart(2, "0")}
        </span>
      </div>

      {/* content */}
      <div className="flex-1 flex flex-col px-10 py-8 overflow-hidden">
        {children}
      </div>

      {/* bottom accent line */}
      {accent && (
        <div
          className="absolute bottom-0 left-0 right-0 h-1"
          style={{ background: "linear-gradient(90deg, #16a34a, #4ade80)" }}
        />
      )}
    </div>
  );
}

function StatCard({
  value,
  label,
  delay = "",
}: {
  value: string;
  label: string;
  delay?: string;
}) {
  return (
    <div
      className={`anim-fade-up ${delay} rounded-xl p-6 flex flex-col gap-1`}
      style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
    >
      <span className="text-3xl font-bold" style={{ color: "#15803d" }}>
        {value}
      </span>
      <span className="text-sm font-medium" style={{ color: "#374151" }}>
        {label}
      </span>
    </div>
  );
}

function BulletRow({
  icon,
  text,
  delay = "",
  sub,
}: {
  icon: string;
  text: string;
  delay?: string;
  sub?: string;
}) {
  return (
    <div className={`anim-fade-up ${delay} flex items-start gap-4`}>
      <span className="text-2xl mt-0.5 shrink-0">{icon}</span>
      <div>
        <p className="text-lg font-semibold" style={{ color: "#111827" }}>
          {text}
        </p>
        {sub && (
          <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

function Tag({
  children,
  color = "green",
}: {
  children: React.ReactNode;
  color?: "green" | "red" | "gray";
}) {
  const styles: Record<string, React.CSSProperties> = {
    green: { background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" },
    red: { background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" },
    gray: { background: "#f9fafb", color: "#374151", border: "1px solid #e5e7eb" },
  };
  return (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
      style={styles[color]}
    >
      {children}
    </span>
  );
}

/* ─── Individual Slides ─────────────────────────────── */

function Slide1() {
  return (
    <SlideShell slideNum={1} accent>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-6">
        <div className="anim-fade-up">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4"
            style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="10" r="6" fill="#16a34a" />
              <path
                d="M4 28c0-6.627 5.373-12 12-12s12 5.373 12 12"
                stroke="#16a34a"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M16 22v-4M13 24h6"
                stroke="#4ade80"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
        <div className="anim-fade-up delay-1">
          <h1
            className="text-6xl font-bold tracking-tight"
            style={{ color: "#111827" }}
          >
            Noor Treasury
          </h1>
        </div>
        <div className="anim-fade-up delay-2 max-w-xl">
          <p className="text-xl font-medium" style={{ color: "#16a34a" }}>
            Every pound keeps its purpose.
          </p>
        </div>
        <div
          className="anim-fade-up delay-3 w-20 h-px"
          style={{ background: "#bbf7d0" }}
        />
        <div className="anim-fade-up delay-4 max-w-lg">
          <p className="text-lg" style={{ color: "#6b7280" }}>
            Transparent donation management infrastructure for Muslim
            communities — built on trust, designed for accountability.
          </p>
        </div>
        <div className="anim-fade-up delay-5 flex gap-3 mt-2">
          <Tag color="green">Hackathon 2025</Tag>
          <Tag color="gray">Muslim Community Finance</Tag>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide2() {
  return (
    <SlideShell slideNum={2} label="The Opportunity">
      <div className="anim-fade-up mb-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#16a34a" }}>
          The Scale
        </span>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-8" style={{ color: "#111827" }}>
        Muslim communities are one of the{" "}
        <span style={{ color: "#16a34a" }}>most generous</span> in the UK
      </h2>
      <div className="grid grid-cols-2 gap-4 flex-1">
        <StatCard value="£2.2bn" label="Estimated British Muslim charitable giving per year" delay="delay-2" />
        <StatCard value="£1.5bn" label="Total assets held across UK mosques" delay="delay-3" />
        <StatCard value="£708" label="Average annual Muslim donor gives — 4× the UK average" delay="delay-4" />
        <StatCard value="49%" label="Of Muslim donors plan to give more next year vs. 21% UK-wide" delay="delay-5" />
      </div>
      <p className="anim-fade-up delay-6 text-sm mt-4" style={{ color: "#9ca3af" }}>
        Sources: Blue State 2024, Equi 2023–24, Ayaan Institute Mosques in Britain
      </p>
    </SlideShell>
  );
}

function Slide3() {
  return (
    <SlideShell slideNum={3} label="The Problem">
      <div className="anim-fade-up mb-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#16a34a" }}>
          Infrastructure
        </span>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-8" style={{ color: "#111827" }}>
        The money is serious. The tooling is{" "}
        <span style={{ color: "#dc2626" }}>not built for it</span>.
      </h2>
      <div className="flex flex-col gap-5 flex-1 justify-center">
        <BulletRow
          icon="🙋"
          text="55% of mosque staff are unpaid volunteers"
          sub="Managing millions in donations and restricted funds on goodwill alone"
          delay="delay-2"
        />
        <BulletRow
          icon="📋"
          text="Fragmented, manual systems"
          sub="Cash envelopes, WhatsApp notes, bank statements, disconnected payment processors"
          delay="delay-3"
        />
        <BulletRow
          icon="🔀"
          text="No visibility across donation types"
          sub="Zakat, Sadaqah, Lillah, Waqf — all going into the same pot"
          delay="delay-4"
        />
        <BulletRow
          icon="📊"
          text="£500m in annual mosque income with no unified reporting"
          sub="Committees approve spending based on uncertain numbers"
          delay="delay-5"
        />
      </div>
    </SlideShell>
  );
}

function Slide4() {
  return (
    <SlideShell slideNum={4} label="Regulation">
      <div className="anim-fade-up mb-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#16a34a" }}>
          Legal Requirement
        </span>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-8" style={{ color: "#111827" }}>
        The law already requires what mosques{" "}
        <span style={{ color: "#16a34a" }}>struggle to deliver</span>
      </h2>
      <div className="flex flex-col gap-6 flex-1 justify-center">
        <BulletRow
          icon="⚖️"
          text="Financial controls are mandatory for all registered charities"
          sub="Charity Commission guidance covers all aspects of how charities handle resources and assets"
          delay="delay-2"
        />
        <BulletRow
          icon="🔒"
          text="Restricted funds (e.g. Zakat) must be separated — not mixed with general income"
          sub="CAF Bank restricted funds guidance: money must be allocated correctly and not pooled"
          delay="delay-3"
        />
        <BulletRow
          icon="📑"
          text="Trustees are personally accountable for how charitable funds are managed"
          sub="Failure to comply can result in formal warnings, investigations, and regulatory action"
          delay="delay-4"
        />
        <BulletRow
          icon="🏦"
          text="Many mosques handle millions in annual income under these obligations"
          sub="Yet most rely on volunteer spreadsheets and manual reconciliation to stay compliant"
          delay="delay-5"
        />
      </div>
    </SlideShell>
  );
}

function Slide5() {
  return (
    <SlideShell slideNum={5} label="Risk">
      <div className="anim-fade-up mb-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#dc2626" }}>
          When Things Go Wrong
        </span>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-8" style={{ color: "#111827" }}>
        Governance failure has real consequences
      </h2>
      <div
        className="anim-fade-up delay-2 flex-1 flex flex-col justify-center rounded-2xl p-8"
        style={{ background: "#fef2f2", border: "1.5px solid #fecaca" }}
      >
        <div className="flex items-start gap-4 mb-4">
          <span
            className="text-4xl font-bold shrink-0"
            style={{ color: "#dc2626" }}
          >
            £1m
          </span>
          <div>
            <p className="text-xl font-bold" style={{ color: "#111827" }}>
              East London Mosque Trust
            </p>
            <p className="text-sm font-medium" style={{ color: "#6b7280" }}>
              Official Charity Commission warning — 2025
            </p>
          </div>
        </div>
        <p className="text-base" style={{ color: "#374151" }}>
          The Charity Commission issued a formal warning after the charity failed to
          responsibly manage funds — resulting in a loss of{" "}
          <strong>£1 million</strong>. One of the UK's most prominent mosques,
          now subject to regulatory scrutiny.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Tag color="red">Regulatory Warning</Tag>
          <Tag color="red">£1m Loss</Tag>
          <Tag color="red">Formal Intervention</Tag>
        </div>
      </div>
      <p className="anim-fade-up delay-3 text-xs mt-4" style={{ color: "#9ca3af" }}>
        Source: Charity Commission official regulatory action, reported 2025
      </p>
    </SlideShell>
  );
}

function Slide6() {
  return (
    <SlideShell slideNum={6} label="Risk">
      <div className="anim-fade-up mb-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#dc2626" }}>
          When Things Go Wrong
        </span>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-6" style={{ color: "#111827" }}>
        This is not an isolated case
      </h2>
      <div
        className="anim-fade-up delay-2 rounded-2xl p-8 mb-4"
        style={{ background: "#fef2f2", border: "1.5px solid #fecaca" }}
      >
        <p className="text-xl font-bold mb-1" style={{ color: "#111827" }}>
          Hounslow Jamia Masjid &amp; Islamic Centre
        </p>
        <p className="text-sm font-medium mb-3" style={{ color: "#6b7280" }}>
          Charity Commission investigation — alleged misuse of over £1 million
        </p>
        <p className="text-base" style={{ color: "#374151" }}>
          Allegations included unaccounted donations and governance concerns.
          Tensions escalated to a physical altercation outside the mosque —
          police and ambulance services were called. Community trust shattered publicly.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          <Tag color="red">Unaccounted Donations</Tag>
          <Tag color="red">Community Conflict</Tag>
          <Tag color="red">Police Called</Tag>
        </div>
      </div>
      <div
        className="anim-fade-up delay-3 rounded-xl p-4"
        style={{ background: "#fffbeb", border: "1.5px solid #fde68a" }}
      >
        <p className="text-sm font-medium" style={{ color: "#92400e" }}>
          When donation management fails, the damage is not just accounting errors.
          It becomes{" "}
          <strong>lost trust, community conflict, regulatory scrutiny,
          and reputational harm</strong> — sometimes irreversible.
        </p>
      </div>
    </SlideShell>
  );
}

function Slide7() {
  return (
    <SlideShell slideNum={7} label="Root Cause">
      <div className="anim-fade-up mb-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#16a34a" }}>
          The Core Problem
        </span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center gap-8">
        <div className="anim-fade-up delay-1 max-w-2xl">
          <h2 className="text-5xl font-bold leading-tight" style={{ color: "#111827" }}>
            The donor's intention is{" "}
            <span style={{ color: "#16a34a" }}>clear</span> at the moment of giving.
          </h2>
        </div>
        <div
          className="anim-fade-up delay-2 w-20 h-px"
          style={{ background: "#bbf7d0" }}
        />
        <div className="anim-fade-up delay-3 max-w-2xl">
          <h2 className="text-5xl font-bold leading-tight" style={{ color: "#dc2626" }}>
            The system loses it afterwards.
          </h2>
        </div>
        <div className="anim-fade-up delay-4 max-w-xl mt-4">
          <p className="text-lg" style={{ color: "#6b7280" }}>
            Verbal instructions. Paper notes. Bank references that say "Ramadan
            donation." Card readers that only show amounts. The intention was never
            captured — just assumed.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide8() {
  return (
    <SlideShell slideNum={8} label="The Story">
      <div className="anim-fade-up mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#6b7280" }}>
          Before Noor Treasury
        </span>
        <Tag color="red">Before</Tag>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-6" style={{ color: "#111827" }}>
        A night in the masjid — Ramadan appeal
      </h2>
      <div className="flex-1 flex flex-col justify-center gap-5">
        <div
          className="anim-fade-up delay-2 rounded-xl p-5"
          style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb" }}
        >
          <p className="text-base" style={{ color: "#374151" }}>
            It is the last ten nights of Ramadan. The masjid is running a major
            fundraising appeal after Taraweeh — collecting for{" "}
            <strong>three causes at once</strong>: Zakat for local families, the
            wudu-area renovation, and general Sadaqah.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { name: "Br Yusuf", role: "Taking card payments" },
            { name: "Br Hamza", role: "Writing down donor intentions" },
            { name: "Br Bilal", role: "Collecting cash envelopes" },
          ].map((p, i) => (
            <div
              key={p.name}
              className={`anim-fade-up delay-${i + 3} rounded-xl p-4 text-center`}
              style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
            >
              <p className="text-sm font-bold" style={{ color: "#15803d" }}>
                {p.name}
              </p>
              <p className="text-xs mt-1" style={{ color: "#6b7280" }}>
                {p.role}
              </p>
            </div>
          ))}
        </div>
        <div
          className="anim-fade-up delay-6 rounded-xl p-4"
          style={{ background: "#fffbeb", border: "1.5px solid #fde68a" }}
        >
          <p className="text-sm font-medium" style={{ color: "#92400e" }}>
            The queue is getting longer. People want to donate quickly before they
            leave. Everything is moving fast.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide9() {
  return (
    <SlideShell slideNum={9} label="The Story">
      <div className="anim-fade-up mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#6b7280" }}>
          Before Noor Treasury
        </span>
        <Tag color="red">Before</Tag>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-6" style={{ color: "#111827" }}>
        The chaos — same pot, lost intentions
      </h2>
      <div className="flex-1 flex flex-col gap-4 justify-center">
        {[
          { amount: "£500", says: '"This is Zakat."', how: "Card tap — reader shows amount only" },
          { amount: "£1,000", says: '"Put this towards the wudu area."', how: "Note written on paper" },
          { amount: "£200", says: '"General Sadaqah."', how: "Cash envelope" },
          { amount: "£2,000", says: '"Half Zakat, half renovation."', how: "Verbal — split unclear" },
        ].map((row, i) => (
          <div
            key={i}
            className={`anim-fade-up delay-${i + 2} flex items-center gap-4 rounded-xl p-4`}
            style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb" }}
          >
            <span className="text-xl font-bold w-20 shrink-0" style={{ color: "#111827" }}>
              {row.amount}
            </span>
            <p className="flex-1 text-sm italic" style={{ color: "#374151" }}>
              {row.says}
            </p>
            <span className="text-xs font-medium px-2 py-1 rounded-lg shrink-0" style={{ background: "#fef2f2", color: "#dc2626" }}>
              {row.how}
            </span>
          </div>
        ))}
        <div
          className="anim-fade-up delay-6 rounded-xl p-4"
          style={{ background: "#fef2f2", border: "1.5px solid #fecaca" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#dc2626" }}>
            The card reader only shows amounts — not the intention behind them.
            One note written on paper. Some cash counted separately. The system
            cannot separate what it never captured.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide10() {
  return (
    <SlideShell slideNum={10} label="The Story">
      <div className="anim-fade-up mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#6b7280" }}>
          Before Noor Treasury
        </span>
        <Tag color="red">Before</Tag>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-6" style={{ color: "#111827" }}>
        Three weeks later — the committee meets
      </h2>
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div
          className="anim-fade-up delay-2 rounded-2xl p-8"
          style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb" }}
        >
          <p className="text-lg font-medium italic mb-2" style={{ color: "#374151" }}>
            "The committee wants to approve spending for the renovation. But
            Brother Ahmed asks:"
          </p>
          <p className="text-2xl font-bold" style={{ color: "#dc2626" }}>
            "Are we sure this money is actually available for the wudu project?"
          </p>
        </div>
        <div
          className="anim-fade-up delay-3 rounded-xl p-5"
          style={{ background: "#fef2f2", border: "1.5px solid #fecaca" }}
        >
          <p className="text-base font-medium" style={{ color: "#374151" }}>
            Nobody is fully confident.
          </p>
          <p className="text-sm mt-2" style={{ color: "#6b7280" }}>
            Not because anyone was dishonest. Not because anyone was careless.
            But because the system relied on volunteers <strong>remembering,
            writing, matching, and separating</strong> everything manually.
            The donation intention was clear when people gave. The system lost
            it afterwards.
          </p>
        </div>
        <div className="anim-fade-up delay-4 grid grid-cols-3 gap-3">
          {["Manual reconciliation", "Uncertain fund balances", "Delayed decisions"].map((t) => (
            <div
              key={t}
              className="rounded-lg p-3 text-center text-sm font-medium"
              style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function Slide11() {
  return (
    <SlideShell slideNum={11} label="The Solution">
      <div className="anim-fade-up mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#16a34a" }}>
          After Noor Treasury
        </span>
        <Tag color="green">After</Tag>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-6" style={{ color: "#111827" }}>
        The same Ramadan night — with Noor Treasury
      </h2>
      <div className="flex-1 flex flex-col gap-4 justify-center">
        <div
          className="anim-fade-up delay-2 rounded-xl p-5"
          style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
        >
          <p className="text-base" style={{ color: "#374151" }}>
            Brother Ahmed announces the appeal and shows a{" "}
            <strong>QR code on the screen</strong>. Donors scan it on their own
            phones, open the masjid's donation page, choose the cause they want
            to support, and pay.
          </p>
        </div>
        {[
          { amount: "£500", type: "Zakat — local families", icon: "✅" },
          { amount: "£1,000", type: "Wudu-area renovation", icon: "✅" },
          { amount: "£200", type: "General Sadaqah", icon: "✅" },
        ].map((row, i) => (
          <div
            key={i}
            className={`anim-fade-up delay-${i + 3} flex items-center gap-4 rounded-xl p-4`}
            style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
          >
            <span className="text-xl font-bold w-20 shrink-0" style={{ color: "#15803d" }}>
              {row.amount}
            </span>
            <p className="flex-1 text-sm font-medium" style={{ color: "#374151" }}>
              Donor selects: <strong>{row.type}</strong>
            </p>
            <span className="text-lg shrink-0">{row.icon}</span>
          </div>
        ))}
        <div
          className="anim-fade-up delay-6 rounded-xl p-4"
          style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#15803d" }}>
            The volunteers are no longer trying to remember every verbal
            instruction. The donor selects the intention directly at the point
            of payment.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide12() {
  return (
    <SlideShell slideNum={12} label="The Solution">
      <div className="anim-fade-up mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#16a34a" }}>
          After Noor Treasury
        </span>
        <Tag color="green">After</Tag>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-6" style={{ color: "#111827" }}>
        End of night — one clear view
      </h2>
      <div className="flex-1 flex flex-col gap-4 justify-center">
        <div
          className="anim-fade-up delay-2 rounded-2xl overflow-hidden"
          style={{ border: "1.5px solid #bbf7d0" }}
        >
          <div
            className="px-6 py-3 flex items-center justify-between"
            style={{ background: "#15803d" }}
          >
            <span className="text-sm font-semibold text-white">Treasury Dashboard</span>
            <span className="text-xs text-green-200">Live</span>
          </div>
          <div style={{ background: "#f0fdf4" }}>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ borderBottom: "1px solid #bbf7d0" }}>
                  {["Fund", "Raised Tonight", "Status"].map((h) => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-semibold tracking-wide" style={{ color: "#15803d" }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { fund: "Zakat — Local Families", raised: "£3,200", status: "Restricted" },
                  { fund: "Wudu-Area Renovation", raised: "£5,800", status: "Restricted — Campaign" },
                  { fund: "General Sadaqah", raised: "£1,400", status: "Unrestricted" },
                ].map((row, i) => (
                  <tr
                    key={i}
                    style={{ borderBottom: "1px solid #d1fae5" }}
                    className={`anim-fade-up delay-${i + 3}`}
                  >
                    <td className="px-6 py-4 font-medium" style={{ color: "#111827" }}>{row.fund}</td>
                    <td className="px-6 py-4 font-bold" style={{ color: "#15803d" }}>{row.raised}</td>
                    <td className="px-6 py-4">
                      <Tag color="green">{row.status}</Tag>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="anim-fade-up delay-6 rounded-xl p-4"
          style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
        >
          <p className="text-sm font-semibold" style={{ color: "#15803d" }}>
            No manual reconciliation. No guessing. The donor's intention was
            captured at the moment of giving — and preserved all the way through.
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide13() {
  return (
    <SlideShell slideNum={13} label="The Solution">
      <div className="anim-fade-up mb-2 flex items-center gap-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#16a34a" }}>
          After Noor Treasury
        </span>
        <Tag color="green">After</Tag>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-8" style={{ color: "#111827" }}>
        The committee meets — confident decisions
      </h2>
      <div className="flex-1 flex flex-col justify-center gap-6">
        <div
          className="anim-fade-up delay-2 rounded-2xl p-8"
          style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
        >
          <p className="text-lg font-medium italic mb-2" style={{ color: "#374151" }}>
            "The committee wants to approve spending for the renovation. Brother
            Ahmed opens the dashboard and asks:"
          </p>
          <p className="text-2xl font-bold" style={{ color: "#15803d" }}>
            "How much is in the wudu renovation fund?" — £5,800. Approved.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "🎯", title: "No guessing", sub: "Real-time fund balances" },
            { icon: "🔒", title: "No mixing", sub: "Restricted funds stay separate" },
            { icon: "⚡", title: "Fast decisions", sub: "Data before the meeting" },
          ].map((item, i) => (
            <div
              key={item.title}
              className={`anim-fade-up delay-${i + 3} rounded-xl p-5 text-center`}
              style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb" }}
            >
              <p className="text-3xl mb-2">{item.icon}</p>
              <p className="text-sm font-bold" style={{ color: "#111827" }}>{item.title}</p>
              <p className="text-xs mt-1" style={{ color: "#6b7280" }}>{item.sub}</p>
            </div>
          ))}
        </div>
        <div
          className="anim-fade-up delay-6 text-center rounded-xl p-4"
          style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
        >
          <p className="text-base font-semibold" style={{ color: "#15803d" }}>
            "Every pound keeps its purpose."
          </p>
        </div>
      </div>
    </SlideShell>
  );
}

function Slide14() {
  return (
    <SlideShell slideNum={14} label="Product">
      <div className="anim-fade-up mb-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#16a34a" }}>
          How It Works
        </span>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-6" style={{ color: "#111827" }}>
        Two layers — every pound precisely labelled
      </h2>
      <div className="flex-1 flex gap-6 items-stretch">
        <div
          className="anim-fade-up delay-2 flex-1 rounded-2xl p-6 flex flex-col gap-4"
          style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
        >
          <div>
            <span className="text-xs font-bold tracking-wide uppercase" style={{ color: "#16a34a" }}>
              Layer 1 — Donation Type
            </span>
            <h3 className="text-xl font-bold mt-1" style={{ color: "#111827" }}>
              What Islamic category?
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {["Zakat", "Sadaqah", "Lillah", "Zakat al-Fitr / Fitrana", "Fidya", "Kaffarah", "Waqf", "General Donation"].map((t) => (
              <div
                key={t}
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: "#fff", border: "1px solid #d1fae5" }}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#16a34a" }} />
                <span className="text-sm font-medium" style={{ color: "#374151" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="anim-fade-up delay-3 flex items-center">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold"
            style={{ background: "#f0fdf4", color: "#16a34a", border: "2px solid #bbf7d0" }}
          >
            ×
          </div>
        </div>
        <div
          className="anim-fade-up delay-4 flex-1 rounded-2xl p-6 flex flex-col gap-4"
          style={{ background: "#f9fafb", border: "1.5px solid #e5e7eb" }}
        >
          <div>
            <span className="text-xs font-bold tracking-wide uppercase" style={{ color: "#374151" }}>
              Layer 2 — Fundraising Cause
            </span>
            <h3 className="text-xl font-bold mt-1" style={{ color: "#111827" }}>
              What purpose?
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            {["Mosque Roof Repair", "Ramadan Iftar Programme", "Hardship Support Fund", "Youth Programme", "Wudu-Area Renovation", "Qur'an Classes", "Sisters' Facilities", "General Operating"].map((t) => (
              <div
                key={t}
                className="flex items-center gap-2 rounded-lg px-3 py-2"
                style={{ background: "#fff", border: "1px solid #e5e7eb" }}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: "#9ca3af" }} />
                <span className="text-sm font-medium" style={{ color: "#374151" }}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="anim-fade-up delay-5 rounded-xl px-5 py-3 mt-4 text-center"
        style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
      >
        <p className="text-sm font-semibold" style={{ color: "#15803d" }}>
          Every donation gets both labels → treasurer always knows what the money is and what it's for.
        </p>
      </div>
    </SlideShell>
  );
}

function Slide15() {
  return (
    <SlideShell slideNum={15} label="Vision" accent>
      <div className="anim-fade-up mb-2">
        <span className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#16a34a" }}>
          The Vision
        </span>
      </div>
      <h2 className="anim-fade-up delay-1 text-4xl font-bold mb-4" style={{ color: "#111827" }}>
        From donation tracking to{" "}
        <span style={{ color: "#16a34a" }}>community treasury infrastructure</span>
      </h2>
      <div className="flex-1 flex flex-col gap-2">
        {[
          {
            phase: "Phase 1",
            title: "Collection Layer",
            desc: "QR donations, cash entry, kiosk payments — capture intention at the moment money enters",
            current: true,
          },
          {
            phase: "Phase 2",
            title: "Treasury Layer",
            desc: "Fund pots, restricted balances, campaign tracking — know what money exists and what it can be used for",
          },
          {
            phase: "Phase 3",
            title: "Expense Layer",
            desc: "Expense approvals, receipt uploads, spend categorisation — track where money goes",
          },
          {
            phase: "Phase 4",
            title: "Reporting Layer",
            desc: "Trustee reports, donor updates, Gift Aid exports — reduce admin, improve accountability",
          },
          {
            phase: "Phase 5",
            title: "Transparency Layer",
            desc: "Community-facing project and spending updates — rebuild trust between institutions and donors",
          },
          {
            phase: "Phase 6",
            title: "Intelligence Layer",
            desc: "Forecasting, budgeting, cash-flow insights — help organisations make better decisions",
          },
        ].map((row, i) => (
          <div
            key={row.phase}
            className={`anim-fade-up delay-${i + 1} flex items-center gap-5 rounded-xl px-6`}
            style={{
              background: row.current ? "#f0fdf4" : "#f9fafb",
              border: `1.5px solid ${row.current ? "#bbf7d0" : "#e5e7eb"}`,
              flex: 1,
            }}
          >
            <span
              className="text-xs font-bold tracking-wide w-16 shrink-0 uppercase"
              style={{ color: row.current ? "#16a34a" : "#9ca3af" }}
            >
              {row.phase}
            </span>
            <span
              className="text-base font-bold w-44 shrink-0"
              style={{ color: row.current ? "#111827" : "#374151" }}
            >
              {row.title}
              {row.current && (
                <span className="ml-2 text-xs px-1.5 py-0.5 rounded font-semibold" style={{ background: "#16a34a", color: "#fff" }}>
                  Now
                </span>
              )}
            </span>
            <span className="text-sm" style={{ color: "#6b7280" }}>
              {row.desc}
            </span>
          </div>
        ))}
      </div>
      <div
        className="anim-fade-up delay-6 rounded-xl px-5 py-3 mt-3 text-center"
        style={{ background: "#f0fdf4", border: "1.5px solid #bbf7d0" }}
      >
        <p className="text-sm font-semibold" style={{ color: "#15803d" }}>
          Getting data into one place is the hard part. Once structured, better decisions become easy.
        </p>
      </div>
    </SlideShell>
  );
}

/* ─── Slide Registry ────────────────────────────────── */

const SLIDES = [
  Slide1, Slide2, Slide3, Slide4, Slide5,
  Slide6, Slide7, Slide8, Slide9, Slide10,
  Slide11, Slide12, Slide13, Slide14, Slide15,
];

/* ─── Main Component ────────────────────────────────── */

export default function NoorSlides({ initialSlide = 0 }: { initialSlide?: number }) {
  const [current, setCurrent] = useState(initialSlide);
  const [direction, setDirection] = useState<Direction>("forward");
  const [key, setKey] = useState(0);

  const goTo = (index: number, dir: Direction) => {
    if (index < 0 || index >= TOTAL_SLIDES) return;
    setDirection(dir);
    setKey((k) => k + 1);
    setCurrent(index);
  };

  const next = () => goTo(current + 1, "forward");
  const prev = () => goTo(current - 1, "backward");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        next();
      }
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        prev();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  const SlideComponent = SLIDES[current];

  return (
    <div
      className="relative w-full h-full overflow-hidden"
      style={{ background: "#fff", fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Full-screen slide */}
      <SlideWrapper key={key} direction={direction} slideKey={key}>
        <SlideComponent />
      </SlideWrapper>

      {/* Left arrow */}
      {current > 0 && (
        <a
          href={`/info?slide=${current}`}
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-all"
          style={{
            background: "rgba(255,255,255,0.9)",
            border: "1.5px solid #bbf7d0",
            color: "#15803d",
            boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
            cursor: "pointer",
            zIndex: 50,
          }}
          aria-label="Previous slide"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9L11 14" stroke="#15803d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}

      {/* Right arrow */}
      {current < TOTAL_SLIDES - 1 && (
        <a
          href={`/info?slide=${current + 2}`}
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-10 h-10 rounded-full transition-all"
          style={{
            background: "#16a34a",
            border: "1.5px solid #15803d",
            color: "#fff",
            boxShadow: "0 2px 8px rgba(22,163,74,0.25)",
            cursor: "pointer",
            zIndex: 50,
          }}
          aria-label="Next slide"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M7 4L12 9L7 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      )}

      {/* Dot indicators — bottom overlay */}
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5"
        style={{ zIndex: 50 }}
      >
        {SLIDES.map((_, i) => (
          <a
            href={`/info?slide=${i + 1}`}
            key={i}
            onClick={() => goTo(i, i > current ? "forward" : "backward")}
            className="transition-all rounded-full"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background: i === current ? "#16a34a" : "#bbf7d0",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
