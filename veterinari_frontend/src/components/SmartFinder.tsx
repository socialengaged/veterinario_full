import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimalChip } from "@/components/AnimalChip";
import { Button } from "@/components/ui/button";
import { animalCategories } from "@/config/site";
import { serviceTaxonomy } from "@/data/service-taxonomy";
import { cn } from "@/lib/utils";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";

export interface FinderResult {
  animal: string;
  animalLabel: string;
  service: string;
  serviceLabel: string;
  subService: string;
  subServiceLabel: string;
  location: string;
}

interface SmartFinderProps {
  onComplete: (result: FinderResult) => void;
}

const stepVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.2 } },
};

export function SmartFinder({ onComplete }: SmartFinderProps) {
  const [step, setStep] = useState(0);
  const [category, setCategory] = useState("");
  const [animal, setAnimal] = useState("");
  const [service, setService] = useState("");
  const [subService, setSubService] = useState("");
  const [location, setLocation] = useState("");

  const selectedCategory = animalCategories.find((c) => c.id === category);
  const selectedAnimal = selectedCategory?.animals.find((a) => a.id === animal);
  const selectedServiceCat = serviceTaxonomy.find((s) => s.id === service);
  const selectedSub = selectedServiceCat?.sub.find((s) => s.id === subService);

  const totalSteps = 5;
  const progress = ((step + 1) / totalSteps) * 100;

  const handleCategorySelect = (id: string) => {
    setCategory(id);
    setAnimal("");
    setService("");
    setSubService("");
    setTimeout(() => setStep(1), 200);
  };

  const handleAnimalSelect = (id: string) => {
    setAnimal(id);
    setService("");
    setSubService("");
    setTimeout(() => setStep(2), 200);
  };

  const handleServiceSelect = (id: string) => {
    setService(id);
    setSubService("");
    setTimeout(() => setStep(3), 200);
  };

  const handleSubServiceSelect = (id: string) => {
    setSubService(id);
    setTimeout(() => setStep(4), 200);
  };

  const handleSubmit = () => {
    if (!location.trim()) return;
    onComplete({
      animal,
      animalLabel: selectedAnimal?.label || "",
      service,
      serviceLabel: selectedServiceCat?.label || "",
      subService,
      subServiceLabel: selectedSub?.label || "",
      location: location.trim(),
    });
  };

  return (
    <div id="smart-finder" className="w-full max-w-2xl mx-auto">
      <div className="bg-card rounded-2xl border border-border shadow-lg overflow-hidden">
        {/* Progress bar */}
        <div className="h-1.5 bg-muted">
          <motion.div
            className="h-full bg-primary rounded-r-full"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>

        <div className="p-6 md:p-8">
          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-6">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                aria-label="Torna indietro"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Passo {step + 1} di {totalSteps}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {/* Step 0: Category */}
            {step === 0 && (
              <motion.div key="step-0" {...stepVariants}>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Che tipo di animale hai?</h3>
                <p className="text-sm text-muted-foreground mb-5">Seleziona la categoria</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {animalCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleCategorySelect(c.id)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200",
                        category === c.id
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-accent"
                      )}
                    >
                      <span className="text-2xl" aria-hidden="true">{c.emoji}</span>
                      <span className="text-sm font-medium leading-tight">{c.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 1: Animal */}
            {step === 1 && selectedCategory && (
              <motion.div key="step-1" {...stepVariants}>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Quale animale?</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {selectedCategory.emoji} {selectedCategory.label}
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                  {selectedCategory.animals.map((a) => (
                    <AnimalChip
                      key={a.id}
                      emoji={a.emoji}
                      label={a.label}
                      selected={animal === a.id}
                      onClick={() => handleAnimalSelect(a.id)}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Service category */}
            {step === 2 && (
              <motion.div key="step-2" {...stepVariants}>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Di quale servizio hai bisogno?</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  Per {selectedAnimal?.emoji} {selectedAnimal?.label} — scegli la categoria
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {serviceTaxonomy.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleServiceSelect(s.id)}
                      className={cn(
                        "flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200",
                        service === s.id
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-accent"
                      )}
                    >
                      <span className="text-2xl" aria-hidden="true">{s.emoji}</span>
                      <span className="text-sm font-medium leading-tight">{s.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Subcategory */}
            {step === 3 && selectedServiceCat && (
              <motion.div key="step-3" {...stepVariants}>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Specifica il servizio</h3>
                <p className="text-sm text-muted-foreground mb-5">
                  {selectedServiceCat.emoji} {selectedServiceCat.label}
                </p>
                <div className="grid gap-2">
                  {selectedServiceCat.sub.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleSubServiceSelect(s.id)}
                      className={cn(
                        "flex flex-col p-4 rounded-xl border text-left transition-all duration-200",
                        subService === s.id
                          ? "bg-primary text-primary-foreground border-primary shadow-md"
                          : "bg-card text-foreground border-border hover:border-primary/40 hover:bg-accent"
                      )}
                    >
                      <span className="text-sm font-semibold">{s.label}</span>
                      {s.description && (
                        <span className={cn(
                          "text-xs mt-0.5",
                          subService === s.id ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}>
                          {s.description}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Location */}
            {step === 4 && (
              <motion.div key="step-4" {...stepVariants}>
                <h3 className="font-display text-xl font-bold text-foreground mb-1">Dove ti trovi?</h3>
                <p className="text-sm text-muted-foreground mb-5">Inserisci il CAP, la città o il comune</p>
                <div className="relative mb-5">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="es. 73100 o Lecce"
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring text-base"
                    onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  />
                </div>
                <Button
                  variant="cta"
                  size="lg"
                  className="w-full"
                  onClick={handleSubmit}
                  disabled={!location.trim()}
                >
                  Invia richiesta <ArrowRight className="ml-1 h-5 w-5" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
