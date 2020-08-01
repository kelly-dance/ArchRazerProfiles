# My lighting & macro profile scripts

using openrazer, xbindkeys, & xdotool

in my `~/.xbindkeysrc` file:
```
"/home/mcpqndq/.deno/bin/deno run -A --unstable /home/mcpqndq/razer/lighting.ts bind 1"
  c:191 + m:0x10

"/home/mcpqndq/.deno/bin/deno run -A --unstable /home/mcpqndq/razer/lighting.ts bind 2"
  c:192 + m:0x10

"/home/mcpqndq/.deno/bin/deno run -A --unstable /home/mcpqndq/razer/lighting.ts bind 3"
  c:193 + m:0x10

"/home/mcpqndq/.deno/bin/deno run -A --unstable /home/mcpqndq/razer/lighting.ts bind 4"
  c:194 + m:0x10

"/home/mcpqndq/.deno/bin/deno run -A --unstable /home/mcpqndq/razer/lighting.ts bind 5"
  c:195 + m:0x10
```

in my `~/.xprofile` file:
```bash
openrazer-daemon -r
xbindkeys
/home/mcpqndq/.deno/bin/deno run -A --unstable /home/mcpqndq/razer/lighting.ts layout red_on
```

(I don't think I actually need all those to be absolute paths, but it was easier *for now*)
