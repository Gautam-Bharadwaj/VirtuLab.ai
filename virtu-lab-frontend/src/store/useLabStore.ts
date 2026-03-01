import { create } from "zustand";
import {
  LabType,
  LabInputs,
  PredictionConfig,
  defaultInputsByLab,
  predictionConfigs,
  excludedReportLabs,
} from "../config/labsConfig";
import { saveLabRun, UserRole } from "../lib/labRuns";

export type { LabType } from "../config/labsConfig";

export type Language = "en" | "hi" | "ta";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
}

interface StatReading {
  label: string;
  value: string;
  unit: string;
  icon: string;
  trend?: "up" | "down" | "stable";
}

export interface FailureState {
  name: string;
  description: string;
}

export interface ChallengeData {
  id: string;
  title: string;
  description: string;
  fixedParams: Record<string, number>;
  targetKey: string;
  targetValue: number;
  targetUnit: string;
  tolerance: number;
  compute: string;
  hint: string;
  proof: string;
}

export type { LabInputs, PredictionConfig } from "../config/labsConfig";

const genericStats: StatReading[] = [
  { label: "Stability", value: "98.5", unit: "%", icon: "/icon_periodic_table.png", trend: "stable" },
  { label: "Accuracy", value: "0.01", unit: "Δ", icon: "/icon_projectile.png", trend: "up" },
  { label: "Performance", value: "60", unit: "fps", icon: "/icon_ohm_law.png", trend: "stable" },
];

const getStatsForLab = (_lab: LabType): StatReading[] => {
  return genericStats;
};

const welcomeMessages: ChatMessage[] = [
  {
    id: "welcome-1",
    role: "assistant",
    text: "Welcome to VirtuLab! I'm your AI Lab Mentor. I'll guide you through experiments, explain concepts, and help you learn. Select an experiment from the sidebar to get started!",
    timestamp: Date.now(),
  },
];

interface LabState {
  userId: string;
  userRole: UserRole;
  setUserId: (userId: string) => void;
  setUserRole: (role: UserRole) => void;
  activeLab: LabType;
  setActiveLab: (lab: LabType) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  inputs: LabInputs;
  updateInput: (key: string, value: number) => void;
  running: boolean;
  startExperiment: () => void;
  stopExperiment: () => void;
  resetExperiment: () => void;
  failureState: FailureState | null;
  setFailureState: (failure: FailureState | null) => void;
  score: number;
  mistakeCount: number;
  experimentStartTime: number | null;
  experimentDuration: number;
  showSkillRadar: boolean;
  setShowSkillRadar: (show: boolean) => void;
  messages: ChatMessage[];
  addMessage: (role: "user" | "assistant", text: string) => void;
  clearMessages: () => void;
  stats: StatReading[];
  setStats: (stats: StatReading[]) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  tutorOpen: boolean;
  toggleTutor: () => void;
  activeTab: "theory" | "procedure" | "simulator";
  setActiveTab: (tab: "theory" | "procedure" | "simulator") => void;
  prediction: number | null;
  predictionSkipped: boolean;
  predictionActual: number | null;
  showPredictionResult: boolean;
  setPrediction: (val: number | null) => void;
  skipPrediction: () => void;
  submitPrediction: (val: number) => void;
  closePredictionResult: () => void;
  getPredictionConfig: () => PredictionConfig | null;
  challengeActive: boolean;
  challengeData: ChallengeData | null;
  challengeAttempts: number;
  challengeHintUnlocked: boolean;
  challengeCompleted: boolean;
  showChallengePanel: boolean;
  showChallengeSuccess: boolean;
  startChallenge: (data: ChallengeData) => void;
  incrementChallengeAttempt: () => void;
  completeChallenge: () => void;
  dismissChallenge: () => void;
  setShowChallengePanel: (show: boolean) => void;
  observations: Record<string, number>[];
  addObservation: (obs: Record<string, number>) => void;
  failureHistory: FailureState[];
  showLabReport: boolean;
  setShowLabReport: (show: boolean) => void;
}

export const useLabStore = create<LabState>((set, get) => ({
  userId: "anonymous",
  userRole: "student",
  setUserId: (userId) => set({ userId }),
  setUserRole: (userRole) => set({ userRole }),

  activeLab: "ohm-law",
  setActiveLab: (lab) =>
    set({
      activeLab: lab,
      activeTab: "simulator",
      stats: getStatsForLab(lab),
      inputs: { ...defaultInputsByLab[lab] },
      running: false,
      failureState: null,
      prediction: null,
      predictionSkipped: false,
      predictionActual: null,
      showPredictionResult: false,
    }),

  activeTab: "simulator",
  setActiveTab: (tab) => set({ activeTab: tab }),

  language: "en",
  setLanguage: (lang) => set({ language: lang }),

  inputs: { ...defaultInputsByLab["ohm-law"] },
  updateInput: (key, value) =>
    set((state) => ({
      inputs: { ...state.inputs, [key]: value },
    })),

  running: false,
  score: 0,
  mistakeCount: 0,
  experimentStartTime: null,
  experimentDuration: 0,
  showSkillRadar: false,
  setShowSkillRadar: (show) => set({ showSkillRadar: show }),

  startExperiment: () => {
    set({
      running: true,
      failureState: null,
      experimentStartTime: get().experimentStartTime ?? Date.now(),
      observations: [],
      failureHistory: [],
    });
  },

  stopExperiment: () => {
    const { experimentStartTime, activeLab, inputs, prediction, challengeActive, failureHistory, userId, userRole } = get();
    const duration = experimentStartTime
      ? Math.round((Date.now() - experimentStartTime) / 1000)
      : 0;

    const config = predictionConfigs[activeLab];
    const actualVal = config ? config.computeActual(inputs) : null;

    const isExcluded = excludedReportLabs.includes(activeLab);
    const showReport = duration >= 30 && !challengeActive && !isExcluded;

    void saveLabRun({
      userId,
      role: userRole,
      labKey: activeLab,
      durationSec: duration,
      score: 85,
      inputs,
      failureCount: failureHistory.length,
    });

    set({
      running: false,
      score: 85,
      experimentDuration: duration,
      showSkillRadar: prediction === null && !showReport && !isExcluded,
      predictionActual: actualVal,
      showPredictionResult: prediction !== null && actualVal !== null,
      showLabReport: showReport,
    });
  },

  resetExperiment: () => {
    const { activeLab } = get();
    set({
      inputs: { ...defaultInputsByLab[activeLab] },
      running: false,
      failureState: null,
      score: 0,
      mistakeCount: 0,
      experimentStartTime: null,
      experimentDuration: 0,
      showSkillRadar: false,
      prediction: null,
      predictionSkipped: false,
      predictionActual: null,
      showPredictionResult: false,
      observations: [],
      failureHistory: [],
    });
  },

  failureState: null,
  setFailureState: (failure) => {
    if (failure) {
      set((state) => ({
        failureState: failure,
        failureHistory: [...state.failureHistory, failure],
      }));
    } else {
      set({ failureState: null });
    }
  },

  messages: welcomeMessages,
  addMessage: (role, text) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
          role,
          text,
          timestamp: Date.now(),
        },
      ],
    })),
  clearMessages: () => set({ messages: welcomeMessages }),

  stats: genericStats,
  setStats: (stats) => set({ stats }),

  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  tutorOpen: true,
  toggleTutor: () => set((state) => ({ tutorOpen: !state.tutorOpen })),

  prediction: null,
  predictionSkipped: false,
  predictionActual: null,
  showPredictionResult: false,
  setPrediction: (val) => set({ prediction: val }),
  skipPrediction: () => set({ predictionSkipped: true, prediction: null }),
  submitPrediction: (val) => {
    set({ prediction: val, predictionSkipped: true });
    get().startExperiment();
  },
  closePredictionResult: () => set({ showPredictionResult: false, showSkillRadar: true }),
  getPredictionConfig: () => predictionConfigs[get().activeLab] ?? null,

  challengeActive: false,
  challengeData: null,
  challengeAttempts: 0,
  challengeHintUnlocked: false,
  challengeCompleted: false,
  showChallengePanel: false,
  showChallengeSuccess: false,
  startChallenge: (data) => set({
    challengeActive: true,
    challengeData: data,
    challengeAttempts: 0,
    challengeHintUnlocked: false,
    challengeCompleted: false,
    showChallengePanel: true,
    showChallengeSuccess: false,
    running: false,
    predictionSkipped: true,
    prediction: null,
  }),
  incrementChallengeAttempt: () => {
    const attempts = get().challengeAttempts + 1;
    set({
      challengeAttempts: attempts,
      challengeHintUnlocked: attempts >= 3,
    });
  },
  completeChallenge: () => set({
    challengeCompleted: true,
    showChallengeSuccess: true,
    running: false,
  }),
  dismissChallenge: () => set({
    challengeActive: false,
    challengeData: null,
    showChallengePanel: false,
    showChallengeSuccess: false,
    challengeAttempts: 0,
    challengeHintUnlocked: false,
    challengeCompleted: false,
  }),
  setShowChallengePanel: (show) => set({ showChallengePanel: show }),

  observations: [],
  addObservation: (obs) => set((state) => ({
    observations: [...state.observations.slice(-4), obs], // keep max 5
  })),
  failureHistory: [],
  showLabReport: false,
  setShowLabReport: (show) => set({ showLabReport: show }),
}));
