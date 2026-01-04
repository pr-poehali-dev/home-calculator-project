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

  const loanResult = calculateLoan();

  return (
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
  );
};
