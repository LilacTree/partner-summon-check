module.exports = function PartnerSummonCheck(mod) {
	const command = mod.command;
	const config = require('./config.json');

	let	enabled = true,
		notice = false;
		
	let	myGameId = null,
		partnerInfo = [],
		warningRestriction = false,
		despawnRestriction = false,
		havePartner = false;
	
	command.add('partnersummoncheck', {
		$none() {
			enabled = !enabled;
			command.message(`Partner Summon Check Module is now: ${enabled ? "enabled" : "disabled"}.`);
		},
		$default() {
			command.message("Invalid command! See README for the list of valid commands")
		},
		notice() {
			notice = !notice;
			command.message(`Notice is now: ${notice ? "enabled" : "disabled"}.`);
		}
	});
	
	mod.hook('S_LOGIN', 13, (event) => {
		loadConfig();
		myGameId = event.gameId;
		partnerInfo = [];
		warningRestriction = false;
		despawnRestriction = false;
		
		if (event.servants.filter(function(a) { return a.type === 1; }).length > 0) {
			havePartner = true;
		}
		else {
			havePartner = false;
		}
	});
	
	mod.hook('S_REQUEST_SPAWN_SERVANT', 1, (event) => {		
		if (myGameId === event.owner && event.fellowship >= 1){		
			if (!(partnerInfo.filter(function(a) { return a.gameId === event.gameId; }).length > 0)) {
				let partnerObject = {gameId: event.gameId, dbid: event.dbid, id: event.id, fellowship: event.fellowship};
				partnerInfo.push(partnerObject);
				havePartner = true;
				
				if (!enabled) return;
				
				if (notice) {
					command.message("Summoned your partner!");
				}
			}
		}
	});
	
	mod.hook('S_REQUEST_DESPAWN_SERVANT', 1, (event) => {	
		if (partnerInfo.filter(function(a) { return a.gameId === event.gameId; }).length > 0) {
			let partnerIndex = partnerInfo.findIndex(a => a.gameId === event.gameId);
			partnerInfo.splice(partnerIndex, 1);
			
			if (!enabled) return;
			
			if (notice) {
				command.message("Dismissed your partner!");
			}
			despawnRestriction = true;
			setTimeout(()=>{ despawnRestriction = false; }, 2500);
		}
	});
	
	mod.hook('S_USER_STATUS', 3, (event) => {
		if (!enabled) return;
		
		if (event.gameId === myGameId && event.status == 1) {
			processSummonCheck();
		}
	});
	
	mod.hook('C_START_SKILL', 'raw', () => {
		if (!enabled) return;
		
		processSummonCheck();
	});
	
	mod.hook('C_PRESS_SKILL', 'raw', () => {
		if (!enabled) return;
		
		processSummonCheck();
	});
	
	mod.hook('C_START_COMBO_INSTANT_SKILL', 'raw', () => {
		if (!enabled) return;
		
		processSummonCheck();
	});
	
	mod.hook('C_START_INSTANCE_SKILL', 'raw', () => {
		if (!enabled) return;
		
		processSummonCheck();
	});
	
	mod.hook('C_START_TARGETED_SKILL', 'raw', () => {
		if (!enabled) return;
		
		processSummonCheck();
	});
	
	function partnerSummonStatus() {		
		return partnerInfo.length > 0;
	}
	
	function processSummonCheck() {
		if (!warningRestriction && !despawnRestriction && havePartner) {
			let isPartnerSummoned = partnerSummonStatus();
			if (!isPartnerSummoned) {
				warningRestriction = true;
				setTimeout(()=>{ warningRestriction = false; }, 1000);
				command.message('<font color="#FDD017">Warning</font>: Partner is not summoned!');
			}
		}
	}

	function loadConfig() {
		if (config) {
			({enabled, notice} = config)
		}
		else {
			command.message("Error: Unable to load config.json - Using default values for now");
		}
	}
}