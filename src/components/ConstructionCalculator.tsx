import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ConstructionCalculator = () => {
  const [constructionCalc, setConstructionCalc] = useState({
    width: '',
    length: '',
    height: '',
    wallThickness: '0.4',
    materialCost: ''
  });

  const [materialCalc, setMaterialCalc] = useState({
    area: '',
    materialType: 'bricks',
    cementPrice: '350',
    brickPrice: '15',
    roofingPrice: '450'
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

  const calculateMaterials = () => {
    const area = parseFloat(materialCalc.area);
    if (!area) return null;

    let bricks = 0;
    let cement = 0;
    let roofing = 0;
    let totalCost = 0;

    if (materialCalc.materialType === 'bricks') {
      bricks = Math.ceil(area * 51);
      cement = Math.ceil(area * 0.25 * 50);
      roofing = Math.ceil(area * 1.1);
      totalCost = (bricks * parseFloat(materialCalc.brickPrice)) + 
                  (cement * parseFloat(materialCalc.cementPrice)) + 
                  (roofing * parseFloat(materialCalc.roofingPrice));
    } else if (materialCalc.materialType === 'blocks') {
      bricks = Math.ceil(area * 12.5);
      cement = Math.ceil(area * 0.2 * 50);
      roofing = Math.ceil(area * 1.1);
      totalCost = (bricks * parseFloat(materialCalc.brickPrice) * 4) + 
                  (cement * parseFloat(materialCalc.cementPrice)) + 
                  (roofing * parseFloat(materialCalc.roofingPrice));
    } else if (materialCalc.materialType === 'wood') {
      const timber = Math.ceil(area * 0.15);
      cement = Math.ceil(area * 0.1 * 50);
      roofing = Math.ceil(area * 1.1);
      totalCost = (timber * 12000) + 
                  (cement * parseFloat(materialCalc.cementPrice)) + 
                  (roofing * parseFloat(materialCalc.roofingPrice));
      bricks = timber;
    }

    return {
      mainMaterial: bricks,
      cement: cement,
      roofing: roofing,
      totalCost: totalCost.toFixed(0)
    };
  };

  const constructionResult = calculateConstruction();
  const materialResult = calculateMaterials();

  const getMaterialName = () => {
    if (materialCalc.materialType === 'bricks') return 'Кирпичи';
    if (materialCalc.materialType === 'blocks') return 'Блоки';
    return 'Брус (м³)';
  };

  return (
    <div className="space-y-6">
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

      <Card className="p-6 bg-gradient-to-br from-card/90 to-card/50 backdrop-blur-sm border-primary/20 max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          <Icon name="Package" size={28} className="text-orange-400" />
          <h2 className="text-3xl font-bold">Калькулятор материалов</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="area">Общая площадь стен (м²)</Label>
              <Input
                id="area"
                type="number"
                value={materialCalc.area}
                onChange={(e) => setMaterialCalc({ ...materialCalc, area: e.target.value })}
                className="bg-black/20"
                placeholder="100"
              />
            </div>
            <div>
              <Label htmlFor="material-type">Тип материала</Label>
              <Select value={materialCalc.materialType} onValueChange={(val) => setMaterialCalc({ ...materialCalc, materialType: val })}>
                <SelectTrigger className="bg-black/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bricks">Кирпич</SelectItem>
                  <SelectItem value="blocks">Газоблок</SelectItem>
                  <SelectItem value="wood">Дерево (брус)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="cement-price">Цена цемента (₽/мешок 50кг)</Label>
              <Input
                id="cement-price"
                type="number"
                value={materialCalc.cementPrice}
                onChange={(e) => setMaterialCalc({ ...materialCalc, cementPrice: e.target.value })}
                className="bg-black/20"
              />
            </div>
            <div>
              <Label htmlFor="brick-price">Цена за единицу (₽/{materialCalc.materialType === 'wood' ? 'м³' : 'шт'})</Label>
              <Input
                id="brick-price"
                type="number"
                value={materialCalc.brickPrice}
                onChange={(e) => setMaterialCalc({ ...materialCalc, brickPrice: e.target.value })}
                className="bg-black/20"
              />
            </div>
            <div>
              <Label htmlFor="roofing-price">Цена кровли (₽/м²)</Label>
              <Input
                id="roofing-price"
                type="number"
                value={materialCalc.roofingPrice}
                onChange={(e) => setMaterialCalc({ ...materialCalc, roofingPrice: e.target.value })}
                className="bg-black/20"
              />
            </div>
          </div>
        </div>

        {materialResult && (
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-gradient-to-br from-orange-500/20 to-orange-500/10 rounded-lg border border-orange-500/30">
                <p className="text-sm text-muted-foreground mb-1">{getMaterialName()}</p>
                <p className="text-2xl font-bold text-orange-400">{materialResult.mainMaterial} {materialCalc.materialType === 'wood' ? 'м³' : 'шт'}</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-blue-500/20 to-blue-500/10 rounded-lg border border-blue-500/30">
                <p className="text-sm text-muted-foreground mb-1">Цемент</p>
                <p className="text-2xl font-bold text-blue-400">{materialResult.cement} мешков</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-purple-500/20 to-purple-500/10 rounded-lg border border-purple-500/30">
                <p className="text-sm text-muted-foreground mb-1">Кровля</p>
                <p className="text-2xl font-bold text-purple-400">{materialResult.roofing} м²</p>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-500/20 to-green-500/10 rounded-lg border border-green-500/30">
                <p className="text-sm text-muted-foreground mb-1">Общая стоимость</p>
                <p className="text-2xl font-bold text-green-400">{materialResult.totalCost} ₽</p>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-lg border border-yellow-500/20">
              <p className="text-sm text-yellow-400 flex items-center gap-2">
                <Icon name="Info" size={16} />
                Расчет включает запас материалов 10% для кровли. Рекомендуем добавить 5-10% запаса для остальных материалов.
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
