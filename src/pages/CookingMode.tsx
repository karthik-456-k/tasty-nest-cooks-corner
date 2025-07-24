import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Timer, ChefHat, CheckCircle, PlayCircle, PauseCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useRecipeStore } from '@/hooks/useRecipeStore';
import { useToast } from '@/hooks/use-toast';

const CookingMode = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getRecipeById } = useRecipeStore();
  const { toast } = useToast();
  
  const recipe = getRecipeById(id || '');
  const [currentStep, setCurrentStep] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerRunning && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining((time) => {
          if (time <= 1) {
            setIsTimerRunning(false);
            toast({
              title: "Timer finished!",
              description: "Time to check your cooking progress",
            });
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timeRemaining, toast]);

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Recipe not found</h1>
          <Button onClick={() => navigate('/')} className="bg-peach-500 hover:bg-peach-600">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  const currentInstruction = recipe.instructions[currentStep];
  const totalSteps = recipe.instructions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      setTimeRemaining(0);
      setIsTimerRunning(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setTimeRemaining(0);
      setIsTimerRunning(false);
    }
  };

  const handleStepComplete = () => {
    setCompletedSteps(prev => [...prev, currentStep]);
    if (currentStep < totalSteps - 1) {
      handleNext();
    } else {
      toast({
        title: "Cooking complete! 🎉",
        description: "Congratulations on finishing your recipe!",
      });
    }
  };

  const startTimer = (minutes: number) => {
    setTimeRemaining(minutes * 60);
    setIsTimerRunning(true);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => navigate(`/recipe/${id}`)}
              className="hover:bg-cream-100"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Exit Cooking Mode
            </Button>
            <div className="text-center">
              <h1 className="font-bold text-lg">{recipe.title}</h1>
              <p className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {totalSteps}
              </p>
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Current Step */}
          <div className="bg-card rounded-3xl p-8 shadow-lg mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                completedSteps.includes(currentStep) 
                  ? 'bg-green-500 text-white' 
                  : 'bg-peach-500 text-white'
              }`}>
                {completedSteps.includes(currentStep) ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  currentStep + 1
                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">Step {currentStep + 1}</h2>
                {currentInstruction.duration && (
                  <p className="text-sm text-muted-foreground">
                    Estimated time: {currentInstruction.duration}
                  </p>
                )}
              </div>
            </div>

            <p className="text-lg leading-relaxed mb-6">
              {currentInstruction.description}
            </p>

            {/* Timer Section */}
            {currentInstruction.duration && (
              <div className="bg-accent/30 rounded-2xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Timer className="w-5 h-5 text-peach-500" />
                    <span className="font-medium">Timer</span>
                  </div>
                  {timeRemaining > 0 && (
                    <div className="text-2xl font-bold text-peach-600">
                      {formatTime(timeRemaining)}
                    </div>
                  )}
                </div>
                
                <div className="flex gap-2 mt-3">
                  {[5, 10, 15, 20].map((minutes) => (
                    <Button
                      key={minutes}
                      variant="outline"
                      size="sm"
                      onClick={() => startTimer(minutes)}
                      className="flex-1"
                    >
                      {minutes}m
                    </Button>
                  ))}
                  {timeRemaining > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={toggleTimer}
                      className="px-3"
                    >
                      {isTimerRunning ? (
                        <PauseCircle className="w-4 h-4" />
                      ) : (
                        <PlayCircle className="w-4 h-4" />
                      )}
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Step Actions */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex-1"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={handleStepComplete}
                className="bg-green-500 hover:bg-green-600 text-white flex-1"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {currentStep === totalSteps - 1 ? 'Finish Cooking' : 'Step Complete'}
              </Button>

              <Button
                variant="outline"
                onClick={handleNext}
                disabled={currentStep === totalSteps - 1}
                className="flex-1"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Step Overview */}
          <div className="bg-card rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <ChefHat className="w-5 h-5" />
              All Steps
            </h3>
            <div className="space-y-2">
              {recipe.instructions.map((instruction, index) => (
                <div
                  key={instruction.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    index === currentStep 
                      ? 'bg-peach-100 border-2 border-peach-300' 
                      : completedSteps.includes(index)
                      ? 'bg-green-50 border border-green-200'
                      : 'hover:bg-accent/50 border border-transparent'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                    completedSteps.includes(index)
                      ? 'bg-green-500 text-white'
                      : index === currentStep
                      ? 'bg-peach-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {completedSteps.includes(index) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`text-sm ${
                    completedSteps.includes(index) ? 'line-through text-muted-foreground' : ''
                  }`}>
                    {instruction.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookingMode;