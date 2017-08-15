function colorConverter() {

}

colorConverter.prototype = {
  cleanAnyColor(input) {
    const type = this.identifyString(input);
    switch (type) {
      case 'rgba':return this.cleanRgba(input);
      case 'rgb': return this.cleanRgb(input);
      case 'hsla':return this.cleanHsla(input);
      case 'hsl': return this.cleanHsl(input);
      case 'hex': return this.cleanHex(input);
      case 'hexa':return this.cleanHexa(input);
      default:throw new TypeError('Input did not match any supported color types.');
    }
  },
  cleanHex(input, { leadingHash = false } = {}) {
    const hex = input.replace('#', '').toUpperCase();
    const allowed = '0123456789ABCDEF';
    for (let i = 0; i < hex.length; i += 1) {
      if (allowed.indexOf(hex[i]) < 0) throw new TypeError(`Expecting hexadecimal digits to be 0-9 or A-F, "${hex[i]}" is not valid.`);
    }
    if (hex.length === 3) {
      let fullHex = '';
      for (let i = 0; i < 3; i += 1) {
        fullHex += (hex[i].toString() + hex[i].toString());
      }
      if (leadingHash) return `#${fullHex}`;
      return fullHex;
    }
    if (!(hex.length === 6)) throw new TypeError('Expecting a 6 digit hexadecimal string.');
    if (leadingHash) return `#${hex}`;
    return hex;
  },
  cleanHexa(input, { leadingHash = false } = {}) {
    const hex = input.replace('#', '').toUpperCase();
    const allowed = '0123456789ABCDEF';
    for (let i = 0; i < hex.length; i += 1) {
      if (allowed.indexOf(hex[i]) < 0) throw new TypeError(`Expecting hexadecimal digits to be 0-9 or A-F, "${hex[i]}" is not valid.`);
    }
    if (hex.length === 4) {
      let fullHex = '';
      for (let i = 0; i < 4; i += 1) {
        fullHex += (hex[i].toString() + hex[i].toString());
      }
      if (leadingHash) return `#${fullHex}`;
      return fullHex;
    }
    if (!(hex.length === 8)) throw new TypeError('Expecting an 8 digit hexadecimal string.');
    if (leadingHash) return `#${hex}`;
    return hex;
  },
  cleanRgb(rawInput, { returnArray = false } = {}) {
    let input = Array.isArray(rawInput) ? rawInput.toString() : rawInput;
    input = input
              .replace(/\s/g, '')
              .replace(/r|g|b|a|\(|\)/g, '')
              .split(',');
    if (input.length === 3) {
      const rgb = input.map((v) => {
        if (v <= 255 && v >= 0) {
          return parseInt(v, 10);
        }
        throw new TypeError('rgb() values must be between 0 and 255.');
      });
      if (returnArray) return rgb;
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
    throw new TypeError('Expecting input to have 3 comma-separated values.');
  },
  cleanRgba(rawInput, { returnArray = false } = {}) {
    let input = Array.isArray(rawInput) ? rawInput.toString() : rawInput;
    input = input
              .replace(/\s/g, '')
              .replace(/rgba|rgb|\(|\)/g, '')
              .split(',');
    if (input.length === 4) {
      const rgba = input.map((v, i) => {
        if (i <= 2 && v <= 255 && v >= 0) {
          return parseInt(v, 10);
        } else if (i === 3 && v <= 1 && v >= 0) {
          return parseFloat(v);
        } else if (i === 3 && v.includes('%')) {
          return parseFloat(v) / 100;
        }
        throw new TypeError('one or more rgba() values are invalid.');
      });
      if (returnArray) return rgba;
      return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    }
    throw new TypeError('Expecting input to have 4 comma-separated values.');
  },
  cleanHsl(rawInput, { returnArray = false } = {}) {
    let input = Array.isArray(rawInput) ? rawInput.toString() : rawInput;
    input = input
              .replace(/\s/g, '')
              .replace(/hsla|hsl|%|\(|\)/g, '')
              .split(',');
    if (input.length === 3) {
      if (input[0] < 0 || input[0] > 359) throw new TypeError('Expecting hue to be between 0-359');
      if (input[1] < 0 || input[1] > 100) throw new TypeError('Expecting saturation to be between 0-100');
      if (input[2] < 0 || input[2] > 100) throw new TypeError('Expecting luminocity to be between 0-100');
      const hsl = input.map(v => parseFloat(v, 10));
      if (returnArray) return hsl;
      return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
    }
    throw new TypeError('Expecting hsl() to have three comma separated values.');
  },
  cleanHsla(rawInput, { returnArray = false } = {}) {
    let input = Array.isArray(rawInput) ? rawInput.toString() : rawInput;
    input = input
              .replace(/\s/g, '')
              .replace(/hsla|hsl|%|\(|\)/g, '')
              .split(',');
    if (input.length === 4) {
      if (input[0] < 0 || input[0] > 359) throw new TypeError('Expecting hue to be between 0-359');
      if (input[1] < 0 || input[1] > 100) throw new TypeError('Expecting saturation to be between 0-100');
      if (input[2] < 0 || input[2] > 100) throw new TypeError('Expecting luminocity to be between 0-100');
      if (input[3] < 0 || input[3] > 1) throw new TypeError('Expecting alpha channel to be between 0-1');
      const hsla = input.map(v => parseFloat(v));
      if (returnArray) return hsla;
      return `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${hsla[3]})`;
    }
    throw new TypeError('Expecting hsla() to have four comma separated values.');
  },
  convert(rawInput, { returnArrays = false } = {}) {
    const type = this.identifyString(rawInput);
    const input = this.cleanAnyColor(rawInput, true);
    let allColors = {};
    switch (type) {
      case 'rgba': {
        const rgb = this.rgbaToRgb(input, { returnArray: returnArrays });
        allColors = {
          rgba: this.cleanRgba(input, { returnArray: returnArrays }),
          rgb: this.rgbaToRgb(input, { returnArray: returnArrays }),
          hsla: this.rgbaToHsla(input, { returnArray: returnArrays }),
          hsl: this.rgbToHsl(rgb, { returnArray: returnArrays }),
          hexa: this.rgbaToHexa(input, { returnArray: returnArrays }),
          hex: this.rgbToHex(rgb),
        };
        break;
      }
      case 'hsla': {
        const rgba = this.hslaToRgba(input, { returnArray: returnArrays });
        const rgb = this.rgbaToRgb(rgba, { returnArray: returnArrays });
        allColors = {
          rgba,
          rgb,
          hsla: this.cleanHsla(input, { returnArray: returnArrays }),
          hsl: this.rgbToHsl(rgb, { returnArray: returnArrays }),
          hexa: this.rgbaToHexa(rgba),
          hex: this.rgbToHex(rgb),
        };
        break;
      }
      case 'hexa': {
        const rgba = this.hexaToRgba(input, { returnArray: returnArrays });
        const rgb = this.rgbaToRgb(rgba, { returnArray: returnArrays });
        allColors = {
          rgba,
          rgb,
          hsla: this.rgbaToHsla(rgba, { returnArray: returnArrays }),
          hsl: this.rgbToHsl(rgb, { returnArray: returnArrays }),
          hexa: this.cleanHexa(input, { returnArray: returnArrays, leadingHash: true }),
          hex: this.rgbToHex(rgb),
        };
        break;
      }
      case 'hex': {
        const rgb = this.hexToRgb(input, { returnArray: returnArrays });
        const rgba = this.rgbToRgba(rgb, { returnArray: returnArrays });
        allColors = {
          rgba,
          rgb,
          hsla: this.rgbaToHsla(rgba, { returnArray: returnArrays }),
          hsl: this.rgbToHsl(rgb, { returnArray: returnArrays, returnFormat: 'hsl' }),
          hexa: this.rgbaToHexa(rgba),
          hex: this.cleanHex(input, { returnArray: returnArrays, leadingHash: true }),
        };
        break;
      }
      case 'rgb': {
        const rgba = this.rgbToRgba(input, { returnArray: returnArrays });
        allColors = {
          rgba,
          rgb: this.cleanRgb(input, { returnArray: returnArrays }),
          hsla: this.rgbaToHsla(rgba, { returnArray: returnArrays }),
          hsl: this.rgbToHsl(input, { returnArray: returnArrays }),
          hexa: this.rgbaToHexa(rgba),
          hex: this.rgbToHex(input, { returnArray: returnArrays, leadingHash: true }),
        };
        break;
      }
      case 'hsl': {
        const rgb = this.hslToRgb(input, { returnArray: returnArrays });
        const rgba = this.rgbToRgba(rgb, { returnArray: returnArrays });
        const hsl = this.cleanHsl(input, { returnArray: returnArrays });
        allColors = {
          rgba,
          rgb,
          hsla: this.hslToHsla(hsl, { returnArray: returnArrays }),
          hsl,
          hexa: this.rgbaToHexa(rgba),
          hex: this.rgbToHex(rgb, { returnArray: returnArrays, leadingHash: true }),
        };
        break;
      }
      default:
        allColors = undefined;
    }
    return allColors;
  },
  getReadableTextColor(background) {
    const l = this.cleanHsl(background, { returnArray: true })[2];
    if (l < 50) {
      return 'hsl(0, 0%, 90%)';
    }
    return 'hsl(0, 0%, 0%)';
  },
  rgbToRgba(rawInput, { returnArray = false } = {}) {
    const input = this.cleanRgb(rawInput, { returnArray: true });
    if (returnArray) return [input[0], input[1], input[2], 1];
    return `rgba(${input[0]}, ${input[1]}, ${input[2]}, 1)`;
  },
  rgbToHex(rawInput) {
    const input = this.cleanRgb(rawInput, { returnArray: true });
    if (input.length === 3) {
      const hexNums = ((input[0] << 16) | (input[1] << 8) | input[2] | (1 << 24)).toString(16).slice(1);
      return `#${hexNums}`.toUpperCase();
    }
    throw new TypeError('Expecting input to have 3 comma separated values.');
  },
  rgbToHsl(rawInput, { returnArray = false } = {}) {
    const input = this.cleanRgb(rawInput, { returnArray: true });
    let [r, g, b] = input;
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h;
    let s;
    let l = (max + min) / 2.0;
    if (max === min) {
      h = 0;
      s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2.0 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d) + (g < b ? 6.0 : 0); break;
        case g: h = ((b - r) / d) + 2.0; break;
        case b: h = ((r - g) / d) + 4.0; break;
        default: throw new Error('No maximum value found in [r,g,b]');
      }
    }
    h = Math.round(h * 60);
    // eslint-disable-next-line
    s = Number(Math.round((s * 100) + 'e1') + 'e-1');
    // eslint-disable-next-line
    l = Number(Math.round((l * 100) + 'e1') + 'e-1');
    if (returnArray) return [h, s, l];
    return `hsl(${h}, ${s}%, ${l}%)`;
  },
  rgbaToHexa(rawInput) {
    let input = this.cleanRgba(rawInput, { returnArray: true });
    let alpha = '';
    if ((input.length === 4 || input.length === 8)) {
      alpha = input[3];
      alpha = Math.round(alpha *= 255);
      alpha = (alpha | (1 << 8)).toString(16).slice(1);
    } else if (input.length === 3 || input.length === 6) {
      input = this.rgbaToRgb(input, { returnArray: true });
      alpha = '';
    }
    const hexNums = ((input[0] << 16) | (input[1] << 8) | input[2] | (1 << 24)).toString(16).slice(1) + alpha;
    return `#${hexNums}`.toUpperCase();
  },
  rgbaToHsla(rawInput, { returnArray = false, returnFormat = 'hsla' } = {}) {
    let h;
    let s;
    let l;
    const input = this.cleanRgba(rawInput, { returnArray: true });
    const r = input[0] / 255;
    const g = input[1] / 255;
    const b = input[2] / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    l = (max + min) / 2;
    if (max === min) {
      h = 0;
      s = 0;
    } else {
      s = l < 0.5 ? ((max - min) / (max + min)) : ((max - min) / (2.0 - max - min));
      switch (max) {
        case r:
          h = ((g - b) / (max - min));
          break;
        case g:
          h = (2.0 + ((b - r) / (max - min)));
          break;
        case b:
          h = (4.0 + ((r - g) / (max - min)));
          break;
        default: throw new Error('No maximum found in [r,g,b]');
      }
    }
    h *= 60;
    if (h < 0) h += 360;
    s *= 100;
    l *= 100;
    const a = parseFloat(input[3], 10);
    const hsla = [h, s, l, a].map((v, i) => {
      if (i === 3) return Math.round(v * 100) / 100;
      return Math.round(v * 10) / 10;
    });
    if (returnFormat === 'hsl') {
      if (input.length !== 3) throw new TypeError('Expecting an rgb() input with exactly three parameters.');
      if (returnArray) return [hsla[0], hsla[1], hsla[2]];
      return `hsl(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%)`;
    }
    if (returnArray) return hsla;
    return `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${hsla[3]})`;
  },
  rgbaToRgb(rawInput, { background = [255, 255, 255], returnArray = false } = {}) {
    const input = this.cleanRgba(rawInput, { returnArray: true });
    const alpha = input[3];
    const r = Math.round(((1 - alpha) * background[0]) + (alpha * input[0]));
    const g = Math.round(((1 - alpha) * background[1]) + (alpha * input[1]));
    const b = Math.round(((1 - alpha) * background[2]) + (alpha * input[2]));
    if (returnArray) return [r, g, b];
    return `rgb(${r}, ${g}, ${b})`;
  },
  hslToRgb(input, { returnArray = false } = {}) {
    let r;
    let g;
    let b;
    // eslint-disable-next-line
    let [h, s, l] = this.cleanHsl(input, { returnArray: true });
    s /= 100;
    l /= 100;
    if (s === 0) {
      r = Math.round(l * 255);
      g = r;
      b = r;
      if (returnArray) return [r, g, b];
      return `rgb(${r}, ${g}, ${b})`;
    }
    const t1 = l < 0.5 ? l * (1 + s) : (l + s) - (l * s);
    const t2 = (2 * l) - t1;
    const hue = h / 360;
    const r1 = hue + (1 / 3);
    const g1 = hue;
    const b1 = hue - (1 / 3);
    let rgb = [r1, g1, b1].map((c1) => {
      let c = c1;
      if (c1 < 0) c = c1 + 1;
      if (c1 > 1) c = c1 - 1;
      return c;
    });
    rgb = rgb.map((c) => {
      if (6 * c < 1) return Math.round((t2 + ((t1 - t2) * 6 * c)) * 255);
      else if (2 * c < 1) return Math.round(t1 * 255);
      else if (3 * c < 2) return Math.round((t2 + ((t1 - t2) * (0.666 - c) * 6)) * 255);
      return Math.round(t2 * 255);
    });
    if (returnArray) return [rgb[0], rgb[1], rgb[2]];
    return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
  },
  hslToHsla(rawInput, { returnArray = false } = {}) {
    const input = this.cleanHsl(rawInput, { returnArray: true });
    if (returnArray) return [input[0], input[1], input[2], 1];
    return `hsla(${input[0]}, ${input[1]}%, ${input[2]}%, 1)`;
  },
  hslaToRgba(rawInput, { returnArray = false } = {}) {
    let r;
    let b;
    let g;
    let a;
    const input = this.cleanHsla(rawInput, { returnArray: true });
    const h = input[0];
    const s = (input[1] / 100);
    const l = (input[2] / 100);
    a = input[3];

    if (s === 0) {
      r = (l * 255);
      g = r;
      b = r;
      const rgba = [r, g, b, a].map((v, i) => {
        if (i <= 2) return Math.round(v);
        if (i === 3) return parseFloat(v);
        throw new Error('Expected rgba() array to have only 4 items.');
      });
      if (returnArray) return rgba;
      return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    }
    const t1 = l < 0.5 ? l * (1 + s) : (l + s) - (l * s);
    const t2 = (2 * l) - t1;

    const hue = h / 360;
    const r1 = hue + (1 / 3);
    const g1 = hue;
    const b1 = hue - (1 / 3);
    let rgb = [r1, g1, b1].map((c1) => {
      let c = c1;
      if (c1 < 0) c = c1 + 1;
      if (c1 > 1) c = c1 - 1;
      return c;
    });

    rgb = rgb.map((c) => {
      if (6 * c < 1) return Math.round((t2 + ((t1 - t2) * 6 * c)) * 255);
      else if (2 * c < 1) return Math.round(t1 * 255);
      else if (3 * c < 2) return Math.round((t2 + ((t1 - t2) * (0.666 - c) * 6)) * 255);
      return Math.round(t2 * 255);
    });

    a = parseFloat(input[3], 10);
    if (returnArray) return [rgb[0], rgb[1], rgb[2], a];
    return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${a})`;
  },
  hexaToRgba(rawInput, { returnArray = false } = {}) {
    if (typeof rawInput !== 'string') throw new TypeError('Expecting hex to be a string.');
    let hex = rawInput.replace(/^#/, '');
    if (hex.length === 4) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    } else if (hex.length !== 6 && hex.length !== 8) {
      throw new TypeError('Expecting hex string to be 4 or 8 characters long (excluding optional leading #).');
    }
    const num = parseInt(hex, 16);
    const arr = [(num >> 24) & 255, (num >> 16) & 255, (num >> 8) & 255, Math.round(((num & 255) * 100) / 255) / 100];
    if (returnArray) return arr;
    return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]})`;
  },
  hexToRgb(input, { returnArray = false } = {}) {
    if (typeof input !== 'string') throw new TypeError('Expecting hexadecimal input to be a string.');
    let hex = input.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    } else if (hex.length === 4) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    } else if (hex.length !== 6 && hex.length !== 8) {
      throw new TypeError('Expecting hexadecimal input string to be 3, 6 or 8 characters long (excluding optional leading #).');
    }
    const num = parseInt(hex, 16);
    if (hex.length === 6) {
      const arr = [num >> 16, (num >> 8) & 255, num & 255];
      if (returnArray) return arr;
      return `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`;
    }
    const arr = [(num >> 24) & 255, (num >> 16) & 255, (num >> 8) & 255, Math.round(((num & 255) * 100) / 255) / 100];
    if (returnArray) return arr;
    return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${arr[3]})`;
  },
  identifyString(rawInput) {
    const typeofInput = typeof rawInput;
    if (typeofInput !== 'string') throw new TypeError(`identifyString() expects a string. ${typeofInput} given instead.`);
    const string = rawInput.replace(' ', '');
    const parts = string.replace(/\(|\)/g, '').split(',');
    if (string.indexOf('rgba(') !== -1 && parts.length === 4) return 'rgba';
    if (string.indexOf('rgb(') !== -1 && parts.length === 3) return 'rgb';
    if (string.indexOf('hsla(') !== -1 && parts.length === 4) return 'hsla';
    if (string.indexOf('hsl(') !== -1 && parts.length === 3) return 'hsl';
    if (string.indexOf('#') !== -1 && (string.length === 7 || string.length === 4)) return 'hex';
    if ((string.length === 6 || string.length === 3) && string.indexOf(',') === -1) return 'hex';
    if (string.indexOf('#') !== -1 && (string.length === 9 || string.length === 5)) return 'hexa';
    if ((string.length === 8 || string.length === 4) && string.indexOf(',') === -1) return 'hexa';
    if (parts.length === 3
        && parseInt(parts[0], 10) <= 255 && parseInt(parts[0], 10) >= 0
        && parseInt(parts[1], 10) <= 255 && parseInt(parts[1], 10) >= 0
        && parseInt(parts[2], 10) <= 255 && parseInt(parts[2], 10) >= 0
        && parts[1].indexOf('%') < 0
        && parts[2].indexOf('%') < 0) return 'rgb';
    if (parts.length === 4
        && parseInt(parts[0], 10) <= 255 && parseInt(parts[0], 10) >= 0
        && parseInt(parts[1], 10) <= 255 && parseInt(parts[1], 10) >= 0
        && parseInt(parts[2], 10) <= 255 && parseInt(parts[2], 10) >= 0
        && parseInt(parts[3], 10) <= 1 && parseInt(parts[3], 10) >= 0
        && parts[1].indexOf('%') < 0
        && parts[2].indexOf('%') < 0) return 'rgba';
    if (parts.length === 3
        && parseInt(parts[0], 10) <= 360 && parseInt(parts[0], 10) >= 0
        && parseInt(parts[1], 10) <= 100 && parseInt(parts[1], 10) >= 0
        && parseInt(parts[2], 10) <= 100 && parseInt(parts[2], 10) >= 0
        && parts[1].indexOf('%') > -1
        && parts[2].indexOf('%') > -1) return 'hsl';
    if (parts.length === 4
        && parseInt(parts[0], 10) <= 255 && parseInt(parts[0], 10) >= 0
        && parseInt(parts[1], 10) <= 100 && parseInt(parts[1], 10) >= 0
        && parseInt(parts[2], 10) <= 100 && parseInt(parts[2], 10) >= 0
        && parseInt(parts[3], 10) <= 1 && parseInt(parts[3], 10) >= 0
        && parts[1].indexOf('%') > -1
        && parts[2].indexOf('%') > -1) return 'hsla';
    throw new TypeError('Input did not match any supported color types');
  },
};

module.exports = new colorConverter();
