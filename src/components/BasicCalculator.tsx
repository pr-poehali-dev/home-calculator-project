import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export const BasicCalculator = () => {
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

  return (
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
  );
};
