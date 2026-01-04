import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const FinanceCalculator = () => {
  const [loanCalc, setLoanCalc] = useState({
    amount: '',
    rate: '',
    years: ''
  });

  const [currencyCalc, setCurrencyCalc] = useState({
    amount: '',
    from: 'USD',
    to: 'RUB'
  });

  const currencyRates: Record<string, number> = {
    USD: 1,
    EUR: 0.92,
    RUB: 92.5,
    GBP: 0.79,
    CNY: 7.24,
    JPY: 149.5,
    KZT: 450.0,
    BYN: 3.28
  };

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

  const convertCurrency = () => {
    const amount = parseFloat(currencyCalc.amount);
    if (!amount) return null;

    const amountInUSD = amount / currencyRates[currencyCalc.from];
    const result = amountInUSD * currencyRates[currencyCalc.to];
    return result.toFixed(2);
  };

  const loanResult = calculateLoan();
  const currencyResult = convertCurrency();

  return (
    <div className="space-y-6">
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

      <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Banknote" size={28} className="text-green-400" />
          <h2 className="text-3xl font-bold">Конвертер валют</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <Label htmlFor="currency-amount">Сумма</Label>
            <Input
              id="currency-amount"
              type="number"
              value={currencyCalc.amount}
              onChange={(e) => setCurrencyCalc({ ...currencyCalc, amount: e.target.value })}
              className="bg-black/20"
              placeholder="1000"
            />
          </div>
          <div>
            <Label htmlFor="currency-from">Из валюты</Label>
            <Select value={currencyCalc.from} onValueChange={(val) => setCurrencyCalc({ ...currencyCalc, from: val })}>
              <SelectTrigger className="bg-black/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="RUB">RUB (₽)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="CNY">CNY (¥)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
                <SelectItem value="KZT">KZT (₸)</SelectItem>
                <SelectItem value="BYN">BYN (Br)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="currency-to">В валюту</Label>
            <Select value={currencyCalc.to} onValueChange={(val) => setCurrencyCalc({ ...currencyCalc, to: val })}>
              <SelectTrigger className="bg-black/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="RUB">RUB (₽)</SelectItem>
                <SelectItem value="GBP">GBP (£)</SelectItem>
                <SelectItem value="CNY">CNY (¥)</SelectItem>
                <SelectItem value="JPY">JPY (¥)</SelectItem>
                <SelectItem value="KZT">KZT (₸)</SelectItem>
                <SelectItem value="BYN">BYN (Br)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {currencyResult && (
          <div className="p-8 bg-gradient-to-br from-green-500/20 to-emerald-500/10 rounded-lg border border-green-500/30 text-center">
            <p className="text-sm text-muted-foreground mb-2">Результат конвертации</p>
            <p className="text-5xl font-bold text-green-400">
              {currencyResult} {currencyCalc.to}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Курс: 1 {currencyCalc.from} = {(currencyRates[currencyCalc.to] / currencyRates[currencyCalc.from]).toFixed(4)} {currencyCalc.to}
            </p>
          </div>
        )}
      </Card>
    </div>
  );
};

export const CalorieCalculator = () => {
  const [calorieCalc, setCalorieCalc] = useState({
    weight: '',
    height: '',
    age: '',
    gender: 'male',
    activity: '1.2'
  });

  const dishes = [
    {
      name: 'Стейк из говядины',
      image: 'https://cdn.poehali.dev/projects/ac9010b1-e1ed-47d1-8cd9-0fa41a178636/files/37774781-15fa-4be4-8948-85f81536a974.jpg',
      calories: 250,
      protein: 26,
      fats: 15,
      carbs: 0,
      portion: '100г'
    },
    {
      name: 'Греческий салат',
      image: 'https://cdn.poehali.dev/projects/ac9010b1-e1ed-47d1-8cd9-0fa41a178636/files/5a194e5e-71e0-437a-bdb7-c361e7631d0c.jpg',
      calories: 180,
      protein: 6,
      fats: 14,
      carbs: 8,
      portion: '200г'
    },
    {
      name: 'Паста Карбонара',
      image: 'https://cdn.poehali.dev/projects/ac9010b1-e1ed-47d1-8cd9-0fa41a178636/files/47193976-39c0-4620-a4f7-6288dc420660.jpg',
      calories: 420,
      protein: 18,
      fats: 22,
      carbs: 38,
      portion: '300г'
    },
    {
      name: 'Лосось на гриле',
      image: 'https://cdn.poehali.dev/projects/ac9010b1-e1ed-47d1-8cd9-0fa41a178636/files/80241422-ae37-4b11-b77f-57c4194f56bb.jpg',
      calories: 206,
      protein: 22,
      fats: 13,
      carbs: 0,
      portion: '100г'
    },
    {
      name: 'Салат Цезарь с курицей',
      image: 'https://cdn.poehali.dev/projects/ac9010b1-e1ed-47d1-8cd9-0fa41a178636/files/9b44f98c-12a4-45b6-9046-2246dde6a7cd.jpg',
      calories: 320,
      protein: 28,
      fats: 18,
      carbs: 15,
      portion: '250г'
    },
    {
      name: 'Картофель фри',
      image: 'https://cdn.poehali.dev/projects/ac9010b1-e1ed-47d1-8cd9-0fa41a178636/files/c4d79ef6-3922-4c11-8e8e-54b33e469a0a.jpg',
      calories: 312,
      protein: 4,
      fats: 15,
      carbs: 41,
      portion: '100г'
    }
  ];

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

  const calorieResult = calculateCalories();

  return (
    <div className="space-y-6">
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

      <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-primary/20 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="UtensilsCrossed" size={28} className="text-orange-400" />
          <h2 className="text-3xl font-bold">Популярные блюда</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish, index) => (
            <div key={index} className="bg-gradient-to-br from-black/30 to-black/10 rounded-lg overflow-hidden border border-primary/20 hover:border-primary/40 transition-all hover:scale-105">
              <div className="h-48 overflow-hidden">
                <img src={dish.image} alt={dish.name} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{dish.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">Порция: {dish.portion}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded border border-orange-500/30">
                    <p className="text-xs text-muted-foreground">Калории</p>
                    <p className="text-lg font-bold text-orange-400">{dish.calories}</p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded border border-red-500/30">
                    <p className="text-xs text-muted-foreground">Белки</p>
                    <p className="text-lg font-bold text-red-400">{dish.protein}г</p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-yellow-500/20 to-yellow-500/10 rounded border border-yellow-500/30">
                    <p className="text-xs text-muted-foreground">Жиры</p>
                    <p className="text-lg font-bold text-yellow-400">{dish.fats}г</p>
                  </div>
                  <div className="p-2 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded border border-blue-500/30">
                    <p className="text-xs text-muted-foreground">Углеводы</p>
                    <p className="text-lg font-bold text-blue-400">{dish.carbs}г</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};