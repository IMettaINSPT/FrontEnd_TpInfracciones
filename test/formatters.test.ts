import { describe, it, expect } from 'vitest';
import { formatearMoneda } from '../src/utils/formatters';

describe('Helpers de formato (formatters)', () => {
  it('debe formatear montos positivos en pesos argentinos', () => {
    const resultado = formatearMoneda(15000);
    expect(resultado).toContain('15.000');
  });

  it('debe manejar el valor 0 correctamente', () => {
    const resultado = formatearMoneda(0);
    expect(resultado).toContain('0,00');
  });
});