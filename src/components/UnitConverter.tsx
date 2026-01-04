import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const UnitConverter = () => {
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

  const conversionResult = convertUnits();

  return (
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
  );
};
