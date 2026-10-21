/**
 * Home Assistant Real-Time Energy Flow & Autarky Scorecard Card
 * High-performance, hardware-accelerated, unified flow & executive autarky dashboard with selectable palettes.
 */

class AresEnergyFlowCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._rendered = false;
    this._currentW = 0;
  }

  static getStubConfig() {
    return {
      contract_power_limit_kw: 4.2,
      contract_warning_pct: 0.85,
      max_expected_power_kw: 7.5,
      show_solar_forecast: true,
      palette: 'solar', // 'solar' (default) or 'fitness'
      ev_name: 'Tesla'
    };
  }

  setConfig(config) {
    this._config = Object.assign({
      palette: 'solar',
      contract_power_limit_kw: 4.2,
      contract_warning_pct: 0.85,
      show_solar_forecast: true,
      max_expected_power_kw: 7.5,
      ev_name: 'Tesla',
      entities: {}
    }, config);

    // Entity configuration mapping with clean standard fallbacks
    const ents = this._config.entities || {};
    this._entities = {
      solar_power: ents.solar_power || 'sensor.solar_power',
      solar_daily_yield: ents.solar_daily_yield || 'sensor.solar_daily_yield',
      grid_power: ents.grid_power || 'sensor.grid_power',
      grid_daily_import: ents.grid_daily_import || 'sensor.grid_daily_import_energy',
      grid_daily_export: ents.grid_daily_export || 'sensor.grid_daily_export_energy',
      grid_export_power: ents.grid_export_power || 'sensor.grid_export_power',
      ev_power: ents.ev_power || 'sensor.ev_charging_power',
      ev_charging: ents.ev_charging || 'binary_sensor.ev_charging',
      ev_daily_energy: ents.ev_daily_energy || 'sensor.ev_daily_energy',
      solcast_today: ents.solcast_today || 'sensor.solcast_pv_forecast_forecast_today',
      solcast_remaining: ents.solcast_remaining || 'sensor.solcast_pv_forecast_forecast_remaining_today',
    };

    if (!this._rendered) {
      this._render();
    }
    if (this._el && this._el.lblTesla) {
      this._el.lblTesla.textContent = this._config.ev_name || 'Tesla';
    }
    this._applyConfigVisibility();
  }

  _applyConfigVisibility() {
    if (!this._el) return;
    const showSolarForecast = this._config.show_solar_forecast !== false &&
      Boolean(this._entities.solcast_today || this._entities.solcast_remaining);

    if (this._el.badgeSolarForecast) {
      this._el.badgeSolarForecast.style.display = showSolarForecast ? '' : 'none';
    }
    if (this._el.barSolarForecastBox) {
      this._el.barSolarForecastBox.style.display = showSolarForecast ? '' : 'none';
    }
  }

  set hass(hass) {
    this._hass = hass;
    if (!this._rendered) {
      this._render();
    }
    this._update();
  }

  connectedCallback() {
    if (this._rendered && this._canvasArea) {
      requestAnimationFrame(() => {
        const w = this._canvasArea.clientWidth || 400;
        this._updateFlowPaths(w);
      });
    }
  }

  disconnectedCallback() {
    if (this._resizeObserver) {
      this._resizeObserver.disconnect();
      this._resizeObserver = null;
    }
  }

  getCardSize() {
    return 6;
  }

  _render() {
    this._rendered = true;
    const isFitness = (this._config && this._config.palette === 'fitness');

    // Color definitions
    const cSolar = isFitness ? '#fa114f' : '#ffd54f';
    const cAutarky = isFitness ? '#fa114f' : '#00e676';
    const cAutarkyBg = isFitness ? 'rgba(250, 17, 79, 0.15)' : 'rgba(0, 230, 118, 0.15)';
    const cGrid = isFitness ? '#a6e22e' : '#ff7043';
    const cGridBg = isFitness ? 'rgba(166, 226, 46, 0.15)' : 'rgba(255, 112, 67, 0.15)';
    const cExport = isFitness ? '#00e5ff' : '#ffd54f';
    const cExportBg = isFitness ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255, 213, 79, 0.15)';
    const cHome = '#00e5ff';
    const cTesla = '#b388ff';

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Display', Roboto, sans-serif;
        }
        ha-card {
          position: relative;
          width: 100%;
          box-sizing: border-box;
          padding: 10px 14px 14px;
          border-radius: 20px;
          overflow: hidden;
          background: linear-gradient(145deg, #11141a 0%, #1a1e26 100%);
          border: 1px solid ${isFitness ? 'rgba(250, 17, 79, 0.3)' : 'rgba(0, 230, 118, 0.25)'};
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
          isolation: isolate;
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
          height: 232px;
          background: transparent;
          border: none;
          overflow: hidden;
        }
        svg.flow-svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }
        @keyframes flowSeamless16 {
          0% {
            stroke-dashoffset: 16;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        @-webkit-keyframes flowSeamless16 {
          0% {
            stroke-dashoffset: 16;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        .flow-path {
          fill: none;
          stroke-linecap: round;
          stroke-dasharray: 6 10;
          animation: flowSeamless16 1s linear infinite;
          -webkit-animation: flowSeamless16 1s linear infinite;
        }
        .node {
          position: absolute;
          border-radius: 10px;
          padding: 6px 8px;
          box-sizing: border-box;
          transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
        .node-pwr {
          font-size: 17.5px;
          font-weight: 900;
          color: #ffffff;
          line-height: 1.1;
          margin-top: 2px;
          font-variant-numeric: tabular-nums;
        }
        .node-kwh {
          font-size: 9.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.6);
          margin-top: 1.5px;
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
                  <stop offset="0%" stop-color="${cSolar}" />
                  <stop offset="100%" stop-color="#00e5ff" />
                </linearGradient>
                <linearGradient id="flowSolarTesla" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cSolar}" />
                  <stop offset="100%" stop-color="#b388ff" />
                </linearGradient>
                <linearGradient id="flowSolarGrid" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cSolar}" />
                  <stop offset="100%" stop-color="${isFitness ? '#00e5ff' : '#00e676'}" />
                </linearGradient>
                <linearGradient id="flowGridHome" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cGrid}" />
                  <stop offset="100%" stop-color="#00e5ff" />
                </linearGradient>
                <linearGradient id="flowGridTesla" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stop-color="${cGrid}" />
                  <stop offset="100%" stop-color="#b388ff" />
                </linearGradient>
              </defs>

              <!-- Blueprint background rails -->
              <path id="rail-solar-home" d="M 130 70 C 193 70, 207 38, 270 38" fill="none" stroke="#00e5ff" stroke-width="2.2" opacity="0.15" stroke-linecap="round" />
              <path id="rail-solar-tesla" d="M 130 80 C 193 80, 207 110, 270 110" fill="none" stroke="#b388ff" stroke-width="2.2" opacity="0.15" stroke-linecap="round" />
              <path id="rail-solar-grid" d="M 130 90 C 193 90, 207 196, 270 196" fill="none" stroke="${isFitness ? '#00e5ff' : '#00e676'}" stroke-width="2.4" opacity="0.15" stroke-linecap="round" />
              <path id="rail-grid-home" d="M 130 176 C 193 176, 207 48, 270 48" fill="none" stroke="${cGrid}" stroke-width="2.2" opacity="0.15" stroke-linecap="round" />
              <path id="rail-grid-tesla" d="M 130 186 C 193 186, 207 120, 270 120" fill="none" stroke="#b388ff" stroke-width="2.0" opacity="0.12" stroke-linecap="round" />

              <!-- Active Animated Pulse Paths -->
              <path id="flow-solar-home" class="flow-path" d="M 130 70 C 193 70, 207 38, 270 38" stroke="url(#flowSolarHome)" stroke-width="3" style="filter: drop-shadow(0 0 3px rgba(0, 229, 255, 0.7)); display: none;"></path>
              <path id="flow-solar-tesla" class="flow-path" d="M 130 80 C 193 80, 207 110, 270 110" stroke="url(#flowSolarTesla)" stroke-width="3.2" style="filter: drop-shadow(0 0 3px rgba(179, 136, 255, 0.7)); display: none;"></path>
              <path id="flow-solar-grid" class="flow-path" d="M 130 90 C 193 90, 207 196, 270 196" stroke="url(#flowSolarGrid)" stroke-width="3.8" style="filter: drop-shadow(0 0 3.5px rgba(0, 230, 118, 0.75)); display: none;"></path>
              <path id="flow-grid-home" class="flow-path" d="M 130 176 C 193 176, 207 48, 270 48" stroke="url(#flowGridHome)" stroke-width="2.8" style="filter: drop-shadow(0 0 3px rgba(255, 112, 67, 0.65)); display: none;"></path>
              <path id="flow-grid-tesla" class="flow-path" d="M 130 186 C 193 186, 207 120, 270 120" stroke="url(#flowGridTesla)" stroke-width="3.0" style="filter: drop-shadow(0 0 3px rgba(179, 136, 255, 0.7)); display: none;"></path>
            </svg>

            <!-- Node 1: Solar Source -->
            <div id="node-solar" class="node" style="left: 6px; top: 44px; width: 124px; background: rgba(255, 213, 79, 0.04); border: 1.5px solid rgba(255, 213, 79, 0.3); padding: 5px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; white-space: nowrap;">
                <div style="font-size: 11px; font-weight: 800; color: ${cSolar}; display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 13px; line-height: 1;">☀️</span>
                  <span>Solar</span>
                </div>
                <span id="badge-solar-forecast" style="font-size: 7.5px; font-weight: 700; color: ${cSolar}; background: rgba(255, 213, 79, 0.12); padding: 1px 3.5px; border-radius: 4px; border: 0.5px solid rgba(255, 213, 79, 0.3);">-- kWh EST</span>
              </div>
              <div id="pwr-solar" class="node-pwr">0 W</div>
              <div id="kwh-solar" class="node-kwh">0,00 kWh today</div>
              <div id="bar-solar-forecast-box" style="width: 100%; height: 2px; border-radius: 1px; background: rgba(255, 213, 79, 0.15); margin-top: 3px; overflow: hidden;">
                <div id="bar-solar-forecast-fill" style="width: 0%; height: 100%; background: ${cSolar}; border-radius: 1px; transition: width 0.6s ease;"></div>
              </div>
            </div>

            <!-- Node 2: Utility Grid Import -->
            <div id="node-grid" class="node" style="left: 6px; bottom: 6px; width: 124px; background: rgba(255, 112, 67, 0.04); border: 1.5px solid rgba(255, 112, 67, 0.3); padding: 5px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; white-space: nowrap;">
                <div style="font-size: 11px; font-weight: 800; color: ${cGrid}; display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 12px; line-height: 1;">🏭</span>
                  <span>Grid In</span>
                </div>
                <span id="badge-grid-guard" style="font-size: 7.5px; font-weight: 800; color: ${cGrid}; background: rgba(255, 112, 67, 0.12); padding: 1px 3.5px; border-radius: 4px; border: 0.5px solid rgba(255, 112, 67, 0.3); display: none;">4.2 kW MAX</span>
              </div>
              <div id="pwr-grid" class="node-pwr">0 W</div>
              <div id="kwh-grid" class="node-kwh">0,00 kWh imported</div>
            </div>

            <!-- Node 3: Home Base Consumer -->
            <div id="node-home" class="node" style="right: 6px; top: 6px; width: 124px; background: rgba(0, 229, 255, 0.08); border: 1.5px solid #00e5ff; box-shadow: 0 0 10px rgba(0, 229, 255, 0.15); padding: 5px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; white-space: nowrap;">
                <div style="font-size: 11px; font-weight: 800; color: #00e5ff; display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 12px; line-height: 1;">🏠</span>
                  <span>Home</span>
                </div>
                <span id="badge-home" style="font-size: 7.5px; font-weight: 700; color: #00e5ff; background: rgba(0, 229, 255, 0.12); padding: 1px 3.5px; border-radius: 4px; border: 0.5px solid rgba(0, 229, 255, 0.3);">100% SOLAR</span>
              </div>
              <div id="pwr-home" class="node-pwr">0 W</div>
              <div id="kwh-home" class="node-kwh">0,00 kWh solar</div>
            </div>

            <!-- Node 4: Tesla EV Consumer -->
            <div id="node-tesla" class="node" style="right: 6px; top: 84px; width: 124px; background: rgba(179, 136, 255, 0.04); border: 1.5px solid rgba(179, 136, 255, 0.25); padding: 5px 8px;">
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 4px; white-space: nowrap;">
                <div style="font-size: 11px; font-weight: 800; color: #b388ff; display: flex; align-items: center; gap: 4px;">
                  <span style="font-size: 12px; line-height: 1;">🚗</span>
                  <span id="lbl-tesla">${this._config.ev_name || "Tesla"}</span>
                </div>
                <span id="badge-tesla" style="font-size: 7.5px; font-weight: 700; color: rgba(255, 255, 255, 0.4); background: rgba(255, 255, 255, 0.06); border: 0.5px solid rgba(255, 255, 255, 0.12); padding: 1px 3.5px; border-radius: 4px;">IDLE</span>
              </div>
              <div id="pwr-tesla" class="node-pwr">0 W</div>
              <div id="kwh-tesla" class="node-kwh">0,00 kWh charged</div>
            </div>

            <!-- Node 5: Grid Out (Export) -->
            <div id="node-export" class="node" style="right: 6px; bottom: 3px; width: 124px; background: rgba(0, 230, 118, 0.04); border: 1.5px solid ${isFitness ? 'rgba(0, 229, 255, 0.25)' : 'rgba(0, 230, 118, 0.25)'}; padding: 5px 8px;">
              <div style="font-size: 11px; font-weight: 800; color: ${isFitness ? '#00e5ff' : '#00e676'}; display: flex; align-items: center; gap: 5px; white-space: nowrap;">
                <span style="font-size: 12px; line-height: 1;">🏭</span>
                <span>Grid Out</span>
              </div>
              <div id="pwr-export" class="node-pwr">0 W</div>
              <div id="kwh-export" class="node-kwh">0,00 kWh exported</div>
            </div>
          </div>

          <!-- Divider -->
          <div style="height: 1px; background: rgba(255, 255, 255, 0.08); margin: 4px 0 2px;"></div>

          <!-- Merged Autarky Scorecard Section (Original Production Ring Architecture) -->
          <div style="display: flex; gap: 12px; align-items: center; background: rgba(255, 255, 255, 0.02); border: 1px solid rgba(255, 255, 255, 0.06); border-radius: 14px; padding: 12px 14px;">
            
            <!-- Left Concentric SVG Rings (Original Clean Production Layout) -->
            <div style="position: relative; width: 144px; height: 144px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
              <svg width="144" height="144" viewBox="0 0 144 144" style="transform: rotate(-90deg);">
                <!-- Outer Ring: Solar Self-Consumed -->
                <circle cx="72" cy="72" r="64" fill="none" stroke="${cAutarkyBg}" stroke-width="7.5" />
                <circle id="ring-autarky" cx="72" cy="72" r="64" fill="none" stroke="${cAutarky}" stroke-width="7.5" stroke-linecap="round"
                        stroke-dasharray="402.12" stroke-dashoffset="201.06" style="transition: stroke-dashoffset 0.6s ease;" />
                
                <!-- Middle Ring: Utility Grid Reliance -->
                <circle cx="72" cy="72" r="51" fill="none" stroke="${cGridBg}" stroke-width="7.5" />
                <circle id="ring-import" cx="72" cy="72" r="51" fill="none" stroke="${cGrid}" stroke-width="7.5" stroke-linecap="round"
                        stroke-dasharray="320.44" stroke-dashoffset="160.22" style="transition: stroke-dashoffset 0.6s ease;" />
                
                <!-- Inner Ring: Grid Out -->
                <circle cx="72" cy="72" r="38" fill="none" stroke="${cExportBg}" stroke-width="7.5" />
                <circle id="ring-export" cx="72" cy="72" r="38" fill="none" stroke="${cExport}" stroke-width="7.5" stroke-linecap="round"
                        stroke-dasharray="238.76" stroke-dashoffset="119.38" style="transition: stroke-dashoffset 0.6s ease;" />
              </svg>
              <div style="position: absolute; text-align: center; pointer-events: none; width: 64px;">
                <div id="autarky-center-pct" style="font-size: 22px; font-weight: 900; color: #ffffff; line-height: 1; font-variant-numeric: tabular-nums;">0%</div>
                <div style="font-size: 8.5px; font-weight: 800; color: ${cAutarky}; text-transform: uppercase; letter-spacing: 0.6px; margin-top: 3px;">AUTARKY</div>
                <div style="font-size: 7.5px; color: rgba(255, 255, 255, 0.45); line-height: 1; margin-top: 1px;">Grid-Free</div>
              </div>
            </div>

            <!-- Right 3 Rows -->
            <div style="flex: 1; display: flex; flex-direction: column; gap: 10px; min-width: 0;">
              
              <!-- Row 1: Solar Self-Consumed -->
              <div style="display: flex; flex-direction: column; gap: 2px; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span style="font-size: 10.5px; font-weight: 800; color: ${cAutarky}; letter-spacing: 0.4px; text-transform: uppercase; white-space: nowrap;">SOLAR SELF-CONSUMED</span>
                  <span id="row-autarky-pct" style="font-size: 16px; font-weight: 900; color: ${cAutarky}; line-height: 1; font-variant-numeric: tabular-nums; white-space: nowrap;">0%</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span id="row-solar-kwh" style="font-size: 15px; font-weight: 900; color: #ffffff; line-height: 1.1; font-variant-numeric: tabular-nums;">
                    0,00 <span style="font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.45);">kWh &bull; 100% Free</span>
                  </span>
                  <span style="font-size: 8.5px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.3px;">OF LOAD</span>
                </div>
                <div style="width: 100%; height: 4px; border-radius: 2px; background: ${cAutarkyBg}; overflow: hidden; margin-top: 2px;">
                  <div id="bar-solar-self-consumed" style="width: 0%; height: 100%; background: ${cAutarky}; border-radius: 2px; transition: width 0.6s ease;"></div>
                </div>
              </div>

              <!-- Row 2: Utility Grid Reliance -->
              <div style="display: flex; flex-direction: column; gap: 2px; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span style="font-size: 10.5px; font-weight: 800; color: ${cGrid}; letter-spacing: 0.4px; text-transform: uppercase; white-space: nowrap;">UTILITY GRID RELIANCE</span>
                  <span id="row-import-pct" style="font-size: 16px; font-weight: 900; color: ${cGrid}; line-height: 1; font-variant-numeric: tabular-nums; white-space: nowrap;">0%</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span id="row-import-kwh" style="font-size: 15px; font-weight: 900; color: #ffffff; line-height: 1.1; font-variant-numeric: tabular-nums;">
                    0,00 <span style="font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.45);">kWh &bull; Night/Backup</span>
                  </span>
                  <span style="font-size: 8.5px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.3px;">OF LOAD</span>
                </div>
                <div style="width: 100%; height: 4px; border-radius: 2px; background: ${cGridBg}; overflow: hidden; margin-top: 2px;">
                  <div id="bar-import" style="width: 0%; height: 100%; background: ${cGrid}; border-radius: 2px; transition: width 0.6s ease;"></div>
                </div>
              </div>

              <!-- Row 3: Exported to Grid -->
              <div style="display: flex; flex-direction: column; gap: 2px; width: 100%;">
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span style="font-size: 10.5px; font-weight: 800; color: ${cExport}; letter-spacing: 0.4px; text-transform: uppercase; white-space: nowrap;">EXPORTED TO GRID</span>
                  <span id="row-export-pct" style="font-size: 16px; font-weight: 900; color: ${cExport}; line-height: 1; font-variant-numeric: tabular-nums; white-space: nowrap;">0%</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: baseline; width: 100%;">
                  <span id="row-export-kwh" style="font-size: 15px; font-weight: 900; color: #ffffff; line-height: 1.1; font-variant-numeric: tabular-nums;">
                    0,00 <span style="font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.45);">kWh &bull; Clean Surplus</span>
                  </span>
                  <span style="font-size: 8.5px; font-weight: 700; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.3px;">OF SOLAR</span>
                </div>
                <div style="width: 100%; height: 4px; border-radius: 2px; background: ${cExportBg}; overflow: hidden; margin-top: 2px;">
                  <div id="bar-export" style="width: 0%; height: 100%; background: ${cExport}; border-radius: 2px; transition: width 0.6s ease;"></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </ha-card>
    `;

    // Cache element references
    const getEl = (id) => this.shadowRoot.getElementById(id);
    this._canvasArea = this.shadowRoot.querySelector('.canvas-area');
    this._svg = getEl('flow-svg');

    this._el = {
      pwrSolar: getEl('pwr-solar'),
      kwhSolar: getEl('kwh-solar'),
      nodeSolar: getEl('node-solar'),
      badgeSolarForecast: getEl('badge-solar-forecast'),
      barSolarForecastFill: getEl('bar-solar-forecast-fill'),
      barSolarForecastBox: getEl('bar-solar-forecast-box'),

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
      lblTesla: getEl('lbl-tesla'),
      nodeTesla: getEl('node-tesla'),

      pwrExport: getEl('pwr-export'),
      kwhExport: getEl('kwh-export'),
      nodeExport: getEl('node-export'),

      railSolarHome: getEl('rail-solar-home'),
      railSolarTesla: getEl('rail-solar-tesla'),
      railSolarGrid: getEl('rail-solar-grid'),
      railGridHome: getEl('rail-grid-home'),
      railGridTesla: getEl('rail-grid-tesla'),

      flowSolarHome: getEl('flow-solar-home'),
      flowSolarTesla: getEl('flow-solar-tesla'),
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

      rowImportPct: getEl('row-import-pct'),
      rowImportKwh: getEl('row-import-kwh'),
      barImport: getEl('bar-import'),

      rowExportPct: getEl('row-export-pct'),
      rowExportKwh: getEl('row-export-kwh'),
      barExport: getEl('bar-export')
    };

    // ResizeObserver
    this._resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.round(entry.contentRect.width);
        if (w && w > 0 && w !== this._currentW) {
          this._currentW = w;
          this._updateFlowPaths(w);
        }
      }
    });
    this._resizeObserver.observe(this._canvasArea);
    this._updateFlowPaths(this._canvasArea.clientWidth || 400);
    this._applyConfigVisibility();
  }

  _updateFlowPaths(w) {
    if (!w || !this._svg) return;
    const startX = 130;
    const endX = w - 130;
    const cp1X = Math.round(startX + (endX - startX) * 0.45);
    const cp2X = Math.round(startX + (endX - startX) * 0.55);

    this._svg.setAttribute('viewBox', `0 0 ${w} 215`);

    const pSolarHome = `M ${startX} 70 C ${cp1X} 70, ${cp2X} 38, ${endX} 38`;
    const pSolarTesla = `M ${startX} 80 C ${cp1X} 80, ${cp2X} 108, ${endX} 108`;
    const pSolarGrid = `M ${startX} 90 C ${cp1X} 90, ${cp2X} 178, ${endX} 178`;
    const pGridHome = `M ${startX} 168 C ${cp1X} 168, ${cp2X} 48, ${endX} 48`;
    const pGridTesla = `M ${startX} 178 C ${cp1X} 178, ${cp2X} 118, ${endX} 118`;

    const setAttr = (el, d) => { if (el) el.setAttribute('d', d); };

    setAttr(this._el.railSolarHome, pSolarHome);
    setAttr(this._el.railSolarTesla, pSolarTesla);
    setAttr(this._el.railSolarGrid, pSolarGrid);
    setAttr(this._el.railGridHome, pGridHome);
    setAttr(this._el.railGridTesla, pGridTesla);

    setAttr(this._el.flowSolarHome, pSolarHome);
    setAttr(this._el.flowSolarTesla, pSolarTesla);
    setAttr(this._el.flowSolarGrid, pSolarGrid);
    setAttr(this._el.flowGridHome, pGridHome);
    setAttr(this._el.flowGridTesla, pGridTesla);
  }

  _update() {
    if (!this._hass || !this._el || !this._el.pwrSolar) return;
    const states = this._hass.states;
    if (!states) return;

    // Cumulative daily energies (kWh)
    const solarKwh = parseFloat(states[this._entities.solar_daily_yield]?.state) || 0.0;
    const exportKwh = parseFloat(states[this._entities.grid_daily_export]?.state) || 0.0;
    const importKwh = parseFloat(states[this._entities.grid_daily_import]?.state) || 0.0;

    // Daily EV session tracking
    let evKwh = 0.0;
    const evDailySensor = states[this._entities.ev_daily_energy];
    if (evDailySensor && !isNaN(parseFloat(evDailySensor.state))) {
      evKwh = parseFloat(evDailySensor.state);
    }
    const isCharging = states[this._entities.ev_charging]?.state === 'on';
    const liveChargeEnergy = parseFloat(states[this._entities.ev_daily_energy]?.state) || 0.0;
    if (isCharging && liveChargeEnergy > 0 && evKwh === 0) {
      evKwh = liveChargeEnergy;
    }

    // Energy distribution math
    const solarSelfConsumed = Math.max(0, solarKwh - exportKwh);
    const homeSolarKwh = Math.max(0, solarSelfConsumed - evKwh);
    const totalConsumption = solarSelfConsumed + importKwh;

    const autarkyPct = totalConsumption > 0 ? Math.min(100, (solarSelfConsumed / totalConsumption) * 100) : 0.0;
    const selfConsumedPct = solarKwh > 0 ? Math.min(100, (solarSelfConsumed / solarKwh) * 100) : 0.0;
    const exportPct = solarKwh > 0 ? Math.min(100, (exportKwh / solarKwh) * 100) : 0.0;
    const importPct = totalConsumption > 0 ? Math.min(100, (importKwh / totalConsumption) * 100) : 0.0;

    // Instantaneous powers (Watts)
    const solar_raw_w = parseFloat(states[this._entities.solar_power]?.state) || 0.0;
    const liveSolarW = Math.max(0, solar_raw_w);

    const grid_raw_w = parseFloat(states[this._entities.grid_power]?.state) || 0.0;
    const liveImportW = grid_raw_w > 0 ? grid_raw_w : 0.0;
    const liveExportW = grid_raw_w < 0 ? Math.abs(grid_raw_w) : (parseFloat(states[this._entities.grid_export_power]?.state) || 0.0);

    const liveTeslaW = parseFloat(states[this._entities.ev_power]?.state) || 0.0;
    const isTeslaActive = liveTeslaW > 15 || isCharging;

    // Real-Time physical power distribution
    const solarToGridW = (liveSolarW > 15 && liveExportW > 15) ? Math.min(liveSolarW, liveExportW) : 0.0;
    const solarAvailableOnSiteW = Math.max(0, liveSolarW - solarToGridW);
    const solarToTeslaW = isTeslaActive ? Math.min(solarAvailableOnSiteW, liveTeslaW) : 0.0;
    const solarToHomeW = Math.max(0, solarAvailableOnSiteW - solarToTeslaW);

    const gridToTeslaW = isTeslaActive ? Math.max(0, liveTeslaW - solarToTeslaW) : 0.0;
    const gridToHomeW = Math.max(0, liveImportW - gridToTeslaW);
    const liveHomeW = solarToHomeW + gridToHomeW;

    // Helpers
    const fmtKwh = (n) => (n || 0).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    const fmtPwr = (w) => {
      if (w <= 0) return '0 W';
      if (w >= 1000) return (w / 1000).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' kW';
      return Math.round(w).toLocaleString('de-DE') + ' W';
    };

    // Calculate dynamic animation durations calibrated to max expected system power
    const maxFlowW = (this._config && (this._config.max_flow_power_w || (this._config.max_expected_power_kw ? this._config.max_expected_power_kw * 1000 : null))) || 7500;
    const calcDur = (w) => {
      if (w < 15) return 0;
      const clampedW = Math.max(15, Math.min(maxFlowW, w));
      const norm = Math.log10(clampedW / 15) / Math.log10(maxW / 15);
      const dur = 4.2 - Math.pow(norm, 0.8) * (4.2 - 0.45);
      return parseFloat(dur.toFixed(2));
    };

    const durSolarHome = calcDur(solarToHomeW);
    const durSolarTesla = calcDur(solarToTeslaW);
    const durSolarGrid = calcDur(solarToGridW);
    const durGridHome = calcDur(gridToHomeW);
    const durGridTesla = calcDur(gridToTeslaW);

    // Operational badge for Home
    let homeBadgeText = 'IDLE';
    let homeBadgeColor = 'rgba(255, 255, 255, 0.4)';
    if (liveHomeW > 15) {
      if (gridToHomeW <= 15) {
        homeBadgeText = '100% SOLAR';
        homeBadgeColor = '#00e5ff';
      } else if (solarToHomeW <= 15) {
        homeBadgeText = 'GRID';
        homeBadgeColor = '#ff7043';
      } else {
        const covPct = Math.round((solarToHomeW / liveHomeW) * 100);
        homeBadgeText = covPct + '% SOLAR';
        homeBadgeColor = '#00e5ff';
      }
    }

    // Solcast PV Forecast telemetry
    const forecastToday = parseFloat(states[this._entities.solcast_today]?.state) || 0.0;
    const forecastRemaining = parseFloat(states[this._entities.solcast_remaining]?.state) || 0.0;
    const forecastPct = forecastToday > 0 ? Math.min(100, (solarKwh / forecastToday) * 100) : 0.0;

    // Apply flow text updates
    const el = this._el;
    el.pwrSolar.textContent = fmtPwr(liveSolarW);
    if (forecastRemaining > 0) {
      el.kwhSolar.textContent = `${fmtKwh(solarKwh)} kWh today \u2022 ${forecastRemaining.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} left`;
    } else {
      el.kwhSolar.textContent = `${fmtKwh(solarKwh)} kWh today`;
    }
    if (el.badgeSolarForecast) {
      if (forecastToday > 0) {
        el.badgeSolarForecast.textContent = `${forecastToday.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} kWh EST`;
        el.badgeSolarForecast.style.display = '';
      } else {
        el.badgeSolarForecast.style.display = 'none';
      }
    }
    if (el.barSolarForecastFill) {
      el.barSolarForecastFill.style.width = `${Math.min(100, forecastPct)}%`;
    }
    el.nodeSolar.style.background = liveSolarW > 15 ? 'rgba(255, 213, 79, 0.12)' : 'rgba(255, 213, 79, 0.04)';
    el.nodeSolar.style.borderColor = liveSolarW > 15 ? '#ffd54f' : 'rgba(255, 213, 79, 0.3)';
    el.nodeSolar.style.boxShadow = liveSolarW > 15 ? '0 0 12px rgba(255, 213, 79, 0.25)' : 'none';

    el.pwrGrid.textContent = fmtPwr(liveImportW);
    el.kwhGrid.textContent = `${fmtKwh(importKwh)} kWh imported`;

    // Smart Contracted Power Guard (dynamic utility ICP threshold)
    const contractedLimitW = (this._config && (this._config.contracted_power_w || (this._config.contract_power_limit_kw ? this._config.contract_power_limit_kw * 1000 : null))) || 4200;
    const warningLimitW = contractedLimitW * (parseFloat(this._config?.contract_warning_pct) || 0.85);
    const icpPct = Math.round((liveImportW / contractedLimitW) * 100);

    if (liveImportW >= contractedLimitW) {
      if (el.badgeGridGuard) {
        el.badgeGridGuard.style.display = '';
        el.badgeGridGuard.textContent = `OVERLOAD ${icpPct}%`;
        el.badgeGridGuard.style.color = '#ff1744';
        el.badgeGridGuard.style.background = 'rgba(255, 23, 68, 0.2)';
        el.badgeGridGuard.style.borderColor = '#ff1744';
      }
      el.nodeGrid.style.background = 'rgba(255, 23, 68, 0.18)';
      el.nodeGrid.style.borderColor = '#ff1744';
      el.nodeGrid.style.boxShadow = '0 0 16px rgba(255, 23, 68, 0.55)';
    } else if (liveImportW >= warningLimitW) {
      if (el.badgeGridGuard) {
        el.badgeGridGuard.style.display = '';
        el.badgeGridGuard.textContent = `${icpPct}% ICP`;
        el.badgeGridGuard.style.color = '#ffb300';
        el.badgeGridGuard.style.background = 'rgba(255, 179, 0, 0.18)';
        el.badgeGridGuard.style.borderColor = '#ffb300';
      }
      el.nodeGrid.style.background = 'rgba(255, 179, 0, 0.12)';
      el.nodeGrid.style.borderColor = '#ffb300';
      el.nodeGrid.style.boxShadow = '0 0 12px rgba(255, 179, 0, 0.4)';
    } else {
      if (el.badgeGridGuard) el.badgeGridGuard.style.display = 'none';
      el.nodeGrid.style.background = liveImportW > 15 ? 'rgba(255, 112, 67, 0.12)' : 'rgba(255, 112, 67, 0.04)';
      el.nodeGrid.style.borderColor = liveImportW > 15 ? '#ff7043' : 'rgba(255, 112, 67, 0.3)';
      el.nodeGrid.style.boxShadow = liveImportW > 15 ? '0 0 12px rgba(255, 112, 67, 0.25)' : 'none';
    }

    el.pwrHome.textContent = fmtPwr(liveHomeW);
    el.kwhHome.textContent = `${fmtKwh(homeSolarKwh)} kWh solar`;
    el.badgeHome.textContent = homeBadgeText;
    el.badgeHome.style.color = homeBadgeColor;
    if (homeBadgeText === 'GRID') {
      el.badgeHome.style.background = 'rgba(255, 112, 67, 0.15)';
      el.badgeHome.style.borderColor = 'rgba(255, 112, 67, 0.4)';
      el.nodeHome.style.borderColor = 'rgba(255, 112, 67, 0.45)';
      el.nodeHome.style.boxShadow = '0 0 10px rgba(255, 112, 67, 0.2)';
    } else if (homeBadgeText.includes('SOLAR')) {
      el.badgeHome.style.background = 'rgba(0, 229, 255, 0.12)';
      el.badgeHome.style.borderColor = 'rgba(0, 229, 255, 0.3)';
      el.nodeHome.style.borderColor = '#00e5ff';
      el.nodeHome.style.boxShadow = '0 0 10px rgba(0, 229, 255, 0.15)';
    } else {
      el.badgeHome.style.background = 'rgba(255, 255, 255, 0.06)';
      el.badgeHome.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      el.nodeHome.style.borderColor = 'rgba(255, 255, 255, 0.2)';
      el.nodeHome.style.boxShadow = 'none';
    }

    el.pwrTesla.textContent = isTeslaActive ? fmtPwr(liveTeslaW) : '0 W';
    el.kwhTesla.textContent = `${fmtKwh(evKwh)} kWh charged`;
    el.badgeTesla.textContent = isTeslaActive ? 'CHARGING' : 'IDLE';
    el.badgeTesla.style.color = isTeslaActive ? '#b388ff' : 'rgba(255, 255, 255, 0.4)';
    el.badgeTesla.style.background = isTeslaActive ? 'rgba(179, 136, 255, 0.15)' : 'rgba(255, 255, 255, 0.06)';
    el.badgeTesla.style.borderColor = isTeslaActive ? 'rgba(179, 136, 255, 0.4)' : 'rgba(255, 255, 255, 0.12)';
    el.nodeTesla.style.background = isTeslaActive ? 'rgba(179, 136, 255, 0.14)' : 'rgba(179, 136, 255, 0.04)';
    el.nodeTesla.style.borderColor = isTeslaActive ? '#b388ff' : 'rgba(179, 136, 255, 0.25)';
    el.nodeTesla.style.boxShadow = isTeslaActive ? '0 0 12px rgba(179, 136, 255, 0.35)' : 'none';

    el.pwrExport.textContent = fmtPwr(liveExportW);
    el.kwhExport.textContent = `${fmtKwh(exportKwh)} kWh exported`;
    el.nodeExport.style.background = liveExportW > 15 ? 'rgba(0, 230, 118, 0.12)' : 'rgba(0, 230, 118, 0.04)';
    el.nodeExport.style.borderColor = liveExportW > 15 ? '#00e676' : 'rgba(0, 230, 118, 0.25)';
    el.nodeExport.style.boxShadow = liveExportW > 15 ? '0 0 12px rgba(0, 230, 118, 0.25)' : 'none';

    // Apply original production autarky scorecard math
    const c1 = 402.12; // 2 * PI * 64
    const c2 = 320.44; // 2 * PI * 51
    const c3 = 238.76; // 2 * PI * 38

    const off1 = c1 - (c1 * (autarkyPct / 100));
    const off2 = c2 - (c2 * (importPct / 100));
    const off3 = c3 - (c3 * (exportPct / 100));

    el.ringAutarky.style.strokeDashoffset = off1;
    el.ringImport.style.strokeDashoffset = off2;
    el.ringExport.style.strokeDashoffset = off3;

    el.autarkyCenterPct.textContent = `${Math.round(autarkyPct)}%`;

    // Row 1: Solar Self-Consumed
    el.rowAutarkyPct.textContent = `${Math.round(autarkyPct)}%`;
    el.rowSolarKwh.innerHTML = `${fmtKwh(solarSelfConsumed)} <span style="font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.45);">kWh &bull; 100% Free</span>`;
    el.barSolarSelfConsumed.style.width = `${autarkyPct}%`;

    // Row 2: Utility Grid Reliance
    el.rowImportPct.textContent = `${Math.round(importPct)}%`;
    el.rowImportKwh.innerHTML = `${fmtKwh(importKwh)} <span style="font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.45);">kWh &bull; Night/Backup</span>`;
    el.barImport.style.width = `${importPct}%`;

    // Row 3: Exported to Grid
    el.rowExportPct.textContent = `${Math.round(exportPct)}%`;
    el.rowExportKwh.innerHTML = `${fmtKwh(exportKwh)} <span style="font-size: 10px; font-weight: 600; color: rgba(255,255,255,0.45);">kWh &bull; Clean Surplus</span>`;
    el.barExport.style.width = `${exportPct}%`;

    // Dynamic animation speeds (GPU accelerated, continuous scaling, zero jumps via Web Animations API)
    const updatePath = (path, dur) => {
      if (!path) return;
      if (dur > 0) {
        if (path.style.display === 'none') path.style.display = '';
        const targetRate = parseFloat((1.0 / dur).toFixed(3));

        const anims = (typeof path.getAnimations === 'function') ? path.getAnimations() : [];
        if (anims && anims.length > 0) {
          anims[0].playbackRate = targetRate;
        } else {
          const currentDur = parseFloat(path.dataset.currentDur || '0');
          if (Math.abs(dur - currentDur) > 0.15 || currentDur === 0) {
            path.dataset.currentDur = dur.toString();
            const durStr = `${dur}s`;
            path.style.animationDuration = durStr;
            path.style.webkitAnimationDuration = durStr;
          }
        }
      } else {
        if (path.style.display !== 'none') {
          path.style.display = 'none';
          path.dataset.currentDur = '0';
        }
      }
    };

    updatePath(el.flowSolarHome, durSolarHome);
    updatePath(el.flowSolarTesla, durSolarTesla);
    updatePath(el.flowSolarGrid, durSolarGrid);
    updatePath(el.flowGridHome, durGridHome);
    updatePath(el.flowGridTesla, durGridTesla);
  }
}

if (!customElements.get('ares-energy-flow-card-dev')) {
  customElements.define('ares-energy-flow-card', AresEnergyFlowCard);
}

window.customCards = window.customCards || [];
const _idxDev = window.customCards.findIndex(c => c.type === 'ares-energy-flow-card');
if (_idxDev >= 0) window.customCards.splice(_idxDev, 1);
window.customCards.push({
  type: 'ares-energy-flow-card',
  name: 'AresLab Energy Flow',
  description: 'Hardware-accelerated real-time energy flow and executive autarky scorecard'
});
