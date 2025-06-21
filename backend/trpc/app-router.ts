import { router } from "./create-context";
import { hiProcedure } from "./routes/example/hi/route";

// Health routes
import { getAppointments, bookAppointment, cancelAppointment } from "./routes/health/appointments/route";
import { getCarePlans, getCarePlan, getCarePlanProgress } from "./routes/health/care-plans/route";
import { getHealthPassport } from "./routes/health/passport/route";
import { getReferrals } from "./routes/health/referrals/route";
import { submitSymptoms, getEmergencyGuidance } from "./routes/health/triage/route";
import { getHealthMetrics, addHealthMetric } from "./routes/health/metrics/route";
import { getProactiveRecommendations } from "./routes/fitness/ai-trainer/route";
import { getWorkouts, completeWorkout } from "./routes/fitness/workouts/route";
import { getWellnessPaths, completeWellnessModule } from "./routes/wellness/route";

export const appRouter = router({
  example: router({
    hi: hiProcedure,
  }),
  
  health: router({
    appointments: router({
      getAppointments,
      bookAppointment,
      cancelAppointment,
    }),
    
    carePlans: router({
      getCarePlans,
      getCarePlan,
      getCarePlanProgress,
    }),
    
    metrics: router({
      getHealthMetrics,
      addHealthMetric,
    }),
    
    triage: router({
      submitSymptoms,
      getEmergencyGuidance,
    }),
    
    passport: router({
      getHealthPassport,
    }),
    
    referrals: router({
      getReferrals,
    }),
  }),
  
  fitness: router({
    workouts: router({
      getWorkouts,
      completeWorkout,
    }),
    
    aiTrainer: router({
      getProactiveRecommendations,
    }),
  }),
  
  wellness: router({
    paths: router({
      getWellnessPaths,
      completeWellnessModule,
    }),
  }),
});

export type AppRouter = typeof appRouter;