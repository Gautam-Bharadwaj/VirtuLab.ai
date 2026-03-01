import React, { useState, lazy, Suspense } from 'react';
import { useLabStore, LabType } from '../../store/useLabStore';
import { motion, AnimatePresence } from 'framer-motion';
import { TheoryPart } from './TheoryPart';
import { ProcedurePart } from './ProcedurePart';
import { PredictionCard } from './PredictionCard';
import { PredictionResult } from './PredictionResult';
import { labCatalog } from '../../config/labsConfig';

const OhmLawSim = lazy(() => import('./OhmLawSim').then(m => ({ default: m.OhmLawSim })));
const ProjectileSim = lazy(() => import('./ProjectileSim').then(m => ({ default: m.ProjectileSim })));
const TitrationSim = lazy(() => import('./TitrationSim').then(m => ({ default: m.TitrationSim })));
const OpticsSim = lazy(() => import('./OpticsSim').then(m => ({ default: m.OpticsSim })));
const LogicGatesSim = lazy(() => import('./LogicGatesSim').then(m => ({ default: m.LogicGatesSim })));
const FlameTestSim = lazy(() => import('./FlameTestSim').then(m => ({ default: m.FlameTestSim })));
const PeriodicTableSim = lazy(() => import('./PeriodicTableSim').then(m => ({ default: m.PeriodicTableSim })));
const ReactionRateSim = lazy(() => import('./ReactionRateSim').then(m => ({ default: m.ReactionRateSim })));
const MitosisSim = lazy(() => import('./MitosisSim').then(m => ({ default: m.MitosisSim })));

const labComponents: Record<LabType, any> = {
  "ohm-law": OhmLawSim,
  "projectile-motion": ProjectileSim,
  "optics-bench": OpticsSim,
  "logic-gates": LogicGatesSim,
  "titration": TitrationSim,
  "flame-test": FlameTestSim,
  "periodic-table": PeriodicTableSim,
  "reaction-rate": ReactionRateSim,
  "mitosis": MitosisSim,
};

export const SimulationEngine: React.FC = () => {
  const { activeLab, activeTab, running, predictionSkipped, showPredictionResult, getPredictionConfig, inputs, addObservation } = useLabStore();
  const [initialized, setInitialized] = useState(false);
  const labMeta = labCatalog[activeLab] || labCatalog["ohm-law"];
  const LabComponent = labComponents[activeLab] || labComponents["ohm-law"];
  const hasPrediction = getPredictionConfig() !== null;

  React.useEffect(() => {
    setInitialized(false);
  }, [activeLab]);

  React.useEffect(() => {
    if (!running) return;
    addObservation({ ...inputs });
    const interval = setInterval(() => {
      const state = useLabStore.getState();
      if (state.running) {
        state.addObservation({ ...state.inputs });
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [running]); // eslint-disable-line react-hooks/exhaustive-deps

  if (activeTab === 'theory') return <TheoryPart />;
  if (activeTab === 'procedure') return <ProcedurePart />;

  const showPredictionCard = initialized && !running && hasPrediction && !predictionSkipped;

  return (
    <div id="simulation-container" className="relative w-full h-full rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.01] shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <AnimatePresence mode="wait">
        {!initialized ? (
          <motion.div
            key="landing"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 md:p-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_55%)] pointer-events-none" />
            <div className={`absolute inset-0 bg-gradient-radial ${labMeta.gradient} pointer-events-none`} />
            <div className="absolute -top-20 -right-16 w-64 h-64 rounded-full bg-white/[0.03] blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-16 w-64 h-64 rounded-full bg-orange-500/[0.05] blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center max-w-2xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white/55">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Interactive Lab Session
              </div>

              <img src={labMeta.icon} alt={labMeta.title} className="w-28 h-28 object-contain mb-5 drop-shadow-[0_18px_35px_rgba(0,0,0,0.55)]" />
              <h2 className={`text-4xl md:text-5xl font-black ${labMeta.accent} mb-3 uppercase tracking-tight`}>{labMeta.title}</h2>
              <p className="text-lg md:text-xl text-white/55 mb-10 max-w-xl mx-auto">{labMeta.subtitle}</p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setInitialized(true)}
                className="group relative flex items-center gap-3 bg-gradient-to-r from-orange-400 to-orange-500 text-black px-10 md:px-12 py-4.5 rounded-full font-black uppercase tracking-[0.18em] text-xs md:text-sm shadow-[0_16px_45px_rgba(249,115,22,0.38)] border border-orange-300/50"
              >
                <div className="absolute inset-0 rounded-full bg-white/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]" />
                <div className="absolute inset-0 rounded-full bg-white/20 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite_1.2s]" />
                <div className="absolute inset-0 rounded-full bg-white/8 group-hover:bg-white/15 transition-colors" />
                <span>Initialize Simulation</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" /></svg>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="simulator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0"
          >
            <Suspense fallback={
              <div className="flex flex-col items-center justify-center h-full gap-4">
                <div className="w-12 h-12 border-4 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Loading Module...</span>
              </div>
            }>
              <LabComponent />
            </Suspense>

            <AnimatePresence>
              {showPredictionCard && <PredictionCard />}
            </AnimatePresence>

            <AnimatePresence>
              {showPredictionResult && <PredictionResult />}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
