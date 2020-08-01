import { loadLayout, readState } from './lightingTools.ts';
import layouts, { layoutKey } from './layouts.ts';

const { args } = Deno;

const something = ['1','2','3','4','5'];

const methods = {
  async bind(args: string[]){
    if(!args[0]) return console.log(`you didn't provide a slot`);
    if(!something.includes(args[0])) return console.log(`${args[0]} is not a valid bind slot?`);
    const slot = args[0] as '1'|'2'|'3'|'4'|'5';
    const state = await readState();
    const target = layouts[state.layout].binds[slot];
    if(target) target();
  },
  async layout(args: string[]){
    if(!(args[0] in layouts)) return console.log(`${args[0]} is not a valid layout`);
    loadLayout(args[0] as layoutKey);
  },
}

if(args[0] && args[0] in methods) await methods[args[0] as keyof typeof methods](args.slice(1));
else console.log(`Unknown command "${args[0]}", available commands are: ${Object.keys(methods).join(', ')}`);
