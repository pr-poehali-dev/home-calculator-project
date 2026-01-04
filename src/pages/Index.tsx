import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Index = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);

  const handleNumber = (num: string) => {
    setDisplay(prev => prev === '0' ? num : prev + num);
  };

  const handleOperation = (op: string) => {
    setPreviousValue(parseFloat(display));
    setOperation(op);
    setDisplay('0');
  };

  const calculate = () => {
    if (previousValue !== null && operation) {
      const current = parseFloat(display);
      let result = 0;

      switch (operation) {
        case '+':
          result = previousValue + current;
          break;
        case '-':
          result = previousValue - current;
          break;
        case '×':
          result = previousValue * current;
          break;
        case '÷':
          result = previousValue / current;
          break;
      }

      const calculation = `${previousValue} ${operation} ${current} = ${result}`;
      setHistory(prev => [calculation, ...prev.slice(0, 9)]);
      setDisplay(result.toString());
      setPreviousValue(null);
      setOperation(null);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
  };

  const [constructionCalc, setConstructionCalc] = useState({
    width: '',
    length: '',
    height: '',
    wallThickness: '0.4',
    materialCost: ''
  });

  const calculateConstruction = () => {
    const w = parseFloat(constructionCalc.width);
    const l = parseFloat(constructionCalc.length);
    const h = parseFloat(constructionCalc.height);
    const t = parseFloat(constructionCalc.wallThickness);
    const cost = parseFloat(constructionCalc.materialCost);

    if (w && l && h) {
      const floorArea = w * l;
      const wallArea = 2 * h * (w + l);
      const volume = wallArea * t;
      const totalCost = volume * cost || 0;

      return {
        floorArea: floorArea.toFixed(2),
        wallArea: wallArea.toFixed(2),
        volume: volume.toFixed(2),
        totalCost: totalCost.toFixed(2)
      };
    }
    return null;
  };

  const [loanCalc, setLoanCalc] = useState({
    amount: '',
    rate: '',
    years: ''
  });

  const calculateLoan = () => {
    const p = parseFloat(loanCalc.amount);
    const r = parseFloat(loanCalc.rate) / 100 / 12;
    const n = parseFloat(loanCalc.years) * 12;

    if (p && r && n) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const total = monthly * n;
      const interest = total - p;

      return {
        monthly: monthly.toFixed(2),
        total: total.toFixed(2),
        interest: interest.toFixed(2)
      };
    }
    return null;
  };

  const [calorieCalc, setCalorieCalc] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activity: '1.2'
  });

  const calculateCalories = () => {
    const w = parseFloat(calorieCalc.weight);
    const h = parseFloat(calorieCalc.height);
    const a = parseFloat(calorieCalc.age);
    const activityLevel = parseFloat(calorieCalc.activity);

    if (w && h && a) {
      let bmr = 0;
      if (calorieCalc.gender === 'male') {
        bmr = 88.362 + (13.397 * w) + (4.799 * h) - (5.677 * a);
      } else {
        bmr = 447.593 + (9.247 * w) + (3.098 * h) - (4.330 * a);
      }

      const tdee = bmr * activityLevel;
      const loseWeight = tdee - 500;
      const gainWeight = tdee + 500;

      return {
        maintenance: tdee.toFixed(0),
        loseWeight: loseWeight.toFixed(0),
        gainWeight: gainWeight.toFixed(0),
        protein: (w * 2).toFixed(0),
        fats: (w * 1).toFixed(0)
      };
    }
    return null;
  };

  const [converter, setConverter] = useState({
    value: '',
    from: 'meters',
    to: 'feet',
    category: 'length'
  });

  const conversionRates: Record<string, Record<string, number>> = {
    length: {
      meters: 1,
      feet: 3.28084,
      inches: 39.3701,
      kilometers: 0.001,
      miles: 0.000621371
    },
    weight: {
      kilograms: 1,
      pounds: 2.20462,
      ounces: 35.274,
      grams: 1000
    },
    temperature: {
      celsius: 1,
      fahrenheit: 0,
      kelvin: 0
    }
  };

  const convertUnits = () => {
    const val = parseFloat(converter.value);
    if (!val) return null;

    const rates = conversionRates[converter.category];
    if (converter.category === 'temperature') {
      if (converter.from === 'celsius' && converter.to === 'fahrenheit') {
        return ((val * 9/5) + 32).toFixed(2);
      } else if (converter.from === 'fahrenheit' && converter.to === 'celsius') {
        return ((val - 32) * 5/9).toFixed(2);
      } else if (converter.from === 'celsius' && converter.to === 'kelvin') {
        return (val + 273.15).toFixed(2);
      } else if (converter.from === 'kelvin' && converter.to === 'celsius') {
        return (val - 273.15).toFixed(2);
      }
    } else {
      const inBase = val / rates[converter.from];
      return (inBase * rates[converter.to]).toFixed(4);
    }
    return null;
  };

  const constructionResult = calculateConstruction();
  const loanResult = calculateLoan();
  const calorieResult = calculateCalories();
  const conversionResult = convertUnits();

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
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-primary/20">
                <div className="mb-6">
                  <div className="text-right text-5xl font-bold mb-2 p-4 bg-black/20 rounded-lg min-h-[80px] flex items-center justify-end">
                    {display}
                  </div>
                  {operation && previousValue !== null && (
                    <div className="text-right text-sm text-muted-foreground">
                      {previousValue} {operation}
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {['7', '8', '9', '÷'].map(btn => (
                    <Button
                      key={btn}
                      onClick={() => ['÷', '×', '-', '+'].includes(btn) ? handleOperation(btn) : handleNumber(btn)}
                      className={`h-16 text-xl font-semibold ${
                        ['÷', '×', '-', '+'].includes(btn)
                          ? 'bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70'
                          : 'bg-gradient-to-br from-primary/30 to-primary/10 hover:from-primary/40 hover:to-primary/20'
                      }`}
                    >
                      {btn}
                    </Button>
                  ))}
                  {['4', '5', '6', '×'].map(btn => (
                    <Button
                      key={btn}
                      onClick={() => ['÷', '×', '-', '+'].includes(btn) ? handleOperation(btn) : handleNumber(btn)}
                      className={`h-16 text-xl font-semibold ${
                        ['÷', '×', '-', '+'].includes(btn)
                          ? 'bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70'
                          : 'bg-gradient-to-br from-primary/30 to-primary/10 hover:from-primary/40 hover:to-primary/20'
                      }`}
                    >
                      {btn}
                    </Button>
                  ))}
                  {['1', '2', '3', '-'].map(btn => (
                    <Button
                      key={btn}
                      onClick={() => ['÷', '×', '-', '+'].includes(btn) ? handleOperation(btn) : handleNumber(btn)}
                      className={`h-16 text-xl font-semibold ${
                        ['÷', '×', '-', '+'].includes(btn)
                          ? 'bg-gradient-to-br from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70'
                          : 'bg-gradient-to-br from-primary/30 to-primary/10 hover:from-primary/40 hover:to-primary/20'
                      }`}
                    >
                      {btn}
                    </Button>
                  ))}
                  <Button onClick={clear} className="h-16 text-xl font-semibold bg-gradient-to-br from-destructive to-destructive/80">
                    C
                  </Button>
                  <Button onClick={() => handleNumber('0')} className="h-16 text-xl font-semibold bg-gradient-to-br from-primary/30 to-primary/10">
                    0
                  </Button>
                  <Button onClick={() => handleNumber('.')} className="h-16 text-xl font-semibold bg-gradient-to-br from-primary/30 to-primary/10">
                    .
                  </Button>
                  <Button onClick={calculate} className="h-16 text-xl font-semibold bg-gradient-to-br from-secondary to-secondary/80">
                    =
                  </Button>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-primary/20">
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="History" size={24} className="text-primary" />
                  <h3 className="text-2xl font-bold">История</h3>
                </div>
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {history.length === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Нет вычислений</p>
                  ) : (
                    history.map((calc, i) => (
                      <div key={i} className="p-3 bg-black/20 rounded-lg text-sm hover:bg-black/30 transition-colors">
                        {calc}
                      </div>
                    ))
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="construction" className="animate-scale-in">
            <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Home" size={28} className="text-accent" />
                <h2 className="text-3xl font-bold">Калькулятор строительства</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="width">Ширина здания (м)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={constructionCalc.width}
                      onChange={(e) => setConstructionCalc({ ...constructionCalc, width: e.target.value })}
                      className="bg-black/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="length">Длина здания (м)</Label>
                    <Input
                      id="length"
                      type="number"
                      value={constructionCalc.length}
                      onChange={(e) => setConstructionCalc({ ...constructionCalc, length: e.target.value })}
                      className="bg-black/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height">Высота стен (м)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={constructionCalc.height}
                      onChange={(e) => setConstructionCalc({ ...constructionCalc, height: e.target.value })}
                      className="bg-black/20"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="thickness">Толщина стен (м)</Label>
                    <Input
                      id="thickness"
                      type="number"
                      step="0.1"
                      value={constructionCalc.wallThickness}
                      onChange={(e) => setConstructionCalc({ ...constructionCalc, wallThickness: e.target.value })}
                      className="bg-black/20"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cost">Стоимость материала (₽/м³)</Label>
                    <Input
                      id="cost"
                      type="number"
                      value={constructionCalc.materialCost}
                      onChange={(e) => setConstructionCalc({ ...constructionCalc, materialCost: e.target.value })}
                      className="bg-black/20"
                      placeholder="Необязательно"
                    />
                  </div>
                </div>
              </div>

              {constructionResult && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg border border-primary/30">
                    <p className="text-sm text-muted-foreground mb-1">Площадь пола</p>
                    <p className="text-2xl font-bold text-primary">{constructionResult.floorArea} м²</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg border border-accent/30">
                    <p className="text-sm text-muted-foreground mb-1">Площадь стен</p>
                    <p className="text-2xl font-bold text-accent">{constructionResult.wallArea} м²</p>
                  </div>
                  <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg border border-secondary/30">
                    <p className="text-sm text-muted-foreground mb-1">Объем материала</p>
                    <p className="text-2xl font-bold text-secondary">{constructionResult.volume} м³</p>
                  </div>
                  {parseFloat(constructionCalc.materialCost) > 0 && (
                    <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg border border-green-500/30">
                      <p className="text-sm text-muted-foreground mb-1">Стоимость</p>
                      <p className="text-2xl font-bold text-green-400">{constructionResult.totalCost} ₽</p>
                    </div>
                  )}
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="finance" className="animate-scale-in">
            <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="DollarSign" size={28} className="text-secondary" />
                <h2 className="text-3xl font-bold">Кредитный калькулятор</h2>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-6">
                <div>
                  <Label htmlFor="amount">Сумма кредита (₽)</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={loanCalc.amount}
                    onChange={(e) => setLoanCalc({ ...loanCalc, amount: e.target.value })}
                    className="bg-black/20"
                    placeholder="1000000"
                  />
                </div>
                <div>
                  <Label htmlFor="rate">Процентная ставка (%)</Label>
                  <Input
                    id="rate"
                    type="number"
                    step="0.1"
                    value={loanCalc.rate}
                    onChange={(e) => setLoanCalc({ ...loanCalc, rate: e.target.value })}
                    className="bg-black/20"
                    placeholder="12.5"
                  />
                </div>
                <div>
                  <Label htmlFor="years">Срок кредита (лет)</Label>
                  <Input
                    id="years"
                    type="number"
                    value={loanCalc.years}
                    onChange={(e) => setLoanCalc({ ...loanCalc, years: e.target.value })}
                    className="bg-black/20"
                    placeholder="10"
                  />
                </div>
              </div>

              {loanResult && (
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="p-6 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg border border-primary/30">
                    <p className="text-sm text-muted-foreground mb-2">Ежемесячный платеж</p>
                    <p className="text-3xl font-bold text-primary">{loanResult.monthly} ₽</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg border border-accent/30">
                    <p className="text-sm text-muted-foreground mb-2">Общая сумма</p>
                    <p className="text-3xl font-bold text-accent">{loanResult.total} ₽</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg border border-secondary/30">
                    <p className="text-sm text-muted-foreground mb-2">Переплата</p>
                    <p className="text-3xl font-bold text-secondary">{loanResult.interest} ₽</p>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="calories" className="animate-scale-in">
            <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Apple" size={28} className="text-green-400" />
                <h2 className="text-3xl font-bold">Калькулятор калорий</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="weight">Вес (кг)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={calorieCalc.weight}
                      onChange={(e) => setCalorieCalc({ ...calorieCalc, weight: e.target.value })}
                      className="bg-black/20"
                      placeholder="70"
                    />
                  </div>
                  <div>
                    <Label htmlFor="height-cal">Рост (см)</Label>
                    <Input
                      id="height-cal"
                      type="number"
                      value={calorieCalc.height}
                      onChange={(e) => setCalorieCalc({ ...calorieCalc, height: e.target.value })}
                      className="bg-black/20"
                      placeholder="170"
                    />
                  </div>
                  <div>
                    <Label htmlFor="age">Возраст (лет)</Label>
                    <Input
                      id="age"
                      type="number"
                      value={calorieCalc.age}
                      onChange={(e) => setCalorieCalc({ ...calorieCalc, age: e.target.value })}
                      className="bg-black/20"
                      placeholder="30"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="gender">Пол</Label>
                    <Select value={calorieCalc.gender} onValueChange={(val) => setCalorieCalc({ ...calorieCalc, gender: val })}>
                      <SelectTrigger className="bg-black/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Мужской</SelectItem>
                        <SelectItem value="female">Женский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="activity">Уровень активности</Label>
                    <Select value={calorieCalc.activity} onValueChange={(val) => setCalorieCalc({ ...calorieCalc, activity: val })}>
                      <SelectTrigger className="bg-black/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1.2">Минимальная (сидячий образ)</SelectItem>
                        <SelectItem value="1.375">Низкая (1-3 раза/нед)</SelectItem>
                        <SelectItem value="1.55">Средняя (3-5 раз/нед)</SelectItem>
                        <SelectItem value="1.725">Высокая (6-7 раз/нед)</SelectItem>
                        <SelectItem value="1.9">Очень высокая (2 раза/день)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {calorieResult && (
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg border border-primary/30">
                      <p className="text-sm text-muted-foreground mb-1">Поддержание веса</p>
                      <p className="text-2xl font-bold text-primary">{calorieResult.maintenance} ккал</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg border border-blue-500/30">
                      <p className="text-sm text-muted-foreground mb-1">Похудение</p>
                      <p className="text-2xl font-bold text-blue-400">{calorieResult.loseWeight} ккал</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg border border-green-500/30">
                      <p className="text-sm text-muted-foreground mb-1">Набор массы</p>
                      <p className="text-2xl font-bold text-green-400">{calorieResult.gainWeight} ккал</p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/10 rounded-lg border border-accent/30">
                      <p className="text-sm text-muted-foreground mb-1">Белки (дневная норма)</p>
                      <p className="text-2xl font-bold text-accent">{calorieResult.protein} г</p>
                    </div>
                    <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-lg border border-secondary/30">
                      <p className="text-sm text-muted-foreground mb-1">Жиры (дневная норма)</p>
                      <p className="text-2xl font-bold text-secondary">{calorieResult.fats} г</p>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          <TabsContent value="converter" className="animate-scale-in">
            <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="ArrowLeftRight" size={28} className="text-blue-400" />
                <h2 className="text-3xl font-bold">Конвертер единиц</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="category">Категория</Label>
                  <Select value={converter.category} onValueChange={(val) => setConverter({ ...converter, category: val, from: val === 'length' ? 'meters' : val === 'weight' ? 'kilograms' : 'celsius', to: val === 'length' ? 'feet' : val === 'weight' ? 'pounds' : 'fahrenheit' })}>
                    <SelectTrigger className="bg-black/20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="length">Длина</SelectItem>
                      <SelectItem value="weight">Вес</SelectItem>
                      <SelectItem value="temperature">Температура</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-3 gap-4 items-end">
                  <div>
                    <Label htmlFor="value">Значение</Label>
                    <Input
                      id="value"
                      type="number"
                      value={converter.value}
                      onChange={(e) => setConverter({ ...converter, value: e.target.value })}
                      className="bg-black/20"
                      placeholder="100"
                    />
                  </div>

                  <div>
                    <Label htmlFor="from">Из</Label>
                    <Select value={converter.from} onValueChange={(val) => setConverter({ ...converter, from: val })}>
                      <SelectTrigger className="bg-black/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {converter.category === 'length' && (
                          <>
                            <SelectItem value="meters">Метры</SelectItem>
                            <SelectItem value="feet">Футы</SelectItem>
                            <SelectItem value="inches">Дюймы</SelectItem>
                            <SelectItem value="kilometers">Километры</SelectItem>
                            <SelectItem value="miles">Мили</SelectItem>
                          </>
                        )}
                        {converter.category === 'weight' && (
                          <>
                            <SelectItem value="kilograms">Килограммы</SelectItem>
                            <SelectItem value="pounds">Фунты</SelectItem>
                            <SelectItem value="ounces">Унции</SelectItem>
                            <SelectItem value="grams">Граммы</SelectItem>
                          </>
                        )}
                        {converter.category === 'temperature' && (
                          <>
                            <SelectItem value="celsius">Цельсий</SelectItem>
                            <SelectItem value="fahrenheit">Фаренгейт</SelectItem>
                            <SelectItem value="kelvin">Кельвин</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="to">В</Label>
                    <Select value={converter.to} onValueChange={(val) => setConverter({ ...converter, to: val })}>
                      <SelectTrigger className="bg-black/20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {converter.category === 'length' && (
                          <>
                            <SelectItem value="meters">Метры</SelectItem>
                            <SelectItem value="feet">Футы</SelectItem>
                            <SelectItem value="inches">Дюймы</SelectItem>
                            <SelectItem value="kilometers">Километры</SelectItem>
                            <SelectItem value="miles">Мили</SelectItem>
                          </>
                        )}
                        {converter.category === 'weight' && (
                          <>
                            <SelectItem value="kilograms">Килограммы</SelectItem>
                            <SelectItem value="pounds">Фунты</SelectItem>
                            <SelectItem value="ounces">Унции</SelectItem>
                            <SelectItem value="grams">Граммы</SelectItem>
                          </>
                        )}
                        {converter.category === 'temperature' && (
                          <>
                            <SelectItem value="celsius">Цельсий</SelectItem>
                            <SelectItem value="fahrenheit">Фаренгейт</SelectItem>
                            <SelectItem value="kelvin">Кельвин</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {conversionResult && (
                  <div className="p-8 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-primary/30 text-center">
                    <p className="text-sm text-muted-foreground mb-2">Результат</p>
                    <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                      {conversionResult}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
