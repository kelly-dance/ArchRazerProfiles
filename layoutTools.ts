import * as Colors from './colors.ts';
import { exec } from 'https://deno.land/x/exec/mod.ts';

export type LightingSchema = Colors.color[][];
export type BindList = {
  1?: Bind, 
  2?: Bind, 
  3?: Bind, 
  4?: Bind,
  5?: Bind, 
};

export interface Layout {
  lighting: LightingSchema,
  binds: BindList,
}

export type Bind = () => any;

export const LayoutDefaults: Layout = {
  lighting: Array.from({length:6},() => Array.from({length:22},()=>[0,0,0])),
  binds: {},
}

export const fillLayout = (layer: Partial<Layout>, template: Layout = LayoutDefaults) => {
  const final: Partial<Layout> = {};
  if(layer.lighting) final.lighting = Array.from({length:6},(_,i) => Array.from({length:22},(_,j)=>layer.lighting?.[i]?.[j] || template.lighting?.[i]?.[j] || [0,0,0]));
  else final.lighting = layer.lighting;
  if(layer.binds) final.binds = {...template.binds, ...layer.binds};
  else final.binds = layer.binds;
  return final as Layout;
};

export const commandBind = (str: string) => () => exec(str);
export const sendKeyStrokeBind = (key: string) => commandBind(`xdotool key ${key}`)
