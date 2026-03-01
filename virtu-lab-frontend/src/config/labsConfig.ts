export type LabType =
  | "ohm-law" | "projectile-motion" | "optics-bench" | "logic-gates"
  | "titration" | "flame-test" | "periodic-table" | "reaction-rate"
  | "mitosis";

export interface LabInputs {
  [key: string]: number;
}

export interface PredictionConfig {
  question: (inputs: LabInputs) => string;
  unit: string;
  computeActual: (inputs: LabInputs) => number;
  hintOnGap: (predicted: number, actual: number) => string;
}

export interface LabCatalogEntry {
  title: string;
  subtitle: string;
  subject: "Physics" | "Chemistry" | "Biology";
  color: string;
  shadow: string;
  gradient: string;
  accent: string;
  icon: string;
}

export const labCatalog: Record<LabType, LabCatalogEntry> = {
  "ohm-law": {
    title: "Ohm's Law & Resistance",
    subtitle: "Study V-I characteristics and resistance",
    subject: "Physics",
    color: "bg-blue-500",
    shadow: "shadow-blue-500/20",
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    accent: "text-blue-400",
    icon: "/icon_ohm_law.png",
  },
  "projectile-motion": {
    title: "Projectile Motion",
    subtitle: "Analyze trajectory, velocity, and angles",
    subject: "Physics",
    color: "bg-indigo-500",
    shadow: "shadow-indigo-500/20",
    gradient: "from-indigo-500/20 via-blue-500/10 to-transparent",
    accent: "text-indigo-400",
    icon: "/icon_projectile.png",
  },
  "optics-bench": {
    title: "Optics Bench",
    subtitle: "Image formation by lenses & mirrors",
    subject: "Physics",
    color: "bg-cyan-500",
    shadow: "shadow-cyan-500/20",
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    accent: "text-cyan-400",
    icon: "/icon_optics.png",
  },
  "logic-gates": {
    title: "Logic Gates",
    subtitle: "Construct digital circuits with basic gates",
    subject: "Physics",
    color: "bg-blue-600",
    shadow: "shadow-blue-600/20",
    gradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
    accent: "text-blue-400",
    icon: "/icon_logic_gates.png",
  },
  "titration": {
    title: "Acid-Base Titration",
    subtitle: "Determine concentration using indicators",
    subject: "Chemistry",
    color: "bg-orange-500",
    shadow: "shadow-orange-500/20",
    gradient: "from-orange-500/20 via-rose-500/10 to-transparent",
    accent: "text-orange-400",
    icon: "/icon_titration.png",
  },
  "flame-test": {
    title: "Flame Test",
    subtitle: "Identify elements by flame color",
    subject: "Chemistry",
    color: "bg-rose-500",
    shadow: "shadow-rose-500/20",
    gradient: "from-rose-500/20 via-orange-500/10 to-transparent",
    accent: "text-rose-400",
    icon: "/icon_flame_test.png",
  },
  "periodic-table": {
    title: "Periodic Table Trends",
    subtitle: "Explore atomic properties and structures",
    subject: "Chemistry",
    color: "bg-amber-500",
    shadow: "shadow-amber-500/20",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    accent: "text-amber-400",
    icon: "/icon_periodic_table.png",
  },
  "reaction-rate": {
    title: "Rate of Reaction",
    subtitle: "Effect of temp & concentration on rates",
    subject: "Chemistry",
    color: "bg-orange-600",
    shadow: "shadow-orange-600/20",
    gradient: "from-orange-600/20 via-red-600/10 to-transparent",
    accent: "text-orange-500",
    icon: "/icon_reaction_rate.png",
  },
  "mitosis": {
    title: "Mitosis",
    subtitle: "Follow stages of somatic cell division",
    subject: "Biology",
    color: "bg-green-600",
    shadow: "shadow-green-600/20",
    gradient: "from-green-600/20 via-emerald-600/10 to-transparent",
    accent: "text-green-500",
    icon: "/icon_mitosis.png",
  },
};

export const defaultInputsByLab: Record<LabType, LabInputs> = {
  "ohm-law": { voltage: 5, resistance: 100 },
  "projectile-motion": { angle: 45, velocity: 20 },
  "optics-bench": { focalLength: 15, objectDistance: 30 },
  "logic-gates": { gateType: 1 },
  "titration": { baseVolume: 0 },
  "flame-test": { elementIdx: 0 },
  "periodic-table": { elementIdx: 1 },
  "reaction-rate": { temperature: 25, concentration: 1 },
  "mitosis": { stage: 0 },
};

export const excludedReportLabs: LabType[] = ["logic-gates", "periodic-table", "mitosis", "flame-test"];

export const predictionConfigs: Partial<Record<LabType, PredictionConfig>> = {
  "ohm-law": {
    question: (inp) => `With voltage ${inp.voltage ?? 5}V and resistance ${inp.resistance ?? 100}ohm, what current do you predict (in mA)?`,
    unit: "mA",
    computeActual: (inp) => ((inp.voltage ?? 5) / (inp.resistance ?? 100)) * 1000,
    hintOnGap: () => "Remember Ohm's Law: I = V / R. Current is directly proportional to voltage and inversely proportional to resistance.",
  },
  "projectile-motion": {
    question: (inp) => `With angle ${inp.angle ?? 45} deg and velocity ${inp.velocity ?? 20} m/s, how far will the projectile land (in metres)?`,
    unit: "m",
    computeActual: (inp) => {
      const v = inp.velocity ?? 20;
      const a = ((inp.angle ?? 45) * Math.PI) / 180;
      return (v ** 2 * Math.sin(2 * a)) / 9.81;
    },
    hintOnGap: () => "The range formula is R = v^2 sin(2*theta) / g. Maximum range occurs near 45 degrees.",
  },
  "titration": {
    question: (inp) => `After adding ${inp.baseVolume ?? 0} mL of NaOH, what pH do you predict?`,
    unit: "pH",
    computeActual: (inp) => {
      const vol = inp.baseVolume ?? 0;
      if (vol < 24) return 1 + (vol / 24) * 5;
      if (vol < 26) return 7 + Math.sin(((vol - 24) / 2) * Math.PI / 2) * 3;
      return 10 + Math.min((vol - 26) / 24, 1) * 4;
    },
    hintOnGap: () => "Before equivalence pH rises slowly, then jumps around 25 mL.",
  },
  "optics-bench": {
    question: (inp) => `With focal length ${inp.focalLength ?? 15} cm and object at ${inp.objectDistance ?? 30} cm, where will the image form (in cm)?`,
    unit: "cm",
    computeActual: (inp) => {
      const f = inp.focalLength ?? 15;
      const u = inp.objectDistance ?? 30;
      return (u * f) / (u - f);
    },
    hintOnGap: () => "Use 1/v = 1/f - 1/u for lens/mirror calculations.",
  },
  "reaction-rate": {
    question: (inp) => `At ${inp.temperature ?? 25} degC and ${inp.concentration ?? 1}M concentration, what reaction rate do you predict (arbitrary units)?`,
    unit: "units",
    computeActual: (inp) => {
      const T = inp.temperature ?? 25;
      const C = inp.concentration ?? 1;
      return parseFloat((C * Math.exp((T - 25) / 10) * 2).toFixed(2));
    },
    hintOnGap: () => "Rate tends to increase with both temperature and concentration.",
  },
};

