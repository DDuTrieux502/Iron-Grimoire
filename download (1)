import { useState, useEffect, useMemo } from "react";

// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════

const EXERCISE_INFO = {
  "Leg Press": { movement: "legpress", cues: ["Feet shoulder-width on platform", "Lower until knees ~90°", "Don't lock knees at top", "Keep lower back pressed to pad"] },
  "Chest Press": { movement: "push", cues: ["Retract shoulder blades", "Elbows around 45° from torso", "Full range of motion", "Control the return"] },
  "Shoulder Press": { movement: "overhead", cues: ["Neutral spine, core tight", "Press directly overhead", "Don't flare elbows excessively", "Slow eccentric"] },
  "Triceps Extension": { movement: "tricep", cues: ["Elbows fixed at sides", "Squeeze triceps at bottom", "Full stretch at top", "Slow controlled tempo"] },
  "Leg Extension": { movement: "legext", cues: ["Smooth control throughout", "Pause briefly at top", "No momentum or swinging", "Full range of motion"] },
  "Cable Face Pulls": { movement: "facepull", cues: ["Rope attachment at face height", "Pull to forehead level", "External rotation at end", "Squeeze rear delts"] },
  "Lat Pulldown": { movement: "pulldown", cues: ["Pull bar to upper chest", "Slight backward lean", "Drive elbows down and back", "No swinging or bouncing"] },
  "Seated Row": { movement: "row", cues: ["Chest up, shoulders back", "Squeeze shoulder blades together", "Don't shrug", "Control the return"] },
  "Biceps Curl": { movement: "curl", cues: ["Elbows pinned to sides", "Full range of motion", "Squeeze at the top", "Slow eccentric (3 seconds)"] },
  "Leg Press (narrow)": { movement: "legpress", cues: ["Feet close together", "Emphasizes quads", "Don't lock knees", "Control tempo"] },
  "Seated Leg Curl": { movement: "legcurl", cues: ["Flex at the knees", "Squeeze hamstrings hard", "Smooth controlled tempo", "Full range"] },
  "Cable Pallof Press": { movement: "pallof", cues: ["Resist rotation — core tight", "Press straight out from chest", "Don't twist torso", "Hold extended briefly"] },
  "Incline Press": { movement: "push", cues: ["Upper chest focus", "Elbows tucked slightly", "Full range of motion", "Stable core, no arching"] },
  "DB Lateral Raises": { movement: "lateral", cues: ["Slight bend in elbows", "Lead with elbows", "Don't shrug shoulders", "Control descent"] },
  "Cable Triceps Pushdown": { movement: "tricep", cues: ["Elbows pinned at sides", "Squeeze triceps at bottom", "Slow return up", "Don't lean forward"] },
};

const DEFAULT_WORKOUTS = {
  A: { name: "Day A — Push Focus", sigil: "⚔", exercises: [
    { id: "a1", name: "Leg Press", sets: 3, targetReps: 12 },
    { id: "a2", name: "Chest Press", sets: 3, targetReps: 10 },
    { id: "a3", name: "Shoulder Press", sets: 3, targetReps: 10 },
    { id: "a4", name: "Triceps Extension", sets: 3, targetReps: 12 },
    { id: "a5", name: "Leg Extension", sets: 3, targetReps: 12 },
    { id: "a6", name: "Cable Face Pulls", sets: 3, targetReps: 15 },
  ]},
  B: { name: "Day B — Pull Focus", sigil: "🛡", exercises: [
    { id: "b1", name: "Lat Pulldown", sets: 3, targetReps: 10 },
    { id: "b2", name: "Seated Row", sets: 3, targetReps: 10 },
    { id: "b3", name: "Biceps Curl", sets: 3, targetReps: 12 },
    { id: "b4", name: "Leg Press (narrow)", sets: 3, targetReps: 12 },
    { id: "b5", name: "Seated Leg Curl", sets: 3, targetReps: 12 },
    { id: "b6", name: "Cable Pallof Press", sets: 3, targetReps: 10, note: "per side" },
  ]},
  C: { name: "Day C — Balanced", sigil: "⚖", exercises: [
    { id: "c1", name: "Incline Press", sets: 3, targetReps: 10 },
    { id: "c2", name: "Seated Row", sets: 3, targetReps: 10 },
    { id: "c3", name: "Leg Extension", sets: 3, targetReps: 12 },
    { id: "c4", name: "Seated Leg Curl", sets: 3, targetReps: 12 },
    { id: "c5", name: "DB Lateral Raises", sets: 3, targetReps: 12 },
    { id: "c6", name: "Cable Triceps Pushdown", sets: 3, targetReps: 12 },
    { id: "c7", name: "Biceps Curl", sets: 2, targetReps: 12 },
  ]},
};

// Tier-based rank system
const TIERS = [
  { rank: "E", name: "Initiate",     emblem: "◇", color: "#6b6252", xpPerLvl: 100 },
  { rank: "D", name: "Acolyte",      emblem: "◈", color: "#8b7a5e", xpPerLvl: 200 },
  { rank: "C", name: "Adept",        emblem: "⬥", color: "#a6886e", xpPerLvl: 400 },
  { rank: "B", name: "Warden",       emblem: "✦", color: "#c4a96a", xpPerLvl: 700 },
  { rank: "A", name: "Sovereign",    emblem: "✧", color: "#d4b87a", xpPerLvl: 1200 },
  { rank: "S", name: "Ascendant",    emblem: "⚜", color: "#e8cb8c", xpPerLvl: 2000 },
  { rank: "SS", name: "Transcendent", emblem: "☉", color: "#9cb4c4", xpPerLvl: 3500 },
  { rank: "SSS", name: "Mythic",     emblem: "✴", color: "#b89cc4", xpPerLvl: 6000 },
  { rank: "M", name: "Monarch",      emblem: "⦿", color: "#d4a4a4", xpPerLvl: 10000 },
];

function generateRanks(scale = 1) {
  const levels = []; let cumXP = 0; let lvl = 1;
  TIERS.forEach(tier => {
    for (let i = 1; i <= 10; i++) {
      levels.push({ level: lvl++, tier: tier.rank, tierName: tier.name, emblem: tier.emblem, color: tier.color, xp: Math.round(cumXP * scale), subLevel: i });
      cumXP += tier.xpPerLvl;
    }
  });
  return levels;
}
const IRON_RANKS = generateRanks(1);
const DISC_RANKS = generateRanks(0.25);
const MIND_RANKS = generateRanks(0.2);
const MAX_LEVEL = 90;

const PRESET_HABITS = [
  { id: "h_water", name: "Drink water", icon: "💧" },
  { id: "h_meds", name: "Take medication", icon: "⚕" },
  { id: "h_read", name: "Read", icon: "📖" },
  { id: "h_journal", name: "Journal", icon: "🪶" },
  { id: "h_walk", name: "Walk outside", icon: "🌿" },
  { id: "h_sleep", name: "8hrs sleep", icon: "🌙" },
  { id: "h_stretch", name: "Stretch", icon: "☯" },
  { id: "h_craft", name: "Practice craft", icon: "✦" },
  { id: "h_tarot", name: "Draw a card", icon: "🃏" },
  { id: "h_notech", name: "No screens after 9pm", icon: "🌑" },
];

const MEDITATION_PRESETS = [5, 10, 15, 20, 30];

const DEFAULT_MED_TYPES = [
  { id: "silent", name: "Silent", icon: "☽", desc: "Sit in stillness" },
  { id: "breathwork", name: "Breathwork", icon: "🌬", desc: "Focused breathing patterns" },
  { id: "bodyscan", name: "Body Scan", icon: "✦", desc: "Progressive awareness through the body" },
  { id: "visualization", name: "Visualization", icon: "🌀", desc: "Inner imagery and intention" },
  { id: "openaware", name: "Open Awareness", icon: "◎", desc: "Observe without attachment" },
];

const DEFAULT_SIGILS = ["⚔","🛡","⚖","✦","◆","☉","✧","⬥","⚜","★"];

const BODY_METRICS = [
  { id: "weight", name: "Weight", unit: "lbs", icon: "⚖" },
  { id: "bodyfat", name: "Body Fat", unit: "%", icon: "◈" },
  { id: "chest", name: "Chest", unit: "in", icon: "◉" },
  { id: "waist", name: "Waist", unit: "in", icon: "◐" },
  { id: "hips", name: "Hips", unit: "in", icon: "◑" },
  { id: "arms", name: "Arms", unit: "in", icon: "✧" },
  { id: "thighs", name: "Thighs", unit: "in", icon: "⬥" },
];

const LOG_FREQUENCIES = [
  { id: "daily", name: "Daily", desc: "Log whenever you want" },
  { id: "weekly", name: "Weekly", desc: "Sunday reminders on home screen" },
  { id: "manual", name: "Manual", desc: "No prompts, log whenever" },
];

// ═══════════════════════════════════════════════════════════════
// STRIDE (CARDIO/RUNNING)
// ═══════════════════════════════════════════════════════════════

const RUN_TYPES = [
  { id: "easy", name: "Easy Run", icon: "🌿", desc: "Conversational pace" },
  { id: "tempo", name: "Tempo Run", icon: "🔥", desc: "Comfortably hard" },
  { id: "interval", name: "Intervals", icon: "⚡", desc: "High intensity bursts" },
  { id: "long", name: "Long Run", icon: "🌄", desc: "Endurance building" },
  { id: "recovery", name: "Recovery", icon: "🌱", desc: "Very easy, short" },
  { id: "walk", name: "Walk", icon: "🚶", desc: "Active recovery" },
  { id: "race", name: "Race", icon: "🏁", desc: "Official event" },
];

const EFFORT_LEVELS = [
  { val: 1, name: "Effortless", color: "#9cb4c4" },
  { val: 2, name: "Easy", color: "#a0c49c" },
  { val: 3, name: "Steady", color: "#c4c49c" },
  { val: 4, name: "Moderate", color: "#c4a96a" },
  { val: 5, name: "Comfortably Hard", color: "#d4a06a" },
  { val: 6, name: "Hard", color: "#d48a6a" },
  { val: 7, name: "Very Hard", color: "#d47a6a" },
  { val: 8, name: "Max Effort", color: "#c46a6a" },
];

const WEATHER_OPTIONS = [
  { id: "sunny", name: "Sunny", icon: "☀" },
  { id: "cloudy", name: "Cloudy", icon: "☁" },
  { id: "rain", name: "Rain", icon: "🌧" },
  { id: "snow", name: "Snow", icon: "❄" },
  { id: "wind", name: "Windy", icon: "💨" },
  { id: "cold", name: "Cold", icon: "🥶" },
  { id: "hot", name: "Hot", icon: "🌡" },
  { id: "treadmill", name: "Indoor", icon: "🏠" },
];

// ═══════════════════════════════════════════════════════════════
// TRAINING PROGRAMS
// Each segment: { type: "run"|"walk", seconds: N } OR { type: "distance", miles: N, desc: "..." }
// For distance-based runs, user just logs total distance + time
// For interval runs, user follows the timed segments
// ═══════════════════════════════════════════════════════════════

function buildC25K() {
  // Couch to 5K — 9 weeks, 3 workouts/week, interval-based
  const weeks = [
    // Week 1: Alternating 60s run / 90s walk × 8 (20 min)
    { w:1, workouts: [{ d:1, segments: [{t:"walk",s:300},...Array(8).fill([{t:"run",s:60},{t:"walk",s:90}]).flat(),{t:"walk",s:300}] }]},
    // Week 2: 90s run / 2m walk × 6
    { w:2, workouts: [{ d:1, segments: [{t:"walk",s:300},...Array(6).fill([{t:"run",s:90},{t:"walk",s:120}]).flat(),{t:"walk",s:300}] }]},
    // Week 3: 90s run, 90s walk, 3m run, 3m walk × 2
    { w:3, workouts: [{ d:1, segments: [{t:"walk",s:300},...Array(2).fill([{t:"run",s:90},{t:"walk",s:90},{t:"run",s:180},{t:"walk",s:180}]).flat(),{t:"walk",s:300}] }]},
    // Week 4: 3m run, 90s walk, 5m run, 2.5m walk, 3m run, 90s walk, 5m run
    { w:4, workouts: [{ d:1, segments: [{t:"walk",s:300},{t:"run",s:180},{t:"walk",s:90},{t:"run",s:300},{t:"walk",s:150},{t:"run",s:180},{t:"walk",s:90},{t:"run",s:300},{t:"walk",s:300}] }]},
    // Week 5 day 1: 5m run, 3m walk, 5m run, 3m walk, 5m run
    { w:5, workouts: [
      { d:1, segments: [{t:"walk",s:300},{t:"run",s:300},{t:"walk",s:180},{t:"run",s:300},{t:"walk",s:180},{t:"run",s:300},{t:"walk",s:300}] },
      // Day 2: 8m run, 5m walk, 8m run
      { d:2, segments: [{t:"walk",s:300},{t:"run",s:480},{t:"walk",s:300},{t:"run",s:480},{t:"walk",s:300}] },
      // Day 3: 20 min continuous run
      { d:3, segments: [{t:"walk",s:300},{t:"run",s:1200},{t:"walk",s:300}] },
    ]},
    // Week 6 day 1: 5m run, 3m walk, 8m run, 3m walk, 5m run
    { w:6, workouts: [
      { d:1, segments: [{t:"walk",s:300},{t:"run",s:300},{t:"walk",s:180},{t:"run",s:480},{t:"walk",s:180},{t:"run",s:300},{t:"walk",s:300}] },
      // Day 2: 10m run, 3m walk, 10m run
      { d:2, segments: [{t:"walk",s:300},{t:"run",s:600},{t:"walk",s:180},{t:"run",s:600},{t:"walk",s:300}] },
      // Day 3: 25 min continuous run
      { d:3, segments: [{t:"walk",s:300},{t:"run",s:1500},{t:"walk",s:300}] },
    ]},
    // Week 7: 25 min continuous × 3
    { w:7, workouts: Array(3).fill(0).map((_,i)=>({ d:i+1, segments: [{t:"walk",s:300},{t:"run",s:1500},{t:"walk",s:300}] }))},
    // Week 8: 28 min continuous × 3
    { w:8, workouts: Array(3).fill(0).map((_,i)=>({ d:i+1, segments: [{t:"walk",s:300},{t:"run",s:1680},{t:"walk",s:300}] }))},
    // Week 9: 30 min continuous × 3 — finished 5K!
    { w:9, workouts: Array(3).fill(0).map((_,i)=>({ d:i+1, segments: [{t:"walk",s:300},{t:"run",s:1800},{t:"walk",s:300}] }))},
  ];
  const flat = [];
  weeks.forEach(wk => wk.workouts.forEach(wo => flat.push({ week: wk.w, day: wo.d, segments: wo.segments, type: "interval" })));
  return flat;
}

function buildDistanceProgram(name, weeks, longRunProgression) {
  // Generic distance program: 3-4 workouts/week, mix of easy/tempo/long
  const flat = [];
  longRunProgression.forEach((miles, idx) => {
    const week = idx + 1;
    flat.push({ week, day: 1, type: "easy", miles: Math.max(2, Math.round(miles * 0.4)), desc: "Easy run" });
    flat.push({ week, day: 2, type: "tempo", miles: Math.max(2, Math.round(miles * 0.45)), desc: "Tempo run" });
    flat.push({ week, day: 3, type: "long", miles: miles, desc: "Long run" });
  });
  return flat;
}

// 5K → 10K: 6 weeks, long run builds from 3 → 6 miles
const LONG_5K_TO_10K = [3, 3.5, 4, 4.5, 5, 6];
// Half Marathon: 12 weeks, long run builds from 4 → 12 miles with taper
const LONG_HALF = [4, 5, 5, 6, 7, 7, 8, 9, 10, 11, 12, 8];
// Marathon: 18 weeks, long run builds from 6 → 20 miles with tapers
const LONG_MARATHON = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 14, 17, 18, 20, 14, 12, 8];

// Treadmill Incline Pyramid — repeatable 20-min standalone workout
const INCLINE_PYRAMID_SEGMENTS = [
  { zone: "Warm-Up", speed: 3.0, incline: 0, seconds: 180, desc: "Wakes up joints, warms muscles, preps your heart rate." },
  { zone: "Incline Walk (Zone 1)", speed: 3.5, incline: 8, seconds: 300, desc: "Fires glutes + hamstrings while maximizing fat oxidation." },
  { zone: "Steep Incline Walk (Zone 2)", speed: 3.0, incline: 12, seconds: 300, desc: "Higher incline = higher calorie burn without impact." },
  { zone: "Power Walk (Zone 3)", speed: 3.8, incline: 6, seconds: 300, desc: "Pushes endurance, elevates cardio capacity, finishes strong." },
  { zone: "Cool-Down", speed: 2.8, incline: 0, seconds: 120, desc: "Brings heart rate down and supports recovery." },
];

const STRIDE_PROGRAMS = {
  c25k: { id: "c25k", name: "Couch to 5K", icon: "🌱", weeks: 9, desc: "Start from zero. Build to running 5K (3.1 mi) in 9 weeks.", workouts: buildC25K() },
  b10k: { id: "b10k", name: "5K to 10K", icon: "🏃", weeks: 6, desc: "Build from 5K to 10K (6.2 mi) in 6 weeks.", workouts: buildDistanceProgram("5K to 10K", 6, LONG_5K_TO_10K) },
  half: { id: "half", name: "Half Marathon", icon: "🏅", weeks: 12, desc: "Build to 13.1 miles in 12 weeks.", workouts: buildDistanceProgram("Half Marathon", 12, LONG_HALF) },
  full: { id: "full", name: "Full Marathon", icon: "🏆", weeks: 18, desc: "Build to 26.2 miles in 18 weeks.", workouts: buildDistanceProgram("Marathon", 18, LONG_MARATHON) },
  incline: { id: "incline", name: "Incline Pyramid", icon: "🏔", weeks: 0, desc: "20-minute treadmill zone workout. Warm-up → incline walks → power walk → cool-down. Do this whenever — no week progression.", workouts: [], standalone: true, segments: INCLINE_PYRAMID_SEGMENTS },
};

const STRIDE_TIERS = [
  { rank: "E", name: "Walker",     emblem: "🚶", color: "#6b6252", xpPerLvl: 100 },
  { rank: "D", name: "Jogger",     emblem: "🌱", color: "#8b7a5e", xpPerLvl: 200 },
  { rank: "C", name: "Runner",     emblem: "🏃", color: "#a0c49c", xpPerLvl: 400 },
  { rank: "B", name: "Distance",   emblem: "🏅", color: "#9cb4c4", xpPerLvl: 700 },
  { rank: "A", name: "Endurance",  emblem: "🏆", color: "#c4a96a", xpPerLvl: 1200 },
  { rank: "S", name: "Marathoner", emblem: "🦅", color: "#d4b87a", xpPerLvl: 2000 },
  { rank: "SS", name: "Ultrarunner", emblem: "☄", color: "#e8cb8c", xpPerLvl: 3500 },
  { rank: "SSS", name: "Legend",   emblem: "✴", color: "#b89cc4", xpPerLvl: 6000 },
  { rank: "M", name: "Immortal",   emblem: "♾", color: "#d4a4a4", xpPerLvl: 10000 },
];

function generateStrideRanks() {
  const levels = []; let cumXP = 0; let lvl = 1;
  STRIDE_TIERS.forEach(tier => {
    for (let i = 1; i <= 10; i++) {
      levels.push({ level: lvl++, tier: tier.rank, tierName: tier.name, emblem: tier.emblem, color: tier.color, xp: cumXP, subLevel: i });
      cumXP += tier.xpPerLvl;
    }
  });
  return levels;
}
const STRIDE_RANKS = generateStrideRanks();

// ═══════════════════════════════════════════════════════════════
// ACHIEVEMENTS (75 total)
// ═══════════════════════════════════════════════════════════════

const ACHIEVEMENTS = [
  // Iron — Sessions
  { id: "iron_first", cat: "iron", name: "First Blood", desc: "Complete your first workout", icon: "🩸", check: s => s.totalSessions >= 1 },
  { id: "iron_10", cat: "iron", name: "Iron Disciple", desc: "Complete 10 sessions", icon: "⚔", check: s => s.totalSessions >= 10 },
  { id: "iron_25", cat: "iron", name: "Forged in Fire", desc: "Complete 25 sessions", icon: "🔥", check: s => s.totalSessions >= 25 },
  { id: "iron_50", cat: "iron", name: "Unbreakable", desc: "Complete 50 sessions", icon: "🛡", check: s => s.totalSessions >= 50 },
  { id: "iron_100", cat: "iron", name: "Living Legend", desc: "Complete 100 sessions", icon: "👑", check: s => s.totalSessions >= 100 },
  { id: "iron_250", cat: "iron", name: "Eternal", desc: "Complete 250 sessions", icon: "♾", check: s => s.totalSessions >= 250 },
  // Iron — Volume
  { id: "vol_10k", cat: "iron", name: "Heavy Hands", desc: "10,000 lbs in one session", icon: "🪨", check: s => s.bestVolume >= 10000 },
  { id: "vol_25k", cat: "iron", name: "Earth Shaker", desc: "25,000 lbs in one session", icon: "⚡", check: s => s.bestVolume >= 25000 },
  { id: "vol_50k", cat: "iron", name: "Titan's Burden", desc: "50,000 lbs in one session", icon: "🌋", check: s => s.bestVolume >= 50000 },
  { id: "vol_100k", cat: "iron", name: "World Breaker", desc: "100,000 lbs in one session", icon: "💥", check: s => s.bestVolume >= 100000 },
  { id: "vol_total_1m", cat: "iron", name: "Volume Lord", desc: "1,000,000 lbs total volume", icon: "🗿", check: s => s.totalVolume >= 1000000 },
  // Iron — Practice
  { id: "iron_perfect", cat: "iron", name: "Perfect Ritual", desc: "Complete every set in a workout", icon: "✨", check: s => s.hadPerfectSession },
  { id: "iron_trinity", cat: "iron", name: "Sacred Trinity", desc: "Complete Day A, B, and C", icon: "⚖", check: s => s.daysCompleted.A && s.daysCompleted.B && s.daysCompleted.C },
  { id: "iron_dawn", cat: "iron", name: "Dawn Trainer", desc: "10 sessions before 7am", icon: "🌅", check: s => s.dawnSessions >= 10 },
  { id: "iron_night", cat: "iron", name: "Night Owl", desc: "10 sessions after 9pm", icon: "🌒", check: s => s.nightSessions >= 10 },
  { id: "iron_monthly", cat: "iron", name: "Monthly Oath", desc: "12 sessions in one month", icon: "📅", check: s => s.bestMonthlySessions >= 12 },
  // Iron — Set milestones
  { id: "sets_100", cat: "iron", name: "Century Club", desc: "Complete 100 total sets", icon: "💯", check: s => s.totalSetsCompleted >= 100 },
  { id: "sets_500", cat: "iron", name: "Set Conqueror", desc: "Complete 500 total sets", icon: "🎯", check: s => s.totalSetsCompleted >= 500 },
  { id: "sets_1000", cat: "iron", name: "Iron Ritualist", desc: "Complete 1,000 total sets", icon: "🏛", check: s => s.totalSetsCompleted >= 1000 },
  // Iron — PRs
  { id: "pr_chest_150", cat: "iron", name: "Chest Master", desc: "Chest Press 150+ lbs", icon: "💪", check: s => (s.prs["a2"] || 0) >= 150 },
  { id: "pr_back_150", cat: "iron", name: "Back Master", desc: "Lat Pulldown 150+ lbs", icon: "🦾", check: s => (s.prs["b1"] || 0) >= 150 },
  { id: "pr_leg_300", cat: "iron", name: "Leg Master", desc: "Leg Press 300+ lbs", icon: "🦿", check: s => (s.prs["a1"] || 0) >= 300 || (s.prs["b4"] || 0) >= 300 },
  // Iron — Streaks
  { id: "week_1", cat: "iron", name: "First Rite", desc: "3 sessions in one week", icon: "📜", check: s => s.weekStreak >= 1 },
  { id: "week_4", cat: "iron", name: "Month of Iron", desc: "4-week training streak", icon: "🌙", check: s => s.weekStreak >= 4 },
  { id: "week_12", cat: "iron", name: "Rite of Passage", desc: "12-week training streak", icon: "🏛", check: s => s.weekStreak >= 12 },

  // Discipline — Habits
  { id: "hab_first", cat: "disc", name: "First Ritual", desc: "Complete your first habit", icon: "✨", check: s => s.totalHabitCompletions >= 1 },
  { id: "hab_7day", cat: "disc", name: "Sevenfold", desc: "7 habits completed in one day", icon: "🌟", check: s => s.bestHabitsInDay >= 7 },
  { id: "hab_streak_7", cat: "disc", name: "Devotee", desc: "7-day streak on any habit", icon: "🔥", check: s => s.longestHabitStreak >= 7 },
  { id: "hab_streak_30", cat: "disc", name: "Keeper of Rites", desc: "30-day streak on any habit", icon: "⛩", check: s => s.longestHabitStreak >= 30 },
  { id: "hab_streak_100", cat: "disc", name: "The Unwavering", desc: "100-day streak on any habit", icon: "🗿", check: s => s.longestHabitStreak >= 100 },
  { id: "hab_streak_365", cat: "disc", name: "Year of Iron", desc: "365-day streak on any habit", icon: "👑", check: s => s.longestHabitStreak >= 365 },
  { id: "hab_variety_5", cat: "disc", name: "Varied Practice", desc: "5+ active habits", icon: "🌸", check: s => s.activeHabits >= 5 },
  { id: "hab_collector", cat: "disc", name: "Collector", desc: "Add all 10 preset habits", icon: "📿", check: s => s.presetsAdded >= 10 },
  { id: "hab_architect", cat: "disc", name: "Architect", desc: "Create 5 custom habits", icon: "🏗", check: s => s.customHabitsCreated >= 5 },
  { id: "hab_100", cat: "disc", name: "The Consistent", desc: "100 total habit completions", icon: "💫", check: s => s.totalHabitCompletions >= 100 },
  { id: "hab_500", cat: "disc", name: "Oath Keeper", desc: "500 total completions", icon: "📖", check: s => s.totalHabitCompletions >= 500 },
  { id: "hab_1000", cat: "disc", name: "Thousand Rites", desc: "1,000 total completions", icon: "🏯", check: s => s.totalHabitCompletions >= 1000 },
  { id: "hab_craft_30", cat: "disc", name: "Witch's Oath", desc: "30 days of 'Practice craft'", icon: "🔮", check: s => (s.habitTotals["h_craft"] || 0) >= 30 },
  { id: "hab_water_100", cat: "disc", name: "The Hydrated", desc: "100 days of water tracked", icon: "🌊", check: s => (s.habitTotals["h_water"] || 0) >= 100 },
  { id: "hab_sleep_30", cat: "disc", name: "Dream Walker", desc: "30 days of 8hr sleep", icon: "☁", check: s => (s.habitTotals["h_sleep"] || 0) >= 30 },
  { id: "hab_read_50", cat: "disc", name: "The Scholar", desc: "50 days of reading", icon: "📚", check: s => (s.habitTotals["h_read"] || 0) >= 50 },
  { id: "hab_journal_50", cat: "disc", name: "The Scribe", desc: "50 days of journaling", icon: "🪶", check: s => (s.habitTotals["h_journal"] || 0) >= 50 },
  { id: "hab_walk_100", cat: "disc", name: "The Grounded", desc: "100 days of walks", icon: "🌲", check: s => (s.habitTotals["h_walk"] || 0) >= 100 },

  // Mind — Meditation
  { id: "med_first", cat: "mind", name: "First Breath", desc: "Complete your first meditation", icon: "☽", check: s => s.totalMeditations >= 1 },
  { id: "med_10", cat: "mind", name: "Stilled Mind", desc: "10 meditation sessions", icon: "◐", check: s => s.totalMeditations >= 10 },
  { id: "med_25", cat: "mind", name: "The Contemplative", desc: "25 sessions", icon: "◑", check: s => s.totalMeditations >= 25 },
  { id: "med_100", cat: "mind", name: "The Sage", desc: "100 sessions", icon: "☯", check: s => s.totalMeditations >= 100 },
  { id: "med_long_20", cat: "mind", name: "Deep Presence", desc: "Complete a 20+ min session", icon: "🌀", check: s => s.longestMeditation >= 20 },
  { id: "med_long_60", cat: "mind", name: "The Hermit", desc: "Complete a 60+ min session", icon: "⛰", check: s => s.longestMeditation >= 60 },
  { id: "med_journals_10", cat: "mind", name: "Reflections", desc: "Write 10 journal entries", icon: "📜", check: s => s.medJournalCount >= 10 },
  { id: "med_journals_50", cat: "mind", name: "Sage's Journal", desc: "Write 50 journal entries", icon: "✒", check: s => s.medJournalCount >= 50 },
  { id: "med_streak_7", cat: "mind", name: "Ritual of Stillness", desc: "7-day meditation streak", icon: "🕯", check: s => s.medStreak >= 7 },
  { id: "med_streak_30", cat: "mind", name: "Monk's Path", desc: "30-day meditation streak", icon: "🏔", check: s => s.medStreak >= 30 },
  { id: "med_total_60", cat: "mind", name: "Hour of Clarity", desc: "60 total minutes meditated", icon: "⏳", check: s => s.totalMedMinutes >= 60 },
  { id: "med_total_600", cat: "mind", name: "Ten Hour Path", desc: "600 total minutes", icon: "⏱", check: s => s.totalMedMinutes >= 600 },
  { id: "med_total_1440", cat: "mind", name: "Day of Stillness", desc: "1,440 total minutes (24 hrs)", icon: "🌅", check: s => s.totalMedMinutes >= 1440 },

  // Cross-Pillar
  { id: "x_trinity", cat: "cross", name: "Trinity", desc: "All three pillars in one day", icon: "☘", check: s => s.trinityDays >= 1 },
  { id: "x_trinity_7", cat: "cross", name: "Sacred Week", desc: "Trinity 7 days", icon: "🔱", check: s => s.trinityDays >= 7 },
  { id: "x_trinity_30", cat: "cross", name: "Month of Trinity", desc: "Trinity 30 days", icon: "✡", check: s => s.trinityDays >= 30 },
  { id: "x_awakened", cat: "cross", name: "Awakened", desc: "Reach Lvl 10 in any pillar", icon: "◈", check: s => s.maxAnyLevel >= 10 },
  { id: "x_hunter", cat: "cross", name: "Rank D", desc: "Reach Lvl 20 in any pillar", icon: "⬥", check: s => s.maxAnyLevel >= 20 },
  { id: "x_adept", cat: "cross", name: "Rank C", desc: "Reach Lvl 30 in any pillar", icon: "✦", check: s => s.maxAnyLevel >= 30 },
  { id: "x_warden", cat: "cross", name: "Rank B", desc: "Reach Lvl 40 in any pillar", icon: "✧", check: s => s.maxAnyLevel >= 40 },
  { id: "x_sovereign", cat: "cross", name: "Rank A", desc: "Reach Lvl 50 in any pillar", icon: "⚜", check: s => s.maxAnyLevel >= 50 },
  { id: "x_ascendant", cat: "cross", name: "Rank S", desc: "Reach Lvl 60 in any pillar", icon: "☉", check: s => s.maxAnyLevel >= 60 },
  { id: "x_mythic", cat: "cross", name: "Rank SSS", desc: "Reach Lvl 80 in any pillar", icon: "✴", check: s => s.maxAnyLevel >= 80 },
  { id: "x_monarch", cat: "cross", name: "The Monarch", desc: "Reach Lvl 90 in any pillar", icon: "⦿", check: s => s.maxAnyLevel >= 90 },
  { id: "x_balanced_20", cat: "cross", name: "Balanced Path", desc: "All 3 pillars past Lvl 20", icon: "☯", check: s => s.minAnyLevel >= 20 },
  { id: "x_balanced_40", cat: "cross", name: "Harmony", desc: "All 3 pillars past Lvl 40", icon: "☸", check: s => s.minAnyLevel >= 40 },
  { id: "x_quest_10", cat: "cross", name: "Quest Seeker", desc: "Complete 10 quests", icon: "📋", check: s => s.questsCompleted >= 10 },
  { id: "x_quest_50", cat: "cross", name: "Quest Master", desc: "Complete 50 quests", icon: "🗡", check: s => s.questsCompleted >= 50 },
  { id: "x_quest_200", cat: "cross", name: "Quest Legend", desc: "Complete 200 quests", icon: "🏆", check: s => s.questsCompleted >= 200 },
  { id: "x_ascended", cat: "cross", name: "Ascended Soul", desc: "First ascension", icon: "✺", check: s => s.ascensions >= 1 },
  { id: "x_ascended_3", cat: "cross", name: "Thrice Ascended", desc: "Ascend 3 times", icon: "❃", check: s => s.ascensions >= 3 },

  // Body Almanac
  { id: "body_first", cat: "disc", name: "Scrying Begins", desc: "Log your first measurement", icon: "⚖", check: s => s.bodyLogCount >= 1 },
  { id: "body_10", cat: "disc", name: "Chronicler of Form", desc: "Log measurements 10 times", icon: "📐", check: s => s.bodyLogCount >= 10 },
  { id: "body_50", cat: "disc", name: "Vessel Scholar", desc: "Log measurements 50 times", icon: "📊", check: s => s.bodyLogCount >= 50 },
  { id: "body_streak_4", cat: "disc", name: "Month of Reflection", desc: "Log measurements 4 weeks in a row", icon: "🌙", check: s => s.bodyWeeklyStreak >= 4 },
  { id: "body_full", cat: "disc", name: "Complete Portrait", desc: "Log all 7 metrics in one session", icon: "🎯", check: s => s.bodyFullEntryCount >= 1 },

  // Stride (Running/Cardio)
  { id: "stride_first", cat: "stride", name: "First Steps", desc: "Log your first run or walk", icon: "👟", check: s => s.totalRuns >= 1 },
  { id: "stride_10", cat: "stride", name: "The Regular", desc: "Complete 10 runs", icon: "🏃", check: s => s.totalRuns >= 10 },
  { id: "stride_25", cat: "stride", name: "Road Warrior", desc: "Complete 25 runs", icon: "⚡", check: s => s.totalRuns >= 25 },
  { id: "stride_100", cat: "stride", name: "Century Runner", desc: "Complete 100 runs", icon: "💯", check: s => s.totalRuns >= 100 },
  { id: "stride_1mi", cat: "stride", name: "First Mile", desc: "Run 1 continuous mile", icon: "1️⃣", check: s => s.longestRun >= 1 },
  { id: "stride_5k", cat: "stride", name: "5K Finisher", desc: "Complete a 5K (3.1 mi)", icon: "🌱", check: s => s.longestRun >= 3.1 },
  { id: "stride_10k", cat: "stride", name: "10K Finisher", desc: "Complete a 10K (6.2 mi)", icon: "🏃", check: s => s.longestRun >= 6.2 },
  { id: "stride_half", cat: "stride", name: "Half Marathoner", desc: "Complete 13.1 miles", icon: "🏅", check: s => s.longestRun >= 13.1 },
  { id: "stride_full", cat: "stride", name: "Marathoner", desc: "Complete 26.2 miles", icon: "🏆", check: s => s.longestRun >= 26.2 },
  { id: "stride_total_10", cat: "stride", name: "Ten Miles Down", desc: "10 total miles logged", icon: "📏", check: s => s.totalMiles >= 10 },
  { id: "stride_total_50", cat: "stride", name: "Fifty Miles", desc: "50 total miles logged", icon: "🗺", check: s => s.totalMiles >= 50 },
  { id: "stride_total_100", cat: "stride", name: "Centurion", desc: "100 total miles logged", icon: "🎖", check: s => s.totalMiles >= 100 },
  { id: "stride_total_500", cat: "stride", name: "500 Miles", desc: "500 total miles logged", icon: "🌍", check: s => s.totalMiles >= 500 },
  { id: "stride_total_1000", cat: "stride", name: "Thousand Mile Stare", desc: "1,000 total miles logged", icon: "♾", check: s => s.totalMiles >= 1000 },
  { id: "stride_program_complete", cat: "stride", name: "Program Complete", desc: "Finish any training program", icon: "🎓", check: s => s.programsCompleted >= 1 },
  { id: "stride_c25k", cat: "stride", name: "Off the Couch", desc: "Complete Couch to 5K", icon: "🌱", check: s => s.c25kComplete },
  { id: "stride_streak_3", cat: "stride", name: "Three Day Stride", desc: "3 days in a row with a run", icon: "🔥", check: s => s.runStreak >= 3 },
  { id: "stride_streak_7", cat: "stride", name: "Week of Running", desc: "7 days in a row with a run", icon: "⚡", check: s => s.runStreak >= 7 },
  { id: "stride_dawn", cat: "stride", name: "Morning Runner", desc: "10 runs before 7am", icon: "🌅", check: s => s.dawnRuns >= 10 },
  { id: "stride_weather", cat: "stride", name: "Tempered Runner", desc: "Run in 5 different weather conditions", icon: "🌦", check: s => s.weatherVariety >= 5 },
];

// ═══════════════════════════════════════════════════════════════
// QUESTS
// ═══════════════════════════════════════════════════════════════

const DAILY_QUESTS = [
  { id: "dq_workout", text: "Complete a workout session", target: 1, xp: 50, pillar: "iron", trackTotalSessionsToday: true },
  { id: "dq_sets6", text: "Complete 6+ sets today", target: 6, xp: 30, pillar: "iron", trackSetsToday: true },
  { id: "dq_perfect", text: "Finish a perfect workout session", target: 1, xp: 40, pillar: "iron", trackPerfectsToday: true },
  { id: "dq_vol5k", text: "Lift 5,000 lbs of volume today", target: 5000, xp: 30, pillar: "iron", trackVolumeToday: true },
  { id: "dq_vol10k", text: "Lift 10,000 lbs of volume today", target: 10000, xp: 50, pillar: "iron", trackVolumeToday: true },
  { id: "dq_hab3", text: "Complete 3+ habits today", target: 3, xp: 20, pillar: "disc", trackHabitsToday: true },
  { id: "dq_hab5", text: "Complete 5+ habits today", target: 5, xp: 30, pillar: "disc", trackHabitsToday: true },
  { id: "dq_hab_all", text: "Complete ALL your habits today", target: -1, xp: 40, pillar: "disc", trackAllHabitsToday: true },
  { id: "dq_med5", text: "Meditate for 5+ minutes", target: 5, xp: 15, pillar: "mind", trackMedMinToday: true },
  { id: "dq_med15", text: "Meditate for 15+ minutes", target: 15, xp: 25, pillar: "mind", trackMedMinToday: true },
  { id: "dq_med_journal", text: "Write a meditation journal entry", target: 1, xp: 15, pillar: "mind", trackJournalsToday: true },
  { id: "dq_two_pillars", text: "Activity in 2+ pillars today", target: 2, xp: 30, pillar: "cross", trackPillarsToday: true },
  { id: "dq_trinity", text: "Trinity day — all 3 pillars", target: 3, xp: 60, pillar: "cross", trackPillarsToday: true },
];

const WEEKLY_QUESTS = [
  { id: "wq_3_workouts", text: "Complete 3 workouts this week", target: 3, xp: 150, pillar: "iron", trackSessionsWeek: true },
  { id: "wq_4_workouts", text: "Complete 4 workouts this week", target: 4, xp: 200, pillar: "iron", trackSessionsWeek: true },
  { id: "wq_vol_25k", text: "25,000 lbs total volume this week", target: 25000, xp: 150, pillar: "iron", trackVolumeWeek: true },
  { id: "wq_vol_50k", text: "50,000 lbs total volume this week", target: 50000, xp: 250, pillar: "iron", trackVolumeWeek: true },
  { id: "wq_hab_5days", text: "Hit all habits 5 days this week", target: 5, xp: 150, pillar: "disc", trackAllHabitsDaysWeek: true },
  { id: "wq_med_5days", text: "Meditate 5+ days this week", target: 5, xp: 120, pillar: "mind", trackMedDaysWeek: true },
  { id: "wq_trinity_3", text: "Trinity day 3 times this week", target: 3, xp: 200, pillar: "cross", trackTrinityDaysWeek: true },
  { id: "wq_trinity_5", text: "Trinity day 5 times this week", target: 5, xp: 350, pillar: "cross", trackTrinityDaysWeek: true },
];

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════

const fmtDate = (d) => { const m=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]; return `${m[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`; };
const todayKey = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; };
const dateKey = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const weekKey = (date) => { const d = new Date(date); const day = d.getDay(); const diff = d.getDate() - day + (day === 0 ? -6 : 1); const mon = new Date(d.setDate(diff)); return `${mon.getFullYear()}-W${String(mon.getMonth()+1).padStart(2,"0")}-${String(mon.getDate()).padStart(2,"0")}`; };

const sk = (user, k) => user ? `iron-grimoire:${user}:${k}` : `iron-grimoire:${k}`;
async function load(user, key, fb) { try { const r = localStorage.getItem(sk(user,key)); return r !== null ? JSON.parse(r) : fb; } catch { return fb; } }
async function save(user, key, v) { try { localStorage.setItem(sk(user,key), JSON.stringify(v)); } catch(e) { console.error(e); } }

// Play a synthesized gong sound — deep, resonant, self-contained
let audioCtx = null;
function playGong() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const now = audioCtx.currentTime;
    const duration = 4.5;

    // Layered frequencies give a gong its complex resonance
    const frequencies = [
      { freq: 73, gain: 0.5 },    // fundamental (low bass)
      { freq: 110, gain: 0.3 },   // harmonic
      { freq: 164, gain: 0.2 },   // harmonic
      { freq: 220, gain: 0.15 },  // higher harmonic
      { freq: 311, gain: 0.08 },  // shimmer
    ];

    const masterGain = audioCtx.createGain();
    masterGain.connect(audioCtx.destination);
    masterGain.gain.setValueAtTime(0.9, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    frequencies.forEach(({ freq, gain }) => {
      const osc = audioCtx.createOscillator();
      const oscGain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now);
      // Slight detuning/drift for a more natural metallic quality
      osc.frequency.exponentialRampToValueAtTime(freq * 0.98, now + duration);
      oscGain.gain.setValueAtTime(0, now);
      oscGain.gain.linearRampToValueAtTime(gain, now + 0.02);
      oscGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      osc.connect(oscGain);
      oscGain.connect(masterGain);
      osc.start(now);
      osc.stop(now + duration);
    });

    // Subtle low-end thump for the "strike"
    const thump = audioCtx.createOscillator();
    const thumpGain = audioCtx.createGain();
    thump.type = "sine";
    thump.frequency.setValueAtTime(45, now);
    thump.frequency.exponentialRampToValueAtTime(30, now + 0.3);
    thumpGain.gain.setValueAtTime(0.4, now);
    thumpGain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
    thump.connect(thumpGain);
    thumpGain.connect(masterGain);
    thump.start(now);
    thump.stop(now + 0.4);
  } catch (e) { console.error("Audio failed:", e); }
}

async function hashPassword(pw) {
  const encoded = new TextEncoder().encode(pw);
  const hashBuffer = await crypto.subtle.digest('SHA-256', encoded);
  return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getRank(xp, ranks) {
  let cur = ranks[0], nxt = ranks[1];
  for (let i=ranks.length-1; i>=0; i--) { if (xp >= ranks[i].xp) { cur=ranks[i]; nxt=ranks[i+1]||null; break; } }
  return { current: cur, next: nxt, progress: nxt ? (xp-cur.xp)/(nxt.xp-cur.xp) : 1, xp };
}

function calcIronXP(ses) {
  const sets = Object.values(ses); const done = sets.filter(s=>s.done);
  let xp = done.length * 10;
  xp += Math.floor(done.reduce((s,x)=>s+(parseFloat(x.weight)||0)*(parseFloat(x.reps)||0),0) / 100);
  if (done.length===sets.length && sets.length>0) xp += 50;
  return xp;
}

function sessionVolume(ses) {
  return Object.values(ses).reduce((s,x)=>s+(parseFloat(x.weight)||0)*(parseFloat(x.reps)||0),0);
}

function calcHabitStreak(habitLog, habitId) {
  if (!habitLog[habitId]) return 0;
  let streak = 0; const d = new Date();
  while (true) { const k = dateKey(d); if (habitLog[habitId][k]) { streak++; d.setDate(d.getDate()-1); } else break; if (streak > 500) break; }
  return streak;
}

function calcMedStreak(meditations) {
  if (!meditations.length) return 0;
  const medDates = new Set(meditations.map(m => dateKey(new Date(m.date))));
  let streak = 0; const d = new Date();
  while (true) { const k = dateKey(d); if (medDates.has(k)) { streak++; d.setDate(d.getDate()-1); } else break; if (streak > 500) break; }
  return streak;
}

function calcWeekStreak(history) {
  if (!history.length) return 0;
  const wm = {}; history.forEach(h => { const w = weekKey(h.date); wm[w] = (wm[w]||0)+1; });
  const weeks = Object.keys(wm).sort().reverse();
  let streak = 0; const cw = weekKey(new Date());
  for (const wk of weeks) { if (wm[wk] >= 3) streak++; else if (wk === cw) continue; else break; }
  return streak;
}

function computeAllStats({ history, habits, habitLog, meditations, prs, ironXP, discXP, mindXP, questsCompleted, ascensions, customHabitsCreated, bodyLog = [], runs = [], activeProgram = null }) {
  // Iron stats
  const totalSessions = history.length;
  let bestVolume = 0, totalVolume = 0, totalSetsCompleted = 0;
  let dawnSessions = 0, nightSessions = 0;
  let hadPerfectSession = false;
  const daysCompleted = { A: false, B: false, C: false };
  const monthlySessions = {};
  history.forEach(h => {
    daysCompleted[h.day] = true;
    const sets = Object.values(h.sets); const done = sets.filter(s => s.done);
    const vol = done.reduce((s,x)=>s+(parseFloat(x.weight)||0)*(parseFloat(x.reps)||0),0);
    if (vol > bestVolume) bestVolume = vol;
    totalVolume += vol;
    totalSetsCompleted += done.length;
    if (done.length === sets.length && sets.length > 0) hadPerfectSession = true;
    const hour = new Date(h.date).getHours();
    if (hour < 7) dawnSessions++;
    if (hour >= 21) nightSessions++;
    const ymKey = h.date.slice(0, 7);
    monthlySessions[ymKey] = (monthlySessions[ymKey] || 0) + 1;
  });
  const bestMonthlySessions = Math.max(0, ...Object.values(monthlySessions));
  const weekStreak = calcWeekStreak(history);

  // Discipline stats
  let totalHabitCompletions = 0; let longestHabitStreak = 0; const habitTotals = {};
  habits.forEach(h => {
    const log = habitLog[h.id] || {};
    const days = Object.keys(log).filter(k => log[k]);
    totalHabitCompletions += days.length;
    habitTotals[h.id] = days.length;
    const streak = calcHabitStreak(habitLog, h.id);
    if (streak > longestHabitStreak) longestHabitStreak = streak;
  });
  // Best habits in a day
  const habitsByDay = {};
  habits.forEach(h => {
    const log = habitLog[h.id] || {};
    Object.keys(log).forEach(day => { if (log[day]) habitsByDay[day] = (habitsByDay[day]||0)+1; });
  });
  const bestHabitsInDay = Math.max(0, ...Object.values(habitsByDay));
  const activeHabits = habits.length;
  const presetsAdded = habits.filter(h => PRESET_HABITS.find(p => p.id === h.id)).length;

  // Mind stats
  const totalMeditations = meditations.length;
  const longestMeditation = meditations.reduce((m, x) => Math.max(m, x.duration), 0);
  const totalMedMinutes = meditations.reduce((s,x) => s + x.duration, 0);
  const medJournalCount = meditations.filter(m => m.journal && m.journal.length > 0).length;
  const medStreak = calcMedStreak(meditations);

  // Body stats
  const bodyLogCount = bodyLog.length;
  const bodyFullEntryCount = bodyLog.filter(b => Object.keys(b.measurements).length >= 7).length;
  const bodyWeeks = new Set(bodyLog.map(b => weekKey(b.date)));
  const sortedBodyWeeks = [...bodyWeeks].sort().reverse();
  let bodyWeeklyStreak = 0;
  const currentWeekKey = weekKey(new Date());
  for (let i = 0; i < sortedBodyWeeks.length; i++) {
    const wk = sortedBodyWeeks[i];
    if (i === 0 && wk !== currentWeekKey) {
      // check if it's the previous week
      const lastWk = new Date(); lastWk.setDate(lastWk.getDate() - 7);
      if (wk !== weekKey(lastWk.toISOString())) break;
    }
    bodyWeeklyStreak++;
  }

  // Stride stats
  const totalRuns = runs.length;
  const totalMiles = runs.reduce((s,r) => s + (parseFloat(r.distance)||0), 0);
  const longestRun = runs.reduce((m,r) => Math.max(m, parseFloat(r.distance)||0), 0);
  const dawnRuns = runs.filter(r => new Date(r.date).getHours() < 7).length;
  const weatherVariety = new Set(runs.filter(r => r.weather).map(r => r.weather)).size;
  const runDates = new Set(runs.map(r => dateKey(new Date(r.date))));
  let runStreak = 0; const rd = new Date();
  while (true) { const k = dateKey(rd); if (runDates.has(k)) { runStreak++; rd.setDate(rd.getDate()-1); } else break; if (runStreak > 500) break; }
  const c25kComplete = activeProgram?.id === "c25k" && activeProgram?.completed;
  const programsCompleted = (activeProgram?.completedPrograms || []).length;

  // Cross
  const trinityDateSet = new Set();
  const sessionDates = new Set(history.map(h => dateKey(new Date(h.date))));
  const medDates = new Set(meditations.map(m => dateKey(new Date(m.date))));
  const habitDates = new Set(Object.keys(habitsByDay));
  [...sessionDates].forEach(d => { if (medDates.has(d) && habitDates.has(d)) trinityDateSet.add(d); });
  const trinityDays = trinityDateSet.size;

  const ironLvl = getRank(ironXP, IRON_RANKS).current.level;
  const discLvl = getRank(discXP, DISC_RANKS).current.level;
  const mindLvl = getRank(mindXP, MIND_RANKS).current.level;
  const maxAnyLevel = Math.max(ironLvl, discLvl, mindLvl);
  const minAnyLevel = Math.min(ironLvl, discLvl, mindLvl);

  return { totalSessions, bestVolume, totalVolume, totalSetsCompleted, dawnSessions, nightSessions, hadPerfectSession, daysCompleted, bestMonthlySessions, weekStreak, prs, totalHabitCompletions, longestHabitStreak, habitTotals, bestHabitsInDay, activeHabits, presetsAdded, customHabitsCreated, totalMeditations, longestMeditation, totalMedMinutes, medJournalCount, medStreak, trinityDays, maxAnyLevel, minAnyLevel, questsCompleted, ascensions, bodyLogCount, bodyFullEntryCount, bodyWeeklyStreak, totalRuns, totalMiles, longestRun, dawnRuns, weatherVariety, runStreak, c25kComplete, programsCompleted };
}

function pickRandom(arr, n, exclude = []) {
  const pool = arr.filter(a => !exclude.includes(a.id));
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

// Compute current quest progress from state
function computeQuestProgress(q, ctx) {
  const { history, habits, habitLog, meditations } = ctx;
  const tk = todayKey();
  const wk = weekKey(new Date());
  const todayHistory = history.filter(h => dateKey(new Date(h.date)) === tk);
  const todayMeds = meditations.filter(m => dateKey(new Date(m.date)) === tk);
  const weekHistory = history.filter(h => weekKey(h.date) === wk);
  const weekMeds = meditations.filter(m => weekKey(m.date) === wk);

  if (q.trackTotalSessionsToday) return todayHistory.length;
  if (q.trackSetsToday) return todayHistory.reduce((s,h) => s + Object.values(h.sets).filter(x=>x.done).length, 0);
  if (q.trackPerfectsToday) return todayHistory.filter(h => { const sets = Object.values(h.sets); return sets.length > 0 && sets.every(x=>x.done); }).length;
  if (q.trackVolumeToday) return todayHistory.reduce((s,h) => s + sessionVolume(h.sets), 0);
  if (q.trackHabitsToday) return habits.filter(h => habitLog[h.id]?.[tk]).length;
  if (q.trackAllHabitsToday) return habits.length > 0 && habits.every(h => habitLog[h.id]?.[tk]) ? 1 : 0;
  if (q.trackMedMinToday) return todayMeds.reduce((s,m) => s + m.duration, 0);
  if (q.trackJournalsToday) return todayMeds.filter(m => m.journal && m.journal.length > 0).length;
  if (q.trackPillarsToday) {
    let p = 0;
    if (todayHistory.length > 0) p++;
    if (habits.some(h => habitLog[h.id]?.[tk])) p++;
    if (todayMeds.length > 0) p++;
    return p;
  }
  if (q.trackSessionsWeek) return weekHistory.length;
  if (q.trackVolumeWeek) return weekHistory.reduce((s,h) => s + sessionVolume(h.sets), 0);
  if (q.trackAllHabitsDaysWeek) {
    // count days this week where all habits completed
    if (habits.length === 0) return 0;
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = dateKey(d);
      if (weekKey(d.toISOString()) !== wk) continue;
      if (habits.every(h => habitLog[h.id]?.[k])) count++;
    }
    return count;
  }
  if (q.trackMedDaysWeek) return new Set(weekMeds.map(m => dateKey(new Date(m.date)))).size;
  if (q.trackTrinityDaysWeek) {
    let count = 0;
    for (let i = 0; i < 7; i++) {
      const d = new Date(); d.setDate(d.getDate() - i);
      const k = dateKey(d);
      if (weekKey(d.toISOString()) !== wk) continue;
      const hasWorkout = history.some(h => dateKey(new Date(h.date)) === k);
      const hasHabit = habits.some(h => habitLog[h.id]?.[k]);
      const hasMed = meditations.some(m => dateKey(new Date(m.date)) === k);
      if (hasWorkout && hasHabit && hasMed) count++;
    }
    return count;
  }
  return 0;
}

function getQuestTarget(q, habits) {
  if (q.id === "dq_hab_all") return Math.max(1, habits.length);
  return q.target;
}

// ═══════════════════════════════════════════════════════════════
// SVG DIAGRAMS (same as before)
// ═══════════════════════════════════════════════════════════════

function ProgressionChart({ history, exerciseId, pr }) {
  const exHistory = [];
  history.forEach(entry => {
    const setsForEx = Object.entries(entry.sets).filter(([k,s]) => k.startsWith(exerciseId + "-s") && s.done && parseFloat(s.weight) > 0);
    if (setsForEx.length > 0) {
      const maxWeight = Math.max(...setsForEx.map(([_,s]) => parseFloat(s.weight)));
      exHistory.push({ date: entry.date, weight: maxWeight });
    }
  });
  const last5 = exHistory.slice(0, 5).reverse();
  if (last5.length === 0) return null;

  const maxW = Math.max(...last5.map(s => s.weight));
  const minW = Math.min(...last5.map(s => s.weight));
  const range = Math.max(1, maxW - minW);

  const points = last5.map((s, i) => {
    const x = last5.length > 1 ? (i / (last5.length - 1)) * 280 + 10 : 150;
    const y = 100 - ((s.weight - minW) / range) * 80;
    return { x, y, weight: s.weight, isPR: pr && s.weight === pr };
  });

  const polylinePoints = points.map(p => p.x + "," + p.y).join(" ");
  const trend = last5.length > 1 ? last5[last5.length - 1].weight - last5[0].weight : 0;
  const trendArrow = trend > 0 ? "↑" : trend < 0 ? "↓" : "→";
  const trendColor = trend > 0 ? "#a0c49c" : trend < 0 ? "#c47a6a" : "#8b7a5e";

  return (
    <div style={S.progChartBox}>
      <svg viewBox="0 0 300 120" style={{width:"100%",height:"120px",display:"block"}}>
        <line x1="0" y1="100" x2="300" y2="100" stroke="rgba(139,122,94,0.15)" strokeWidth="1"/>
        <line x1="0" y1="60" x2="300" y2="60" stroke="rgba(139,122,94,0.08)" strokeWidth="1" strokeDasharray="2,3"/>
        <line x1="0" y1="20" x2="300" y2="20" stroke="rgba(139,122,94,0.08)" strokeWidth="1" strokeDasharray="2,3"/>
        {last5.length > 1 && <polyline fill="none" stroke="#c4a96a" strokeWidth="2" points={polylinePoints}/>}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={p.isPR ? 6 : 4} fill={p.isPR ? "#e8cb8c" : "#c4a96a"} stroke={p.isPR ? "#fff" : "none"} strokeWidth="1"/>
            {p.isPR && <text x={p.x} y={p.y - 10} textAnchor="middle" fill="#e8cb8c" fontSize="10">PR</text>}
            <text x={p.x} y={p.y + 18} textAnchor="middle" fill="#8b7a5e" fontSize="9">{p.weight}</text>
          </g>
        ))}
      </svg>
      <div style={S.progChartFooter}>
        <span style={S.progChartLbl}>Last {last5.length} session{last5.length !== 1 ? "s" : ""}</span>
        {last5.length > 1 && <span style={{...S.progChartLbl, color: trendColor}}>{trendArrow} {Math.abs(trend).toFixed(0)} lbs</span>}
      </div>
    </div>
  );
}

function ExerciseDiagram({ movement }) {
  const d = {
    push: (<svg viewBox="0 0 200 120" style={{width:"100%",height:"120px"}}><circle cx="60" cy="40" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="60" y1="50" x2="60" y2="90" stroke="#c4a96a" strokeWidth="2"/><line x1="60" y1="90" x2="45" y2="110" stroke="#c4a96a" strokeWidth="2"/><line x1="60" y1="90" x2="75" y2="110" stroke="#c4a96a" strokeWidth="2"/><rect x="130" y="50" width="20" height="20" fill="none" stroke="#8b7a5e" strokeWidth="1.5" className="weight-push"/></svg>),
    overhead: (<svg viewBox="0 0 200 140" style={{width:"100%",height:"140px"}}><circle cx="100" cy="60" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="70" x2="100" y2="115" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="115" x2="85" y2="135" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="115" x2="115" y2="135" stroke="#c4a96a" strokeWidth="2"/><g className="arm-overhead"><line x1="100" y1="75" x2="75" y2="50" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="75" x2="125" y2="50" stroke="#c4a96a" strokeWidth="2"/><rect x="65" y="40" width="20" height="10" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/><rect x="115" y="40" width="20" height="10" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/></g></svg>),
    pulldown: (<svg viewBox="0 0 200 140" style={{width:"100%",height:"140px"}}><line x1="100" y1="0" x2="100" y2="20" stroke="#4a4236" strokeWidth="1.5" strokeDasharray="3,3"/><circle cx="100" cy="60" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="70" x2="100" y2="115" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="115" x2="85" y2="135" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="115" x2="115" y2="135" stroke="#c4a96a" strokeWidth="2"/><g className="arm-pulldown"><line x1="100" y1="75" x2="75" y2="50" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="75" x2="125" y2="50" stroke="#c4a96a" strokeWidth="2"/><line x1="70" y1="45" x2="130" y2="45" stroke="#8b7a5e" strokeWidth="2"/></g></svg>),
    row: (<svg viewBox="0 0 200 120" style={{width:"100%",height:"120px"}}><circle cx="50" cy="50" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="50" y1="60" x2="50" y2="95" stroke="#c4a96a" strokeWidth="2"/><line x1="50" y1="95" x2="80" y2="95" stroke="#c4a96a" strokeWidth="2"/><line x1="50" y1="95" x2="40" y2="115" stroke="#c4a96a" strokeWidth="2"/><line x1="80" y1="95" x2="80" y2="115" stroke="#c4a96a" strokeWidth="2"/><g className="arm-row"><line x1="50" y1="65" x2="90" y2="65" stroke="#c4a96a" strokeWidth="2"/><rect x="88" y="58" width="20" height="14" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/></g></svg>),
    curl: (<svg viewBox="0 0 200 140" style={{width:"100%",height:"140px"}}><circle cx="100" cy="40" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="50" x2="100" y2="105" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="105" x2="85" y2="130" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="105" x2="115" y2="130" stroke="#c4a96a" strokeWidth="2"/><line x1="85" y1="60" x2="85" y2="80" stroke="#c4a96a" strokeWidth="2"/><line x1="115" y1="60" x2="115" y2="80" stroke="#c4a96a" strokeWidth="2"/><g className="arm-curl" style={{transformOrigin:"85px 80px"}}><line x1="85" y1="80" x2="85" y2="105" stroke="#c4a96a" strokeWidth="2"/><rect x="78" y="105" width="14" height="14" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/></g><g className="arm-curl" style={{transformOrigin:"115px 80px"}}><line x1="115" y1="80" x2="115" y2="105" stroke="#c4a96a" strokeWidth="2"/><rect x="108" y="105" width="14" height="14" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/></g></svg>),
    tricep: (<svg viewBox="0 0 200 140" style={{width:"100%",height:"140px"}}><circle cx="100" cy="30" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="40" x2="100" y2="95" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="95" x2="85" y2="125" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="95" x2="115" y2="125" stroke="#c4a96a" strokeWidth="2"/><line x1="85" y1="45" x2="85" y2="65" stroke="#c4a96a" strokeWidth="2"/><line x1="115" y1="45" x2="115" y2="65" stroke="#c4a96a" strokeWidth="2"/><g className="arm-tricep"><line x1="85" y1="65" x2="85" y2="95" stroke="#c4a96a" strokeWidth="2"/><line x1="115" y1="65" x2="115" y2="95" stroke="#c4a96a" strokeWidth="2"/><rect x="78" y="92" width="14" height="10" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/><rect x="108" y="92" width="14" height="10" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/></g></svg>),
    legpress: (<svg viewBox="0 0 200 120" style={{width:"100%",height:"120px"}}><circle cx="40" cy="60" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="50" y1="60" x2="80" y2="60" stroke="#c4a96a" strokeWidth="2"/><g className="leg-press"><line x1="80" y1="60" x2="130" y2="60" stroke="#c4a96a" strokeWidth="2"/><line x1="130" y1="60" x2="155" y2="60" stroke="#c4a96a" strokeWidth="2"/><rect x="155" y="35" width="15" height="50" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/></g></svg>),
    legext: (<svg viewBox="0 0 200 120" style={{width:"100%",height:"120px"}}><circle cx="50" cy="40" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="50" y1="50" x2="50" y2="75" stroke="#c4a96a" strokeWidth="2"/><line x1="50" y1="75" x2="90" y2="75" stroke="#c4a96a" strokeWidth="2"/><g className="leg-ext" style={{transformOrigin:"90px 75px"}}><line x1="90" y1="75" x2="90" y2="110" stroke="#c4a96a" strokeWidth="2"/><rect x="83" y="108" width="14" height="8" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/></g></svg>),
    legcurl: (<svg viewBox="0 0 200 120" style={{width:"100%",height:"120px"}}><circle cx="50" cy="40" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="50" y1="50" x2="50" y2="75" stroke="#c4a96a" strokeWidth="2"/><line x1="50" y1="75" x2="100" y2="75" stroke="#c4a96a" strokeWidth="2"/><g className="leg-curl" style={{transformOrigin:"100px 75px"}}><line x1="100" y1="75" x2="140" y2="75" stroke="#c4a96a" strokeWidth="2"/><rect x="138" y="68" width="10" height="14" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/></g></svg>),
    lateral: (<svg viewBox="0 0 200 140" style={{width:"100%",height:"140px"}}><circle cx="100" cy="40" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="50" x2="100" y2="100" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="100" x2="85" y2="130" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="100" x2="115" y2="130" stroke="#c4a96a" strokeWidth="2"/><g className="arm-lateral"><line x1="100" y1="55" x2="65" y2="55" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="55" x2="135" y2="55" stroke="#c4a96a" strokeWidth="2"/><rect x="55" y="48" width="14" height="14" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/><rect x="131" y="48" width="14" height="14" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/></g></svg>),
    facepull: (<svg viewBox="0 0 200 140" style={{width:"100%",height:"140px"}}><circle cx="100" cy="50" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="60" x2="100" y2="105" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="105" x2="85" y2="130" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="105" x2="115" y2="130" stroke="#c4a96a" strokeWidth="2"/><g className="arm-facepull"><line x1="100" y1="55" x2="80" y2="45" stroke="#c4a96a" strokeWidth="2"/><line x1="100" y1="55" x2="120" y2="45" stroke="#c4a96a" strokeWidth="2"/><line x1="75" y1="45" x2="125" y2="45" stroke="#8b7a5e" strokeWidth="2"/></g></svg>),
    pallof: (<svg viewBox="0 0 200 140" style={{width:"100%",height:"140px"}}><circle cx="80" cy="50" r="10" fill="none" stroke="#c4a96a" strokeWidth="2"/><line x1="80" y1="60" x2="80" y2="105" stroke="#c4a96a" strokeWidth="2"/><line x1="80" y1="105" x2="65" y2="130" stroke="#c4a96a" strokeWidth="2"/><line x1="80" y1="105" x2="95" y2="130" stroke="#c4a96a" strokeWidth="2"/><g className="arm-pallof"><line x1="80" y1="65" x2="140" y2="65" stroke="#c4a96a" strokeWidth="2"/><rect x="135" y="58" width="14" height="14" fill="none" stroke="#8b7a5e" strokeWidth="1.5"/></g><line x1="180" y1="40" x2="180" y2="90" stroke="#4a4236" strokeWidth="1.5" strokeDasharray="3,3"/></svg>),
  };
  return d[movement] || d.push;
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════

export default function App() {
  const [user, setUser] = useState(null);
  const [profiles, setProfiles] = useState([]);
  const [view, setView] = useState("home");
  const [loading, setLoading] = useState(true);

  // Core state
  const [workouts, setWorkouts] = useState(DEFAULT_WORKOUTS);
  const [medTypes, setMedTypes] = useState(DEFAULT_MED_TYPES);
  const [medDurationPresets, setMedDurationPresets] = useState(MEDITATION_PRESETS);
  const [bodyLog, setBodyLog] = useState([]);
  const [trackedMetrics, setTrackedMetrics] = useState(BODY_METRICS.map(m=>m.id));
  const [logFrequency, setLogFrequency] = useState("weekly");
  // Stride state
  const [runs, setRuns] = useState([]);
  const [strideXP, setStrideXP] = useState(0);
  const [activeProgram, setActiveProgram] = useState(null); // { id, startedAt, currentWorkoutIndex, completedWorkouts: [], completedPrograms: [] }
  const [history, setHistory] = useState([]);
  const [lastWeights, setLastWeights] = useState({});
  const [prs, setPrs] = useState({});
  const [ironXP, setIronXP] = useState(0);
  const [discXP, setDiscXP] = useState(0);
  const [mindXP, setMindXP] = useState(0);
  const [habits, setHabits] = useState([]);
  const [habitLog, setHabitLog] = useState({});
  const [meditations, setMeditations] = useState([]);
  const [customHabitsCreated, setCustomHabitsCreated] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState([]);
  const [dailyQuests, setDailyQuests] = useState({ date: "", quests: [] });
  const [weeklyQuest, setWeeklyQuest] = useState({ week: "", quest: null });
  const [questsCompleted, setQuestsCompleted] = useState(0);
  const [ascensions, setAscensions] = useState(0);

  // Iron view state
  const [activeDay, setActiveDay] = useState(null);
  const [session, setSession] = useState({});
  const [restTimer, setRestTimer] = useState(null);
  const [restSeconds, setRestSeconds] = useState(0);
  const [earnedXP, setEarnedXP] = useState(0);
  const [earnedPillar, setEarnedPillar] = useState("iron");
  const [ironLeveledUp, setIronLeveledUp] = useState(false);
  const [activeExercise, setActiveExercise] = useState(null);
  const [newAchievements, setNewAchievements] = useState([]);
  const [completedQuestsThisAction, setCompletedQuestsThisAction] = useState([]);

  // Habit view state
  const [activeHabit, setActiveHabit] = useState(null);
  const [newHabitName, setNewHabitName] = useState("");
  const [newHabitIcon, setNewHabitIcon] = useState("✦");

  // Med view state
  const [medDuration, setMedDuration] = useState(10);
  const [medSelectedType, setMedSelectedType] = useState("silent");
  const [medRemaining, setMedRemaining] = useState(0);
  const [medActive, setMedActive] = useState(false);
  const [medPaused, setMedPaused] = useState(false);
  const [medJournal, setMedJournal] = useState("");
  const [medCompleted, setMedCompleted] = useState(0);

  // Achievements gallery state
  const [achievementFilter, setAchievementFilter] = useState("all");

  // Load profiles
  useEffect(() => { (async () => {
    const p = await load(null, "profiles", []);
    setProfiles(p); setLoading(false);
  })(); }, []);

  // Load user data
  useEffect(() => { if (!user) return; (async () => {
    const [h, lw, pr, ix, dx, mx, hb, hl, md, ua, dq, wq, qc, asc, chc, cw, cmt, cmdp, bl, tm, lf, rn, sx, ap] = await Promise.all([
      load(user, "history", []), load(user, "lastWeights", {}), load(user, "prs", {}),
      load(user, "ironXP", 0), load(user, "discXP", 0), load(user, "mindXP", 0),
      load(user, "habits", PRESET_HABITS.slice(0,3)), load(user, "habitLog", {}),
      load(user, "meditations", []), load(user, "achievements", []),
      load(user, "dailyQuests", { date:"", quests:[] }), load(user, "weeklyQuest", { week:"", quest:null }),
      load(user, "questsCompleted", 0), load(user, "ascensions", 0),
      load(user, "customHabitsCreated", 0),
      load(user, "workouts", DEFAULT_WORKOUTS),
      load(user, "medTypes", DEFAULT_MED_TYPES),
      load(user, "medDurationPresets", MEDITATION_PRESETS),
      load(user, "bodyLog", []),
      load(user, "trackedMetrics", BODY_METRICS.map(m=>m.id)),
      load(user, "logFrequency", "weekly"),
      load(user, "runs", []),
      load(user, "strideXP", 0),
      load(user, "activeProgram", null),
    ]);
    setHistory(h); setLastWeights(lw); setPrs(pr);
    setIronXP(ix); setDiscXP(dx); setMindXP(mx);
    setHabits(hb); setHabitLog(hl); setMeditations(md);
    setUnlockedAchievements(ua); setDailyQuests(dq); setWeeklyQuest(wq);
    setQuestsCompleted(qc); setAscensions(asc); setCustomHabitsCreated(chc);
    setWorkouts(cw); setMedTypes(cmt); setMedDurationPresets(cmdp);
    setBodyLog(bl); setTrackedMetrics(tm); setLogFrequency(lf);
    setRuns(rn); setStrideXP(sx); setActiveProgram(ap);
    // Generate quests if needed
    refreshQuests(dq, wq);
    // Check for unseen monthly chronicle
    const lastSeen = await load(user, "lastMonthlyRecapSeen", "");
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevMonthKey = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth()+1).padStart(2,"0")}`;
    if (now.getDate() <= 7 && lastSeen !== prevMonthKey) {
      // Show popup if we have any data from the previous month
      const hadActivity = [...h, ...md, ...rn, ...bl].some(item => {
        const d = new Date(item.date);
        return d.getFullYear() === prevMonth.getFullYear() && d.getMonth() === prevMonth.getMonth();
      }) || Object.values(hl).some(habitDays => Object.keys(habitDays).some(dk => { const d = new Date(dk); return d.getFullYear() === prevMonth.getFullYear() && d.getMonth() === prevMonth.getMonth(); }));
      if (hadActivity) {
        await save(user, "lastMonthlyRecapSeen", prevMonthKey);
        setTimeout(() => setView("monthly-chronicle"), 500);
      }
    }
  })(); }, [user]);

  async function refreshQuests(dq, wq) {
    const tk = todayKey(); const wk = weekKey(new Date());
    let newDQ = dq; let newWQ = wq;
    if (dq.date !== tk) {
      const chosen = pickRandom(DAILY_QUESTS, 3);
      newDQ = { date: tk, quests: chosen.map(q => ({ id: q.id, completed: false })) };
      setDailyQuests(newDQ); await save(user, "dailyQuests", newDQ);
    }
    if (wq.week !== wk) {
      const chosen = pickRandom(WEEKLY_QUESTS, 1);
      newWQ = { week: wk, quest: { id: chosen[0].id, completed: false } };
      setWeeklyQuest(newWQ); await save(user, "weeklyQuest", newWQ);
    }
  }

  // Rest timer
  useEffect(() => {
    if (restTimer === null) return;
    const iv = setInterval(() => setRestSeconds(s => { if (s<=1){setRestTimer(null);return 0;} return s-1; }), 1000);
    return () => clearInterval(iv);
  }, [restTimer]);

  // Meditation timer
  useEffect(() => {
    if (!medActive || medPaused) return;
    const iv = setInterval(() => {
      setMedRemaining(s => {
        if (s <= 1) {
          playGong();
          setMedActive(false);
          setMedCompleted(medDuration);
          setView("med-journal");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [medActive, medPaused, medDuration]);

  // ─── Shared helpers for state update ───

  async function checkAndAwardQuests(newHistory, newHabitLog, newMeditations) {
    const ctx = { history: newHistory, habits, habitLog: newHabitLog, meditations: newMeditations };
    const completed = [];
    let newIronXP = ironXP, newDiscXP = discXP, newMindXP = mindXP;
    // Check daily
    const updatedDaily = { ...dailyQuests, quests: dailyQuests.quests.map(dq => {
      if (dq.completed) return dq;
      const def = DAILY_QUESTS.find(q => q.id === dq.id); if (!def) return dq;
      const prog = computeQuestProgress(def, ctx);
      const tgt = getQuestTarget(def, habits);
      if (prog >= tgt) {
        completed.push({ ...def, target: tgt });
        if (def.pillar === "iron") newIronXP += def.xp;
        else if (def.pillar === "disc") newDiscXP += def.xp;
        else if (def.pillar === "mind") newMindXP += def.xp;
        else { newIronXP += Math.floor(def.xp/3); newDiscXP += Math.floor(def.xp/3); newMindXP += Math.floor(def.xp/3); }
        return { ...dq, completed: true };
      }
      return dq;
    })};
    // Check weekly
    let updatedWeekly = weeklyQuest;
    if (weeklyQuest.quest && !weeklyQuest.quest.completed) {
      const def = WEEKLY_QUESTS.find(q => q.id === weeklyQuest.quest.id);
      if (def) {
        const prog = computeQuestProgress(def, ctx);
        if (prog >= def.target) {
          completed.push(def);
          if (def.pillar === "iron") newIronXP += def.xp;
          else if (def.pillar === "disc") newDiscXP += def.xp;
          else if (def.pillar === "mind") newMindXP += def.xp;
          else { newIronXP += Math.floor(def.xp/3); newDiscXP += Math.floor(def.xp/3); newMindXP += Math.floor(def.xp/3); }
          updatedWeekly = { ...weeklyQuest, quest: { ...weeklyQuest.quest, completed: true } };
        }
      }
    }
    const newQC = questsCompleted + completed.length;
    setDailyQuests(updatedDaily); setWeeklyQuest(updatedWeekly); setQuestsCompleted(newQC);
    if (newIronXP !== ironXP) setIronXP(newIronXP);
    if (newDiscXP !== discXP) setDiscXP(newDiscXP);
    if (newMindXP !== mindXP) setMindXP(newMindXP);
    setCompletedQuestsThisAction(completed);
    await Promise.all([
      save(user, "dailyQuests", updatedDaily),
      save(user, "weeklyQuest", updatedWeekly),
      save(user, "questsCompleted", newQC),
      save(user, "ironXP", newIronXP), save(user, "discXP", newDiscXP), save(user, "mindXP", newMindXP),
    ]);
    return { newIronXP, newDiscXP, newMindXP, completed, newQC };
  }

  async function checkAchievements(stats) {
    const newlyUnlocked = [];
    ACHIEVEMENTS.forEach(a => { if (!unlockedAchievements.includes(a.id) && a.check(stats)) newlyUnlocked.push(a); });
    if (newlyUnlocked.length > 0) {
      const ua = [...unlockedAchievements, ...newlyUnlocked.map(a => a.id)];
      setUnlockedAchievements(ua);
      setNewAchievements(newlyUnlocked);
      await save(user, "achievements", ua);
    } else setNewAchievements([]);
    return newlyUnlocked;
  }

  // ─── IRON ───
  const startWorkout = (dk) => {
    const w = workouts[dk]; const s = {};
    w.exercises.forEach(ex => { for(let i=1;i<=ex.sets;i++) s[`${ex.id}-s${i}`]={weight: i === 1 ? (lastWeights[ex.id]||"") : "", reps:"", done:false}; });
    setSession(s); setActiveDay(dk); setView("iron-workout");
  };
  const updateSet = (k,f,v) => setSession(p => {
    const updated = {...p,[k]:{...p[k],[f]:v}};
    // Smart carry-forward: if updating weight, fill all later empty sets of same exercise with the new weight
    if (f === "weight" && v) {
      const [exId, setPart] = k.split("-s");
      const setNum = parseInt(setPart);
      Object.keys(updated).forEach(otherKey => {
        if (otherKey === k) return;
        const [otherExId, otherSetPart] = otherKey.split("-s");
        if (otherExId === exId && parseInt(otherSetPart) > setNum && !updated[otherKey].weight) {
          updated[otherKey] = {...updated[otherKey], weight: v};
        }
      });
    }
    return updated;
  });
  const toggleDone = (k) => { setSession(p => ({...p,[k]:{...p[k],done:!p[k].done}})); if(!session[k].done){setRestSeconds(90);setRestTimer(Date.now());} };
  const finishWorkout = async () => {
    const entry = { day: activeDay, date: new Date().toISOString(), sets: {...session} };
    const nh = [entry,...history];
    const nw = {...lastWeights};
    const nPrs = {...prs};
    workouts[activeDay].exercises.forEach(ex => {
      const setKey = `${ex.id}-s1`;
      if(session[setKey]?.weight) nw[ex.id]=session[setKey].weight;
      // Update PRs
      for (let i = 1; i <= ex.sets; i++) {
        const s = session[`${ex.id}-s${i}`];
        if (s?.done) { const w = parseFloat(s.weight) || 0; if (w > (nPrs[ex.id] || 0)) nPrs[ex.id] = w; }
      }
    });
    const sxp = calcIronXP(session);
    const prevRank = getRank(ironXP, IRON_RANKS);
    const nxp = ironXP + sxp;
    const nl = getRank(nxp, IRON_RANKS);

    setHistory(nh); setLastWeights(nw); setPrs(nPrs); setIronXP(nxp);
    setEarnedXP(sxp); setEarnedPillar("iron");
    setIronLeveledUp(nl.current.level > prevRank.current.level);
    await Promise.all([save(user,"history",nh), save(user,"lastWeights",nw), save(user,"prs",nPrs), save(user,"ironXP",nxp)]);
    const { newIronXP, newDiscXP, newMindXP, newQC } = await checkAndAwardQuests(nh, habitLog, meditations);
    const stats = computeAllStats({ history: nh, habits, habitLog, meditations, prs: nPrs, ironXP: newIronXP, discXP: newDiscXP, mindXP: newMindXP, questsCompleted: newQC, ascensions, customHabitsCreated, bodyLog });
    await checkAchievements(stats);
    setView("iron-summary");
  };

  // ─── HABITS ───
  const toggleHabitToday = async (habitId) => {
    const tk = todayKey();
    const wasDone = habitLog[habitId]?.[tk];
    const newLog = { ...habitLog, [habitId]: { ...(habitLog[habitId]||{}), [tk]: !wasDone } };
    if (wasDone) delete newLog[habitId][tk];
    setHabitLog(newLog);
    let newXP = discXP;
    if (!wasDone) { newXP += 5; } else { newXP = Math.max(0, newXP - 5); }
    setDiscXP(newXP);
    await Promise.all([save(user,"habitLog",newLog), save(user,"discXP",newXP)]);
    const { newIronXP, newDiscXP, newMindXP, newQC } = await checkAndAwardQuests(history, newLog, meditations);
    const stats = computeAllStats({ history, habits, habitLog: newLog, meditations, prs, ironXP: newIronXP, discXP: newDiscXP, mindXP: newMindXP, questsCompleted: newQC, ascensions, customHabitsCreated, bodyLog });
    await checkAchievements(stats);
  };
  const addHabit = async (preset) => {
    let newHabit; let nChc = customHabitsCreated;
    if (preset) { if (habits.find(h=>h.id===preset.id)) return; newHabit = preset; }
    else { if (!newHabitName.trim()) return; newHabit = { id: `custom_${Date.now()}`, name: newHabitName.trim(), icon: newHabitIcon }; setNewHabitName(""); setNewHabitIcon("✦"); nChc++; setCustomHabitsCreated(nChc); await save(user,"customHabitsCreated",nChc); }
    const nh = [...habits, newHabit]; setHabits(nh); await save(user,"habits",nh);
    const stats = computeAllStats({ history, habits: nh, habitLog, meditations, prs, ironXP, discXP, mindXP, questsCompleted, ascensions, customHabitsCreated: nChc, bodyLog });
    await checkAchievements(stats);
  };
  const removeHabit = async (id) => {
    if (!confirm("Remove this habit and all its records?")) return;
    const nh = habits.filter(h=>h.id!==id); const nl = {...habitLog}; delete nl[id];
    setHabits(nh); setHabitLog(nl);
    await Promise.all([save(user,"habits",nh), save(user,"habitLog",nl)]);
  };

  // ─── MEDITATION ───
  const startMeditation = () => { playGong(); setMedRemaining(medDuration * 60); setMedActive(true); setMedPaused(false); setView("med-active"); };
  const finishJournal = async () => {
    const entry = { date: new Date().toISOString(), duration: medCompleted, journal: medJournal.trim(), type: medSelectedType };
    const nm = [entry, ...meditations];
    const xpGain = medCompleted + (medCompleted >= 20 ? 10 : 0);
    const nxp = mindXP + xpGain;
    setMeditations(nm); setMindXP(nxp); setMedJournal(""); setEarnedXP(xpGain); setEarnedPillar("mind");
    await Promise.all([save(user,"meditations",nm), save(user,"mindXP",nxp)]);
    const { newIronXP, newDiscXP, newMindXP, newQC } = await checkAndAwardQuests(history, habitLog, nm);
    const stats = computeAllStats({ history, habits, habitLog, meditations: nm, prs, ironXP: newIronXP, discXP: newDiscXP, mindXP: newMindXP, questsCompleted: newQC, ascensions, customHabitsCreated, bodyLog });
    await checkAchievements(stats);
    setView("med-summary");
  };

  // ─── STRIDE (CARDIO) ───
  const saveRun = async (runData) => {
    const entry = { date: new Date().toISOString(), ...runData };
    const nr = [entry, ...runs];
    // XP: distance × 20 + duration(min) × 2 + effort × 5
    const distXP = Math.round((parseFloat(runData.distance) || 0) * 20);
    const timeXP = Math.round(((parseInt(runData.duration) || 0) / 60) * 2);
    const effortXP = (parseInt(runData.effort) || 0) * 5;
    const xpGain = distXP + timeXP + effortXP + 10; // +10 base
    const nxp = strideXP + xpGain;
    setRuns(nr); setStrideXP(nxp); setEarnedXP(xpGain); setEarnedPillar("stride");
    // If part of active program, advance it
    let programJustCompleted = false;
    let newActiveProgram = activeProgram;
    if (activeProgram && runData.programWorkoutIdx !== undefined) {
      const program = STRIDE_PROGRAMS[activeProgram.id];
      const completedWorkouts = [...(activeProgram.completedWorkouts || []), runData.programWorkoutIdx];
      const nextIdx = runData.programWorkoutIdx + 1;
      if (nextIdx >= program.workouts.length) {
        // Completed!
        programJustCompleted = true;
        newActiveProgram = { ...activeProgram, completedWorkouts, completed: true, completedAt: new Date().toISOString(), completedPrograms: [...(activeProgram.completedPrograms || []), activeProgram.id] };
      } else {
        newActiveProgram = { ...activeProgram, completedWorkouts, currentWorkoutIndex: nextIdx };
      }
      setActiveProgram(newActiveProgram);
      await save(user, "activeProgram", newActiveProgram);
    }
    await Promise.all([save(user,"runs",nr), save(user,"strideXP",nxp)]);
    const stats = computeAllStats({ history, habits, habitLog, meditations, prs, ironXP, discXP, mindXP, questsCompleted, ascensions, customHabitsCreated, bodyLog, runs: nr, activeProgram: newActiveProgram });
    await checkAchievements(stats);
    setView("stride-summary");
  };

  const startProgram = async (programId) => {
    const newProg = { id: programId, startedAt: new Date().toISOString(), currentWorkoutIndex: 0, completedWorkouts: [], completed: false, completedPrograms: activeProgram?.completedPrograms || [] };
    setActiveProgram(newProg);
    await save(user, "activeProgram", newProg);
    setView("stride-home");
  };

  const abandonProgram = async () => {
    if (!confirm("Abandon this program? Your run history stays, but program progress will be lost.")) return;
    const newProg = { id: null, completedPrograms: activeProgram?.completedPrograms || [] };
    setActiveProgram(newProg);
    await save(user, "activeProgram", newProg);
    setView("stride-home");
  };

  // ─── BODY TRACKING ───
  const saveBodyEntry = async (measurements) => {
    const valid = Object.keys(measurements).filter(k => measurements[k] !== "" && measurements[k] !== null && !isNaN(parseFloat(measurements[k])));
    if (valid.length === 0) return;
    const entry = { date: new Date().toISOString(), measurements: {} };
    valid.forEach(k => { entry.measurements[k] = parseFloat(measurements[k]); });
    const nbl = [entry, ...bodyLog];
    const xpGain = 10 + valid.length * 2;
    const nxp = discXP + xpGain;
    setBodyLog(nbl); setDiscXP(nxp); setEarnedXP(xpGain); setEarnedPillar("disc");
    await Promise.all([save(user,"bodyLog",nbl), save(user,"discXP",nxp)]);
    const stats = computeAllStats({ history, habits, habitLog, meditations, prs, ironXP, discXP: nxp, mindXP, questsCompleted, ascensions, customHabitsCreated, bodyLog: nbl, runs, activeProgram });
    await checkAchievements(stats);
    setView("body-summary");
  };

  // ─── PROFILES ───
  const createProfile = async (name, password) => {
    if (!name.trim() || !password) return;
    if (profiles.find(p => p.name === name.trim())) { alert("Profile name already exists."); return; }
    const hash = await hashPassword(password);
    const newProfile = { name: name.trim(), hash };
    const newProfiles = [...profiles, newProfile];
    setProfiles(newProfiles); await save(null, "profiles", newProfiles);
    setUser(name.trim()); setView("home");
  };
  const loginProfile = async (name, password) => {
    const profile = profiles.find(p => p.name === name);
    if (!profile) return false;
    const hash = await hashPassword(password);
    if (hash !== profile.hash) return false;
    setUser(name); setView("home");
    return true;
  };
  const deleteProfile = async (name, password) => {
    const profile = profiles.find(p => p.name === name);
    if (!profile) return false;
    const hash = await hashPassword(password);
    if (hash !== profile.hash) return false;
    if (!confirm(`Delete profile "${name}" and all its data?`)) return false;
    const newProfiles = profiles.filter(p => p.name !== name);
    setProfiles(newProfiles); await save(null, "profiles", newProfiles);
    return true;
  };

  // ─── ASCENSION ───
  const ascend = async () => {
    if (!confirm("Ascend and reset all levels? You'll keep achievements and gain a permanent +10% XP multiplier.")) return;
    const nAsc = ascensions + 1;
    setIronXP(0); setDiscXP(0); setMindXP(0); setAscensions(nAsc);
    await Promise.all([save(user,"ironXP",0), save(user,"discXP",0), save(user,"mindXP",0), save(user,"ascensions",nAsc)]);
    setView("home");
  };

  if (loading) return <div style={S.loadScreen}><div style={S.loadText}>◆ Consulting the Iron Grimoire ◆</div></div>;
  if (!user) return <LoginView profiles={profiles} onLogin={loginProfile} onCreate={createProfile} onDelete={deleteProfile}/>;

  const iron = getRank(ironXP, IRON_RANKS);
  const disc = getRank(discXP, DISC_RANKS);
  const mind = getRank(mindXP, MIND_RANKS);
  const stride = getRank(strideXP, STRIDE_RANKS);
  const ascMultiplier = 1 + ascensions * 0.1;
  const anyMaxed = iron.current.level >= MAX_LEVEL || disc.current.level >= MAX_LEVEL || mind.current.level >= MAX_LEVEL;

  // Active quests with live progress
  const questCtx = { history, habits, habitLog, meditations };
  const activeDailyQuests = dailyQuests.quests.map(dq => { const def = DAILY_QUESTS.find(q => q.id === dq.id); if (!def) return null; return { ...def, completed: dq.completed, progress: computeQuestProgress(def, questCtx), target: getQuestTarget(def, habits) }; }).filter(Boolean);
  const activeWeeklyQuest = weeklyQuest.quest ? (() => { const def = WEEKLY_QUESTS.find(q => q.id === weeklyQuest.quest.id); if (!def) return null; return { ...def, completed: weeklyQuest.quest.completed, progress: computeQuestProgress(def, questCtx) }; })() : null;

  // ═════════════════════════════════════════════════════
  // HOME
  // ═════════════════════════════════════════════════════
  if (view === "home") return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.hdr}>
        <div style={S.tRow}><span style={S.dm}>◆</span><h1 style={S.tt}>Iron Grimoire</h1><span style={S.dm}>◆</span></div>
        <p style={S.st}>{user}'s Path{ascensions > 0 ? ` · ✺ Ascended ${ascensions}` : ""}</p>
        {ascensions > 0 && <p style={S.multTx}>+{Math.round(ascensions*10)}% XP multiplier active</p>}
      </div>

      <div style={S.pillarGrid}>
        <PillarCard rank={iron} xp={ironXP} pillar="iron" name="Iron" onClick={()=>setView("iron-home")}/>
        <PillarCard rank={disc} xp={discXP} pillar="disc" name="Discipline" onClick={()=>setView("disc-home")}/>
        <PillarCard rank={mind} xp={mindXP} pillar="mind" name="Mind" onClick={()=>setView("mind-home")}/>
        <PillarCard rank={stride} xp={strideXP} pillar="stride" name="Stride" onClick={()=>setView("stride-home")}/>
      </div>

      <div style={S.dv}>━━━ ◈ ━━━</div>

      {/* Active Quests */}
      <div style={S.questHome}>
        <div style={S.questHomeTitle}>⟡ Today's Quests</div>
        {activeDailyQuests.map(q => <QuestRow key={q.id} quest={q} compact/>)}
        {activeWeeklyQuest && <><div style={S.questHomeTitle}>⟡ This Week</div><QuestRow quest={activeWeeklyQuest} compact weekly/></>}
      </div>

      <div style={S.navR}>
        <button style={S.navB} onClick={()=>setView("chronicle")}>◈ Chronicle</button>
        <button style={S.navB} onClick={()=>setView("quests")}>⟡ Quests</button>
        <button style={S.navB} onClick={()=>setView("achievements")}>★ Feats</button>
      </div>

      {anyMaxed && <button style={S.ascendBtn} onClick={()=>setView("ascend")}>✺ ASCEND ✺</button>}

      <button style={S.logoutBtn} onClick={()=>{setUser(null);setView("home");}}>✕ Sign Out</button>
    </div>
  );

  // ═════════════════════════════════════════════════════
  // QUESTS VIEW
  // ═════════════════════════════════════════════════════
  if (view === "quests") return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("home")}>‹</button><h2 style={S.wT}>⟡ Quests</h2></div>
      <p style={S.questStatText}>{questsCompleted} quests completed all-time</p>
      <div style={S.sectionHead}>Today · Refreshes at midnight</div>
      <div style={S.questList}>{activeDailyQuests.map(q => <QuestRow key={q.id} quest={q}/>)}</div>
      <div style={S.sectionHead}>This Week · Refreshes Monday</div>
      {activeWeeklyQuest ? <QuestRow quest={activeWeeklyQuest} weekly/> : <p style={S.emp}>No weekly quest yet.</p>}
    </div>
  );

  // ═════════════════════════════════════════════════════
  // ACHIEVEMENTS VIEW
  // ═════════════════════════════════════════════════════
  if (view === "achievements") {
    const filtered = achievementFilter === "all" ? ACHIEVEMENTS : ACHIEVEMENTS.filter(a => a.cat === achievementFilter);
    const unlockedCount = filtered.filter(a => unlockedAchievements.includes(a.id)).length;
    return (
      <div style={S.c}>
        <AnimStyles/>
        <div style={S.wH}><button style={S.bk} onClick={()=>setView("home")}>‹</button><h2 style={S.wT}>★ Feats of the Path</h2></div>
        <p style={S.aSub}>{unlockedCount} of {filtered.length} unlocked in this category</p>
        <div style={S.fR}>
          {[["all","All"],["iron","⚔ Iron"],["disc","❂ Disc."],["mind","☯ Mind"],["stride","🏃 Stride"],["cross","✺ Cross"]].map(([f,l])=>(
            <button key={f} style={{...S.fB,...(achievementFilter===f?S.fBA:{})}} onClick={()=>setAchievementFilter(f)}>{l}</button>
          ))}
        </div>
        <div style={S.aG}>{filtered.map(a=>{const u=unlockedAchievements.includes(a.id);return(
          <div key={a.id} style={{...S.aFC,...(u?S.aFU:S.aFL)}}>
            <span style={{...S.aFI,opacity:u?1:0.3}}>{a.icon}</span>
            <div style={{flex:1}}>
              <span style={{...S.aFN,color:u?"#e8dcc8":"#3d3528"}}>{a.name}</span>
              <span style={{...S.aFD,color:u?"#8b7a5e":"#2a241c"}}>{a.desc}</span>
            </div>
            {u&&<span style={S.aCk}>✓</span>}
          </div>
        );})}</div>
      </div>
    );
  }

  // ═════════════════════════════════════════════════════
  // ASCENSION VIEW
  // ═════════════════════════════════════════════════════
  if (view === "ascend") return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("home")}>‹</button><h2 style={S.wT}>✺ Ascension</h2></div>
      <div style={S.ascendBox}>
        <div style={S.ascendGlyph}>✺</div>
        <h3 style={S.ascendTitle}>The Path Begins Anew</h3>
        <p style={S.ascendDesc}>You have reached the pinnacle of a pillar. Ascension resets your levels across all three pillars but grants a permanent +10% XP multiplier, stackable with each ascension.</p>
        <div style={S.ascendStats}>
          <div style={S.ascendStat}><span style={S.ascendStatLbl}>Current Ascensions</span><span style={S.ascendStatVal}>{ascensions}</span></div>
          <div style={S.ascendStat}><span style={S.ascendStatLbl}>Active Multiplier</span><span style={S.ascendStatVal}>×{ascMultiplier.toFixed(1)}</span></div>
          <div style={S.ascendStat}><span style={S.ascendStatLbl}>After Ascending</span><span style={S.ascendStatVal}>×{(ascMultiplier+0.1).toFixed(1)}</span></div>
        </div>
        <p style={S.ascendWarning}>⚠ This cannot be undone. Your achievements and history will remain.</p>
        <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,200,0.2),rgba(220,180,240,0.1))",borderColor:"rgba(220,180,240,0.3)",color:"#d4b4e4"}} onClick={ascend}>✺ ASCEND ✺</button>
        <button style={S.hmB} onClick={()=>setView("home")}>Not Yet</button>
      </div>
    </div>
  );

  // ═════════════════════════════════════════════════════
  // CHRONICLE (ANALYTICS + BODY ALMANAC)
  // ═════════════════════════════════════════════════════
  if (view === "chronicle") return <ChronicleView history={history} meditations={meditations} habits={habits} habitLog={habitLog} bodyLog={bodyLog} runs={runs} ironXP={ironXP} discXP={discXP} mindXP={mindXP} strideXP={strideXP} onBack={()=>setView("home")} onBodyAlmanac={()=>setView("body-almanac")} onInsights={()=>setView("insights")} onMonthlyChronicle={()=>setView("monthly-chronicle")}/>;
  if (view === "monthly-chronicle") return <MonthlyChronicleView history={history} meditations={meditations} habits={habits} habitLog={habitLog} bodyLog={bodyLog} runs={runs} ironXP={ironXP} discXP={discXP} mindXP={mindXP} strideXP={strideXP} unlockedAchievements={unlockedAchievements} user={user} onBack={()=>setView("chronicle")}/>;
  if (view === "insights") return <InsightsView history={history} meditations={meditations} habits={habits} habitLog={habitLog} ironXP={ironXP} discXP={discXP} mindXP={mindXP} onBack={()=>setView("chronicle")}/>;
  if (view === "body-almanac") return <BodyAlmanacView bodyLog={bodyLog} trackedMetrics={trackedMetrics} logFrequency={logFrequency} onBack={()=>setView("chronicle")} onLogNew={()=>setView("body-log")} onSettings={()=>setView("body-settings")}/>;
  if (view === "body-log") return <BodyLogView trackedMetrics={trackedMetrics} latestEntry={bodyLog[0]} onSave={saveBodyEntry} onBack={()=>setView("body-almanac")}/>;
  if (view === "body-settings") return <BodySettingsView trackedMetrics={trackedMetrics} logFrequency={logFrequency} onSave={async (tm, lf)=>{setTrackedMetrics(tm);setLogFrequency(lf);await save(user,"trackedMetrics",tm);await save(user,"logFrequency",lf);setView("body-almanac");}} onBack={()=>setView("body-almanac")}/>;
  if (view === "body-summary") return (
    <SummaryView icon="⚖" pillar="disc" pillarColor="#a0c49c" title="Measurements Logged" date={new Date()} earnedXP={earnedXP} xpLabel="Discipline XP Earned" xpBreakdown={[`Base: +10`, `Per metric: +${earnedXP-10}`]} onReturn={()=>setView("body-almanac")}/>
  );

  // ═════════════════════════════════════════════════════
  // IRON VIEWS
  // ═════════════════════════════════════════════════════
  if (view === "iron-home") return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("home")}>‹</button><h2 style={{...S.wT,flex:1}}>⚔ Iron</h2><button style={S.gearBtn} onClick={()=>setView("iron-settings")}>⚙</button></div>
      <RankCard rank={iron} xp={ironXP} pillar="iron"/>
      <div style={S.dv}>━━━ ◈ ━━━</div>
      <div style={S.dGrid}>{Object.entries(workouts).map(([k,w])=>(<button key={k} style={S.dCard} onClick={()=>startWorkout(k)}><div style={S.dCardL}><span style={S.dSig}>{w.sigil}</span><div><span style={S.dName}>{w.name}</span><span style={S.dCnt}>{w.exercises.length} exercises</span></div></div><span style={S.dArr}>▸</span></button>))}</div>
      <div style={S.navR}>
        <button style={S.navB} onClick={()=>setView("iron-history")}>◆ History</button>
        <button style={S.navB} onClick={()=>setView("iron-ranks")}>◈ Ranks</button>
      </div>
    </div>
  );

  if (view === "iron-workout") { const w=workouts[activeDay]; const cs=Object.values(session).filter(s=>s.done).length; const ts=Object.values(session).length; return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("iron-home")}>✕</button><div style={{flex:1}}><h2 style={S.wT}>{w.sigil} {w.name}</h2><p style={S.pTx}>{cs}/{ts} sets · ~{calcIronXP(session)} XP</p></div></div>
      <div style={S.pBg}><div style={{...S.pFl,width:`${(cs/ts)*100}%`}}/></div>
      {restTimer!==null&&<div style={S.rBan}><span style={S.rTx}>Rest — {restSeconds}s</span><button style={S.rSk} onClick={()=>{setRestTimer(null);setRestSeconds(0);}}>Skip</button></div>}
      <div style={S.exL}>{w.exercises.map(ex=>(<div key={ex.id} style={S.exC}>
        <div style={S.exH}><button style={S.exNameBtn} onClick={()=>{setActiveExercise(ex);setView("exercise-detail");}}>{ex.name} <span style={S.infoTag}>ⓘ</span></button><span style={S.exTg}>{ex.sets}×{ex.targetReps}{ex.note?` (${ex.note})`:""}</span></div>
        <div style={S.stC}>{Array.from({length:ex.sets},(_,i)=>{const k=`${ex.id}-s${i+1}`;const s=session[k];return(<div key={k} style={{...S.sR,...(s.done?S.sRD:{})}}><span style={S.sL}>S{i+1}</span><input style={S.inp} type="number" inputMode="numeric" placeholder="lbs" value={s.weight} onChange={e=>updateSet(k,"weight",e.target.value)}/><span style={S.sep}>×</span><input style={S.inp} type="number" inputMode="numeric" placeholder="reps" value={s.reps} onChange={e=>updateSet(k,"reps",e.target.value)}/><button style={{...S.chk,...(s.done?S.chkD:{})}} onClick={()=>toggleDone(k)}>{s.done?"✓":"○"}</button></div>);})}</div>
      </div>))}</div>
      <button style={{...S.finB,opacity:cs===0?0.4:1}} onClick={finishWorkout} disabled={cs===0}>◆ Finish & Record ◆</button>
    </div>
  );}

  if (view === "exercise-detail" && activeExercise) { const info = EXERCISE_INFO[activeExercise.name] || { movement:"push", cues:["Form info unavailable"] }; const pr = prs[activeExercise.id]; return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("iron-workout")}>‹</button><h2 style={S.wT}>{activeExercise.name}</h2></div>
      <div style={S.diagramBox}><ExerciseDiagram movement={info.movement}/></div>
      {pr && <div style={S.prBox}><span style={S.prLbl}>Personal Record</span><span style={S.prVal}>{pr} lbs</span></div>}
      <div style={S.cueHeader}>◆ Progression</div>
      <ProgressionChart history={history} exerciseId={activeExercise.id} pr={pr}/>
      <div style={S.cueHeader}>◆ Form Cues</div>
      <div style={S.cueList}>{info.cues.map((c,i)=>(<div key={i} style={S.cueRow}><span style={S.cueNum}>{i+1}</span><span style={S.cueText}>{c}</span></div>))}</div>
      <div style={S.targetBox}><span style={S.targetLbl}>Target</span><span style={S.targetVal}>{activeExercise.sets} × {activeExercise.targetReps}{activeExercise.note?` (${activeExercise.note})`:""}</span></div>
      <button style={S.hmB} onClick={()=>setView("iron-workout")}>Return to Workout</button>
    </div>
  );}

  if (view === "iron-summary") { const w=workouts[activeDay]; const cs=Object.values(session).filter(s=>s.done).length; const ts=Object.values(session).length; const vol=sessionVolume(session); return (
    <SummaryView
      icon="◆" pillar="iron" pillarColor="#c4a96a"
      title="Session Recorded" date={new Date()}
      leveledUp={ironLeveledUp} newRank={iron}
      earnedXP={earnedXP} xpLabel="Iron XP Earned" xpBreakdown={[`${cs} sets × 10`, `Volume bonus: +${Math.floor(vol/100)}`, ...(cs===ts?[`Perfect session: +50`]:[])]}
      stats={[[`${w.sigil} Workout`, w.name],["Sets",`${cs}/${ts}`],["Volume",`${vol.toLocaleString()} lbs`]]}
      completedQuests={completedQuestsThisAction} newAchievements={newAchievements}
      onReturn={()=>setView("iron-home")}
    />
  );}

  if (view === "iron-history") return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("iron-home")}>‹</button><h2 style={S.wT}>◆ Iron History</h2></div>
      <div style={S.hL}>{history.length===0&&<p style={S.emp}>No sessions yet.</p>}{history.map((e,i)=>{const w=workouts[e.day];const sets=Object.values(e.sets);const d=sets.filter(s=>s.done).length;const v=sets.reduce((s,x)=>s+(parseFloat(x.weight)||0)*(parseFloat(x.reps)||0),0);return(<div key={i} style={S.hC}><div style={S.hCT}><span style={S.hCS}>{w.sigil}</span><span style={S.hCN}>{w.name}</span><span style={S.hCD}>{fmtDate(new Date(e.date))}</span></div><div><span style={S.hCM}>{d} sets · {v.toLocaleString()} lbs</span></div></div>);})}</div>
    </div>
  );

  if (view === "iron-ranks") return <RanksView ranks={IRON_RANKS} currentLvl={iron.current.level} currentXP={ironXP} title="⚔ Ranks of Iron" onBack={()=>setView("iron-home")}/>;

  if (view === "iron-settings") return <IronSettings workouts={workouts} sigils={DEFAULT_SIGILS} onSave={async (nw)=>{setWorkouts(nw);await save(user,"workouts",nw);setView("iron-home");}} onEditDay={(nw,k)=>{setWorkouts(nw);save(user,"workouts",nw);setView("iron-edit-day:"+k);}} onBack={()=>setView("iron-home")}/>;

  if (view.startsWith("iron-edit-day:")) { const dayKey = view.split(":")[1]; const day = workouts[dayKey]; if (!day) { setView("iron-settings"); return null; } return <IronEditDay dayKey={dayKey} day={day} workouts={workouts} sigils={DEFAULT_SIGILS} onSave={async (nw)=>{setWorkouts(nw);await save(user,"workouts",nw);}} onBack={()=>setView("iron-settings")}/>;}

  // ═════════════════════════════════════════════════════
  // DISCIPLINE VIEWS
  // ═════════════════════════════════════════════════════
  if (view === "disc-home") { const tk = todayKey(); const completedToday = habits.filter(h => habitLog[h.id]?.[tk]).length; return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("home")}>‹</button><h2 style={S.wT}>❂ Discipline</h2></div>
      <RankCard rank={disc} xp={discXP} pillar="disc"/>
      <div style={S.todaySummary}>{completedToday}/{habits.length} rituals completed today</div>
      <div style={S.dv}>━━━ ◈ ━━━</div>
      <div style={S.sectionHead}>Today's Rituals</div>
      <div style={S.habitList}>{habits.length===0&&<p style={S.emp}>No habits yet.</p>}{habits.map(h=>{const done=habitLog[h.id]?.[tk];const streak=calcHabitStreak(habitLog,h.id);return(<button key={h.id} style={{...S.habitCard,...(done?S.habitCardDone:{})}} onClick={()=>toggleHabitToday(h.id)}><span style={S.habitIcon}>{h.icon}</span><div style={S.habitMid}><span style={S.habitName}>{h.name}</span>{streak>0&&<span style={S.habitStreak}>🔥 {streak}d streak</span>}</div><button style={{...S.habitCheck,...(done?S.habitCheckDone:{})}} onClick={(e)=>{e.stopPropagation();setActiveHabit(h);setView("habit-detail");}}>ⓘ</button></button>);})}</div>
      <button style={S.addHabitBtn} onClick={()=>setView("add-habit")}>+ Add Ritual</button>
      <div style={S.navR}><button style={S.navB} onClick={()=>setView("disc-ranks")}>◈ Ranks</button></div>
    </div>
  );}

  if (view === "add-habit") return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("disc-home")}>‹</button><h2 style={S.wT}>+ New Ritual</h2></div>
      <div style={S.sectionHead}>Custom</div>
      <div style={S.customHabitRow}>
        <input style={S.iconInput} value={newHabitIcon} onChange={e=>setNewHabitIcon(e.target.value.slice(0,2))} maxLength={2}/>
        <input style={{...S.inp, flex:1, width:"auto"}} placeholder="New ritual name..." value={newHabitName} onChange={e=>setNewHabitName(e.target.value)}/>
      </div>
      <button style={{...S.addHabitBtn,marginBottom:"20px"}} onClick={()=>addHabit(null)}>+ Add Custom</button>
      <div style={S.sectionHead}>Presets</div>
      <div style={S.presetGrid}>{PRESET_HABITS.filter(p=>!habits.find(h=>h.id===p.id)).map(p=>(<button key={p.id} style={S.presetCard} onClick={()=>addHabit(p)}><span style={S.habitIcon}>{p.icon}</span><span style={S.habitName}>{p.name}</span></button>))}</div>
    </div>
  );

  if (view === "habit-detail" && activeHabit) { const streak = calcHabitStreak(habitLog, activeHabit.id); const log = habitLog[activeHabit.id] || {}; const total = Object.keys(log).filter(k=>log[k]).length; return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("disc-home")}>‹</button><h2 style={S.wT}>{activeHabit.icon} {activeHabit.name}</h2></div>
      <div style={S.statsRow}><div style={S.statBox}><span style={S.statBoxVal}>{streak}</span><span style={S.statBoxLbl}>Streak</span></div><div style={S.statBox}><span style={S.statBoxVal}>{total}</span><span style={S.statBoxLbl}>Total</span></div></div>
      <div style={S.sectionHead}>Last 365 Days</div>
      <DotCalendar log={log}/>
      <button style={{...S.clr,marginTop:"20px"}} onClick={()=>{removeHabit(activeHabit.id);setView("disc-home");}}>Remove Ritual</button>
    </div>
  );}

  if (view === "disc-ranks") return <RanksView ranks={DISC_RANKS} currentLvl={disc.current.level} currentXP={discXP} title="❂ Ranks of Discipline" onBack={()=>setView("disc-home")}/>;

  // ═════════════════════════════════════════════════════
  // MIND VIEWS
  // ═════════════════════════════════════════════════════
  if (view === "mind-home") { const selectedTypeInfo = medTypes.find(t=>t.id===medSelectedType) || medTypes[0]; return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("home")}>‹</button><h2 style={{...S.wT,flex:1}}>☯ Mind</h2><button style={S.gearBtn} onClick={()=>setView("mind-settings")}>⚙</button></div>
      <RankCard rank={mind} xp={mindXP} pillar="mind"/>
      <div style={S.dv}>━━━ ◈ ━━━</div>
      <div style={S.sectionHead}>Type</div>
      <div style={S.medTypeGrid}>{medTypes.map(t=>(<button key={t.id} style={{...S.medTypeBtn,...(medSelectedType===t.id?S.medTypeBtnActive:{})}} onClick={()=>setMedSelectedType(t.id)}><span style={S.medTypeIcon}>{t.icon}</span><span style={S.medTypeName}>{t.name}</span></button>))}</div>
      <div style={S.sectionHead}>Duration</div>
      <div style={S.durationGrid}>{medDurationPresets.map(d=>(<button key={d} style={{...S.durBtn,...(medDuration===d?S.durBtnActive:{})}} onClick={()=>setMedDuration(d)}>{d}<span style={S.durUnit}>min</span></button>))}</div>
      <button style={{...S.finB,background:"linear-gradient(135deg,rgba(106,122,138,0.15),rgba(156,180,196,0.15))",borderColor:"rgba(156,180,196,0.3)",color:"#9cb4c4"}} onClick={startMeditation}>{selectedTypeInfo.icon} Begin {selectedTypeInfo.name} {selectedTypeInfo.icon}</button>
      {meditations.length>0&&<><div style={S.sectionHead}>Recent</div><div style={S.hL}>{meditations.slice(0,5).map((m,i)=>{const tInfo = medTypes.find(t=>t.id===m.type); return(<div key={i} style={S.medCard}><div style={S.medCardTop}><span style={S.medDur}>{tInfo?tInfo.icon+" ":""}{m.duration} min</span><span style={S.hCD}>{fmtDate(new Date(m.date))}</span></div>{m.journal&&<p style={S.medJ}>{m.journal.length>120?m.journal.slice(0,120)+"...":m.journal}</p>}</div>);})}</div></>}
      <div style={S.navR}><button style={S.navB} onClick={()=>setView("mind-ranks")}>◈ Ranks</button></div>
    </div>
  );}

  if (view === "med-active") { const pct = medDuration > 0 ? 1 - (medRemaining / (medDuration*60)) : 0; const mins = Math.floor(medRemaining/60); const secs = medRemaining%60; return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.medActiveBox}>
        <div style={S.medBreathCircle}><div style={S.medBreathInner}/></div>
        <div style={S.medTime}>{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</div>
        <div style={S.medProgressBg}><div style={{...S.medProgressFl,width:`${pct*100}%`}}/></div>
        <p style={S.medGuide}>breathe in... breathe out...</p>
      </div>
      <div style={S.medControls}>
        <button style={S.medCtrlBtn} onClick={()=>setMedPaused(!medPaused)}>{medPaused?"▶ Resume":"⏸ Pause"}</button>
        <button style={{...S.medCtrlBtn,borderColor:"rgba(180,60,60,0.3)",color:"rgba(180,60,60,0.7)"}} onClick={()=>{if(confirm("End session early?")){setMedActive(false);setMedCompleted(medDuration - Math.ceil(medRemaining/60));setView("med-journal");}}}>End</button>
      </div>
    </div>
  );}

  if (view === "med-journal") return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><h2 style={S.wT}>☽ Reflection</h2></div>
      <p style={S.medReflectSub}>You meditated for {medCompleted} minute{medCompleted!==1?"s":""}. Record what surfaced.</p>
      <textarea style={S.journalArea} placeholder="Thoughts, feelings, insights..." value={medJournal} onChange={e=>setMedJournal(e.target.value)}/>
      <button style={S.finB} onClick={finishJournal}>◆ Save & Complete ◆</button>
      <button style={{...S.hmB,marginTop:"8px"}} onClick={finishJournal}>Skip Journal</button>
    </div>
  );

  if (view === "med-summary") return (
    <SummaryView
      icon="☽" pillar="mind" pillarColor="#9cb4c4"
      title="Session Complete" date={new Date()}
      earnedXP={earnedXP} xpLabel="Mind XP Earned" xpBreakdown={[`${medCompleted} min × 1`, ...(medCompleted>=20?[`Long session: +10`]:[])]}
      completedQuests={completedQuestsThisAction} newAchievements={newAchievements}
      onReturn={()=>setView("mind-home")}
    />
  );

  if (view === "mind-ranks") return <RanksView ranks={MIND_RANKS} currentLvl={mind.current.level} currentXP={mindXP} title="☯ Ranks of Mind" onBack={()=>setView("mind-home")}/>;

  if (view === "mind-settings") return <MindSettings medTypes={medTypes} medDurationPresets={medDurationPresets} onSave={async (nt, np)=>{setMedTypes(nt);setMedDurationPresets(np);await save(user,"medTypes",nt);await save(user,"medDurationPresets",np);setView("mind-home");}} onBack={()=>setView("mind-home")}/>;

  // ═════════════════════════════════════════════════════
  // STRIDE VIEWS
  // ═════════════════════════════════════════════════════
  if (view === "stride-home") return <StrideHome rank={stride} xp={strideXP} runs={runs} activeProgram={activeProgram} onBack={()=>setView("home")} onLogRun={()=>setView("stride-log")} onTrackLive={()=>setView("stride-gps")} onStartProgram={()=>setView("stride-programs")} onContinueProgram={()=>setView("stride-program-view")} onHistory={()=>setView("stride-history")} onRanks={()=>setView("stride-ranks")}/>;

  if (view === "stride-gps") return <StrideGPSView onFinish={(data)=>{setView("stride-log-from-gps"); window._gpsData = data;}} onBack={()=>setView("stride-home")}/>;

  if (view === "stride-log-from-gps") return <StrideLogView prefillData={window._gpsData} onSave={(data)=>{delete window._gpsData; saveRun(data);}} onBack={()=>setView("stride-home")}/>;

  if (view === "stride-log") return <StrideLogView onSave={saveRun} onBack={()=>setView("stride-home")}/>;

  if (view === "stride-programs") return <StrideProgramsView activeProgram={activeProgram} onStart={startProgram} onOpenStandalone={(id)=>setView("stride-standalone:"+id)} onBack={()=>setView("stride-home")}/>;

  if (view === "stride-program-view") return <StrideProgramView activeProgram={activeProgram} onLogWorkout={(idx)=>setView("stride-log-program:"+idx)} onAbandon={abandonProgram} onBack={()=>setView("stride-home")}/>;

  if (view.startsWith("stride-standalone:")) { const progId = view.split(":")[1]; return <StrideStandaloneView programId={progId} onComplete={(data)=>{saveRun(data);}} onBack={()=>setView("stride-programs")}/>; }

  if (view.startsWith("stride-log-program:")) { const idx = parseInt(view.split(":")[1]); return <StrideLogView programWorkoutIdx={idx} activeProgram={activeProgram} onSave={saveRun} onBack={()=>setView("stride-program-view")}/>; }

  if (view === "stride-summary") return (
    <SummaryView icon="🏃" pillar="stride" pillarColor="#dcb496" title="Run Recorded" date={new Date()} earnedXP={earnedXP} xpLabel="Stride XP Earned" xpBreakdown={["Base: +10", "Distance + Duration + Effort bonus"]} onReturn={()=>setView("stride-home")}/>
  );

  if (view === "stride-history") return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={()=>setView("stride-home")}>‹</button><h2 style={S.wT}>🏃 Run History</h2></div>
      <div style={S.hL}>{runs.length===0&&<p style={S.emp}>No runs logged yet.</p>}{runs.map((r,i)=>{const rt = RUN_TYPES.find(t=>t.id===r.type) || RUN_TYPES[0]; return (<div key={i} style={S.hC}><div style={S.hCT}><span style={S.hCS}>{r.indoor ? "🏠" : rt.icon}</span><span style={S.hCN}>{r.distance} mi · {formatDuration(r.duration)}</span><span style={S.hCD}>{fmtDate(new Date(r.date))}</span></div><div><span style={S.hCM}>{rt.name}{r.indoor ? " · Treadmill" : ""}{r.pace?` · ${r.pace} pace`:""}{r.effort?` · Effort ${r.effort}/8`:""}{r.incline ? ` · ${r.incline}% incline` : ""}</span></div></div>);})}</div>
    </div>
  );

  if (view === "stride-ranks") return <RanksView ranks={STRIDE_RANKS} currentLvl={stride.current.level} currentXP={strideXP} title="🏃 Ranks of Stride" onBack={()=>setView("stride-home")}/>;

  return null;
}

// ═══════════════════════════════════════════════════════════════
// SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

function PillarCard({ rank, xp, pillar, name, onClick }) {
  const colors = {
    iron: { bg: "linear-gradient(135deg,rgba(139,122,94,0.1),rgba(196,169,106,0.05))", border: "rgba(196,169,106,0.2)", bar: "linear-gradient(90deg,#8b7a5e,#c4a96a)", text: "#c4a96a" },
    disc: { bg: "linear-gradient(135deg,rgba(107,138,106,0.1),rgba(160,196,156,0.05))", border: "rgba(160,196,156,0.2)", bar: "linear-gradient(90deg,#6b8a6a,#a0c49c)", text: "#a0c49c" },
    mind: { bg: "linear-gradient(135deg,rgba(106,122,138,0.1),rgba(156,180,196,0.05))", border: "rgba(156,180,196,0.2)", bar: "linear-gradient(90deg,#6a7a8a,#9cb4c4)", text: "#9cb4c4" },
    stride: { bg: "linear-gradient(135deg,rgba(180,140,120,0.1),rgba(220,180,150,0.05))", border: "rgba(220,180,150,0.2)", bar: "linear-gradient(90deg,#b48c78,#dcb496)", text: "#dcb496" },
  };
  const c = colors[pillar];
  return (
    <button style={{...S.pillar, background: c.bg, border: `1px solid ${c.border}`}} onClick={onClick}>
      <div style={S.pillarHead}>
        <span style={S.pillarEmb}>{rank.current.emblem}</span>
        <div style={{flex:1}}>
          <div style={S.pillarNameRow}><span style={S.pillarName}>{name}</span><span style={{...S.pillarTier,color:c.text}}>{rank.current.tier}-Rank</span></div>
          <span style={S.pillarTitle}>Lvl {rank.current.level} · {rank.current.tierName}</span>
        </div>
      </div>
      <div style={S.pillarBar}><div style={{...S.pillarBarFill,width:`${rank.progress*100}%`,background:c.bar}}/></div>
      <span style={S.pillarXP}>{xp.toLocaleString()} XP{rank.next?` · ${(rank.next.xp-xp).toLocaleString()} to Lvl ${rank.next.level}`:' · MAX'}</span>
    </button>
  );
}

function RankCard({ rank, xp, pillar }) {
  const colors = { iron: { grad:"linear-gradient(135deg,rgba(139,122,94,0.1),rgba(196,169,106,0.05))", border:"rgba(196,169,106,0.2)", text:"#c4a96a", bar:"linear-gradient(90deg,#8b7a5e,#c4a96a)" }, disc: { grad:"linear-gradient(135deg,rgba(107,138,106,0.1),rgba(160,196,156,0.05))", border:"rgba(160,196,156,0.2)", text:"#a0c49c", bar:"linear-gradient(90deg,#6b8a6a,#a0c49c)" }, mind: { grad:"linear-gradient(135deg,rgba(106,122,138,0.1),rgba(156,180,196,0.05))", border:"rgba(156,180,196,0.2)", text:"#9cb4c4", bar:"linear-gradient(90deg,#6a7a8a,#9cb4c4)" }, stride: { grad:"linear-gradient(135deg,rgba(180,140,120,0.1),rgba(220,180,150,0.05))", border:"rgba(220,180,150,0.2)", text:"#dcb496", bar:"linear-gradient(90deg,#b48c78,#dcb496)" } };
  const c = colors[pillar];
  return (
    <div style={{...S.lvlCard, background: c.grad, borderColor: c.border}}>
      <div style={S.lvlTop}>
        <span style={S.lvlEmb}>{rank.current.emblem}</span>
        <div style={S.lvlInfo}>
          <span style={{...S.lvlTt,color:c.text}}>Lvl {rank.current.level} — {rank.current.tier}-Rank {rank.current.tierName}</span>
          <span style={S.xpTx}>{xp.toLocaleString()} XP{rank.next?` · ${(rank.next.xp-xp).toLocaleString()} to next`:' · MAX'}</span>
        </div>
      </div>
      <div style={S.xpBg}><div style={{...S.xpFl,width:`${rank.progress*100}%`,background:c.bar}}/></div>
    </div>
  );
}

function QuestRow({ quest, compact, weekly }) {
  const pct = Math.min(100, (quest.progress / quest.target) * 100);
  const pillarColor = { iron: "#c4a96a", disc: "#a0c49c", mind: "#9cb4c4", cross: "#b89cc4" }[quest.pillar] || "#c4a96a";
  return (
    <div style={{...S.questCard, opacity: quest.completed ? 0.6 : 1}}>
      <div style={S.questTop}>
        <span style={{...S.questText, textDecoration: quest.completed ? "line-through" : "none"}}>{quest.text}</span>
        <span style={{...S.questReward, color: pillarColor}}>{quest.completed ? "✓" : `+${quest.xp}`}</span>
      </div>
      {!compact && <div style={S.questProgBg}><div style={{...S.questProgFl, width:`${pct}%`, background: pillarColor}}/></div>}
      <span style={S.questMeta}>{quest.progress.toLocaleString()}/{quest.target.toLocaleString()} · {weekly ? "weekly" : "daily"}</span>
    </div>
  );
}

function SummaryView({ icon, pillar, pillarColor, title, date, leveledUp, newRank, earnedXP, xpLabel, xpBreakdown, stats, completedQuests, newAchievements, onReturn }) {
  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.sumH}>
        {leveledUp && newRank && <div style={S.luBan}><span style={S.luIc}>✦</span><span style={S.luTx}>RANK UP!</span><span style={S.luTt}>{newRank.current.emblem} Lvl {newRank.current.level} {newRank.current.tierName}</span></div>}
        {!leveledUp && <div style={{...S.sumIc,color:pillarColor}}>{icon}</div>}
        <h2 style={S.sumTt}>{title}</h2>
        <p style={S.sumDt}>{fmtDate(date)}</p>
      </div>
      <div style={{...S.xpEC, borderColor: pillarColor+"40"}}>
        <span style={S.xpEL}>{xpLabel}</span>
        <span style={{...S.xpEV, color: pillarColor}}>+{earnedXP}</span>
        <div style={S.xpBk}>{xpBreakdown.map((b,i)=>(<span key={i} style={S.xpBI}>{b}</span>))}</div>
      </div>
      {stats && <div style={S.sumSt}>{stats.map(([l,v],i)=>(<div key={i} style={S.stRw}><span style={S.stLb}>{l}</span><span style={S.stVl}>{v}</span></div>))}</div>}
      {completedQuests && completedQuests.length > 0 && (
        <div style={S.naS}>
          <span style={S.naTt}>⟡ Quests Complete ⟡</span>
          {completedQuests.map(q => (
            <div key={q.id} style={{...S.naC, borderColor: "rgba(180,140,200,0.3)", background: "rgba(180,140,200,0.08)"}}>
              <span style={S.naIc}>⟡</span>
              <div><span style={S.naN}>{q.text}</span><span style={S.naD}>+{q.xp} XP</span></div>
            </div>
          ))}
        </div>
      )}
      {newAchievements && newAchievements.length > 0 && (
        <div style={S.naS}>
          <span style={S.naTt}>★ New Feats Unlocked ★</span>
          {newAchievements.map(a => (
            <div key={a.id} style={S.naC}><span style={S.naIc}>{a.icon}</span><div><span style={S.naN}>{a.name}</span><span style={S.naD}>{a.desc}</span></div></div>
          ))}
        </div>
      )}
      <button style={S.hmB} onClick={onReturn}>Return to Grimoire</button>
    </div>
  );
}

function IronSettings({ workouts, sigils, onSave, onEditDay, onBack }) {
  const [w, setW] = useState(JSON.parse(JSON.stringify(workouts)));
  const [newDayName, setNewDayName] = useState("");
  const [newDaySigil, setNewDaySigil] = useState("✦");

  const addDay = () => {
    if (!newDayName.trim()) return;
    const keys = Object.keys(w);
    let nextKey = "D";
    for (let i = 0; i < 26; i++) {
      const k = String.fromCharCode(65 + i);
      if (!keys.includes(k)) { nextKey = k; break; }
    }
    setW({...w, [nextKey]: { name: newDayName.trim(), sigil: newDaySigil, exercises: [] }});
    setNewDayName(""); setNewDaySigil("✦");
  };
  const removeDay = (key) => {
    if (!confirm(`Remove "${w[key].name}"? This won't delete history.`)) return;
    const nw = {...w}; delete nw[key]; setW(nw);
  };

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>⚙ Workout Settings</h2></div>
      <div style={S.sectionHead}>Workout Days</div>
      <div style={S.settingsList}>
        {Object.entries(w).map(([k, day]) => (
          <div key={k} style={S.settingsRow}>
            <span style={S.settingsRowIcon}>{day.sigil}</span>
            <span style={{...S.settingsRowText, flex:1}}>{day.name}</span>
            <span style={S.settingsRowMeta}>{day.exercises.length} ex</span>
            <button style={S.settingsEditBtn} onClick={()=>onEditDay(w,k)}>✎</button>
            <button style={S.settingsDelBtn} onClick={()=>removeDay(k)}>✕</button>
          </div>
        ))}
      </div>
      <div style={S.sectionHead}>Add New Day</div>
      <div style={S.settingsAddRow}>
        <select style={S.sigilSelect} value={newDaySigil} onChange={e=>setNewDaySigil(e.target.value)}>
          {sigils.map(s=>(<option key={s} value={s}>{s}</option>))}
        </select>
        <input style={{...S.authInput,flex:1,textAlign:"left"}} placeholder="Day name..." value={newDayName} onChange={e=>setNewDayName(e.target.value)}/>
        <button style={S.settingsAddBtn} onClick={addDay}>+</button>
      </div>
      <p style={S.settingsHint}>Tap a day name on the workout screen, then use the edit button to manage exercises within each day.</p>
      <button style={S.authBtn} onClick={()=>onSave(w)}>Save Changes</button>
      <button style={{...S.authBack,marginTop:"8px"}} onClick={onBack}>Cancel</button>
    </div>
  );
}

function IronEditDay({ dayKey, day, workouts, sigils, onSave, onBack }) {
  const [name, setName] = useState(day.name);
  const [sigil, setSigil] = useState(day.sigil);
  const [exercises, setExercises] = useState([...day.exercises]);
  const [newExName, setNewExName] = useState("");
  const [newExSets, setNewExSets] = useState("3");
  const [newExReps, setNewExReps] = useState("10");

  const addExercise = () => {
    if (!newExName.trim()) return;
    const id = `${dayKey.toLowerCase()}_custom_${Date.now()}`;
    setExercises([...exercises, { id, name: newExName.trim(), sets: parseInt(newExSets)||3, targetReps: parseInt(newExReps)||10 }]);
    setNewExName(""); setNewExSets("3"); setNewExReps("10");
  };
  const removeExercise = (idx) => {
    const ne = [...exercises]; ne.splice(idx, 1); setExercises(ne);
  };
  const moveExercise = (idx, dir) => {
    const ne = [...exercises];
    const target = idx + dir;
    if (target < 0 || target >= ne.length) return;
    [ne[idx], ne[target]] = [ne[target], ne[idx]];
    setExercises(ne);
  };
  const saveDay = () => {
    const nw = {...workouts, [dayKey]: { name, sigil, exercises }};
    onSave(nw);
    onBack();
  };

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>✎ Edit Day</h2></div>
      <div style={S.sectionHead}>Day Info</div>
      <div style={S.settingsAddRow}>
        <select style={S.sigilSelect} value={sigil} onChange={e=>setSigil(e.target.value)}>
          {sigils.map(s=>(<option key={s} value={s}>{s}</option>))}
        </select>
        <input style={{...S.authInput,flex:1,textAlign:"left"}} value={name} onChange={e=>setName(e.target.value)}/>
      </div>
      <div style={S.sectionHead}>Exercises ({exercises.length})</div>
      <div style={S.settingsList}>
        {exercises.map((ex, idx) => (
          <div key={ex.id} style={S.settingsRow}>
            <div style={S.reorderBtns}>
              <button style={S.reorderBtn} onClick={()=>moveExercise(idx,-1)} disabled={idx===0}>▲</button>
              <button style={S.reorderBtn} onClick={()=>moveExercise(idx,1)} disabled={idx===exercises.length-1}>▼</button>
            </div>
            <span style={{...S.settingsRowText, flex:1}}>{ex.name}</span>
            <span style={S.settingsRowMeta}>{ex.sets}×{ex.targetReps}</span>
            <button style={S.settingsDelBtn} onClick={()=>removeExercise(idx)}>✕</button>
          </div>
        ))}
        {exercises.length===0&&<p style={S.emp}>No exercises yet.</p>}
      </div>
      <div style={S.sectionHead}>Add Exercise</div>
      <input style={{...S.authInput,textAlign:"left",marginBottom:"8px"}} placeholder="Exercise name..." value={newExName} onChange={e=>setNewExName(e.target.value)}/>
      <div style={S.settingsAddRow}>
        <div style={S.setsRepsInput}><input style={S.smallInput} type="number" inputMode="numeric" value={newExSets} onChange={e=>setNewExSets(e.target.value)}/><span style={S.setsRepsLabel}>sets</span></div>
        <span style={S.sep}>×</span>
        <div style={S.setsRepsInput}><input style={S.smallInput} type="number" inputMode="numeric" value={newExReps} onChange={e=>setNewExReps(e.target.value)}/><span style={S.setsRepsLabel}>reps</span></div>
        <button style={S.settingsAddBtn} onClick={addExercise}>+</button>
      </div>
      <button style={{...S.authBtn,marginTop:"16px"}} onClick={saveDay}>Save Day</button>
      <button style={{...S.authBack,marginTop:"8px"}} onClick={onBack}>Cancel</button>
    </div>
  );
}

function MindSettings({ medTypes, medDurationPresets, onSave, onBack }) {
  const [types, setTypes] = useState([...medTypes]);
  const [presets, setPresets] = useState([...medDurationPresets]);
  const [newTypeName, setNewTypeName] = useState("");
  const [newTypeIcon, setNewTypeIcon] = useState("☽");
  const [newTypeDesc, setNewTypeDesc] = useState("");
  const [newPreset, setNewPreset] = useState("");

  const addType = () => {
    if (!newTypeName.trim()) return;
    const id = `med_custom_${Date.now()}`;
    setTypes([...types, { id, name: newTypeName.trim(), icon: newTypeIcon, desc: newTypeDesc.trim() || newTypeName.trim() }]);
    setNewTypeName(""); setNewTypeIcon("☽"); setNewTypeDesc("");
  };
  const removeType = (idx) => {
    if (types.length <= 1) { alert("Keep at least one meditation type."); return; }
    const nt = [...types]; nt.splice(idx, 1); setTypes(nt);
  };
  const addPreset = () => {
    const val = parseInt(newPreset);
    if (!val || val <= 0 || presets.includes(val)) return;
    const np = [...presets, val].sort((a,b)=>a-b);
    setPresets(np); setNewPreset("");
  };
  const removePreset = (val) => {
    if (presets.length <= 1) { alert("Keep at least one duration."); return; }
    setPresets(presets.filter(p=>p!==val));
  };

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>⚙ Meditation Settings</h2></div>
      <div style={S.sectionHead}>Meditation Types</div>
      <div style={S.settingsList}>
        {types.map((t, idx) => (
          <div key={t.id} style={S.settingsRow}>
            <span style={S.settingsRowIcon}>{t.icon}</span>
            <div style={{flex:1}}>
              <span style={S.settingsRowText}>{t.name}</span>
              <span style={S.settingsRowDesc}>{t.desc}</span>
            </div>
            <button style={S.settingsDelBtn} onClick={()=>removeType(idx)}>✕</button>
          </div>
        ))}
      </div>
      <div style={S.sectionHead}>Add Type</div>
      <div style={S.settingsAddRow}>
        <input style={S.iconInput} value={newTypeIcon} onChange={e=>setNewTypeIcon(e.target.value.slice(0,2))} maxLength={2}/>
        <input style={{...S.authInput,flex:1,textAlign:"left"}} placeholder="Type name..." value={newTypeName} onChange={e=>setNewTypeName(e.target.value)}/>
        <button style={S.settingsAddBtn} onClick={addType}>+</button>
      </div>
      <input style={{...S.authInput,textAlign:"left",marginBottom:"12px"}} placeholder="Short description (optional)..." value={newTypeDesc} onChange={e=>setNewTypeDesc(e.target.value)}/>

      <div style={S.sectionHead}>Duration Presets (minutes)</div>
      <div style={S.presetChipGrid}>
        {presets.map(p=>(
          <div key={p} style={S.presetChip}>
            <span style={S.presetChipVal}>{p} min</span>
            <button style={S.presetChipDel} onClick={()=>removePreset(p)}>✕</button>
          </div>
        ))}
      </div>
      <div style={S.settingsAddRow}>
        <input style={{...S.authInput,flex:1,textAlign:"left"}} type="number" inputMode="numeric" placeholder="Minutes..." value={newPreset} onChange={e=>setNewPreset(e.target.value)}/>
        <button style={S.settingsAddBtn} onClick={addPreset}>+</button>
      </div>

      <button style={{...S.authBtn,marginTop:"16px"}} onClick={()=>onSave(types,presets)}>Save Changes</button>
      <button style={{...S.authBack,marginTop:"8px"}} onClick={onBack}>Cancel</button>
    </div>
  );
}

function ChronicleView({ history, meditations, habits, habitLog, bodyLog, runs, ironXP, discXP, mindXP, strideXP, onBack, onBodyAlmanac, onInsights, onMonthlyChronicle }) {
  const wk = weekKey(new Date());
  const sessionsThisWeek = history.filter(h => weekKey(h.date) === wk).length;
  const medsThisWeek = meditations.filter(m => weekKey(m.date) === wk).length;
  const runsThisWeek = runs.filter(r => weekKey(r.date) === wk).length;
  let habitsThisWeek = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const k = dateKey(d);
    if (weekKey(d.toISOString()) === wk) {
      habits.forEach(h => { if (habitLog[h.id]?.[k]) habitsThisWeek++; });
    }
  }
  const totalXP = ironXP + discXP + mindXP + strideXP;
  const latestBody = bodyLog[0];
  const daysSinceLog = latestBody ? Math.floor((Date.now() - new Date(latestBody.date).getTime()) / 86400000) : null;
  const totalMiles = runs.reduce((s,r) => s + (parseFloat(r.distance)||0), 0);
  const now = new Date();
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthName = prevMonth.toLocaleString("default", { month: "long" });

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>◈ Chronicle</h2></div>
      <p style={S.chronicleSubtitle}>Your path, in numbers</p>

      <div style={S.chronicleGrid}>
        <button style={{...S.chronicleCard, background:"linear-gradient(135deg,rgba(180,140,200,0.08),rgba(196,169,106,0.04))", borderColor:"rgba(180,140,200,0.25)"}} onClick={onMonthlyChronicle}>
          <span style={S.chronicleCardIcon}>📜</span>
          <div style={{flex:1,textAlign:"left"}}>
            <span style={S.chronicleCardTitle}>{prevMonthName}'s Chronicle</span>
            <span style={S.chronicleCardDesc}>Monthly recap · Shareable</span>
          </div>
          <span style={S.dArr}>▸</span>
        </button>
        <button style={S.chronicleCard} onClick={onInsights}>
          <span style={S.chronicleCardIcon}>📊</span>
          <div style={{flex:1,textAlign:"left"}}>
            <span style={S.chronicleCardTitle}>Insights</span>
            <span style={S.chronicleCardDesc}>Trends, charts, and forecasts</span>
          </div>
          <span style={S.dArr}>▸</span>
        </button>
        <button style={S.chronicleCard} onClick={onBodyAlmanac}>
          <span style={S.chronicleCardIcon}>⚖</span>
          <div style={{flex:1,textAlign:"left"}}>
            <span style={S.chronicleCardTitle}>Body Almanac</span>
            <span style={S.chronicleCardDesc}>{latestBody ? `Last logged ${daysSinceLog}d ago` : "No measurements yet"}</span>
          </div>
          <span style={S.dArr}>▸</span>
        </button>
      </div>

      <div style={S.sectionHead}>This Week</div>
      <div style={S.weekStatsGrid4}>
        <div style={S.weekStatBox}><span style={{...S.weekStatVal,color:"#c4a96a"}}>{sessionsThisWeek}</span><span style={S.weekStatLbl}>Workouts</span></div>
        <div style={S.weekStatBox}><span style={{...S.weekStatVal,color:"#a0c49c"}}>{habitsThisWeek}</span><span style={S.weekStatLbl}>Rituals</span></div>
        <div style={S.weekStatBox}><span style={{...S.weekStatVal,color:"#9cb4c4"}}>{medsThisWeek}</span><span style={S.weekStatLbl}>Sessions</span></div>
        <div style={S.weekStatBox}><span style={{...S.weekStatVal,color:"#dcb496"}}>{runsThisWeek}</span><span style={S.weekStatLbl}>Runs</span></div>
      </div>

      <div style={S.sectionHead}>All Time</div>
      <div style={S.allTimeBox}>
        <div style={S.allTimeRow}><span style={S.allTimeLbl}>Total XP</span><span style={S.allTimeVal}>{totalXP.toLocaleString()}</span></div>
        <div style={S.allTimeRow}><span style={S.allTimeLbl}>Workouts</span><span style={S.allTimeVal}>{history.length}</span></div>
        <div style={S.allTimeRow}><span style={S.allTimeLbl}>Meditations</span><span style={S.allTimeVal}>{meditations.length}</span></div>
        <div style={S.allTimeRow}><span style={S.allTimeLbl}>Miles Run</span><span style={S.allTimeVal}>{totalMiles.toFixed(1)}</span></div>
        <div style={S.allTimeRow}><span style={S.allTimeLbl}>Habits Tracked</span><span style={S.allTimeVal}>{habits.length}</span></div>
      </div>
    </div>
  );
}

function MonthlyChronicleView({ history, meditations, habits, habitLog, bodyLog, runs, ironXP, discXP, mindXP, strideXP, unlockedAchievements, user, onBack }) {
  const [format, setFormat] = useState("portrait"); // portrait or square
  const [monthOffset, setMonthOffset] = useState(1); // 1 = last month, 2 = 2 months ago

  const now = new Date();
  const targetDate = new Date(now.getFullYear(), now.getMonth() - monthOffset, 1);
  const monthName = targetDate.toLocaleString("default", { month: "long" });
  const year = targetDate.getFullYear();
  const monthStart = new Date(year, targetDate.getMonth(), 1);
  const monthEnd = new Date(year, targetDate.getMonth() + 1, 0, 23, 59, 59);

  const inMonth = (date) => { const d = new Date(date); return d >= monthStart && d <= monthEnd; };

  // Iron stats
  const monthWorkouts = history.filter(h => inMonth(h.date));
  const workoutCount = monthWorkouts.length;
  const totalVolume = monthWorkouts.reduce((s,h) => s + Object.values(h.sets).reduce((ss,x) => ss + (parseFloat(x.weight)||0)*(parseFloat(x.reps)||0), 0), 0);
  const totalSets = monthWorkouts.reduce((s,h) => s + Object.values(h.sets).filter(x => x.done).length, 0);

  // Discipline stats
  let habitCompletions = 0;
  habits.forEach(h => { const log = habitLog[h.id] || {}; Object.keys(log).forEach(k => { const d = new Date(k); if (d >= monthStart && d <= monthEnd && log[k]) habitCompletions++; }); });
  let longestHabitStreak = 0;
  habits.forEach(h => { const streak = calcHabitStreak(habitLog, h.id); if (streak > longestHabitStreak) longestHabitStreak = streak; });

  // Mind stats
  const monthMeds = meditations.filter(m => inMonth(m.date));
  const medCount = monthMeds.length;
  const medMinutes = monthMeds.reduce((s,m) => s + m.duration, 0);

  // Stride stats
  const monthRuns = runs.filter(r => inMonth(r.date));
  const runCount = monthRuns.length;
  const monthMiles = monthRuns.reduce((s,r) => s + (parseFloat(r.distance)||0), 0);

  // Body
  const monthBody = bodyLog.filter(b => inMonth(b.date));
  const weightChange = (() => {
    if (monthBody.length < 2) return null;
    const first = monthBody[monthBody.length - 1]?.measurements?.weight;
    const last = monthBody[0]?.measurements?.weight;
    if (!first || !last) return null;
    return (last - first).toFixed(1);
  })();

  const monthAchievements = unlockedAchievements.length; // all-time count — used for context
  const totalXP = ironXP + discXP + mindXP + strideXP;

  // Check if there's any activity
  const hasActivity = workoutCount || habitCompletions || medCount || runCount;

  const handleShare = async () => {
    const shareText = `${monthName} ${year} — My Iron Grimoire Chronicle\n\n⚔ ${workoutCount} workouts · ${Math.round(totalVolume).toLocaleString()} lbs lifted\n🏃 ${runCount} runs · ${monthMiles.toFixed(1)} miles\n☯ ${medCount} meditations · ${medMinutes} minutes\n❂ ${habitCompletions} rituals completed\n\nTotal XP: ${totalXP.toLocaleString()}`;
    if (navigator.share) {
      try { await navigator.share({ title: `${monthName} ${year} Chronicle`, text: shareText }); }
      catch (e) { /* user cancelled */ }
    } else {
      try { await navigator.clipboard.writeText(shareText); alert("Chronicle copied to clipboard!"); }
      catch (e) { alert("Sharing not supported on this browser."); }
    }
  };

  const cardStyle = format === "portrait" ? S.recapCardPortrait : S.recapCardSquare;

  if (!hasActivity) {
    return (
      <div style={S.c}>
        <AnimStyles/>
        <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>📜 {monthName} Chronicle</h2></div>
        <div style={{...S.gpsIntro,paddingTop:"60px"}}>
          <div style={{...S.gpsIconLarge,color:"#8b7a5e"}}>📜</div>
          <h3 style={S.gpsIntroTitle}>No activity in {monthName}</h3>
          <p style={S.gpsIntroDesc}>Come back after a month of training to see your chronicle unfold.</p>
          {monthOffset < 12 && <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,200,0.15),rgba(196,169,106,0.1))",borderColor:"rgba(180,140,200,0.3)",color:"#d4b4e4"}} onClick={()=>setMonthOffset(monthOffset + 1)}>‹ Previous Month</button>}
          <button style={S.hmB} onClick={onBack}>Return</button>
        </div>
      </div>
    );
  }

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={{...S.wT,flex:1}}>📜 Monthly Chronicle</h2></div>

      <div style={S.recapMonthNav}>
        <button style={S.recapNavBtn} onClick={()=>setMonthOffset(monthOffset + 1)}>‹</button>
        <span style={S.recapMonthLbl}>{monthName} {year}</span>
        <button style={{...S.recapNavBtn,opacity:monthOffset <= 1 ? 0.3 : 1}} onClick={()=>monthOffset > 1 && setMonthOffset(monthOffset - 1)} disabled={monthOffset <= 1}>›</button>
      </div>

      <div style={S.formatToggle}>
        <button style={{...S.formatBtn,...(format==="portrait"?S.formatBtnActive:{})}} onClick={()=>setFormat("portrait")}>📱 Story</button>
        <button style={{...S.formatBtn,...(format==="square"?S.formatBtnActive:{})}} onClick={()=>setFormat("square")}>⬜ Square</button>
      </div>

      {/* The shareable card */}
      <div style={cardStyle}>
        <div style={S.recapHeader}>
          <span style={S.recapTitle}>The Chronicle of</span>
          <span style={S.recapName}>{user}</span>
          <span style={S.recapMonth}>{monthName} {year}</span>
          <div style={S.recapDivider}>━━━ ◈ ━━━</div>
        </div>

        {/* Hero stat — biggest achievement of the month */}
        <div style={S.recapHero}>
          {workoutCount >= runCount && workoutCount >= medCount ? (
            <><span style={S.recapHeroIcon}>⚔</span><span style={S.recapHeroVal}>{workoutCount}</span><span style={S.recapHeroLbl}>Workouts Completed</span></>
          ) : runCount >= medCount ? (
            <><span style={S.recapHeroIcon}>🏃</span><span style={S.recapHeroVal}>{monthMiles.toFixed(1)}</span><span style={S.recapHeroLbl}>Miles Run</span></>
          ) : (
            <><span style={S.recapHeroIcon}>☯</span><span style={S.recapHeroVal}>{medMinutes}</span><span style={S.recapHeroLbl}>Minutes Meditated</span></>
          )}
        </div>

        {/* Pillar stats */}
        <div style={S.recapPillars}>
          {workoutCount > 0 && <div style={S.recapPillarRow}>
            <span style={{...S.recapPillarIcon,color:"#c4a96a"}}>⚔</span>
            <div style={{flex:1}}>
              <span style={S.recapPillarLbl}>Iron</span>
              <span style={S.recapPillarVal}>{workoutCount} workouts · {totalSets} sets · {Math.round(totalVolume).toLocaleString()} lbs</span>
            </div>
          </div>}
          {habitCompletions > 0 && <div style={S.recapPillarRow}>
            <span style={{...S.recapPillarIcon,color:"#a0c49c"}}>❂</span>
            <div style={{flex:1}}>
              <span style={S.recapPillarLbl}>Discipline</span>
              <span style={S.recapPillarVal}>{habitCompletions} rituals · {longestHabitStreak}d longest streak</span>
            </div>
          </div>}
          {medCount > 0 && <div style={S.recapPillarRow}>
            <span style={{...S.recapPillarIcon,color:"#9cb4c4"}}>☯</span>
            <div style={{flex:1}}>
              <span style={S.recapPillarLbl}>Mind</span>
              <span style={S.recapPillarVal}>{medCount} sessions · {medMinutes} minutes</span>
            </div>
          </div>}
          {runCount > 0 && <div style={S.recapPillarRow}>
            <span style={{...S.recapPillarIcon,color:"#dcb496"}}>🏃</span>
            <div style={{flex:1}}>
              <span style={S.recapPillarLbl}>Stride</span>
              <span style={S.recapPillarVal}>{runCount} runs · {monthMiles.toFixed(1)} miles</span>
            </div>
          </div>}
          {weightChange !== null && <div style={S.recapPillarRow}>
            <span style={{...S.recapPillarIcon,color:"#a0c49c"}}>⚖</span>
            <div style={{flex:1}}>
              <span style={S.recapPillarLbl}>Body</span>
              <span style={S.recapPillarVal}>{weightChange > 0 ? "+" : ""}{weightChange} lbs change</span>
            </div>
          </div>}
        </div>

        <div style={S.recapDivider}>━━━ ◈ ━━━</div>
        <div style={S.recapFooter}>
          <span style={S.recapFooterLbl}>Total XP Earned All-Time</span>
          <span style={S.recapFooterVal}>{totalXP.toLocaleString()}</span>
          <span style={S.recapFooterBrand}>◆ Iron Grimoire ◆</span>
        </div>
      </div>

      <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,200,0.15),rgba(196,169,106,0.1))",borderColor:"rgba(180,140,200,0.3)",color:"#d4b4e4",marginTop:"20px"}} onClick={handleShare}>⇪ Share Chronicle</button>
      <p style={S.shareHint}>Tap share to post to social or copy as text.<br/>For an image: take a screenshot of the card above.</p>
    </div>
  );
}

function InsightsView({ history, meditations, habits, habitLog, ironXP, discXP, mindXP, onBack }) {
  // Volume over last 8 weeks
  const weekVolumes = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i*7);
    const wk = weekKey(d.toISOString());
    const vol = history.filter(h => weekKey(h.date) === wk).reduce((s,h)=>s+Object.values(h.sets).reduce((ss,x)=>ss+(parseFloat(x.weight)||0)*(parseFloat(x.reps)||0),0),0);
    weekVolumes.push({ week: wk, volume: vol });
  }
  const maxVol = Math.max(1, ...weekVolumes.map(w => w.volume));

  // Sessions per week
  const weekSessions = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i*7);
    const wk = weekKey(d.toISOString());
    weekSessions.push({ week: wk, count: history.filter(h => weekKey(h.date) === wk).length });
  }
  const maxSessions = Math.max(1, ...weekSessions.map(w => w.count));

  // Meditation minutes per week
  const weekMed = [];
  for (let i = 7; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i*7);
    const wk = weekKey(d.toISOString());
    weekMed.push({ week: wk, min: meditations.filter(m => weekKey(m.date) === wk).reduce((s,m)=>s+m.duration,0) });
  }
  const maxMed = Math.max(1, ...weekMed.map(w => w.min));

  // Habit completion rate (last 30 days)
  let habitCompletions = 0; let habitPossible = 0;
  for (let i = 0; i < 30; i++) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const k = dateKey(d);
    habits.forEach(h => { habitPossible++; if (habitLog[h.id]?.[k]) habitCompletions++; });
  }
  const habitRate = habitPossible > 0 ? Math.round((habitCompletions / habitPossible) * 100) : 0;

  // Projection: days to next rank
  const iron = getRank(ironXP, IRON_RANKS);
  const avgWeeklyIronXP = (history.slice(0, 20).reduce((s,h)=>s + (Object.values(h.sets).filter(x=>x.done).length * 10), 0)) / Math.max(1, 4);
  const xpToNext = iron.next ? iron.next.xp - ironXP : 0;
  const weeksToNext = avgWeeklyIronXP > 0 ? Math.ceil(xpToNext / avgWeeklyIronXP) : null;

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>📊 Insights</h2></div>

      {history.length === 0 && meditations.length === 0 && <p style={S.emp}>Log some activity to see insights.</p>}

      {history.length > 0 && <>
        <div style={S.insightCard}>
          <div style={S.insightHead}><span style={S.insightTitle}>⚔ Weekly Volume</span><span style={S.insightMeta}>Last 8 weeks</span></div>
          <div style={S.chartRow}>{weekVolumes.map((w,i)=>(<div key={i} style={S.chartBarCol}><div style={{...S.chartBar,height:`${(w.volume/maxVol)*100}%`,background:"linear-gradient(180deg,#c4a96a,#8b7a5e)"}}/></div>))}</div>
          <div style={S.chartFooter}>Peak: {maxVol.toLocaleString()} lbs</div>
        </div>

        <div style={S.insightCard}>
          <div style={S.insightHead}><span style={S.insightTitle}>⚔ Sessions / Week</span><span style={S.insightMeta}>Last 8 weeks</span></div>
          <div style={S.chartRow}>{weekSessions.map((w,i)=>(<div key={i} style={S.chartBarCol}><div style={{...S.chartBar,height:`${(w.count/maxSessions)*100}%`,background:"linear-gradient(180deg,#c4a96a,#8b7a5e)"}}/><span style={S.chartBarLabel}>{w.count||""}</span></div>))}</div>
        </div>

        {weeksToNext !== null && weeksToNext > 0 && weeksToNext < 999 && <div style={S.prophecyBox}>
          <span style={S.prophecyIcon}>✦</span>
          <div>
            <span style={S.prophecyText}>At your current pace, you'll reach</span>
            <span style={S.prophecyRank}>Lvl {iron.next.level} · {iron.next.tierName}</span>
            <span style={S.prophecyTime}>in about {weeksToNext} week{weeksToNext!==1?"s":""}</span>
          </div>
        </div>}
      </>}

      {meditations.length > 0 && <div style={S.insightCard}>
        <div style={S.insightHead}><span style={S.insightTitle}>☯ Meditation Minutes</span><span style={S.insightMeta}>Last 8 weeks</span></div>
        <div style={S.chartRow}>{weekMed.map((w,i)=>(<div key={i} style={S.chartBarCol}><div style={{...S.chartBar,height:`${(w.min/maxMed)*100}%`,background:"linear-gradient(180deg,#9cb4c4,#6a7a8a)"}}/><span style={S.chartBarLabel}>{w.min||""}</span></div>))}</div>
      </div>}

      {habits.length > 0 && <div style={S.insightCard}>
        <div style={S.insightHead}><span style={S.insightTitle}>❂ Habit Rate</span><span style={S.insightMeta}>Last 30 days</span></div>
        <div style={S.ringBox}>
          <svg viewBox="0 0 100 100" style={{width:"100px",height:"100px"}}>
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(139,122,94,0.1)" strokeWidth="8"/>
            <circle cx="50" cy="50" r="42" fill="none" stroke="#a0c49c" strokeWidth="8" strokeDasharray={`${(habitRate/100)*263.9} 263.9`} strokeDashoffset="0" transform="rotate(-90 50 50)" strokeLinecap="round"/>
            <text x="50" y="55" textAnchor="middle" fill="#e8dcc8" fontSize="18" fontFamily="inherit" fontWeight="600">{habitRate}%</text>
          </svg>
          <div style={S.ringSide}>
            <span style={S.ringLbl}>{habitCompletions} / {habitPossible}</span>
            <span style={S.ringDesc}>rituals completed out of possible</span>
          </div>
        </div>
      </div>}
    </div>
  );
}

function BodyAlmanacView({ bodyLog, trackedMetrics, logFrequency, onBack, onLogNew, onSettings }) {
  const latest = bodyLog[0];
  const previous = bodyLog[1];
  const today = new Date();
  const isSunday = today.getDay() === 0;
  const shouldPrompt = logFrequency === "weekly" && isSunday && (!latest || (Date.now() - new Date(latest.date).getTime()) > 6 * 86400000);

  const getTrend = (metricId) => {
    if (!latest || !previous || !latest.measurements[metricId] || !previous.measurements[metricId]) return null;
    const diff = latest.measurements[metricId] - previous.measurements[metricId];
    return { diff, percent: (diff / previous.measurements[metricId]) * 100 };
  };

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={{...S.wT,flex:1}}>⚖ Body Almanac</h2><button style={S.gearBtn} onClick={onSettings}>⚙</button></div>

      {shouldPrompt && <div style={S.promptBox}><span style={S.promptIcon}>🌙</span><span style={S.promptText}>Sunday check-in ready</span></div>}

      {latest ? <>
        <div style={S.sectionHead}>Latest · {fmtDate(new Date(latest.date))}</div>
        <div style={S.metricsGrid}>{BODY_METRICS.filter(m => trackedMetrics.includes(m.id) && latest.measurements[m.id] !== undefined).map(m => { const trend = getTrend(m.id); return (
          <div key={m.id} style={S.metricCard}>
            <div style={S.metricHead}><span style={S.metricIcon}>{m.icon}</span><span style={S.metricName}>{m.name}</span></div>
            <span style={S.metricVal}>{latest.measurements[m.id]}<span style={S.metricUnit}> {m.unit}</span></span>
            {trend && <span style={{...S.metricTrend, color: m.id === "weight" || m.id === "bodyfat" || m.id === "waist" || m.id === "hips" ? (trend.diff < 0 ? "#a0c49c" : "#c49c9c") : (trend.diff > 0 ? "#a0c49c" : "#c49c9c")}}>{trend.diff > 0 ? "↑" : "↓"} {Math.abs(trend.diff).toFixed(1)} {m.unit}</span>}
          </div>
        );})}</div>
      </> : <p style={S.emp}>No measurements logged yet.</p>}

      <button style={{...S.finB, background:"linear-gradient(135deg,rgba(107,138,106,0.15),rgba(160,196,156,0.15))", borderColor:"rgba(160,196,156,0.3)", color:"#a0c49c"}} onClick={onLogNew}>+ Log Measurements</button>

      {bodyLog.length > 1 && <>
        <div style={S.sectionHead}>History</div>
        <div style={S.hL}>{bodyLog.slice(0, 20).map((entry, i) => {
          const count = Object.keys(entry.measurements).length;
          return <div key={i} style={S.hC}><div style={S.hCT}><span style={S.hCS}>⚖</span><span style={S.hCN}>{count} metric{count!==1?"s":""} logged</span><span style={S.hCD}>{fmtDate(new Date(entry.date))}</span></div></div>;
        })}</div>
      </>}
    </div>
  );
}

function BodyLogView({ trackedMetrics, latestEntry, onSave, onBack }) {
  const [values, setValues] = useState(() => { const v = {}; BODY_METRICS.forEach(m => { if (trackedMetrics.includes(m.id)) v[m.id] = latestEntry?.measurements[m.id] ?? ""; }); return v; });

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>⚖ Log Measurements</h2></div>
      <p style={S.chronicleSubtitle}>Leave blank any metric you're not logging today</p>
      <div style={S.metricInputList}>{BODY_METRICS.filter(m => trackedMetrics.includes(m.id)).map(m => (
        <div key={m.id} style={S.metricInputRow}>
          <span style={S.metricIcon}>{m.icon}</span>
          <span style={{...S.metricName, flex:1}}>{m.name}</span>
          <input style={S.metricInput} type="number" step="0.1" inputMode="decimal" placeholder={`0 ${m.unit}`} value={values[m.id]||""} onChange={e=>setValues({...values,[m.id]:e.target.value})}/>
          <span style={S.metricUnit}>{m.unit}</span>
        </div>
      ))}</div>
      <button style={{...S.finB, background:"linear-gradient(135deg,rgba(107,138,106,0.15),rgba(160,196,156,0.15))", borderColor:"rgba(160,196,156,0.3)", color:"#a0c49c"}} onClick={()=>onSave(values)}>◆ Save Entry ◆</button>
      <button style={S.hmB} onClick={onBack}>Cancel</button>
    </div>
  );
}

function BodySettingsView({ trackedMetrics, logFrequency, onSave, onBack }) {
  const [metrics, setMetrics] = useState([...trackedMetrics]);
  const [freq, setFreq] = useState(logFrequency);
  const toggle = (id) => setMetrics(metrics.includes(id) ? metrics.filter(m=>m!==id) : [...metrics, id]);
  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>⚙ Body Settings</h2></div>
      <div style={S.sectionHead}>Metrics to Track</div>
      <div style={S.settingsList}>{BODY_METRICS.map(m=>(
        <button key={m.id} style={{...S.settingsRow, background: metrics.includes(m.id) ? "rgba(160,196,156,0.1)" : "rgba(139,122,94,0.05)", borderColor: metrics.includes(m.id) ? "rgba(160,196,156,0.3)" : "rgba(139,122,94,0.12)", width:"100%", cursor:"pointer", fontFamily:"inherit"}} onClick={()=>toggle(m.id)}>
          <span style={S.settingsRowIcon}>{m.icon}</span>
          <span style={{...S.settingsRowText,flex:1,textAlign:"left"}}>{m.name}</span>
          <span style={{...S.metricUnit}}>{m.unit}</span>
          <span style={{color: metrics.includes(m.id) ? "#a0c49c" : "#4a4236", fontSize:"16px", marginLeft:"8px"}}>{metrics.includes(m.id) ? "✓" : "○"}</span>
        </button>
      ))}</div>
      <div style={S.sectionHead}>Log Frequency</div>
      <div style={S.settingsList}>{LOG_FREQUENCIES.map(f=>(
        <button key={f.id} style={{...S.settingsRow, background: freq === f.id ? "rgba(160,196,156,0.1)" : "rgba(139,122,94,0.05)", borderColor: freq === f.id ? "rgba(160,196,156,0.3)" : "rgba(139,122,94,0.12)", width:"100%", cursor:"pointer", fontFamily:"inherit"}} onClick={()=>setFreq(f.id)}>
          <div style={{flex:1,textAlign:"left"}}>
            <span style={S.settingsRowText}>{f.name}</span>
            <span style={S.settingsRowDesc}>{f.desc}</span>
          </div>
          <span style={{color: freq === f.id ? "#a0c49c" : "#4a4236", fontSize:"16px"}}>{freq === f.id ? "●" : "○"}</span>
        </button>
      ))}</div>
      <button style={{...S.authBtn, marginTop:"16px"}} onClick={()=>onSave(metrics, freq)}>Save Changes</button>
      <button style={{...S.authBack,marginTop:"8px"}} onClick={onBack}>Cancel</button>
    </div>
  );
}

function formatDuration(seconds) {
  const s = parseInt(seconds) || 0;
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${sec}s`;
  return `${sec}s`;
}

function calcPace(distance, duration) {
  const d = parseFloat(distance); const t = parseInt(duration);
  if (!d || !t) return null;
  const paceSec = t / d;
  const mins = Math.floor(paceSec / 60);
  const secs = Math.round(paceSec % 60);
  return `${mins}:${String(secs).padStart(2,"0")}/mi`;
}

function StrideHome({ rank, xp, runs, activeProgram, onBack, onLogRun, onTrackLive, onStartProgram, onContinueProgram, onHistory, onRanks }) {
  const totalMiles = runs.reduce((s,r) => s + (parseFloat(r.distance)||0), 0);
  const thisWeekMiles = runs.filter(r => weekKey(r.date) === weekKey(new Date())).reduce((s,r) => s + (parseFloat(r.distance)||0), 0);
  const hasActiveProg = activeProgram && activeProgram.id && !activeProgram.completed;
  const program = hasActiveProg ? STRIDE_PROGRAMS[activeProgram.id] : null;
  const progressPct = program ? ((activeProgram.completedWorkouts?.length || 0) / program.workouts.length) * 100 : 0;

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>🏃 Stride</h2></div>
      <RankCard rank={rank} xp={xp} pillar="stride"/>

      <div style={S.strideQuickStats}>
        <div style={S.strideStat}><span style={{...S.strideStatVal,color:"#dcb496"}}>{totalMiles.toFixed(1)}</span><span style={S.strideStatLbl}>Total Miles</span></div>
        <div style={S.strideStat}><span style={{...S.strideStatVal,color:"#dcb496"}}>{runs.length}</span><span style={S.strideStatLbl}>Runs Logged</span></div>
        <div style={S.strideStat}><span style={{...S.strideStatVal,color:"#dcb496"}}>{thisWeekMiles.toFixed(1)}</span><span style={S.strideStatLbl}>This Week</span></div>
      </div>

      <div style={S.dv}>━━━ ◈ ━━━</div>

      {hasActiveProg ? (
        <button style={S.progActiveCard} onClick={onContinueProgram}>
          <div style={S.progActiveHead}>
            <span style={S.progActiveIcon}>{program.icon}</span>
            <div style={{flex:1,textAlign:"left"}}>
              <span style={S.progActiveName}>{program.name}</span>
              <span style={S.progActiveMeta}>{activeProgram.completedWorkouts?.length || 0} / {program.workouts.length} workouts</span>
            </div>
            <span style={S.dArr}>▸</span>
          </div>
          <div style={S.progActiveBar}><div style={{...S.progActiveBarFill,width:`${progressPct}%`}}/></div>
        </button>
      ) : (
        <button style={S.progStartBtn} onClick={onStartProgram}>
          <span style={S.progStartIcon}>📋</span>
          <div style={{flex:1,textAlign:"left"}}>
            <span style={S.progStartTitle}>Start a Training Program</span>
            <span style={S.progStartDesc}>C25K, 10K, Half, or Full Marathon</span>
          </div>
          <span style={S.dArr}>▸</span>
        </button>
      )}

      <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,120,0.15),rgba(220,180,150,0.15))",borderColor:"rgba(220,180,150,0.3)",color:"#dcb496",marginTop:"12px"}} onClick={onLogRun}>🏃 Log a Run</button>
      <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,120,0.2),rgba(220,180,150,0.1))",borderColor:"rgba(220,180,150,0.4)",color:"#dcb496",marginTop:"0px"}} onClick={onTrackLive}>📍 Track Live (GPS)</button>

      <div style={S.navR}>
        <button style={S.navB} onClick={onHistory}>◆ History</button>
        <button style={S.navB} onClick={onRanks}>◈ Ranks</button>
      </div>
    </div>
  );
}

function StrideStandaloneView({ programId, onComplete, onBack }) {
  const program = STRIDE_PROGRAMS[programId];
  const segments = program.segments;
  const totalSeconds = segments.reduce((s,seg) => s + seg.seconds, 0);
  const [mode, setMode] = useState("preview"); // preview, running, paused, done
  const [currentIdx, setCurrentIdx] = useState(0);
  const [segmentElapsed, setSegmentElapsed] = useState(0);
  const [totalElapsed, setTotalElapsed] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [pausedAt, setPausedAt] = useState(null);

  // Timer ticker
  useEffect(() => {
    if (mode !== "running") return;
    const iv = setInterval(() => {
      const now = Date.now();
      const total = Math.floor((now - startTime - pausedDuration) / 1000);
      setTotalElapsed(total);
      // Calculate which segment we're in
      let cumulative = 0;
      for (let i = 0; i < segments.length; i++) {
        if (total < cumulative + segments[i].seconds) {
          if (i !== currentIdx) { setCurrentIdx(i); playGong(); } // chime on segment change
          setSegmentElapsed(total - cumulative);
          return;
        }
        cumulative += segments[i].seconds;
      }
      // Completed all segments
      playGong();
      setTimeout(() => playGong(), 500); // double chime for finish
      setMode("done");
    }, 1000);
    return () => clearInterval(iv);
  }, [mode, startTime, pausedDuration, currentIdx, segments]);

  const startWorkout = () => {
    playGong();
    setStartTime(Date.now());
    setPausedDuration(0);
    setMode("running");
  };
  const pauseWorkout = () => { setPausedAt(Date.now()); setMode("paused"); };
  const resumeWorkout = () => { if (pausedAt) setPausedDuration(p => p + (Date.now() - pausedAt)); setPausedAt(null); setMode("running"); };
  const stopWorkout = () => {
    if (!confirm("End workout early?")) return;
    setMode("done");
  };

  const handleSaveComplete = () => {
    // Calculate distance from segments actually completed
    const completedSecs = totalElapsed >= totalSeconds ? totalSeconds : totalElapsed;
    let distance = 0;
    let cumulative = 0;
    segments.forEach(seg => {
      if (cumulative >= completedSecs) return;
      const segSecs = Math.min(seg.seconds, completedSecs - cumulative);
      distance += (seg.speed * segSecs) / 3600; // mph * hours = miles
      cumulative += segSecs;
    });
    onComplete({
      type: "tempo",
      distance: parseFloat(distance.toFixed(2)),
      duration: completedSecs,
      pace: calcPace(distance, completedSecs),
      effort: 4,
      indoor: true,
      weather: "treadmill",
      heartRate: null,
      notes: `${program.name} · Completed ${currentIdx + 1}/${segments.length} zones`,
      programWorkoutIdx: undefined,
    });
  };

  const currentSeg = segments[currentIdx];
  const segTimeRemaining = currentSeg ? currentSeg.seconds - segmentElapsed : 0;
  const totalRemaining = totalSeconds - totalElapsed;
  const fmtTime = (s) => `${Math.floor(s/60)}:${String(s%60).padStart(2,"0")}`;

  // Preview mode — show the workout plan
  if (mode === "preview") {
    return (
      <div style={S.c}>
        <AnimStyles/>
        <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>{program.icon} {program.name}</h2></div>
        <p style={S.chronicleSubtitle}>{Math.round(totalSeconds/60)} min total · Treadmill</p>

        <div style={S.pyramidList}>{segments.map((seg, i) => (
          <div key={i} style={S.pyramidZone}>
            <div style={S.pyramidZoneNum}>{i+1}</div>
            <div style={{flex:1}}>
              <span style={S.pyramidZoneName}>{seg.zone}</span>
              <span style={S.pyramidZoneStats}>Speed {seg.speed} · Incline {seg.incline}% · {Math.round(seg.seconds/60)} min</span>
              <span style={S.pyramidZoneDesc}>{seg.desc}</span>
            </div>
          </div>
        ))}</div>

        <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,120,0.2),rgba(220,180,150,0.1))",borderColor:"rgba(220,180,150,0.4)",color:"#dcb496"}} onClick={startWorkout}>▸ Start Workout</button>
        <p style={S.shareHint}>Follow the zones on your treadmill. The app will chime between zones and at the end.</p>
      </div>
    );
  }

  // Done mode — summary
  if (mode === "done") {
    const completedSecs = totalElapsed >= totalSeconds ? totalSeconds : totalElapsed;
    let distance = 0;
    let cumulative = 0;
    segments.forEach(seg => {
      if (cumulative >= completedSecs) return;
      const segSecs = Math.min(seg.seconds, completedSecs - cumulative);
      distance += (seg.speed * segSecs) / 3600;
      cumulative += segSecs;
    });
    const fullyComplete = totalElapsed >= totalSeconds;
    return (
      <div style={S.c}>
        <AnimStyles/>
        <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>{program.icon} Workout Complete</h2></div>
        <div style={S.gpsIntro}>
          <div style={S.gpsIconLarge}>{fullyComplete ? "🏆" : "✓"}</div>
          <h3 style={S.gpsIntroTitle}>{fullyComplete ? "All Zones Complete" : "Workout Ended"}</h3>
          <div style={S.gpsStatsGrid}>
            <div style={S.gpsStatBox}>
              <span style={S.gpsStatLbl}>Time</span>
              <span style={S.gpsStatVal}>{fmtTime(completedSecs)}</span>
            </div>
            <div style={S.gpsStatBox}>
              <span style={S.gpsStatLbl}>Est. Distance</span>
              <span style={S.gpsStatVal}>{distance.toFixed(2)}<span style={S.gpsStatSub}>mi</span></span>
            </div>
            <div style={S.gpsStatBox}>
              <span style={S.gpsStatLbl}>Zones</span>
              <span style={S.gpsStatVal}>{currentIdx + (fullyComplete ? 1 : 0)}<span style={S.gpsStatSub}>/{segments.length}</span></span>
            </div>
          </div>
          <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,120,0.15),rgba(220,180,150,0.15))",borderColor:"rgba(220,180,150,0.3)",color:"#dcb496"}} onClick={handleSaveComplete}>◆ Save to History</button>
          <button style={S.hmB} onClick={onBack}>Discard</button>
        </div>
      </div>
    );
  }

  // Running/paused mode — live display
  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.gpsLive}>
        <div style={S.gpsStatusBar}>
          <div style={{...S.gpsStatusDot,background:mode==="paused"?"#c47a6a":"#a0c49c"}}/>
          <span style={S.gpsStatusText}>{mode === "paused" ? "Paused" : `Zone ${currentIdx + 1} / ${segments.length}`}</span>
          <span style={S.gpsAccuracy}>Total: {fmtTime(totalRemaining)} left</span>
        </div>

        <div style={S.pyramidCurrentBox}>
          <span style={S.pyramidCurrentLbl}>{currentSeg.zone}</span>
          <div style={S.pyramidCurrentMain}>
            <span style={S.gpsDistanceVal}>{fmtTime(segTimeRemaining)}</span>
          </div>
          <div style={S.pyramidCurrentStats}>
            <div style={S.pyramidStat}>
              <span style={S.pyramidStatLbl}>Speed</span>
              <span style={S.pyramidStatVal}>{currentSeg.speed}</span>
            </div>
            <div style={S.pyramidStat}>
              <span style={S.pyramidStatLbl}>Incline</span>
              <span style={S.pyramidStatVal}>{currentSeg.incline}%</span>
            </div>
          </div>
          <p style={S.pyramidCurrentDesc}>{currentSeg.desc}</p>
        </div>

        {currentIdx + 1 < segments.length && <div style={S.pyramidNext}>
          <span style={S.pyramidNextLbl}>Next:</span>
          <span style={S.pyramidNextVal}>{segments[currentIdx+1].zone} · Speed {segments[currentIdx+1].speed} · Incline {segments[currentIdx+1].incline}%</span>
        </div>}

        <div style={S.gpsControls}>
          {mode === "running" ? (
            <button style={{...S.gpsCtrlBtn,background:"rgba(196,122,106,0.15)",borderColor:"rgba(196,122,106,0.35)",color:"#d4a09c"}} onClick={pauseWorkout}>⏸ Pause</button>
          ) : (
            <button style={{...S.gpsCtrlBtn,background:"rgba(160,196,156,0.15)",borderColor:"rgba(160,196,156,0.35)",color:"#a0c49c"}} onClick={resumeWorkout}>▸ Resume</button>
          )}
          <button style={{...S.gpsCtrlBtn,background:"rgba(220,180,150,0.15)",borderColor:"rgba(220,180,150,0.4)",color:"#dcb496"}} onClick={stopWorkout}>◆ End</button>
        </div>
      </div>
    </div>
  );
}

function StrideProgramsView({ activeProgram, onStart, onOpenStandalone, onBack }) {
  const [confirm, setConfirmProg] = useState(null);
  const hasActive = activeProgram && activeProgram.id && !activeProgram.completed;
  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>📋 Training Programs</h2></div>
      {hasActive && <p style={{...S.chronicleSubtitle,color:"#c47a6a"}}>Starting a new multi-week program will abandon your current one.</p>}

      <div style={S.progGrid}>{Object.values(STRIDE_PROGRAMS).map(p=>{
        const isStandalone = p.standalone;
        return (
        <div key={p.id} style={S.progCard}>
          <div style={S.progCardHead}>
            <span style={S.progCardIcon}>{p.icon}</span>
            <div style={{flex:1}}>
              <span style={S.progCardName}>{p.name}</span>
              <span style={S.progCardWeeks}>{isStandalone ? `${Math.round(p.segments.reduce((s,seg)=>s+seg.seconds,0)/60)} min · Treadmill` : `${p.weeks} weeks · ${p.workouts.length} workouts`}</span>
            </div>
          </div>
          <p style={S.progCardDesc}>{p.desc}</p>
          {isStandalone ? (
            <button style={S.progCardBtn} onClick={()=>onOpenStandalone(p.id)}>Open Workout ▸</button>
          ) : confirm === p.id ? (
            <div style={S.confirmRow}>
              <button style={S.confirmYes} onClick={()=>{onStart(p.id);setConfirmProg(null);}}>Start!</button>
              <button style={S.confirmNo} onClick={()=>setConfirmProg(null)}>Cancel</button>
            </div>
          ) : (
            <button style={S.progCardBtn} onClick={()=>setConfirmProg(p.id)}>Begin Program</button>
          )}
        </div>
      );})}</div>
    </div>
  );
}

function StrideProgramView({ activeProgram, onLogWorkout, onAbandon, onBack }) {
  if (!activeProgram || !activeProgram.id) { onBack(); return null; }
  const program = STRIDE_PROGRAMS[activeProgram.id];
  const completed = activeProgram.completedWorkouts || [];
  const currentIdx = activeProgram.currentWorkoutIndex || 0;
  const currentWorkout = program.workouts[currentIdx];

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>{program.icon} {program.name}</h2></div>

      <div style={S.progProgressBox}>
        <span style={S.progProgressLbl}>{completed.length} of {program.workouts.length} workouts complete</span>
        <div style={S.progActiveBar}><div style={{...S.progActiveBarFill,width:`${(completed.length/program.workouts.length)*100}%`}}/></div>
      </div>

      {currentWorkout && <div style={S.currentWorkoutCard}>
        <div style={S.currentWorkoutHead}>
          <span style={S.currentWorkoutLbl}>Next Workout · Week {currentWorkout.week}, Day {currentWorkout.day}</span>
        </div>
        {currentWorkout.type === "interval" ? <>
          <div style={S.workoutSegments}>{currentWorkout.segments.map((seg, i) => (
            <div key={i} style={{...S.workoutSeg,background: seg.t==="run"?"rgba(220,180,150,0.15)":"rgba(139,122,94,0.1)"}}>
              <span style={S.workoutSegType}>{seg.t === "run" ? "🏃 Run" : "🚶 Walk"}</span>
              <span style={S.workoutSegTime}>{seg.s >= 60 ? `${Math.floor(seg.s/60)}m${seg.s%60?` ${seg.s%60}s`:""}` : `${seg.s}s`}</span>
            </div>
          ))}</div>
        </> : <>
          <div style={S.workoutDistance}>
            <span style={S.workoutDistanceVal}>{currentWorkout.miles} mi</span>
            <span style={S.workoutDistanceDesc}>{currentWorkout.desc}</span>
          </div>
        </>}
        <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,120,0.15),rgba(220,180,150,0.15))",borderColor:"rgba(220,180,150,0.3)",color:"#dcb496",marginTop:"16px"}} onClick={()=>onLogWorkout(currentIdx)}>Log This Workout</button>
      </div>}

      {completed.length > 0 && <>
        <div style={S.sectionHead}>Completed</div>
        <div style={S.completedList}>{completed.slice().reverse().map(idx => {
          const w = program.workouts[idx];
          return (<div key={idx} style={S.completedRow}><span style={S.completedCheck}>✓</span><span style={S.completedText}>Week {w.week}, Day {w.day}</span></div>);
        })}</div>
      </>}

      <button style={{...S.clr,marginTop:"20px"}} onClick={onAbandon}>Abandon Program</button>
    </div>
  );
}

// Haversine distance between two lat/lng points, returns meters
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371000; // earth radius meters
  const toRad = (deg) => deg * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat/2)**2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng/2)**2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

function StrideGPSView({ onFinish, onBack }) {
  const [status, setStatus] = useState("idle"); // idle, requesting, tracking, paused, error
  const [errorMsg, setErrorMsg] = useState("");
  const [distance, setDistance] = useState(0); // meters
  const [duration, setDuration] = useState(0); // seconds
  const [startTime, setStartTime] = useState(null);
  const [pausedAt, setPausedAt] = useState(null);
  const [pausedDuration, setPausedDuration] = useState(0);
  const [watchId, setWatchId] = useState(null);
  const [lastPos, setLastPos] = useState(null);
  const [currentSpeed, setCurrentSpeed] = useState(0); // meters per second
  const [accuracy, setAccuracy] = useState(null);
  const [path, setPath] = useState([]); // array of [lat, lng] for future map rendering

  // Duration ticker
  useEffect(() => {
    if (status !== "tracking") return;
    const iv = setInterval(() => {
      setDuration(Math.floor((Date.now() - startTime - pausedDuration) / 1000));
    }, 1000);
    return () => clearInterval(iv);
  }, [status, startTime, pausedDuration]);

  // GPS watcher
  const startTracking = () => {
    if (!navigator.geolocation) {
      setStatus("error"); setErrorMsg("GPS not available on this device."); return;
    }
    setStatus("requesting");
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude, accuracy: acc, speed } = pos.coords;
        setAccuracy(acc);
        if (speed !== null && speed !== undefined) setCurrentSpeed(speed);
        setPath(prev => [...prev, [latitude, longitude]]);
        setLastPos(prev => {
          if (prev && status !== "paused") {
            const d = haversine(prev.lat, prev.lng, latitude, longitude);
            // Filter out GPS jitter: ignore movements under 2m or with poor accuracy
            if (d >= 2 && acc < 30) setDistance(prev => prev + d);
          }
          return { lat: latitude, lng: longitude };
        });
        if (status === "requesting") { setStatus("tracking"); setStartTime(Date.now()); }
      },
      (err) => {
        setStatus("error");
        setErrorMsg(err.code === 1 ? "Location permission denied. Enable it in your browser settings." : err.code === 2 ? "GPS signal unavailable. Try going outside." : "GPS error: " + err.message);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 }
    );
    setWatchId(id);
  };

  const pauseTracking = () => {
    setPausedAt(Date.now());
    setStatus("paused");
  };
  const resumeTracking = () => {
    if (pausedAt) setPausedDuration(p => p + (Date.now() - pausedAt));
    setPausedAt(null);
    setStatus("tracking");
  };
  const stopTracking = () => {
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    const finalDuration = Math.floor((Date.now() - startTime - pausedDuration) / 1000);
    const distanceMiles = distance / 1609.344;
    const pathNotes = path.length > 0 ? `GPS tracked: ${path.length} points` : "";
    onFinish({ distance: distanceMiles, duration: finalDuration, notes: pathNotes, type: "easy" });
  };
  const cancelTracking = () => {
    if (!confirm("Discard this run? All GPS data will be lost.")) return;
    if (watchId !== null) navigator.geolocation.clearWatch(watchId);
    onBack();
  };

  const distanceMiles = distance / 1609.344;
  const pace = duration > 0 && distanceMiles > 0 ? (() => {
    const paceSec = duration / distanceMiles;
    return `${Math.floor(paceSec/60)}:${String(Math.round(paceSec%60)).padStart(2,"0")}`;
  })() : "--:--";
  const speedMph = currentSpeed * 2.23694;

  if (status === "idle") {
    return (
      <div style={S.c}>
        <AnimStyles/>
        <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>📍 GPS Tracking</h2></div>
        <div style={S.gpsIntro}>
          <div style={S.gpsIconLarge}>📍</div>
          <h3 style={S.gpsIntroTitle}>Ready to Run</h3>
          <p style={S.gpsIntroDesc}>The app will track your distance, pace, and route using your device's GPS. Works best outdoors.</p>
          <ul style={S.gpsTipsList}>
            <li style={S.gpsTip}>✓ Keep the app open while running</li>
            <li style={S.gpsTip}>✓ Works best with clear sky (outdoors)</li>
            <li style={S.gpsTip}>✓ You can pause and resume anytime</li>
            <li style={S.gpsTip}>✓ Enable location permission when prompted</li>
          </ul>
          <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,120,0.2),rgba(220,180,150,0.1))",borderColor:"rgba(220,180,150,0.4)",color:"#dcb496"}} onClick={startTracking}>▸ Start Tracking</button>
          <button style={S.hmB} onClick={onBack}>Cancel</button>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={S.c}>
        <AnimStyles/>
        <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>📍 GPS Tracking</h2></div>
        <div style={S.gpsIntro}>
          <div style={{...S.gpsIconLarge,color:"#c47a6a"}}>⚠</div>
          <h3 style={S.gpsIntroTitle}>GPS Error</h3>
          <p style={S.gpsIntroDesc}>{errorMsg}</p>
          <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,120,0.15),rgba(220,180,150,0.15))",borderColor:"rgba(220,180,150,0.3)",color:"#dcb496"}} onClick={()=>{setStatus("idle");setErrorMsg("");}}>Try Again</button>
          <button style={S.hmB} onClick={onBack}>Go Back</button>
        </div>
      </div>
    );
  }

  if (status === "requesting") {
    return (
      <div style={S.c}>
        <AnimStyles/>
        <div style={S.gpsRequestBox}>
          <div style={S.gpsPulse}>📍</div>
          <h3 style={S.gpsIntroTitle}>Acquiring Signal...</h3>
          <p style={S.gpsIntroDesc}>Please allow location access when your browser asks.</p>
          <button style={S.hmB} onClick={cancelTracking}>Cancel</button>
        </div>
      </div>
    );
  }

  // Tracking or paused — live display
  const mins = Math.floor(duration/60); const secs = duration%60;
  const hrs = Math.floor(mins/60); const displayMins = mins % 60;

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.gpsLive}>
        <div style={S.gpsStatusBar}>
          <div style={{...S.gpsStatusDot,background:status==="paused"?"#c47a6a":"#a0c49c"}}/>
          <span style={S.gpsStatusText}>{status === "paused" ? "Paused" : "Tracking"}</span>
          {accuracy !== null && <span style={S.gpsAccuracy}>±{Math.round(accuracy)}m</span>}
        </div>

        <div style={S.gpsMainDisplay}>
          <span style={S.gpsDistanceVal}>{distanceMiles.toFixed(2)}</span>
          <span style={S.gpsDistanceUnit}>miles</span>
        </div>

        <div style={S.gpsStatsGrid}>
          <div style={S.gpsStatBox}>
            <span style={S.gpsStatLbl}>Time</span>
            <span style={S.gpsStatVal}>{hrs > 0 ? `${hrs}:${String(displayMins).padStart(2,"0")}:${String(secs).padStart(2,"0")}` : `${displayMins}:${String(secs).padStart(2,"0")}`}</span>
          </div>
          <div style={S.gpsStatBox}>
            <span style={S.gpsStatLbl}>Avg Pace</span>
            <span style={S.gpsStatVal}>{pace}<span style={S.gpsStatSub}>/mi</span></span>
          </div>
          <div style={S.gpsStatBox}>
            <span style={S.gpsStatLbl}>Speed</span>
            <span style={S.gpsStatVal}>{speedMph.toFixed(1)}<span style={S.gpsStatSub}>mph</span></span>
          </div>
        </div>

        <div style={S.gpsControls}>
          {status === "tracking" ? (
            <button style={{...S.gpsCtrlBtn,background:"rgba(196,122,106,0.15)",borderColor:"rgba(196,122,106,0.35)",color:"#d4a09c"}} onClick={pauseTracking}>⏸ Pause</button>
          ) : (
            <button style={{...S.gpsCtrlBtn,background:"rgba(160,196,156,0.15)",borderColor:"rgba(160,196,156,0.35)",color:"#a0c49c"}} onClick={resumeTracking}>▸ Resume</button>
          )}
          <button style={{...S.gpsCtrlBtn,background:"rgba(220,180,150,0.15)",borderColor:"rgba(220,180,150,0.4)",color:"#dcb496"}} onClick={stopTracking}>◆ Finish</button>
        </div>
        <button style={{...S.hmB,marginTop:"12px"}} onClick={cancelTracking}>Discard</button>
      </div>
    </div>
  );
}

function StrideStandaloneView({ programId, onComplete, onBack }) {
  const program = STRIDE_PROGRAMS[programId];
  const segments = program?.segments || [];
  const totalSeconds = segments.reduce((s,seg) => s + seg.seconds, 0);

  const [mode, setMode] = useState("overview"); // overview, active, done
  const [currentSeg, setCurrentSeg] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [paused, setPaused] = useState(false);
  const [startTime, setStartTime] = useState(null);

  // Timer tick
  useEffect(() => {
    if (mode !== "active" || paused) return;
    const iv = setInterval(() => {
      setRemaining(s => {
        if (s <= 1) {
          // Segment complete — advance
          playGong();
          setCurrentSeg(prev => {
            const next = prev + 1;
            if (next >= segments.length) {
              setMode("done");
              return prev;
            }
            setRemaining(segments[next].seconds);
            return next;
          });
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(iv);
  }, [mode, paused, segments]);

  const startWorkout = () => {
    playGong();
    setCurrentSeg(0);
    setRemaining(segments[0].seconds);
    setStartTime(Date.now());
    setMode("active");
  };

  const finishAndLog = () => {
    // Calculate total distance from avg speed × time
    const totalMiles = segments.reduce((sum, seg) => sum + (seg.speed * seg.seconds / 3600), 0);
    const actualSeconds = startTime ? Math.floor((Date.now() - startTime) / 1000) : totalSeconds;
    onComplete({
      type: "tempo",
      distance: parseFloat(totalMiles.toFixed(2)),
      duration: actualSeconds,
      indoor: true,
      weather: "treadmill",
      effort: 5,
      notes: `Incline Pyramid Workout · ${segments.length} zones`,
      incline: Math.max(...segments.map(s=>s.incline)),
      speed: Math.max(...segments.map(s=>s.speed)),
    });
  };

  if (!program) { onBack(); return null; }

  // OVERVIEW MODE — show the workout plan
  if (mode === "overview") {
    return (
      <div style={S.c}>
        <AnimStyles/>
        <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>{program.icon} {program.name}</h2></div>
        <p style={S.chronicleSubtitle}>{Math.round(totalSeconds/60)} minutes · {segments.length} zones</p>

        <div style={S.zonesList}>{segments.map((seg, i) => (
          <div key={i} style={S.zoneCard}>
            <div style={S.zoneCardHead}>
              <span style={S.zoneCardNum}>{i+1}</span>
              <span style={S.zoneCardName}>{seg.zone}</span>
              <span style={S.zoneCardTime}>{Math.floor(seg.seconds/60)}m</span>
            </div>
            <div style={S.zoneCardStats}>
              <span style={S.zoneCardStat}>Speed: <b>{seg.speed}</b></span>
              <span style={S.zoneCardStat}>Incline: <b>{seg.incline}</b></span>
            </div>
            <p style={S.zoneCardDesc}>{seg.desc}</p>
          </div>
        ))}</div>

        <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,120,0.2),rgba(220,180,150,0.1))",borderColor:"rgba(220,180,150,0.4)",color:"#dcb496"}} onClick={startWorkout}>▸ Start Guided Timer</button>
        <button style={S.hmB} onClick={()=>finishAndLog()}>Log Without Timer</button>
        <p style={{...S.shareHint,marginTop:"4px"}}>Guided timer chimes between zones. Log without timer if you already did the workout.</p>
      </div>
    );
  }

  // ACTIVE MODE — guided timer
  if (mode === "active") {
    const seg = segments[currentSeg];
    const mins = Math.floor(remaining/60);
    const secs = remaining%60;
    const pct = 1 - (remaining / seg.seconds);

    return (
      <div style={S.c}>
        <AnimStyles/>
        <div style={S.wH}><button style={S.bk} onClick={()=>{if(confirm("End workout? Progress will be saved."))finishAndLog();}}>✕</button><h2 style={S.wT}>{program.icon} Zone {currentSeg+1}/{segments.length}</h2></div>

        <div style={S.zoneActiveBox}>
          <span style={S.zoneActiveLbl}>{seg.zone}</span>
          <div style={S.zoneActiveStats}>
            <div style={S.zoneActiveStat}>
              <span style={S.zoneActiveStatVal}>{seg.speed}</span>
              <span style={S.zoneActiveStatLbl}>Speed</span>
            </div>
            <div style={S.zoneActiveStat}>
              <span style={S.zoneActiveStatVal}>{seg.incline}</span>
              <span style={S.zoneActiveStatLbl}>Incline</span>
            </div>
          </div>
          <div style={S.zoneTimer}>{String(mins).padStart(2,"0")}:{String(secs).padStart(2,"0")}</div>
          <div style={S.medProgressBg}><div style={{...S.medProgressFl,width:`${pct*100}%`}}/></div>
          <p style={S.zoneActiveDesc}>{seg.desc}</p>
        </div>

        {/* Next zone preview */}
        {currentSeg + 1 < segments.length && <div style={S.nextZoneBox}>
          <span style={S.nextZoneLbl}>Up Next</span>
          <span style={S.nextZoneName}>{segments[currentSeg+1].zone}</span>
          <span style={S.nextZoneStats}>Speed {segments[currentSeg+1].speed} · Incline {segments[currentSeg+1].incline}</span>
        </div>}

        <div style={S.medControls}>
          <button style={S.medCtrlBtn} onClick={()=>setPaused(!paused)}>{paused ? "▶ Resume" : "⏸ Pause"}</button>
          <button style={{...S.medCtrlBtn,borderColor:"rgba(180,60,60,0.3)",color:"rgba(180,60,60,0.7)"}} onClick={()=>{if(confirm("End workout early?"))finishAndLog();}}>End</button>
        </div>
      </div>
    );
  }

  // DONE MODE
  if (mode === "done") {
    return (
      <div style={S.c}>
        <AnimStyles/>
        <div style={S.gpsIntro}>
          <div style={{...S.gpsIconLarge,color:"#dcb496"}}>🏔</div>
          <h3 style={S.gpsIntroTitle}>Workout Complete</h3>
          <p style={S.gpsIntroDesc}>All {segments.length} zones finished. Nice work.</p>
          <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,120,0.2),rgba(220,180,150,0.1))",borderColor:"rgba(220,180,150,0.4)",color:"#dcb496"}} onClick={finishAndLog}>◆ Log This Run ◆</button>
        </div>
      </div>
    );
  }

  return null;
}

function StrideLogView({ programWorkoutIdx, activeProgram, onSave, onBack, prefillData }) {
  const [type, setType] = useState(prefillData?.type || "easy");
  const [indoor, setIndoor] = useState(prefillData?.indoor || false);
  const [distance, setDistance] = useState(prefillData?.distance ? prefillData.distance.toFixed(2) : "");
  const [durMin, setDurMin] = useState(prefillData?.duration ? String(Math.floor(prefillData.duration / 60)) : "");
  const [durSec, setDurSec] = useState(prefillData?.duration ? String(prefillData.duration % 60) : "");
  const [effort, setEffort] = useState(3);
  const [weather, setWeather] = useState("sunny");
  const [heartRate, setHeartRate] = useState("");
  const [notes, setNotes] = useState(prefillData?.notes || "");
  // Treadmill-specific
  const [incline, setIncline] = useState("");
  const [speed, setSpeed] = useState("");

  const programInfo = programWorkoutIdx !== undefined && activeProgram ? STRIDE_PROGRAMS[activeProgram.id]?.workouts[programWorkoutIdx] : null;
  const totalDurSec = (parseInt(durMin)||0) * 60 + (parseInt(durSec)||0);
  const pace = calcPace(distance, totalDurSec);
  const canSave = distance && totalDurSec > 0;

  const handleSave = () => {
    if (!canSave) return;
    const runData = { type, distance: parseFloat(distance), duration: totalDurSec, pace, effort, heartRate: heartRate ? parseInt(heartRate) : null, notes: notes.trim(), programWorkoutIdx, indoor };
    if (indoor) {
      runData.weather = "treadmill";
      if (incline) runData.incline = parseFloat(incline);
      if (speed) runData.speed = parseFloat(speed);
    } else {
      runData.weather = weather;
    }
    onSave(runData);
  };

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>🏃 Log Run</h2></div>

      {programInfo && <div style={S.programContextBox}>
        <span style={S.programContextLbl}>Program Workout</span>
        <span style={S.programContextVal}>Week {programInfo.week}, Day {programInfo.day}</span>
      </div>}

      <div style={S.sectionHead}>Type</div>
      <div style={S.runTypeGrid}>{RUN_TYPES.map(t=>(
        <button key={t.id} style={{...S.runTypeBtn,...(type===t.id?S.runTypeBtnActive:{})}} onClick={()=>setType(t.id)}>
          <span style={S.runTypeIcon}>{t.icon}</span>
          <span style={S.runTypeName}>{t.name}</span>
        </button>
      ))}</div>

      <div style={S.sectionHead}>Distance & Time</div>
      <div style={S.runMetricRow}>
        <div style={S.runMetricCol}>
          <input style={S.runMetricInput} type="number" step="0.01" inputMode="decimal" placeholder="0.0" value={distance} onChange={e=>setDistance(e.target.value)}/>
          <span style={S.runMetricUnit}>miles</span>
        </div>
        <div style={S.runMetricCol}>
          <div style={{display:"flex",alignItems:"center",gap:"4px"}}>
            <input style={{...S.runMetricInput,width:"60px"}} type="number" inputMode="numeric" placeholder="0" value={durMin} onChange={e=>setDurMin(e.target.value)}/>
            <span style={S.sep}>:</span>
            <input style={{...S.runMetricInput,width:"60px"}} type="number" inputMode="numeric" placeholder="00" value={durSec} onChange={e=>setDurSec(e.target.value)}/>
          </div>
          <span style={S.runMetricUnit}>min : sec</span>
        </div>
      </div>
      {pace && <p style={S.paceDisplay}>Pace: {pace}</p>}

      <div style={S.sectionHead}>Effort</div>
      <div style={S.effortGrid}>{EFFORT_LEVELS.map(e=>(
        <button key={e.val} style={{...S.effortBtn,...(effort===e.val?{background:e.color+"40",borderColor:e.color,color:e.color}:{})}} onClick={()=>setEffort(e.val)}>{e.val}</button>
      ))}</div>
      <p style={S.effortDesc}>{EFFORT_LEVELS.find(e=>e.val===effort)?.name}</p>

      <div style={S.sectionHead}>Location</div>
      <div style={S.indoorToggleRow}>
        <button style={{...S.indoorToggleBtn, ...(!indoor ? S.indoorToggleBtnActive : {})}} onClick={()=>setIndoor(false)}>
          <span style={S.indoorToggleIcon}>🌿</span>
          <span style={S.indoorToggleName}>Outdoor</span>
        </button>
        <button style={{...S.indoorToggleBtn, ...(indoor ? S.indoorToggleBtnActive : {})}} onClick={()=>setIndoor(true)}>
          <span style={S.indoorToggleIcon}>🏠</span>
          <span style={S.indoorToggleName}>Treadmill</span>
        </button>
      </div>

      {!indoor && <>
        <div style={S.sectionHead}>Weather</div>
        <div style={S.weatherGrid}>{WEATHER_OPTIONS.filter(w=>w.id!=="treadmill").map(w=>(
          <button key={w.id} style={{...S.weatherBtn,...(weather===w.id?S.weatherBtnActive:{})}} onClick={()=>setWeather(w.id)}>
            <span>{w.icon}</span>
            <span style={S.weatherName}>{w.name}</span>
          </button>
        ))}</div>
      </>}

      {indoor && <>
        <div style={S.sectionHead}>Treadmill Settings</div>
        <div style={S.treadmillRow}>
          <div style={S.treadmillField}>
            <input style={S.treadmillInput} type="number" step="0.1" inputMode="decimal" placeholder="0.0" value={incline} onChange={e=>setIncline(e.target.value)}/>
            <span style={S.treadmillLbl}>Incline %</span>
          </div>
          <div style={S.treadmillField}>
            <input style={S.treadmillInput} type="number" step="0.1" inputMode="decimal" placeholder="0.0" value={speed} onChange={e=>setSpeed(e.target.value)}/>
            <span style={S.treadmillLbl}>Speed (mph)</span>
          </div>
        </div>
      </>}

      <div style={S.sectionHead}>Optional</div>
      <div style={S.optionalRow}>
        <input style={{...S.authInput,flex:1,textAlign:"left"}} type="number" inputMode="numeric" placeholder="Avg heart rate (bpm)" value={heartRate} onChange={e=>setHeartRate(e.target.value)}/>
      </div>
      <textarea style={{...S.journalArea,minHeight:"80px",marginTop:"8px"}} placeholder="How did the run feel? Notes..." value={notes} onChange={e=>setNotes(e.target.value)}/>

      <button style={{...S.finB,background:"linear-gradient(135deg,rgba(180,140,120,0.15),rgba(220,180,150,0.15))",borderColor:"rgba(220,180,150,0.3)",color:"#dcb496",opacity:canSave?1:0.4}} onClick={handleSave} disabled={!canSave}>◆ Save Run ◆</button>
      <button style={S.hmB} onClick={onBack}>Cancel</button>
    </div>
  );
}

function RanksView({ ranks, currentLvl, currentXP, title, onBack }) {
  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={S.wH}><button style={S.bk} onClick={onBack}>‹</button><h2 style={S.wT}>{title}</h2></div>
      <div style={S.lL}>
        {TIERS.map(tier => (
          <div key={tier.rank} style={S.tierGroup}>
            <div style={S.tierHead}><span style={{...S.tierEmblem,color:tier.color}}>{tier.emblem}</span><span style={{...S.tierName,color:tier.color}}>{tier.rank}-Rank · {tier.name}</span></div>
            <div style={S.tierLevels}>
              {ranks.filter(r => r.tier === tier.rank).map(l => {
                const r = currentXP >= l.xp; const ic = l.level === currentLvl;
                return (
                  <div key={l.level} style={{...S.tierLvl,...(ic?S.lRC:{}),opacity:r?1:0.35}}>
                    <span style={{...S.tierLvlNum,color:ic?tier.color:r?"#d4c9a8":"#4a4236"}}>{l.level}</span>
                    <span style={S.tierLvlXP}>{l.xp.toLocaleString()} XP</span>
                    {ic&&<span style={{...S.yah,color:tier.color}}>◄</span>}
                    {r&&!ic&&<span style={S.rCk}>✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LoginView({ profiles, onLogin, onCreate, onDelete }) {
  const [mode, setMode] = useState("select"); // select, login, create, delete
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [newName, setNewName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    const ok = await onLogin(selectedProfile, password);
    if (!ok) setError("Incorrect password.");
    setPassword("");
  };
  const handleCreate = async () => {
    setError("");
    if (!newName.trim()) { setError("Enter a username."); return; }
    if (password.length < 4) { setError("Password must be at least 4 characters."); return; }
    await onCreate(newName, password);
    setNewName(""); setPassword("");
  };
  const handleDelete = async () => {
    setError("");
    const ok = await onDelete(selectedProfile, password);
    if (!ok) setError("Incorrect password.");
    else { setMode("select"); setSelectedProfile(null); }
    setPassword("");
  };

  return (
    <div style={S.c}>
      <AnimStyles/>
      <div style={{...S.hdr, paddingTop:"60px"}}>
        <div style={S.tRow}><span style={S.dm}>◆</span><h1 style={S.tt}>Iron Grimoire</h1><span style={S.dm}>◆</span></div>
        <p style={S.st}>{mode==="create"?"Create Profile":mode==="login"?"Sign In":mode==="delete"?"Delete Profile":"Choose Your Path"}</p>
      </div>
      <div style={S.dv}>━━━ ◈ ━━━</div>

      {mode === "select" && <>
        <div style={S.profileList}>
          {profiles.map(p=>(<div key={p.name} style={S.profileRow}>
            <button style={S.profileBtn} onClick={()=>{setSelectedProfile(p.name);setMode("login");setError("");setPassword("");}}>
              <span style={S.profileIcon}>◆</span><span style={S.profileName}>{p.name}</span><span style={S.profileArrow}>▸</span>
            </button>
            <button style={S.profileDel} onClick={()=>{setSelectedProfile(p.name);setMode("delete");setError("");setPassword("");}}>✕</button>
          </div>))}
          {profiles.length===0&&<p style={S.emp}>No profiles yet. Create one below.</p>}
        </div>
        <button style={S.addHabitBtn} onClick={()=>{setMode("create");setError("");setNewName("");setPassword("");}}>+ New Profile</button>
      </>}

      {mode === "login" && <>
        <div style={S.authBox}>
          <span style={S.authLabel}>{selectedProfile}</span>
          <input style={S.authInput} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()} autoFocus/>
          {error && <span style={S.authError}>{error}</span>}
          <button style={S.authBtn} onClick={handleLogin}>Sign In</button>
          <button style={S.authBack} onClick={()=>{setMode("select");setError("");}}>‹ Back</button>
        </div>
      </>}

      {mode === "create" && <>
        <div style={S.authBox}>
          <input style={S.authInput} type="text" placeholder="Username" value={newName} onChange={e=>setNewName(e.target.value)} autoFocus/>
          <input style={S.authInput} type="password" placeholder="Password (4+ characters)" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleCreate()}/>
          {error && <span style={S.authError}>{error}</span>}
          <button style={S.authBtn} onClick={handleCreate}>Create Profile</button>
          <button style={S.authBack} onClick={()=>{setMode("select");setError("");}}>‹ Back</button>
        </div>
      </>}

      {mode === "delete" && <>
        <div style={S.authBox}>
          <span style={S.authLabel}>Delete {selectedProfile}?</span>
          <p style={S.authWarning}>Enter password to confirm. This removes all data permanently.</p>
          <input style={S.authInput} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleDelete()} autoFocus/>
          {error && <span style={S.authError}>{error}</span>}
          <button style={{...S.authBtn,borderColor:"rgba(180,60,60,0.3)",color:"rgba(180,60,60,0.7)"}} onClick={handleDelete}>Delete Profile</button>
          <button style={S.authBack} onClick={()=>{setMode("select");setError("");}}>‹ Back</button>
        </div>
      </>}
    </div>
  );
}

function DotCalendar({ log }) {
  const today = new Date(); const cells = [];
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const k = dateKey(d);
    cells.push({ date: d, key: k, done: !!log[k] });
  }
  const weeks = []; let cur = [];
  const firstDay = cells[0].date.getDay();
  for (let i = 0; i < firstDay; i++) cur.push(null);
  cells.forEach(cell => { cur.push(cell); if (cur.length === 7) { weeks.push(cur); cur = []; } });
  if (cur.length > 0) { while (cur.length < 7) cur.push(null); weeks.push(cur); }
  return (
    <div style={S.calBox}>
      <div style={S.calGrid}>
        {weeks.map((wk, wi) => (<div key={wi} style={S.calCol}>{wk.map((cell, ci) => (<div key={ci} style={{...S.calDot, background: cell ? (cell.done ? "rgba(160,196,156,0.8)" : "rgba(139,122,94,0.08)") : "transparent", border: cell?.done ? "1px solid rgba(160,196,156,0.4)" : "1px solid rgba(139,122,94,0.05)"}}/>))}</div>))}
      </div>
    </div>
  );
}

function AnimStyles() {
  return (<style>{`
    @keyframes weightpush { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-30px)} }
    @keyframes armoh { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
    @keyframes pulldown { 0%,100%{transform:translateY(-20px)} 50%{transform:translateY(10px)} }
    @keyframes armrow { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-30px)} }
    @keyframes curl { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-120deg)} }
    @keyframes tricep { 0%,100%{transform:translateY(0)} 50%{transform:translateY(15px)} }
    @keyframes legpress { 0%,100%{transform:translateX(0)} 50%{transform:translateX(-40px)} }
    @keyframes legext { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(-75deg)} }
    @keyframes legcurl { 0%,100%{transform:rotate(0deg)} 50%{transform:rotate(75deg)} }
    @keyframes lateral { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(0.5)} }
    @keyframes facepull { 0%,100%{transform:translateY(0)} 50%{transform:translateY(8px)} }
    @keyframes pallof { 0%,100%{transform:scaleX(1)} 50%{transform:scaleX(0.7)} }
    @keyframes breathe { 0%,100%{transform:scale(1);opacity:0.4} 50%{transform:scale(1.3);opacity:0.7} }
    @keyframes glow { 0%,100%{box-shadow:0 0 20px rgba(220,180,240,0.3)} 50%{box-shadow:0 0 40px rgba(220,180,240,0.5)} }
    .weight-push { animation: weightpush 2.5s ease-in-out infinite; }
    .arm-overhead { animation: armoh 2.5s ease-in-out infinite; }
    .arm-pulldown { animation: pulldown 2s ease-in-out infinite; }
    .arm-row { animation: armrow 2s ease-in-out infinite; }
    .arm-curl { animation: curl 2s ease-in-out infinite; }
    .arm-tricep { animation: tricep 2s ease-in-out infinite; transform-origin: 100px 65px; }
    .leg-press { animation: legpress 2.5s ease-in-out infinite; }
    .leg-ext { animation: legext 2s ease-in-out infinite; }
    .leg-curl { animation: legcurl 2s ease-in-out infinite; }
    .arm-lateral { animation: lateral 2.5s ease-in-out infinite; transform-origin: 100px 55px; }
    .arm-facepull { animation: facepull 2s ease-in-out infinite; }
    .arm-pallof { animation: pallof 2.5s ease-in-out infinite; transform-origin: 80px 65px; }
  `}</style>);
}

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════

const S = {
  c:{minHeight:"100vh",background:"linear-gradient(180deg,#0a0a0f 0%,#12121c 50%,#0a0a0f 100%)",color:"#d4c9a8",fontFamily:"'Crimson Text','Palatino Linotype',serif",padding:"16px",maxWidth:"480px",margin:"0 auto"},
  loadScreen:{minHeight:"100vh",background:"#0a0a0f",display:"flex",alignItems:"center",justifyContent:"center"},
  loadText:{color:"#8b7a5e",fontSize:"18px",letterSpacing:"3px"},
  hdr:{textAlign:"center",marginBottom:"20px",paddingTop:"16px"},
  tRow:{display:"flex",alignItems:"center",justifyContent:"center",gap:"12px"},
  dm:{color:"#8b7a5e",fontSize:"14px"},
  tt:{fontSize:"28px",fontWeight:"400",letterSpacing:"4px",color:"#e8dcc8",margin:0,textTransform:"uppercase"},
  st:{fontSize:"12px",color:"#6b6252",letterSpacing:"6px",textTransform:"uppercase",marginTop:"6px"},
  multTx:{fontSize:"11px",color:"#b89cc4",letterSpacing:"2px",marginTop:"4px"},
  dv:{color:"#3d3528",fontSize:"14px",letterSpacing:"4px",textAlign:"center",margin:"16px 0"},
  pillarGrid:{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"16px"},
  pillar:{padding:"16px",borderRadius:"12px",cursor:"pointer",fontFamily:"inherit",color:"#d4c9a8",textAlign:"left",display:"flex",flexDirection:"column",gap:"8px"},
  pillarHead:{display:"flex",alignItems:"center",gap:"12px"},
  pillarEmb:{fontSize:"28px"},
  pillarNameRow:{display:"flex",alignItems:"baseline",gap:"8px"},
  pillarName:{fontSize:"20px",color:"#e8dcc8",letterSpacing:"3px",textTransform:"uppercase",fontWeight:"400"},
  pillarTier:{fontSize:"11px",letterSpacing:"2px",fontWeight:"600"},
  pillarTitle:{fontSize:"12px",color:"#6b6252",letterSpacing:"1px",marginTop:"2px"},
  pillarBar:{width:"100%",height:"4px",background:"rgba(139,122,94,0.1)",borderRadius:"2px",overflow:"hidden"},
  pillarBarFill:{height:"100%",borderRadius:"2px",transition:"width 0.6s"},
  pillarXP:{fontSize:"11px",color:"#6b6252",letterSpacing:"1px"},
  questHome:{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"},
  questHomeTitle:{fontSize:"11px",color:"#8b7a5e",letterSpacing:"3px",textTransform:"uppercase",marginTop:"6px"},
  questCard:{padding:"10px 14px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"8px",display:"flex",flexDirection:"column",gap:"4px"},
  questTop:{display:"flex",justifyContent:"space-between",alignItems:"center",gap:"8px"},
  questText:{fontSize:"13px",color:"#d4c9a8",flex:1},
  questReward:{fontSize:"13px",fontWeight:"600",letterSpacing:"1px",flexShrink:0},
  questProgBg:{width:"100%",height:"3px",background:"rgba(139,122,94,0.1)",borderRadius:"2px",overflow:"hidden"},
  questProgFl:{height:"100%",borderRadius:"2px",transition:"width 0.4s"},
  questMeta:{fontSize:"10px",color:"#6b6252",letterSpacing:"1px"},
  questList:{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"16px"},
  questStatText:{textAlign:"center",color:"#8b7a5e",fontSize:"12px",letterSpacing:"2px",marginBottom:"16px"},
  logoutBtn:{width:"100%",padding:"10px",background:"none",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"8px",color:"#6b6252",fontFamily:"inherit",fontSize:"13px",cursor:"pointer",marginTop:"20px"},
  ascendBtn:{width:"100%",padding:"16px",background:"linear-gradient(135deg,rgba(180,140,200,0.15),rgba(220,180,240,0.1))",border:"1px solid rgba(220,180,240,0.3)",borderRadius:"10px",color:"#d4b4e4",fontFamily:"inherit",fontSize:"16px",letterSpacing:"6px",cursor:"pointer",textTransform:"uppercase",marginBottom:"12px",animation:"glow 3s ease-in-out infinite"},
  lvlCard:{background:"linear-gradient(135deg,rgba(139,122,94,0.1),rgba(196,169,106,0.05))",border:"1px solid rgba(196,169,106,0.2)",borderRadius:"12px",padding:"16px",marginBottom:"8px"},
  lvlTop:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"12px"},
  lvlEmb:{fontSize:"32px",lineHeight:1},
  lvlInfo:{display:"flex",flexDirection:"column"},
  lvlTt:{fontSize:"16px",color:"#c4a96a",fontWeight:"600",letterSpacing:"1px"},
  xpTx:{fontSize:"11px",color:"#6b6252",marginTop:"2px"},
  xpBg:{width:"100%",height:"6px",background:"rgba(139,122,94,0.1)",borderRadius:"3px",overflow:"hidden"},
  xpFl:{height:"100%",borderRadius:"3px",transition:"width 0.6s"},
  dGrid:{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"16px"},
  dCard:{background:"rgba(139,122,94,0.06)",border:"1px solid rgba(139,122,94,0.18)",borderRadius:"10px",padding:"16px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"space-between",fontFamily:"inherit",color:"#d4c9a8",textAlign:"left"},
  dCardL:{display:"flex",alignItems:"center",gap:"12px"},
  dSig:{fontSize:"24px"},
  dName:{fontSize:"16px",fontWeight:"600",color:"#e8dcc8",display:"block"},
  dCnt:{fontSize:"12px",color:"#6b6252",display:"block",marginTop:"2px"},
  dArr:{color:"#8b7a5e",fontSize:"18px"},
  navR:{display:"flex",gap:"8px",marginBottom:"16px"},
  navB:{flex:1,padding:"10px",background:"none",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"8px",color:"#8b7a5e",fontFamily:"inherit",fontSize:"13px",cursor:"pointer",letterSpacing:"1px"},
  wH:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px",paddingTop:"8px"},
  bk:{background:"none",border:"1px solid rgba(139,122,94,0.2)",color:"#8b7a5e",fontSize:"18px",width:"34px",height:"34px",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  wT:{fontSize:"20px",fontWeight:"400",color:"#e8dcc8",margin:0,letterSpacing:"2px"},
  pTx:{fontSize:"12px",color:"#6b6252",margin:"2px 0 0 0"},
  pBg:{width:"100%",height:"3px",background:"rgba(139,122,94,0.1)",borderRadius:"2px",marginBottom:"16px",overflow:"hidden"},
  pFl:{height:"100%",background:"linear-gradient(90deg,#8b7a5e,#c4a96a)",borderRadius:"2px",transition:"width 0.4s"},
  rBan:{background:"rgba(196,169,106,0.12)",border:"1px solid rgba(196,169,106,0.25)",borderRadius:"8px",padding:"10px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"},
  rTx:{color:"#c4a96a",fontSize:"15px",fontWeight:"600",letterSpacing:"2px"},
  rSk:{background:"none",border:"1px solid rgba(196,169,106,0.3)",color:"#c4a96a",padding:"4px 10px",borderRadius:"4px",cursor:"pointer",fontFamily:"inherit",fontSize:"12px"},
  exL:{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"20px"},
  exC:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",padding:"14px"},
  exH:{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"10px",gap:"8px"},
  exNameBtn:{background:"none",border:"none",color:"#e8dcc8",fontFamily:"inherit",fontSize:"16px",fontWeight:"600",cursor:"pointer",padding:0,textAlign:"left"},
  infoTag:{fontSize:"12px",color:"#8b7a5e",marginLeft:"4px"},
  exTg:{fontSize:"12px",color:"#6b6252"},
  stC:{display:"flex",flexDirection:"column",gap:"6px"},
  sR:{display:"flex",alignItems:"center",gap:"6px",padding:"7px 8px",borderRadius:"6px",background:"rgba(0,0,0,0.2)"},
  sRD:{background:"rgba(139,122,94,0.1)",opacity:0.7},
  sL:{fontSize:"12px",color:"#6b6252",width:"24px",flexShrink:0},
  inp:{width:"54px",padding:"7px 4px",background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"4px",color:"#e8dcc8",fontFamily:"inherit",fontSize:"15px",textAlign:"center",outline:"none"},
  sep:{color:"#4a4236",fontSize:"13px"},
  chk:{width:"34px",height:"34px",borderRadius:"50%",border:"1px solid rgba(139,122,94,0.25)",background:"none",color:"#6b6252",fontSize:"15px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",marginLeft:"auto",flexShrink:0},
  chkD:{background:"rgba(139,122,94,0.2)",color:"#c4a96a",borderColor:"#c4a96a"},
  finB:{width:"100%",padding:"14px",background:"linear-gradient(135deg,rgba(139,122,94,0.15),rgba(196,169,106,0.15))",border:"1px solid rgba(196,169,106,0.3)",borderRadius:"10px",color:"#c4a96a",fontFamily:"inherit",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",textTransform:"uppercase",marginBottom:"12px"},
  diagramBox:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"12px",padding:"20px",marginBottom:"16px",display:"flex",justifyContent:"center"},
  prBox:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 16px",background:"rgba(196,169,106,0.08)",border:"1px solid rgba(196,169,106,0.2)",borderRadius:"8px",marginBottom:"16px"},
  prLbl:{fontSize:"11px",color:"#8b7a5e",letterSpacing:"2px",textTransform:"uppercase"},
  prVal:{fontSize:"18px",color:"#c4a96a",fontWeight:"600"},
  cueHeader:{fontSize:"14px",color:"#8b7a5e",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"10px"},
  cueList:{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"},
  cueRow:{display:"flex",alignItems:"flex-start",gap:"10px",padding:"10px 12px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"8px"},
  cueNum:{color:"#c4a96a",fontWeight:"600",width:"20px",flexShrink:0},
  cueText:{color:"#d4c9a8",fontSize:"14px",lineHeight:"1.5"},
  targetBox:{display:"flex",flexDirection:"column",alignItems:"center",padding:"14px",background:"rgba(196,169,106,0.08)",border:"1px solid rgba(196,169,106,0.2)",borderRadius:"10px",marginBottom:"20px"},
  targetLbl:{fontSize:"10px",color:"#6b6252",letterSpacing:"3px",textTransform:"uppercase"},
  targetVal:{fontSize:"16px",color:"#c4a96a",fontWeight:"600",marginTop:"4px"},
  sumH:{textAlign:"center",paddingTop:"40px",marginBottom:"20px"},
  sumIc:{fontSize:"36px",marginBottom:"12px"},
  sumTt:{fontSize:"24px",fontWeight:"400",color:"#e8dcc8",letterSpacing:"3px",margin:"0 0 4px 0"},
  sumDt:{color:"#6b6252",fontSize:"13px",letterSpacing:"2px",margin:0},
  luBan:{display:"flex",flexDirection:"column",alignItems:"center",marginBottom:"16px",padding:"16px",background:"linear-gradient(135deg,rgba(196,169,106,0.15),rgba(139,122,94,0.1))",border:"1px solid rgba(196,169,106,0.3)",borderRadius:"12px"},
  luIc:{fontSize:"32px",color:"#c4a96a"},
  luTx:{fontSize:"14px",color:"#c4a96a",letterSpacing:"6px",fontWeight:"600",marginTop:"4px"},
  luTt:{fontSize:"18px",color:"#e8dcc8",marginTop:"4px"},
  xpEC:{background:"rgba(196,169,106,0.08)",border:"1px solid rgba(196,169,106,0.2)",borderRadius:"10px",padding:"16px",textAlign:"center",marginBottom:"16px"},
  xpEL:{fontSize:"11px",color:"#6b6252",letterSpacing:"2px",textTransform:"uppercase",display:"block"},
  xpEV:{fontSize:"36px",fontWeight:"600",display:"block",margin:"4px 0"},
  xpBk:{display:"flex",flexDirection:"column",gap:"2px"},
  xpBI:{fontSize:"12px",color:"#6b6252"},
  sumSt:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",padding:"4px 0",marginBottom:"16px"},
  stRw:{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderBottom:"1px solid rgba(139,122,94,0.06)"},
  stLb:{fontSize:"14px",color:"#6b6252"},
  stVl:{fontSize:"14px",color:"#e8dcc8",fontWeight:"600"},
  naS:{marginBottom:"20px"},
  naTt:{fontSize:"13px",color:"#c4a96a",letterSpacing:"3px",display:"block",marginBottom:"10px",textAlign:"center"},
  naC:{display:"flex",alignItems:"center",gap:"12px",background:"rgba(196,169,106,0.08)",border:"1px solid rgba(196,169,106,0.2)",borderRadius:"8px",padding:"10px 12px",marginBottom:"6px"},
  naIc:{fontSize:"22px",flexShrink:0},
  naN:{fontSize:"14px",color:"#e8dcc8",fontWeight:"600",display:"block"},
  naD:{fontSize:"11px",color:"#6b6252",display:"block"},
  hmB:{width:"100%",padding:"12px",background:"none",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"10px",color:"#8b7a5e",fontFamily:"inherit",fontSize:"14px",letterSpacing:"2px",cursor:"pointer",marginBottom:"40px"},
  fR:{display:"flex",gap:"6px",marginBottom:"14px",flexWrap:"wrap"},
  fB:{padding:"5px 10px",background:"none",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"20px",color:"#6b6252",fontFamily:"inherit",fontSize:"12px",cursor:"pointer"},
  fBA:{background:"rgba(139,122,94,0.15)",borderColor:"rgba(196,169,106,0.3)",color:"#c4a96a"},
  hL:{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"20px"},
  hC:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"8px",padding:"12px 14px"},
  hCT:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"},
  hCS:{fontSize:"16px"},
  hCN:{fontSize:"14px",color:"#e8dcc8",flex:1},
  hCD:{fontSize:"11px",color:"#6b6252"},
  hCM:{fontSize:"12px",color:"#6b6252"},
  emp:{color:"#4a4236",textAlign:"center",padding:"30px 0",fontSize:"14px"},
  clr:{width:"100%",padding:"10px",background:"none",border:"1px solid rgba(180,60,60,0.2)",borderRadius:"8px",color:"rgba(180,60,60,0.6)",fontFamily:"inherit",fontSize:"13px",cursor:"pointer",marginBottom:"40px"},
  aSub:{fontSize:"12px",color:"#6b6252",marginBottom:"12px",marginTop:0},
  aG:{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"40px"},
  aFC:{display:"flex",alignItems:"center",gap:"12px",borderRadius:"8px",padding:"12px"},
  aFU:{background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.2)"},
  aFL:{background:"rgba(0,0,0,0.15)",border:"1px solid rgba(139,122,94,0.06)"},
  aFI:{fontSize:"20px",flexShrink:0},
  aFN:{fontSize:"14px",fontWeight:"600",display:"block"},
  aFD:{fontSize:"11px",display:"block",marginTop:"2px"},
  aCk:{marginLeft:"auto",color:"#c4a96a",fontSize:"14px"},
  lL:{display:"flex",flexDirection:"column",gap:"16px",marginBottom:"40px"},
  lR:{display:"flex",alignItems:"center",gap:"12px",padding:"10px 12px",borderRadius:"8px"},
  lRC:{background:"rgba(196,169,106,0.1)",border:"1px solid rgba(196,169,106,0.25)"},
  yah:{fontSize:"12px",letterSpacing:"1px",flexShrink:0},
  rCk:{color:"#6b6252",fontSize:"12px",flexShrink:0},
  tierGroup:{display:"flex",flexDirection:"column",gap:"6px"},
  tierHead:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 0",borderBottom:"1px solid rgba(139,122,94,0.1)"},
  tierEmblem:{fontSize:"20px"},
  tierName:{fontSize:"13px",letterSpacing:"3px",fontWeight:"600"},
  tierLevels:{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"6px"},
  tierLvl:{display:"flex",flexDirection:"column",alignItems:"center",padding:"8px 4px",background:"rgba(139,122,94,0.04)",border:"1px solid rgba(139,122,94,0.08)",borderRadius:"6px"},
  tierLvlNum:{fontSize:"14px",fontWeight:"600"},
  tierLvlXP:{fontSize:"9px",color:"#4a4236",marginTop:"2px"},
  todaySummary:{marginTop:"-4px",marginBottom:"8px",fontSize:"12px",color:"#a0c49c",textAlign:"center",letterSpacing:"1px"},
  sectionHead:{fontSize:"12px",color:"#8b7a5e",letterSpacing:"3px",textTransform:"uppercase",marginBottom:"12px",marginTop:"8px"},
  habitList:{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"},
  habitCard:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 14px",background:"rgba(139,122,94,0.06)",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"10px",cursor:"pointer",fontFamily:"inherit",textAlign:"left"},
  habitCardDone:{background:"rgba(160,196,156,0.1)",borderColor:"rgba(160,196,156,0.3)"},
  habitIcon:{fontSize:"22px",flexShrink:0},
  habitMid:{flex:1,display:"flex",flexDirection:"column",gap:"2px"},
  habitName:{fontSize:"15px",color:"#e8dcc8"},
  habitStreak:{fontSize:"11px",color:"#a0c49c",letterSpacing:"1px"},
  habitCheck:{width:"28px",height:"28px",borderRadius:"50%",border:"1px solid rgba(139,122,94,0.25)",background:"none",color:"#6b6252",fontSize:"13px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  habitCheckDone:{background:"rgba(160,196,156,0.2)",color:"#a0c49c",borderColor:"#a0c49c"},
  addHabitBtn:{width:"100%",padding:"12px",background:"none",border:"1px dashed rgba(139,122,94,0.25)",borderRadius:"10px",color:"#8b7a5e",fontFamily:"inherit",fontSize:"14px",cursor:"pointer",letterSpacing:"2px",marginBottom:"12px"},
  customHabitRow:{display:"flex",gap:"8px",marginBottom:"12px",alignItems:"center"},
  iconInput:{width:"44px",padding:"10px",background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"6px",color:"#e8dcc8",fontFamily:"inherit",fontSize:"20px",textAlign:"center",outline:"none"},
  presetGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"40px"},
  presetCard:{display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",padding:"14px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",cursor:"pointer",fontFamily:"inherit",color:"#d4c9a8"},
  statsRow:{display:"flex",gap:"10px",marginBottom:"20px"},
  statBox:{flex:1,background:"rgba(139,122,94,0.06)",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"10px",padding:"14px",textAlign:"center"},
  statBoxVal:{fontSize:"24px",color:"#e8dcc8",fontWeight:"600",display:"block"},
  statBoxLbl:{fontSize:"11px",color:"#6b6252",letterSpacing:"2px",textTransform:"uppercase",marginTop:"4px",display:"block"},
  calBox:{background:"rgba(139,122,94,0.04)",border:"1px solid rgba(139,122,94,0.1)",borderRadius:"10px",padding:"12px",overflowX:"auto"},
  calGrid:{display:"flex",gap:"2px",minWidth:"400px"},
  calCol:{display:"flex",flexDirection:"column",gap:"2px"},
  calDot:{width:"8px",height:"8px",borderRadius:"2px",flexShrink:0},
  durationGrid:{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:"6px",marginBottom:"20px"},
  durBtn:{padding:"14px 4px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",color:"#8b7a5e",fontFamily:"inherit",fontSize:"20px",cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center"},
  durBtnActive:{background:"rgba(156,180,196,0.12)",borderColor:"rgba(156,180,196,0.35)",color:"#9cb4c4"},
  durUnit:{fontSize:"10px",color:"#6b6252",letterSpacing:"2px",marginTop:"2px"},
  medCard:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"8px",padding:"12px 14px"},
  medCardTop:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"4px"},
  medDur:{color:"#9cb4c4",fontSize:"14px",fontWeight:"600"},
  medJ:{fontSize:"12px",color:"#8b7a5e",fontStyle:"italic",lineHeight:"1.5",margin:0},
  medActiveBox:{minHeight:"70vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"24px"},
  medBreathCircle:{width:"120px",height:"120px",borderRadius:"50%",border:"2px solid rgba(156,180,196,0.3)",display:"flex",alignItems:"center",justifyContent:"center"},
  medBreathInner:{width:"80px",height:"80px",borderRadius:"50%",background:"radial-gradient(circle,rgba(156,180,196,0.4),rgba(156,180,196,0.1))",animation:"breathe 8s ease-in-out infinite"},
  medTime:{fontSize:"48px",color:"#e8dcc8",fontWeight:"300",letterSpacing:"4px",fontVariantNumeric:"tabular-nums"},
  medProgressBg:{width:"80%",height:"3px",background:"rgba(139,122,94,0.1)",borderRadius:"2px",overflow:"hidden"},
  medProgressFl:{height:"100%",background:"linear-gradient(90deg,#6a7a8a,#9cb4c4)",borderRadius:"2px",transition:"width 1s linear"},
  medGuide:{fontSize:"12px",color:"#6b6252",letterSpacing:"4px",textTransform:"uppercase",margin:0},
  medControls:{display:"flex",gap:"10px",marginTop:"20px"},
  medCtrlBtn:{flex:1,padding:"12px",background:"none",border:"1px solid rgba(156,180,196,0.25)",borderRadius:"8px",color:"#9cb4c4",fontFamily:"inherit",fontSize:"14px",cursor:"pointer",letterSpacing:"2px"},
  medReflectSub:{fontSize:"13px",color:"#8b7a5e",lineHeight:"1.6",marginBottom:"16px"},
  journalArea:{width:"100%",minHeight:"180px",padding:"14px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"10px",color:"#d4c9a8",fontFamily:"inherit",fontSize:"15px",lineHeight:"1.6",outline:"none",resize:"vertical",marginBottom:"12px",boxSizing:"border-box"},
  profileList:{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"20px"},
  profileRow:{display:"flex",gap:"6px"},
  profileBtn:{flex:1,display:"flex",alignItems:"center",gap:"12px",padding:"14px 16px",background:"rgba(139,122,94,0.06)",border:"1px solid rgba(139,122,94,0.18)",borderRadius:"10px",color:"#d4c9a8",fontFamily:"inherit",cursor:"pointer"},
  profileIcon:{fontSize:"20px",color:"#c4a96a"},
  profileName:{flex:1,textAlign:"left",fontSize:"16px",color:"#e8dcc8"},
  profileArrow:{color:"#8b7a5e",fontSize:"16px"},
  profileDel:{width:"44px",background:"none",border:"1px solid rgba(180,60,60,0.15)",borderRadius:"10px",color:"rgba(180,60,60,0.5)",fontFamily:"inherit",fontSize:"14px",cursor:"pointer"},
  ascendBox:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"20px"},
  ascendGlyph:{fontSize:"72px",color:"#d4b4e4",marginBottom:"16px",animation:"glow 3s ease-in-out infinite",width:"120px",height:"120px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",border:"2px solid rgba(220,180,240,0.3)"},
  ascendTitle:{fontSize:"22px",color:"#e8dcc8",letterSpacing:"4px",margin:"12px 0",textTransform:"uppercase",fontWeight:"400"},
  ascendDesc:{fontSize:"14px",color:"#8b7a5e",lineHeight:"1.7",marginBottom:"20px"},
  ascendStats:{width:"100%",display:"flex",flexDirection:"column",gap:"8px",marginBottom:"20px"},
  ascendStat:{display:"flex",justifyContent:"space-between",padding:"10px 14px",background:"rgba(180,140,200,0.06)",border:"1px solid rgba(180,140,200,0.15)",borderRadius:"8px"},
  ascendStatLbl:{fontSize:"12px",color:"#8b7a5e",letterSpacing:"1px"},
  ascendStatVal:{fontSize:"16px",color:"#d4b4e4",fontWeight:"600"},
  ascendWarning:{fontSize:"12px",color:"#8b7a5e",marginBottom:"16px",letterSpacing:"1px"},
  authBox:{display:"flex",flexDirection:"column",gap:"12px",alignItems:"center",padding:"20px 0"},
  authLabel:{fontSize:"20px",color:"#e8dcc8",letterSpacing:"2px",fontWeight:"600"},
  authInput:{width:"100%",padding:"12px 14px",background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"8px",color:"#e8dcc8",fontFamily:"inherit",fontSize:"15px",outline:"none",textAlign:"center"},
  authBtn:{width:"100%",padding:"14px",background:"linear-gradient(135deg,rgba(139,122,94,0.15),rgba(196,169,106,0.15))",border:"1px solid rgba(196,169,106,0.3)",borderRadius:"10px",color:"#c4a96a",fontFamily:"inherit",fontSize:"16px",letterSpacing:"3px",cursor:"pointer",textTransform:"uppercase",marginTop:"4px"},
  authBack:{width:"100%",padding:"10px",background:"none",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"8px",color:"#6b6252",fontFamily:"inherit",fontSize:"13px",cursor:"pointer",letterSpacing:"1px"},
  authError:{fontSize:"13px",color:"#c47a6a",letterSpacing:"1px",textAlign:"center"},
  authWarning:{fontSize:"13px",color:"#8b7a5e",textAlign:"center",lineHeight:"1.6",margin:0},
  gearBtn:{background:"none",border:"1px solid rgba(139,122,94,0.2)",color:"#8b7a5e",fontSize:"16px",width:"34px",height:"34px",borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  settingsList:{display:"flex",flexDirection:"column",gap:"6px",marginBottom:"16px"},
  settingsRow:{display:"flex",alignItems:"center",gap:"8px",padding:"10px 12px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"8px"},
  settingsRowIcon:{fontSize:"20px",flexShrink:0,width:"28px",textAlign:"center"},
  settingsRowText:{fontSize:"14px",color:"#e8dcc8",display:"block"},
  settingsRowDesc:{fontSize:"11px",color:"#6b6252",display:"block",marginTop:"2px"},
  settingsRowMeta:{fontSize:"11px",color:"#6b6252",flexShrink:0},
  settingsEditBtn:{background:"none",border:"1px solid rgba(139,122,94,0.2)",color:"#c4a96a",fontSize:"14px",width:"30px",height:"30px",borderRadius:"6px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  settingsDelBtn:{background:"none",border:"1px solid rgba(180,60,60,0.15)",color:"rgba(180,60,60,0.5)",fontSize:"12px",width:"28px",height:"28px",borderRadius:"6px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  settingsAddRow:{display:"flex",gap:"8px",alignItems:"center",marginBottom:"12px"},
  settingsAddBtn:{width:"40px",height:"40px",background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"8px",color:"#c4a96a",fontSize:"20px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0},
  settingsHint:{fontSize:"12px",color:"#4a4236",lineHeight:"1.6",marginBottom:"16px",textAlign:"center"},
  sigilSelect:{width:"50px",height:"40px",background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"8px",color:"#e8dcc8",fontSize:"20px",textAlign:"center",outline:"none",fontFamily:"inherit",cursor:"pointer",appearance:"none",paddingLeft:"14px"},
  reorderBtns:{display:"flex",flexDirection:"column",gap:"2px",flexShrink:0},
  reorderBtn:{background:"none",border:"1px solid rgba(139,122,94,0.15)",color:"#8b7a5e",fontSize:"10px",width:"22px",height:"18px",borderRadius:"3px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",padding:0},
  setsRepsInput:{display:"flex",alignItems:"center",gap:"4px"},
  smallInput:{width:"48px",padding:"8px 4px",background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"6px",color:"#e8dcc8",fontFamily:"inherit",fontSize:"15px",textAlign:"center",outline:"none"},
  setsRepsLabel:{fontSize:"11px",color:"#6b6252"},
  medTypeGrid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px",marginBottom:"16px"},
  medTypeBtn:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",padding:"12px 6px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",cursor:"pointer",fontFamily:"inherit",color:"#8b7a5e"},
  medTypeBtnActive:{background:"rgba(156,180,196,0.12)",borderColor:"rgba(156,180,196,0.35)",color:"#9cb4c4"},
  medTypeIcon:{fontSize:"20px"},
  medTypeName:{fontSize:"11px",letterSpacing:"1px"},
  presetChipGrid:{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"},
  presetChip:{display:"flex",alignItems:"center",gap:"6px",padding:"6px 10px",background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"20px"},
  presetChipVal:{fontSize:"13px",color:"#d4c9a8"},
  presetChipDel:{background:"none",border:"none",color:"rgba(180,60,60,0.5)",fontSize:"11px",cursor:"pointer",padding:"0 2px"},
  chronicleSubtitle:{fontSize:"13px",color:"#6b6252",textAlign:"center",marginBottom:"20px",letterSpacing:"2px",marginTop:"-8px",fontStyle:"italic"},
  chronicleGrid:{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"20px"},
  chronicleCard:{display:"flex",alignItems:"center",gap:"14px",padding:"16px",background:"rgba(139,122,94,0.06)",border:"1px solid rgba(139,122,94,0.18)",borderRadius:"12px",cursor:"pointer",fontFamily:"inherit",color:"#d4c9a8"},
  chronicleCardIcon:{fontSize:"28px",flexShrink:0},
  chronicleCardTitle:{fontSize:"17px",color:"#e8dcc8",fontWeight:"600",letterSpacing:"1px",display:"block"},
  chronicleCardDesc:{fontSize:"12px",color:"#6b6252",display:"block",marginTop:"2px"},
  weekStatsGrid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px",marginBottom:"16px"},
  weekStatBox:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",padding:"14px 6px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px"},
  weekStatVal:{fontSize:"28px",fontWeight:"600"},
  weekStatLbl:{fontSize:"10px",color:"#6b6252",letterSpacing:"2px",textTransform:"uppercase"},
  allTimeBox:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",padding:"4px 0",marginBottom:"20px"},
  allTimeRow:{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderBottom:"1px solid rgba(139,122,94,0.06)"},
  allTimeLbl:{fontSize:"13px",color:"#6b6252"},
  allTimeVal:{fontSize:"14px",color:"#e8dcc8",fontWeight:"600"},
  insightCard:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"12px",padding:"16px",marginBottom:"14px"},
  insightHead:{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"12px"},
  insightTitle:{fontSize:"14px",color:"#e8dcc8",letterSpacing:"2px",fontWeight:"600"},
  insightMeta:{fontSize:"11px",color:"#6b6252"},
  chartRow:{display:"flex",alignItems:"flex-end",gap:"4px",height:"80px",padding:"4px 0"},
  chartBarCol:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"flex-end",height:"100%",position:"relative"},
  chartBar:{width:"100%",minHeight:"2px",borderRadius:"3px 3px 0 0",transition:"height 0.6s"},
  chartBarLabel:{fontSize:"9px",color:"#6b6252",position:"absolute",top:"-14px"},
  chartFooter:{fontSize:"11px",color:"#6b6252",marginTop:"10px",textAlign:"right",letterSpacing:"1px"},
  ringBox:{display:"flex",alignItems:"center",gap:"16px"},
  ringSide:{display:"flex",flexDirection:"column",gap:"4px"},
  ringLbl:{fontSize:"20px",color:"#e8dcc8",fontWeight:"600"},
  ringDesc:{fontSize:"11px",color:"#6b6252",letterSpacing:"1px",lineHeight:"1.5"},
  prophecyBox:{display:"flex",alignItems:"center",gap:"14px",background:"linear-gradient(135deg,rgba(196,169,106,0.1),rgba(180,140,200,0.05))",border:"1px solid rgba(196,169,106,0.25)",borderRadius:"12px",padding:"16px",marginBottom:"14px"},
  prophecyIcon:{fontSize:"32px",color:"#c4a96a",flexShrink:0},
  prophecyText:{fontSize:"12px",color:"#6b6252",letterSpacing:"2px",textTransform:"uppercase",display:"block"},
  prophecyRank:{fontSize:"18px",color:"#c4a96a",fontWeight:"600",display:"block",margin:"2px 0",letterSpacing:"1px"},
  prophecyTime:{fontSize:"13px",color:"#8b7a5e",display:"block"},
  promptBox:{display:"flex",alignItems:"center",gap:"12px",padding:"12px 16px",background:"rgba(156,180,196,0.1)",border:"1px solid rgba(156,180,196,0.3)",borderRadius:"10px",marginBottom:"16px"},
  promptIcon:{fontSize:"20px"},
  promptText:{fontSize:"14px",color:"#9cb4c4",letterSpacing:"2px"},
  metricsGrid:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"16px"},
  metricCard:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",padding:"12px"},
  metricHead:{display:"flex",alignItems:"center",gap:"8px",marginBottom:"6px"},
  metricIcon:{fontSize:"18px"},
  metricName:{fontSize:"12px",color:"#8b7a5e",letterSpacing:"1px",textTransform:"uppercase"},
  metricVal:{fontSize:"22px",color:"#e8dcc8",fontWeight:"600",display:"block"},
  metricUnit:{fontSize:"12px",color:"#6b6252",fontWeight:"400"},
  metricTrend:{fontSize:"11px",marginTop:"4px",display:"block",letterSpacing:"1px"},
  metricInputList:{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"16px"},
  metricInputRow:{display:"flex",alignItems:"center",gap:"10px",padding:"10px 14px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"8px"},
  metricInput:{width:"80px",padding:"8px",background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"6px",color:"#e8dcc8",fontFamily:"inherit",fontSize:"15px",textAlign:"center",outline:"none"},
  strideQuickStats:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px",marginTop:"10px",marginBottom:"6px"},
  strideStat:{background:"rgba(180,140,120,0.05)",border:"1px solid rgba(180,140,120,0.12)",borderRadius:"10px",padding:"12px 4px",display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},
  strideStatVal:{fontSize:"22px",fontWeight:"600"},
  strideStatLbl:{fontSize:"10px",color:"#6b6252",letterSpacing:"1px",textTransform:"uppercase"},
  progActiveCard:{width:"100%",background:"linear-gradient(135deg,rgba(180,140,120,0.12),rgba(220,180,150,0.06))",border:"1px solid rgba(220,180,150,0.3)",borderRadius:"12px",padding:"16px",cursor:"pointer",fontFamily:"inherit",color:"#d4c9a8",display:"flex",flexDirection:"column",gap:"12px"},
  progActiveHead:{display:"flex",alignItems:"center",gap:"12px"},
  progActiveIcon:{fontSize:"28px"},
  progActiveName:{fontSize:"17px",color:"#e8dcc8",fontWeight:"600",display:"block",letterSpacing:"1px"},
  progActiveMeta:{fontSize:"12px",color:"#dcb496",display:"block",marginTop:"2px"},
  progActiveBar:{width:"100%",height:"4px",background:"rgba(180,140,120,0.15)",borderRadius:"2px",overflow:"hidden"},
  progActiveBarFill:{height:"100%",background:"linear-gradient(90deg,#b48c78,#dcb496)",borderRadius:"2px",transition:"width 0.6s"},
  progStartBtn:{width:"100%",padding:"16px",background:"rgba(139,122,94,0.05)",border:"1px dashed rgba(220,180,150,0.3)",borderRadius:"12px",cursor:"pointer",fontFamily:"inherit",color:"#d4c9a8",display:"flex",alignItems:"center",gap:"12px"},
  progStartIcon:{fontSize:"24px",flexShrink:0},
  progStartTitle:{fontSize:"15px",color:"#e8dcc8",display:"block",letterSpacing:"1px"},
  progStartDesc:{fontSize:"12px",color:"#8b7a5e",display:"block",marginTop:"2px"},
  progGrid:{display:"flex",flexDirection:"column",gap:"12px",marginBottom:"40px"},
  progCard:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"12px",padding:"16px"},
  progCardHead:{display:"flex",alignItems:"center",gap:"12px",marginBottom:"8px"},
  progCardIcon:{fontSize:"26px"},
  progCardName:{fontSize:"17px",color:"#e8dcc8",fontWeight:"600",letterSpacing:"1px",display:"block"},
  progCardWeeks:{fontSize:"12px",color:"#dcb496",display:"block",marginTop:"2px"},
  progCardDesc:{fontSize:"13px",color:"#8b7a5e",lineHeight:"1.5",margin:"8px 0 12px"},
  progCardBtn:{width:"100%",padding:"10px",background:"none",border:"1px solid rgba(220,180,150,0.25)",borderRadius:"8px",color:"#dcb496",fontFamily:"inherit",fontSize:"14px",cursor:"pointer",letterSpacing:"2px"},
  confirmRow:{display:"flex",gap:"8px"},
  confirmYes:{flex:1,padding:"10px",background:"rgba(220,180,150,0.2)",border:"1px solid rgba(220,180,150,0.4)",borderRadius:"8px",color:"#dcb496",fontFamily:"inherit",fontSize:"14px",cursor:"pointer",letterSpacing:"2px"},
  confirmNo:{flex:1,padding:"10px",background:"none",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"8px",color:"#6b6252",fontFamily:"inherit",fontSize:"14px",cursor:"pointer"},
  progProgressBox:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",padding:"14px 16px",marginBottom:"16px"},
  progProgressLbl:{fontSize:"12px",color:"#dcb496",letterSpacing:"2px",display:"block",marginBottom:"8px"},
  currentWorkoutCard:{background:"linear-gradient(135deg,rgba(180,140,120,0.08),rgba(220,180,150,0.04))",border:"1px solid rgba(220,180,150,0.25)",borderRadius:"12px",padding:"16px",marginBottom:"16px"},
  currentWorkoutHead:{marginBottom:"12px"},
  currentWorkoutLbl:{fontSize:"11px",color:"#dcb496",letterSpacing:"3px",textTransform:"uppercase"},
  workoutSegments:{display:"flex",flexDirection:"column",gap:"4px"},
  workoutSeg:{display:"flex",justifyContent:"space-between",padding:"8px 12px",borderRadius:"6px"},
  workoutSegType:{fontSize:"13px",color:"#d4c9a8"},
  workoutSegTime:{fontSize:"13px",color:"#8b7a5e"},
  workoutDistance:{textAlign:"center",padding:"12px"},
  workoutDistanceVal:{fontSize:"36px",color:"#dcb496",fontWeight:"600",display:"block",letterSpacing:"2px"},
  workoutDistanceDesc:{fontSize:"13px",color:"#8b7a5e",display:"block",marginTop:"4px",letterSpacing:"1px"},
  completedList:{display:"flex",flexDirection:"column",gap:"4px",marginBottom:"16px"},
  completedRow:{display:"flex",alignItems:"center",gap:"10px",padding:"8px 12px",background:"rgba(139,122,94,0.04)",borderRadius:"6px"},
  completedCheck:{color:"#a0c49c",fontSize:"14px"},
  completedText:{fontSize:"13px",color:"#8b7a5e"},
  programContextBox:{background:"rgba(220,180,150,0.08)",border:"1px solid rgba(220,180,150,0.2)",borderRadius:"8px",padding:"10px 14px",marginBottom:"16px",display:"flex",justifyContent:"space-between",alignItems:"center"},
  programContextLbl:{fontSize:"11px",color:"#dcb496",letterSpacing:"2px",textTransform:"uppercase"},
  programContextVal:{fontSize:"14px",color:"#e8dcc8",fontWeight:"600"},
  runTypeGrid:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"6px",marginBottom:"16px"},
  runTypeBtn:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",padding:"10px 4px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"8px",cursor:"pointer",fontFamily:"inherit",color:"#8b7a5e"},
  runTypeBtnActive:{background:"rgba(220,180,150,0.12)",borderColor:"rgba(220,180,150,0.35)",color:"#dcb496"},
  runTypeIcon:{fontSize:"18px"},
  runTypeName:{fontSize:"10px",letterSpacing:"1px"},
  runMetricRow:{display:"flex",gap:"12px",marginBottom:"8px"},
  runMetricCol:{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",padding:"12px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px"},
  runMetricInput:{width:"80px",padding:"6px",background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"6px",color:"#e8dcc8",fontFamily:"inherit",fontSize:"18px",textAlign:"center",outline:"none",fontWeight:"600"},
  runMetricUnit:{fontSize:"10px",color:"#6b6252",letterSpacing:"2px",textTransform:"uppercase"},
  paceDisplay:{textAlign:"center",color:"#dcb496",fontSize:"14px",margin:"0 0 16px 0",letterSpacing:"2px"},
  effortGrid:{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:"4px",marginBottom:"4px"},
  effortBtn:{padding:"10px 0",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"6px",color:"#8b7a5e",fontFamily:"inherit",fontSize:"14px",fontWeight:"600",cursor:"pointer"},
  effortDesc:{textAlign:"center",color:"#8b7a5e",fontSize:"12px",margin:"0 0 16px 0",letterSpacing:"2px",textTransform:"uppercase"},
  weatherGrid:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"6px",marginBottom:"16px"},
  weatherBtn:{display:"flex",flexDirection:"column",alignItems:"center",gap:"3px",padding:"8px 4px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"8px",cursor:"pointer",fontFamily:"inherit",color:"#8b7a5e",fontSize:"18px"},
  weatherBtnActive:{background:"rgba(220,180,150,0.12)",borderColor:"rgba(220,180,150,0.35)",color:"#dcb496"},
  weatherName:{fontSize:"9px",letterSpacing:"1px"},
  optionalRow:{marginBottom:"8px"},
  gpsIntro:{display:"flex",flexDirection:"column",alignItems:"center",padding:"40px 20px",textAlign:"center"},
  gpsIconLarge:{fontSize:"64px",color:"#dcb496",marginBottom:"16px",filter:"drop-shadow(0 0 20px rgba(220,180,150,0.3))"},
  gpsIntroTitle:{fontSize:"22px",color:"#e8dcc8",letterSpacing:"3px",margin:"8px 0 12px",fontWeight:"400",textTransform:"uppercase"},
  gpsIntroDesc:{fontSize:"14px",color:"#8b7a5e",lineHeight:"1.7",marginBottom:"20px"},
  gpsTipsList:{listStyle:"none",padding:0,marginBottom:"24px",width:"100%"},
  gpsTip:{fontSize:"13px",color:"#a0c49c",padding:"6px 0",letterSpacing:"1px"},
  gpsRequestBox:{minHeight:"70vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"16px",textAlign:"center",padding:"20px"},
  gpsPulse:{fontSize:"72px",color:"#dcb496",animation:"breathe 2s ease-in-out infinite"},
  gpsLive:{padding:"12px 0"},
  gpsStatusBar:{display:"flex",alignItems:"center",gap:"8px",justifyContent:"center",marginBottom:"28px"},
  gpsStatusDot:{width:"8px",height:"8px",borderRadius:"50%",animation:"breathe 2s ease-in-out infinite"},
  gpsStatusText:{fontSize:"12px",color:"#8b7a5e",letterSpacing:"3px",textTransform:"uppercase"},
  gpsAccuracy:{fontSize:"11px",color:"#6b6252",letterSpacing:"1px",marginLeft:"auto"},
  gpsMainDisplay:{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"30px 0",marginBottom:"20px",background:"linear-gradient(135deg,rgba(180,140,120,0.08),rgba(220,180,150,0.04))",border:"1px solid rgba(220,180,150,0.2)",borderRadius:"16px"},
  gpsDistanceVal:{fontSize:"72px",color:"#dcb496",fontWeight:"600",letterSpacing:"4px",lineHeight:"1",fontVariantNumeric:"tabular-nums"},
  gpsDistanceUnit:{fontSize:"14px",color:"#8b7a5e",letterSpacing:"6px",textTransform:"uppercase",marginTop:"8px"},
  gpsStatsGrid:{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"8px",marginBottom:"24px"},
  gpsStatBox:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",padding:"12px 8px",display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},
  gpsStatLbl:{fontSize:"10px",color:"#6b6252",letterSpacing:"2px",textTransform:"uppercase"},
  gpsStatVal:{fontSize:"22px",color:"#e8dcc8",fontWeight:"600",fontVariantNumeric:"tabular-nums"},
  gpsStatSub:{fontSize:"10px",color:"#6b6252",marginLeft:"2px"},
  gpsControls:{display:"flex",gap:"8px"},
  gpsCtrlBtn:{flex:1,padding:"14px",border:"1px solid",borderRadius:"10px",fontFamily:"inherit",fontSize:"15px",cursor:"pointer",letterSpacing:"2px",textTransform:"uppercase",fontWeight:"600"},
  weekStatsGrid4:{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:"6px",marginBottom:"16px"},
  recapMonthNav:{display:"flex",alignItems:"center",justifyContent:"center",gap:"16px",marginBottom:"16px"},
  recapNavBtn:{background:"none",border:"1px solid rgba(139,122,94,0.2)",color:"#8b7a5e",fontSize:"18px",width:"34px",height:"34px",borderRadius:"50%",cursor:"pointer"},
  recapMonthLbl:{fontSize:"16px",color:"#e8dcc8",letterSpacing:"3px",textTransform:"uppercase",minWidth:"180px",textAlign:"center"},
  formatToggle:{display:"flex",gap:"6px",marginBottom:"16px",justifyContent:"center"},
  formatBtn:{padding:"6px 14px",background:"none",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"20px",color:"#6b6252",fontFamily:"inherit",fontSize:"13px",cursor:"pointer"},
  formatBtnActive:{background:"rgba(180,140,200,0.15)",borderColor:"rgba(180,140,200,0.4)",color:"#d4b4e4"},
  recapCardPortrait:{background:"linear-gradient(180deg,#0f0f1a 0%,#1a1020 50%,#0f0f1a 100%)",border:"1px solid rgba(180,140,200,0.3)",borderRadius:"16px",padding:"32px 24px",display:"flex",flexDirection:"column",gap:"20px",boxShadow:"0 0 30px rgba(180,140,200,0.15)",minHeight:"580px"},
  recapCardSquare:{background:"linear-gradient(180deg,#0f0f1a 0%,#1a1020 50%,#0f0f1a 100%)",border:"1px solid rgba(180,140,200,0.3)",borderRadius:"16px",padding:"28px 20px",display:"flex",flexDirection:"column",gap:"16px",boxShadow:"0 0 30px rgba(180,140,200,0.15)",aspectRatio:"1 / 1"},
  recapHeader:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:"4px"},
  recapTitle:{fontSize:"11px",color:"#8b7a5e",letterSpacing:"6px",textTransform:"uppercase"},
  recapName:{fontSize:"24px",color:"#e8dcc8",letterSpacing:"4px",fontWeight:"600",textTransform:"uppercase",marginTop:"4px"},
  recapMonth:{fontSize:"14px",color:"#d4b4e4",letterSpacing:"4px",textTransform:"uppercase",marginTop:"2px"},
  recapDivider:{color:"#4a4236",fontSize:"12px",letterSpacing:"4px",textAlign:"center",margin:"8px 0"},
  recapHero:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"12px 0"},
  recapHeroIcon:{fontSize:"36px",marginBottom:"4px"},
  recapHeroVal:{fontSize:"56px",color:"#e8dcc8",fontWeight:"700",lineHeight:"1",letterSpacing:"2px",fontVariantNumeric:"tabular-nums"},
  recapHeroLbl:{fontSize:"11px",color:"#d4b4e4",letterSpacing:"4px",textTransform:"uppercase",marginTop:"8px"},
  recapPillars:{display:"flex",flexDirection:"column",gap:"10px"},
  recapPillarRow:{display:"flex",alignItems:"center",gap:"12px",padding:"8px 0"},
  recapPillarIcon:{fontSize:"22px",width:"28px",textAlign:"center"},
  recapPillarLbl:{fontSize:"11px",color:"#6b6252",letterSpacing:"3px",textTransform:"uppercase",display:"block"},
  recapPillarVal:{fontSize:"13px",color:"#d4c9a8",display:"block",marginTop:"2px"},
  recapFooter:{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",gap:"4px",paddingTop:"4px"},
  recapFooterLbl:{fontSize:"10px",color:"#6b6252",letterSpacing:"3px",textTransform:"uppercase"},
  recapFooterVal:{fontSize:"22px",color:"#c4a96a",fontWeight:"600",letterSpacing:"2px"},
  recapFooterBrand:{fontSize:"11px",color:"#4a4236",letterSpacing:"4px",marginTop:"12px"},
  shareHint:{fontSize:"12px",color:"#6b6252",textAlign:"center",lineHeight:"1.6",marginTop:"8px",letterSpacing:"1px"},
  indoorToggleRow:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"8px",marginBottom:"16px"},
  indoorToggleBtn:{display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",padding:"14px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"10px",cursor:"pointer",fontFamily:"inherit",color:"#8b7a5e"},
  indoorToggleBtnActive:{background:"rgba(220,180,150,0.12)",borderColor:"rgba(220,180,150,0.35)",color:"#dcb496"},
  indoorToggleIcon:{fontSize:"24px"},
  indoorToggleName:{fontSize:"13px",letterSpacing:"3px",textTransform:"uppercase",fontWeight:"600"},
  treadmillRow:{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"12px",marginBottom:"16px"},
  treadmillField:{display:"flex",flexDirection:"column",alignItems:"center",gap:"6px",padding:"14px 8px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px"},
  treadmillInput:{width:"90px",padding:"8px",background:"rgba(139,122,94,0.08)",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"6px",color:"#e8dcc8",fontFamily:"inherit",fontSize:"18px",textAlign:"center",outline:"none",fontWeight:"600"},
  treadmillLbl:{fontSize:"10px",color:"#6b6252",letterSpacing:"2px",textTransform:"uppercase"},
  zonesList:{display:"flex",flexDirection:"column",gap:"10px",marginBottom:"20px"},
  zoneCard:{background:"rgba(180,140,120,0.05)",border:"1px solid rgba(220,180,150,0.18)",borderRadius:"10px",padding:"14px"},
  zoneCardHead:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"8px"},
  zoneCardNum:{width:"26px",height:"26px",borderRadius:"50%",background:"rgba(220,180,150,0.2)",color:"#dcb496",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:"600",flexShrink:0},
  zoneCardName:{fontSize:"15px",color:"#e8dcc8",fontWeight:"600",flex:1,letterSpacing:"1px"},
  zoneCardTime:{fontSize:"13px",color:"#dcb496",fontWeight:"600"},
  zoneCardStats:{display:"flex",gap:"16px",marginBottom:"6px",paddingLeft:"36px"},
  zoneCardStat:{fontSize:"12px",color:"#8b7a5e",letterSpacing:"1px"},
  zoneCardDesc:{fontSize:"12px",color:"#6b6252",lineHeight:"1.5",margin:"4px 0 0",paddingLeft:"36px"},
  zoneActiveBox:{display:"flex",flexDirection:"column",alignItems:"center",padding:"24px 16px",background:"linear-gradient(135deg,rgba(180,140,120,0.1),rgba(220,180,150,0.04))",border:"1px solid rgba(220,180,150,0.3)",borderRadius:"16px",marginBottom:"16px"},
  zoneActiveLbl:{fontSize:"14px",color:"#dcb496",letterSpacing:"4px",textTransform:"uppercase",marginBottom:"16px",textAlign:"center"},
  zoneActiveStats:{display:"flex",gap:"30px",marginBottom:"20px"},
  zoneActiveStat:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px"},
  zoneActiveStatVal:{fontSize:"44px",color:"#e8dcc8",fontWeight:"600",lineHeight:"1",fontVariantNumeric:"tabular-nums"},
  zoneActiveStatLbl:{fontSize:"10px",color:"#6b6252",letterSpacing:"3px",textTransform:"uppercase"},
  zoneTimer:{fontSize:"56px",color:"#dcb496",fontWeight:"600",fontVariantNumeric:"tabular-nums",letterSpacing:"4px",marginBottom:"10px"},
  zoneActiveDesc:{fontSize:"12px",color:"#8b7a5e",lineHeight:"1.6",textAlign:"center",margin:"12px 0 0",letterSpacing:"1px"},
  nextZoneBox:{padding:"10px 14px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",marginBottom:"16px",display:"flex",flexDirection:"column",gap:"2px"},
  nextZoneLbl:{fontSize:"10px",color:"#6b6252",letterSpacing:"3px",textTransform:"uppercase"},
  nextZoneName:{fontSize:"14px",color:"#d4c9a8",fontWeight:"600"},
  nextZoneStats:{fontSize:"11px",color:"#8b7a5e"},
  pyramidList:{display:"flex",flexDirection:"column",gap:"8px",marginBottom:"20px"},
  pyramidZone:{display:"flex",gap:"12px",padding:"14px",background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px"},
  pyramidZoneNum:{width:"28px",height:"28px",borderRadius:"50%",background:"rgba(220,180,150,0.15)",border:"1px solid rgba(220,180,150,0.35)",color:"#dcb496",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"13px",fontWeight:"600",flexShrink:0},
  pyramidZoneName:{fontSize:"14px",color:"#e8dcc8",fontWeight:"600",display:"block",letterSpacing:"1px"},
  pyramidZoneStats:{fontSize:"12px",color:"#dcb496",display:"block",marginTop:"2px",letterSpacing:"1px"},
  pyramidZoneDesc:{fontSize:"11px",color:"#8b7a5e",display:"block",marginTop:"4px",fontStyle:"italic",lineHeight:"1.5"},
  pyramidCurrentBox:{background:"linear-gradient(135deg,rgba(180,140,120,0.1),rgba(220,180,150,0.04))",border:"1px solid rgba(220,180,150,0.3)",borderRadius:"16px",padding:"24px",marginBottom:"16px",display:"flex",flexDirection:"column",alignItems:"center",gap:"12px"},
  pyramidCurrentLbl:{fontSize:"13px",color:"#dcb496",letterSpacing:"4px",textTransform:"uppercase",textAlign:"center"},
  pyramidCurrentMain:{display:"flex",flexDirection:"column",alignItems:"center"},
  pyramidCurrentStats:{display:"flex",gap:"20px",marginTop:"8px"},
  pyramidStat:{display:"flex",flexDirection:"column",alignItems:"center",gap:"2px",minWidth:"80px"},
  pyramidStatLbl:{fontSize:"10px",color:"#6b6252",letterSpacing:"2px",textTransform:"uppercase"},
  pyramidStatVal:{fontSize:"26px",color:"#e8dcc8",fontWeight:"600"},
  pyramidCurrentDesc:{fontSize:"12px",color:"#8b7a5e",textAlign:"center",lineHeight:"1.5",fontStyle:"italic",margin:"4px 0 0 0"},
  pyramidNext:{display:"flex",gap:"8px",alignItems:"center",padding:"10px 14px",background:"rgba(139,122,94,0.04)",border:"1px dashed rgba(139,122,94,0.15)",borderRadius:"8px",marginBottom:"16px"},
  pyramidNextLbl:{fontSize:"10px",color:"#6b6252",letterSpacing:"2px",textTransform:"uppercase",flexShrink:0},
  pyramidNextVal:{fontSize:"12px",color:"#8b7a5e"},
  bodyViewToggle:{display:"flex",gap:"6px",marginBottom:"16px",justifyContent:"center"},
  bodyViewBtn:{padding:"8px 22px",background:"none",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"20px",color:"#8b7a5e",fontFamily:"inherit",fontSize:"13px",letterSpacing:"2px",cursor:"pointer",textTransform:"uppercase"},
  bodyViewBtnActive:{background:"rgba(196,169,106,0.15)",borderColor:"rgba(196,169,106,0.4)",color:"#c4a96a"},
  bodyCanvas:{background:"linear-gradient(180deg,rgba(20,18,14,0.6),rgba(10,8,6,0.8))",border:"1px solid rgba(139,122,94,0.15)",borderRadius:"12px",padding:"16px 8px",marginBottom:"16px"},
  muscleDetailBox:{background:"rgba(139,122,94,0.08)",border:"1px solid rgba(196,169,106,0.25)",borderRadius:"12px",padding:"14px 16px",marginBottom:"16px"},
  muscleDetailHead:{display:"flex",alignItems:"flex-start",gap:"12px",marginBottom:"10px"},
  muscleDetailName:{fontSize:"18px",color:"#e8dcc8",fontWeight:"600",letterSpacing:"2px",display:"block"},
  muscleDetailTier:{fontSize:"13px",letterSpacing:"3px",textTransform:"uppercase",display:"block",marginTop:"2px",fontWeight:"600"},
  muscleDetailClose:{background:"none",border:"none",color:"#6b6252",fontSize:"14px",cursor:"pointer",padding:"2px 8px"},
  muscleProgressBar:{width:"100%",height:"6px",background:"rgba(139,122,94,0.15)",borderRadius:"3px",overflow:"hidden",marginBottom:"10px"},
  muscleProgressFill:{height:"100%",borderRadius:"3px",transition:"width 0.4s"},
  muscleStats:{display:"flex",flexDirection:"column",gap:"4px",marginBottom:"8px"},
  muscleStatItem:{fontSize:"12px",color:"#8b7a5e",letterSpacing:"1px"},
  muscleExHead:{fontSize:"11px",color:"#6b6252",letterSpacing:"3px",textTransform:"uppercase",marginTop:"10px",marginBottom:"6px"},
  muscleExList:{display:"flex",flexWrap:"wrap",gap:"4px"},
  muscleExChip:{fontSize:"11px",color:"#d4c9a8",background:"rgba(139,122,94,0.1)",border:"1px solid rgba(139,122,94,0.2)",borderRadius:"12px",padding:"4px 10px",letterSpacing:"1px"},
  bodyOverallBox:{background:"rgba(139,122,94,0.05)",border:"1px solid rgba(139,122,94,0.12)",borderRadius:"10px",padding:"4px 0",marginBottom:"16px"},
  bodyOverallRow:{display:"flex",justifyContent:"space-between",padding:"10px 16px",borderBottom:"1px solid rgba(139,122,94,0.06)"},
  muscleList:{display:"flex",flexDirection:"column",gap:"4px",marginBottom:"40px"},
  muscleListRow:{display:"flex",alignItems:"center",gap:"10px",padding:"10px 12px",background:"rgba(139,122,94,0.04)",border:"1px solid",borderRadius:"8px",cursor:"pointer",fontFamily:"inherit"},
  muscleListDot:{width:"10px",height:"10px",borderRadius:"50%",flexShrink:0},
  muscleListName:{fontSize:"14px",color:"#d4c9a8",textAlign:"left"},
  muscleListTier:{fontSize:"12px",letterSpacing:"2px",fontWeight:"600"},
  progChartBox:{background:"linear-gradient(180deg,rgba(20,18,14,0.4),rgba(10,8,6,0.6))",border:"1px solid rgba(196,169,106,0.18)",borderRadius:"10px",padding:"12px",marginBottom:"16px"},
  progChartFooter:{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:"6px"},
  progChartLbl:{fontSize:"11px",color:"#8b7a5e",letterSpacing:"2px",textTransform:"uppercase"},
};
