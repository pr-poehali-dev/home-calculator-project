import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';

export const ConstructionCalculator = () => {
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

  const constructionResult = calculateConstruction();

  return (
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
  );
};
