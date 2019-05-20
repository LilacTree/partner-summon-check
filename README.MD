# partner-summon-check
TERA-proxy module for TERA Online that checks to see if you have your partner summoned when using skills or entering combat.

## Commands
List of in-game commands (use in /proxy or /8 channel):  
- `partnersummoncheck` - Toggles module (default: true)
- `partnersummoncheck notice` - Toggles notice (default: false)

## Installation
- Move files in `defs` into `node_modules\tera-data\protocol\` folder
- Move files in `opcodes` into `node_modules\tera-data\map\` folder

## Notes
- If there are no opcodes for your region, get them yourself using https://github.com/SoliaRdi/PacketsLogger
- Modify the config file to customize settings
- Module only works if you own a partner