import * as colors from './colors.ts';
import { Layout, BindList, commandBind, sendKeyStrokeBind, LightingSchema } from './layoutTools.ts';
import { loadLayout } from './lightingTools.ts';

export const buildLightingSchema = (data: string[], map: {[key in string]: colors.color}): LightingSchema => 
  data.map(row=>row.split('').map(c=>map[c]));

const myBinds: BindList = {
  2: sendKeyStrokeBind('Control_R+Shift_L+F1'),
  3: sendKeyStrokeBind('Control_R+Shift_L+F2'),
  4: commandBind('spectacle -r'),
}

const red_on: Layout = {
  binds: {
    ...myBinds,
    1: () => loadLayout('red_off'),
  },
  lighting: buildLightingSchema([
    `______________________`,
    `l_lllll_______________`,
    `l__w_l________________`,
    `l_www_________________`,
    `ll______________l_____`,
    `l______l_______lll____`,
  ], {
    _: colors.red,
    l: colors.lightRed,
    w: colors.white,
  }),
}

const red_off: Layout = {
  binds: {
    ...myBinds,
    1: () => loadLayout('red_on'),
  },
  lighting: buildLightingSchema([
    `______________________`,
    `r_____________________`,
    `______________________`,
    `______________________`,
    `______________________`,
    `______________________`,
  ], {
    _: colors.black,
    r: colors.darkRed,
  }),
}

const layouts = { red_on, red_off }

export default layouts;

export type layoutKey = keyof typeof layouts;
