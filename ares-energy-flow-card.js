/**
 * Home Assistant Real-Time Energy Flow & Autarky Scorecard Card
 * Hardware-accelerated SVG power flow with WAAPI stutter-free velocity scaling and 3-ring autarky scorecard.
 * Version: v2.3.9 (Tinted Flow Rails & Idle Rail Toggle)
 */

const PALETTES = {
  solar: {
    name: 'Solar Harmonized (Default)',
    solar: '#ffd54f',
    grid: '#ff7043',
    home: '#00e5ff',
    device: '#b388ff',
    battery: '#10b981',
    ev: '#b388ff',
    export: '#00e676',
    autarky: '#00e676',
    import_ring: '#ff7043',
    export_ring: '#ffd54f',
    bg_solar: 'rgba(255, 255, 255, 0.03)',
    border_solar: 'rgba(255, 213, 79, 0.3)',
    bg_grid: 'rgba(255, 255, 255, 0.03)',
    border_grid: 'rgba(255, 112, 67, 0.3)',
    bg_home: 'rgba(255, 255, 255, 0.03)',
    border_home: 'rgba(0, 229, 255, 0.3)',
    bg_device: 'rgba(255, 255, 255, 0.03)',
    border_device: 'rgba(179, 136, 255, 0.3)',
    bg_battery: 'rgba(255, 255, 255, 0.03)',
    border_battery: 'rgba(16, 185, 129, 0.3)',
    bg_ev: 'rgba(255, 255, 255, 0.03)',
    border_ev: 'rgba(179, 136, 255, 0.3)',
    bg_export: 'rgba(255, 255, 255, 0.03)',
    border_export: 'rgba(0, 230, 118, 0.25)',
    card_border: 'rgba(0, 230, 118, 0.25)',
    scorecard_radial: 'rgba(0, 229, 255, 0.05)'
  },
  fitness: {
    name: 'Fitness Activity (Apple Rings)',
    solar: '#fa114f',
    grid: '#a6e22e',
    home: '#00e5ff',
    device: '#b388ff',
    export: '#00e5ff',
    autarky: '#fa114f',
    import_ring: '#a6e22e',
    export_ring: '#00e5ff',
    bg_solar: 'rgba(255, 255, 255, 0.03)',
    border_solar: 'rgba(250, 17, 79, 0.3)',
    bg_grid: 'rgba(255, 255, 255, 0.03)',
    border_grid: 'rgba(166, 226, 46, 0.3)',
    bg_home: 'rgba(255, 255, 255, 0.03)',
    border_home: 'rgba(0, 229, 255, 0.3)',
    bg_device: 'rgba(255, 255, 255, 0.03)',
    border_device: 'rgba(179, 136, 255, 0.3)',
    bg_export: 'rgba(255, 255, 255, 0.03)',
    border_export: 'rgba(0, 229, 255, 0.25)',
    card_border: 'rgba(250, 17, 79, 0.3)',
    scorecard_radial: 'rgba(250, 17, 79, 0.08)'
  },
  halloween: {
    name: 'Spooky Halloween (Pumpkin & Witch Purple)',
    solar: '#ff7518',
    grid: '#9d4edd',
    home: '#39ff14',
    device: '#f72585',
    export: '#ff0055',
    autarky: '#ff7518',
    import_ring: '#9d4edd',
    export_ring: '#39ff14',
    bg_solar: 'rgba(255, 255, 255, 0.03)',
    border_solar: 'rgba(255, 117, 24, 0.35)',
    bg_grid: 'rgba(255, 255, 255, 0.03)',
    border_grid: 'rgba(157, 78, 221, 0.35)',
    bg_home: 'rgba(255, 255, 255, 0.03)',
    border_home: 'rgba(57, 255, 20, 0.3)',
    bg_device: 'rgba(255, 255, 255, 0.03)',
    border_device: 'rgba(247, 37, 133, 0.3)',
    bg_export: 'rgba(255, 255, 255, 0.03)',
    border_export: 'rgba(255, 0, 85, 0.3)',
    card_border: 'rgba(255, 117, 24, 0.35)',
    scorecard_radial: 'rgba(157, 78, 221, 0.08)'
  },
  christmas: {
    name: 'Festive Christmas (Pine, Crimson & Gold)',
    solar: '#ffd700',
    grid: '#d90429',
    home: '#2b9348',
    device: '#80b918',
    export: '#f8f9fa',
    autarky: '#2b9348',
    import_ring: '#d90429',
    export_ring: '#ffd700',
    bg_solar: 'rgba(255, 255, 255, 0.03)',
    border_solar: 'rgba(255, 215, 0, 0.35)',
    bg_grid: 'rgba(255, 255, 255, 0.03)',
    border_grid: 'rgba(217, 4, 41, 0.35)',
    bg_home: 'rgba(255, 255, 255, 0.03)',
    border_home: 'rgba(43, 147, 72, 0.35)',
    bg_device: 'rgba(255, 255, 255, 0.03)',
    border_device: 'rgba(128, 185, 24, 0.3)',
    bg_export: 'rgba(255, 255, 255, 0.03)',
    border_export: 'rgba(248, 249, 250, 0.3)',
    card_border: 'rgba(217, 4, 41, 0.35)',
    scorecard_radial: 'rgba(43, 147, 72, 0.08)'
  },
  cyberpunk: {
    name: 'Cyberpunk Neon (Cyan, Hot Pink & Toxic Lime)',
    solar: '#00ffff',
    grid: '#ff007f',
    home: '#ffff00',
    device: '#bd00ff',
    export: '#00ff66',
    autarky: '#00ffff',
    import_ring: '#ff007f',
    export_ring: '#00ff66',
    bg_solar: 'rgba(255, 255, 255, 0.03)',
    border_solar: 'rgba(0, 255, 255, 0.35)',
    bg_grid: 'rgba(255, 255, 255, 0.03)',
    border_grid: 'rgba(255, 0, 127, 0.35)',
    bg_home: 'rgba(255, 255, 255, 0.03)',
    border_home: 'rgba(255, 255, 0, 0.3)',
    bg_device: 'rgba(255, 255, 255, 0.03)',
    border_device: 'rgba(189, 0, 255, 0.35)',
    bg_export: 'rgba(255, 255, 255, 0.03)',
    border_export: 'rgba(0, 255, 102, 0.3)',
    card_border: 'rgba(0, 255, 255, 0.35)',
    scorecard_radial: 'rgba(255, 0, 127, 0.08)'
  },
  synthwave: {
    name: 'Synthwave Sunset (Sunset Amber, Magenta & Miami Aqua)',
    solar: '#ff9e00',
    grid: '#ff0054',
    home: '#00f5d4',
    device: '#9b5de5',
    export: '#fee440',
    autarky: '#00f5d4',
    import_ring: '#ff0054',
    export_ring: '#ff9e00',
    bg_solar: 'rgba(255, 255, 255, 0.03)',
    border_solar: 'rgba(255, 158, 0, 0.35)',
    bg_grid: 'rgba(255, 255, 255, 0.03)',
    border_grid: 'rgba(255, 0, 84, 0.35)',
    bg_home: 'rgba(255, 255, 255, 0.03)',
    border_home: 'rgba(0, 245, 212, 0.3)',
    bg_device: 'rgba(255, 255, 255, 0.03)',
    border_device: 'rgba(155, 93, 229, 0.35)',
    bg_export: 'rgba(255, 255, 255, 0.03)',
    border_export: 'rgba(254, 228, 64, 0.3)',
    card_border: 'rgba(255, 0, 84, 0.35)',
    scorecard_radial: 'rgba(0, 245, 212, 0.08)'
  },
  nord: {
    name: 'Nord Frost (Polar Night, Ice Blue & Arctic Teal)',
    solar: '#ebcb8b',
    grid: '#bf616a',
    home: '#88c0d0',
    device: '#b48ead',
    export: '#a3be8c',
    autarky: '#a3be8c',
    import_ring: '#bf616a',
    export_ring: '#88c0d0',
    bg_solar: 'rgba(255, 255, 255, 0.03)',
    border_solar: 'rgba(235, 203, 139, 0.3)',
    bg_grid: 'rgba(255, 255, 255, 0.03)',
    border_grid: 'rgba(191, 97, 106, 0.3)',
    bg_home: 'rgba(255, 255, 255, 0.03)',
    border_home: 'rgba(136, 192, 208, 0.3)',
    bg_device: 'rgba(255, 255, 255, 0.03)',
    border_device: 'rgba(180, 142, 173, 0.3)',
    bg_export: 'rgba(255, 255, 255, 0.03)',
    border_export: 'rgba(163, 190, 140, 0.3)',
    card_border: 'rgba(136, 192, 208, 0.3)',
    scorecard_radial: 'rgba(136, 192, 208, 0.08)'
  },
  midnight: {
    name: 'Midnight Glow (Stealth Slate, Sky Blue & Amber)',
    solar: '#38bdf8',
    grid: '#f59e0b',
    home: '#e2e8f0',
    device: '#a855f7',
    export: '#10b981',
    autarky: '#38bdf8',
    import_ring: '#f59e0b',
    export_ring: '#10b981',
    bg_solar: 'rgba(255, 255, 255, 0.03)',
    border_solar: 'rgba(56, 189, 248, 0.3)',
    bg_grid: 'rgba(255, 255, 255, 0.03)',
    border_grid: 'rgba(245, 158, 11, 0.3)',
    bg_home: 'rgba(255, 255, 255, 0.03)',
    border_home: 'rgba(226, 232, 240, 0.3)',
    bg_device: 'rgba(255, 255, 255, 0.03)',
    border_device: 'rgba(168, 85, 247, 0.3)',
    bg_export: 'rgba(255, 255, 255, 0.03)',
    border_export: 'rgba(16, 185, 129, 0.3)',
    card_border: 'rgba(56, 189, 248, 0.3)',
    scorecard_radial: 'rgba(56, 189, 248, 0.08)'
  },
  emerald: {
    name: 'Emerald Forest (Mint Jade, Lime Leaf & Deep Pine)',
    solar: '#a3e635',
    grid: '#eab308',
    home: '#34d399',
    device: '#059669',
    export: '#10b981',
    autarky: '#10b981',
    import_ring: '#eab308',
    export_ring: '#34d399',
    bg_solar: 'rgba(255, 255, 255, 0.03)',
    border_solar: 'rgba(163, 230, 53, 0.3)',
    bg_grid: 'rgba(255, 255, 255, 0.03)',
    border_grid: 'rgba(234, 179, 8, 0.3)',
    bg_home: 'rgba(255, 255, 255, 0.03)',
    border_home: 'rgba(52, 211, 153, 0.3)',
    bg_device: 'rgba(255, 255, 255, 0.03)',
    border_device: 'rgba(5, 150, 105, 0.3)',
    bg_export: 'rgba(255, 255, 255, 0.03)',
    border_export: 'rgba(16, 185, 129, 0.3)',
    card_border: 'rgba(16, 185, 129, 0.3)',
    scorecard_radial: 'rgba(52, 211, 153, 0.08)'
  },
  ocean: {
    name: 'Deep Ocean (Lagoon Aqua, Coral & Deep Indigo)',
    solar: '#38bdf8',
    grid: '#f43f5e',
    home: '#06b6d4',
    device: '#6366f1',
    export: '#2dd4bf',
    autarky: '#2dd4bf',
    import_ring: '#f43f5e',
    export_ring: '#38bdf8',
    bg_solar: 'rgba(255, 255, 255, 0.03)',
    border_solar: 'rgba(56, 189, 248, 0.3)',
    bg_grid: 'rgba(255, 255, 255, 0.03)',
    border_grid: 'rgba(244, 63, 94, 0.3)',
    bg_home: 'rgba(255, 255, 255, 0.03)',
    border_home: 'rgba(6, 182, 212, 0.3)',
    bg_device: 'rgba(255, 255, 255, 0.03)',
    border_device: 'rgba(99, 102, 241, 0.3)',
    bg_export: 'rgba(255, 255, 255, 0.03)',
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

function hexToRgba(hex, alpha = 1) {
  if (!hex) return `rgba(255, 255, 255, ${alpha})`;
  if (hex.startsWith('rgba')) return hex.replace(/[\d.]+\)$/, `${alpha})`);
  if (hex.startsWith('rgb(')) return hex.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  if (isNaN(num)) return `rgba(255, 255, 255, ${alpha})`;
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Unfilled activity-ring track. v1.x drew one per ring, tinted with that ring's own
// colour at 15%; v2.0.0 replaced all three with a single shared track
// (ring_bg_track: rgba(255, 255, 255, 0.05)) which is virtually invisible on a dark
// card. Restore the tint, and keep ring_bg_track / ring_track_* as optional overrides.
const RING_TRACK_ALPHA = 0.15;
// The value v2.0.0-v2.3.6 baked into every palette it generated. Ignore it so
// dashboards saved by those releases get the tinted tracks back instead of staying
// stuck on the near-invisible white.
const LEGACY_RING_TRACK = 'rgba(255, 255, 255, 0.05)';

function resolveRingTracks(colors, d) {
  const c = colors || {};
  // d is either the fully derived config (_render) or a raw palette (_applyThemeStyles),
  // so accept both key shapes for the ring colours the tracks are tinted from.
  const shared = (c.ring_bg_track && c.ring_bg_track !== LEGACY_RING_TRACK) ? c.ring_bg_track : null;
  const autarkyRing = c.ring_autarky || d.ring_autarky || d.autarky || '#00e676';
  const importRing = c.ring_import || d.ring_import || d.import_ring || '#ff7043';
  const exportRing = c.ring_export || d.ring_export || d.export_ring || '#ffd54f';
  return {
    autarky: c.ring_track_autarky || shared || hexToRgba(autarkyRing, RING_TRACK_ALPHA),
    import: c.ring_track_import || shared || hexToRgba(importRing, RING_TRACK_ALPHA),
    export: c.ring_track_export || shared || hexToRgba(exportRing, RING_TRACK_ALPHA)
  };
}

// Inactive flow rails. v1.x drew each one in its own colour at 15%; v2.0.0 collapsed all of
// them into a single shared white at 5%, which is invisible on a dark card. This puts the
// tint back and keeps flow_rails as an explicit "use this for every rail" override.
const RAIL_ALPHA = 0.15;
const LEGACY_RAIL_TRACKS = ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.06)'];

// rail id suffix -> the node whose colour that rail borrows (where the power is going)
const RAIL_TARGETS = {
  'solar-home': 'home',
  'solar-battery': 'battery',
  'solar-ev': 'ev',
  'solar-tesla': 'ev',
  'solar-grid': 'export',
  'grid-home': 'home',
  'grid-battery': 'battery',
  'grid-ev': 'ev',
  'grid-tesla': 'ev',
  'battery-home': 'home',
  'battery-ev': 'ev',
  'battery-grid': 'export'
};

function resolveRailColors(colors, pal) {
  const c = colors || {};
  const p = pal || {};
  const shared = (c.flow_rails && !LEGACY_RAIL_TRACKS.includes(c.flow_rails)) ? c.flow_rails : null;
  const node = {
    home: p.home || '#00e5ff',
    battery: p.battery || '#10b981',
    ev: p.ev || p.device || '#b388ff',
    export: p.export || '#00e676'
  };
  const out = {};
  for (const rail of Object.keys(RAIL_TARGETS)) {
    if (shared) { out[rail] = shared; continue; }
    const key = rail.replace(/-/g, '_');
    const colour = c[`flow_${key}_end`] || c[`flow_${key}_start`] || node[RAIL_TARGETS[rail]];
    out[rail] = hexToRgba(colour, RAIL_ALPHA);
  }
  return out;
}

function getRandomVibrantHex(baseHue) {
  const h = (baseHue !== undefined) ? (Math.round(baseHue) % 360) : Math.floor(Math.random() * 360);
  const s = 82 + Math.floor(Math.random() * 18);
  const l = 54 + Math.floor(Math.random() * 12);
  return hslToHex(h, s, l);
}

class AresEnergyFlowCard extends HTMLElement {
  static async getConfigElement() {
    if (window.loadCardHelpers) {
      await window.loadCardHelpers();
    }
    return document.createElement('ares-energy-flow-card-editor');
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._rendered = false;
    this._currentW = 0;
    this._solarSrcKey = '';
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
      show_battery: true,
      show_ev: true,
      allow_battery_to_ev: false,
      allow_grid_to_battery: false,
      show_grid_out: true,
      battery_capacity_kwh: 0,
      solar_priority: 'home',
      battery_position: 'left',
      battery_name: 'BESS',
      ev_name: 'Tesla',
      battery_positive_charging: true
    };
  }

  _isBatteryMode() {
    return this._hasBattery();
  }

  _getEntities() {
    const cfgEnts = this._config?.entities || {};
    const states = this._hass?.states || {};

    const resolve = (key, candidates) => {
      if (cfgEnts[key]) return cfgEnts[key];
      for (const cand of candidates) {
        if (states[cand] && states[cand].state !== 'unknown' && states[cand].state !== 'unavailable') return cand;
      }
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
      solar_daily_peak: resolve('solar_daily_peak', [
        'sensor.solar_daily_peak_power',
        'sensor.living_room_shellyem_e4525b_channel_2_solar_peak_today'
      ]),
      electricity_tariff: resolve('electricity_tariff', [
        'sensor.precio_kwh',
        'sensor.electricity_price',
        'sensor.current_electricity_price'
      ]),
      battery_temp: resolve('battery_temp', [
        'sensor.battery_temperature',
        'sensor.powerwall_battery_temperature',
        'sensor.bess_temperature'
      ]),
      battery_soh: resolve('battery_soh', [
        'sensor.battery_state_of_health',
        'sensor.bess_soh',
        'sensor.battery_health'
      ]),
      grid_power: resolve('grid_power', [
        'sensor.shellyem_e4525b_channel_1_power',
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
        'sensor.living_room_shellyem_e4525b_channel_1_grid_daily_export_energy',
        'sensor.energy_exported_today',
        'sensor.daily_grid_export',
        'sensor.grid_export_today'
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
      tesla_soc: resolve('tesla_soc', [
        'sensor.mr_white_battery_level',
        'sensor.mr_white_usable_battery_level',
        'sensor.tesla_ble_garage_charge_level',
        'sensor.tesla_battery_level',
        'sensor.ev_battery_level',
        'sensor.battery_level',
        'sensor.ev_soc'
      ]),
      tesla_range: resolve('tesla_range', [
        'sensor.mr_white_battery_range',
        'sensor.mr_white_ideal_battery_range',
        'sensor.tesla_ble_garage_range',
        'sensor.tesla_range',
        'sensor.ev_range'
      ]),
      tesla_charging_state: resolve('tesla_charging_state', [
        'sensor.mr_white_charging_state',
        'sensor.tesla_ble_garage_charging_state',
        'sensor.tesla_charging_state',
        'sensor.ev_status'
      ]),
      tesla_charge_limit: resolve('tesla_charge_limit', [
        'number.mr_white_charge_limit',
        'number.tesla_charge_limit',
        'sensor.mr_white_charge_limit',
        'sensor.tesla_charge_limit'
      ]),
      tesla_time_to_full: resolve('tesla_time_to_full', [
        'sensor.mr_white_time_to_full_charge',
        'sensor.tesla_time_to_full_charge'
      ]),
      ev_session_energy: resolve('ev_session_energy', [
        'sensor.mr_white_charge_energy_added',
        'sensor.evse_192_168_0_249_charge_energy',
        'sensor.v2c_trydan_charge_energy',
        'sensor.wallbox_energy_added'
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
        'sensor.easee_lifetime_energy',
        'sensor.charger_energy'
      ]),
      battery_power: resolve('battery_power', [
        'sensor.battery_power',
        'sensor.bess_power',
        'sensor.powerwall_battery_now',
        'sensor.home_battery_power',
        'sensor.storage_power'
      ]),
      battery_soc: resolve('battery_soc', [
        'sensor.battery_soc',
        'sensor.battery_state_of_charge',
        'sensor.powerwall_charge',
        'sensor.battery_level',
        'sensor.home_battery_soc'
      ]),
      battery_daily_charge: resolve('battery_daily_charge', [
        'sensor.battery_daily_charge_energy',
        'sensor.battery_charge_today',
        'sensor.powerwall_daily_charge'
      ]),
      battery_daily_discharge: resolve('battery_daily_discharge', [
        'sensor.battery_daily_discharge_energy',
        'sensor.battery_discharge_today',
        'sensor.powerwall_daily_discharge'
      ]),
      solcast_today: resolve('solcast_today', [
        'sensor.solcast_pv_forecast_forecast_today',
        'sensor.solcast_forecast_today',
        'sensor.solcast_today'
      ]),
      solcast_remaining: resolve('solcast_remaining', [
        'sensor.solcast_pv_forecast_forecast_remaining_today',
        'sensor.solcast_forecast_remaining_today',
        'sensor.solcast_remaining_today'
      ])
    };
  }

  _hasBattery() {
    if (this._activePreset) return true;
    if (this._bessOverride === 'hide') return false;
    const cfg = this._config || {};
    if (typeof cfg.show_battery === 'boolean') return cfg.show_battery;
    if (typeof cfg.show_bess === 'boolean') return cfg.show_bess;
    if (cfg.bess === true) return true;
    const ents = this._getEntities();
    return Boolean(ents.battery_power || ents.battery_daily_charge || ents.battery_daily_discharge);
  }

  _hasEv() {
    if (this._activePreset) return true;
    const cfg = this._config || {};
    if (typeof cfg.show_ev === 'boolean') return cfg.show_ev;
    if (typeof cfg.show_tesla === 'boolean') return cfg.show_tesla;
    const ents = this._getEntities();
    return Boolean(ents.ev_power || ents.ev_charging || ents.ev_daily_energy || ents.tesla_battery_level);
  }

  _getLayoutMode() {
    if (this._activePreset) return 'dual';
    const hasB = this._hasBattery();
    const hasE = this._hasEv();
    if (hasB && hasE) return 'dual';
    if (hasB) {
      const pos = this._config?.battery_position || 'left';
      return (pos === 'right') ? 'battery-only' : 'battery-left';
    }
    if (hasE) return 'ev-only';
    return 'none';
  }

  _getLabels() {
    const cfg = this._config || {};
    const l = cfg.labels || {};
    return {
      solar: l.solar || cfg.lbl_solar || 'Solar',
      home: l.home || cfg.lbl_home || 'Home',
      grid_in: l.grid_in || cfg.lbl_grid_in || 'Grid In',
      grid_out: l.grid_out || cfg.lbl_grid_out || 'Grid Out',
      battery: l.battery || cfg.battery_name || 'BESS',
      ev: l.ev || cfg.ev_name || 'Tesla',
      autarky: l.autarky || cfg.lbl_autarky || 'AUTARKY',
      autarky_sub: l.autarky_sub || cfg.lbl_autarky_sub || 'Grid-Free',
      self_consumed: l.self_consumed || cfg.lbl_self_consumed || 'SOLAR SELF-CONSUMED',
      self_consumed_sub: l.self_consumed_sub || cfg.lbl_self_consumed_sub || '100% Free',
      grid_reliance: l.grid_reliance || cfg.lbl_grid_reliance || 'UTILITY GRID RELIANCE',
      grid_reliance_sub: l.grid_reliance_sub || cfg.lbl_grid_reliance_sub || 'Night/Backup',
      exported: l.exported || cfg.lbl_exported || 'EXPORTED TO GRID',
      exported_sub: l.exported_sub || cfg.lbl_exported_sub || 'Clean Surplus',
      solar_value: l.solar_value || cfg.lbl_solar_value || 'Total Solar Value',
      solar_value_sub: l.solar_value_sub || cfg.lbl_solar_value_sub || 'Free power used + export',
      virtual_battery: l.virtual_battery || cfg.lbl_virtual_battery || 'Virtual Battery',
      virtual_battery_sub: l.virtual_battery_sub || cfg.lbl_virtual_battery_sub || 'Added to wallet',
      grid_balance: l.grid_balance || cfg.lbl_grid_balance || 'Grid Balance',
      grid_balance_sub: l.grid_balance_sub || cfg.lbl_grid_balance_sub || 'Cost of grid import',
      scorecard_solar_value: l.scorecard_solar_value || cfg.lbl_scorecard_solar_value || "TODAY'S SOLAR VALUE",
      battery_charged: l.battery_charged || cfg.lbl_battery_charged || 'Charged Today',
      battery_discharged: l.battery_discharged || cfg.lbl_battery_discharged || 'Discharged',
      battery_net: l.battery_net || cfg.lbl_battery_net || 'Net'
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

  _getSolarSources() {
    if (this._config?.show_solar_sources === false) return [];
    const raw = this._config && this._config.solar_sources;
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((src) => src && (src.power || src.entity))
      .map((src, i) => ({
        name: src.name || `Solar ${i + 1}`,
        power: src.power || src.entity,
        daily_yield: src.daily_yield || '',
        color: src.color || ''
      }));
  }

  _renderSolarSources(srcs, watts, fmtPwr, liveSolarW) {
    const card = this.shadowRoot.querySelector('ha-card');
    const box = this.shadowRoot.getElementById('solar-sources');
    const showSources = this._config?.show_solar_sources !== false;
    const on = showSources && srcs.length >= 1;
    const wasOn = card ? card.classList.contains('has-solar-sources') : false;
    if (card) card.classList.toggle('has-solar-sources', on);
    if (!box) return;
    if (!on) {
      if (box.childElementCount) box.innerHTML = '';
      this._solarSrcKey = '';
      if (wasOn) requestAnimationFrame(() => this._updateFlowPaths());
      return;
    }
    const t = this._solarSrcTheme || {};
    const esc = (v) => String(v).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const key = srcs.map((src) => `${src.name}|${src.color}`).join(';');
    if (this._solarSrcKey !== key || box.childElementCount !== srcs.length) {
      this._solarSrcKey = key;
      box.innerHTML = srcs.map((src) => `
        <div class="solar-src" style="border-color: ${esc(src.color || t.border || 'rgba(255,255,255,0.2)')};">
          <div class="solar-src-row">
            <span class="solar-src-name" style="color: ${esc(t.title || 'inherit')};">${esc(src.name)}</span>
            <span class="solar-src-pwr" style="color: ${esc(t.pwr || 'inherit')};">0 W</span>
          </div>
          <div class="solar-src-row">
            <span class="solar-src-kwh" style="color: ${esc(t.kwh || 'inherit')};"></span>
            <span class="solar-src-pct" style="color: ${esc(t.kwh || 'inherit')};"></span>
          </div>
          <div class="solar-src-track"><div class="solar-src-bar" style="background: ${esc(src.color || t.bar || '#ffd54f')};"></div></div>
        </div>`).join('');
      requestAnimationFrame(() => this._updateFlowPaths());
    } else if (!wasOn) {
      requestAnimationFrame(() => this._updateFlowPaths());
    }
    const srcSum = watts.reduce((a, b) => a + b, 0);
    const basePwr = Math.max(liveSolarW || 0, srcSum);
    srcs.forEach((src, i) => {
      const tile = box.children[i];
      if (!tile) return;
      tile.querySelector('.solar-src-pwr').textContent = fmtPwr(watts[i]);
      const eY = src.daily_yield ? this._hass.states[src.daily_yield] : null;
      tile.querySelector('.solar-src-kwh').textContent = eY ? `${this._parseEnergy(eY).toFixed(1)} kWh today` : '';
      const pct = basePwr > 0 ? Math.round((watts[i] / basePwr) * 100) : 0;
      tile.querySelector('.solar-src-pct').textContent = basePwr > 0 ? `${pct}%` : '';
      tile.querySelector('.solar-src-bar').style.width = `${pct}%`;
    });
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
      allow_battery_to_ev: false,
      allow_grid_to_battery: false,
      show_grid_out: true,
      show_export: true,
      show_idle_rails: true,
      battery_capacity_kwh: 0,
      solar_priority: 'home',
      show_sim_toolbar: true,
      ...config
    };

    this._fontScale = typeof this._config.font_scale === 'number' ? this._config.font_scale : 1.0;
    this.style.setProperty('--ares-font-scale', String(this._fontScale));
    this._financialPlacementOverride = undefined;
    this._bessOverride = undefined;

    if (!this._rendered) {
      this._render();
    } else {
      this._activePreset = null;
      const simSel = this.shadowRoot?.getElementById('sim-scenario-select');
      if (simSel) simSel.value = 'live';
      this._applyConfigVisibility();
      this._updateCustomStyles();
      this._applyThemeStyles();
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
      this._el?.flowSolarBattery,
      this._el?.flowSolarEV,
      this._el?.flowSolarTesla,
      this._el?.flowSolarGrid,
      this._el?.flowGridHome,
      this._el?.flowGridBattery,
      this._el?.flowGridEV,
      this._el?.flowGridTesla,
      this._el?.flowBatteryHome,
      this._el?.flowBatteryEV,
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
      // The device rails depend on entities (_hasEv / _hasBattery), and Home Assistant assigns
      // hass after setConfig, so the first visibility pass runs while nothing is resolvable.
      // Re-run it whenever those inputs change, or the EV and battery rails stay hidden for
      // the life of the card.
      const visKey = [this._getLayoutMode(), this._hasBattery(), this._hasEv(), this._config?.show_grid_out, this._config?.show_export].join('|');
      if (this._visKey !== visKey) {
        this._visKey = visKey;
        this._applyConfigVisibility();
      }
      this._update();
    }
  }

  _render() {
    this._rendered = true;
    this.style.setProperty('--ares-font-scale', String(this._fontScale || 1.0));

    const pKey = (this._config && this._config.palette) || 'solar';
    const pal = PALETTES[pKey] || PALETTES.solar;
    const isFitness = (pKey === 'fitness');
    const layoutMode = this._getLayoutMode();
    const isBattery = this._hasBattery();
    const lbls = this._getLabels();

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

      // 4. Battery Box Elements
      bg_battery: pal.bg_battery || 'rgba(16, 185, 129, 0.12)',
      border_battery: pal.border_battery || 'rgba(16, 185, 129, 0.3)',
      title_battery: pal.battery || '#10b981',
      pwr_battery: '#ffffff',
      kwh_battery: 'rgba(255, 255, 255, 0.6)',
      badge_battery_text: pal.battery || '#10b981',
      badge_battery_bg: pal.bg_battery || 'rgba(16, 185, 129, 0.12)',
      bar_battery_soc: pal.battery || '#10b981',

      // 4b. EV Box Elements
      bg_ev: pal.bg_ev || pal.bg_device,
      border_ev: pal.border_ev || pal.border_device,
      title_ev: pal.ev || pal.device,
      pwr_ev: '#ffffff',
      kwh_ev: 'rgba(255, 255, 255, 0.6)',
      badge_ev_text: pal.ev || pal.device,
      badge_ev_bg: pal.bg_ev || pal.bg_device,
      bar_ev_soc: pal.ev || pal.device,

      // Legacy fallback mapping
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
      flow_solar_battery: pal.battery || '#10b981',
      flow_solar_ev: pal.ev || pal.device,
      flow_solar_tesla: pal.ev || pal.device,
      flow_solar_grid: pal.solar,
      flow_grid_home: pal.grid,
      flow_grid_battery: pal.grid,
      flow_grid_ev: pal.grid,
      flow_grid_tesla: pal.grid,
      flow_battery_home: pal.battery || '#10b981',
      flow_battery_ev: pal.battery || '#10b981',
      flow_battery_grid: pal.battery || '#10b981',

      // 7. Activity Rings & Scorecard Center
      ring_autarky: pal.autarky,
      ring_import: pal.import_ring,
      ring_export: pal.export_ring,
      autarky_center_pct: '#ffffff',
      autarky_center_lbl: pal.autarky,

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

    // 4. Battery Box
    const cBatteryBg = colors.bg_battery || d.bg_battery;
    const cBatteryBorder = colors.border_battery || d.border_battery;
    const cTitleBattery = colors.title_battery || d.title_battery;
    const cPwrBattery = colors.pwr_battery || d.pwr_battery;
    const cKwhBattery = colors.kwh_battery || d.kwh_battery;
    const cBadgeBatteryText = colors.badge_battery_text || d.badge_battery_text;
    const cBadgeBatteryBg = colors.badge_battery_bg || d.badge_battery_bg;
    const cBarBatterySoc = colors.bar_battery_soc || d.bar_battery_soc;

    // 4b. EV Box
    const cEvBg = colors.bg_ev || colors.bg_device || d.bg_ev;
    const cEvBorder = colors.border_ev || colors.border_device || d.border_ev;
    const cTitleEv = colors.title_ev || colors.title_device || d.title_ev;
    const cPwrEv = colors.pwr_ev || colors.pwr_device || d.pwr_ev;
    const cKwhEv = colors.kwh_ev || colors.kwh_device || d.kwh_ev;
    const cBadgeEvText = colors.badge_ev_text || colors.badge_device_text || d.badge_ev_text;
    const cBadgeEvBg = colors.badge_ev_bg || colors.badge_device_bg || d.badge_ev_bg;
    const cBarEvSoc = colors.bar_ev_soc || colors.bar_device_soc || d.bar_ev_soc;

    // 5. Grid Out (Export) Box
    const cExportBg = colors.bg_export || d.bg_export;
    const cExportBorder = colors.border_export || d.border_export;
    const cTitleExport = colors.title_export || d.title_export;
    const cPwrExport = colors.pwr_export || d.pwr_export;
    const cKwhExport = colors.kwh_export || d.kwh_export;

    // 6. Dedicated Flow Lines with Dual-Color Endpoints
    const cSolarHomeStart = colors.flow_solar_home_start || (colors.flow_solar_home ? colors.flow_solar_home : pal.solar);
    const cSolarHomeEnd = colors.flow_solar_home_end || (colors.flow_solar_home ? colors.flow_solar_home : pal.home);

    const cSolarBatteryStart = colors.flow_solar_battery_start || (colors.flow_solar_battery ? colors.flow_solar_battery : pal.solar);
    const cSolarBatteryEnd = colors.flow_solar_battery_end || (colors.flow_solar_battery ? colors.flow_solar_battery : (pal.battery || '#10b981'));

    const cSolarEvStart = colors.flow_solar_ev_start || colors.flow_solar_tesla_start || (colors.flow_solar_ev ? colors.flow_solar_ev : pal.solar);
    const cSolarEvEnd = colors.flow_solar_ev_end || colors.flow_solar_tesla_end || (colors.flow_solar_ev ? colors.flow_solar_ev : (pal.ev || pal.device));

    const cSolarGridStart = colors.flow_solar_grid_start || (colors.flow_solar_grid ? colors.flow_solar_grid : pal.solar);
    const cSolarGridEnd = colors.flow_solar_grid_end || (colors.flow_solar_grid ? colors.flow_solar_grid : pal.export);

    const cGridHomeStart = colors.flow_grid_home_start || (colors.flow_grid_home ? colors.flow_grid_home : pal.grid);
    const cGridHomeEnd = colors.flow_grid_home_end || (colors.flow_grid_home ? colors.flow_grid_home : pal.home);

    const cGridBatteryStart = colors.flow_grid_battery_start || (colors.flow_grid_battery ? colors.flow_grid_battery : pal.grid);
    const cGridBatteryEnd = colors.flow_grid_battery_end || (colors.flow_grid_battery ? colors.flow_grid_battery : (pal.battery || '#10b981'));

    const cGridEvStart = colors.flow_grid_ev_start || colors.flow_grid_tesla_start || (colors.flow_grid_ev ? colors.flow_grid_ev : pal.grid);
    const cGridEvEnd = colors.flow_grid_ev_end || colors.flow_grid_tesla_end || (colors.flow_grid_ev ? colors.flow_grid_ev : (pal.ev || pal.device));

    const cBatteryHomeStart = colors.flow_battery_home_start || (colors.flow_battery_home ? colors.flow_battery_home : (pal.battery || '#10b981'));
    const cBatteryHomeEnd = colors.flow_battery_home_end || (colors.flow_battery_home ? colors.flow_battery_home : pal.home);

    const cBatteryEvStart = colors.flow_battery_ev_start || (colors.flow_battery_ev ? colors.flow_battery_ev : (pal.battery || '#10b981'));
    const cBatteryEvEnd = colors.flow_battery_ev_end || (colors.flow_battery_ev ? colors.flow_battery_ev : (pal.ev || pal.device));

    const cBatteryGridStart = colors.flow_battery_grid_start || (colors.flow_battery_grid ? colors.flow_battery_grid : (pal.battery || '#10b981'));
    const cBatteryGridEnd = colors.flow_battery_grid_end || (colors.flow_battery_grid ? colors.flow_battery_grid : pal.export);

    const railColors = resolveRailColors(colors, pal);

    // 7. Activity Rings & Center Scorecard
    const cAutarky = colors.ring_autarky || d.ring_autarky;
    const cImportRing = colors.ring_import || d.ring_import;
    const cExportRing = colors.ring_export || d.ring_export;
    const cPctCenter = colors.autarky_center_pct || d.autarky_center_pct;
    const cLblCenter = colors.autarky_center_lbl || d.autarky_center_lbl;
    const ringTracks = resolveRingTracks(colors, d);
    const cAutarkyTrack = ringTracks.autarky;
    const cImportTrack = ringTracks.import;
    const cExportTrack = ringTracks.export;

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

    // Card chrome: optionally follow the active Home Assistant theme (use_ha_theme),
    // with optional colors.card_bg / colors.card_border / colors.card_glow overrides
    const useHaTheme = this._config.use_ha_theme === true;
    const cCardBg = colors.card_bg || (useHaTheme ? 'var(--ha-card-background, var(--card-background-color, #11141a))' : 'linear-gradient(145deg, #11141a 0%, #1a1e26 100%)');
    const cCardBorder = colors.card_border || (useHaTheme ? 'var(--ha-card-border-color, var(--divider-color, rgba(255, 255, 255, 0.12)))' : pal.card_border);
    const cCardRadius = useHaTheme ? 'var(--ha-card-border-radius, 12px)' : '20px';
    const cCardShadow = useHaTheme ? 'var(--ha-card-box-shadow, none)' : '0 12px 40px rgba(0, 0, 0, 0.5)';
    const cCardFont = useHaTheme ? 'var(--primary-font-family, -apple-system, BlinkMacSystemFont, Roboto, sans-serif)' : "-apple-system, BlinkMacSystemFont, 'SF Pro Display', Roboto, sans-serif";
    const cCardGlow = colors.card_glow
      ? `radial-gradient(circle at 50% 0%, ${colors.card_glow} 0%, transparent 60%)`
      : (useHaTheme
        ? 'radial-gradient(circle at 50% 0%, rgba(var(--rgb-primary-color, 0, 229, 255), 0.10) 0%, transparent 60%)'
        : `radial-gradient(circle at 50% 0%, ${isFitness ? 'rgba(250, 17, 79, 0.08)' : 'rgba(0, 229, 255, 0.08)'} 0%, rgba(14, 17, 24, 0.98) 60%)`);

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          box-sizing: border-box;
          font-family: ${cCardFont};
          --ares-font-scale: ${this._fontScale || 1.0};
        }
        ha-card {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 14px 14px;
          border-radius: ${cCardRadius};
          overflow: hidden;
          background: ${cCardBg};
          border: 1px solid ${cCardBorder};
          box-shadow: ${cCardShadow};
          isolation: isolate;
          container-type: inline-size;
          container-name: chromaflow;
        }

        .bg-glow {
          position: absolute;
          inset: 0;
          background: ${cCardGlow};
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
                .sim-toolbar {
          display: flex;
          align-items: center;
          gap: 6px;
          flex-wrap: nowrap;
          padding: 2px 2px 6px;
          margin-bottom: 2px;
          width: 100%;
          box-sizing: border-box;
        }
        .sim-label {
          font-size: 9.5px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.55);
          letter-spacing: 0.8px;
          flex-shrink: 0;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .sim-select {
          flex: 1;
          min-width: 0;
          background: rgba(14, 20, 32, 0.95);
          color: #00e5ff;
          border: 1px solid rgba(0, 229, 255, 0.45);
          border-radius: 8px;
          padding: 4px 8px;
          font-size: 11px;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sim-select:hover, .sim-select:focus {
          border-color: #00e5ff;
          box-shadow: 0 0 8px rgba(0, 229, 255, 0.3);
        }
        .sim-select option {
          background: #0e1420;
          color: #ffffff;
        }
        .sim-reset-btn {
          flex-shrink: 0;
          padding: 4px 10px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 700;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.08);
          color: rgba(255, 255, 255, 0.9);
          cursor: pointer;
          white-space: nowrap;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .sim-reset-btn:hover {
          background: rgba(0, 229, 255, 0.18);
          border-color: #00e5ff;
          color: #00e5ff;
          box-shadow: 0 0 10px rgba(0, 229, 255, 0.25);
          transform: translateY(-1px);
        }
        .sim-reset-btn:active {
          transform: translateY(0);
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
        ha-card.layout-dual .canvas-area, ha-card.layout-battery-left .canvas-area {
          height: calc(258px + max(0px, (var(--ares-font-scale, 1) - 1) * 90px));
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
          gap: 6px;
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
        /* Static, non-moving background rails. The tint lives in each rail's own stroke
           attribute (resolveRailColors), so the class only carries geometry styling. */
        .rail-path {
          fill: none;
          stroke-width: 2.2;
          opacity: 1;
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

        /* Multiple solar sources (solar_sources): per-source sub-tiles inside the Solar node */
        ha-card.has-solar-sources .canvas-area {
          height: calc(290px + max(0px, (var(--ares-font-scale, 1) - 1) * 130px));
        }
        ha-card.layout-dual.has-solar-sources .canvas-area, ha-card.layout-battery-left.has-solar-sources .canvas-area {
          height: calc(330px + max(0px, (var(--ares-font-scale, 1) - 1) * 130px));
        }
        .solar-sources { display: none; flex-direction: column; gap: 4px; margin-top: 5px; }
        ha-card.has-solar-sources .solar-sources { display: flex; }
        .solar-src { border: 1px solid; border-radius: 7px; padding: 3px 6px 4px; background: rgba(0, 0, 0, 0.18); min-width: 0; }
        .solar-src-row { display: flex; justify-content: space-between; align-items: baseline; gap: 4px; min-width: 0; }
        .solar-src-name { font-size: calc(10px * var(--ares-font-scale, 1)); font-weight: 800; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; min-width: 0; }
        .solar-src-pwr { font-size: calc(12.5px * var(--ares-font-scale, 1)); font-weight: 900; font-variant-numeric: tabular-nums; white-space: nowrap; }
        .solar-src-kwh, .solar-src-pct { font-size: calc(9px * var(--ares-font-scale, 1)); font-weight: 600; white-space: nowrap; font-variant-numeric: tabular-nums; }
        .solar-src-track { margin-top: 3px; height: 2px; background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden; }
        .solar-src-bar { height: 100%; width: 0%; transition: width 0.4s ease; }

        .node {
          position: relative;
          width: 100%;
          border-radius: 10px;
          padding: 5px 8px;
          box-sizing: border-box;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        ha-card.layout-dual .node, ha-card.layout-battery-left .node {
          padding: 4px 7px;
        }
        .node-pwr {
          font-size: calc(16.5px * var(--ares-font-scale, 1));
          font-weight: 900;
          line-height: 1.1;
          margin-top: 1.5px;
          font-variant-numeric: tabular-nums;
        }
        .node-kwh {
          font-size: calc(9.5px * var(--ares-font-scale, 1));
          font-weight: 600;
          margin-top: 1px;
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
            padding: 3px 5px !important;
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
            font-size: calc(13.5px * var(--ares-font-scale, 1)) !important;
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
            padding: 2.5px 4px !important;
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
            font-size: calc(12px * var(--ares-font-scale, 1)) !important;
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
      
        @keyframes icpPulse {
          0%, 100% {
            box-shadow: 0 0 10px rgba(255, 23, 68, 0.3);
            border-color: #ff1744;
          }
          50% {
            box-shadow: 0 0 24px rgba(255, 23, 68, 0.85);
            border-color: #ff5252;
          }
        }
        .node.pulse-icp-alert {
          animation: icpPulse 1.2s infinite ease-in-out !important;
        }
</style>

      <ha-card class="layout-${layoutMode}">
        <div class="bg-glow"></div>
        <div class="content">
          <!-- Interactive Simulation Test Bench Toolbar -->
          <div id="sim-toolbar" class="sim-toolbar" style="display: ${this._config?.show_sim_toolbar !== false ? 'flex' : 'none'};">
            <span class="sim-label"><span class="node-emoji">🎮 </span>SCENARIO:</span>
            <select id="sim-scenario-select" class="sim-select">
              <option value="live">🟢 Live Telemetry (My Card Settings)</option>
              <option value="all_flows_active">🔥 1. ALL 10 LINES ACTIVE (Maximum Stress Test)</option>
              <option value="solar_grid_all">🌐 2. Solar + Grid ➔ Batt + Home + EV + Grid Out</option>
              <option value="solar_all">☀️ 3. Solar Max (Home + Batt + EV + Grid Out)</option>
              <option value="solar_grid_batt">⛅ 4. Solar + Grid ➔ Batt (Dual-Source Battery Charging)</option>
              <option value="solar_grid_ev">⛅ 5. Solar + Grid ➔ EV (Dual-Source EV Fast Charging)</option>
              <option value="solar_batt_supply">⚡ 6. Solar + Batt ➔ Home + EV (Combined Solar & Battery Supply)</option>
              <option value="grid_batt_ev">🌙 7. Night Grid ➔ Batt + EV (Off-Peak Night Charging Both)</option>
              <option value="grid_home_batt">🌙 8. Night Grid ➔ Home + Batt (Off-Peak Battery Top-Up)</option>
              <option value="night_batt">🔋 9. Evening: Battery ➔ Home (100% Autarky Self-Power)</option>
              <option value="batt_to_ev">⚡ 10. Battery ➔ EV (Direct Battery to Car Transfer)</option>
              <option value="batt_export">🔄 11. VPP Battery Export (Battery Arbitrage to Grid)</option>
              <option value="icp_guard">⚠️ 12. ICP Guard (High Grid Load Warning 3.9 kW)</option>
            </select>
            <button id="sim-reset-btn" class="sim-reset-btn" title="Reset all simulations and return to your card layout and live telemetry">🔄 Reset to Default</button>
          </div>
          <!-- Flow Canvas Area -->
          <div class="canvas-area">
            <svg id="flow-svg" class="flow-svg" viewBox="0 0 400 232">
              <defs>
                <linearGradient id="flowSolarHome" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cSolarHomeStart}" />
                  <stop offset="100%" stop-color="${cSolarHomeEnd}" />
                </linearGradient>
                <linearGradient id="flowSolarBattery" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stop-color="${cSolarBatteryStart}" />
                  <stop offset="100%" stop-color="${cSolarBatteryEnd}" />
                </linearGradient>
                <linearGradient id="flowSolarEV" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cSolarEvStart}" />
                  <stop offset="100%" stop-color="${cSolarEvEnd}" />
                </linearGradient>
                <linearGradient id="flowSolarTesla" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cSolarEvStart}" />
                  <stop offset="100%" stop-color="${cSolarEvEnd}" />
                </linearGradient>
                <linearGradient id="flowSolarGrid" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cSolarGridStart}" />
                  <stop offset="100%" stop-color="${cSolarGridEnd}" />
                </linearGradient>
                <linearGradient id="flowGridHome" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cGridHomeStart}" />
                  <stop offset="100%" stop-color="${cGridHomeEnd}" />
                </linearGradient>
                <linearGradient id="flowGridBattery" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stop-color="${cGridBatteryStart}" />
                  <stop offset="100%" stop-color="${cGridBatteryEnd}" />
                </linearGradient>
                <linearGradient id="flowGridEV" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cGridEvStart}" />
                  <stop offset="100%" stop-color="${cGridEvEnd}" />
                </linearGradient>
                <linearGradient id="flowGridTesla" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cGridEvStart}" />
                  <stop offset="100%" stop-color="${cGridEvEnd}" />
                </linearGradient>
                <linearGradient id="flowBatteryHome" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cBatteryHomeStart}" />
                  <stop offset="100%" stop-color="${cBatteryHomeEnd}" />
                </linearGradient>
                <linearGradient id="flowBatteryEV" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cBatteryEvStart}" />
                  <stop offset="100%" stop-color="${cBatteryEvEnd}" />
                </linearGradient>
                <linearGradient id="flowBatteryGrid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="${cBatteryGridStart}" />
                  <stop offset="100%" stop-color="${cBatteryGridEnd}" />
                </linearGradient>
              </defs>

              <!-- Inactive Background Rails (Static, Non-Moving). Each one is tinted with the
                   colour of the node its flow feeds, at RAIL_ALPHA, like v1.x did. -->
              <path id="rail-solar-home" class="rail-path" stroke="${railColors['solar-home']}" />
              <path id="rail-solar-battery" class="rail-path" stroke="${railColors['solar-battery']}" style="display: none;" />
              <path id="rail-solar-ev" class="rail-path" stroke="${railColors['solar-ev']}" style="display: none;" />
              <path id="rail-solar-grid" class="rail-path" stroke="${railColors['solar-grid']}" />
              <path id="rail-grid-home" class="rail-path" stroke="${railColors['grid-home']}" />
              <path id="rail-grid-battery" class="rail-path" stroke="${railColors['grid-battery']}" style="display: none;" />
              <path id="rail-grid-ev" class="rail-path" stroke="${railColors['grid-ev']}" style="display: none;" />
              <path id="rail-battery-home" class="rail-path" stroke="${railColors['battery-home']}" style="display: none;" />
              <path id="rail-battery-ev" class="rail-path" stroke="${railColors['battery-ev']}" style="display: none;" />
              <path id="rail-battery-grid" class="rail-path" stroke="${railColors['battery-grid']}" style="display: none;" />

              <!-- Active Colored Flows (Animated) -->
              <path id="flow-solar-home" class="flow-path" stroke="url(#flowSolarHome)" stroke-width="3" style="display: none;" />
              <path id="flow-solar-battery" class="flow-path" stroke="url(#flowSolarBattery)" stroke-width="3" style="display: none;" />
              <path id="flow-solar-ev" class="flow-path" stroke="url(#flowSolarEV)" stroke-width="3" style="display: none;" />
              <path id="flow-solar-tesla" class="flow-path" stroke="url(#flowSolarTesla)" stroke-width="3" style="display: none;" />
              <path id="flow-battery-home" class="flow-path" stroke="url(#flowBatteryHome)" stroke-width="3" style="display: none;" />
              <path id="flow-battery-ev" class="flow-path" stroke="url(#flowBatteryEV)" stroke-width="3" style="display: none;" />
              <path id="flow-battery-grid" class="flow-path" stroke="url(#flowBatteryGrid)" stroke-width="3" style="display: none;" />
              <path id="flow-solar-grid" class="flow-path" stroke="url(#flowSolarGrid)" stroke-width="3" style="display: none;" />
              <path id="flow-grid-home" class="flow-path" stroke="url(#flowGridHome)" stroke-width="3" style="display: none;" />
              <path id="flow-grid-battery" class="flow-path" stroke="url(#flowGridBattery)" stroke-width="3" style="display: none;" />
              <path id="flow-grid-ev" class="flow-path" stroke="url(#flowGridEV)" stroke-width="3" style="display: none;" />
              <path id="flow-grid-tesla" class="flow-path" stroke="url(#flowGridTesla)" stroke-width="3" style="display: none;" />
            </svg>

            <!-- Column: Left (Solar, Battery, Grid In) -->
            <div id="col-left" class="col-left">
              <!-- Node: Solar (Left-Top) -->
              <div id="node-solar" class="node" style="min-height: 60px; position: relative; overflow: hidden; display: flex; flex-direction: column; justify-content: center; background: ${cSolarBg}; border: 1.5px solid ${cSolarBorder}; cursor: pointer;">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleSolar}; min-width: 0; flex-shrink: 1;">
                    <span class="node-emoji" style="font-size: 13px; line-height: 1; flex-shrink: 0;">☀️</span>
                    <span id="lbl-solar" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;">${lbls.solar}</span>
                  </div>
                  <span id="badge-solar-forecast" class="badge" style="color: ${cBadgeSolarText}; background: ${cBadgeSolarBg}; border: 0.5px solid ${cSolarBorder};">-- kWh EST</span>
                  <span id="badge-solar-fin" class="badge" style="display: none; color: #00e676; background: rgba(0, 230, 118, 0.12); border: 0.5px solid rgba(0, 230, 118, 0.35); font-size: 7px; padding: 1px 4px; border-radius: 6px; font-weight: 700;">+0,00 €</span>
                </div>

                <!-- View A: Clean Telemetry Numbers (Default: Zero Overlap) -->
                <div id="solar-view-telemetry">
                  <div id="pwr-solar" class="node-pwr" style="color: ${cPwrSolar};">0 W</div>
                  <div id="kwh-solar" class="node-kwh" style="color: ${cKwhSolar};">0.00 kWh today</div>
                  <div id="kwh-solar-rem" class="node-kwh" style="display: none; color: ${cKwhSolarRem};">0.0 kWh remaining</div>
                  <div id="bar-solar-forecast-box" style="margin-top: 4px; width: 100%; height: 3px; background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden; display: none;">
                    <div id="bar-solar-forecast-fill" style="width: 0%; height: 100%; background: ${cBarSolar}; transition: width 0.4s ease;"></div>
                  </div>
                  <div id="solar-sources" class="solar-sources"></div>
                </div>

                <!-- View B: Dedicated 12-Hour Generation Chart View (On Tap) -->
                <div id="solar-view-chart" style="display: none; height: 50px; position: relative; margin-top: 4px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; font-size: 11.5px; font-weight: 700; color: ${cPwrSolar};">
                    <span id="solar-chart-live-val">0 W</span>
                    <span id="solar-chart-peak-val" style="font-size: 9.5px; opacity: 0.75; font-weight: 600;">PEAK: --</span>
                  </div>
                  <svg id="sparkline-solar" viewBox="0 0 100 28" preserveAspectRatio="none" style="width: 100%; height: 32px; margin-top: 2px; overflow: visible; display: block;">
                    <defs>
                      <linearGradient id="gradSolarSpark" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#ffd54f" stop-opacity="0.55"/>
                        <stop offset="100%" stop-color="#ffd54f" stop-opacity="0.0"/>
                      </linearGradient>
                    </defs>
                    <path id="sparkline-solar-fill" fill="url(#gradSolarSpark)" d="" />
                    <path id="sparkline-solar-line" fill="none" stroke="#ffd54f" stroke-width="1.8" stroke-linecap="round" d="" />
                  </svg>
                </div>
              </div>

              <!-- Node: Battery Storage (Left-Middle in Dual Mode) -->
              <div id="node-battery" class="node" style="min-height: 52px; display: flex; flex-direction: column; justify-content: center; background: ${cBatteryBg}; border: 1.5px solid ${cBatteryBorder}; cursor: pointer;" title="Tap to switch between Live Telemetry and Battery Details">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleBattery}; min-width: 0; flex-shrink: 1;">
                    <span class="node-emoji" style="font-size: 12px; line-height: 1; flex-shrink: 0;">🔋</span>
                    <span id="lbl-battery" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;">${lbls.battery}</span>
                  </div>
                  <span id="badge-battery" class="badge" style="color: ${cBadgeBatteryText}; background: ${cBadgeBatteryBg}; border: 0.5px solid ${cBatteryBorder}; display: none;">IDLE</span>
                </div>

                <!-- View 1: Live Telemetry (Default) -->
                <div id="battery-view-live" style="display: flex; flex-direction: column;">
                  <div id="pwr-battery" class="node-pwr" style="color: ${cPwrBattery};">0 W</div>
                  <div id="kwh-battery" class="node-kwh" style="color: ${cKwhBattery};">0% SoC</div>
                  <div id="bar-battery-soc-box" style="margin-top: 4px; width: 100%; height: 3px; background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden; display: none;">
                    <div id="bar-battery-soc-fill" style="width: 0%; height: 100%; background: ${cBarBatterySoc}; transition: width 0.4s ease;"></div>
                  </div>
                </div>

                <!-- View 2: Tapped Secondary Battery Stats -->
                <div id="battery-view-stats" style="display: none; flex-direction: column; gap: 1px; margin-top: 2px;">
                  <div style="display: flex; justify-content: space-between; align-items: baseline; font-size: 11px; font-weight: 800; color: ${cPwrBattery};">
                    <span id="battery-stat-1-val">--</span>
                    <span id="battery-stat-2-val" style="font-size: 10px; opacity: 0.85;">--</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; font-size: 7.5px; color: ${cKwhBattery}; font-weight: 600;">
                    <span id="battery-stat-1-lbl">Charged Today</span>
                    <span id="battery-stat-2-lbl">Discharged</span>
                  </div>
                  <div id="battery-stat-sub" style="font-size: 7.5px; opacity: 0.8; color: ${cKwhBattery}; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 1px;">
                    Net: +0.0 kWh
                  </div>
                </div>
              </div>

              <!-- Node: Grid In (Left-Bottom) -->
              <div id="node-grid" class="node" style="min-height: 52px; display: flex; flex-direction: column; justify-content: center; background: ${cGridBg}; border: 1.5px solid ${cGridBorder};">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleGrid}; min-width: 0; flex-shrink: 1;">
                    <span class="node-emoji" style="font-size: 12px; line-height: 1; flex-shrink: 0;">🏭</span>
                    <span id="lbl-grid-in" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;">${lbls.grid_in}</span>
                  </div>
                  <span id="badge-grid-guard" class="badge" style="color: ${cBadgeGridText}; background: ${cBadgeGridBg}; border: 0.5px solid ${cGridBorder}; display: none;">4.2 kW MAX</span>
                </div>
                <div id="pwr-grid" class="node-pwr" style="color: ${cPwrGrid};">0 W</div>
                <div id="kwh-grid" class="node-kwh" style="color: ${cKwhGrid};">0.00 kWh imported</div>
              </div>
            </div>

            <!-- Column: Right (Home, EV, Grid Out) -->
            <div id="col-right" class="col-right">
              <!-- Node: Home (Right-Top) -->
              <div id="node-home" class="node" style="min-height: 52px; display: flex; flex-direction: column; justify-content: center; background: ${cHomeBg}; border: 1.5px solid ${cHomeBorder};">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleHome}; min-width: 0; flex-shrink: 1;">
                    <span class="node-emoji" style="font-size: 12px; line-height: 1; flex-shrink: 0;">🏠</span>
                    <span id="lbl-home" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;">${lbls.home}</span>
                  </div>
                  <span id="badge-home" class="badge" style="color: ${cBadgeHomeText}; background: ${cBadgeHomeBg}; border: 0.5px solid ${cHomeBorder};">100% SOLAR</span>
                </div>
                <div id="pwr-home" class="node-pwr" style="color: ${cPwrHome};">0 W</div>
                <div id="kwh-home" class="node-kwh" style="color: ${cKwhHome};">0.00 kWh solar</div>
              </div>

              <!-- Node: Electric Vehicle (Right-Middle) -->
              <div id="node-ev" class="node" style="min-height: 52px; display: flex; flex-direction: column; justify-content: center; background: ${cEvBg}; border: 1.5px solid ${cEvBorder};">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleEv}; min-width: 0; flex-shrink: 1;">
                    <span id="icon-ev" class="node-emoji" style="font-size: 12px; line-height: 1; flex-shrink: 0;">🚗</span>
                    <span id="lbl-ev" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex-shrink: 0;">${lbls.ev}</span>
                  </div>
                  <span id="badge-ev" class="badge" style="color: ${cBadgeEvText}; background: ${cBadgeEvBg}; border: 0.5px solid ${cEvBorder}; display: none;">CHARGING</span>
                </div>
                <div id="pwr-ev" class="node-pwr" style="color: ${cPwrEv};">0 W</div>
                <div id="kwh-ev" class="node-kwh" style="color: ${cKwhEv};">0.00 kWh charged</div>
                <div id="bar-ev-soc-box" style="margin-top: 4px; width: 100%; height: 3px; background: rgba(255, 255, 255, 0.08); border-radius: 2px; overflow: hidden; display: none;">
                  <div id="bar-ev-soc-fill" style="width: 0%; height: 100%; background: ${cBarEvSoc}; transition: width 0.4s ease;"></div>
                </div>
              </div>

              <!-- Node: Grid Out (Right-Bottom) -->
              <div id="node-export" class="node" style="min-height: 52px; display: flex; flex-direction: column; justify-content: center; background: ${cExportBg}; border: 1.5px solid ${cExportBorder};">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; min-width: 0;">
                  <div class="node-title" style="color: ${cTitleExport}; min-width: 0; flex-shrink: 1;">
                    <span class="node-emoji" style="font-size: 12px; line-height: 1; flex-shrink: 0;">🏭</span>
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
                <circle id="ring-track-autarky" cx="78" cy="78" r="68" fill="none" stroke="${cAutarkyTrack}" stroke-width="8" />
                <circle id="ring-autarky" cx="78" cy="78" r="68" fill="none" stroke="${cAutarky}" stroke-width="8" stroke-linecap="round" stroke-dasharray="427.26" stroke-dashoffset="427.26" style="transition: stroke-dashoffset 0.6s ease;" />

                <!-- Ring 2 (Middle): Grid Import -->
                <circle id="ring-track-import" cx="78" cy="78" r="54" fill="none" stroke="${cImportTrack}" stroke-width="8" />
                <circle id="ring-import" cx="78" cy="78" r="54" fill="none" stroke="${cImportRing}" stroke-width="8" stroke-linecap="round" stroke-dasharray="339.29" stroke-dashoffset="339.29" style="transition: stroke-dashoffset 0.6s ease;" />

                <!-- Ring 3 (Inner): Grid Export -->
                <circle id="ring-track-export" cx="78" cy="78" r="40" fill="none" stroke="${cExportTrack}" stroke-width="8" />
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
                <div id="bar-solar-self-consumed-bg" style="width: 100%; height: 4px; border-radius: 2px; background: ${cAutarkyTrack}; overflow: hidden; margin-top: 2px;">
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
                <div id="bar-grid-reliance-bg" style="width: 100%; height: 4px; border-radius: 2px; background: ${cImportTrack}; overflow: hidden; margin-top: 2px;">
                  <div id="bar-grid-reliance" style="width: 0%; height: 100%; background: ${cRowGridBar}; border-radius: 2px; transition: width 0.6s ease;"></div>
                </div>
              </div>

              <!-- Row 3: Exported to Grid -->
              <div id="row-export-container" style="display: flex; flex-direction: column; gap: 2px; width: 100%;">
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
                <div id="bar-export-bg" style="width: 100%; height: 4px; border-radius: 2px; background: ${cExportTrack}; overflow: hidden; margin-top: 2px;">
                  <div id="bar-export" style="width: 0%; height: 100%; background: ${cRowExportBar}; border-radius: 2px; transition: width 0.6s ease;"></div>
                </div>
              </div>

              <!-- Financial Scorecard Row (Option: scorecard) -->
              <div id="scorecard-fin-row" style="display: none; justify-content: space-between; align-items: center; margin-top: 6px; padding-top: 6px; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 8.5px; font-weight: 700;">
                <span style="color: rgba(255, 255, 255, 0.65); display: flex; align-items: center; gap: 4px;">
                  <span class="node-emoji">☀️</span>
                  <span id="scorecard-fin-title">${lbls.scorecard_solar_value}</span>
                </span>
                <span id="scorecard-fin-val" style="color: #00e676; font-size: 11px; font-weight: 800;">0,00 €</span>
              </div>
            </div>
          </div>

          <!-- Financial Bottom Ribbon (Option: bottom_ribbon) -->
          <div id="financial-ribbon" style="display: none; grid-template-columns: 1fr 1fr; gap: 7px; margin-top: 8px; padding-top: 7px; border-top: 1px solid rgba(255, 255, 255, 0.07);">
            <!-- Total Solar Value Pill -->
            <div style="background: rgba(0, 230, 118, 0.05); border: 1px solid rgba(0, 230, 118, 0.22); border-radius: 9px; padding: 6px 8px; display: flex; flex-direction: column; gap: 2px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <div style="display: flex; align-items: center; gap: 4px; font-size: 8px; font-weight: 700; color: rgba(255, 255, 255, 0.7); text-transform: uppercase;">
                  <span class="node-emoji" style="font-size: 11px;">☀️</span>
                  <span id="fin-solar-title">${lbls.solar_value}</span>
                </div>
                <div id="fin-gross-solar" style="font-size: 13px; font-weight: 800; color: #00e676; line-height: 1;">0,00 €</div>
              </div>
              <div id="fin-solar-sub" style="font-size: 7.5px; color: rgba(255, 255, 255, 0.5);">${lbls.solar_value_sub}</div>
            </div>

            <!-- Virtual Battery Pill -->
            <div id="fin-wallet-box" style="background: rgba(0, 229, 255, 0.05); border: 1px solid rgba(0, 229, 255, 0.25); border-radius: 9px; padding: 6px 8px; display: flex; flex-direction: column; gap: 2px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline;">
                <div style="display: flex; align-items: center; gap: 4px; font-size: 8px; font-weight: 700; color: #00e5ff; text-transform: uppercase;">
                  <span class="node-emoji" style="font-size: 11px;">🔋</span>
                  <span id="fin-wallet-title">${lbls.virtual_battery}</span>
                </div>
                <div id="fin-wallet-val" style="font-size: 13px; font-weight: 800; color: #00e5ff; line-height: 1;">+0,00 €</div>
              </div>
              <div id="fin-wallet-sub" style="font-size: 7.5px; color: #00e5ff; font-weight: 600;">${lbls.virtual_battery_sub}</div>
            </div>
          </div>
        </div>
      </ha-card>
    `;

    this._solarSrcTheme = { border: cSolarBorder, title: cTitleSolar, pwr: cPwrSolar, kwh: cKwhSolar, bar: cBarSolar };
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
      sparklineSolar: getEl('sparkline-solar'),
      sparklineSolarFill: getEl('sparkline-solar-fill'),
      sparklineSolarLine: getEl('sparkline-solar-line'),
      solarViewTelemetry: getEl('solar-view-telemetry'),
      solarViewChart: getEl('solar-view-chart'),
      solarChartLiveVal: getEl('solar-chart-live-val'),
      solarChartPeakVal: getEl('solar-chart-peak-val'),

      pwrGrid: getEl('pwr-grid'),
      kwhGrid: getEl('kwh-grid'),
      nodeGrid: getEl('node-grid'),
      badgeGridGuard: getEl('badge-grid-guard'),

      pwrHome: getEl('pwr-home'),
      kwhHome: getEl('kwh-home'),
      badgeHome: getEl('badge-home'),
      nodeHome: getEl('node-home'),

      // Battery elements
      nodeBattery: getEl('node-battery'),
      pwrBattery: getEl('pwr-battery'),
      kwhBattery: getEl('kwh-battery'),
      badgeBattery: getEl('badge-battery'),
      batteryViewLive: getEl('battery-view-live'),
      batteryViewStats: getEl('battery-view-stats'),
      batteryStat1Val: getEl('battery-stat-1-val'),
      batteryStat1Lbl: getEl('battery-stat-1-lbl'),
      batteryStat2Val: getEl('battery-stat-2-val'),
      batteryStat2Lbl: getEl('battery-stat-2-lbl'),
      batteryStatSub: getEl('battery-stat-sub'),
      financialRibbon: getEl('financial-ribbon'),
      finSolarTitle: getEl('fin-solar-title'),
      finSolarSub: getEl('fin-solar-sub'),
      finGrossSolar: getEl('fin-gross-solar'),
      finWalletBox: getEl('fin-wallet-box'),
      finWalletTitle: getEl('fin-wallet-title'),
      finWalletVal: getEl('fin-wallet-val'),
      finWalletSub: getEl('fin-wallet-sub'),
      badgeSolarFin: getEl('badge-solar-fin'),
      scorecardFinRow: getEl('scorecard-fin-row'),
      scorecardFinTitle: getEl('scorecard-fin-title'),
      scorecardFinVal: getEl('scorecard-fin-val'),
      barBatterySocBox: getEl('bar-battery-soc-box'),
      barBatterySocFill: getEl('bar-battery-soc-fill'),
      lblBattery: getEl('lbl-battery'),

      // EV elements
      nodeEv: getEl('node-ev'),
      pwrEv: getEl('pwr-ev'),
      kwhEv: getEl('kwh-ev'),
      badgeEv: getEl('badge-ev'),
      barEvSocBox: getEl('bar-ev-soc-box'),
      barEvSocFill: getEl('bar-ev-soc-fill'),
      lblEv: getEl('lbl-ev'),
      iconEv: getEl('icon-ev'),

      // Backwards compatible aliases
      nodeTesla: getEl('node-ev'),
      pwrTesla: getEl('pwr-ev'),
      kwhTesla: getEl('kwh-ev'),
      badgeTesla: getEl('badge-ev'),
      barSocBox: getEl('bar-ev-soc-box'),
      barSocFill: getEl('bar-ev-soc-fill'),
      lblDev: getEl('lbl-ev'),
      iconDev: getEl('icon-ev'),

      pwrExport: getEl('pwr-export'),
      kwhExport: getEl('kwh-export'),
      nodeExport: getEl('node-export'),

      // Rails
      railSolarHome: getEl('rail-solar-home'),
      railSolarBattery: getEl('rail-solar-battery'),
      railSolarEV: getEl('rail-solar-ev'),
      railSolarGrid: getEl('rail-solar-grid'),
      railGridHome: getEl('rail-grid-home'),
      railGridBattery: getEl('rail-grid-battery'),
      railGridEV: getEl('rail-grid-ev'),
      railBatteryHome: getEl('rail-battery-home'),
      railBatteryEV: getEl('rail-battery-ev'),
      railBatteryGrid: getEl('rail-battery-grid'),

      // Flows
      flowSolarHome: getEl('flow-solar-home'),
      flowSolarBattery: getEl('flow-solar-battery'),
      flowSolarEV: getEl('flow-solar-ev'),
      flowSolarTesla: getEl('flow-solar-tesla'),
      flowSolarGrid: getEl('flow-solar-grid'),
      flowGridHome: getEl('flow-grid-home'),
      flowGridBattery: getEl('flow-grid-battery'),
      flowGridEV: getEl('flow-grid-ev'),
      flowGridTesla: getEl('flow-grid-tesla'),
      flowBatteryHome: getEl('flow-battery-home'),
      flowBatteryEV: getEl('flow-battery-ev'),
      flowBatteryGrid: getEl('flow-battery-grid'),

      // Scorecard elements
      ringAutarky: getEl('ring-autarky'),
      ringImport: getEl('ring-import'),
      ringExport: getEl('ring-export'),
      ringTrackAutarky: getEl('ring-track-autarky'),
      ringTrackImport: getEl('ring-track-import'),
      ringTrackExport: getEl('ring-track-export'),
      rowExportContainer: getEl('row-export-container'),
      autarkyCenterPct: getEl('autarky-center-pct'),

      rowAutarkyPct: getEl('row-autarky-pct'),
      rowSolarKwh: getEl('row-solar-kwh'),
      barSolarSelfConsumedBg: getEl('bar-solar-self-consumed-bg'),
      barSolarSelfConsumed: getEl('bar-solar-self-consumed'),

      rowGridPct: getEl('row-grid-pct'),
      rowGridKwh: getEl('row-grid-kwh'),
      barGridRelianceBg: getEl('bar-grid-reliance-bg'),
      barGridReliance: getEl('bar-grid-reliance'),

      rowExportPct: getEl('row-export-pct'),
      rowExportKwh: getEl('row-export-kwh'),
      barExportBg: getEl('bar-export-bg'),
      barExport: getEl('bar-export')
    };

    // Simulation Test Bench listeners
    const simSelect = this.shadowRoot.getElementById('sim-scenario-select');
    const simResetBtn = this.shadowRoot.getElementById('sim-reset-btn');

    const applyPreset = (p) => {
      this._activePreset = (p === 'live' || !p) ? null : p;
      if (p === 'live' || !p) {
        this._solarViewMode = 'telemetry';
        this._teslaViewMode = 'primary';
        this._batteryViewMode = 'live';
        this._financialPlacementOverride = 'none';
        this._bessOverride = 'hide';
      } else {
        this._bessOverride = undefined;
      }
      if (simSelect) simSelect.value = this._activePreset || 'live';
      this._applyConfigVisibility();
      this._updateFlowPaths();
      this._update();
    };

    if (simSelect) {
      simSelect.value = this._activePreset || 'live';
      simSelect.addEventListener('change', (ev) => {
        ev.stopPropagation();
        applyPreset(simSelect.value);
      });
    }

    if (simResetBtn) {
      simResetBtn.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this._solarViewMode = 'telemetry';
        this._teslaViewMode = 'primary';
        this._batteryViewMode = 'live';
        this._financialPlacementOverride = 'none';
        this._bessOverride = 'hide';

        // 100% Complete reset of card configuration to default
        if (this._config) {
          this._config.palette = 'solar';
          this._config.colors = {};
          this._config.financial_placement = 'none';
          delete this._config.show_battery;
          delete this._config.show_bess;
          delete this._config.bess;
        }

        applyPreset('live');
        this._applyThemeStyles();

        // Broadcast to window so any open editor updates its UI and persists the clean config
        window.dispatchEvent(new CustomEvent('chromaflow-reset-defaults', {
          bubbles: true,
          composed: true
        }));
      });
    }

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

    // Tesla node tap toggle (read-only telemetry flip)
    if (this._el?.nodeSolar && !this._el.nodeSolar._hasTapListener) {
      this._el.nodeSolar._hasTapListener = true;
      this._el.nodeSolar.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this._solarViewMode = (this._solarViewMode === 'chart') ? 'telemetry' : 'chart';
        this._update();
      });
    }

    if (this._el?.nodeEv && !this._el.nodeEv._hasTapListener) {
      this._el.nodeEv._hasTapListener = true;
      this._el.nodeEv.setAttribute('title', 'Tap to switch between Charging Power and Battery/Range');
      this._el.nodeEv.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this._teslaViewMode = (this._teslaViewMode === 'secondary') ? 'primary' : 'secondary';
        this._update();
      });
    }

    if (this._el.nodeBattery) {
      this._el.nodeBattery.addEventListener('click', (ev) => {
        ev.stopPropagation();
        this._batteryViewMode = (this._batteryViewMode === 'stats') ? 'live' : 'stats';
        this._update();
      });
    }
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

const mode = this._getLayoutMode();
    const card = this.shadowRoot.querySelector('ha-card');
    if (card && card.classList && typeof card.classList.toggle === 'function') {
      card.classList.toggle('layout-dual', mode === 'dual');
      card.classList.toggle('layout-battery-left', mode === 'battery-left');
      card.classList.toggle('layout-battery-only', mode === 'battery-only');
      card.classList.toggle('layout-ev-only', mode === 'ev-only');
      card.classList.toggle('layout-4node', mode === 'none');
      card.classList.toggle('compact-view', width <= 360);
      card.classList.toggle('mini-view', width <= 315);
    }

    // Dynamic node relocation based on layout mode
    if (mode === 'dual' || mode === 'battery-left') {
      if (this._el.colLeft && this._el.nodeBattery && this._el.nodeBattery.parentNode !== this._el.colLeft) {
        this._el.colLeft.insertBefore(this._el.nodeBattery, this._el.nodeGrid);
      }
      if (this._el.nodeBattery) this._el.nodeBattery.style.display = 'flex';
      if (this._el.nodeEv) this._el.nodeEv.style.display = (mode === 'dual') ? 'flex' : 'none';
    } else if (mode === 'battery-only') {
      if (this._el.colRight && this._el.nodeBattery && this._el.nodeBattery.parentNode !== this._el.colRight) {
        this._el.colRight.insertBefore(this._el.nodeBattery, this._el.nodeExport);
      }
      if (this._el.nodeBattery) this._el.nodeBattery.style.display = 'flex';
      if (this._el.nodeEv) this._el.nodeEv.style.display = 'none';
    } else if (mode === 'ev-only') {
      if (this._el.nodeBattery) this._el.nodeBattery.style.display = 'none';
      if (this._el.nodeEv) this._el.nodeEv.style.display = 'flex';
    } else { // 'none'
      if (this._el.nodeBattery) this._el.nodeBattery.style.display = 'none';
      if (this._el.nodeEv) this._el.nodeEv.style.display = 'none';
    }

    this._svg.setAttribute('viewBox', `0 0 ${width} ${height}`);

    const defaultColW = width <= 315 ? 86 : (width <= 360 ? 98 : 134);
    const cLeft = (this._el.colLeft && this._el.colLeft.offsetWidth > 0) ? this._el.colLeft : { offsetLeft: 3, offsetWidth: defaultColW, offsetTop: 3 };
    const cRight = (this._el.colRight && this._el.colRight.offsetWidth > 0) ? this._el.colRight : { offsetLeft: width - 3 - defaultColW, offsetWidth: defaultColW, offsetTop: 3 };

    const startX = Math.round(cLeft.offsetLeft + cLeft.offsetWidth);
    const endX = Math.round(cRight.offsetLeft);

    const nodeSolar = this._el.nodeSolar || { offsetTop: 0, offsetHeight: 65 };
    const nodeBattery = this._el.nodeBattery || { offsetTop: Math.round(height * 0.35), offsetHeight: 52 };
    const nodeGrid = this._el.nodeGrid || { offsetTop: height - 60, offsetHeight: 56 };
    const nodeHome = this._el.nodeHome || { offsetTop: 0, offsetHeight: 56 };
    const nodeEv = this._el.nodeEv || { offsetTop: Math.round(height * 0.35), offsetHeight: 52 };
    const nodeExport = this._el.nodeExport || { offsetTop: height - 56, offsetHeight: 52 };

    const nodeSolarTopY = Math.round(cLeft.offsetTop + nodeSolar.offsetTop);
    const nodeSolarH = Math.max(56, nodeSolar.offsetHeight);
    const nodeSolarBottomY = nodeSolarTopY + nodeSolarH;

    const nodeGridTopY = Math.round(cLeft.offsetTop + nodeGrid.offsetTop);
    const nodeGridH = Math.max(50, nodeGrid.offsetHeight);
    const nodeGridBottomY = nodeGridTopY + nodeGridH;

    const nodeHomeTopY = Math.round(cRight.offsetTop + nodeHome.offsetTop);
    const nodeHomeH = Math.max(50, nodeHome.offsetHeight);
    const homeMidY = Math.round(nodeHomeTopY + (nodeHomeH / 2));

    const nodeExportTopY = Math.round(cRight.offsetTop + nodeExport.offsetTop);
    const nodeExportH = Math.max(50, nodeExport.offsetHeight);
    const exportMidY = Math.round(nodeExportTopY + (nodeExportH / 2));

    const cp1X = Math.round(startX + (endX - startX) * 0.45);
    const cp2X = Math.round(startX + (endX - startX) * 0.55);

    let pSolarHome = '';
    let pSolarGrid = '';
    let pGridHome = '';
    let pSolarBattery = '';
    let pSolarEV = '';
    let pGridBattery = '';
    let pGridEV = '';
    let pBatteryHome = '';
    let pBatteryEV = '';
    let pBatteryGrid = '';

    if (mode === 'dual' || mode === 'battery-left') {
      // Battery is in col-left (middle), EV is in col-right (middle)
      const battTopY = Math.round(cLeft.offsetTop + nodeBattery.offsetTop);
      const battH = Math.max(50, nodeBattery.offsetHeight);
      const battBottomY = battTopY + battH;
      const battMidY = Math.round(battTopY + (battH / 2));

      const evTopY = Math.round(cRight.offsetTop + nodeEv.offsetTop);
      const evH = Math.max(50, nodeEv.offsetHeight);
      const evMidY = Math.round(evTopY + (evH / 2));

      // 1. Solar Exit Ports (distributed vertically on Solar's right edge)
      const sHomeY = nodeSolarTopY + 14;     // Upper port (to Home)
      const sEvY = nodeSolarTopY + 27;       // Middle port (to EV)
      const sGridY = nodeSolarTopY + 40;     // Lower-middle port (to Grid Out)
      const sBattY = nodeSolarTopY + 53;     // Port to BESS

      // 2. Grid In Exit Ports (distributed vertically on Grid In's right edge)
      const gBattY = nodeGridTopY + 12;      // Top port (to BESS)
      const gHomeY = nodeGridTopY + 25;      // Middle port (to Home)
      const gEvY = nodeGridTopY + 38;        // Lower port (to EV)

      // 3. Home Landing Ports (clean 10px center-to-center air gaps on Home's left edge)
      const hSolarLandingY = homeMidY - 10;  // Solar enters top port
      const hBatteryLandingY = homeMidY;      // Battery enters center port
      const hGridLandingY = homeMidY + 10;   // Grid In enters bottom port

      // 4. EV Landing Ports (clean 8px center-to-center air gaps on EV's left edge)
      const evSolarLandingY = evMidY - 8;    // Solar enters top port
      const evBatteryLandingY = evMidY;      // Battery enters center port
      const evGridLandingY = evMidY + 8;     // Grid In enters bottom port

      // 5. Grid Out Landing Ports (clean 16px center-to-center air gap on Grid Out's left edge)
      const goSolarLandingY = exportMidY - 8;   // Solar enters top port
      const goBatteryLandingY = exportMidY + 8; // Battery enters bottom port

      // BESS Middle Cluster Ports (all 5 incoming and outgoing lines centered at battMidY)
      const bSolarLandingY = battMidY - 12; // Solar charges BESS (top of cluster)
      const bHomeY = battMidY - 6;          // BESS powers Home (upper mid)
      const bEvY = battMidY;                // BESS powers EV (center)
      const bGridOutY = battMidY + 6;       // BESS exports to Grid (lower mid)
      const bGridLandingY = battMidY + 12;  // Grid In charges BESS (bottom of cluster)

      // Arc radius out into canvas for vertical transitions along the left column
      const cpArcX = Math.round(startX + Math.min(26, Math.max(18, (endX - startX) * 0.2)));

      pSolarBattery = `M ${startX} ${sBattY} C ${cpArcX} ${sBattY + 25}, ${cpArcX} ${bSolarLandingY - 20}, ${startX} ${bSolarLandingY}`;
      pGridBattery = `M ${startX} ${gBattY} C ${cpArcX} ${gBattY - 15}, ${cpArcX} ${bGridLandingY + 15}, ${startX} ${bGridLandingY}`;

      // Cross flows from Solar
      pSolarHome = `M ${startX} ${sHomeY} C ${cp1X} ${sHomeY}, ${cp2X} ${hSolarLandingY}, ${endX} ${hSolarLandingY}`;
      pSolarEV = `M ${startX} ${sEvY} C ${cp1X} ${sEvY}, ${cp2X} ${evSolarLandingY}, ${endX} ${evSolarLandingY}`;
      pSolarGrid = `M ${startX} ${sGridY} C ${cp1X} ${sGridY}, ${cp2X} ${goSolarLandingY}, ${endX} ${goSolarLandingY}`;

      // Cross flows from Grid In
      pGridHome = `M ${startX} ${gHomeY} C ${cp1X} ${gHomeY}, ${cp2X} ${hGridLandingY}, ${endX} ${hGridLandingY}`;
      pGridEV = `M ${startX} ${gEvY} C ${cp1X} ${gEvY}, ${cp2X} ${evGridLandingY}, ${endX} ${evGridLandingY}`;

      // Battery discharge paths (radiating from BESS middle cluster)
      pBatteryHome = `M ${startX} ${bHomeY} C ${cp1X} ${bHomeY}, ${cp2X} ${hBatteryLandingY}, ${endX} ${hBatteryLandingY}`;
      pBatteryEV = `M ${startX} ${bEvY} C ${cp1X} ${bEvY}, ${cp2X} ${evBatteryLandingY}, ${endX} ${evBatteryLandingY}`;
      pBatteryGrid = `M ${startX} ${bGridOutY} C ${cp1X} ${bGridOutY}, ${cp2X} ${goBatteryLandingY}, ${endX} ${goBatteryLandingY}`;

    } else if (mode === 'battery-only') {
      // Battery is in col-right (middle)
      const battTopY = Math.round(cRight.offsetTop + nodeBattery.offsetTop);
      const battH = Math.max(50, nodeBattery.offsetHeight);
      const battBottomY = battTopY + battH;
      const battMidY = Math.round(battTopY + (battH / 2));
      const homeBottomY = Math.round(nodeHomeTopY + nodeHomeH);

      const sHomeY = nodeSolarTopY + 14;
      const sBattY = nodeSolarTopY + 30;
      const sGridY = nodeSolarTopY + 44;

      const gHomeY = nodeGridTopY + 16;
      const gBattY = nodeGridTopY + 28;

      pSolarHome = `M ${startX} ${sHomeY} C ${cp1X} ${sHomeY}, ${cp2X} ${homeMidY - 8}, ${endX} ${homeMidY - 8}`;
      pSolarBattery = `M ${startX} ${sBattY} C ${cp1X} ${sBattY}, ${cp2X} ${battMidY - 6}, ${endX} ${battMidY - 6}`;
      pSolarGrid = `M ${startX} ${sGridY} C ${cp1X} ${sGridY}, ${cp2X} ${exportMidY - 8}, ${endX} ${exportMidY - 8}`;

      pGridHome = `M ${startX} ${gHomeY} C ${cp1X} ${gHomeY}, ${cp2X} ${homeMidY + 8}, ${endX} ${homeMidY + 8}`;
      pGridBattery = `M ${startX} ${gBattY} C ${cp1X} ${gBattY}, ${cp2X} ${battMidY + 6}, ${endX} ${battMidY + 6}`;

      const maxSweep = Math.max(12, (endX - startX) * 0.4);
      const cpArcX = Math.round(endX - Math.min(36, Math.min(maxSweep, (endX - startX) - 16)));

      pBatteryHome = `M ${endX} ${battTopY + 10} C ${cpArcX} ${battTopY + 10}, ${cpArcX} ${homeBottomY - 4}, ${endX} ${homeBottomY - 4}`;
      pBatteryGrid = `M ${endX} ${battBottomY - 10} C ${cpArcX} ${battBottomY - 10}, ${cpArcX} ${nodeExportTopY + 4}, ${endX} ${nodeExportTopY + 4}`;

    } else if (mode === 'ev-only') {
      // EV is in col-right (middle)
      const evTopY = Math.round(cRight.offsetTop + nodeEv.offsetTop);
      const evH = Math.max(50, nodeEv.offsetHeight);
      const evMidY = Math.round(evTopY + (evH / 2));

      const sHomeY = nodeSolarTopY + 14;
      const sEvY = nodeSolarTopY + 30;
      const sGridY = nodeSolarTopY + 44;

      const gHomeY = nodeGridTopY + 16;
      const gEvY = nodeGridTopY + 28;

      pSolarHome = `M ${startX} ${sHomeY} C ${cp1X} ${sHomeY}, ${cp2X} ${homeMidY - 8}, ${endX} ${homeMidY - 8}`;
      pSolarEV = `M ${startX} ${sEvY} C ${cp1X} ${sEvY}, ${cp2X} ${evMidY}, ${endX} ${evMidY}`;
      pSolarGrid = `M ${startX} ${sGridY} C ${cp1X} ${sGridY}, ${cp2X} ${exportMidY - 8}, ${endX} ${exportMidY - 8}`;

      pGridHome = `M ${startX} ${gHomeY} C ${cp1X} ${gHomeY}, ${cp2X} ${homeMidY + 8}, ${endX} ${homeMidY + 8}`;
      pGridEV = `M ${startX} ${gEvY} C ${cp1X} ${gEvY}, ${cp2X} ${evMidY + 8}, ${endX} ${evMidY + 8}`;

    } else { // 'none' (4-node mode)
      const sHomeY = nodeSolarTopY + 16;
      const sGridY = nodeSolarTopY + 36;
      const gHomeY = nodeGridTopY + 16;

      pSolarHome = `M ${startX} ${sHomeY} C ${cp1X} ${sHomeY}, ${cp2X} ${homeMidY - 8}, ${endX} ${homeMidY - 8}`;
      pSolarGrid = `M ${startX} ${sGridY} C ${cp1X} ${sGridY}, ${cp2X} ${exportMidY - 8}, ${endX} ${exportMidY - 8}`;
      pGridHome = `M ${startX} ${gHomeY} C ${cp1X} ${gHomeY}, ${cp2X} ${homeMidY + 8}, ${endX} ${homeMidY + 8}`;
    }

    const showExport = (this._config?.show_grid_out !== false && this._config?.show_export !== false);
    if (!showExport) {
      pSolarGrid = '';
      pBatteryGrid = '';
    }

    const setAttr = (el, d) => {
      if (el) el.setAttribute('d', d || '');
    };

    setAttr(this._el.railSolarHome, pSolarHome);
    setAttr(this._el.railSolarBattery, pSolarBattery);
    setAttr(this._el.railSolarEV, pSolarEV);
    setAttr(this._el.railSolarGrid, pSolarGrid);
    setAttr(this._el.railGridHome, pGridHome);
    setAttr(this._el.railGridBattery, pGridBattery);
    setAttr(this._el.railGridEV, pGridEV);
    setAttr(this._el.railBatteryHome, pBatteryHome);
    setAttr(this._el.railBatteryEV, pBatteryEV);
    setAttr(this._el.railBatteryGrid, pBatteryGrid);

    setAttr(this._el.flowSolarHome, pSolarHome);
    setAttr(this._el.flowSolarBattery, pSolarBattery);
    setAttr(this._el.flowSolarEV, pSolarEV);
    setAttr(this._el.flowSolarTesla, pSolarEV);
    setAttr(this._el.flowSolarGrid, pSolarGrid);
    setAttr(this._el.flowGridHome, pGridHome);
    setAttr(this._el.flowGridBattery, pGridBattery);
    setAttr(this._el.flowGridEV, pGridEV);
    setAttr(this._el.flowGridTesla, pGridEV);
    setAttr(this._el.flowBatteryHome, pBatteryHome);
    setAttr(this._el.flowBatteryEV, pBatteryEV);
    setAttr(this._el.flowBatteryGrid, pBatteryGrid);
    this._applyRailVisibility();
  }

  // When show_idle_rails is off, a rail is only drawn while its connection actually carries
  // power. Called from _update() (which decides the flows) and from _updateFlowPaths() (which
  // sets the geometry the check needs), so the two passes can arrive in either order.
  _applyRailVisibility() {
    if (!this._el) return;
    if (this._config?.show_idle_rails !== false) return;
    const pairs = [
      ['railSolarHome', 'flowSolarHome'],
      ['railSolarBattery', 'flowSolarBattery'],
      ['railSolarEV', 'flowSolarEV'],
      ['railSolarGrid', 'flowSolarGrid'],
      ['railGridHome', 'flowGridHome'],
      ['railGridBattery', 'flowGridBattery'],
      ['railGridEV', 'flowGridEV'],
      ['railBatteryHome', 'flowBatteryHome'],
      ['railBatteryEV', 'flowBatteryEV'],
      ['railBatteryGrid', 'flowBatteryGrid']
    ];
    for (const [railKey, flowKey] of pairs) {
      const railEl = this._el[railKey];
      const flowEl = this._el[flowKey];
      if (!railEl) continue;
      const flowing = Boolean(flowEl) && flowEl.style.display !== 'none' && Boolean(flowEl.getAttribute('d'));
      railEl.style.display = flowing ? 'block' : 'none';
    }
  }

  _applyConfigVisibility() {
    if (!this._el) return;
    const showEmojis = (this._config?.show_emojis !== false);
    const emojis = this.shadowRoot.querySelectorAll('.node-emoji');
    emojis.forEach(el => {
      el.style.display = showEmojis ? 'inline-block' : 'none';
    });
    const showFc = (this._config?.show_solar_forecast !== false);
    if (this._el.barSolarForecastBox) this._el.barSolarForecastBox.style.display = showFc ? 'block' : 'none';
    if (this._el.badgeSolarForecast) this._el.badgeSolarForecast.style.display = showFc ? 'inline-block' : 'none';
    if (this._el.kwhSolarRem) {
      if (!showFc) this._el.kwhSolarRem.style.display = 'none';
    }

    const mode = this._getLayoutMode();
    const hasBatt = (mode === 'dual' || mode === 'battery-left' || mode === 'battery-only');
    const hasEv = (mode === 'dual' || mode === 'ev-only');
    const isStress = (this._activePreset === 'all_flows_active');
    const allowBattToEv = Boolean(this._config?.allow_battery_to_ev) || (this._activePreset === 'batt_to_ev') || isStress || (this._activePreset === 'solar_batt_supply');
    const showExport = (this._config?.show_grid_out !== false && this._config?.show_export !== false);
    if (this._el.nodeExport) this._el.nodeExport.style.display = showExport ? 'flex' : 'none';
    if (this._el.railSolarGrid) this._el.railSolarGrid.style.display = showExport ? 'block' : 'none';
    if (this._el.railBatteryGrid) this._el.railBatteryGrid.style.display = (showExport && hasBatt) ? 'block' : 'none';
    if (this._el.ringExport) this._el.ringExport.style.display = showExport ? 'block' : 'none';
    if (this._el.ringTrackExport) this._el.ringTrackExport.style.display = showExport ? 'block' : 'none';
    if (this._el.rowExportContainer) this._el.rowExportContainer.style.display = showExport ? 'flex' : 'none';

    if (this._el.railSolarBattery) this._el.railSolarBattery.style.display = hasBatt ? 'block' : 'none';
    if (this._el.railGridBattery) this._el.railGridBattery.style.display = hasBatt ? 'block' : 'none';
    if (this._el.railBatteryHome) this._el.railBatteryHome.style.display = hasBatt ? 'block' : 'none';
    if (this._el.railBatteryGrid) this._el.railBatteryGrid.style.display = hasBatt ? 'block' : 'none';
    if (this._el.railBatteryEV) this._el.railBatteryEV.style.display = (mode === 'dual' && allowBattToEv) ? 'block' : 'none';

    const showSim = (this._config?.show_sim_toolbar !== false);
    const simEl = this.shadowRoot.getElementById('sim-toolbar');
    if (simEl) simEl.style.display = showSim ? 'flex' : 'none';

    const showBattSoc = (this._config?.show_battery_soc !== false);
    if (this._el.barBatterySocBox) {
      if (!showBattSoc) this._el.barBatterySocBox.style.display = 'none';
    }

    if (this._el.railSolarEV) this._el.railSolarEV.style.display = hasEv ? 'block' : 'none';
    if (this._el.railGridEV) this._el.railGridEV.style.display = hasEv ? 'block' : 'none';

    requestAnimationFrame(() => this._updateFlowPaths());
  }

  _applyThemeStyles() {
    if (!this._el || !this._el.nodeSolar) return;
    const pal = PALETTES[this._config?.palette] || PALETTES.solar;
    const d = pal;
    const colors = this._config?.colors || {};

    // 1. Activity Rings & Scorecard Center
    const cAutarky = colors.ring_autarky || d.ring_autarky || d.autarky || '#00e676';
    const cImportRing = colors.ring_import || d.ring_import || d.import_ring || '#ff7043';
    const cExportRing = colors.ring_export || d.ring_export || d.export_ring || '#ffd54f';
    const cPctCenter = colors.autarky_center_pct || '#ffffff';
    const cLblCenter = colors.autarky_center_lbl || cAutarky;

    const ringTracks = resolveRingTracks(colors, d);
    const cAutarkyTrack = ringTracks.autarky;
    const cImportTrack = ringTracks.import;
    const cExportTrack = ringTracks.export;

    if (this._el.ringAutarky) this._el.ringAutarky.setAttribute('stroke', cAutarky);
    if (this._el.ringImport) this._el.ringImport.setAttribute('stroke', cImportRing);
    if (this._el.ringExport) this._el.ringExport.setAttribute('stroke', cExportRing);
    if (this._el.ringTrackAutarky) this._el.ringTrackAutarky.setAttribute('stroke', cAutarkyTrack);
    if (this._el.ringTrackImport) this._el.ringTrackImport.setAttribute('stroke', cImportTrack);
    if (this._el.ringTrackExport) this._el.ringTrackExport.setAttribute('stroke', cExportTrack);

    // Rails are tinted per line, so recolour them here when the studio changes ring or flow
    // colours. The class no longer sets a stroke, so an attribute write is enough.
    const railColors = resolveRailColors(colors, pal);
    const railEls = {
      'solar-home': this._el.railSolarHome,
      'solar-battery': this._el.railSolarBattery,
      'solar-ev': this._el.railSolarEV,
      'solar-grid': this._el.railSolarGrid,
      'grid-home': this._el.railGridHome,
      'grid-battery': this._el.railGridBattery,
      'grid-ev': this._el.railGridEV,
      'battery-home': this._el.railBatteryHome,
      'battery-ev': this._el.railBatteryEV,
      'battery-grid': this._el.railBatteryGrid
    };
    for (const [rail, railEl] of Object.entries(railEls)) {
      if (railEl && railColors[rail]) railEl.setAttribute('stroke', railColors[rail]);
    }
    if (this._el.autarkyCenterPct) this._el.autarkyCenterPct.style.color = cPctCenter;

    const lblAutarky = this.shadowRoot.getElementById('lbl-autarky');
    if (lblAutarky) lblAutarky.style.color = cLblCenter;

    // 2. Tabular Scorecard Rows
    const cRowSelfTitle = colors.row_self_consumed_title || cAutarky;
    const cRowSelfBar = colors.row_self_consumed_bar || cAutarky;
    const cRowGridTitle = colors.row_grid_reliance_title || cImportRing;
    const cRowGridBar = colors.row_grid_reliance_bar || cImportRing;
    const cRowExportTitle = colors.row_exported_title || cExportRing;
    const cRowExportBar = colors.row_exported_bar || cExportRing;

    const lblSelf = this.shadowRoot.getElementById('lbl-self-consumed');
    if (lblSelf && lblSelf.parentElement) lblSelf.parentElement.style.color = cRowSelfTitle;
    if (this._el.rowAutarkyPct) this._el.rowAutarkyPct.style.color = cRowSelfTitle;
    if (this._el.barSolarSelfConsumedBg) this._el.barSolarSelfConsumedBg.style.background = cAutarkyTrack;
    if (this._el.barSolarSelfConsumed) this._el.barSolarSelfConsumed.style.background = cRowSelfBar;

    const lblGrid = this.shadowRoot.getElementById('lbl-grid-reliance');
    if (lblGrid && lblGrid.parentElement) lblGrid.parentElement.style.color = cRowGridTitle;
    if (this._el.rowGridPct) this._el.rowGridPct.style.color = cRowGridTitle;
    if (this._el.barGridRelianceBg) this._el.barGridRelianceBg.style.background = cImportTrack;
    if (this._el.barGridReliance) this._el.barGridReliance.style.background = cRowGridBar;

    const lblExport = this.shadowRoot.getElementById('lbl-exported');
    if (lblExport && lblExport.parentElement) lblExport.parentElement.style.color = cRowExportTitle;
    if (this._el.rowExportPct) this._el.rowExportPct.style.color = cRowExportTitle;
    if (this._el.barExportBg) this._el.barExportBg.style.background = cExportTrack;
    if (this._el.barExport) this._el.barExport.style.background = cRowExportBar;

    // 3. Scorecard Container
    const scorecardEl = this.shadowRoot.querySelector('.scorecard');
    if (scorecardEl) {
      scorecardEl.style.background = colors.bg_scorecard || d.bg_scorecard || 'rgba(255, 255, 255, 0.02)';
      scorecardEl.style.borderColor = colors.border_scorecard || d.border_scorecard || 'rgba(255, 255, 255, 0.08)';
    }

    // 4. Node Boxes
    if (this._el.nodeSolar) {
      this._el.nodeSolar.style.background = colors.bg_solar || d.bg_solar || 'rgba(255, 255, 255, 0.03)';
      this._el.nodeSolar.style.borderColor = colors.border_solar || d.border_solar || '#ffd54f';
    }
    if (this._el.nodeGrid) {
      this._el.nodeGrid.style.background = colors.bg_grid || d.bg_grid || 'rgba(255, 255, 255, 0.03)';
      this._el.nodeGrid.style.borderColor = colors.border_grid || d.border_grid || '#ff7043';
    }
    if (this._el.nodeHome) {
      this._el.nodeHome.style.background = colors.bg_home || d.bg_home || 'rgba(255, 255, 255, 0.03)';
      this._el.nodeHome.style.borderColor = colors.border_home || d.border_home || '#00e5ff';
    }
    if (this._el.nodeBattery) {
      this._el.nodeBattery.style.background = colors.bg_battery || d.bg_battery || 'rgba(255, 255, 255, 0.03)';
      this._el.nodeBattery.style.borderColor = colors.border_battery || d.border_battery || '#10b981';
    }
    if (this._el.nodeEv) {
      this._el.nodeEv.style.background = colors.bg_ev || d.bg_ev || 'rgba(255, 255, 255, 0.03)';
      this._el.nodeEv.style.borderColor = colors.border_ev || d.border_ev || '#b388ff';
    }
    if (this._el.nodeExport) {
      this._el.nodeExport.style.background = colors.bg_export || d.bg_export || 'rgba(255, 255, 255, 0.03)';
      this._el.nodeExport.style.borderColor = colors.border_export || d.border_export || '#00e676';
    }

    // 5. Flow Gradient Stops
    const updateGrad = (id, start, end) => {
      const g = this.shadowRoot.getElementById(id);
      if (g) {
        const stops = g.querySelectorAll('stop');
        if (stops.length >= 2) {
          if (start) stops[0].setAttribute('stop-color', start);
          if (end) stops[1].setAttribute('stop-color', end);
        }
      }
    };
    updateGrad('flowSolarHome', colors.flow_solar_home_start, colors.flow_solar_home_end);
    updateGrad('flowSolarBattery', colors.flow_solar_battery_start, colors.flow_solar_battery_end);
    updateGrad('flowSolarEV', colors.flow_solar_ev_start, colors.flow_solar_ev_end);
    updateGrad('flowSolarTesla', colors.flow_solar_ev_start, colors.flow_solar_ev_end);
    updateGrad('flowSolarGrid', colors.flow_solar_grid_start, colors.flow_solar_grid_end);
    updateGrad('flowGridHome', colors.flow_grid_home_start, colors.flow_grid_home_end);
    updateGrad('flowGridBattery', colors.flow_grid_battery_start, colors.flow_grid_battery_end);
    updateGrad('flowGridEV', colors.flow_grid_ev_start, colors.flow_grid_ev_end);
    updateGrad('flowBatteryHome', colors.flow_battery_home_start, colors.flow_battery_home_end);
    updateGrad('flowBatteryEV', colors.flow_battery_ev_start, colors.flow_battery_ev_end);
    updateGrad('flowBatteryGrid', colors.flow_battery_grid_start, colors.flow_battery_grid_end);

    // 6. Dynamic Financial & Bottom Ribbon Styling (Harmonized, Shuffled & Themed)
    const hexToRgba = (hex, alpha) => {
      if (!hex) return `rgba(255, 255, 255, ${alpha})`;
      if (hex.startsWith('rgba')) return hex;
      if (hex.startsWith('rgb(')) return hex.replace('rgb(', 'rgba(').replace(')', `, ${alpha})`);
      let c = hex.replace('#', '');
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      const num = parseInt(c, 16);
      if (isNaN(num)) return `rgba(255, 255, 255, ${alpha})`;
      return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
    };

    const cFinSolar = colors.fin_solar_val || colors.title_solar || pal.solar || '#00e676';
    const cFinBatt = colors.fin_virtual_battery || colors.title_battery || pal.battery || '#00e5ff';
    const cFinGrid = colors.title_grid || pal.grid || '#ff7043';

    if (this._el.financialRibbon) {
      const grossBox = this._el.financialRibbon.firstElementChild;
      if (grossBox) {
        grossBox.style.background = hexToRgba(cFinSolar, 0.05);
        grossBox.style.borderColor = hexToRgba(cFinSolar, 0.25);
      }
      if (this._el.finGrossSolar) this._el.finGrossSolar.style.color = cFinSolar;
      
      if (this._el.finWalletBox) {
        const isNetPositive = !this._el.finWalletVal || !this._el.finWalletVal.textContent.startsWith('-');
        const cWallet = isNetPositive ? cFinBatt : cFinGrid;
        this._el.finWalletBox.style.background = hexToRgba(cWallet, 0.05);
        this._el.finWalletBox.style.borderColor = hexToRgba(cWallet, 0.25);
        if (this._el.finWalletTitle) this._el.finWalletTitle.style.color = cWallet;
        if (this._el.finWalletVal) this._el.finWalletVal.style.color = cWallet;
        if (this._el.finWalletSub) this._el.finWalletSub.style.color = cWallet;
      }
    }

    if (this._el.badgeSolarFin) {
      this._el.badgeSolarFin.style.color = cFinSolar;
      this._el.badgeSolarFin.style.background = hexToRgba(cFinSolar, 0.12);
      this._el.badgeSolarFin.style.borderColor = hexToRgba(cFinSolar, 0.35);
    }

    if (this._el.scorecardFinRow) {
      if (this._el.scorecardFinVal) this._el.scorecardFinVal.style.color = cFinSolar;
    }
  }

  _update() {
    this._applyThemeStyles();
    if (!this._hass || !this._el) return;
    const el = this._el;
    const ents = this._getEntities();
    const lbls = this._getLabels();

    const eSolarPwr = this._hass.states[ents.solar_power];
    const eSolarYield = this._hass.states[ents.solar_daily_yield];
    const eSolcastToday = this._hass.states[ents.solcast_today];
    const eSolcastRem = this._hass.states[ents.solcast_remaining];

    const eGridPwr = this._hass.states[ents.grid_power];
    const eGridExportPwr = this._hass.states[ents.grid_export_power];
    const eGridImport = this._hass.states[ents.grid_daily_import];
    const eGridExport = this._hass.states[ents.grid_daily_export];
    const eLoadPwr = this._hass.states[ents.load_power];

    const eBattPwr = this._hass.states[ents.battery_power];
    const eBattSoc = this._hass.states[ents.battery_soc];
    const eBattCharge = this._hass.states[ents.battery_daily_charge];
    const eBattDischarge = this._hass.states[ents.battery_daily_discharge];

    const eEvPwr = this._hass.states[ents.ev_power];
    const eEvCharging = this._hass.states[ents.ev_charging];
    const eEvEnergy = this._hass.states[ents.ev_daily_energy];

    const mode = this._getLayoutMode();
    const hasBatt = (mode === 'dual' || mode === 'battery-only');
    const hasEv = (mode === 'dual' || mode === 'ev-only');

    const pKey = (this._config && this._config.palette) || 'solar';
    const pal = PALETTES[pKey] || PALETTES.solar;
    const themeColors = (this._config && this._config.colors) || {};
    const cGridBorder = themeColors.border_grid || pal.border_grid || 'rgba(255, 112, 67, 0.3)';


    // Live solar & grid power calculations
    let liveSolarW = Math.max(0, this._parsePower(eSolarPwr));
    const solarSrcs = this._getSolarSources();
    const solarSrcW = solarSrcs.map((src) => Math.max(0, this._parsePower(this._hass.states[src.power])));
    const cfgSolarEnts = this._config.entities || {};
    if (solarSrcs.length && !cfgSolarEnts.solar_power) liveSolarW = solarSrcW.reduce((a, b) => a + b, 0);
    const solarYieldKwh = (solarSrcs.length && !cfgSolarEnts.solar_daily_yield)
      ? solarSrcs.reduce((a, src) => a + (src.daily_yield ? this._parseEnergy(this._hass.states[src.daily_yield]) : 0), 0)
      : this._parseEnergy(eSolarYield);

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

    // Battery state calculations
    let rawBattW = this._parsePower(eBattPwr);
    const positiveIsCharging = this._config.battery_positive_charging !== false;
    let batteryCharging = false;
    let batteryDischarging = false;
    let batteryChargeW = 0;
    let batteryDischargeW = 0;

    if (hasBatt && eBattPwr) {
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
    }
    let batteryKwh = this._parseEnergy(eBattCharge) + this._parseEnergy(eBattDischarge);
    let batterySoc = this._parsePercent(eBattSoc);

    // EV state calculations
    let liveEvW = 0;
    let isEvActive = false;
    let evDailyKwh = 0;

    if (hasEv) {
      const pwrEvRaw = Math.max(0, this._parsePower(eEvPwr));
      const liveShellyW = this._parsePower(this._hass.states['sensor.tesla_shelly_energy_meter_0_power']);
      liveEvW = Math.max(pwrEvRaw, liveShellyW);
      const evBinary = eEvCharging ? (eEvCharging.state === 'on') : false;
      isEvActive = (liveEvW > 15) || evBinary;

      const sessions = Array.isArray(eEvEnergy?.attributes?.sessions) ? eEvEnergy.attributes.sessions : null;
      if (sessions && sessions.length > 0) {
        const todaySessions = sessions.filter(s => s && typeof s.start === 'string' && this._isSameDay(s.start));
        if (todaySessions.length > 0) {
          evDailyKwh = todaySessions.reduce((acc, s) => acc + (Number(s.energy_kwh ?? s.energy) || 0), 0);
        } else {
          evDailyKwh = 0.0;
        }
      } else {
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
      }
      const liveSessionEnt = this._hass.states['sensor.evse_192_168_0_249_charge_energy'] ||
                             this._hass.states['sensor.v2c_trydan_charge_energy'] ||
                             this._hass.states['sensor.wallbox_energy_added'];
      const liveSessionKwh = liveSessionEnt ? this._parseEnergy(liveSessionEnt) : 0;
      evDailyKwh = Math.max(evDailyKwh, liveSessionKwh);
    }

    // Interactive Test Bench Scenario Overrides
    if (this._activePreset === 'all_flows_active') {
      // PRESET 1: MAXIMUM STRESS TEST - EVERY SINGLE ONE OF THE 10 ANIMATED LINES ACTIVE!
      liveSolarW = 4500;
      liveImportW = 3000;
      liveExportW = 1500;
      rawBattW = 2500;
      batteryCharging = true;
      batteryDischarging = true; // simultaneous stress test
      batteryChargeW = 2500;
      batteryDischargeW = 2000;
      batterySoc = 75;
      batteryKwh = 10.5;
      liveEvW = 3200;
      isEvActive = true;
      evDailyKwh = 16.0;
    } else if (this._activePreset === 'solar_grid_all') {
      // PRESET 2: Solar and Grid simultaneously charge battery, power home, charge EV, and export to grid
      liveSolarW = 4500;
      liveImportW = 2000;
      liveExportW = 1200;
      rawBattW = 2500;
      batteryCharging = true;
      batteryDischarging = false;
      batteryChargeW = 2500;
      batteryDischargeW = 0;
      batterySoc = 68;
      batteryKwh = 9.2;
      liveEvW = 2200;
      isEvActive = true;
      evDailyKwh = 14.5;
    } else if (this._activePreset === 'solar_all') {
      liveSolarW = 5400;
      liveImportW = 0;
      liveExportW = 600;
      rawBattW = 1800;
      batteryCharging = true;
      batteryDischarging = false;
      batteryChargeW = 1800;
      batteryDischargeW = 0;
      batterySoc = 78;
      batteryKwh = 8.4;
      liveEvW = 2400;
      isEvActive = true;
      evDailyKwh = 14.2;
    } else if (this._activePreset === 'solar_grid_batt') {
      // Scenario 4: Solar + Grid simultaneously charging the home battery
      liveSolarW = 800;
      liveImportW = 2400;
      liveExportW = 0;
      rawBattW = 2800;
      batteryCharging = true;
      batteryDischarging = false;
      batteryChargeW = 2800;
      batteryDischargeW = 0;
      batterySoc = 52;
      batteryKwh = 6.8;
      liveEvW = 0;
      isEvActive = false;
    } else if (this._activePreset === 'solar_grid_ev') {
      // Scenario 5: Solar + Grid simultaneously charging EV
      liveSolarW = 1500;
      liveImportW = 1800;
      liveExportW = 0;
      rawBattW = 0;
      batteryCharging = false;
      batteryDischarging = false;
      batteryChargeW = 0;
      batteryDischargeW = 0;
      batterySoc = 60;
      batteryKwh = 7.0;
      liveEvW = 2600;
      isEvActive = true;
      evDailyKwh = 12.0;
    } else if (this._activePreset === 'solar_batt_supply') {
      // Scenario 6: Solar + Battery discharge both supplying Home and EV
      liveSolarW = 900;
      liveImportW = 0;
      liveExportW = 0;
      rawBattW = -2500;
      batteryCharging = false;
      batteryDischarging = true;
      batteryChargeW = 0;
      batteryDischargeW = 2500;
      batterySoc = 82;
      batteryKwh = 12.4;
      liveEvW = 2800;
      isEvActive = true;
      evDailyKwh = 9.5;
    } else if (this._activePreset === 'grid_batt_ev') {
      // Scenario 7: Night Grid charging both Battery and EV while running Home
      liveSolarW = 0;
      liveImportW = 4600;
      liveExportW = 0;
      rawBattW = 2000;
      batteryCharging = true;
      batteryDischarging = false;
      batteryChargeW = 2000;
      batteryDischargeW = 0;
      batterySoc = 42;
      batteryKwh = 5.6;
      liveEvW = 2200;
      isEvActive = true;
      evDailyKwh = 8.2;
    } else if (this._activePreset === 'grid_home_batt') {
      // Scenario 8: Night Grid powering Home and charging Battery (EV idle)
      liveSolarW = 0;
      liveImportW = 2900;
      liveExportW = 0;
      rawBattW = 2400;
      batteryCharging = true;
      batteryDischarging = false;
      batteryChargeW = 2400;
      batteryDischargeW = 0;
      batterySoc = 38;
      batteryKwh = 4.9;
      liveEvW = 0;
      isEvActive = false;
    } else if (this._activePreset === 'night_batt') {
      // Scenario 9: Evening Battery powering Home autarky
      liveSolarW = 0;
      liveImportW = 0;
      liveExportW = 0;
      rawBattW = -920;
      batteryCharging = false;
      batteryDischarging = true;
      batteryChargeW = 0;
      batteryDischargeW = 920;
      batterySoc = 64;
      batteryKwh = 11.2;
      liveEvW = 0;
      isEvActive = false;
    } else if (this._activePreset === 'batt_to_ev') {
      // Scenario 10: Battery discharging directly to EV
      liveSolarW = 0;
      liveImportW = 0;
      liveExportW = 0;
      rawBattW = -3200;
      batteryCharging = false;
      batteryDischarging = true;
      batteryChargeW = 0;
      batteryDischargeW = 3200;
      batterySoc = 85;
      batteryKwh = 13.5;
      liveEvW = 2700;
      isEvActive = true;
      evDailyKwh = 6.8;
    } else if (this._activePreset === 'batt_export') {
      // Scenario 11: Battery VPP peak export
      liveSolarW = 0;
      liveImportW = 0;
      liveExportW = 2200;
      rawBattW = -2500;
      batteryCharging = false;
      batteryDischarging = true;
      batteryChargeW = 0;
      batteryDischargeW = 2500;
      batterySoc = 72;
      batteryKwh = 10.0;
      liveEvW = 0;
      isEvActive = false;
    } else if (this._activePreset === 'icp_guard') {
      // Scenario 12: ICP Guard peak load warning
      liveSolarW = 120;
      liveImportW = 3900;
      liveExportW = 0;
      rawBattW = 0;
      batteryCharging = false;
      batteryDischarging = false;
      batteryChargeW = 0;
      batteryDischargeW = 0;
      liveEvW = 2700;
      isEvActive = true;
    }
    
    // Whole-house load power calculation
    let liveHomeW = 0;
    if (eLoadPwr) {
      liveHomeW = Math.max(0, this._parsePower(eLoadPwr));
    } else {
      let calcHome = liveSolarW + liveImportW - liveExportW;
      if (hasBatt) calcHome += (batteryDischargeW - batteryChargeW);
      if (hasEv) calcHome -= liveEvW;
      liveHomeW = Math.max(0, calcHome);
    }

    const idleThresh = this._config.min_flow_threshold_w ?? 2;
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

    // Flow Allocation Math
    let solarToHomeW = 0;
    let solarToBatteryW = 0;
    let solarToEvW = 0;
    let solarToGridW = 0;
    let batteryToGridW = 0;
    let batteryToEvW = 0;
    let batteryToHomeW = 0;
    let gridToHomeW = 0;
    let gridToBatteryW = 0;
    let gridToEvW = 0;

    if (this._activePreset === 'all_flows_active') {
      // STRESS TEST: FORCE ALL 10 FLOWS ACTIVE SIMULTANEOUSLY!
      solarToHomeW = 1200;
      solarToBatteryW = 1500;
      solarToEvW = 1100;
      solarToGridW = 700;

      gridToHomeW = 600;
      gridToBatteryW = 900;
      gridToEvW = 1500;

      batteryToHomeW = 500;
      batteryToEvW = 800;
      batteryToGridW = 700;
      liveHomeW = 2300;
    } else if (this._activePreset === 'solar_grid_all') {
      // Grid & Solar charge battery, send to Home, send to EV, and export to Grid Out
      solarToHomeW = 600;
      solarToBatteryW = 1500;
      solarToEvW = 1200;
      solarToGridW = 1200;

      gridToHomeW = 0;
      gridToBatteryW = 1000;
      gridToEvW = 1000;

      batteryToHomeW = 0;
      batteryToEvW = 0;
      batteryToGridW = 0;
      liveHomeW = 600;
    } else {
      const solarPriority = this._config?.solar_priority || 'home';
      let remainingSolar = liveSolarW;

      if (solarPriority === 'battery' && hasBatt && batteryCharging) {
        solarToBatteryW = Math.min(remainingSolar, batteryChargeW);
        remainingSolar -= solarToBatteryW;
        solarToHomeW = Math.min(remainingSolar, liveHomeW);
        remainingSolar -= solarToHomeW;
        if (hasEv && isEvActive) {
          solarToEvW = Math.min(remainingSolar, liveEvW);
          remainingSolar -= solarToEvW;
        }
      } else if (solarPriority === 'ev' && hasEv && isEvActive) {
        solarToEvW = Math.min(remainingSolar, liveEvW);
        remainingSolar -= solarToEvW;
        solarToHomeW = Math.min(remainingSolar, liveHomeW);
        remainingSolar -= solarToHomeW;
        if (hasBatt && batteryCharging) {
          solarToBatteryW = Math.min(remainingSolar, batteryChargeW);
          remainingSolar -= solarToBatteryW;
        }
      } else {
        // Default: 'home' takes solar first
        solarToHomeW = Math.min(remainingSolar, liveHomeW);
        remainingSolar -= solarToHomeW;
        if (hasBatt && batteryCharging) {
          solarToBatteryW = Math.min(remainingSolar, batteryChargeW);
          remainingSolar -= solarToBatteryW;
        }
        if (hasEv && isEvActive) {
          solarToEvW = Math.min(remainingSolar, liveEvW);
          remainingSolar -= solarToEvW;
        }
      }

      if (liveExportW > idleThresh) {
        if (liveSolarW > idleThresh) {
          solarToGridW = Math.min(remainingSolar, liveExportW);
        }
        const remainingExportW = Math.max(0, liveExportW - solarToGridW);
        if (hasBatt && batteryDischarging && remainingExportW > idleThresh) {
          batteryToGridW = Math.min(batteryDischargeW, remainingExportW);
        }
      }

      const homeUnmetW = Math.max(0, liveHomeW - solarToHomeW);
      const evUnmetW = Math.max(0, liveEvW - solarToEvW);

      if (hasBatt && batteryDischarging) {
        let remainingDischargeW = Math.max(0, batteryDischargeW - batteryToGridW);
        if ((this._config.allow_battery_to_ev || this._activePreset === 'batt_to_ev' || this._activePreset === 'solar_batt_supply') && hasEv && evUnmetW > idleThresh) {
          batteryToEvW = Math.min(remainingDischargeW, evUnmetW);
          remainingDischargeW -= batteryToEvW;
        }
        batteryToHomeW = Math.min(remainingDischargeW, homeUnmetW);
      }

      if (liveImportW > idleThresh) {
        let remainingImport = liveImportW;
        gridToHomeW = Math.min(remainingImport, Math.max(0, homeUnmetW - batteryToHomeW));
        remainingImport -= gridToHomeW;

        if (hasBatt && batteryCharging) {
          gridToBatteryW = Math.min(remainingImport, Math.max(0, batteryChargeW - solarToBatteryW));
          remainingImport -= gridToBatteryW;
        }

        if (hasEv && isEvActive) {
          gridToEvW = Math.min(remainingImport, Math.max(0, evUnmetW - batteryToEvW));
          remainingImport -= gridToEvW;
        }
      }
    }
    
    // Set Flow Animations
    const isStress = (this._activePreset === 'all_flows_active');
    setFlow(el.flowSolarHome, solarToHomeW, isStress || (liveSolarW > idleThresh && solarToHomeW > idleThresh), 'solar_home');
    setFlow(el.flowSolarBattery, solarToBatteryW, isStress || (hasBatt && liveSolarW > idleThresh && solarToBatteryW > idleThresh), 'solar_battery');
    setFlow(el.flowSolarEV, solarToEvW, isStress || (hasEv && liveSolarW > idleThresh && solarToEvW > idleThresh), 'solar_ev');
    setFlow(el.flowSolarTesla, solarToEvW, isStress || (hasEv && liveSolarW > idleThresh && solarToEvW > idleThresh), 'solar_tesla');
    setFlow(el.flowSolarGrid, solarToGridW, isStress || (liveSolarW > idleThresh && solarToGridW > idleThresh), 'solar_grid');

    setFlow(el.flowGridHome, gridToHomeW, isStress || (liveImportW > idleThresh && gridToHomeW > idleThresh), 'grid_home');
    setFlow(el.flowGridBattery, gridToBatteryW, isStress || (hasBatt && liveImportW > idleThresh && gridToBatteryW > idleThresh), 'grid_battery');
    setFlow(el.flowGridEV, gridToEvW, isStress || (hasEv && liveImportW > idleThresh && gridToEvW > idleThresh), 'grid_ev');
    setFlow(el.flowGridTesla, gridToEvW, isStress || (hasEv && liveImportW > idleThresh && gridToEvW > idleThresh), 'grid_tesla');

    setFlow(el.flowBatteryHome, batteryToHomeW, isStress || (hasBatt && batteryDischarging && batteryToHomeW > idleThresh), 'battery_home');
    setFlow(el.flowBatteryEV, batteryToEvW, isStress || (hasBatt && hasEv && batteryDischarging && batteryToEvW > idleThresh), 'battery_ev');
    setFlow(el.flowBatteryGrid, batteryToGridW, isStress || (hasBatt && batteryDischarging && batteryToGridW > idleThresh), 'battery_grid');

    // Optional: only draw a rail while its connection is actually carrying power.
    this._applyRailVisibility();

    // UI Formatting
    const fmtPwr = (w) => (w >= 1000 ? `${(w / 1000).toFixed(2)} kW` : `${Math.round(w)} W`);
    const fmtKwh = (kwh) => (kwh ? kwh.toFixed(2) : '0.00');

    // Solar UI updates
    
    // Solar 12-Hour Generation Chart & View Mode Toggle
    const isSolarChart = (this._solarViewMode === 'chart');
    if (el.solarViewTelemetry && el.solarViewChart) {
      if (isSolarChart) {
        el.solarViewTelemetry.style.display = 'none';
        el.solarViewChart.style.display = 'block';
        if (el.badgeSolarForecast) {
          el.badgeSolarForecast.textContent = '12H CHART';
          el.badgeSolarForecast.style.display = 'inline-block';
        }
      } else {
        el.solarViewTelemetry.style.display = 'block';
        el.solarViewChart.style.display = 'none';
      }
    }

    if (el.sparklineSolar && isSolarChart) {
      const liveSparkW = liveSolarW;
      const points = [];
      const now = new Date();
      for (let i = 0; i <= 24; i++) {
        const hour = i / 2.0;
        let p = 0;
        if (hour >= 7 && hour <= 19) {
          p = Math.max(0, Math.sin((hour - 7) / 12 * Math.PI));
        }
        points.push(p);
      }
      if (liveSparkW > 5) {
        points[points.length - 1] = Math.min(1.0, liveSparkW / (maxFlowW * 0.7 || 5000));
      }
      let dLine = `M 0 ${26 - points[0] * 22}`;
      for (let i = 1; i < points.length; i++) {
        const x = (i / (points.length - 1)) * 100;
        const y = 26 - (points[i] * 22);
        dLine += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      const dFill = `${dLine} L 100 28 L 0 28 Z`;
      if (el.sparklineSolarLine) el.sparklineSolarLine.setAttribute('d', dLine);
      if (el.sparklineSolarFill) el.sparklineSolarFill.setAttribute('d', dFill);
      if (el.solarChartLiveVal) el.solarChartLiveVal.textContent = fmtPwr(liveSolarW);
      if (el.solarChartPeakVal) {
        const eSolarPeak = ents.solar_daily_peak ? this._hass.states[ents.solar_daily_peak] : null;
        const sensorPeakW = eSolarPeak ? this._parsePower(eSolarPeak) : 0;
        const realPeakW = Math.max(liveSolarW, sensorPeakW, this._todayPeakSolarW || 0);
        if (liveSolarW > 0) {
          this._todayPeakSolarW = realPeakW;
        }
        el.solarChartPeakVal.textContent = realPeakW > 0 ? `PEAK: ${fmtPwr(realPeakW)}` : 'PEAK: --';
      }
    }

    el.pwrSolar.textContent = fmtPwr(liveSolarW);
    el.kwhSolar.textContent = `${fmtKwh(solarYieldKwh)} kWh today`;
    this._renderSolarSources(solarSrcs, solarSrcW, fmtPwr, liveSolarW);

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
        const pct = Math.min(100, Math.round((solarYieldKwh / fcToday) * 100));
        el.barSolarForecastFill.style.width = `${pct}%`;
        el.barSolarForecastBox.style.display = 'block';
      }
    } else {
      el.badgeSolarForecast.style.display = 'none';
      el.kwhSolarRem.style.display = 'none';
      el.barSolarForecastBox.style.display = 'none';
    }

    // Grid In UI updates
    el.pwrGrid.textContent = fmtPwr(liveImportW);
    el.kwhGrid.textContent = `${fmtKwh(this._parseEnergy(eGridImport))} kWh imported`;

    const icpLimit = (this._config.contract_power_limit_kw || 4.2) * 1000;
    const icpWarnRatio = this._config.contract_warning_pct || 0.85;
    // Two-Tier ICP Breaker Warning
    const icpRatio = icpLimit > 0 ? (liveImportW / icpLimit) : 0;
    if (icpRatio >= 0.95) {
      // Tier 2: CRITICAL TRIP RISK (>= 95% of limit, e.g. >= 3,990 W for 4.2 kW)
      el.badgeGridGuard.textContent = '⚠️ ICP TRIP RISK';
      el.badgeGridGuard.style.color = '#ff1744';
      el.badgeGridGuard.style.background = 'rgba(255, 23, 68, 0.2)';
      el.badgeGridGuard.style.borderColor = 'rgba(255, 23, 68, 0.5)';
      el.badgeGridGuard.style.display = 'inline-block';
      if (el.nodeGrid) el.nodeGrid.classList.add('pulse-icp-alert');
    } else if (icpRatio >= (icpWarnRatio || 0.85)) {
      // Tier 1: AMBER WARNING (>= 85% of limit, e.g. >= 3,570 W for 4.2 kW)
      el.badgeGridGuard.textContent = (this._config?.show_emojis !== false) ? '⚡ ICP WARN' : 'ICP WARN';
      el.badgeGridGuard.style.color = '#ffab00';
      el.badgeGridGuard.style.background = 'rgba(255, 171, 0, 0.2)';
      el.badgeGridGuard.style.borderColor = 'rgba(255, 171, 0, 0.5)';
      el.badgeGridGuard.style.display = 'inline-block';
      if (el.nodeGrid) {
        el.nodeGrid.classList.remove('pulse-icp-alert');
        el.nodeGrid.style.borderColor = '#ffab00';
      }
    } else if (liveImportW >= icpLimit * 0.70) {
      // Normal display when approaching threshold
      el.badgeGridGuard.textContent = `${(icpLimit / 1000).toFixed(1)} kW MAX`;
      el.badgeGridGuard.style.color = '';
      el.badgeGridGuard.style.background = '';
      el.badgeGridGuard.style.borderColor = '';
      el.badgeGridGuard.style.display = 'inline-block';
      if (el.nodeGrid) {
        el.nodeGrid.classList.remove('pulse-icp-alert');
        el.nodeGrid.style.borderColor = cGridBorder;
      }
    } else {
      el.badgeGridGuard.style.display = 'none';
      if (el.nodeGrid) {
        el.nodeGrid.classList.remove('pulse-icp-alert');
        el.nodeGrid.style.borderColor = cGridBorder;
      }
    }

    // Home UI updates
    const kwhSolarYield = solarYieldKwh;
    const kwhGridImport = this._parseEnergy(eGridImport);
    const kwhGridExport = this._parseEnergy(eGridExport);
    const selfConsumedKwh = Math.max(0, kwhSolarYield - kwhGridExport);
    const homeSolarKwh = (hasEv && evDailyKwh > 0) ? Math.max(0, selfConsumedKwh - evDailyKwh) : selfConsumedKwh;

    el.pwrHome.textContent = fmtPwr(liveHomeW);
    el.kwhHome.textContent = `${fmtKwh(homeSolarKwh)} kWh solar`;

    // Dynamic Home Badge (restored from original design)
    const showHomeBadge = (this._config?.show_home_badge !== false);
    if (showHomeBadge && el.badgeHome) {
      let homeBadgeText = 'IDLE';
      let homeBadgeColor = 'rgba(255, 255, 255, 0.4)';
      let homeBadgeBg = 'rgba(255, 255, 255, 0.06)';
      let homeBadgeBorder = 'rgba(255, 255, 255, 0.12)';

      if (liveHomeW > idleThresh) {
        if (gridToHomeW <= idleThresh) {
          if (batteryToHomeW > idleThresh && solarToHomeW <= idleThresh) {
            homeBadgeText = '100% BESS';
            homeBadgeColor = '#00e5ff';
            homeBadgeBg = 'rgba(0, 229, 255, 0.12)';
            homeBadgeBorder = 'rgba(0, 229, 255, 0.3)';
          } else if (batteryToHomeW > idleThresh) {
            homeBadgeText = 'SOLAR + BESS';
            homeBadgeColor = '#00e5ff';
            homeBadgeBg = 'rgba(0, 229, 255, 0.12)';
            homeBadgeBorder = 'rgba(0, 229, 255, 0.3)';
          } else {
            homeBadgeText = '100% SOLAR';
            homeBadgeColor = '#00e5ff';
            homeBadgeBg = 'rgba(0, 229, 255, 0.12)';
            homeBadgeBorder = 'rgba(0, 229, 255, 0.3)';
          }
        } else if (solarToHomeW <= idleThresh && batteryToHomeW <= idleThresh) {
          homeBadgeText = 'GRID';
          homeBadgeColor = '#ff7043';
          homeBadgeBg = 'rgba(255, 112, 67, 0.15)';
          homeBadgeBorder = 'rgba(255, 112, 67, 0.4)';
        } else {
          const greenW = solarToHomeW + batteryToHomeW;
          const covPct = Math.min(100, Math.round((greenW / liveHomeW) * 100));
          if (covPct >= 99) {
            homeBadgeText = '100% SOLAR';
            homeBadgeColor = '#00e5ff';
            homeBadgeBg = 'rgba(0, 229, 255, 0.12)';
            homeBadgeBorder = 'rgba(0, 229, 255, 0.3)';
          } else if (covPct <= 0) {
            homeBadgeText = 'GRID';
            homeBadgeColor = '#ff7043';
            homeBadgeBg = 'rgba(255, 112, 67, 0.15)';
            homeBadgeBorder = 'rgba(255, 112, 67, 0.4)';
          } else {
            homeBadgeText = `${covPct}% SOLAR`;
            homeBadgeColor = '#00e5ff';
            homeBadgeBg = 'rgba(0, 229, 255, 0.12)';
            homeBadgeBorder = 'rgba(0, 229, 255, 0.3)';
          }
        }
      }

      el.badgeHome.textContent = homeBadgeText;
      el.badgeHome.style.color = homeBadgeColor;
      el.badgeHome.style.background = homeBadgeBg;
      el.badgeHome.style.borderColor = homeBadgeBorder;
      el.badgeHome.style.display = 'inline-block';
    } else if (el.badgeHome) {
      el.badgeHome.style.display = 'none';
    }

    // Battery UI updates
    if (hasBatt && el.pwrBattery) {
      el.pwrBattery.textContent = fmtPwr(Math.abs(rawBattW));
      const showBattSoc = (this._config?.show_battery_soc !== false);
      if (batterySoc !== null && showBattSoc) {
        el.kwhBattery.textContent = `${batterySoc}% SoC`;
        if (el.barBatterySocFill) el.barBatterySocFill.style.width = `${Math.min(100, Math.max(0, batterySoc))}%`;
        if (el.barBatterySocBox) el.barBatterySocBox.style.display = 'block';
      } else {
        el.kwhBattery.textContent = `${fmtKwh(batteryKwh)} kWh`;
        if (el.barBatterySocBox) el.barBatterySocBox.style.display = 'none';
      }

      // Battery View Toggling (Live Telemetry vs Stats View)
      const isBattStats = (this._batteryViewMode === 'stats');
      if (el.batteryViewLive) el.batteryViewLive.style.display = isBattStats ? 'none' : 'flex';
      if (el.batteryViewStats) el.batteryViewStats.style.display = isBattStats ? 'flex' : 'none';

      if (isBattStats && el.batteryStat1Val) {
        const battTapMode = this._config?.battery_tapped_view || 'energy_totals';
        if (battTapMode === 'health_diagnostics') {
          const eTemp = ents.battery_temp ? this._hass?.states[ents.battery_temp] : null;
          const eSoh = ents.battery_soh ? this._hass?.states[ents.battery_soh] : null;
          const tempVal = eTemp ? `${parseFloat(eTemp.state).toFixed(0)}°C` : '--°C';
          const sohVal = eSoh ? `${parseFloat(eSoh.state).toFixed(0)}% SoH` : '--% SoH';
          el.batteryStat1Val.textContent = tempVal;
          el.batteryStat2Val.textContent = sohVal;
          el.batteryStat1Lbl.textContent = 'Temperature';
          el.batteryStat2Lbl.textContent = 'Battery Health';
          el.batteryStatSub.textContent = `Current SoC: ${batterySoc !== null ? batterySoc.toFixed(0) : 0}%`;
        } else if (battTapMode === 'custom_sensors') {
          const eC1 = this._config?.battery_custom_stat_1 ? this._hass?.states[this._config.battery_custom_stat_1] : null;
          const eC2 = this._config?.battery_custom_stat_2 ? this._hass?.states[this._config.battery_custom_stat_2] : null;
          const lbl1 = this._config?.battery_custom_stat_1_name || 'Stat 1';
          const lbl2 = this._config?.battery_custom_stat_2_name || 'Stat 2';
          el.batteryStat1Val.textContent = eC1 ? `${eC1.state} ${eC1.attributes?.unit_of_measurement || ''}`.trim() : '--';
          el.batteryStat2Val.textContent = eC2 ? `${eC2.state} ${eC2.attributes?.unit_of_measurement || ''}`.trim() : '--';
          el.batteryStat1Lbl.textContent = lbl1;
          el.batteryStat2Lbl.textContent = lbl2;
          el.batteryStatSub.textContent = `Battery Power: ${fmtPwr(Math.abs(rawBattW))}`;
        } else {
          // Default: Energy Totals (Today Charged & Discharged kWh)
          const chargedKwh = this._parseEnergy(eBattCharge);
          const dischargedKwh = this._parseEnergy(eBattDischarge);
          const netKwh = chargedKwh - dischargedKwh;
          el.batteryStat1Val.textContent = `+${fmtKwh(chargedKwh)} kWh`;
          el.batteryStat2Val.textContent = `-${fmtKwh(dischargedKwh)} kWh`;
          el.batteryStat1Lbl.textContent = lbls.battery_charged || 'Charged Today';
          el.batteryStat2Lbl.textContent = lbls.battery_discharged || 'Discharged';
          el.batteryStatSub.textContent = `${lbls.battery_net || 'Net'}: ${netKwh >= 0 ? '+' : ''}${fmtKwh(netKwh)} kWh`;
        }
      }

      const showBattBadge = (this._config?.show_battery_badge !== false);

      if (batteryCharging) {
        el.badgeBattery.textContent = 'CHARGING';
        el.badgeBattery.style.display = showBattBadge ? 'inline-block' : 'none';
      } else if (batteryDischarging) {
        el.badgeBattery.textContent = 'DISCHARGING';
        el.badgeBattery.style.display = showBattBadge ? 'inline-block' : 'none';
      } else {
        el.badgeBattery.style.display = 'none';
      }
    }

    // EV UI updates (with SoC badge & read-only tap toggle)
    if (hasEv && el.pwrEv) {
      const eTeslaSoc = this._hass?.states[ents.tesla_soc];
      const eTeslaRange = this._hass?.states[ents.tesla_range];
      const eTeslaState = this._hass?.states[ents.tesla_charging_state];

      let rawSoc = eTeslaSoc ? parseFloat(eTeslaSoc.state) : null;
      let rawRange = eTeslaRange ? parseFloat(eTeslaRange.state) : null;

      // In simulation fallback if entity not configured
      if (this._activePreset && rawSoc === null) {
        rawSoc = 68;
        rawRange = 295;
      }

      const hasSoc = typeof rawSoc === 'number' && !isNaN(rawSoc);
      const hasRange = typeof rawRange === 'number' && !isNaN(rawRange);
      const eTeslaLimit = this._hass?.states[ents.tesla_charge_limit];
      const eTeslaTimeToFull = this._hass?.states[ents.tesla_time_to_full];
      const eSessionEnergy = this._hass?.states[ents.ev_session_energy];

      const rawLimit = eTeslaLimit ? parseFloat(eTeslaLimit.state) : null;
      const rawTimeToFull = eTeslaTimeToFull?.state && eTeslaTimeToFull.state !== 'unknown' ? eTeslaTimeToFull.state : null;
      const rawSessionKwh = eSessionEnergy ? this._parseEnergy(eSessionEnergy) : 0;

      const primaryViewMode = this._config.ev_primary_view || 'power_energy';
      const secondaryViewMode = this._config.ev_secondary_view || 'soc_range';

      const isSecondary = (this._teslaViewMode === 'secondary' || this._teslaViewMode === 'battery');
      const activeViewMode = isSecondary ? secondaryViewMode : primaryViewMode;

      // Dynamic Formatter for EV views
      if (activeViewMode === 'soc_range') {
        el.pwrEv.textContent = hasSoc ? `${Math.round(rawSoc)}%` : fmtPwr(liveEvW);
        el.kwhEv.textContent = hasRange ? `${Math.round(rawRange)} km range` : `${fmtKwh(evDailyKwh)} kWh charged`;
      } else if (activeViewMode === 'target_status') {
        el.pwrEv.textContent = (typeof rawLimit === 'number' && !isNaN(rawLimit)) ? `Target: ${Math.round(rawLimit)}%` : (hasSoc ? `${Math.round(rawSoc)}%` : fmtPwr(liveEvW));
        const stateStr = eTeslaState?.state ? eTeslaState.state.toUpperCase() : 'PARKED';
        el.kwhEv.textContent = rawTimeToFull ? `${rawTimeToFull} to full` : stateStr;
      } else if (activeViewMode === 'session_energy') {
        el.pwrEv.textContent = fmtPwr(liveEvW);
        el.kwhEv.textContent = rawSessionKwh > 0 ? `${fmtKwh(rawSessionKwh)} kWh session` : `${fmtKwh(evDailyKwh)} kWh charged`;
      } else {
        // Default: power_energy
        el.pwrEv.textContent = fmtPwr(liveEvW);
        el.kwhEv.textContent = `${fmtKwh(evDailyKwh)} kWh charged`;
      }

      // Micro SoC progress bar under node
      if (el.barEvSocBox) {
        const showSocBar = (this._config?.show_ev_soc_bar !== false) && (this._config?.show_ev_soc !== false) && hasSoc;
        el.barEvSocBox.style.display = showSocBar ? 'block' : 'none';
        if (el.barEvSocFill && hasSoc) {
          el.barEvSocFill.style.width = `${Math.min(100, Math.max(0, rawSoc))}%`;
        }
      }

      // Header Badge
      const rawState = eTeslaState?.state ? String(eTeslaState.state).toLowerCase() : '';
      const stateTxt = (rawState && rawState !== 'unknown' && rawState !== 'unavailable') ? rawState.toUpperCase() : (isEvActive ? 'CHARGING' : 'PARKED');

      const showEvBadge = (this._config?.show_ev_badge !== false) && (this._config?.show_ev_soc_badge !== false);
      if (showEvBadge && el.badgeEv) {
        if (isEvActive) {
          el.badgeEv.textContent = (this._config?.show_emojis !== false) ? '⚡ CHARGING' : 'CHARGING';
          el.badgeEv.style.display = 'inline-block';
        } else if (hasSoc && activeViewMode === 'power_energy') {
          el.badgeEv.textContent = (this._config?.show_emojis !== false) ? `🔋 ${Math.round(rawSoc)}%` : `${Math.round(rawSoc)}%`;
          el.badgeEv.style.display = 'inline-block';
        } else if (activeViewMode === 'soc_range') {
          el.badgeEv.textContent = stateTxt;
          el.badgeEv.style.display = 'inline-block';
        } else if (hasSoc) {
          el.badgeEv.textContent = (this._config?.show_emojis !== false) ? `🔋 ${Math.round(rawSoc)}%` : `${Math.round(rawSoc)}%`;
          el.badgeEv.style.display = 'inline-block';
        } else {
          el.badgeEv.style.display = 'none';
        }
      } else if (el.badgeEv) {
        el.badgeEv.style.display = 'none';
      }
    }

    // Grid Out UI updates
    el.pwrExport.textContent = fmtPwr(liveExportW);
    el.kwhExport.textContent = `${fmtKwh(this._parseEnergy(eGridExport))} kWh exported`;

    // Autarky Scorecard Math & Rings
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

    // 8. Energy Economics & Financial Savings Engine
    const finPlacement = this._financialPlacementOverride !== undefined 
      ? this._financialPlacementOverride 
      : (this._config?.financial_placement || 'none');
    const eTariff = ents.electricity_tariff ? this._hass?.states[ents.electricity_tariff] : null;
    const spotTariff = (eTariff && !isNaN(parseFloat(eTariff.state))) ? parseFloat(eTariff.state) : (typeof this._config?.fixed_tariff === 'number' ? this._config.fixed_tariff : 0.118);
    const exportRate = typeof this._config?.export_compensation_rate === 'number' ? this._config.export_compensation_rate : 0.0726;
    const curr = this._config?.currency_symbol || '€';

    const selfConsumedVal = selfConsumedKwh * spotTariff;
    const exportCreditVal = kwhGridExport * exportRate;
    const grossSolarVal = (kwhGridExport > 0) ? (selfConsumedVal + exportCreditVal) : (kwhSolarYield * spotTariff);
    const gridImportCost = kwhGridImport * spotTariff;
    const netBalanceVal = exportCreditVal - gridImportCost;

    const grossSolarStr = `${grossSolarVal.toFixed(2).replace('.', ',')} ${curr}`;
    const netBalanceStr = `${netBalanceVal >= 0 ? '+' : ''}${netBalanceVal.toFixed(2).replace('.', ',')} ${curr}`;
    const isNetPositive = (netBalanceVal >= 0);

    // Apply visibility based on placement
    if (el.financialRibbon) {
      if (finPlacement === 'bottom_ribbon') {
        el.financialRibbon.style.display = 'grid';
        if (el.finSolarTitle) el.finSolarTitle.textContent = lbls.solar_value;
        if (el.finSolarSub) el.finSolarSub.textContent = lbls.solar_value_sub;
        if (el.finGrossSolar) el.finGrossSolar.textContent = grossSolarStr;
        if (el.finWalletVal) el.finWalletVal.textContent = netBalanceStr;
        if (el.finWalletTitle) el.finWalletTitle.textContent = isNetPositive ? lbls.virtual_battery : lbls.grid_balance;
        if (el.finWalletSub) el.finWalletSub.textContent = isNetPositive ? lbls.virtual_battery_sub : lbls.grid_balance_sub;
        if (el.finWalletBox) {
          el.finWalletBox.style.background = isNetPositive ? 'rgba(0, 229, 255, 0.05)' : 'rgba(255, 183, 77, 0.06)';
          el.finWalletBox.style.borderColor = isNetPositive ? 'rgba(0, 229, 255, 0.25)' : 'rgba(255, 183, 77, 0.3)';
        }
      } else {
        el.financialRibbon.style.display = 'none';
      }
    }

    if (el.badgeSolarFin) {
      if (finPlacement === 'solar_box') {
        el.badgeSolarFin.style.display = 'inline-block';
        el.badgeSolarFin.textContent = `+${grossSolarStr}`;
      } else {
        el.badgeSolarFin.style.display = 'none';
      }
    }

    if (el.scorecardFinRow) {
      if (finPlacement === 'scorecard') {
        el.scorecardFinRow.style.display = 'flex';
        if (el.scorecardFinTitle) el.scorecardFinTitle.textContent = lbls.scorecard_solar_value;
        if (el.scorecardFinVal) el.scorecardFinVal.textContent = grossSolarStr;
      } else {
        el.scorecardFinRow.style.display = 'none';
      }
    }
  }

  getCardSize() {
    return 4;
  }
}


class AresEnergyFlowCardDev extends AresEnergyFlowCard {
  static async getConfigElement() {
    if (window.loadCardHelpers) {
      await window.loadCardHelpers();
    }
    return document.createElement('ares-energy-flow-card-dev-editor');
  }
}

class HaEnergyFlowCard extends AresEnergyFlowCard {}


// One source, two deployments. The dev-lab build prepends a module-scoped
// `const __ARES_DEV_BUILD = true;` (tools/make-dev-build.sh) and then claims only the
// -dev tags, while the production build claims only the production ones. When both files
// claim the same tag, whichever resource Home Assistant loads first wins and the other
// file registers nothing, which is how the dev lab silently rendered production code from
// 2.0.0 up to 2.3.7. Keeping the tag sets disjoint also makes the load order irrelevant.
// The flag has to stay module-scoped: a window.* flag would leak into the other file and
// turn the production build into a dev build when the dev file happens to load first.
const CARD_BUILD = (typeof __ARES_DEV_BUILD !== 'undefined' && __ARES_DEV_BUILD === true) ? 'dev' : 'prod';
AresEnergyFlowCard.BUILD = CARD_BUILD;
AresEnergyFlowCardDev.BUILD = CARD_BUILD;

const CARD_TAGS = CARD_BUILD === 'dev'
  ? [['ares-energy-flow-card-dev', AresEnergyFlowCardDev]]
  : [
      ['ares-energy-flow-card', AresEnergyFlowCard],
      ['ha-energy-flow-card', HaEnergyFlowCard]
    ];

for (const [tag, cls] of CARD_TAGS) {
  try {
    if (!customElements.get(tag)) {
      customElements.define(tag, cls);
    }
  } catch (e) {}
}

window.customCards = window.customCards || [];
const cardMetaProd = {
  type: 'ares-energy-flow-card',
  name: 'ChromaFlow Energy Flow Card',
  description: 'Hardware-accelerated SVG power flow with WAAPI velocity scaling and 3-ring autarky scorecard.',
  preview: true,
  documentationURL: 'https://github.com/Aresitoo/chromaflow'
};
const cardMetaDev = {
  type: 'ares-energy-flow-card-dev',
  name: 'ChromaFlow 3.0 Dev: Dual Battery & EV Lab',
  description: 'Experimental sandbox build featuring 6-node Dual Battery & EV simultaneous mode with dynamic routing.',
  preview: true,
  documentationURL: 'https://github.com/Aresitoo/chromaflow'
};

// Only advertise the card this build actually registers.
const cardMeta = CARD_BUILD === 'dev' ? cardMetaDev : cardMetaProd;
const metaIdx = window.customCards.findIndex(c => c && c.type === cardMeta.type);
if (metaIdx >= 0) window.customCards[metaIdx] = cardMeta;
else window.customCards.push(cardMeta);


class AresEnergyFlowCardDevEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._resetListener = () => {
      if (!this._config) return;
      this._config = {
        ...this._config,
        palette: 'solar',
        colors: {},
        financial_placement: 'none'
      };
      delete this._config.show_battery;
      delete this._config.show_bess;
      delete this._config.bess;
      this.dispatchEvent(new CustomEvent('config-changed', {
        detail: { config: this._config },
        bubbles: true,
        composed: true
      }));
      this._updateFormValues();
      this._renderColorsStudio();
    };
    window.addEventListener('chromaflow-reset-defaults', this._resetListener);
  }

  disconnectedCallback() {
    if (this._resetListener) {
      window.removeEventListener('chromaflow-reset-defaults', this._resetListener);
    }
  }

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

  setConfig(config) {
    this._config = config;
    if (this._rendered) {
      this._updateFormValues();
      this._renderColorsStudio();
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._rendered) {
      this._render();
    } else {
      for (const form of Object.values(this._forms || {})) {
        if (form) form.hass = hass;
      }
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
      solar_daily_yield: resolve('solar_daily_yield', ['sensor.solar_daily_yield', 'sensor.solar_today', 'sensor.energy_production_today']),
      grid_power: resolve('grid_power', ['sensor.return_to_grid_new', 'sensor.grid_power', 'sensor.power_meter']),
      grid_export_power: resolve('grid_export_power', ['sensor.true_grid_export_power', 'sensor.grid_export_power']),
      grid_daily_import: resolve('grid_daily_import', ['sensor.living_room_shellyem_e4525b_channel_1_grid_daily_import_energy', 'sensor.grid_daily_import_energy']),
      grid_daily_export: resolve('grid_daily_export', ['sensor.grid_daily_export_energy', 'sensor.energy_exported_today']),
      load_power: resolve('load_power', ['sensor.load_power', 'sensor.house_consumption_power', 'sensor.home_power']),
      battery_power: resolve('battery_power', ['sensor.battery_power', 'sensor.bess_power', 'sensor.powerwall_battery_now']),
      battery_soc: resolve('battery_soc', ['sensor.battery_soc', 'sensor.battery_state_of_charge', 'sensor.powerwall_charge']),
      battery_daily_charge: resolve('battery_daily_charge', ['sensor.battery_daily_charge_energy', 'sensor.battery_charge_today']),
      battery_daily_discharge: resolve('battery_daily_discharge', ['sensor.battery_daily_discharge_energy', 'sensor.battery_discharge_today']),
      ev_power: resolve('ev_power', ['sensor.evse_192_168_0_249_charge_power', 'sensor.v2c_trydan_power', 'sensor.wallbox_power']),
      ev_charging: resolve('ev_charging', ['binary_sensor.evse_192_168_0_249_charging', 'binary_sensor.v2c_trydan_charging', 'binary_sensor.wallbox_charging']),
      ev_daily_energy: resolve('ev_daily_energy', ['sensor.v2c_charging_stats', 'sensor.evse_192_168_0_249_charge_energy', 'sensor.wallbox_energy_added']),
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
        .header-icon-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          min-width: 32px;
          border-radius: 8px;
          background: var(--secondary-background-color, rgba(255, 255, 255, 0.05));
          border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.08));
          color: var(--primary-text-color, #e0e0e0);
          margin-right: 12px;
          --mdc-icon-size: 18px;
        }
        .expansion-header-title {
          display: flex;
          align-items: center;
          font-weight: 500;
          font-size: 14px;
        }

        /* Color Studio Styling */
        .color-studio-toolbar {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
          margin-bottom: 12px;
        }
        .studio-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 4px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          background: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          font-size: 11.5px;
          justify-content: center;
          text-align: center;
          white-space: nowrap;
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
          margin-left: 0;
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
          <div slot="header" class="expansion-header-title"><span class="header-icon-badge"><ha-icon icon="mdi:solar-power"></ha-icon></span>Solar Panels</div>
          <div class="panel-content"><ha-form id="form-solar"></ha-form></div>
        </ha-expansion-panel>

        <!-- Section 2: Grid & ICP -->
        <ha-expansion-panel outlined>
          <div slot="header" class="expansion-header-title"><span class="header-icon-badge"><ha-icon icon="mdi:transmission-tower"></ha-icon></span>Utility Grid & Power Limit</div>
          <div class="panel-content"><ha-form id="form-grid"></ha-form></div>
        </ha-expansion-panel>

        <!-- Section 3: Dual Battery & EV Storage -->
        <ha-expansion-panel outlined>
          <div slot="header" class="expansion-header-title"><span class="header-icon-badge"><ha-icon icon="mdi:battery-charging"></ha-icon></span>Home Battery & EV Storage</div>
          <div class="panel-content"><ha-form id="form-device"></ha-form></div>
        </ha-expansion-panel>

        <!-- Section 4: Localization & Titles -->
        <ha-expansion-panel outlined>
          <div slot="header" class="expansion-header-title"><span class="header-icon-badge"><ha-icon icon="mdi:format-title"></ha-icon></span>Custom Titles & Display Names</div>
          <div class="panel-content"><ha-form id="form-labels"></ha-form></div>
        </ha-expansion-panel>

        <!-- Section 5: Display & Sizing -->
        <ha-expansion-panel outlined>
          <div slot="header" class="expansion-header-title"><span class="header-icon-badge"><ha-icon icon="mdi:tune-vertical"></ha-icon></span>Sizing, Speeds & Options</div>
          <div class="panel-content"><ha-form id="form-display"></ha-form></div>
        </ha-expansion-panel>

        <!-- Section 6: Granular Colors Studio -->
        <ha-expansion-panel outlined>
          <div slot="header" class="expansion-header-title"><span class="header-icon-badge"><ha-icon icon="mdi:palette"></ha-icon></span>Visual Colors Studio</div>
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
        icon: "mdi:solar-power",
        title: "1. Solar Panels Box",
        items: [
          { key: "bg_solar", label: "Box Background Tint", default: "rgba(255, 255, 255, 0.03)" },
          { key: "border_solar", label: "Box Border & Glow", default: "rgba(255, 213, 79, 0.3)" },
          { key: "title_solar", label: "Title Text & Icon", default: "#ffd54f" },
          { key: "pwr_solar", label: "Solar Generation Power (kW)", default: "#ffffff" },
          { key: "kwh_solar", label: "Daily Solar Energy (kWh)", default: "rgba(255, 255, 255, 0.6)" },
          { key: "kwh_solar_rem", label: "Remaining Forecast (kWh)", default: "#ffd54f" },
          { key: "badge_solar_text", label: "Solcast EST Badge Text", default: "#ffd54f" },
          { key: "badge_solar_bg", label: "Solcast EST Badge Background", default: "rgba(255, 213, 79, 0.12)" },
          { key: "bar_solar_forecast", label: "Forecast Progress Bar Fill", default: "#ffd54f" }
        ]
      },
      {
        icon: "mdi:transmission-tower",
        title: "2. Grid In (Import) Box",
        items: [
          { key: "bg_grid", label: "Box Background Tint", default: "rgba(255, 255, 255, 0.03)" },
          { key: "border_grid", label: "Box Border & Glow", default: "rgba(255, 112, 67, 0.3)" },
          { key: "title_grid", label: "Title Text & Icon", default: "#ff7043" },
          { key: "pwr_grid", label: "Imported Power (kW/W)", default: "#ffffff" },
          { key: "kwh_grid", label: "Imported Energy (kWh)", default: "rgba(255, 255, 255, 0.6)" },
          { key: "badge_grid_text", label: "Grid Limit Warning Badge Text", default: "#ff7043" },
          { key: "badge_grid_bg", label: "Grid Limit Warning Badge Background", default: "rgba(255, 112, 67, 0.12)" },
          { key: "bar_grid_limit", label: "Grid Limit Progress Bar Fill", default: "#ff7043" }
        ]
      },
      {
        icon: "mdi:home-lightning-bolt",
        title: "3. Home Consumption Box",
        items: [
          { key: "bg_home", label: "Box Background Tint", default: "rgba(255, 255, 255, 0.03)" },
          { key: "border_home", label: "Box Border & Glow", default: "rgba(0, 229, 255, 0.3)" },
          { key: "title_home", label: "Title Text & Icon", default: "#00e5ff" },
          { key: "pwr_home", label: "Home Consumption Power (kW/W)", default: "#ffffff" },
          { key: "kwh_home", label: "Solar Energy Used (kWh)", default: "rgba(255, 255, 255, 0.6)" },
          { key: "badge_home_text", label: "Solar Autarky Badge Text", default: "#00e5ff" },
          { key: "badge_home_bg", label: "Solar Autarky Badge Background", default: "rgba(0, 229, 255, 0.12)" }
        ]
      },
      {
        icon: "mdi:battery-charging",
        title: "4. Battery Storage (BESS) Box",
        items: [
          { key: "bg_battery", label: "Box Background Tint", default: "rgba(255, 255, 255, 0.03)" },
          { key: "border_battery", label: "Box Border & Glow", default: "rgba(16, 185, 129, 0.3)" },
          { key: "title_battery", label: "Title Text & Icon", default: "#10b981" },
          { key: "pwr_battery", label: "Charge/Discharge Power (kW)", default: "#ffffff" },
          { key: "kwh_battery", label: "Battery State of Charge (SoC %)", default: "rgba(255, 255, 255, 0.6)" },
          { key: "badge_battery_text", label: "Battery State Badge Text", default: "#10b981" },
          { key: "badge_battery_bg", label: "Battery State Badge Background", default: "rgba(16, 185, 129, 0.12)" },
          { key: "bar_battery_soc", label: "Battery SoC Progress Bar Fill", default: "#10b981" }
        ]
      },
      {
        icon: "mdi:car-electric",
        title: "5. Electric Vehicle (EV) Box",
        items: [
          { key: "bg_ev", label: "Box Background Tint", default: "rgba(255, 255, 255, 0.03)" },
          { key: "border_ev", label: "Box Border & Glow", default: "rgba(179, 136, 255, 0.3)" },
          { key: "title_ev", label: "Title Text & Icon", default: "#b388ff" },
          { key: "pwr_ev", label: "EV Charging Power (kW)", default: "#ffffff" },
          { key: "kwh_ev", label: "Daily EV Energy Charged (kWh)", default: "rgba(255, 255, 255, 0.6)" },
          { key: "badge_ev_text", label: "Charging Badge Text", default: "#b388ff" },
          { key: "badge_ev_bg", label: "Charging Badge Background", default: "rgba(179, 136, 255, 0.12)" }
        ]
      },
      {
        icon: "mdi:transmission-tower-export",
        title: "6. Grid Out (Export) Box",
        items: [
          { key: "bg_export", label: "Box Background Tint", default: "rgba(255, 255, 255, 0.03)" },
          { key: "border_export", label: "Box Border & Glow", default: "rgba(0, 230, 118, 0.25)" },
          { key: "title_export", label: "Title Text & Icon", default: "#00e676" },
          { key: "pwr_export", label: "Export Power (kW/W)", default: "#ffffff" },
          { key: "kwh_export", label: "Exported Energy (kWh)", default: "rgba(255, 255, 255, 0.6)" }
        ]
      },
      {
        icon: "mdi:sine-wave",
        title: "7. Dynamic Energy Flow Lines",
        items: [
          { key: "flow_solar_home_start", label: "Solar ➔ Home: Start Color", default: "#ffd54f" },
          { key: "flow_solar_home_end", label: "Solar ➔ Home: End Color", default: "#00e5ff" },

          { key: "flow_solar_battery_start", label: "Solar ➔ Battery: Start Color", default: "#ffd54f" },
          { key: "flow_solar_battery_end", label: "Solar ➔ Battery: End Color", default: "#10b981" },

          { key: "flow_solar_ev_start", label: "Solar ➔ EV: Start Color", default: "#ffd54f" },
          { key: "flow_solar_ev_end", label: "Solar ➔ EV: End Color", default: "#b388ff" },

          { key: "flow_solar_grid_start", label: "Solar ➔ Grid Out: Start Color", default: "#ffd54f" },
          { key: "flow_solar_grid_end", label: "Solar ➔ Grid Out: End Color", default: "#00e676" },

          { key: "flow_grid_home_start", label: "Grid In ➔ Home: Start Color", default: "#ff7043" },
          { key: "flow_grid_home_end", label: "Grid In ➔ Home: End Color", default: "#00e5ff" },

          { key: "flow_grid_battery_start", label: "Grid In ➔ Battery: Start Color", default: "#ff7043" },
          { key: "flow_grid_battery_end", label: "Grid In ➔ Battery: End Color", default: "#10b981" },

          { key: "flow_grid_ev_start", label: "Grid In ➔ EV: Start Color", default: "#ff7043" },
          { key: "flow_grid_ev_end", label: "Grid In ➔ EV: End Color", default: "#b388ff" },

          { key: "flow_battery_home_start", label: "Battery ➔ Home: Start Color", default: "#10b981" },
          { key: "flow_battery_home_end", label: "Battery ➔ Home: End Color", default: "#00e5ff" },

          { key: "flow_battery_ev_start", label: "Battery ➔ EV: Start Color", default: "#10b981" },
          { key: "flow_battery_ev_end", label: "Battery ➔ EV: End Color", default: "#b388ff" },

          { key: "flow_battery_grid_start", label: "Battery ➔ Grid Out: Start Color", default: "#10b981" },
          { key: "flow_battery_grid_end", label: "Battery ➔ Grid Out: End Color", default: "#00e676" },

          { key: "flow_rails", label: "Rail Override (blank = per-line tint)", default: "" }
        ]
      },
      {
        icon: "mdi:circle-slice-8",
        title: "8. Autarky & Activity Rings",
        items: [
          { key: "ring_autarky", label: "Autarky Ring (Outer Circle)", default: "#00e676" },
          { key: "ring_import", label: "Grid Reliance Ring (Middle Circle)", default: "#ff7043" },
          { key: "ring_export", label: "Grid Export Ring (Inner Circle)", default: "#ffd54f" },
          { key: "autarky_center_pct", label: "Scorecard Center % Text", default: "#ffffff" },
          { key: "autarky_center_lbl", label: "Scorecard Center 'AUTARKY' Label", default: "#00e676" },
          { key: "ring_bg_track", label: "Ring Track Override (blank = per-ring tint)", default: "" }
        ]
      },
      {
        icon: "mdi:table-large",
        title: "9. Tabular KPI Rows",
        items: [
          { key: "bg_scorecard", label: "Scorecard Container Background", default: "rgba(255, 255, 255, 0.02)" },
          { key: "border_scorecard", label: "Scorecard Container Border", default: "rgba(255, 255, 255, 0.06)" },
          { key: "row_self_consumed_title", label: "Row 1 (Self-Consumed) Title & %", default: "#00e676" },
          { key: "row_self_consumed_kwh", label: "Row 1 Energy Number (kWh)", default: "#ffffff" },
          { key: "row_self_consumed_bar", label: "Row 1 Progress Bar Fill", default: "#00e676" },

          { key: "row_grid_reliance_title", label: "Row 2 (Grid Reliance) Title & %", default: "#ff7043" },
          { key: "row_grid_reliance_kwh", label: "Row 2 Energy Number (kWh)", default: "#ffffff" },
          { key: "row_grid_reliance_bar", label: "Row 2 Progress Bar Fill", default: "#ff7043" },

          { key: "row_exported_title", label: "Row 3 (Exported) Title & %", default: "#ffd54f" },
          { key: "row_exported_kwh", label: "Row 3 Energy Number (kWh)", default: "#ffffff" },
          { key: "row_exported_bar", label: "Row 3 Progress Bar Fill", default: "#ffd54f" }
        ]
      },
      {
        icon: "mdi:cash-multiple",
        title: "10. Financial Savings & Bottom Ribbon",
        items: [
          { key: "fin_solar_val", label: "Total Solar Value Pill & Badge Color", default: "#00e676" },
          { key: "fin_virtual_battery", label: "Virtual Battery Pill Color", default: "#00e5ff" }
        ]
      }
    ];

    const curPal = (this._config && this._config.palette) || "solar";
    let html = `
      <div style="margin-bottom: 14px;">
        <label style="display: flex; align-items: center; font-size: 13px; font-weight: 600; color: var(--primary-text-color, #e0e0e0); margin-bottom: 8px;">
          <ha-icon icon="mdi:palette-outline" style="--mdc-icon-size: 18px; margin-right: 8px; color: var(--secondary-text-color, #9e9e9e);"></ha-icon>
          Color Theme Preset
        </label>
        <select id="select-theme-preset" style="width: 100%; padding: 10px 12px; border-radius: 8px; background: var(--secondary-background-color, #1a1e26); border: 1px solid var(--divider-color, rgba(255, 255, 255, 0.18)); color: var(--primary-text-color, #ffffff); font-size: 13px; font-weight: 500; cursor: pointer; outline: none;">
          <option value="solar" ${curPal === 'solar' ? 'selected' : ''}>Solar Harmonized (Default)</option>
          <option value="synthwave" ${curPal === 'synthwave' ? 'selected' : ''}>Synthwave Sunset (Sunset Amber, Magenta & Miami Aqua)</option>
          <option value="cyberpunk" ${curPal === 'cyberpunk' ? 'selected' : ''}>Cyberpunk Neon (Cyan, Hot Pink & Toxic Lime)</option>
          <option value="nord" ${curPal === 'nord' ? 'selected' : ''}>Nord Frost (Polar Night, Ice Blue & Arctic Teal)</option>
          <option value="midnight" ${curPal === 'midnight' ? 'selected' : ''}>Midnight Glow (Stealth Slate, Sky Blue & Amber)</option>
          <option value="emerald" ${curPal === 'emerald' ? 'selected' : ''}>Emerald Forest (Mint Jade, Lime Leaf & Deep Pine)</option>
          <option value="ocean" ${curPal === 'ocean' ? 'selected' : ''}>Deep Ocean (Lagoon Aqua, Coral & Deep Indigo)</option>
          <option value="fitness" ${curPal === 'fitness' ? 'selected' : ''}>Fitness Activity (Apple Rings)</option>
          <option value="halloween" ${curPal === 'halloween' ? 'selected' : ''}>Spooky Halloween (Pumpkin & Witch Purple)</option>
          <option value="christmas" ${curPal === 'christmas' ? 'selected' : ''}>Festive Christmas (Pine, Crimson & Gold)</option>
        </select>
      </div>
      <div class="color-studio-toolbar">
        <button id="btn-random-palette" class="studio-btn btn-random-palette"><ha-icon icon="mdi:auto-fix" style="--mdc-icon-size: 16px; margin-right: 6px; vertical-align: middle;"></ha-icon>Harmonized</button>
        <button id="btn-wild-shuffle" class="studio-btn btn-wild-shuffle"><ha-icon icon="mdi:shuffle-variant" style="--mdc-icon-size: 16px; margin-right: 6px; vertical-align: middle;"></ha-icon>Shuffle</button>
        <button id="btn-reset-colors" class="studio-btn btn-reset-colors"><ha-icon icon="mdi:restore" style="--mdc-icon-size: 16px; margin-right: 6px; vertical-align: middle;"></ha-icon>Reset All</button>
      </div>
      <div class="color-studio-tip">
        <span><ha-icon icon="mdi:information-outline" style="--mdc-icon-size: 16px; vertical-align: middle; margin-right: 6px; color: var(--secondary-text-color, #9e9e9e);"></ha-icon>Tap any color square or enter hex codes. Every box, flow rail, and scorecard row can be independently styled.</span>
      </div>
    `;

    for (const grp of groups) {
      html += `<div class="color-group-box"><div class="color-group-title" style="display: flex; align-items: center;"><span class="header-icon-badge"><ha-icon icon="${grp.icon}"></ha-icon></span>${grp.title}</div>`;
      for (const item of grp.items) {
        html += `
          <div class="color-row">
            <div class="color-label">${item.label}</div>
            <div class="color-input-pair">
              <input type="color" class="color-wheel-btn" data-color-key="${item.key}" data-default="${item.default}" value="${colorToHex(item.default, '#ffd54f')}">
              <input type="text" class="color-text-input" data-color-key="${item.key}" placeholder="${item.default}">
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }

    container.innerHTML = html;

    // Attach Color Listeners
    const inputs = container.querySelectorAll('.color-text-input, .color-wheel-btn');
    inputs.forEach(inp => {
      inp.addEventListener('input', (ev) => {
        const key = ev.target.getAttribute('data-color-key');
        let val = ev.target.value;
        const textInp = container.querySelector(`.color-text-input[data-color-key="${key}"]`);
        const wheelInp = container.querySelector(`.color-wheel-btn[data-color-key="${key}"]`);

        if (ev.target.classList.contains('color-wheel-btn')) {
          if (textInp) textInp.value = val;
        } else {
          if (wheelInp) wheelInp.value = colorToHex(val, wheelInp.value);
        }

        const cfg = { ...this._config };
        cfg.colors = { ...(cfg.colors || {}) };
        if (val) cfg.colors[key] = val;
        else delete cfg.colors[key];

        this._config = cfg;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true
        }));
      });
    });

    // Preset dropdown listener
    const selectPreset = container.querySelector('#select-theme-preset');
    if (selectPreset) {
      selectPreset.addEventListener('change', (ev) => {
        const val = ev.target.value;
        const cfg = { ...this._config, palette: val };
        delete cfg.colors; // Clear custom overrides so preset applies cleanly
        this._config = cfg;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true
        }));
        this._renderColorsStudio();
      });
    }

    // Harmonized Palette (Algorithmic Harmony with Clean Neutral Boxes)
    const btnRandom = container.querySelector('#btn-random-palette');
    if (btnRandom) {
      btnRandom.addEventListener('click', () => {
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

        const baseH = Math.floor(Math.random() * 360);
        const cSolar = hslToHex(baseH, 95, 62);
        const cHome = hslToHex((baseH + 60) % 360, 92, 58);
        const cGrid = hslToHex((baseH + 180) % 360, 95, 60);
        const cBatt = hslToHex((baseH + 120) % 360, 85, 54);
        const cEv = hslToHex((baseH + 240) % 360, 90, 68);
        const cExport = hslToHex((baseH + 90) % 360, 95, 60);

        const cfg = { ...this._config };
        delete cfg.palette;
        cfg.colors = {
          title_solar: cSolar,
          border_solar: cSolar,
          bg_solar: 'rgba(255, 255, 255, 0.03)',
          pwr_solar: '#ffffff',
          kwh_solar: 'rgba(255, 255, 255, 0.6)',
          kwh_solar_rem: cSolar,
          badge_solar_text: cSolar,
          badge_solar_bg: 'rgba(255, 255, 255, 0.05)',
          bar_solar_forecast: cSolar,

          title_grid: cGrid,
          border_grid: cGrid,
          bg_grid: 'rgba(255, 255, 255, 0.03)',
          pwr_grid: '#ffffff',
          kwh_grid: 'rgba(255, 255, 255, 0.6)',
          badge_grid_text: cGrid,
          badge_grid_bg: 'rgba(255, 255, 255, 0.05)',
          bar_grid_limit: cGrid,

          title_home: cHome,
          border_home: cHome,
          bg_home: 'rgba(255, 255, 255, 0.03)',
          pwr_home: '#ffffff',
          kwh_home: 'rgba(255, 255, 255, 0.6)',
          badge_home_text: cHome,
          badge_home_bg: 'rgba(255, 255, 255, 0.05)',

          title_battery: cBatt,
          border_battery: cBatt,
          bg_battery: 'rgba(255, 255, 255, 0.03)',
          pwr_battery: '#ffffff',
          kwh_battery: 'rgba(255, 255, 255, 0.6)',
          badge_battery_text: cBatt,
          badge_battery_bg: 'rgba(255, 255, 255, 0.05)',
          bar_battery_soc: cBatt,

          title_ev: cEv,
          border_ev: cEv,
          bg_ev: 'rgba(255, 255, 255, 0.03)',
          pwr_ev: '#ffffff',
          kwh_ev: 'rgba(255, 255, 255, 0.6)',
          badge_ev_text: cEv,
          badge_ev_bg: 'rgba(255, 255, 255, 0.05)',
          bar_ev_soc: cEv,

          title_export: cExport,
          border_export: cExport,
          bg_export: 'rgba(255, 255, 255, 0.03)',
          pwr_export: '#ffffff',
          kwh_export: 'rgba(255, 255, 255, 0.6)',

          flow_solar_home_start: cSolar,
          flow_solar_home_end: cHome,
          flow_solar_battery_start: cSolar,
          flow_solar_battery_end: cBatt,
          flow_solar_ev_start: cSolar,
          flow_solar_ev_end: cEv,
          flow_solar_grid_start: cSolar,
          flow_solar_grid_end: cExport,
          flow_grid_home_start: cGrid,
          flow_grid_home_end: cHome,
          flow_grid_battery_start: cGrid,
          flow_grid_battery_end: cBatt,
          flow_grid_ev_start: cGrid,
          flow_grid_ev_end: cEv,
          flow_battery_home_start: cBatt,
          flow_battery_home_end: cHome,
          flow_battery_ev_start: cBatt,
          flow_battery_ev_end: cEv,
          flow_battery_grid_start: cBatt,
          flow_battery_grid_end: cExport,

          ring_autarky: cHome,
          ring_import: cGrid,
          ring_export: cExport,
          autarky_center_pct: '#ffffff',
          autarky_center_lbl: cHome,
          fin_solar_val: cSolar,
          fin_virtual_battery: cBatt,
          bg_scorecard: 'rgba(255, 255, 255, 0.02)',
          border_scorecard: 'rgba(255, 255, 255, 0.08)',
          row_self_consumed_title: cHome,
          row_self_consumed_kwh: '#ffffff',
          row_self_consumed_bar: cHome,
          row_grid_reliance_title: cGrid,
          row_grid_reliance_kwh: '#ffffff',
          row_grid_reliance_bar: cGrid,
          row_exported_title: cExport,
          row_exported_kwh: '#ffffff',
          row_exported_bar: cExport
        };

        this._config = cfg;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true
        }));
        this._renderColorsStudio();
      });
    }

    // Protected Shuffle (Random vivid colors on lines/accents, clean neutral dark boxes)
    const btnShuffle = container.querySelector('#btn-wild-shuffle');
    if (btnShuffle) {
      btnShuffle.addEventListener('click', () => {
        const randHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
        const cfg = { ...this._config };
        delete cfg.palette;
        cfg.colors = {};
        const whls = container.querySelectorAll('.color-wheel-btn');
        whls.forEach(w => {
          const key = w.getAttribute('data-color-key');
          if (key) {
            if (key.startsWith('bg_')) {
              cfg.colors[key] = 'rgba(255, 255, 255, 0.03)';
            } else {
              cfg.colors[key] = randHex();
            }
          }
        });
        this._config = cfg;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true
        }));
        this._renderColorsStudio();
      });
    }

    // Reset button
    const btnReset = container.querySelector('#btn-reset-colors');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        const cfg = { ...this._config, palette: 'solar' };
        cfg.colors = {};
        this._config = cfg;
        this.dispatchEvent(new CustomEvent('config-changed', {
          detail: { config: this._config },
          bubbles: true,
          composed: true
        }));
        this._renderColorsStudio();
      });
    }
  }

  _updateFormValues() {
    if (!this._config) return;
    const ents = this._getEditorEntities();
    const lbls = this._config.labels || {};
    const colors = this._config.colors || {};

    if (this._forms.solar) {
      // Solar sub-arrays (v2.2.0). The renderer kept support for solar_sources; this is the
      // editor side that cd0bc6f dropped by accident. Slots 1..4 are edited as flat form
      // fields and reassembled in _sectionValueChanged.
      const editorSrcs = Array.isArray(this._config.solar_sources) ? this._config.solar_sources : [];
      const srcSlots = {};
      for (let i = 0; i < 4; i++) {
        const src = editorSrcs[i] || {};
        srcSlots[`solar_source_${i + 1}_name`] = src.name || '';
        srcSlots[`solar_source_${i + 1}_power`] = src.power || src.entity || '';
        srcSlots[`solar_source_${i + 1}_daily_yield`] = src.daily_yield || '';
      }
      const hasSources = editorSrcs.length > 0;
      this._forms.solar.data = {
        solar_power: ents.solar_power || '',
        solar_daily_yield: ents.solar_daily_yield || '',
        solcast_today: ents.solcast_today || '',
        solcast_remaining: ents.solcast_remaining || '',
        show_solar_forecast: this._config.show_solar_forecast !== false,
        show_solar_sources: this._config.show_solar_sources !== false && hasSources,
        solar_daily_peak: ents.solar_daily_peak || this._config.solar_daily_peak || '',
        financial_placement: this._config.financial_placement || 'none',
        electricity_tariff: ents.electricity_tariff || this._config.electricity_tariff || '',
        export_compensation_rate: (typeof this._config.export_compensation_rate === 'number') ? this._config.export_compensation_rate : 0.0726,
        fixed_tariff: (typeof this._config.fixed_tariff === 'number') ? this._config.fixed_tariff : 0.118,
        currency_symbol: this._config.currency_symbol || '€',
        ...srcSlots
      };
      if (this._hass) this._forms.solar.hass = this._hass;
    }

    if (this._forms.grid) {
      this._forms.grid.data = {
        show_grid_out: this._config.show_grid_out !== false && this._config.show_export !== false,
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
      const hasBattConfigured = (typeof this._config.show_battery === 'boolean')
        ? this._config.show_battery
        : Boolean(ents.battery_power || ents.battery_daily_charge || ents.battery_daily_discharge || this._config.device_type === 'battery' || this._config.bess === true);
      const hasEvConfigured = (typeof this._config.show_ev === 'boolean')
        ? this._config.show_ev
        : (this._config.device_type === 'battery' ? Boolean(ents.ev_power || ents.ev_charging || ents.ev_daily_energy) : true);

      this._forms.device.data = {
        show_battery: hasBattConfigured,
        battery_position: this._config.battery_position || 'left',
        show_battery_soc: this._config.show_battery_soc !== false,
        show_battery_badge: this._config.show_battery_badge !== false,
        battery_tapped_view: this._config.battery_tapped_view || 'energy_totals',
        battery_custom_stat_1: this._config.battery_custom_stat_1 || '',
        battery_custom_stat_1_name: this._config.battery_custom_stat_1_name || '',
        battery_custom_stat_2: this._config.battery_custom_stat_2 || '',
        battery_custom_stat_2_name: this._config.battery_custom_stat_2_name || '',
        battery_temp: ents.battery_temp || this._config.battery_temp || '',
        battery_soh: ents.battery_soh || this._config.battery_soh || '',
        show_ev: hasEvConfigured,
        allow_battery_to_ev: Boolean(this._config.allow_battery_to_ev),
        show_ev_soc_bar: this._config.show_ev_soc_bar !== false,
        show_ev_soc_badge: (this._config.show_ev_soc_badge !== false) && (this._config.show_ev_badge !== false),
        ev_primary_view: this._config.ev_primary_view || 'power_energy',
        ev_secondary_view: this._config.ev_secondary_view || 'soc_range',
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
        lbl_exported_sub: lbls.exported_sub || '',
        lbl_solar_value: lbls.solar_value || '',
        lbl_solar_value_sub: lbls.solar_value_sub || '',
        lbl_virtual_battery: lbls.virtual_battery || '',
        lbl_virtual_battery_sub: lbls.virtual_battery_sub || '',
        lbl_grid_balance: lbls.grid_balance || '',
        lbl_grid_balance_sub: lbls.grid_balance_sub || '',
        lbl_scorecard_solar_value: lbls.scorecard_solar_value || '',
        lbl_battery_charged: lbls.battery_charged || '',
        lbl_battery_discharged: lbls.battery_discharged || '',
        lbl_battery_net: lbls.battery_net || ''
      };
      if (this._hass) this._forms.labels.hass = this._hass;
    }

    if (this._forms.display) {
      this._forms.display.data = {
        financial_placement: this._config?.financial_placement || 'none',
        show_emojis: this._config?.show_emojis !== false,
        show_sim_toolbar: this._config?.show_sim_toolbar !== false,
        show_idle_rails: this._config?.show_idle_rails !== false,
        solar_priority: this._config?.solar_priority || 'home',
        font_scale: this._config.font_scale ?? 1.0,
        speed_multiplier: this._config.speed_multiplier ?? 1.0,
        palette: this._config.palette || 'solar',
        use_ha_theme: this._config.use_ha_theme === true,
        show_solar_sparkline: this._config.show_solar_sparkline !== false,
        ev_primary_view: this._config.ev_primary_view || 'power_energy',
        ev_secondary_view: this._config.ev_secondary_view || 'soc_range',
        show_ev_soc_badge: this._config.show_ev_soc_badge !== false,
        show_ev_soc_bar: this._config.show_ev_soc_bar !== false,
        power_unit: this._config.power_unit || '',
        min_flow_threshold_w: this._config.min_flow_threshold_w ?? 2,
        max_expected_power_kw: this._config.max_expected_power_kw ?? 7.5,
        speed_solar_home: this._config.line_speeds?.solar_home ?? 1.0,
        speed_solar_battery: this._config.line_speeds?.solar_battery ?? 1.0,
        speed_solar_ev: this._config.line_speeds?.solar_ev ?? 1.0,
        speed_solar_grid: this._config.line_speeds?.solar_grid ?? 1.0,
        speed_grid_home: this._config.line_speeds?.grid_home ?? 1.0,
        speed_grid_battery: this._config.line_speeds?.grid_battery ?? 1.0,
        speed_grid_ev: this._config.line_speeds?.grid_ev ?? 1.0,
        speed_battery_home: this._config.line_speeds?.battery_home ?? 1.0,
        speed_battery_ev: this._config.line_speeds?.battery_ev ?? 1.0,
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
      const keys = ['solar_power', 'solar_daily_yield', 'solcast_today', 'solcast_remaining', 'solar_daily_peak', 'electricity_tariff'];
      for (const k of keys) {
        if (val[k]) cfg.entities[k] = val[k];
        else delete cfg.entities[k];
      }
      cfg.show_solar_forecast = Boolean(val.show_solar_forecast);
      cfg.show_solar_sources = Boolean(val.show_solar_sources);

      // Solar sub-arrays (v2.2.0): rebuild slots 1..4 from the flat form fields, keep any
      // extra entries a YAML config may carry beyond slot 4, and drop the key when empty.
      const prevSrcs = Array.isArray(cfg.solar_sources) ? cfg.solar_sources : [];
      const srcs = [];
      for (let i = 0; i < 4; i++) {
        const power = val[`solar_source_${i + 1}_power`];
        if (!power) continue;
        const src = { ...(prevSrcs[i] || {}) };
        delete src.entity;
        src.power = power;
        const nm = val[`solar_source_${i + 1}_name`];
        if (nm) src.name = nm; else delete src.name;
        const dy = val[`solar_source_${i + 1}_daily_yield`];
        if (dy) src.daily_yield = dy; else delete src.daily_yield;
        srcs.push(src);
      }
      srcs.push(...prevSrcs.slice(4));
      if (srcs.length) cfg.solar_sources = srcs;
      else delete cfg.solar_sources;
      cfg.financial_placement = val.financial_placement || 'none';
      if (typeof val.export_compensation_rate === 'number') cfg.export_compensation_rate = val.export_compensation_rate;
      if (typeof val.fixed_tariff === 'number') cfg.fixed_tariff = val.fixed_tariff;
      if (val.currency_symbol) cfg.currency_symbol = val.currency_symbol;
    } else if (secId === 'grid') {
      cfg.show_grid_out = Boolean(val.show_grid_out);
      cfg.show_export = Boolean(val.show_grid_out);
      const keys = ['grid_power', 'grid_export_power', 'grid_daily_import', 'grid_daily_export', 'load_power'];
      for (const k of keys) {
        if (val[k]) cfg.entities[k] = val[k];
        else delete cfg.entities[k];
      }
      cfg.contract_power_limit_kw = parseFloat(val.contract_power_limit_kw) || 4.2;
      const rawWarnVal = parseFloat(val.contract_warning_pct);
      cfg.contract_warning_pct = (rawWarnVal > 1) ? (rawWarnVal / 100.0) : (rawWarnVal || 0.85);
    } else if (secId === 'device') {
      cfg.show_battery = Boolean(val.show_battery);
      cfg.battery_position = val.battery_position || 'left';
      cfg.allow_grid_to_battery = Boolean(val.allow_grid_to_battery);
      cfg.battery_capacity_kwh = parseFloat(val.battery_capacity_kwh) || 0;
      cfg.show_battery_soc = Boolean(val.show_battery_soc);
      cfg.show_battery_badge = Boolean(val.show_battery_badge);
      cfg.show_ev = Boolean(val.show_ev);
      cfg.allow_battery_to_ev = Boolean(val.allow_battery_to_ev);
      cfg.show_ev_soc_bar = Boolean(val.show_ev_soc_bar);
      cfg.show_ev_soc_badge = Boolean(val.show_ev_soc_badge);
      cfg.show_ev_badge = Boolean(val.show_ev_soc_badge);
      cfg.ev_primary_view = val.ev_primary_view || 'power_energy';
      cfg.ev_secondary_view = val.ev_secondary_view || 'soc_range';
      cfg.battery_positive_charging = val.battery_positive_charging !== false;

      cfg.battery_tapped_view = val.battery_tapped_view || 'energy_totals';
      cfg.battery_custom_stat_1 = val.battery_custom_stat_1 || '';
      cfg.battery_custom_stat_1_name = val.battery_custom_stat_1_name || '';
      cfg.battery_custom_stat_2 = val.battery_custom_stat_2 || '';
      cfg.battery_custom_stat_2_name = val.battery_custom_stat_2_name || '';

      const bKeys = ['battery_power', 'battery_soc', 'battery_daily_charge', 'battery_daily_discharge', 'battery_temp', 'battery_soh'];
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
        lbl_exported_sub: 'exported_sub',
        lbl_solar_value: 'solar_value',
        lbl_solar_value_sub: 'solar_value_sub',
        lbl_virtual_battery: 'virtual_battery',
        lbl_virtual_battery_sub: 'virtual_battery_sub',
        lbl_grid_balance: 'grid_balance',
        lbl_grid_balance_sub: 'grid_balance_sub',
        lbl_scorecard_solar_value: 'scorecard_solar_value',
        lbl_battery_charged: 'battery_charged',
        lbl_battery_discharged: 'battery_discharged',
        lbl_battery_net: 'battery_net'
      };
      for (const [formKey, lKey] of Object.entries(lMap)) {
        if (val[formKey]) cfg.labels[lKey] = val[formKey];
        else delete cfg.labels[lKey];
      }
      if (val.battery_name) cfg.battery_name = val.battery_name;
      if (val.ev_name) cfg.ev_name = val.ev_name;
    } else if (secId === 'display') {
      cfg.financial_placement = val.financial_placement || 'none';
      cfg.show_emojis = val.show_emojis !== false;
      cfg.show_sim_toolbar = Boolean(val.show_sim_toolbar);
      cfg.show_idle_rails = val.show_idle_rails !== false;
      if (val.solar_priority) cfg.solar_priority = val.solar_priority;
      cfg.font_scale = typeof val.font_scale === 'number' ? val.font_scale : 1.0;
      cfg.speed_multiplier = typeof val.speed_multiplier === 'number' ? val.speed_multiplier : 1.0;
      cfg.palette = val.palette || 'solar';
      if (val.use_ha_theme) cfg.use_ha_theme = true; else delete cfg.use_ha_theme;
      if (typeof val.show_solar_sparkline === 'boolean') cfg.show_solar_sparkline = val.show_solar_sparkline;
      if (val.ev_primary_view) cfg.ev_primary_view = val.ev_primary_view;
      if (val.ev_secondary_view) cfg.ev_secondary_view = val.ev_secondary_view;
      if (typeof val.show_ev_soc_badge === 'boolean') cfg.show_ev_soc_badge = val.show_ev_soc_badge;
      if (typeof val.show_ev_soc_bar === 'boolean') cfg.show_ev_soc_bar = val.show_ev_soc_bar;
      cfg.power_unit = val.power_unit || '';
      cfg.min_flow_threshold_w = typeof val.min_flow_threshold_w === 'number' ? val.min_flow_threshold_w : 2;
      cfg.max_expected_power_kw = typeof val.max_expected_power_kw === 'number' ? val.max_expected_power_kw : 7.5;
      cfg.line_speeds = {
        solar_home: parseFloat(val.speed_solar_home) || 1.0,
        solar_battery: parseFloat(val.speed_solar_battery) || 1.0,
        solar_ev: parseFloat(val.speed_solar_ev) || 1.0,
        solar_tesla: parseFloat(val.speed_solar_ev) || 1.0,
        solar_grid: parseFloat(val.speed_solar_grid) || 1.0,
        grid_home: parseFloat(val.speed_grid_home) || 1.0,
        grid_battery: parseFloat(val.speed_grid_battery) || 1.0,
        grid_ev: parseFloat(val.speed_grid_ev) || 1.0,
        grid_tesla: parseFloat(val.speed_grid_ev) || 1.0,
        battery_home: parseFloat(val.speed_battery_home) || 1.0,
        battery_ev: parseFloat(val.speed_battery_ev) || 1.0,
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
      { name: "solar_power", label: "Live Solar Power Sensor (Watts or kW)", selector: { entity: { domain: ["sensor"] } } },
      { name: "solar_daily_yield", label: "Today's Solar Energy Sensor (kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "solcast_today", label: "Solcast Today Forecast Sensor (Optional, kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "solcast_remaining", label: "Solcast Remaining Forecast Sensor (Optional, kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "show_solar_forecast", label: "Show Solar Forecast Pill & Progress Bar", selector: { boolean: {} } },
      { name: "show_solar_sources", label: "Show Sub-Arrays (Microinverters / Strings)", selector: { boolean: {} } },
      {
        type: "expandable",
        name: "",
        flatten: true,
        title: "Solar Sub-Arrays (Roof, Garage, Balcony)",
        schema: [
          { name: "solar_source_1_name", label: "Array 1: Name", selector: { text: {} } },
          { name: "solar_source_1_power", label: "Array 1: Live Power", selector: { entity: { domain: ["sensor"] } } },
          { name: "solar_source_1_daily_yield", label: "Array 1: Energy Today (Optional)", selector: { entity: { domain: ["sensor"] } } },
          { name: "solar_source_2_name", label: "Array 2: Name", selector: { text: {} } },
          { name: "solar_source_2_power", label: "Array 2: Live Power", selector: { entity: { domain: ["sensor"] } } },
          { name: "solar_source_2_daily_yield", label: "Array 2: Energy Today (Optional)", selector: { entity: { domain: ["sensor"] } } },
          { name: "solar_source_3_name", label: "Array 3: Name", selector: { text: {} } },
          { name: "solar_source_3_power", label: "Array 3: Live Power", selector: { entity: { domain: ["sensor"] } } },
          { name: "solar_source_3_daily_yield", label: "Array 3: Energy Today (Optional)", selector: { entity: { domain: ["sensor"] } } },
          { name: "solar_source_4_name", label: "Array 4: Name", selector: { text: {} } },
          { name: "solar_source_4_power", label: "Array 4: Live Power", selector: { entity: { domain: ["sensor"] } } },
          { name: "solar_source_4_daily_yield", label: "Array 4: Energy Today (Optional)", selector: { entity: { domain: ["sensor"] } } }
        ]
      },
      { name: "solar_daily_peak", label: "Solar Daily Peak Power Sensor (kW/W)", selector: { entity: { domain: ["sensor"] } } },
      { name: "financial_placement", label: "Solar Monetary Savings Placement", selector: { select: { options: [
        { value: "none", label: "Hidden / Disabled" },
        { value: "bottom_ribbon", label: "Dual Bottom Ribbon (Total Solar Value + Virtual Battery)" },
        { value: "solar_box", label: "Solar Node Badge" },
        { value: "scorecard", label: "Autarky Scorecard Row" }
      ] } } },
      { name: "electricity_tariff", label: "Electricity Spot Tariff Sensor (€/kWh)", selector: { entity: { domain: ["sensor"] } } },
      { name: "export_compensation_rate", label: "Solar Export Compensation Rate (€/kWh)", selector: { number: { min: 0, max: 1, step: 0.0001, mode: "box" } } },
      { name: "fixed_tariff", label: "Fallback / Fixed Tariff (€/kWh)", selector: { number: { min: 0, max: 1, step: 0.001, mode: "box" } } },
      { name: "currency_symbol", label: "Currency Symbol", selector: { text: {} } }
    ];
  }

  _getGridSchema() {
    return [
      { name: "show_grid_out", label: "Show Grid Out (Export Node & Gauge Ring)", selector: { boolean: {} } },
      { name: "grid_power", label: "Grid Meter (Import / Export)", selector: { entity: { domain: ["sensor"] } } },
      { name: "grid_export_power", label: "Separate Export Meter (Optional)", selector: { entity: { domain: ["sensor"] } } },
      { name: "grid_daily_import", label: "Today's Grid Import", selector: { entity: { domain: ["sensor"] } } },
      { name: "grid_daily_export", label: "Today's Grid Export", selector: { entity: { domain: ["sensor"] } } },
      { name: "load_power", label: "Total House Consumption (Optional - auto-calculated)", selector: { entity: { domain: ["sensor"] } } },
      { name: "contract_power_limit_kw", label: "Grid Power Limit (kW / ICP)", selector: { number: { min: 1, max: 50, step: 0.1, mode: "box" } } },
      { name: "contract_warning_pct", label: "Warning Alert Threshold (%)", selector: { number: { min: 50, max: 100, step: 5, unit_of_measurement: "%", mode: "slider" } } }
    ];
  }

  _getDeviceSchema() {
    return [
      { name: "show_battery", label: "Show Home Battery", selector: { boolean: {} } },
      { name: "battery_position", label: "Home Battery Position", selector: { select: { options: [
        { value: "left", label: "Left Column (Under Solar)" },
        { value: "right", label: "Right Column (Between Home & Grid Out)" }
      ] } } },
      { name: "show_battery_soc", label: "Show Home Battery % and Progress Bar", selector: { boolean: {} } },
      { name: "show_battery_badge", label: "Show Home Battery State Badge", selector: { boolean: {} } },

      { name: "show_ev", label: "Show Electric Vehicle (EV)", selector: { boolean: {} } },
      { name: "allow_battery_to_ev", label: "Allow Home Battery to Charge EV", selector: { boolean: {} } },
      { name: "show_ev_soc_bar", label: "Show EV Battery Progress Bar", selector: { boolean: {} } },
      { name: "show_ev_soc_badge", label: "Show EV Battery % / State Badge", selector: { boolean: {} } },
      { name: "ev_primary_view", label: "Vehicle Card: Default Display Mode", selector: { select: { options: [
        { value: "power_energy", label: "Live Power & Today's Energy Charged (Default)" },
        { value: "soc_range", label: "Battery Level (%) & Rated Range (km / mi)" },
        { value: "target_status", label: "Charge Target Limit (%) & Time to Full" },
        { value: "session_energy", label: "Current Session Added Energy (kWh)" }
      ] } } },
      { name: "ev_secondary_view", label: "Vehicle Card: Tapped Display Mode", selector: { select: { options: [
        { value: "soc_range", label: "Battery Level (%) & Rated Range (km / mi) (Default)" },
        { value: "power_energy", label: "Live Power & Today's Energy Charged" },
        { value: "target_status", label: "Charge Target Limit (%) & Time to Full" },
        { value: "session_energy", label: "Current Session Added Energy (kWh)" }
      ] } } },
      { name: "battery_power", label: "Home Battery Power Flow (kW)", selector: { entity: { domain: ["sensor"] } } },
      { name: "battery_positive_charging", label: "Positive values mean Charging (+)", selector: { boolean: {} } },
      { name: "battery_soc", label: "Battery Charge Level (%)", selector: { entity: { domain: ["sensor"] } } },
      { name: "battery_daily_charge", label: "Today's Battery Charge", selector: { entity: { domain: ["sensor"] } } },
      { name: "battery_daily_discharge", label: "Today's Battery Discharge", selector: { entity: { domain: ["sensor"] } } },
      { name: "battery_temp", label: "Home Battery Temperature Sensor (°C)", selector: { entity: { domain: ["sensor"] } } },
      { name: "battery_soh", label: "Home Battery Health Sensor (SoH %)", selector: { entity: { domain: ["sensor"] } } },
      { name: "ev_power", label: "EV Charging Power", selector: { entity: { domain: ["sensor"] } } },
      { name: "ev_charging", label: "EV Charging Active Status (Binary Sensor)", selector: { entity: { domain: ["binary_sensor"] } } },
      { name: "ev_daily_energy", label: "Today's EV Energy Charged (kWh)", selector: { entity: { domain: ["sensor"] } } }
    ];
  }

  _getLabelsSchema() {
    return [
      { name: "lbl_solar", label: "Solar Node Title", selector: { text: {} } },
      { name: "lbl_home", label: "Home Node Title", selector: { text: {} } },
      { name: "lbl_grid_in", label: "Grid In Node Title", selector: { text: {} } },
      { name: "lbl_grid_out", label: "Grid Out Node Title", selector: { text: {} } },
      { name: "battery_name", label: "Home Battery Node Title", selector: { text: {} } },
      { name: "ev_name", label: "Electric Vehicle Node Title", selector: { text: {} } },
      { name: "lbl_autarky", label: "Scorecard Ring Title", selector: { text: {} } },
      { name: "lbl_autarky_sub", label: "Scorecard Ring Subtitle", selector: { text: {} } },
      { name: "lbl_self_consumed", label: "Row 1 Title: Self-Consumed", selector: { text: {} } },
      { name: "lbl_self_consumed_sub", label: "Row 1 Subtitle", selector: { text: {} } },
      { name: "lbl_grid_reliance", label: "Row 2 Title: Grid Reliance", selector: { text: {} } },
      { name: "lbl_grid_reliance_sub", label: "Row 2 Subtitle", selector: { text: {} } },
      { name: "lbl_exported", label: "Row 3 Title: Grid Export", selector: { text: {} } },
      { name: "lbl_exported_sub", label: "Row 3 Subtitle", selector: { text: {} } },

      { name: "lbl_solar_value", label: "Total Solar Value Title (Default: Total Solar Value)", selector: { text: {} } },
      { name: "lbl_solar_value_sub", label: "Total Solar Value Subtitle (Default: Free power used + export)", selector: { text: {} } },
      { name: "lbl_virtual_battery", label: "Virtual Battery Title (Positive, Default: Virtual Battery)", selector: { text: {} } },
      { name: "lbl_virtual_battery_sub", label: "Virtual Battery Subtitle (Positive, Default: Added to wallet)", selector: { text: {} } },
      { name: "lbl_grid_balance", label: "Virtual Battery Title (Negative, Default: Grid Balance)", selector: { text: {} } },
      { name: "lbl_grid_balance_sub", label: "Virtual Battery Subtitle (Negative, Default: Cost of grid import)", selector: { text: {} } },
      { name: "lbl_scorecard_solar_value", label: "Scorecard Row Title: Solar Value (Default: TODAY'S SOLAR VALUE)", selector: { text: {} } },
      { name: "lbl_battery_charged", label: "Battery Tapped View: Charged Label (Default: Charged Today)", selector: { text: {} } },
      { name: "lbl_battery_discharged", label: "Battery Tapped View: Discharged Label (Default: Discharged)", selector: { text: {} } },
      { name: "lbl_battery_net", label: "Battery Tapped View: Net Prefix (Default: Net)", selector: { text: {} } }
    ];
  }

  _getDisplaySchema() {
    return [
      {
        name: "financial_placement",
        label: "Solar Monetary Savings & Virtual Battery Display",
        selector: {
          select: {
            options: [
              { value: "none", label: "Disabled / Hidden (Default)" },
              { value: "bottom_ribbon", label: "Dual Bottom Ribbon (Total Solar Value + Virtual Battery)" },
              { value: "scorecard", label: "Autarky Scorecard Row (Today's Solar Value)" },
              { value: "solar_box", label: "Solar Node Badge (+0,00 €)" }
            ]
          }
        }
      },
      {
        name: "show_emojis",
        label: "Show Node & Header Emojis",
        selector: { boolean: {} }
      },
      {
        name: "show_sim_toolbar",
        label: "Show Simulation Test Bench (Clickable scenario presets at top)",
        selector: { boolean: {} }
      },
      {
        name: "show_idle_rails",
        label: "Keep flow lines visible when idle (turn off to only draw a line while it carries power)",
        selector: { boolean: {} }
      },
      {
        name: "solar_priority",
        label: "Surplus Solar Priority",
        selector: {
          select: {
            options: [
              { value: "home", label: "Home First (Standard household balance)" },
              { value: "battery", label: "Battery First (Store solar before home load)" },
              { value: "ev", label: "EV First (Solar EV charging priority)" }
            ]
          }
        }
      },
      {
        name: "font_scale",
        label: "Card Font Size Scale",
        selector: { number: { min: 0.8, max: 1.3, step: 0.05, mode: "slider" } }
      },
      {
        name: "speed_multiplier",
        label: "Overall Energy Flow Speed",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_solar_home",
        label: "Speed: Solar ➔ Home",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_solar_battery",
        label: "Speed: Solar ➔ Battery",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_solar_ev",
        label: "Speed: Solar ➔ EV",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_solar_grid",
        label: "Speed: Solar ➔ Grid Out",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_grid_home",
        label: "Speed: Grid In ➔ Home",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_grid_battery",
        label: "Speed: Grid In ➔ Battery",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_grid_ev",
        label: "Speed: Grid In ➔ EV",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_battery_home",
        label: "Speed: Battery ➔ Home",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_battery_ev",
        label: "Speed: Battery ➔ EV",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
      {
        name: "speed_battery_grid",
        label: "Speed: Battery ➔ Grid Out",
        selector: { number: { min: 0.2, max: 3.0, step: 0.1, mode: "slider" } }
      },
            {
        name: "use_ha_theme",
        label: "Match Home Assistant Theme (card background, border, corners & font follow your HA theme)",
        selector: { boolean: {} }
      },
      {
        name: "show_solar_sparkline",
        label: "Show Solar 12-Hour Generation Chart",
        selector: { boolean: {} }
      },
      

      {
        name: "power_unit",
        label: "Power Units Display",
        selector: {
          select: {
            options: [
              { value: "", label: "Auto-detect (from sensor unit)" },
              { value: "W", label: "Force Watts (W)" },
              { value: "kW", label: "Force Kilowatts (kW)" },
              { value: "MW", label: "Force Megawatts (MW)" }
            ]
          }
        }
      },
      {
        name: "min_flow_threshold_w",
        label: "Minimum Moving Flow Cutoff (Watts) - stops animation when power is below this value (Default: 2 W)",
        selector: { number: { min: 0, max: 50, step: 1, mode: "box" } }
      },
      {
        name: "max_expected_power_kw",
        label: "Max System Peak Benchmark (kW) - calibrates animation flow speed (Default: 7.5 kW)",
        selector: { number: { min: 2, max: 100, step: 0.5, mode: "box" } }
      }
    ];
  }
}

class AresEnergyFlowCardEditor extends AresEnergyFlowCardDevEditor {}
class HaEnergyFlowCardEditor extends AresEnergyFlowCardDevEditor {}

// Same split as the cards: each build registers only the editor tag it can actually serve.
const EDITOR_TAGS = CARD_BUILD === 'dev'
  ? [['ares-energy-flow-card-dev-editor', AresEnergyFlowCardDevEditor]]
  : [
      ['ares-energy-flow-card-editor', AresEnergyFlowCardEditor],
      ['ha-energy-flow-card-editor', HaEnergyFlowCardEditor]
    ];

for (const [tag, cls] of EDITOR_TAGS) {
  try {
    if (!customElements.get(tag)) {
      customElements.define(tag, cls);
    }
  } catch (e) {
    console.warn('[ChromaFlow Editor] registration notice:', e);
  }
}
