# partner-summon-check
TERA-proxy module for TERA Online. Check to see if you have your partner summoned when using skills or entering combat.  
#partner #companion #pet #pet-summon-check

## Command
List of in-game commands (use in /proxy or /8 channel):  
- `partnersummoncheck` - toggles module (default: true)
- `partnersummoncheck notice` - toggles notice (default: false)

## Installation
- Move files in `defs` into `node_modules\tera-data\protocol\` folder
- Move files in `opcodes` into `node_modules\tera-data\map\` folder

## Notes
- If there are no opcodes for your region, get them yourself using https://github.com/SoliaRdi/PacketsLogger
- Modify the config file to customize settings