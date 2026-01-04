import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { BasicCalculator } from '@/components/BasicCalculator';
import { ConstructionCalculator } from '@/components/ConstructionCalculator';
import { FinanceCalculator, CalorieCalculator } from '@/components/FinanceCalorieCalculators';
import { UnitConverter } from '@/components/UnitConverter';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-purple-950/20 to-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-gradient bg-[length:200%_auto]">
            Калькулятор Pro
          </h1>
          <p className="text-xl text-muted-foreground">От простых вычислений до сложных расчетов</p>
        </div>

        <Tabs defaultValue="basic" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-8 bg-card/50 backdrop-blur-sm p-1">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Icon name="Calculator" size={18} />
              <span className="hidden sm:inline">Базовый</span>
            </TabsTrigger>
            <TabsTrigger value="construction" className="flex items-center gap-2">
              <Icon name="Home" size={18} />
              <span className="hidden sm:inline">Стройка</span>
            </TabsTrigger>
            <TabsTrigger value="finance" className="flex items-center gap-2">
              <Icon name="DollarSign" size={18} />
              <span className="hidden sm:inline">Финансы</span>
            </TabsTrigger>
            <TabsTrigger value="calories" className="flex items-center gap-2">
              <Icon name="Apple" size={18} />
              <span className="hidden sm:inline">Калории</span>
            </TabsTrigger>
            <TabsTrigger value="converter" className="flex items-center gap-2">
              <Icon name="ArrowLeftRight" size={18} />
              <span className="hidden sm:inline">Конвертер</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="animate-scale-in">
            <BasicCalculator />
          </TabsContent>

          <TabsContent value="construction" className="animate-scale-in">
            <ConstructionCalculator />
          </TabsContent>

          <TabsContent value="finance" className="animate-scale-in">
            <FinanceCalculator />
          </TabsContent>

          <TabsContent value="calories" className="animate-scale-in">
            <CalorieCalculator />
          </TabsContent>

          <TabsContent value="converter" className="animate-scale-in">
            <UnitConverter />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
