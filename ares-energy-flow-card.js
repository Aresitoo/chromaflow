/**
 * Home Assistant Real-Time Energy Flow & Autarky Scorecard Card
 * Hardware-accelerated SVG power flow with WAAPI stutter-free velocity scaling and 3-ring autarky scorecard.
 * Version: v1.2.0 (Zero-YAML Visual Editor, 100% Granular Color Studio, Classic S-Curves & Bulletproof Anchors)
 */

const PALETTES = {
  solar: {
    name: '☀️ Solar Harmonized (Default)',
    solar: '#ffd54f',
    grid: '#ff7043',
    home: '#00e5ff',
    device: '#b388ff',
    export: '#00e676',
    autarky: '#00e676',
    import_ring: '#ff7043',
    export_ring: '#ffd54f',
    bg_solar: 'rgba(255, 213, 79, 0.12)',
    border_solar: 'rgba(255, 213, 79, 0.3)',
    bg_grid: 'rgba(255, 112, 67, 0.12)',
    border_grid: 'rgba(255, 112, 67, 0.3)',
    bg_home: 'rgba(0, 229, 255, 0.12)',
    border_home: 'rgba(0, 229, 255, 0.3)',
    bg_device: 'rgba(179, 136, 255, 0.12)',
    border_device: 'rgba(179, 136, 255, 0.3)',
    bg_export: 'rgba(0, 230, 118, 0.12)',
    border_export: 'rgba(0, 230, 118, 0.25)',
    card_border: 'rgba(0, 230, 118, 0.25)',
    scorecard_radial: 'rgba(0, 229, 255, 0.05)'
  },
  fitness: {
    name: '🏃 Fitness Activity (Apple Rings)',
    solar: '#fa114f',
    grid: '#a6e22e',
    home: '#00e5ff',
    device: '#b388ff',
    export: '#00e5ff',
    autarky: '#fa114f',
    import_ring: '#a6e22e',
    export_ring: '#00e5ff',
    bg_solar: 'rgba(250, 17, 79, 0.15)',
    border_solar: 'rgba(250, 17, 79, 0.3)',
    bg_grid: 'rgba(166, 226, 46, 0.15)',
    border_grid: 'rgba(166, 226, 46, 0.3)',
    bg_home: 'rgba(0, 229, 255, 0.12)',
    border_home: 'rgba(0, 229, 255, 0.3)',
    bg_device: 'rgba(179, 136, 255, 0.12)',
    border_device: 'rgba(179, 136, 255, 0.3)',
    bg_export: 'rgba(0, 229, 255, 0.15)',
    border_export: 'rgba(0, 229, 255, 0.25)',
    card_border: 'rgba(250, 17, 79, 0.3)',
    scorecard_radial: 'rgba(250, 17, 79, 0.08)'
  },
  halloween: {
    name: '🎃 Spooky Halloween (Pumpkin & Witch Purple)',
    solar: '#ff7518',
    grid: '#9d4edd',
    home: '#39ff14',
    device: '#f72585',
    export: '#ff0055',
    autarky: '#ff7518',
    import_ring: '#9d4edd',
    export_ring: '#39ff14',
    bg_solar: 'rgba(255, 117, 24, 0.15)',
    border_solar: 'rgba(255, 117, 24, 0.35)',
    bg_grid: 'rgba(157, 78, 221, 0.15)',
    border_grid: 'rgba(157, 78, 221, 0.35)',
    bg_home: 'rgba(57, 255, 20, 0.12)',
    border_home: 'rgba(57, 255, 20, 0.3)',
    bg_device: 'rgba(247, 37, 133, 0.15)',
    border_device: 'rgba(247, 37, 133, 0.3)',
    bg_export: 'rgba(255, 0, 85, 0.15)',
    border_export: 'rgba(255, 0, 85, 0.3)',
    card_border: 'rgba(255, 117, 24, 0.35)',
    scorecard_radial: 'rgba(157, 78, 221, 0.08)'
  },
  christmas: {
    name: '🎄 Festive Christmas (Pine, Crimson & Gold)',
    solar: '#ffd700',
    grid: '#d90429',
    home: '#2b9348',
    device: '#80b918',
    export: '#f8f9fa',
    autarky: '#2b9348',
    import_ring: '#d90429',
    export_ring: '#ffd700',
    bg_solar: 'rgba(255, 215, 0, 0.15)',
    border_solar: 'rgba(255, 215, 0, 0.35)',
    bg_grid: 'rgba(217, 4, 41, 0.15)',
    border_grid: 'rgba(217, 4, 41, 0.35)',
    bg_home: 'rgba(43, 147, 72, 0.15)',
    border_home: 'rgba(43, 147, 72, 0.35)',
    bg_device: 'rgba(128, 185, 24, 0.15)',
    border_device: 'rgba(128, 185, 24, 0.3)',
    bg_export: 'rgba(248, 249, 250, 0.15)',
    border_export: 'rgba(248, 249, 250, 0.3)',
    card_border: 'rgba(217, 4, 41, 0.35)',
    scorecard_radial: 'rgba(43, 147, 72, 0.08)'
  },
  cyberpunk: {
    name: '🌆 Cyberpunk Neon (Cyan, Hot Pink & Toxic Lime)',
    solar: '#00ffff',
    grid: '#ff007f',
    home: '#ffff00',
    device: '#bd00ff',
    export: '#00ff66',
    autarky: '#00ffff',
    import_ring: '#ff007f',
    export_ring: '#00ff66',
    bg_solar: 'rgba(0, 255, 255, 0.15)',
    border_solar: 'rgba(0, 255, 255, 0.35)',
    bg_grid: 'rgba(255, 0, 127, 0.15)',
    border_grid: 'rgba(255, 0, 127, 0.35)',
    bg_home: 'rgba(255, 255, 0, 0.12)',
    border_home: 'rgba(255, 255, 0, 0.3)',
    bg_device: 'rgba(189, 0, 255, 0.15)',
    border_device: 'rgba(189, 0, 255, 0.35)',
    bg_export: 'rgba(0, 255, 102, 0.15)',
    border_export: 'rgba(0, 255, 102, 0.3)',
    card_border: 'rgba(0, 255, 255, 0.35)',
    scorecard_radial: 'rgba(255, 0, 127, 0.08)'
  },
  synthwave: {
    name: '🌅 Synthwave Sunset (Sunset Amber, Magenta & Miami Aqua)',
    solar: '#ff9e00',
    grid: '#ff0054',
    home: '#00f5d4',
    device: '#9b5de5',
    export: '#fee440',
    autarky: '#00f5d4',
    import_ring: '#ff0054',
    export_ring: '#ff9e00',
    bg_solar: 'rgba(255, 158, 0, 0.15)',
    border_solar: 'rgba(255, 158, 0, 0.35)',
    bg_grid: 'rgba(255, 0, 84, 0.15)',
    border_grid: 'rgba(255, 0, 84, 0.35)',
    bg_home: 'rgba(0, 245, 212, 0.12)',
    border_home: 'rgba(0, 245, 212, 0.3)',
    bg_device: 'rgba(155, 93, 229, 0.15)',
    border_device: 'rgba(155, 93, 229, 0.35)',
    bg_export: 'rgba(254, 228, 64, 0.15)',
    border_export: 'rgba(254, 228, 64, 0.3)',
    card_border: 'rgba(255, 0, 84, 0.35)',
    scorecard_radial: 'rgba(0, 245, 212, 0.08)'
  },
  nord: {
    name: '❄️ Nord Frost (Polar Night, Ice Blue & Arctic Teal)',
    solar: '#ebcb8b',
    grid: '#bf616a',
    home: '#88c0d0',
    device: '#b48ead',
    export: '#a3be8c',
    autarky: '#a3be8c',
    import_ring: '#bf616a',
    export_ring: '#88c0d0',
    bg_solar: 'rgba(235, 203, 139, 0.15)',
    border_solar: 'rgba(235, 203, 139, 0.3)',
    bg_grid: 'rgba(191, 97, 106, 0.15)',
    border_grid: 'rgba(191, 97, 106, 0.3)',
    bg_home: 'rgba(136, 192, 208, 0.15)',
    border_home: 'rgba(136, 192, 208, 0.3)',
    bg_device: 'rgba(180, 142, 173, 0.15)',
    border_device: 'rgba(180, 142, 173, 0.3)',
    bg_export: 'rgba(163, 190, 140, 0.15)',
    border_export: 'rgba(163, 190, 140, 0.3)',
    card_border: 'rgba(136, 192, 208, 0.3)',
    scorecard_radial: 'rgba(136, 192, 208, 0.08)'
  },
  midnight: {
    name: '🌌 Midnight Glow (Stealth Slate, Sky Blue & Amber)',
    solar: '#38bdf8',
    grid: '#f59e0b',
    home: '#e2e8f0',
    device: '#a855f7',
    export: '#10b981',
    autarky: '#38bdf8',
    import_ring: '#f59e0b',
    export_ring: '#10b981',
    bg_solar: 'rgba(56, 189, 248, 0.15)',
    border_solar: 'rgba(56, 189, 248, 0.3)',
    bg_grid: 'rgba(245, 158, 11, 0.15)',
    border_grid: 'rgba(245, 158, 11, 0.3)',
    bg_home: 'rgba(226, 232, 240, 0.12)',
    border_home: 'rgba(226, 232, 240, 0.3)',
    bg_device: 'rgba(168, 85, 247, 0.15)',
    border_device: 'rgba(168, 85, 247, 0.3)',
    bg_export: 'rgba(16, 185, 129, 0.15)',
    border_export: 'rgba(16, 185, 129, 0.3)',
    card_border: 'rgba(56, 189, 248, 0.3)',
    scorecard_radial: 'rgba(56, 189, 248, 0.08)'
  },
  emerald: {
    name: '🌲 Emerald Forest (Mint Jade, Lime Leaf & Deep Pine)',
    solar: '#a3e635',
    grid: '#eab308',
    home: '#34d399',
    device: '#059669',
    export: '#10b981',
    autarky: '#10b981',
    import_ring: '#eab308',
    export_ring: '#34d399',
    bg_solar: 'rgba(163, 230, 53, 0.15)',
    border_solar: 'rgba(163, 230, 53, 0.3)',
    bg_grid: 'rgba(234, 179, 8, 0.15)',
    border_grid: 'rgba(234, 179, 8, 0.3)',
    bg_home: 'rgba(52, 211, 153, 0.15)',
    border_home: 'rgba(52, 211, 153, 0.3)',
    bg_device: 'rgba(5, 150, 105, 0.15)',
    border_device: 'rgba(5, 150, 105, 0.3)',
    bg_export: 'rgba(16, 185, 129, 0.15)',
    border_export: 'rgba(16, 185, 129, 0.3)',
    card_border: 'rgba(16, 185, 129, 0.3)',
    scorecard_radial: 'rgba(52, 211, 153, 0.08)'
  },
  ocean: {
    name: '🌊 Deep Ocean (Lagoon Aqua, Coral & Deep Indigo)',
    solar: '#38bdf8',
    grid: '#f43f5e',
    home: '#06b6d4',
    device: '#6366f1',
    export: '#2dd4bf',
    autarky: '#2dd4bf',
    import_ring: '#f43f5e',
    export_ring: '#38bdf8',
    bg_solar: 'rgba(56, 189, 248, 0.15)',
    border_solar: 'rgba(56, 189, 248, 0.3)',
    bg_grid: 'rgba(244, 63, 94, 0.15)',
    border_grid: 'rgba(244, 63, 94, 0.3)',
    bg_home: 'rgba(6, 182, 212, 0.15)',
    border_home: 'rgba(6, 182, 212, 0.3)',
    bg_device: 'rgba(99, 102, 241, 0.15)',
    border_device: 'rgba(99, 102, 241, 0.3)',
    bg_export: 'rgba(45, 212, 191, 0.15)',
    border_export: 'rgba(45, 212, 191, 0.3)',
    card_border: 'rgba(6, 182, 212, 0.3)',
    scorecard_radial: 'rgba(6, 182, 212, 0.08)'
  }
};

function hslToHex(h, s, l) {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToRgba(hex, alpha) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(255, 255, 255, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function getRandomVibrantHex(baseHue) {
  const h = (baseHue !== undefined) ? (Math.round(baseHue) % 360) : Math.floor(Math.random() * 360);
  const s = 82 + Math.floor(Math.random() * 18);
  const l = 54 + Math.floor(Math.random() * 12);
  return hslToHex(h, s, l);
}

class HaEnergyFlowCard extends HTMLElement {
  static async getConfigElement() {
    if (window.loadCardHelpers) {
      await window.loadCardHelpers();
    }
    return document.createElement('ha-energy-flow-card-editor');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._rendered = false;
    this._currentW = 0;
    this._currentH = 0;
    this._config = {};
  }

  static getStubConfig() {
    return {
      contract_power_limit_kw: 4.2,
      contract_warning_pct: 0.85,
      max_expected_power_kw: 7.5,
      speed_multiplier: 1.0,
      font_scale: 1.0,
      show_solar_forecast: true,
      palette: 'solar',
      device_type: 'ev',
      battery_name: 'BESS',
      ev_name: 'Tesla',
      battery_positive_charging: true
    };
  }

  _isBatteryMode() {
    const cfg = this._config || {};
    const ents = cfg.entities || {};
    const rawDt = String(cfg.device_type || ents.device_type || '').toLowerCase().trim();
    if (rawDt === 'ev') return false;
    const hasBatteryEntities = Boolean(ents.battery_power || ents.battery_soc || ents.battery_daily_charge || ents.battery_daily_discharge);
    return (rawDt === 'battery' || rawDt === 'bess' || rawDt === 'storage' || rawDt === 'powerwall' || cfg.bess === true || hasBatteryEntities);
  }

  _getEntities() {
    const cfgEnts = this._config?.entities || {};
    const states = this._hass?.states || {};

    const resolve = (key, candidates) => {
      if (cfgEnts[key]) return cfgEnts[key];
      for (const cand of candidates) {
        if (states[cand]) return cand;
      }
      return '';
    };

    return {
      solar_power: resolve('solar_power', [
        'sensor.shellyem_e4525b_channel_2_power',
        'sensor.solar_power',
        'sensor.envoy_current_power_production',
        'sensor.pv_power',
        'sensor.inverter_power'
      ]),
      solar_daily_yield: resolve('solar_daily_yield', [
        'sensor.solar_daily_yield',
        'sensor.solar_today',
        'sensor.energy_production_today'
      ]),
      grid_power: resolve('grid_power', [
        'sensor.return_to_grid_new',
        'sensor.grid_power',
        'sensor.power_meter',
        'sensor.grid_consumption'
      ]),
      grid_export_power: resolve('grid_export_power', [
        'sensor.true_grid_export_power',
        'sensor.grid_export_power'
      ]),
      grid_daily_import: resolve('grid_daily_import', [
        'sensor.living_room_shellyem_e4525b_channel_1_grid_daily_import_energy',
        'sensor.grid_daily_import_energy',
        'sensor.energy_imported_today'
      ]),
      grid_daily_export: resolve('grid_daily_export', [
        'sensor.grid_daily_export_energy',
        'sensor.energy_exported_today'
      ]),
      load_power: resolve('load_power', [
        'sensor.load_power',
        'sensor.house_consumption_power',
        'sensor.home_power'
      ]),
      ev_power: resolve('ev_power', [
        'sensor.evse_192_168_0_249_charge_power',
        'sensor.v2c_trydan_power',
        'sensor.wallbox_power',
        'sensor.wallbox_portal_charging_power',
        'sensor.easee_power',
        'sensor.tesla_wall_connector_power',
        'sensor.zaptec_power',
        'sensor.ohme_power',
        'sensor.go_echarger_power',
        'sensor.ev_power',
        'sensor.ev_charge_power',
        'sensor.charger_power'
      ]),
      ev_charging: resolve('ev_charging', [
        'binary_sensor.evse_192_168_0_249_charging',
        'binary_sensor.v2c_trydan_charging',
        'binary_sensor.wallbox_charging',
        'binary_sensor.easee_is_charging',
        'binary_sensor.tesla_wall_connector_charging',
        'binary_sensor.tesla_charging',
        'binary_sensor.ev_charging',
        'binary_sensor.charger_status'
      ]),
      ev_daily_energy: resolve('ev_daily_energy', [
        'sensor.v2c_charging_stats',
        'sensor.evse_192_168_0_249_charge_energy',
        'sensor.wallbox_energy_added',
        'sensor.wallbox_portal_added_energy',
        'sensor.wallbox_energy',
        'sensor.easee_charger_session_energy',
        'sensor.easee_lifetime_energy',
        'sensor.tesla_wall_connector_energy',
        'sensor.charger_total_energy',
        'sensor.tesla_charge_energy_added',
        'sensor.zaptec_session_energy',
        'sensor.ohme_session_energy',
        'sensor.go_echarger_energy',
        'sensor.ev_daily_energy',
        'sensor.ev_charging_energy_today',
        'sensor.ev_charged_today'
      ]),
      battery_power: resolve('battery_power', [
        'sensor.battery_power',
        'sensor.bess_power',
        'sensor.powerwall_battery_now',
        'sensor.solar_battery_power',
        'sensor.givenergy_battery_power',
        'sensor.huawei_battery_power'
      ]),
      battery_soc: resolve('battery_soc', [
        'sensor.battery_soc',
        'sensor.battery_state_of_charge',
        'sensor.powerwall_charge',
        'sensor.givenergy_battery_soc',
        'sensor.huawei_battery_soc'
      ]),
      battery_daily_charge: resolve('battery_daily_charge', [
        'sensor.battery_daily_charge_energy',
        'sensor.battery_charge_today',
        'sensor.powerwall_daily_battery_charge',
        'sensor.givenergy_battery_charge_energy_today'
      ]),
      battery_daily_discharge: resolve('battery_daily_discharge', [
        'sensor.battery_daily_discharge_energy',
        'sensor.battery_discharge_today',
        'sensor.powerwall_daily_battery_discharge',
        'sensor.givenergy_battery_discharge_energy_today'
      ]),
      solcast_today: resolve('solcast_today', [
        'sensor.solcast_pv_forecast_forecast_today',
        'sensor.solcast_forecast_today'
      ]),
      solcast_remaining: resolve('solcast_remaining', [
        'sensor.solcast_pv_forecast_forecast_remaining_today',
        'sensor.solcast_forecast_remaining_today'
      ])
    };
  }

  _getLabels() {
    const cfg = this._config || {};
    const l = cfg.labels || {};
    return {
      solar: l.solar || cfg.solar_name || 'Solar',
      home: l.home || cfg.home_name || 'Home',
      grid_in: l.grid_in || cfg.grid_in_name || 'Grid In',
      grid_out: l.grid_out || cfg.grid_out_name || 'Grid Out',
      battery: l.battery || cfg.battery_name || 'BESS',
      ev: l.ev || cfg.ev_name || 'Tesla',
      autarky: l.autarky || 'AUTARKY',
      autarky_sub: l.autarky_sub || 'Grid-Free',
      self_consumed: l.self_consumed || 'SOLAR SELF-CONSUMED',
      self_consumed_sub: l.self_consumed_sub || '100% Free',
      grid_reliance: l.grid_reliance || 'UTILITY GRID RELIANCE',
      grid_reliance_sub: l.grid_reliance_sub || 'Night/Backup',
      exported: l.exported || 'EXPORTED TO GRID',
      exported_sub: l.exported_sub || 'Clean Surplus'
    };
  }

  _getDeviceName(isBattery) {
    const lbls = this._getLabels();
    return isBattery ? lbls.battery : lbls.ev;
  }

  _parsePower(ent) {
    if (!ent || ent.state === undefined || ent.state === null || ent.state === 'unavailable' || ent.state === 'unknown') {
      return 0.0;
    }
    const rawStr = String(ent.state).trim().replace(',', '.');
    const val = parseFloat(rawStr);
    if (isNaN(val)) return 0.0;
    const cfgUnit = String(this._config?.power_unit || '').toLowerCase().trim();
    const entUnit = String(ent.attributes?.unit_of_measurement || '').toLowerCase().trim();
    const uom = cfgUnit || entUnit;
    if (uom === 'kw' || uom.includes('kw')) return val * 1000.0;
    if (uom === 'mw' || uom.includes('mw')) return val * 1000000.0;
    return val;
  }

  _parseEnergy(ent) {
    if (!ent || ent.state === undefined || ent.state === null || ent.state === 'unavailable' || ent.state === 'unknown') {
      return 0.0;
    }
    const rawStr = String(ent.state).trim().replace(',', '.');
    const val = parseFloat(rawStr);
    if (isNaN(val)) return 0.0;
    const cfgUnit = String(this._config?.energy_unit || '').toLowerCase().trim();
    const entUnit = String(ent.attributes?.unit_of_measurement || '').toLowerCase().trim();
    const uom = cfgUnit || entUnit;
    if (uom === 'wh' || (uom.includes('wh') && !uom.includes('kwh') && !uom.includes('mwh'))) return val / 1000.0;
    if (uom === 'mwh' || uom.includes('mwh')) return val * 1000.0;
    return val;
  }

  _parsePercent(ent) {
    if (!ent || ent.state === undefined || ent.state === null || ent.state === 'unavailable' || ent.state === 'unknown') {
      return null;
    }
    const rawStr = String(ent.state).trim().replace(',', '.');
    const val = parseFloat(rawStr);
    return isNaN(val) ? null : val;
  }

  _isSameDay(dateStr, targetDate = new Date()) {
    if (!dateStr || typeof dateStr !== 'string') return false;
    const targetD = targetDate.getDate();
    const targetM = targetDate.getMonth() + 1;
    const targetY = targetDate.getFullYear();

    const parsed = Date.parse(dateStr);
    if (!isNaN(parsed)) {
      const dObj = new Date(parsed);
      if (dObj.getFullYear() === targetY && (dObj.getMonth() + 1) === targetM && dObj.getDate() === targetD) {
        return true;
      }
    }

    const parts = dateStr.split(/[\/\-\sT:]/);
    if (parts.length >= 3) {
      const p0 = parseInt(parts[0], 10);
      const p1 = parseInt(parts[1], 10);
      const p2 = parseInt(parts[2], 10);
      if (p0 === targetD && p1 === targetM && p2 === targetY) return true;
      if (p0 === targetY && p1 === targetM && p2 === targetD) return true;
      if (p0 === targetM && p1 === targetD && p2 === targetY) return true;
    }
    return false;
  }

  setConfig(config) {
    if (!config) {
      throw new Error("Invalid configuration");
    }
    this._config = {
      palette: 'solar',
      contract_power_limit_kw: 4.2,
      contract_warning_pct: 0.85,
      max_expected_power_kw: 7.5,
      min_flow_threshold_w: 2,
      speed_multiplier: 1.0,
      font_scale: 1.0,
      show_solar_forecast: true,
      battery_positive_charging: true,
      ...config
    };

    this._fontScale = typeof this._config.font_scale === 'number' ? this._config.font_scale : 1.0;
    this.style.setProperty('--ares-font-scale', String(this._fontScale));

    if (!this._rendered) {
      this._render();
    } else {
      this._applyConfigVisibility();
      this._updateCustomStyles();
      this._updateFlowSpeed();
      requestAnimationFrame(() => this._updateFlowPaths());
      if (this._hass) this._update();
    }
  }

  _updateCustomStyles() {
    this.style.setProperty('--ares-font-scale', String(this._fontScale || 1.0));
  }

  _updateFlowSpeed() {
    const mult = typeof this._config?.speed_multiplier === 'number' ? this._config.speed_multiplier : 1.0;
    const paths = [
      this._el?.flowSolarHome,
      this._el?.flowSolarTesla,
      this._el?.flowSolarGrid,
      this._el?.flowGridHome,
      this._el?.flowGridTesla,
      this._el?.flowBatteryHome,
      this._el?.flowBatteryGrid
    ];
    for (const path of paths) {
      if (!path) continue;
      const anims = (typeof path.getAnimations === 'function') ? path.getAnimations() : [];
      if (anims.length > 0) {
        anims[0].playbackRate = mult;
      }
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (this._rendered) {
      this._update();
    }
  }

  _render() {
    this._rendered = true;
    this.style.setProperty('--ares-font-scale', String(this._fontScale || 1.0));

    const pKey = (this._config && this._config.palette) || 'solar';
    const pal = PALETTES[pKey] || PALETTES.solar;
    const isFitness = (pKey === 'fitness');
    const isBattery = this._isBatteryMode();
    const lbls = this._getLabels();
    const devIcon = isBattery ? '🔋' : '🚗';
    const devName = this._getDeviceName(isBattery);

    // 100% Pure Independent Color Defaults (Zero Cascading Fallbacks)
    const colors = this._config.colors || {};

    const d = {
      // 1. Solar Box Elements
      bg_solar: pal.bg_solar,
      border_solar: pal.border_solar,
      title_solar: pal.solar,
      pwr_solar: '#ffffff',
      kwh_solar: 'rgba(255, 255, 255, 0.6)',
      kwh_solar_rem: pal.solar,
      badge_solar_text: pal.solar,
      badge_solar_bg: pal.bg_solar,
      bar_solar_forecast: pal.solar,

      // 2. Grid In Box Elements
      bg_grid: pal.bg_grid,
      border_grid: pal.border_grid,
      title_grid: pal.grid,
      pwr_grid: '#ffffff',
      kwh_grid: 'rgba(255, 255, 255, 0.6)',
      badge_grid_text: pal.grid,
      badge_grid_bg: pal.bg_grid,
      bar_grid_limit: pal.grid,

      // 3. Home Box Elements
      bg_home: pal.bg_home,
      border_home: pal.border_home,
      title_home: pal.home,
      pwr_home: '#ffffff',
      kwh_home: 'rgba(255, 255, 255, 0.6)',
      badge_home_text: pal.home,
      badge_home_bg: pal.bg_home,

      // 4. Battery / EV Box Elements
      bg_device: pal.bg_device,
      border_device: pal.border_device,
      title_device: pal.device,
      pwr_device: '#ffffff',
      kwh_device: 'rgba(255, 255, 255, 0.6)',
      badge_device_text: pal.device,
      badge_device_bg: pal.bg_device,
      bar_device_soc: pal.device,

      // 5. Grid Out (Export) Box Elements
      bg_export: pal.bg_export,
      border_export: pal.border_export,
      title_export: pal.export,
      pwr_export: '#ffffff',
      kwh_export: 'rgba(255, 255, 255, 0.6)',

      // 6. Dedicated Energy Flow Lines
      flow_solar_home: pal.solar,
      flow_solar_tesla: pal.solar,
      flow_solar_grid: pal.solar,
      flow_grid_home: pal.grid,
      flow_grid_tesla: pal.grid,
      flow_battery_home: pal.device,
      flow_battery_grid: pal.device,
      flow_rails: 'rgba(255, 255, 255, 0.05)',

      // 7. Activity Rings & Scorecard Center
      ring_autarky: pal.autarky,
      ring_import: pal.import_ring,
      ring_export: pal.export_ring,
      autarky_center_pct: '#ffffff',
      autarky_center_lbl: pal.autarky,
      ring_bg_track: 'rgba(255, 255, 255, 0.05)',

      // 8. Tabular Scorecard Rows
      bg_scorecard: 'rgba(255, 255, 255, 0.02)',
      border_scorecard: 'rgba(255, 255, 255, 0.06)',
      row_self_consumed_title: pal.autarky,
      row_self_consumed_kwh: '#ffffff',
      row_self_consumed_bar: pal.autarky,
      row_grid_reliance_title: pal.import_ring,
      row_grid_reliance_kwh: '#ffffff',
      row_grid_reliance_bar: pal.import_ring,
      row_exported_title: pal.export_ring,
      row_exported_kwh: '#ffffff',
      row_exported_bar: pal.export_ring
    };

    // 1. Solar Box
    const cSolarBg = colors.bg_solar || d.bg_solar;
    const cSolarBorder = colors.border_solar || d.border_solar;
    const cTitleSolar = colors.title_solar || d.title_solar;
    const cPwrSolar = colors.pwr_solar || d.pwr_solar;
    const cKwhSolar = colors.kwh_solar || d.kwh_solar;
    const cKwhSolarRem = colors.kwh_solar_rem || d.kwh_solar_rem;
    const cBadgeSolarText = colors.badge_solar_text || d.badge_solar_text;
    const cBadgeSolarBg = colors.badge_solar_bg || d.badge_solar_bg;
    const cBarSolar = colors.bar_solar_forecast || d.bar_solar_forecast;

    // 2. Grid In Box
    const cGridBg = colors.bg_grid || d.bg_grid;
    const cGridBorder = colors.border_grid || d.border_grid;
    const cTitleGrid = colors.title_grid || d.title_grid;
    const cPwrGrid = colors.pwr_grid || d.pwr_grid;
    const cKwhGrid = colors.kwh_grid || d.kwh_grid;
    const cBadgeGridText = colors.badge_grid_text || d.badge_grid_text;
    const cBadgeGridBg = colors.badge_grid_bg || d.badge_grid_bg;
    const cBarGridLimit = colors.bar_grid_limit || d.bar_grid_limit;

    // 3. Home Box
    const cHomeBg = colors.bg_home || d.bg_home;
    const cHomeBorder = colors.border_home || d.border_home;
    const cTitleHome = colors.title_home || d.title_home;
    const cPwrHome = colors.pwr_home || d.pwr_home;
    const cKwhHome = colors.kwh_home || d.kwh_home;
    const cBadgeHomeText = colors.badge_home_text || d.badge_home_text;
    const cBadgeHomeBg = colors.badge_home_bg || d.badge_home_bg;

    // 4. Battery / EV Box
    const cDeviceBg = colors.bg_device || d.bg_device;
    const cDeviceBorder = colors.border_device || d.border_device;
    const cTitleDevice = colors.title_device || d.title_device;
    const cPwrDevice = colors.pwr_device || d.pwr_device;
    const cKwhDevice = colors.kwh_device || d.kwh_device;
    const cBadgeDeviceText = colors.badge_device_text || d.badge_device_text;
    const cBadgeDeviceBg = colors.badge_device_bg || d.badge_device_bg;
    const cBarDeviceSoc = colors.bar_device_soc || d.bar_device_soc;
    const cBarDevice = cBarDeviceSoc;

    // 5. Grid Out (Export) Box
    const cExportBg = colors.bg_export || d.bg_export;
    const cExportBorder = colors.border_export || d.border_export;
    const cTitleExport = colors.title_export || d.title_export;
    const cPwrExport = colors.pwr_export || d.pwr_export;
    const cKwhExport = colors.kwh_export || d.kwh_export;

    // 6. Dedicated Flow Lines with Dual-Color Endpoints
    const cSolarHomeStart = colors.flow_solar_home_start || (colors.flow_solar_home ? colors.flow_solar_home : pal.solar);
    const cSolarHomeEnd = colors.flow_solar_home_end || (colors.flow_solar_home ? colors.flow_solar_home : pal.home);

    const cSolarTeslaStart = colors.flow_solar_tesla_start || (colors.flow_solar_tesla ? colors.flow_solar_tesla : pal.solar);
    const cSolarTeslaEnd = colors.flow_solar_tesla_end || (colors.flow_solar_tesla ? colors.flow_solar_tesla : pal.device);

    const cSolarGridStart = colors.flow_solar_grid_start || (colors.flow_solar_grid ? colors.flow_solar_grid : pal.solar);
    const cSolarGridEnd = colors.flow_solar_grid_end || (colors.flow_solar_grid ? colors.flow_solar_grid : pal.export);

    const cGridHomeStart = colors.flow_grid_home_start || (colors.flow_grid_home ? colors.flow_grid_home : pal.grid);
    const cGridHomeEnd = colors.flow_grid_home_end || (colors.flow_grid_home ? colors.flow_grid_home : pal.home);

    const cGridTeslaStart = colors.flow_grid_tesla_start || (colors.flow_grid_tesla ? colors.flow_grid_tesla : pal.grid);
    const cGridTeslaEnd = colors.flow_grid_tesla_end || (colors.flow_grid_tesla ? colors.flow_grid_tesla : pal.device);

    const cBatteryHomeStart = colors.flow_battery_home_start || (colors.flow_battery_home ? colors.flow_battery_home : pal.device);
    const cBatteryHomeEnd = colors.flow_battery_home_end || (colors.flow_battery_home ? colors.flow_battery_home : pal.home);

    const cBatteryGridStart = colors.flow_battery_grid_start || (colors.flow_battery_grid ? colors.flow_battery_grid : pal.device);
    const cBatteryGridEnd = colors.flow_battery_grid_end || (colors.flow_battery_grid ? colors.flow_battery_grid : pal.export);

    const cRails = colors.flow_rails || d.flow_rails;

    // 7. Activity Rings & Center Scorecard
    const cAutarky = colors.ring_autarky || d.ring_autarky;
    const cImportRing = colors.ring_import || d.ring_import;
    const cExportRing = colors.ring_export || d.ring_export;
    const cPctCenter = colors.autarky_center_pct || d.autarky_center_pct;
    const cLblCenter = colors.autarky_center_lbl || d.autarky_center_lbl;
    const cRingBgTrack = colors.ring_bg_track || d.ring_bg_track;

    // 8. Tabular Scorecard Rows
    const cScorecardBg = colors.bg_scorecard || d.bg_scorecard;
    const cScorecardBorder = colors.border_scorecard || d.border_scorecard;
    const cRowSelfTitle = colors.row_self_consumed_title || d.row_self_consumed_title;
    const cRowSelfKwh = colors.row_self_consumed_kwh || d.row_self_consumed_kwh;
    const cRowSelfBar = colors.row_self_consumed_bar || d.row_self_consumed_bar;

    const cRowGridTitle = colors.row_grid_reliance_title || d.row_grid_reliance_title;
    const cRowGridKwh = colors.row_grid_reliance_kwh || d.row_grid_reliance_kwh;
    const cRowGridBar = colors.row_grid_reliance_bar || d.row_grid_reliance_bar;

    const cRowExportTitle = colors.row_exported_title || d.row_exported_title;
    const cRowExportKwh = colors.row_exported_kwh || d.row_exported_kwh;
    const cRowExportBar = colors.row_exported_bar || d.row_exported_bar;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', Roboto, sans-serif;
          --ares-font-scale: ${this._fontScale || 1.0};
        }
        ha-card {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 14px 14px;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(145deg, #11141a 0%, #1a1e26 100%);
          border: 1px solid ${pal.card_border};
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
          isolation: isolate;
          container-type: inline-size;
          container-name: chromaflow;
        }

                .bg-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, ${isFitness ? 'rgba(250, 17, 79, 0.08)' : 'rgba(0, 229, 255, 0.08)'} 0%, rgba(14, 17, 24, 0.98) 60%);
          pointer-events: none;
          z-index: 0;
        }
        .content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .canvas-area {
          position: relative;
          width: 100%;
          height: calc(232px + max(0px, (var(--ares-font-scale, 1) - 1) * 90px));
          background: transparent;
          border: none;
          overflow: hidden;
          transition: height 0.3s ease;
        }
        .col-left {
          position: absolute;
          left: 3px;
          top: 3px;
          bottom: 3px;
          width: calc(134px + max(0px, (var(--ares-font-scale, 1) - 1) * 40px));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 8px;
          z-index: 2;
          box-sizing: border-box;
        }
        .col-right {
          position: absolute;
          right: 3px;
          top: 3px;
          bottom: 3px;
          width: calc(134px + max(0px, (var(--ares-font-scale, 1) - 1) * 40px));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 6px;
          z-index: 2;
          box-sizing: border-box;
        }
        svg.flow-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }
        /* Static, non-moving background rails */
        .rail-path {
          fill: none;
          stroke: ${cRails};
          stroke-width: 2.2;
          opacity: 0.85;
        }
        /* Active animated flowing power lines */
        @keyframes flowSeamless16 {
          0% { stroke-dashoffset: 16; }
          100% { stroke-dashoffset: 0; }
        }
        @-webkit-keyframes flowSeamless16 {
          0% { stroke-dashoffset: 16; }
          100% { stroke-dashoffset: 0; }
        }
        .flow-path {
          fill: none;
          stroke-linecap: round;
          stroke-dasharray: 6 10;
          animation: flowSeamless16 1s linear infinite;
          -webkit-animation: flowSeamless16 1s linear infinite;
        }
        .node {
          position: relative;
          width: 100%;
          border-radius: 10px;
          padding: 6px 8px;
          box-sizing: border-box;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .node-pwr {
          font-size: calc(17.5px * var(--ares-font-scale, 1));
          font-weight: 900;
          line-height: 1.1;
          margin-top: 2px;
          font-variant-numeric: tabular-nums;
        }
        .node-kwh {
          font-size: calc(9.5px * var(--ares-font-scale, 1));
          font-weight: 600;
          margin-top: 1.5px;
        }
        .node-title {
          font-size: calc(11px * var(--ares-font-scale, 1));
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 4px;
          min-width: 0;
        }
        .badge {
          font-size: calc(7px * max(0.9, min(1.15, var(--ares-font-scale, 1))));
          font-weight: 800;
          padding: 1px 3.5px;
          border-radius: 4px;
          white-space: nowrap;
          flex-shrink: 0;
        }

        /* Responsive Breakpoints & Card Picker Adaptive Compact Mode */
        @container chromaflow (max-width: 360px), :host-context(.compact-view), .compact-view {
          .col-left, .col-right {
            width: clamp(86px, 34%, 102px) !important;
          }
          .node {
            padding: 4px 5px !important;
          }
          .node-title {
            font-size: calc(9.5px * var(--ares-font-scale, 1)) !important;
            gap: 2px !important;
          }
          .badge {
            font-size: 6px !important;
            padding: 0.5px 2px !important;
            max-width: 46px !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }
          .node-pwr {
            font-size: calc(14px * var(--ares-font-scale, 1)) !important;
          }
          .node-kwh {
            font-size: calc(7.5px * var(--ares-font-scale, 1)) !important;
          }
          .scorecard {
            padding: 8px 8px !important;
            gap: 8px !important;
          }
          .rings-container {
            width: 90px !important;
            height: 90px !important;
          }
          .rings-center-text {
            width: 50px !important;
          }
          .rings-center-pct {
            font-size: 15px !important;
          }
          .rings-center-sub {
            font-size: 7px !important;
          }
          .kpi-title {
            font-size: calc(8.5px * var(--ares-font-scale, 1)) !important;
          }
          .kpi-pct {
            font-size: calc(13px * var(--ares-font-scale, 1)) !important;
          }
          .kpi-kwh {
            font-size: calc(8.5px * var(--ares-font-scale, 1)) !important;
          }
          .kpi-tag {
            font-size: 7px !important;
          }
        }

        @container chromaflow (max-width: 315px), :host-context(.mini-view), .mini-view {
          .col-left, .col-right {
            width: clamp(78px, 32%, 92px) !important;
          }
          .node {
            padding: 3px 4px !important;
          }
          .node-title {
            font-size: calc(8.5px * var(--ares-font-scale, 1)) !important;
            gap: 2px !important;
          }
          .badge {
            font-size: 5px !important;
            padding: 0.5px 1.5px !important;
            max-width: 38px !important;
          }
          .node-pwr {
            font-size: calc(12.5px * var(--ares-font-scale, 1)) !important;
          }
          .node-kwh {
            font-size: calc(7px * var(--ares-font-scale, 1)) !important;
          }
          .scorecard {
            padding: 6px 6px !important;
            gap: 6px !important;
          }
          .rings-container {
            width: 78px !important;
            height: 78px !important;
          }
          .rings-center-text {
            width: 44px !important;
          }
          .rings-center-pct {
            font-size: 14px !important;
          }
          .rings-center-sub {
            font-size: 6.5px !important;
          }
          .rings-center-sub2 {
            display: none !important;
          }
          .kpi-title {
            font-size: calc(8px * var(--ares-font-scale, 1)) !important;
          }
          .kpi-pct {
            font-size: calc(12px * var(--ares-font-scale, 1)) !important;
          }
          .kpi-kwh {
            font-size: calc(8px * var(--ares-font-scale, 1)) !important;
          }
          .kpi-tag {
            display: none !important;
          }
        }
      </style>

      <ha-card>
        <div class="bg-glow"></div>
        <div class="content">
          <!-- Flow Canvas Area -->
          <div class="canvas-area">
            <svg id="flow-svg" class="flow-svg" viewBox="0 0 400 232">
              <defs>
                <linearGradient id="flowSolarHome" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cSolarHomeStart}" />
                  <stop offset="100%" stop-color="${cSolarHomeEnd}" />
                </linearGradient>
                <linearGradient id="flowSolarTesla" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cSolarTeslaStart}" />
                  <stop offset="100%" stop-color="${cSolarTeslaEnd}" />
                </linearGradient>
                <linearGradient id="flowSolarGrid" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cSolarGridStart}" />
                  <stop offset="100%" stop-color="${cSolarGridEnd}" />
                </linearGradient>
                <linearGradient id="flowGridHome" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cGridHomeStart}" />
                  <stop offset="100%" stop-color="${cGridHomeEnd}" />
                </linearGradient>
                <linearGradient id="flowGridTesla" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cGridTeslaStart}" />
                  <stop offset="100%" stop-color="${cGridTeslaEnd}" />
                </linearGradient>
                <linearGradient id="flowBatteryHome" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stop-color="${cBatteryHomeStart}" />
                  <stop offset="100%" stop-color="${cBatteryHomeEnd}" />
                </linearGradient>
                <linearGradient id="flowBatteryGrid" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="${cBatteryGridStart}" />
                  <stop offset="100%" stop-color="${cBatteryGridEnd}" />
                </linearGradient>
              </defs>

              <!-- Inactive Background Rails (Static, Non-Moving) -->
              <path id="rail-solar-home" class="rail-path" />
              <path id="rail-solar-tesla" class="rail-path" />
              <path id="rail-solar-grid" class="rail-path" />
              <path id="rail-grid-home" class="rail-path" />
              <path id="rail-grid-tesla" class="rail-path" />
              <path id="rail-battery-home" class="rail-path" style="display: ${isBattery ? 'block' : 'none'};" />
              <path id="rail-battery-grid" class="rail-path" style="display: ${isBattery ? 'block' : 'none'};" />

              <!-- Active Colored Flows (Animated) -->
              <path id="flow-solar-home" class="flow-path" stroke="url(#flowSolarHome)" stroke-width="3" style="display: none;" />
              <path id="flow-solar-tesla" class="flow-path" stroke="url(#flowSolarTesla)" stroke-width="3" style="display: none;" />
              <path id="flow-battery-home" class="flow-path" stroke="url(#flowBatteryHome)" stroke-width="3" style="display: none;" />
              <path id="flow-battery-grid" class="flow-path" stroke="url(#flowBatteryGrid)" stroke-width="3" style="display: none;" />
              <path id="flow-solar-grid" class="flow-path" stroke="url(#flowSolarGrid)" stroke-width="3" style="display: none;" />
              <path id="flow-grid-home" class="flow-path" stroke="url(#flowGridHome)" stroke-width="3" style="display: none;" />
              <path id="flow-grid-tesla" class="flow-path" stroke="url(#flowGridTesla)" stroke-width="3" style="display: none;" />
            </svg>

            <!-- Column: Left (Solar, Grid In) -->
            <div id="col-left" class="col-left">
              <!-- Node: Solar (Left-Top) -->
              <div id="node-solar" class="node" style="min-height: 70px; display: flex; flex-direction: column; justify-content: center; background: ${cSolarBg}; border: 1.5px solid ${cSolarBorder};">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleSolar}; min-width: 0; flex-shrink: 1;">
                    <span style="font-size: 13px; line-height: 1; flex-shrink: 0;">☀️</span>
                    <span id="lbl-solar" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;">${lbls.solar}</span>
                  </div>
                  <span id="badge-solar-forecast" class="badge" style="color: ${cBadgeSolarText}; background: ${cBadgeSolarBg}; border: 0.5px solid ${cSolarBorder};">-- kWh EST</span>
                </div>
                <div id="pwr-solar" class="node-pwr" style="color: ${cPwrSolar};">0 W</div>
                <div id="kwh-solar" class="node-kwh" style="color: ${cKwhSolar};">0.00 kWh today</div>
                <div id="kwh-solar-rem" class="node-kwh" style="display: none; color: ${cKwhSolarRem};">0.0 kWh remaining</div>
                <div id="bar-solar-forecast-box" style="margin-top: 4px; width: 100%; height: 3px; background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden; display: none;">
                  <div id="bar-solar-forecast-fill" style="width: 0%; height: 100%; background: ${cBarSolar}; transition: width 0.4s ease;"></div>
                </div>
              </div>

              <!-- Node: Grid In (Left-Bottom) -->
              <div id="node-grid" class="node" style="background: ${cGridBg}; border: 1.5px solid ${cGridBorder};">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleGrid}; min-width: 0; flex-shrink: 1;">
                    <span style="font-size: 12px; line-height: 1; flex-shrink: 0;">🏭</span>
                    <span id="lbl-grid-in" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;">${lbls.grid_in}</span>
                  </div>
                  <span id="badge-grid-guard" class="badge" style="color: ${cBadgeGridText}; background: ${cBadgeGridBg}; border: 0.5px solid ${cGridBorder}; display: none;">4.2 kW MAX</span>
                </div>
                <div id="pwr-grid" class="node-pwr" style="color: ${cPwrGrid};">0 W</div>
                <div id="kwh-grid" class="node-kwh" style="color: ${cKwhGrid};">0.00 kWh imported</div>
              </div>
            </div>

            <!-- Column: Right (Home, Middle Device, Grid Out) -->
            <div id="col-right" class="col-right">
              <!-- Node: Home (Right-Top) -->
              <div id="node-home" class="node" style="background: ${cHomeBg}; border: 1.5px solid ${cHomeBorder};">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleHome}; min-width: 0; flex-shrink: 1;">
                    <span style="font-size: 12px; line-height: 1; flex-shrink: 0;">🏠</span>
                    <span id="lbl-home" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;">${lbls.home}</span>
                  </div>
                  <span id="badge-home" class="badge" style="color: ${cBadgeHomeText}; background: ${cBadgeHomeBg}; border: 0.5px solid ${cHomeBorder};">100% SOLAR</span>
                </div>
                <div id="pwr-home" class="node-pwr" style="color: ${cPwrHome};">0 W</div>
                <div id="kwh-home" class="node-kwh" style="color: ${cKwhHome};">0.00 kWh solar</div>
              </div>

              <!-- Node: Middle Device (Right-Center) -->
              <div id="node-tesla" class="node" style="background: ${cDeviceBg}; border: 1.5px solid ${cDeviceBorder};">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleDevice}; min-width: 0; flex-shrink: 1;">
                    <span id="icon-dev" style="font-size: 12px; line-height: 1; flex-shrink: 0;">${devIcon}</span>
                    <span id="lbl-dev" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;">${devName}</span>
                  </div>
                  <span id="badge-tesla" class="badge" style="color: ${cBadgeDeviceText}; background: ${cBadgeDeviceBg}; border: 0.5px solid ${cDeviceBorder}; display: none;">CHARGING</span>
                </div>
                <div id="pwr-tesla" class="node-pwr" style="color: ${cPwrDevice};">0 W</div>
                <div id="kwh-tesla" class="node-kwh" style="color: ${cKwhDevice};">0.00 kWh charged</div>
                <div id="bar-soc-box" style="margin-top: 4px; width: 100%; height: 3px; background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden; display: none;">
                  <div id="bar-soc-fill" style="width: 0%; height: 100%; background: ${cBarDevice}; transition: width 0.4s ease;"></div>
                </div>
              </div>

              <!-- Node: Grid Out (Right-Bottom) -->
              <div id="node-export" class="node" style="background: ${cExportBg}; border: 1.5px solid ${cExportBorder};">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleExport}; min-width: 0; flex-shrink: 1;">
                    <span style="font-size: 12px; line-height: 1; flex-shrink: 0;">🏭</span>
                    <span id="lbl-grid-out" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;">${lbls.grid_out}</span>
                  </div>
                </div>
                <div id="pwr-export" class="node-pwr" style="color: ${cPwrExport};">0 W</div>
                <div id="kwh-export" class="node-kwh" style="color: ${cKwhExport};">0.00 kWh exported</div>
              </div>
            </div>
          </div>

          <!-- Bottom: Autarky Scorecard -->
          <div class="scorecard" style="background: ${cScorecardBg}; border-radius: 14px; border: 1px solid ${cScorecardBorder}; padding: 12px 14px; display: flex; align-items: center; gap: 14px;">
            <!-- Left: Concentric Activity Rings -->
            <div class="rings-container" style="position: relative; width: 136px; height: 136px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
              <svg viewBox="0 0 156 156" style="width: 100%; height: 100%; transform: rotate(-90deg);">
                <!-- Ring 1 (Outer): Autarky -->
                <circle cx="78" cy="78" r="68" fill="none" stroke="${cRingBgTrack}" stroke-width="8" />
                <circle id="ring-autarky" cx="78" cy="78" r="68" fill="none" stroke="${cAutarky}" stroke-width="8" stroke-linecap="round" stroke-dasharray="427.26" stroke-dashoffset="427.26" style="transition: stroke-dashoffset 0.6s ease;" />

                <!-- Ring 2 (Middle): Grid Import -->
                <circle cx="78" cy="78" r="54" fill="none" stroke="${cRingBgTrack}" stroke-width="8" />
                <circle id="ring-import" cx="78" cy="78" r="54" fill="none" stroke="${cImportRing}" stroke-width="8" stroke-linecap="round" stroke-dasharray="339.29" stroke-dashoffset="339.29" style="transition: stroke-dashoffset 0.6s ease;" />

                <!-- Ring 3 (Inner): Grid Export -->
                <circle cx="78" cy="78" r="40" fill="none" stroke="${cRingBgTrack}" stroke-width="8" />
                <circle id="ring-export" cx="78" cy="78" r="40" fill="none" stroke="${cExportRing}" stroke-width="8" stroke-linecap="round" stroke-dasharray="251.33" stroke-dashoffset="251.33" style="transition: stroke-dashoffset 0.6s ease;" />
              </svg>
              <div class="rings-center-text" style="position: absolute; text-align: center; pointer-events: none; width: 72px;">
                <div id="autarky-center-pct" class="rings-center-pct" style="font-size: clamp(18px, calc(20px * var(--ares-font-scale, 1)), 23px); font-weight: 900; color: ${cPctCenter}; line-height: 1; font-variant-numeric: tabular-nums;">0%</div>
                <div class="rings-center-sub" style="font-size: calc(8.5px * var(--ares-font-scale, 1)); font-weight: 800; color: ${cLblCenter}; text-transform: uppercase; letter-spacing: 0.6px; margin-top: 3px;"><span id="lbl-autarky">${lbls.autarky}</span></div>
                <div class="rings-center-sub2" style="font-size: calc(7.5px * var(--ares-font-scale, 1)); color: rgba(255, 255, 255, 0.45); line-height: 1; margin-top: 1px;"><span id="lbl-autarky-sub">${lbls.autarky_sub}</span></div>
              </div>
            </div>

            <!-- Right: Tabular KPI Rows -->
            <div class="kpi-column" style="display: flex; flex-direction: column; gap: 8px; flex-grow: 1; min-width: 0;">
              <!-- Row 1: Solar Self-Consumed -->
              <div style="display: flex; flex-direction: column; gap: 2px; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span class="kpi-title" style="font-size: calc(10.5px * var(--ares-font-scale, 1)); font-weight: 800; color: ${cRowSelfTitle}; letter-spacing: 0.4px; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;"><span id="lbl-self-consumed">${lbls.self_consumed}</span></span>
                  <span id="row-autarky-pct" class="kpi-pct" style="font-size: calc(16px * var(--ares-font-scale, 1)); font-weight: 900; color: ${cRowSelfTitle}; line-height: 1; font-variant-numeric: tabular-nums; white-space: nowrap; flex-shrink: 0; margin-left: 4px;">0%</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span id="row-solar-kwh" class="kpi-kwh" style="font-size: calc(11px * var(--ares-font-scale, 1)); font-weight: 800; color: ${cRowSelfKwh}; font-variant-numeric: tabular-nums; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;">
                    0.00 <span style="font-size: calc(10px * var(--ares-font-scale, 1)); font-weight: 600; color: rgba(255,255,255,0.45);">kWh &bull; <span id="lbl-self-consumed-sub">${lbls.self_consumed_sub}</span></span>
                  </span>
                  <span class="kpi-tag" style="font-size: calc(8.5px * var(--ares-font-scale, 1)); font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.3px; flex-shrink: 0; margin-left: 4px;">OF LOAD</span>
                </div>
                <div style="width: 100%; height: 4px; border-radius: 2px; background: rgba(255, 255, 255, 0.08); overflow: hidden; margin-top: 2px;">
                  <div id="bar-solar-self-consumed" style="width: 0%; height: 100%; background: ${cRowSelfBar}; border-radius: 2px; transition: width 0.6s ease;"></div>
                </div>
              </div>

              <!-- Row 2: Utility Grid Reliance -->
              <div style="display: flex; flex-direction: column; gap: 2px; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span class="kpi-title" style="font-size: calc(10.5px * var(--ares-font-scale, 1)); font-weight: 800; color: ${cRowGridTitle}; letter-spacing: 0.4px; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;"><span id="lbl-grid-reliance">${lbls.grid_reliance}</span></span>
                  <span id="row-grid-pct" class="kpi-pct" style="font-size: calc(16px * var(--ares-font-scale, 1)); font-weight: 900; color: ${cRowGridTitle}; line-height: 1; font-variant-numeric: tabular-nums; white-space: nowrap; flex-shrink: 0; margin-left: 4px;">0%</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span id="row-grid-kwh" class="kpi-kwh" style="font-size: calc(11px * var(--ares-font-scale, 1)); font-weight: 800; color: ${cRowGridKwh}; font-variant-numeric: tabular-nums; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;">
                    0.00 <span style="font-size: calc(10px * var(--ares-font-scale, 1)); font-weight: 600; color: rgba(255,255,255,0.45);">kWh &bull; <span id="lbl-grid-reliance-sub">${lbls.grid_reliance_sub}</span></span>
                  </span>
                  <span class="kpi-tag" style="font-size: calc(8.5px * var(--ares-font-scale, 1)); font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.3px; flex-shrink: 0; margin-left: 4px;">OF LOAD</span>
                </div>
                <div style="width: 100%; height: 4px; border-radius: 2px; background: ${cGridBg}; overflow: hidden; margin-top: 2px;">
                  <div id="bar-grid-reliance" style="width: 0%; height: 100%; background: ${cRowGridBar}; border-radius: 2px; transition: width 0.6s ease;"></div>
                </div>
              </div>

              <!-- Row 3: Exported to Grid -->
              <div style="display: flex; flex-direction: column; gap: 2px; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span class="kpi-title" style="font-size: calc(10.5px * var(--ares-font-scale, 1)); font-weight: 800; color: ${cRowExportTitle}; letter-spacing: 0.4px; text-transform: uppercase; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;"><span id="lbl-exported">${lbls.exported}</span></span>
                  <span id="row-export-pct" class="kpi-pct" style="font-size: calc(16px * var(--ares-font-scale, 1)); font-weight: 900; color: ${cRowExportTitle}; line-height: 1; font-variant-numeric: tabular-nums; white-space: nowrap; flex-shrink: 0; margin-left: 4px;">0%</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span id="row-export-kwh" class="kpi-kwh" style="font-size: calc(11px * var(--ares-font-scale, 1)); font-weight: 800; color: ${cRowExportKwh}; font-variant-numeric: tabular-nums; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;">
                    0.00 <span style="font-size: calc(10px * var(--ares-font-scale, 1)); font-weight: 600; color: rgba(255,255,255,0.45);">kWh &bull; <span id="lbl-exported-sub">${lbls.exported_sub}</span></span>
                  </span>
                  <span class="kpi-tag" style="font-size: calc(8.5px * var(--ares-font-scale, 1)); font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.3px; flex-shrink: 0; margin-left: 4px;">OF SOLAR</span>
                </div>
                <div style="width: 100%; height: 4px; border-radius: 2px; background: ${cExportBg}; overflow: hidden; margin-top: 2px;">
                  <div id="bar-export" style="width: 0%; height: 100%; background: ${cRowExportBar}; border-radius: 2px; transition: width 0.6s ease;"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ha-card>
    `;

    this._canvasArea = this.shadowRoot.querySelector('.canvas-area');
    this._svg = this.shadowRoot.getElementById('flow-svg');

    const getEl = (id) => this.shadowRoot.getElementById(id);
    this._el = {
      colLeft: getEl('col-left'),
      colRight: getEl('col-right'),

      pwrSolar: getEl('pwr-solar'),
      kwhSolar: getEl('kwh-solar'),
      kwhSolarRem: getEl('kwh-solar-rem'),
      nodeSolar: getEl('node-solar'),
      badgeSolarForecast: getEl('badge-solar-forecast'),
      barSolarForecastBox: getEl('bar-solar-forecast-box'),
      barSolarForecastFill: getEl('bar-solar-forecast-fill'),

      pwrGrid: getEl('pwr-grid'),
      kwhGrid: getEl('kwh-grid'),
      nodeGrid: getEl('node-grid'),
      badgeGridGuard: getEl('badge-grid-guard'),

      pwrHome: getEl('pwr-home'),
      kwhHome: getEl('kwh-home'),
      badgeHome: getEl('badge-home'),
      nodeHome: getEl('node-home'),

      pwrTesla: getEl('pwr-tesla'),
      kwhTesla: getEl('kwh-tesla'),
      badgeTesla: getEl('badge-tesla'),
      nodeTesla: getEl('node-tesla'),
      lblDev: getEl('lbl-dev'),
      iconDev: getEl('icon-dev'),
      barSocBox: getEl('bar-soc-box'),
      barSocFill: getEl('bar-soc-fill'),

      pwrExport: getEl('pwr-export'),
      kwhExport: getEl('kwh-export'),
      nodeExport: getEl('node-export'),

      railSolarHome: getEl('rail-solar-home'),
      railSolarTesla: getEl('rail-solar-tesla'),
      railSolarGrid: getEl('rail-solar-grid'),
      railGridHome: getEl('rail-grid-home'),
      railGridTesla: getEl('rail-grid-tesla'),
      railBatteryHome: getEl('rail-battery-home'),
      railBatteryGrid: getEl('rail-battery-grid'),

      flowSolarHome: getEl('flow-solar-home'),
      flowSolarTesla: getEl('flow-solar-tesla'),
      flowBatteryHome: getEl('flow-battery-home'),
      flowBatteryGrid: getEl('flow-battery-grid'),
      flowSolarGrid: getEl('flow-solar-grid'),
      flowGridHome: getEl('flow-grid-home'),
      flowGridTesla: getEl('flow-grid-tesla'),

      // Scorecard elements
      ringAutarky: getEl('ring-autarky'),
      ringImport: getEl('ring-import'),
      ringExport: getEl('ring-export'),
      autarkyCenterPct: getEl('autarky-center-pct'),

      rowAutarkyPct: getEl('row-autarky-pct'),
      rowSolarKwh: getEl('row-solar-kwh'),
      barSolarSelfConsumed: getEl('bar-solar-self-consumed'),

      rowGridPct: getEl('row-grid-pct'),
      rowGridKwh: getEl('row-grid-kwh'),
      barGridReliance: getEl('bar-grid-reliance'),

      rowExportPct: getEl('row-export-pct'),
      rowExportKwh: getEl('row-export-kwh'),
      barExport: getEl('bar-export')
    };

    // ResizeObserver on canvas area
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.round(entry.contentRect.width);
        const h = Math.round(entry.contentRect.height);
        if (w > 0 && (w !== this._currentW || h !== this._currentH)) {
          this._currentW = w;
          this._currentH = h;
          this._updateFlowPaths(w, h);
        }
      }
    });
    this._resizeObserver.observe(this._canvasArea);
    this._applyConfigVisibility();

    // Trigger multiple layout passes so card dialog preview renders 100% attached
    requestAnimationFrame(() => this._updateFlowPaths());
    setTimeout(() => this._updateFlowPaths(), 60);
    setTimeout(() => this._updateFlowPaths(), 200);
  }

  _updateFlowPaths(w, h) {
    if (!this._canvasArea || !this._svg || !this._el) return;
    const width = Math.round(w || this._canvasArea.clientWidth || 400);
    const height = Math.round(h || this._canvasArea.clientHeight || 232);
    if (width <= 0 || height <= 0) return;

    const card = this.shadowRoot.querySelector('ha-card');
    if (card && card.classList && typeof card.classList.toggle === 'function') {
      card.classList.toggle('compact-view', width <= 360);
      card.classList.toggle('mini-view', width <= 315);
    }

    this._svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const defaultColW = width <= 315 ? 86 : (width <= 360 ? 98 : 134);
    const cLeft = (this._el.colLeft && this._el.colLeft.offsetWidth > 0) ? this._el.colLeft : { offsetLeft: 3, offsetWidth: defaultColW, offsetTop: 3 };
    const cRight = (this._el.colRight && this._el.colRight.offsetWidth > 0) ? this._el.colRight : { offsetLeft: width - 3 - defaultColW, offsetWidth: defaultColW, offsetTop: 3 };

    // Bulletproof offset geometry immune to transforms or viewport zoom
    const startX = Math.round(cLeft.offsetLeft + cLeft.offsetWidth);
    const endX = Math.round(cRight.offsetLeft);

    const nodeSolar = this._el.nodeSolar || { offsetTop: 0, offsetHeight: 77 };
    const nodeGrid = this._el.nodeGrid || { offsetTop: height - 70, offsetHeight: 67 };
    const nodeHome = this._el.nodeHome || { offsetTop: 0, offsetHeight: 62 };
    const nodeTesla = this._el.nodeTesla || { offsetTop: Math.round(height * 0.35), offsetHeight: 70 };
    const nodeExport = this._el.nodeExport || { offsetTop: height - 63, offsetHeight: 60 };

    // Classic S-curve geometry: lines emerge from lower on the Solar box and sweep UPWARD into Home
    const solarBaseY = Math.round(cLeft.offsetTop + nodeSolar.offsetTop + Math.max(70, nodeSolar.offsetHeight));
    const sHomeY = Math.max(48, solarBaseY - 22);
    const sTeslaY = sHomeY + 9;
    const sGridY = sTeslaY + 9;

    const gridBaseY = Math.round(cLeft.offsetTop + nodeGrid.offsetTop);
    const gHomeY = gridBaseY + 16;
    const gTeslaY = gHomeY + 10;

    const homeTargetY = Math.round(cRight.offsetTop + nodeHome.offsetTop + (nodeHome.offsetHeight / 2));
    const teslaTargetY = Math.round(cRight.offsetTop + nodeTesla.offsetTop + (nodeTesla.offsetHeight / 2));
    const exportTargetY = Math.round(cRight.offsetTop + nodeExport.offsetTop + (nodeExport.offsetHeight / 2));

    const cp1X = Math.round(startX + (endX - startX) * 0.45);
    const cp2X = Math.round(startX + (endX - startX) * 0.55);

    const pSolarHome = `M ${startX} ${sHomeY} C ${cp1X} ${sHomeY}, ${cp2X} ${homeTargetY}, ${endX} ${homeTargetY}`;
    const pSolarTesla = `M ${startX} ${sTeslaY} C ${cp1X} ${sTeslaY}, ${cp2X} ${teslaTargetY}, ${endX} ${teslaTargetY}`;
    const pSolarGrid = `M ${startX} ${sGridY} C ${cp1X} ${sGridY}, ${cp2X} ${exportTargetY}, ${endX} ${exportTargetY}`;

    const pGridHome = `M ${startX} ${gHomeY} C ${cp1X} ${gHomeY}, ${cp2X} ${homeTargetY + 5}, ${endX} ${homeTargetY + 5}`;
    const pGridTesla = `M ${startX} ${gTeslaY} C ${cp1X} ${gTeslaY}, ${cp2X} ${teslaTargetY + 5}, ${endX} ${teslaTargetY + 5}`;

    const maxSweep = Math.max(12, (endX - startX) * 0.4);
    const cpArcX = Math.round(endX - Math.min(36, Math.min(maxSweep, (endX - startX) - 16)));
    const teslaTopY = Math.round(cRight.offsetTop + nodeTesla.offsetTop);
    const teslaBottomY = teslaTopY + nodeTesla.offsetHeight;
    const homeBottomY = Math.round(cRight.offsetTop + nodeHome.offsetTop + nodeHome.offsetHeight);
    const exportTopY = Math.round(cRight.offsetTop + nodeExport.offsetTop);

    const pBatteryHome = `M ${endX} ${teslaTopY + 14} C ${cpArcX} ${teslaTopY + 14}, ${cpArcX} ${homeBottomY - 8}, ${endX} ${homeBottomY - 8}`;
    const pBatteryGrid = `M ${endX} ${teslaBottomY - 14} C ${cpArcX} ${teslaBottomY - 14}, ${cpArcX} ${exportTopY + 8}, ${endX} ${exportTopY + 8}`;

    const setAttr = (el, d) => { if (el) el.setAttribute('d', d); };

    setAttr(this._el.railSolarHome, pSolarHome);
    setAttr(this._el.railSolarTesla, pSolarTesla);
    setAttr(this._el.railSolarGrid, pSolarGrid);
    setAttr(this._el.railGridHome, pGridHome);
    setAttr(this._el.railGridTesla, pGridTesla);
    setAttr(this._el.railBatteryHome, pBatteryHome);
    setAttr(this._el.railBatteryGrid, pBatteryGrid);

    setAttr(this._el.flowSolarHome, pSolarHome);
    setAttr(this._el.flowSolarTesla, pSolarTesla);
    setAttr(this._el.flowBatteryHome, pBatteryHome);
    setAttr(this._el.flowBatteryGrid, pBatteryGrid);
    setAttr(this._el.flowSolarGrid, pSolarGrid);
    setAttr(this._el.flowGridHome, pGridHome);
    setAttr(this._el.flowGridTesla, pGridTesla);
  }

  _applyConfigVisibility() {
    if (!this._el) return;
    const showFc = (this._config?.show_solar_forecast !== false);
    if (this._el.barSolarForecastBox) this._el.barSolarForecastBox.style.display = showFc ? 'block' : 'none';
    if (this._el.badgeSolarForecast) this._el.badgeSolarForecast.style.display = showFc ? 'inline-block' : 'none';
    if (this._el.kwhSolarRem) {
      if (!showFc) this._el.kwhSolarRem.style.display = 'none';
    }

    const isBattery = this._isBatteryMode();
    if (this._el.railBatteryHome) this._el.railBatteryHome.style.display = isBattery ? 'block' : 'none';
    if (this._el.railBatteryGrid) this._el.railBatteryGrid.style.display = isBattery ? 'block' : 'none';
    if (this._el.flowBatteryHome && !isBattery) this._el.flowBatteryHome.style.display = 'none';
    if (this._el.flowBatteryGrid && !isBattery) this._el.flowBatteryGrid.style.display = 'none';

    requestAnimationFrame(() => this._updateFlowPaths());
  }

  _update() {
    if (!this._hass || !this._el) return;
    const el = this._el;
    const ents = this._getEntities();

    const eSolarPwr = this._hass.states[ents.solar_power];
    const eSolarYield = this._hass.states[ents.solar_daily_yield];
    const eSolcastToday = this._hass.states[ents.solcast_today];
    const eSolcastRem = this._hass.states[ents.solcast_remaining];

    const eGridPwr = this._hass.states[ents.grid_power];
    const eGridExportPwr = this._hass.states[ents.grid_export_power];
    const eGridImport = this._hass.states[ents.grid_daily_import];
    const eGridExport = this._hass.states[ents.grid_daily_export];
    const eLoadPwr = this._hass.states[ents.load_power];

    const isBattery = this._isBatteryMode();
    const eBattPwr = this._hass.states[ents.battery_power];
    const eBattSoc = this._hass.states[ents.battery_soc];
    const eBattCharge = this._hass.states[ents.battery_daily_charge];
    const eBattDischarge = this._hass.states[ents.battery_daily_discharge];

    const eEvPwr = this._hass.states[ents.ev_power];
    const eEvCharging = this._hass.states[ents.ev_charging];
    const eEvEnergy = this._hass.states[ents.ev_daily_energy];

    // Live power calculations
    const liveSolarW = Math.max(0, this._parsePower(eSolarPwr));
    let rawGridW = this._parsePower(eGridPwr);
    let liveImportW = 0;
    let liveExportW = 0;

    if (eGridExportPwr) {
      liveExportW = Math.max(0, this._parsePower(eGridExportPwr));
      liveImportW = Math.max(0, rawGridW);
    } else {
      if (rawGridW >= 0) {
        liveImportW = rawGridW;
      } else {
        liveExportW = Math.abs(rawGridW);
      }
    }

    let liveMiddleW = 0;
    let isMiddleActive = false;
    let middleKwh = 0;
    let batteryCharging = false;
    let batteryDischarging = false;
    let batteryDischargeW = 0;
    let batteryChargeW = 0;

    const positiveIsCharging = this._config.battery_positive_charging !== false;

    if (isBattery) {
      const rawBattW = this._parsePower(eBattPwr);
      if (positiveIsCharging) {
        batteryCharging = (rawBattW > 5);
        batteryDischarging = (rawBattW < -5);
        batteryChargeW = batteryCharging ? rawBattW : 0;
        batteryDischargeW = batteryDischarging ? Math.abs(rawBattW) : 0;
      } else {
        batteryDischarging = (rawBattW > 5);
        batteryCharging = (rawBattW < -5);
        batteryDischargeW = batteryDischarging ? rawBattW : 0;
        batteryChargeW = batteryCharging ? Math.abs(rawBattW) : 0;
      }
      liveMiddleW = rawBattW;
      isMiddleActive = batteryCharging || batteryDischarging;
      middleKwh = this._parseEnergy(eBattCharge) + this._parseEnergy(eBattDischarge);
    } else {
      const liveEvW = Math.max(0, this._parsePower(eEvPwr));
      const liveShellyW = this._parsePower(this._hass.states['sensor.tesla_shelly_energy_meter_0_power']);
      liveMiddleW = Math.max(liveEvW, liveShellyW);
      const evBinary = eEvCharging ? (eEvCharging.state === 'on') : false;
      isMiddleActive = (liveMiddleW > 15) || evBinary;

      // Robust EV daily energy resolution with date-guard for session history sensors (e.g. V2C Trydan)
      let evDailyKwh = 0;
      const latest = eEvEnergy?.attributes?.latest;
      if (latest && typeof latest.start === 'string') {
        if (this._isSameDay(latest.start)) {
          evDailyKwh = Number(latest.energy_kwh ?? latest.energy ?? eEvEnergy.state) || 0;
        } else {
          evDailyKwh = 0.0;
        }
      } else {
        evDailyKwh = this._parseEnergy(eEvEnergy);
      }

      // Live charging session energy fallback if currently active
      const liveSessionEnt = this._hass.states['sensor.evse_192_168_0_249_charge_energy'] ||
                             this._hass.states['sensor.v2c_trydan_charge_energy'] ||
                             this._hass.states['sensor.wallbox_energy_added'];
      const liveSessionKwh = liveSessionEnt ? this._parseEnergy(liveSessionEnt) : 0;
      middleKwh = Math.max(evDailyKwh, liveSessionKwh);
    }

    // Whole-house load power calculation
    let liveHomeW = 0;
    if (eLoadPwr) {
      liveHomeW = Math.max(0, this._parsePower(eLoadPwr));
    } else {
      let calcHome = liveSolarW + liveImportW - liveExportW;
      if (isBattery) {
        calcHome += (batteryDischargeW - batteryChargeW);
      } else {
        calcHome -= liveMiddleW;
      }
      liveHomeW = Math.max(0, calcHome);
    }

    const idleThresh = this._config.min_flow_threshold_w ?? 2;
    const maxSysKw = this._config.max_expected_power_kw ?? 7.5;
    const speedMult = typeof this._config?.speed_multiplier === 'number' ? this._config.speed_multiplier : 1.0;

    const fmtPwr = (w) => (w >= 1000 ? `${(w / 1000).toFixed(2)} kW` : `${Math.round(w)} W`);
    const fmtKwh = (kwh) => (kwh ? kwh.toFixed(2) : '0.00');

    // UI text updates
    el.pwrSolar.textContent = fmtPwr(liveSolarW);
    el.kwhSolar.textContent = `${fmtKwh(this._parseEnergy(eSolarYield))} kWh today`;

    const showFc = (this._config?.show_solar_forecast !== false);
    if (showFc && eSolcastToday) {
      const fcToday = this._parseEnergy(eSolcastToday);
      el.badgeSolarForecast.textContent = `${fcToday.toFixed(1)} kWh EST`;
      el.badgeSolarForecast.style.display = 'inline-block';

      if (eSolcastRem) {
        const fcRem = this._parseEnergy(eSolcastRem);
        el.kwhSolarRem.textContent = `${fcRem.toFixed(1)} kWh remaining`;
        el.kwhSolarRem.style.display = 'block';
      }

      if (fcToday > 0) {
        const pct = Math.min(100, Math.round((this._parseEnergy(eSolarYield) / fcToday) * 100));
        el.barSolarForecastFill.style.width = `${pct}%`;
        el.barSolarForecastBox.style.display = 'block';
      }
    } else {
      el.badgeSolarForecast.style.display = 'none';
      el.kwhSolarRem.style.display = 'none';
      el.barSolarForecastBox.style.display = 'none';
    }

    el.pwrGrid.textContent = fmtPwr(liveImportW);
    el.kwhGrid.textContent = `${fmtKwh(this._parseEnergy(eGridImport))} kWh imported`;

    const icpLimit = (this._config.contract_power_limit_kw || 4.2) * 1000;
    const icpWarnRatio = this._config.contract_warning_pct || 0.85;
    if (liveImportW >= icpLimit * icpWarnRatio) {
      el.badgeGridGuard.textContent = `${(icpLimit / 1000).toFixed(1)} kW MAX`;
      el.badgeGridGuard.style.display = 'inline-block';
    } else {
      el.badgeGridGuard.style.display = 'none';
    }

    const kwhSolarYield = this._parseEnergy(eSolarYield);
    const kwhGridImport = this._parseEnergy(eGridImport);
    const kwhGridExport = this._parseEnergy(eGridExport);
    const selfConsumedKwh = Math.max(0, kwhSolarYield - kwhGridExport);
    const homeSolarKwh = (!isBattery && middleKwh > 0) ? Math.max(0, selfConsumedKwh - middleKwh) : selfConsumedKwh;

    el.pwrHome.textContent = fmtPwr(liveHomeW);
    el.kwhHome.textContent = `${fmtKwh(homeSolarKwh)} kWh solar`;

    el.pwrTesla.textContent = fmtPwr(Math.abs(liveMiddleW));
    if (isBattery) {
      const soc = this._parsePercent(eBattSoc);
      el.kwhTesla.textContent = soc !== null ? `${soc}% SoC` : `${fmtKwh(middleKwh)} kWh`;
      if (soc !== null) {
        el.barSocFill.style.width = `${Math.min(100, Math.max(0, soc))}%`;
        el.barSocBox.style.display = 'block';
      }
      if (batteryCharging) {
        el.badgeTesla.textContent = 'CHARGING';
        el.badgeTesla.style.display = 'inline-block';
      } else if (batteryDischarging) {
        el.badgeTesla.textContent = 'DISCHARGING';
        el.badgeTesla.style.display = 'inline-block';
      } else {
        el.badgeTesla.style.display = 'none';
      }
    } else {
      el.kwhTesla.textContent = `${fmtKwh(middleKwh)} kWh charged`;
      el.badgeTesla.textContent = 'CHARGING';
      el.badgeTesla.style.display = isMiddleActive ? 'inline-block' : 'none';
      if (el.barSocBox) el.barSocBox.style.display = 'none';
    }

    el.pwrExport.textContent = fmtPwr(liveExportW);
    el.kwhExport.textContent = `${fmtKwh(this._parseEnergy(eGridExport))} kWh exported`;

    // Flow line velocity and routing math (Restored Logarithmic Dynamics)
    const maxFlowW = (this._config.max_expected_power_kw || 7.5) * 1000.0;
    const masterSpeedMult = (typeof this._config.speed_multiplier === 'number') ? this._config.speed_multiplier : 1.0;
    const lineSpeeds = this._config.line_speeds || {};

    const calcDur = (w, lineKey) => {
      const lineMult = (typeof lineSpeeds[lineKey] === 'number') ? lineSpeeds[lineKey] : 1.0;
      const floorW = Math.max(0.5, idleThresh);
      const clampedW = Math.max(floorW, Math.min(maxFlowW, w));
      const norm = Math.log10(clampedW / floorW) / Math.log10(Math.max(floorW + 1, maxFlowW) / floorW);
      const baseDur = 4.2 - Math.pow(Math.min(1, Math.max(0, norm)), 0.8) * (4.2 - 0.45);
      const totalMult = Math.max(0.1, masterSpeedMult * lineMult);
      return parseFloat(Math.max(0.15, baseDur / totalMult).toFixed(2));
    };

    const setFlow = (flowEl, watts, isActive, lineKey) => {
      if (!flowEl) return;
      if (isActive && watts > idleThresh) {
        flowEl.style.display = 'block';
        const dur = calcDur(watts, lineKey);
        const anims = (typeof flowEl.getAnimations === 'function') ? flowEl.getAnimations() : [];
        if (anims.length > 0) {
          anims[0].playbackRate = parseFloat((1.0 / dur).toFixed(3));
        } else {
          flowEl.style.animationDuration = `${dur}s`;
          flowEl.style.webkitAnimationDuration = `${dur}s`;
        }
      } else {
        flowEl.style.display = 'none';
      }
    };

        const solarPriority = this._config?.solar_priority || 'middle';
    let remainingSolar = liveSolarW;
    let solarToHomeW = 0;
    let solarToMiddleW = 0;

    if (solarPriority === 'home') {
      solarToHomeW = Math.min(remainingSolar, liveHomeW);
      remainingSolar -= solarToHomeW;
      if (isBattery) {
        if (batteryCharging) {
          solarToMiddleW = Math.min(remainingSolar, batteryChargeW);
          remainingSolar -= solarToMiddleW;
        }
      } else {
        if (isMiddleActive) {
          solarToMiddleW = Math.min(remainingSolar, liveMiddleW);
          remainingSolar -= solarToMiddleW;
        }
      }
    } else {
      // Default: 'middle' (Tesla / Battery gets solar first -> original crossing lines)
      if (isBattery) {
        if (batteryCharging) {
          solarToMiddleW = Math.min(remainingSolar, batteryChargeW);
          remainingSolar -= solarToMiddleW;
        }
      } else {
        if (isMiddleActive) {
          solarToMiddleW = Math.min(remainingSolar, liveMiddleW);
          remainingSolar -= solarToMiddleW;
        }
      }
      solarToHomeW = Math.min(remainingSolar, liveHomeW);
      remainingSolar -= solarToHomeW;
    }

    let solarToGridW = 0;
    let batteryToGridW = 0;

    if (liveExportW > idleThresh) {
      if (liveSolarW > idleThresh) {
        solarToGridW = Math.min(remainingSolar, liveExportW);
      }
      const remainingExportW = Math.max(0, liveExportW - solarToGridW);
      if (isBattery && batteryDischarging && remainingExportW > idleThresh) {
        batteryToGridW = Math.min(batteryDischargeW, remainingExportW);
      }
    }

    const homeUnmetW = Math.max(0, liveHomeW - solarToHomeW);
    let batteryToHomeW = 0;
    if (isBattery && batteryDischarging) {
      const netDischargeForHome = Math.max(0, batteryDischargeW - batteryToGridW);
      batteryToHomeW = Math.min(netDischargeForHome, homeUnmetW);
    }

    let gridToHomeW = 0;
    let gridToMiddleW = 0;
    if (liveImportW > idleThresh) {
      if (solarPriority === 'home') {
        gridToHomeW = Math.min(liveImportW, Math.max(0, homeUnmetW - batteryToHomeW));
        const remainingImport = Math.max(0, liveImportW - gridToHomeW);
        if (isBattery && batteryCharging) {
          gridToMiddleW = Math.min(remainingImport, Math.max(0, batteryChargeW - solarToMiddleW));
        } else if (!isBattery && isMiddleActive) {
          gridToMiddleW = Math.min(remainingImport, Math.max(0, liveMiddleW - solarToMiddleW));
        }
      } else {
        // 'middle' priority: middle takes grid shortfall first (if any), rest goes to home
        let middleUnmetW = 0;
        if (isBattery && batteryCharging) {
          middleUnmetW = Math.max(0, batteryChargeW - solarToMiddleW);
        } else if (!isBattery && isMiddleActive) {
          middleUnmetW = Math.max(0, liveMiddleW - solarToMiddleW);
        }
        gridToMiddleW = Math.min(liveImportW, middleUnmetW);
        gridToHomeW = Math.max(0, liveImportW - gridToMiddleW);
      }
    }

    setFlow(el.flowSolarHome, solarToHomeW, liveSolarW > idleThresh && solarToHomeW > idleThresh, 'solar_home');
    setFlow(el.flowSolarTesla, solarToMiddleW, liveSolarW > idleThresh && solarToMiddleW > idleThresh, 'solar_tesla');
    setFlow(el.flowSolarGrid, solarToGridW, liveSolarW > idleThresh && solarToGridW > idleThresh, 'solar_grid');
    setFlow(el.flowGridHome, gridToHomeW, liveImportW > idleThresh && gridToHomeW > idleThresh, 'grid_home');
    setFlow(el.flowGridTesla, gridToMiddleW, liveImportW > idleThresh && gridToMiddleW > idleThresh, 'grid_tesla');
    setFlow(el.flowBatteryHome, batteryToHomeW, isBattery && batteryDischarging && batteryToHomeW > idleThresh, 'battery_home');
    setFlow(el.flowBatteryGrid, batteryToGridW, isBattery && batteryDischarging && batteryToGridW > idleThresh, 'battery_grid');

    // Apply autarky scorecard math
    const c1 = 427.26;
    const c2 = 339.29;
    const c3 = 251.33;

    let kwhTotalLoad = kwhSolarYield + kwhGridImport - kwhGridExport;
    if (kwhTotalLoad <= 0) kwhTotalLoad = kwhSolarYield + kwhGridImport;
    const autarkyPct = kwhTotalLoad > 0 ? Math.min(100, Math.max(0, Math.round((selfConsumedKwh / kwhTotalLoad) * 100))) : 0;
    const gridReliancePct = kwhTotalLoad > 0 ? Math.min(100, Math.max(0, Math.round((kwhGridImport / kwhTotalLoad) * 100))) : 0;
    const exportPct = kwhSolarYield > 0 ? Math.min(100, Math.max(0, Math.round((kwhGridExport / kwhSolarYield) * 100))) : 0;

    el.autarkyCenterPct.textContent = `${autarkyPct}%`;
    el.rowAutarkyPct.textContent = `${autarkyPct}%`;
    el.rowSolarKwh.childNodes[0].textContent = `${fmtKwh(selfConsumedKwh)} `;
    el.barSolarSelfConsumed.style.width = `${autarkyPct}%`;

    el.rowGridPct.textContent = `${gridReliancePct}%`;
    el.rowGridKwh.childNodes[0].textContent = `${fmtKwh(kwhGridImport)} `;
    el.barGridReliance.style.width = `${gridReliancePct}%`;

    el.rowExportPct.textContent = `${exportPct}%`;
    el.rowExportKwh.childNodes[0].textContent = `${fmtKwh(kwhGridExport)} `;
    el.barExport.style.width = `${exportPct}%`;

    el.ringAutarky.style.strokeDashoffset = String(c1 - (c1 * (autarkyPct / 100.0)));
    el.ringImport.style.strokeDashoffset = String(c2 - (c2 * (gridReliancePct / 100.0)));
    el.ringExport.style.strokeDashoffset = String(c3 - (c3 * (exportPct / 100.0)));
  }

  getCardSize() {
    return 4;
  }
}

// Dual Custom Element Registration (ChromaFlow & Ares Energy Flow backwards compatibility)
if (!customElements.get('ha-energy-flow-card')) {
  customElements.define('ha-energy-flow-card', HaEnergyFlowCard);
}
if (!customElements.get('ares-energy-flow-card')) {
  customElements.define('ares-energy-flow-card', HaEnergyFlowCard);
}

// Lovelace Card Picker Registration (Consolidated Single Entry)
window.customCards = window.customCards || [];
window.customCards = window.customCards.filter(c => c.type !== 'ha-energy-flow-card' && c.type !== 'ares-energy-flow-card');

window.customCards.push({
  type: 'ares-energy-flow-card',
  name: 'ChromaFlow: Energy Flow and Autarky Card',
  description: 'Real-time energy flow and autarky scorecard with dynamic flow rails, visual theme presets, and a built-in color studio.',
  preview: true,
  documentationURL: 'https://github.com/Aresitoo/chromaflow'
});

/**
 * Visual Config Editor for ha-energy-flow-card
 * Provides zero-YAML form editing across 6 collapsible accordion cards.
 */
class HaEnergyFlowCardEditor extends HTMLElement {
  _colorToHex(colorStr, fallbackHex = '#ffd54f') {
    if (!colorStr || typeof colorStr !== 'string') return fallbackHex;
    colorStr = colorStr.trim();
    if (colorStr.startsWith('#')) {
      if (colorStr.length === 7) return colorStr;
      if (colorStr.length === 4) return `#${colorStr[1]}${colorStr[1]}${colorStr[2]}${colorStr[2]}${colorStr[3]}${colorStr[3]}`;
    }
    const rgbaMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (rgbaMatch) {
      const r = parseInt(rgbaMatch[1], 10).toString(16).padStart(2, '0');
      const g = parseInt(rgbaMatch[2], 10).toString(16).padStart(2, '0');
      const b = parseInt(rgbaMatch[3], 10).toString(16).padStart(2, '0');
      return `#${r}${g}${b}`;
    }
    return fallbackHex;
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._rendered = false;
    this._forms = {};
  }

  set hass(hass) {
    this._hass = hass;
    if (this._rendered) {
      for (const key of Object.keys(this._forms)) {
        if (this._forms[key]) this._forms[key].hass = hass;
      }
    }
  }

  setConfig(config) {
    this._config = { ...config };
    if (!this._rendered) {
      this._render();
    } else {
      this._updateFormValues();
    }
  }

  _getEditorEntities() {
    const cfgEnts = this._config?.entities || {};
    const states = this._hass?.states || {};

    const resolve = (key, candidates) => {
      if (cfgEnts[key]) return cfgEnts[key];
      for (const cand of candidates) {
        if (states[cand]) return cand;
      }
      return '';
    };

    return {
      solar_power: resolve('solar_power', ['sensor.shellyem_e4525b_channel_2_power', 'sensor.solar_power', 'sensor.envoy_current_power_production', 'sensor.pv_power']),
      solar_daily_yield: resolve('solar_daily_yield', ['sensor.solar_daily_yield', 'sensor.solar_today']),
      grid_power: resolve('grid_power', ['sensor.return_to_grid_new', 'sensor.grid_power', 'sensor.power_meter']),
      grid_export_power: resolve('grid_export_power', ['sensor.true_grid_export_power', 'sensor.grid_export_power']),
      grid_daily_import: resolve('grid_daily_import', ['sensor.living_room_shellyem_e4525b_channel_1_grid_daily_import_energy', 'sensor.grid_daily_import_energy']),
      grid_daily_export: resolve('grid_daily_export', ['sensor.grid_daily_export_energy', 'sensor.energy_exported_today']),
      load_power: resolve('load_power', ['sensor.load_power', 'sensor.house_consumption_power']),
      ev_power: resolve('ev_power', ['sensor.evse_192_168_0_249_charge_power', 'sensor.ev_power']),
      ev_charging: resolve('ev_charging', ['binary_sensor.evse_192_168_0_249_charging', 'binary_sensor.ev_charging']),
      ev_daily_energy: resolve('ev_daily_energy', ['sensor.v2c_charging_stats', 'sensor.evse_192_168_0_249_charge_energy']),
      battery_power: resolve('battery_power', ['sensor.battery_power', 'sensor.bess_power']),
      battery_soc: resolve('battery_soc', ['sensor.battery_soc', 'sensor.battery_state_of_charge']),
      battery_daily_charge: resolve('battery_daily_charge', ['sensor.battery_daily_charge_energy']),
      battery_daily_discharge: resolve('battery_daily_discharge', ['sensor.battery_daily_discharge_energy']),
      solcast_today: resolve('solcast_today', ['sensor.solcast_pv_forecast_forecast_today', 'sensor.solcast_forecast_today']),
      solcast_remaining: resolve('solcast_remaining', ['sensor.solcast_pv_forecast_forecast_remaining_today', 'sensor.solcast_forecast_remaining_today'])
    };
  }

  _render() {
    this._rendered = true;
    this.shadowRoot.innerHTML = `
      <style>
        .editor-container {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 8px 0;
          font-family: inherit;
        }
        ha-expansion-panel {
          --expansion-panel-summary-padding: 0 16px;
          --ha-card-border-radius: 12px;
          background: var(--ha-card-background, var(--card-background-color, #1e2430));
          border-radius: 12px;
          border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
          overflow: hidden;
        }
        .panel-content {
          padding: 16px;
        }
        .header-icon {
          margin-right: 8px;
          font-size: 16px;
        }

        /* Color Studio Styling */
        .color-studio-toolbar {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }
        .studio-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 13px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .studio-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.35);
          transform: translateY(-1px);
        }
        .btn-random-palette {
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.2), rgba(179, 136, 255, 0.2));
          border-color: rgba(0, 229, 255, 0.4);
        }
        .btn-random-palette:hover {
          background: linear-gradient(135deg, rgba(0, 229, 255, 0.35), rgba(179, 136, 255, 0.35));
          border-color: #00e5ff;
        }
        .btn-wild-shuffle {
          background: linear-gradient(135deg, rgba(255, 112, 67, 0.2), rgba(255, 213, 79, 0.2));
          border-color: rgba(255, 112, 67, 0.4);
        }
        .btn-wild-shuffle:hover {
          background: linear-gradient(135deg, rgba(255, 112, 67, 0.35), rgba(255, 213, 79, 0.35));
          border-color: #ffd54f;
        }
        .btn-reset-colors {
          background: rgba(255, 255, 255, 0.04);
          color: rgba(255, 255, 255, 0.7);
          margin-left: auto;
        }
        .btn-reset-colors:hover {
          background: rgba(250, 17, 79, 0.15);
          border-color: rgba(250, 17, 79, 0.35);
          color: #fa114f;
        }
        .color-studio-tip {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(0, 229, 255, 0.08);
          border: 1px solid rgba(0, 229, 255, 0.25);
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 12.5px;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 14px;
        }
        .color-studio-tip a {
          color: #00e5ff;
          text-decoration: underline;
          font-weight: 700;
        }
        .color-group-box {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px;
          margin-bottom: 12px;
        }
        .color-group-title {
          font-size: 13px;
          font-weight: 800;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 6px;
          color: #ffffff;
        }
        .color-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }
        .color-row:last-child {
          border-bottom: none;
        }
        .color-label {
          font-size: 12px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          flex: 1;
        }
        .color-input-pair {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .color-wheel-btn {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          cursor: pointer;
          padding: 0;
          background: transparent;
        }
        .color-wheel-btn::-webkit-color-swatch-wrapper {
          padding: 0;
        }
        .color-wheel-btn::-webkit-color-swatch {
          border: none;
          border-radius: 5px;
        }
        .color-text-input {
          width: 140px;
          height: 28px;
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          color: #ffffff;
          padding: 2px 8px;
          font-size: 11.5px;
          font-family: monospace;
          box-sizing: border-box;
        }
        .color-text-input:focus {
          outline: none;
          border-color: #00e5ff;
        }
      </style>
      <div class="editor-container">
        <!-- Section 1: Solar -->
        <ha-expansion-panel outlined>
          <div slot="header"><span class="header-icon">☀️</span>Solar Panels</div>
          <div class="panel-content"><ha-form id="form-solar"></ha-form></div>
        </ha-expansion-panel>

        <!-- Section 2: Grid & ICP -->
        <ha-expansion-panel outlined>
          <div slot="header"><span class="header-icon">⚡</span>Utility Grid & Power Limit</div>
          <div class="panel-content"><ha-form id="form-grid"></ha-form></div>
        </ha-expansion-panel>

        <!-- Section 3: Battery / EV -->
        <ha-expansion-panel outlined>
          <div slot="header"><span class="header-icon">🔋</span>Home Battery or 🚗 Electric Vehicle</div>
          <div class="panel-content"><ha-form id="form-device"></ha-form></div>
        </ha-expansion-panel>

        <!-- Section 4: Localization & Titles -->
        <ha-expansion-panel outlined>
          <div slot="header"><span class="header-icon">🏷️</span>Custom Titles & Display Names</div>
          <div class="panel-content"><ha-form id="form-labels"></ha-form></div>
        </ha-expansion-panel>

        <!-- Section 5: Display & Sizing -->
        <ha-expansion-panel outlined>
          <div slot="header"><span class="header-icon">⚙️</span>Sizing, Speeds & Options</div>
          <div class="panel-content"><ha-form id="form-display"></ha-form></div>
        </ha-expansion-panel>

        <!-- Section 6: Granular Colors Studio -->
        <ha-expansion-panel outlined>
          <div slot="header"><span class="header-icon">🎨</span>Visual Colors Studio</div>
          <div class="panel-content" id="panel-colors-studio"></div>
        </ha-expansion-panel>
      </div>
    `;

    this._forms = {
      solar: this.shadowRoot.getElementById('form-solar'),
      grid: this.shadowRoot.getElementById('form-grid'),
      device: this.shadowRoot.getElementById('form-device'),
      labels: this.shadowRoot.getElementById('form-labels'),
      display: this.shadowRoot.getElementById('form-display')
    };

    const computeLbl = (schema) => schema.label || schema.name;

    this._forms.solar.schema = this._getSolarSchema();
    this._forms.solar.computeLabel = computeLbl;

    this._forms.grid.schema = this._getGridSchema();
    this._forms.grid.computeLabel = computeLbl;

    this._forms.device.schema = this._getDeviceSchema();
    this._forms.device.computeLabel = computeLbl;

    this._forms.labels.schema = this._getLabelsSchema();
    this._forms.labels.computeLabel = computeLbl;

    this._forms.display.schema = this._getDisplaySchema();
    this._forms.display.computeLabel = computeLbl;

    for (const [key, form] of Object.entries(this._forms)) {
      form.addEventListener('value-changed', (ev) => this._sectionValueChanged(key, ev));
    }

    this._renderColorsStudio();
    this._updateFormValues();
  }

  _renderColorsStudio() {
    const container = this.shadowRoot.getElementById('panel-colors-studio');
    if (!container) return;

    function colorToHex(colorStr, fallbackHex) {
      if (!colorStr) return fallbackHex || '#ffd54f';
      colorStr = colorStr.trim();
      if (colorStr.startsWith('#')) {
        if (colorStr.length === 7) return colorStr;
        if (colorStr.length === 4) return `#${colorStr[1]}${colorStr[1]}${colorStr[2]}${colorStr[2]}${colorStr[3]}${colorStr[3]}`;
      }
      const rgbaMatch = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
      if (rgbaMatch) {
        const r = parseInt(rgbaMatch[1], 10).toString(16).padStart(2, '0');
        const g = parseInt(rgbaMatch[2], 10).toString(16).padStart(2, '0');
        const b = parseInt(rgbaMatch[3], 10).toString(16).padStart(2, '0');
        return `#${r}${g}${b}`;
      }
      return fallbackHex || '#ffd54f';
    }

    const groups = [
      {
        title: "☀️ 1. Solar Panels Box",
        items: [
          { key: "bg_solar", label: "Box Background Tint", desc: "Semi-transparent backdrop for solar card", default: "rgba(255, 213, 79, 0.12)" },
          { key: "border_solar", label: "Box Border & Glow", desc: "Outlining border and ambient glow", default: "rgba(255, 213, 79, 0.3)" },
          { key: "title_solar", label: "Title Text & ☀️ Icon", desc: "Title label text ('Solar') and emoji icon", default: "#ffd54f" },
          { key: "pwr_solar", label: "Solar Generation Power (kW)", desc: "Big real-time wattage number (e.g. 3.84 kW)", default: "#ffffff" },
          { key: "kwh_solar", label: "Daily Solar Energy (kWh)", desc: "Today's total cumulative yield (e.g. 17.20 kWh today)", default: "rgba(255, 255, 255, 0.6)" },
          { key: "kwh_solar_rem", label: "Remaining Forecast (kWh)", desc: "Estimated rest-of-day yield (e.g. 7.7 kWh remaining)", default: "#ffd54f" },
          { key: "badge_solar_text", label: "Solcast EST Badge Text", desc: "Today's forecast estimated yield badge text", default: "#ffd54f" },
          { key: "badge_solar_bg", label: "Solcast EST Badge Background", desc: "Background pill color for forecast badge", default: "rgba(255, 213, 79, 0.12)" },
          { key: "bar_solar_forecast", label: "Forecast Progress Bar Fill", desc: "Progress bar showing percentage of forecast achieved", default: "#ffd54f" }
        ]
      },
      {
        title: "🏭 2. Grid In (Import) Box",
        items: [
          { key: "bg_grid", label: "Box Background Tint", desc: "Semi-transparent backdrop for grid in card", default: "rgba(255, 112, 67, 0.12)" },
          { key: "border_grid", label: "Box Border & Glow", desc: "Outlining border and ambient glow", default: "rgba(255, 112, 67, 0.3)" },
          { key: "title_grid", label: "Title Text & 🏭 Icon", desc: "Title label text ('Grid In') and emoji icon", default: "#ff7043" },
          { key: "pwr_grid", label: "Imported Power (kW/W)", desc: "Real-time utility import reading", default: "#ffffff" },
          { key: "kwh_grid", label: "Imported Energy (kWh)", desc: "Cumulative energy imported today", default: "rgba(255, 255, 255, 0.6)" },
          { key: "badge_grid_text", label: "Grid Limit Warning Badge Text", desc: "Alert warning badge when approaching grid power limit", default: "#ff7043" },
          { key: "badge_grid_bg", label: "Grid Limit Warning Badge Background", desc: "Background pill color for warning alert badge", default: "rgba(255, 112, 67, 0.12)" },
          { key: "bar_grid_limit", label: "Grid Limit Progress Bar Fill", desc: "Bar showing percentage of contracted kW capacity used", default: "#ff7043" }
        ]
      },
      {
        title: "🏠 3. Home Consumption Box",
        items: [
          { key: "bg_home", label: "Box Background Tint", desc: "Semi-transparent backdrop for home card", default: "rgba(0, 229, 255, 0.12)" },
          { key: "border_home", label: "Box Border & Glow", desc: "Outlining border and ambient glow", default: "rgba(0, 229, 255, 0.3)" },
          { key: "title_home", label: "Title Text & 🏠 Icon", desc: "Word 'Home' and home emoji icon", default: "#00e5ff" },
          { key: "pwr_home", label: "Home Consumption Power (kW/W)", desc: "Live home demand power number", default: "#ffffff" },
          { key: "kwh_home", label: "Solar Energy Used (kWh)", desc: "Clean solar energy consumed by home today", default: "rgba(255, 255, 255, 0.6)" },
          { key: "badge_home_text", label: "Solar Autarky Badge Text", desc: "Badge showing solar coverage (e.g. 100% SOLAR)", default: "#00e5ff" },
          { key: "badge_home_bg", label: "Solar Autarky Badge Background", desc: "Background pill color for solar coverage badge", default: "rgba(0, 229, 255, 0.12)" }
        ]
      },
      {
        title: "🔋/🚗 4. Battery / Electric Vehicle Box",
        items: [
          { key: "bg_device", label: "Box Background Tint", desc: "Semi-transparent backdrop for battery/EV card", default: "rgba(179, 136, 255, 0.12)" },
          { key: "border_device", label: "Box Border & Glow", desc: "Outlining border and ambient glow", default: "rgba(179, 136, 255, 0.3)" },
          { key: "title_device", label: "Title Text & Icon", desc: "Custom name (e.g. Tesla / BESS) and emoji icon", default: "#b388ff" },
          { key: "pwr_device", label: "Charge / Discharge Power (kW/W)", desc: "Live charging or discharging rate", default: "#ffffff" },
          { key: "kwh_device", label: "Charged Energy / SoC %", desc: "Daily energy charged or battery percentage", default: "rgba(255, 255, 255, 0.6)" },
          { key: "badge_device_text", label: "State Badge Text", desc: "Status badge (e.g. CHARGING / IDLE)", default: "#b388ff" },
          { key: "badge_device_bg", label: "State Badge Background", desc: "Background pill color for state badge", default: "rgba(179, 136, 255, 0.12)" },
          { key: "bar_device_soc", label: "Battery State-of-Charge Bar Fill", desc: "Progress bar showing battery charge %", default: "#b388ff" }
        ]
      },
      {
        title: "⚡ 5. Grid Out (Export) Box",
        items: [
          { key: "bg_export", label: "Box Background Tint", desc: "Semi-transparent backdrop for export card", default: "rgba(0, 230, 118, 0.12)" },
          { key: "border_export", label: "Box Border & Glow", desc: "Outlining border and ambient glow", default: "rgba(0, 230, 118, 0.25)" },
          { key: "title_export", label: "Title Text & ⚡ Icon", desc: "Word 'Grid Out' and electric emoji icon", default: "#00e676" },
          { key: "pwr_export", label: "Export Power (kW/W)", desc: "Live power feeding back into utility grid", default: "#ffffff" },
          { key: "kwh_export", label: "Exported Energy (kWh)", desc: "Clean surplus solar exported to grid today", default: "rgba(255, 255, 255, 0.6)" }
        ]
      },
      {
        title: "〰️ 6. Energy Flow Lines (Dual-Color Gradients)",
        items: [
          { key: "flow_solar_home_start", label: "Solar ➔ Home: Start Color", desc: "Left outlet of Solar line", default: "#ffd54f" },
          { key: "flow_solar_home_end", label: "Solar ➔ Home: End Color", desc: "Right inlet of Home line", default: "#00e5ff" },

          { key: "flow_solar_tesla_start", label: "Solar ➔ Battery/EV: Start Color", desc: "Left outlet of Solar line", default: "#ffd54f" },
          { key: "flow_solar_tesla_end", label: "Solar ➔ Battery/EV: End Color", desc: "Target inlet of Battery/EV line", default: "#b388ff" },

          { key: "flow_solar_grid_start", label: "Solar ➔ Grid Out: Start Color", desc: "Left outlet of Solar line", default: "#ffd54f" },
          { key: "flow_solar_grid_end", label: "Solar ➔ Grid Out: End Color", desc: "Target inlet of Grid Out line", default: "#00e676" },

          { key: "flow_grid_home_start", label: "Grid In ➔ Home: Start Color", desc: "Left outlet of Grid In line", default: "#ff7043" },
          { key: "flow_grid_home_end", label: "Grid In ➔ Home: End Color", desc: "Right inlet of Home line", default: "#00e5ff" },

          { key: "flow_grid_tesla_start", label: "Grid In ➔ Battery/EV: Start Color", desc: "Left outlet of Grid In line", default: "#ff7043" },
          { key: "flow_grid_tesla_end", label: "Grid In ➔ Battery/EV: End Color", desc: "Target inlet of Battery/EV line", default: "#b388ff" },

          { key: "flow_battery_home_start", label: "Battery ➔ Home: Start Color", desc: "Start outlet of Battery discharge", default: "#b388ff" },
          { key: "flow_battery_home_end", label: "Battery ➔ Home: End Color", desc: "Target inlet of Home line", default: "#00e5ff" },

          { key: "flow_battery_grid_start", label: "Battery ➔ Grid Out: Start Color", desc: "Start outlet of Battery discharge", default: "#b388ff" },
          { key: "flow_battery_grid_end", label: "Battery ➔ Grid Out: End Color", desc: "Target inlet of Grid Out line", default: "#00e676" },

          { key: "flow_rails", label: "Inactive Rail Lines Track", desc: "Faint background rails when power is idle or zero", default: "rgba(255, 255, 255, 0.05)" }
        ]
      },
      {
        title: "⭕ 7. Autarky & Activity Rings",
        items: [
          { key: "ring_autarky", label: "Autarky Ring (Outer Circle)", desc: "Ring representing % of home power from self-generation", default: "#00e676" },
          { key: "ring_import", label: "Grid Reliance Ring (Middle Circle)", desc: "Ring representing % of load taken from the grid", default: "#ff7043" },
          { key: "ring_export", label: "Solar Ratio Ring (Inner Circle)", desc: "Ring representing solar generation pacing and surplus", default: "#ffd54f" },
          { key: "autarky_center_pct", label: "Autarky Big Percentage Number", desc: "Large percentage number inside center ring (e.g. 91%)", default: "#ffffff" },
          { key: "autarky_center_lbl", label: "Autarky Center Label Text", desc: "Label below big number (e.g. AUTARKY)", default: "#00e676" },
          { key: "ring_bg_track", label: "Activity Rings Unfilled Track", desc: "Subtle background circle track beneath active arcs", default: "rgba(255, 255, 255, 0.05)" }
        ]
      },
      {
        title: "📊 8. Scorecard Tabular Summary Rows",
        items: [
          { key: "bg_scorecard", label: "Scorecard Container Background", desc: "Backdrop for the tabular breakdown section", default: "rgba(255, 255, 255, 0.02)" },
          { key: "border_scorecard", label: "Scorecard Container Border", desc: "Border outlining the tabular summary box", default: "rgba(255, 255, 255, 0.06)" },
          { key: "row_self_consumed_title", label: "Row 1 Title (Solar Self-Consumed)", desc: "Word 'SOLAR SELF-CONSUMED' in row 1", default: "#00e676" },
          { key: "row_self_consumed_kwh", label: "Row 1 Subtitle & Values", desc: "kWh energy and free power breakdown", default: "#ffffff" },
          { key: "row_self_consumed_bar", label: "Row 1 Progress Bar Fill", desc: "Horizontal bar fill for self-consumed percentage", default: "#00e676" },
          { key: "row_grid_reliance_title", label: "Row 2 Title (Utility Grid Reliance)", desc: "Word 'UTILITY GRID RELIANCE' in row 2", default: "#ff7043" },
          { key: "row_grid_reliance_kwh", label: "Row 2 Subtitle & Values", desc: "Imported kWh energy and reliance percentage", default: "#ffffff" },
          { key: "row_grid_reliance_bar", label: "Row 2 Progress Bar Fill", desc: "Horizontal bar fill for grid reliance percentage", default: "#ff7043" },
          { key: "row_exported_title", label: "Row 3 Title (Exported to Grid)", desc: "Word 'EXPORTED TO GRID' in row 3", default: "#ffd54f" },
          { key: "row_exported_kwh", label: "Row 3 Subtitle & Values", desc: "Exported kWh energy and solar surplus percentage", default: "#ffffff" },
          { key: "row_exported_bar", label: "Row 3 Progress Bar Fill", desc: "Horizontal bar fill for export percentage", default: "#ffd54f" }
        ]
      }
    ];

    const userColors = (this._config && this._config.colors) || {};

    let html = `
      <div class="color-studio-tip">
        <span>🎨 Click any color square to open the color wheel, or type hex, rgba, or CSS names. Browse <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/named-color" target="_blank" rel="noopener noreferrer">MDN Named Colors ↗</a></span>
      </div>
      <div class="color-studio-toolbar">
        <button type="button" class="studio-btn btn-random-palette" id="btn-random-palette">🎲 Random Palette</button>
        <button type="button" class="studio-btn btn-wild-shuffle" id="btn-wild-shuffle">🔀 Wild Shuffle</button>
        <button type="button" class="studio-btn btn-reset-colors" id="btn-reset-colors">↺ Reset Colors</button>
      </div>
    `;

    for (const grp of groups) {
      html += `<div class="color-group-box"><div class="color-group-title">${grp.title}</div>`;
      for (const item of grp.items) {
        const userVal = userColors[item.key] || '';
        const activeVal = userVal || item.default;
        const hexVal = colorToHex(activeVal, '#ffd54f');

        html += `
          <div class="color-row">
            <div class="color-label">
              <div style="font-weight: 700; font-size: 12.5px; color: #ffffff;">${item.label}</div>
              <div style="font-size: 10.5px; color: rgba(255, 255, 255, 0.5); margin-top: 1px;">${item.desc}</div>
            </div>
            <div class="color-input-pair">
              <input type="color" class="color-wheel-btn" data-color-key="${item.key}" data-default="${item.default}" value="${hexVal}" />
              <input type="text" class="color-text-input" data-color-key="${item.key}" value="${userVal}" placeholder="${item.default}" />
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }

    container.innerHTML = html;

    // Attach dual input listeners
    const wheels = container.querySelectorAll('.color-wheel-btn');
    const texts = container.querySelectorAll('.color-text-input');

    const updateColorKey = (key, val) => {
      const cfg = { ...this._config };
      cfg.colors = { ...(cfg.colors || {}) };
      if (val && val.trim() !== '') {
        cfg.colors[key] = val.trim();
      } else {
        delete cfg.colors[key];
      }
      this._config = cfg;
      this.dispatchEvent(new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      }));
    };

    wheels.forEach(w => {
      w.addEventListener('input', (ev) => {
        const k = w.getAttribute('data-color-key');
        const hex = ev.target.value;
        const matchingText = container.querySelector(`.color-text-input[data-color-key="${k}"]`);
        if (matchingText) matchingText.value = hex;
        updateColorKey(k, hex);
      });
    });

    texts.forEach(t => {
      t.addEventListener('input', (ev) => {
        const k = t.getAttribute('data-color-key');
        const val = ev.target.value.trim();
        const matchingWheel = container.querySelector(`.color-wheel-btn[data-color-key="${k}"]`);
        if (matchingWheel) {
          const hex = colorToHex(val, matchingWheel.value);
          matchingWheel.value = hex;
        }
        updateColorKey(k, val);
      });
    });

    // 🎲 Randomize Harmonized Palette Button
    const btnRandom = container.querySelector('#btn-random-palette');
    if (btnRandom) {
      btnRandom.addEventListener('click', () => {
        const baseHue = Math.floor(Math.random() * 360);
        const cSolar = getRandomVibrantHex(baseHue);
        const cGrid = getRandomVibrantHex((baseHue + 72) % 360);
        const cHome = getRandomVibrantHex((baseHue + 144) % 360);
        const cDevice = getRandomVibrantHex((baseHue + 216) % 360);
        const cExport = getRandomVibrantHex((baseHue + 288) % 360);

        const newCols = {
          // Solar Box
          bg_solar: hexToRgba(cSolar, 0.15),
          border_solar: hexToRgba(cSolar, 0.35),
          title_solar: cSolar,
          kwh_solar_rem: cSolar,
          badge_solar_text: cSolar,
          badge_solar_bg: hexToRgba(cSolar, 0.15),
          bar_solar_forecast: cSolar,

          // Grid Box
          bg_grid: hexToRgba(cGrid, 0.15),
          border_grid: hexToRgba(cGrid, 0.35),
          title_grid: cGrid,
          badge_grid_text: cGrid,
          badge_grid_bg: hexToRgba(cGrid, 0.15),
          bar_grid_limit: cGrid,

          // Home Box
          bg_home: hexToRgba(cHome, 0.12),
          border_home: hexToRgba(cHome, 0.3),
          title_home: cHome,
          badge_home_text: cHome,
          badge_home_bg: hexToRgba(cHome, 0.12),

          // Battery / EV Box
          bg_device: hexToRgba(cDevice, 0.15),
          border_device: hexToRgba(cDevice, 0.35),
          title_device: cDevice,
          badge_device_text: cDevice,
          badge_device_bg: hexToRgba(cDevice, 0.15),
          bar_device_soc: cDevice,

          // Export Box
          bg_export: hexToRgba(cExport, 0.15),
          border_export: hexToRgba(cExport, 0.3),
          title_export: cExport,

          // Flow Lines
          flow_solar_home_start: cSolar,
          flow_solar_home_end: cHome,
          flow_solar_tesla_start: cSolar,
          flow_solar_tesla_end: cDevice,
          flow_solar_grid_start: cSolar,
          flow_solar_grid_end: cExport,
          flow_grid_home_start: cGrid,
          flow_grid_home_end: cHome,
          flow_grid_tesla_start: cGrid,
          flow_grid_tesla_end: cDevice,
          flow_battery_home_start: cDevice,
          flow_battery_home_end: cHome,
          flow_battery_grid_start: cDevice,
          flow_battery_grid_end: cExport,

          // Rings
          ring_autarky: cSolar,
          ring_import: cGrid,
          ring_export: cExport,
          autarky_center_lbl: cSolar,

          // Scorecard
          row_self_consumed_title: cSolar,
          row_self_consumed_bar: cSolar,
          row_grid_reliance_title: cGrid,
          row_grid_reliance_bar: cGrid,
          row_exported_title: cExport,
          row_exported_bar: cExport
        };

        const cfg = { ...this._config };
        cfg.colors = { ...(cfg.colors || {}), ...newCols };
        for (const [k, val] of Object.entries(newCols)) {
          const txt = container.querySelector(`.color-text-input[data-color-key="${k}"]`);
          const whl = container.querySelector(`.color-wheel-btn[data-color-key="${k}"]`);
          if (txt) txt.value = val;
          if (whl) whl.value = colorToHex(val, whl.value);
        }
        this._config = cfg;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true
        }));
      });
    }

    // 🔀 Wild Shuffle Button (Every setting gets an independent random color)
    const btnWild = container.querySelector('#btn-wild-shuffle');
    if (btnWild) {
      btnWild.addEventListener('click', () => {
        const newCols = {};
        for (const grp of groups) {
          for (const item of grp.items) {
            const hex = getRandomVibrantHex();
            if (item.key.startsWith('bg_')) {
              newCols[item.key] = hexToRgba(hex, 0.15);
            } else if (item.key.startsWith('border_')) {
              newCols[item.key] = hexToRgba(hex, 0.35);
            } else {
              newCols[item.key] = hex;
            }
          }
        }
        const cfg = { ...this._config };
        cfg.colors = { ...(cfg.colors || {}), ...newCols };
        for (const [k, val] of Object.entries(newCols)) {
          const txt = container.querySelector(`.color-text-input[data-color-key="${k}"]`);
          const whl = container.querySelector(`.color-wheel-btn[data-color-key="${k}"]`);
          if (txt) txt.value = val;
          if (whl) whl.value = colorToHex(val, whl.value);
        }
        this._config = cfg;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true
        }));
      });
    }

    // ↺ Reset Colors Button
    const btnReset = container.querySelector('#btn-reset-colors');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        const cfg = { ...this._config };
        cfg.colors = {};
        const txts = container.querySelectorAll('.color-text-input');
        const whls = container.querySelectorAll('.color-wheel-btn');
        txts.forEach(t => { t.value = ''; });
        whls.forEach(w => {
          const def = w.getAttribute('data-default') || '#ffd54f';
          w.value = colorToHex(def, '#ffd54f');
        });
        this._config = cfg;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true
        }));
      });
    }
  }
  _updateFormValues() {
    if (!this._config) return;
    const ents = this._getEditorEntities();
    const lbls = this._config.labels || {};
    const colors = this._config.colors || {};

    if (this._forms.solar) {
      this._forms.solar.data = {
        solar_power: ents.solar_power || '',
        solar_daily_yield: ents.solar_daily_yield || '',
        solcast_today: ents.solcast_today || '',
        solcast_remaining: ents.solcast_remaining || '',
        show_solar_forecast: this._config.show_solar_forecast !== false
      };
      if (this._hass) this._forms.solar.hass = this._hass;
    }

    if (this._forms.grid) {
      this._forms.grid.data = {
        grid_power: ents.grid_power || '',
        grid_export_power: ents.grid_export_power || '',
        grid_daily_import: ents.grid_daily_import || '',
        grid_daily_export: ents.grid_daily_export || '',
        load_power: ents.load_power || '',
        contract_power_limit_kw: this._config.contract_power_limit_kw ?? 4.2,
        contract_warning_pct: Math.round((this._config.contract_warning_pct ?? 0.85) <= 1.0 ? (this._config.contract_warning_pct ?? 0.85) * 100 : (this._config.contract_warning_pct ?? 0.85))
      };
      if (this._hass) this._forms.grid.hass = this._hass;
    }

    if (this._forms.device) {
      this._forms.device.data = {
        device_type: this._config.device_type || 'ev',
        battery_power: ents.battery_power || '',
        battery_positive_charging: this._config.battery_positive_charging !== false,
        battery_soc: ents.battery_soc || '',
        battery_daily_charge: ents.battery_daily_charge || '',
        battery_daily_discharge: ents.battery_daily_discharge || '',
        ev_power: ents.ev_power || '',
        ev_charging: ents.ev_charging || '',
        ev_daily_energy: ents.ev_daily_energy || ''
      };
      if (this._hass) this._forms.device.hass = this._hass;
    }

    if (this._forms.labels) {
      this._forms.labels.data = {
        lbl_solar: lbls.solar || this._config.solar_name || '',
        lbl_home: lbls.home || this._config.home_name || '',
        lbl_grid_in: lbls.grid_in || this._config.grid_in_name || '',
        lbl_grid_out: lbls.grid_out || this._config.grid_out_name || '',
        battery_name: this._config.battery_name || lbls.battery || 'BESS',
        ev_name: this._config.ev_name || lbls.ev || 'Tesla',
        lbl_autarky: lbls.autarky || '',
        lbl_autarky_sub: lbls.autarky_sub || '',
        lbl_self_consumed: lbls.self_consumed || '',
        lbl_self_consumed_sub: lbls.self_consumed_sub || '',
        lbl_grid_reliance: lbls.grid_reliance || '',
        lbl_grid_reliance_sub: lbls.grid_reliance_sub || '',
        lbl_exported: lbls.exported || '',
        lbl_exported_sub: lbls.exported_sub || ''
      };
      if (this._hass) this._forms.labels.hass = this._hass;
    }

    if (this._forms.display) {
      this._forms.display.data = {
        solar_priority: this._config?.solar_priority || 'middle',
        font_scale: this._config.font_scale ?? 1.0,
        speed_multiplier: this._config.speed_multiplier ?? 1.0,
        palette: this._config.palette || 'solar',
        power_unit: this._config.power_unit || '',
        min_flow_threshold_w: this._config.min_flow_threshold_w ?? 2,
        max_expected_power_kw: this._config.max_expected_power_kw ?? 7.5,
        speed_solar_home: this._config.line_speeds?.solar_home ?? 1.0,
        speed_solar_tesla: this._config.line_speeds?.solar_tesla ?? 1.0,
        speed_solar_grid: this._config.line_speeds?.solar_grid ?? 1.0,
        speed_grid_home: this._config.line_speeds?.grid_home ?? 1.0,
        speed_grid_tesla: this._config.line_speeds?.grid_tesla ?? 1.0,
        speed_battery_home: this._config.line_speeds?.battery_home ?? 1.0,
        speed_battery_grid: this._config.line_speeds?.battery_grid ?? 1.0
      };
      if (this._hass) this._forms.display.hass = this._hass;
    }

    // Populate Color Studio inputs
    const container = this.shadowRoot.getElementById('panel-colors-studio');
    if (container) {
      const texts = container.querySelectorAll('.color-text-input');
      const wheels = container.querySelectorAll('.color-wheel-btn');
      texts.forEach(t => {
        const k = t.getAttribute('data-color-key');
        t.value = colors[k] || '';
      });
      wheels.forEach(w => {
        const k = w.getAttribute('data-color-key');
        const def = w.getAttribute('data-default') || '#ffd54f';
        const cur = (colors && colors[k]) || def;
        w.value = this._colorToHex(cur, '#ffd54f');
      });
    }
  }

  _sectionValueChanged(secId, ev) {
    if (!this._config || !this._hass) return;
    const val = ev.detail.value;
    const cfg = { ...this._config };
    cfg.entities = { ...(cfg.entities || {}) };
    cfg.labels = { ...(cfg.labels || {}) };

    if (secId === 'solar') {
      const keys = ['solar_power', 'solar_daily_yield', 'solcast_today', 'solcast_remaining'];
      for (const k of keys) {
        if (val[k]) cfg.entities[k] = val[k];
        else delete cfg.entities[k];
      }
      cfg.show_solar_forecast = Boolean(val.show_solar_forecast);
    } else if (secId === 'grid') {
      const keys = ['grid_power', 'grid_export_power', 'grid_daily_import', 'grid_daily_export', 'load_power'];
      for (const k of keys) {
        if (val[k]) cfg.entities[k] = val[k];
        else delete cfg.entities[k];
      }
      cfg.contract_power_limit_kw = parseFloat(val.contract_power_limit_kw) || 4.2;
      const rawWarnVal = parseFloat(val.contract_warning_pct);
      cfg.contract_warning_pct = (rawWarnVal > 1) ? (rawWarnVal / 100.0) : (rawWarnVal || 0.85);
    } else if (secId === 'device') {
      cfg.device_type = val.device_type || 'ev';
      cfg.battery_positive_charging = val.battery_positive_charging !== false;
      const bKeys = ['battery_power', 'battery_soc', 'battery_daily_charge', 'battery_daily_discharge'];
      for (const k of bKeys) {
        if (val[k]) cfg.entities[k] = val[k];
        else delete cfg.entities[k];
      }
      const evKeys = ['ev_power', 'ev_charging', 'ev_daily_energy'];
      for (const k of evKeys) {
        if (val[k]) cfg.entities[k] = val[k];
        else delete cfg.entities[k];
      }
    } else if (secId === 'labels') {
      const lMap = {
        lbl_solar: 'solar',
        lbl_home: 'home',
        lbl_grid_in: 'grid_in',
        lbl_grid_out: 'grid_out',
        lbl_autarky: 'autarky',
        lbl_autarky_sub: 'autarky_sub',
        lbl_self_consumed: 'self_consumed',
        lbl_self_consumed_sub: 'self_consumed_sub',
        lbl_grid_reliance: 'grid_reliance',
        lbl_grid_reliance_sub: 'grid_reliance_sub',
        lbl_exported: 'exported',
        lbl_exported_sub: 'exported_sub'
      };
      for (const [formKey, lKey] of Object.entries(lMap)) {
        if (val[formKey]) cfg.labels[lKey] = val[formKey];
        else delete cfg.labels[lKey];
      }
      if (val.battery_name) cfg.battery_name = val.battery_name;
      if (val.ev_name) cfg.ev_name = val.ev_name;
    } else if (secId === 'display') {
      if (val.solar_priority) cfg.solar_priority = val.solar_priority;
      cfg.font_scale = typeof val.font_scale === 'number' ? val.font_scale : 1.0;
      cfg.speed_multiplier = typeof val.speed_multiplier === 'number' ? val.speed_multiplier : 1.0;
      cfg.palette = val.palette || 'solar';
      cfg.power_unit = val.power_unit || '';
      cfg.min_flow_threshold_w = typeof val.min_flow_threshold_w === 'number' ? val.min_flow_threshold_w : 2;
      cfg.max_expected_power_kw = typeof val.max_expected_power_kw === 'number' ? val.max_expected_power_kw : 7.5;
      cfg.line_speeds = {
        solar_home: parseFloat(val.speed_solar_home) || 1.0,
        solar_tesla: parseFloat(val.speed_solar_tesla) || 1.0,
        solar_grid: parseFloat(val.speed_solar_grid) || 1.0,
        grid_home: parseFloat(val.speed_grid_home) || 1.0,
        grid_tesla: parseFloat(val.speed_grid_tesla) || 1.0,
        battery_home: parseFloat(val.speed_battery_home) || 1.0,
        battery_grid: parseFloat(val.speed_battery_grid) || 1.0
      };
    }

    this._config = cfg;
    this.dispatchEvent(new CustomEvent('config-changed', {
      detail: { config: this._config },
      bubbles: true,
      composed: true
    }));
  }

  _getSolarSchema() {
    return [
      { name: "solar_power", label: "Current Solar Power Sensor (W or kW)", selector: { entity: { domain: ["sensor"] } } },
      { name: "solar_daily_yield", label: "Today's Total Solar Energy Sensor (kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "solcast_today", label: "Solcast Today's Forecast Sensor (Optional, kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "solcast_remaining", label: "Solcast Remaining Today Forecast Sensor (Optional, kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "show_solar_forecast", label: "Show Solar Forecast (Progress Bar & Estimated Yield)", selector: { boolean: {} } }
    ];
  }

  _getGridSchema() {
    return [
      { name: "grid_power", label: "Main Grid Power Sensor (+ Import, - Export)", selector: { entity: { domain: ["sensor"] } } },
      { name: "grid_export_power", label: "Separate Grid Export Sensor (Only if separate from import)", selector: { entity: { domain: ["sensor"] } } },
      { name: "grid_daily_import", label: "Today's Grid Import Energy Sensor (kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "grid_daily_export", label: "Today's Grid Export Energy Sensor (kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "load_power", label: "Total House Consumption Sensor (Optional — auto-calculated if empty)", selector: { entity: { domain: ["sensor"] } } },
      { name: "contract_power_limit_kw", label: "Contracted Grid Power Limit (kW) — triggers warning badge before tripping breaker", selector: { number: { min: 1, max: 50, step: 0.1, mode: "box" } } },
      { name: "contract_warning_pct", label: "Grid Limit Warning Alert Level (% of limit)", selector: { number: { min: 50, max: 100, step: 5, unit_of_measurement: "%", mode: "slider" } } }
    ];
  }

  _getDeviceSchema() {
    return [
      {
        name: "device_type",
        label: "Middle Box Mode (Battery or EV)",
        selector: {
          select: {
            options: [
              { value: "ev", label: "🚗 Electric Vehicle / EV Charger (Tesla, Wallbox, Easee...)" },
              { value: "battery", label: "🔋 Home Battery Storage (Powerwall, BYD, Enphase, DIY...)" }
            ]
          }
        }
      },
      { name: "battery_power", label: "Battery Power Sensor (W or kW)", selector: { entity: { domain: ["sensor"] } } },
      { name: "battery_positive_charging", label: "Battery Power Direction: Check if positive (+) numbers mean Charging", selector: { boolean: {} } },
      { name: "battery_soc", label: "Battery State of Charge (%)", selector: { entity: { domain: ["sensor"] } } },
      { name: "battery_daily_charge", label: "Today's Battery Charged Energy Sensor (kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "battery_daily_discharge", label: "Today's Battery Discharged Energy Sensor (kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "ev_power", label: "EV Charger Power Sensor (W or kW)", selector: { entity: { domain: ["sensor"] } } },
      { name: "ev_charging", label: "EV Charging Status Sensor (Binary sensor: on = charging)", selector: { entity: { domain: ["binary_sensor"] } } },
      { name: "ev_daily_energy", label: "Today's EV Charged Energy Sensor (kWh)", selector: { entity: { domain: ["sensor"] } } }
    ];
  }

  _getLabelsSchema() {
    return [
      { name: "lbl_solar", label: "Solar Box Title (Default: Solar)", selector: { text: {} } },
      { name: "lbl_home", label: "Home Box Title (Default: Home)", selector: { text: {} } },
      { name: "lbl_grid_in", label: "Grid In Box Title (Default: Grid In)", selector: { text: {} } },
      { name: "lbl_grid_out", label: "Grid Out Box Title (Default: Grid Out)", selector: { text: {} } },
      { name: "battery_name", label: "Battery Box Title (Default: BESS)", selector: { text: {} } },
      { name: "ev_name", label: "EV Box Title (Default: Tesla)", selector: { text: {} } },
      { name: "lbl_autarky", label: "Autarky Ring Label (Default: AUTARKY)", selector: { text: {} } },
      { name: "lbl_autarky_sub", label: "Autarky Ring Subtitle (Default: Grid-Free)", selector: { text: {} } },
      { name: "lbl_self_consumed", label: "Row 1 Title (Default: SOLAR SELF-CONSUMED)", selector: { text: {} } },
      { name: "lbl_self_consumed_sub", label: "Row 1 Subtitle (Default: 100% Free)", selector: { text: {} } },
      { name: "lbl_grid_reliance", label: "Row 2 Title (Default: UTILITY GRID RELIANCE)", selector: { text: {} } },
      { name: "lbl_grid_reliance_sub", label: "Row 2 Subtitle (Default: Night/Backup)", selector: { text: {} } },
      { name: "lbl_exported", label: "Row 3 Title (Default: EXPORTED TO GRID)", selector: { text: {} } },
      { name: "lbl_exported_sub", label: "Row 3 Subtitle (Default: Clean Surplus)", selector: { text: {} } }
    ];
  }

  _getDisplaySchema() {
    return [
      {
        name: "solar_priority",
        label: "☀️ Solar Distribution Priority",
        selector: {
          select: {
            options: [
              { value: "middle", label: "🚗 Electric Vehicle / Battery First (Original Crossing Lines)" },
              { value: "home", label: "🏠 Home Baseload First" }
            ]
          }
        }
      },
      {
        name: "font_scale",
        label: "Card Text Size Multiplier (0.8x small to 1.3x large)",
        selector: { number: { min: 0.8, max: 1.3, step: 0.05, mode: "slider" } }
      },
      {
        name: "speed_multiplier",
        label: "Master Animation Speed Multiplier (0.2x calm to 3.0x fast)",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_solar_home",
        label: "Line Speed: Solar ➔ Home (1.0x = Auto)",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_solar_tesla",
        label: "Line Speed: Solar ➔ Battery/EV (1.0x = Auto)",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_solar_grid",
        label: "Line Speed: Solar ➔ Grid Out (1.0x = Auto)",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_grid_home",
        label: "Line Speed: Grid In ➔ Home (1.0x = Auto)",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_grid_tesla",
        label: "Line Speed: Grid In ➔ Battery/EV (1.0x = Auto)",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_battery_home",
        label: "Line Speed: Battery ➔ Home (1.0x = Auto)",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_battery_grid",
        label: "Line Speed: Battery ➔ Grid Out (1.0x = Auto)",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "palette",
        label: "Color Theme Preset",
        selector: {
          select: {
            options: [
              { value: "solar", label: "☀️ Solar Harmonized (Default)" },
              { value: "fitness", label: "🏃 Fitness Activity (Apple Rings)" },
              { value: "halloween", label: "🎃 Spooky Halloween (Pumpkin & Witch Purple)" },
              { value: "christmas", label: "🎄 Festive Christmas (Pine, Crimson & Gold)" },
              { value: "cyberpunk", label: "🌆 Cyberpunk Neon (Cyan, Hot Pink & Toxic Lime)" },
              { value: "synthwave", label: "🌅 Synthwave Sunset (Sunset Amber, Magenta & Miami Aqua)" },
              { value: "nord", label: "❄️ Nord Frost (Polar Night, Ice Blue & Arctic Teal)" },
              { value: "midnight", label: "🌌 Midnight Glow (Stealth Slate, Sky Blue & Amber)" },
              { value: "emerald", label: "🌲 Emerald Forest (Mint Jade, Lime Leaf & Deep Pine)" },
              { value: "ocean", label: "🌊 Deep Ocean (Lagoon Aqua, Coral & Deep Indigo)" }
            ]
          }
        }
      },
      {
        name: "power_unit",
        label: "Power Units Display",
        selector: {
          select: {
            options: [
              { value: "", label: "Auto-detect (from sensor unit_of_measurement)" },
              { value: "W", label: "Force Watts (W)" },
              { value: "kW", label: "Force Kilowatts (kW)" },
              { value: "MW", label: "Force Megawatts (MW)" }
            ]
          }
        }
      },
      {
        name: "min_flow_threshold_w",
        label: "Minimum Moving Flow Threshold (Watts) — stops animation when power is below this value (Default: 2 W)",
        selector: { number: { min: 0, max: 50, step: 1, mode: "box" } }
      },
      {
        name: "max_expected_power_kw",
        label: "Max System Peak Capacity (kW) — calibrates maximum line speed animation (Default: 7.5 kW)",
        selector: { number: { min: 2, max: 100, step: 0.5, mode: "box" } }
      }
    ];
  }
}

if (!customElements.get('ha-energy-flow-card-editor')) {
  customElements.define('ha-energy-flow-card-editor', HaEnergyFlowCardEditor);
}
if (!customElements.get('ares-energy-flow-card-editor')) {
  customElements.define('ares-energy-flow-card-editor', HaEnergyFlowCardEditor);
}
