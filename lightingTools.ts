import * as fs from 'https://deno.land/std/fs/mod.ts';
import { color } from './colors.ts';
import * as LayoutTools from './layoutTools.ts';
import layouts, { layoutKey } from './layouts.ts';
import { readJsonSync, writeJsonSync } from 'https://deno.land/std/fs/mod.ts';
import { join } from 'https://deno.land/std/path/mod.ts';

const vaguePath = '/sys/bus/hid/drivers/razerkbd/';

let folder: string | undefined;
for await(const file of Deno.readDir(vaguePath)){
  if(
    file.isSymlink && 
    fs.existsSync(`${vaguePath}/${file.name}/device_type`) && 
    fs.readFileStrSync(`${vaguePath}/${file.name}/device_type`) === 'Razer BlackWidow Chroma V2\n'
  ) {
    folder = file.name;
    break;
  }
}
if(typeof folder === 'undefined') {
  console.log('Device not found');
  Deno.exit(1);
}
export const path = `${vaguePath}/${folder}`;

/**
 * @param level 0-255
 */
export const setBrightness = (level: number) => fs.writeFileStrSync(`${path}/matrix_brightness`, String(level));

export const setRow = (row: number, data: color[]) => 
  Deno.writeFileSync(`${path}/matrix_custom_frame`, new Uint8Array([row, 0, data.length-1, ...data.flat(1)]));

export const activateLayout = () => fs.writeFileStrSync(`${path}/matrix_effect_custom`, '1');

export type State = {layout: layoutKey};

export const here = import.meta.url.slice(7).split('/').slice(0,-1).join('/');
export const statePath = join(here, './state.json');
export const readState = async () => readJsonSync(statePath) as State;
export const saveState = async (state: State) => writeJsonSync(statePath, state);

export const loadLayout = async (layout: layoutKey) => {
  renderLayout(layouts[layout]);
  await saveState({layout});
}

export const renderLayout = (layout: LayoutTools.Layout) => {
  setBrightness(255);
  for(let i = 0; i < 6; i++) setRow(i, layout.lighting[i]);
  activateLayout();
}



