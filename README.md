# ⚡ ChromaFlow

An energy flow and autarky card for Home Assistant.

<p align="center">
  <img src="assets/social_preview_1280x640.png?v=5" width="100%" alt="ChromaFlow Energy Flow and Autarky Card" />
</p>

I built ChromaFlow because I wanted a clean Home Assistant energy card that combines live animated power lines with autarky rings and a built-in visual editor so I never have to touch YAML just to change a color or pick a sensor.

It supports solar panels, grid import and export, home load, home battery storage (BESS) with bidirectional grid export, EV fast charging, simultaneous Dual Battery + EV mode, and Solcast solar forecasts.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.x%2B-blue.svg?logo=home-assistant)
![Version](https://img.shields.io/badge/version-v2.3.8-success.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HACS Compatible](https://img.shields.io/badge/HACS-Custom%20Repo-orange.svg)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/aresitoo)

<p align="center">
  <a href="#-color-studio-and-visual-editor">Colors & Editor</a> •
  <a href="#-dual-battery--ev-mode">Dual Mode</a> •
  <a href="#-live-preview">Live Preview</a> •
  <a href="#%EF%B8%8F-examples">Examples</a> •
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Installation</a> •
  <a href="#%EF%B8%8F-yaml-configuration">Configuration</a> •
  <a href="#-credits">Credits</a>
</p>

---

## 🎨 Color Studio and Visual Editor

ChromaFlow can be configured entirely inside Home Assistant's dashboard editor without editing YAML:

| Color Studio (Two-Tone Gradients & Scoped Colors) | Visual Editor (Dropdown Sensor Pickers) |
| :---: | :---: |
| <img src="assets/chromaflow_color_studio.png?v=1" width="100%" alt="ChromaFlow Color Studio" /> | <img src="assets/chromaflow_visual_editor.png?v=1" width="100%" alt="ChromaFlow Visual Editor" /> |
| **Custom Colors & Gradients**<br>Native color pickers supporting Hex, RGBA, and CSS names. Each flow line has independent Start and End color pickers so you can create two-tone gradients or solid colors. Color changes to one element stay isolated and will not affect other boxes. | **Visual Settings**<br>Organized into 6 collapsible panels (`☀️ Solar Panels`, `⚡ Utility Grid`, `🔋 Battery & 🚗 EV`, etc.) with searchable sensor dropdowns, live preview updates, and line speed adjustments. |

---

## 🔋 Dual Battery & EV Mode

ChromaFlow v2.1.0 introduces simultaneous Dual Mode for homes with both stationary battery storage and an electric vehicle:

- **Symmetrical 6-Node Grid**:
  - Left column: Solar Panels, Home Battery (BESS), and Grid Import.
  - Right column: Home Consumption, Electric Vehicle (EV), and Grid Export.
- **Adaptive Layout**: Automatically switches between 6-node Dual Mode, 5-node Single Device Mode, or 4-node Standard Mode based on configured entities.
- **Battery Column Choice**: When only a home battery is present without an EV, you can place the battery in the Left column (under Solar) or the Right column (between Home and Grid Out).
- **Multi-Port Line Clearance**: 10 distinct energy flow lines with dedicated landing ports, preventing lines from overlapping or touching adjacent boxes.

---

## 📸 Live Preview

<p align="center">
  <img src="assets/energy_flow_live.webp?v=3" width="85%" alt="ChromaFlow Live Flow Animation" />
</p>

---

## 🖼️ Examples

### 🔋 Home Battery Storage (BESS)
| Battery Discharging to Home | Solar Charging Battery |
| :---: | :---: |
| <img src="assets/bess_discharging_view.png?v=1" width="100%" alt="Battery Discharging to Home" /> | <img src="assets/bess_charging_view.png?v=1" width="100%" alt="Solar Charging Home Battery" /> |
| **Battery Discharging**<br>Animated stream directly into Home. The Home box displays live state of charge progress bar and discharge rate. | **Battery Charging**<br>Surplus solar routes into the battery with live charge rate, stored kWh, and active charge status. |

### ☀️ Themes and EV Charging
| Solar Theme (Default) | Fitness Activity Theme | EV Fast Charging | Nighttime Grid Mode |
| :---: | :---: | :---: | :---: |
| <img src="assets/energy_flow_card.png?v=3" width="100%" alt="Solar Theme" /> | <img src="assets/fitness_palette_view.png?v=1" width="100%" alt="Fitness Activity Theme" /> | <img src="assets/tesla_charging_view.png?v=1" width="100%" alt="EV Charging State" /> | <img src="assets/bess_discharging_view.png?v=1" width="100%" alt="Nighttime Grid State" /> |
| High-contrast dark theme designed for solar dashboards. | Activity rings theme inspired by fitness trackers. | Dedicated EV mode with live charging status, kW rate, and kWh session counter. | Shows utility grid reliance and peak import during night hours. |

---

## ⚡ Features

- **10 Dynamic Flow Paths**: Animated SVG lines connect Solar, Grid, Home, Battery, and EV with zero line collisions.
- **Dual Battery + EV Simultaneous Mode**: Displays stationary home storage and EV charging side by side.
- **Dynamic Line Speeds**: Low standby draws move slowly, while high loads like EV charging move noticeably faster. Each line speed can be adjusted independently.
- **Autarky Scorecard**: 3 concentric rings showing self-consumption, grid reliance, and solar export percentages.
- **Solar Priority Toggle**: Choose whether grid imports route directly to Home or to your EV / battery charger when solar production is low.
- **Bidirectional Battery Export**: Track home batteries discharging surplus energy back to the grid.
- **Multiple Solar Sources**: Homes with two or more inverters or arrays can list each one under `solar_sources`. The Solar box keeps the combined total and adds a sub-tile per source with live power, today's yield and share of current output.
- **Solcast Forecast Pacing**: Progress bar showing today's actual solar generation compared to the Solcast daily prediction.
- **Grid Power Limit Warning**: Displays a warning badge when power consumption approaches your contracted breaker limit.
- **Responsive Layout**: Adapts cleanly across desktop cards, mobile screens, and card picker previews.
- **Match Your Home Assistant Theme**: Set `use_ha_theme: true` and the card background, border, corner radius, shadow, font and top glow follow your active HA theme, so ChromaFlow sits naturally next to your other cards. `colors.card_bg`, `colors.card_border` and `colors.card_glow` override individual parts.
- **Font Scale Slider**: Adjust text size (0.8x to 1.3x) to fit wall tablets or smaller screens.

---

## 🚀 Quick Start

> 💡 **Note:** This is a **Lovelace Dashboard Card**, not a widget for the built-in Home Assistant Energy panel.

### Step 1: Install via HACS (Custom Repository)
1. Open **HACS** in your Home Assistant sidebar.
2. Click the **3 dots** (top right) ➔ **Custom repositories**.
3. Paste the repository URL:
   ```text
   https://github.com/Aresitoo/chromaflow
   ```
4. Set the category to **Dashboard / Lovelace** and click **Add**.
5. Find **ChromaFlow**, click Download, and reload your browser (Ctrl + F5).

---

### Step 2: Add to Your Dashboard
1. Go to your dashboard.
2. Click the **3 dots** (top right) ➔ **Edit Dashboard**.
3. Click **+ Add Card**.
4. Search for **ChromaFlow**.
   *(If it does not show in search yet, scroll down to **Manual** and paste: `type: custom:ha-energy-flow-card`)*.
5. In the visual settings editor that appears:
   - Select your **Solar Power** sensor.
   - Select your **Grid Import/Export** sensor.
   - Select your **Home Consumption** sensor.
   - *(Optional)* Pick your EV or Battery sensors.
6. Click **Save**.

---

### Manual Installation
1. Download `ares-energy-flow-card.js` from the latest release.
2. Copy the file into your Home Assistant `<config>/www/` directory.
3. Add the resource reference in **Settings ➔ Dashboards ➔ Resources**:
   - **URL**: `/local/ares-energy-flow-card.js?v=v2.3.8`
   - **Resource Type**: `JavaScript Module`

### Dev-lab build

`ares-energy-flow-card.js` and the dev-lab copy must not register the same custom element
tag, or the file Home Assistant loads first wins and the other one registers nothing. Build
the dev copy with:

```bash
tools/make-dev-build.sh ares-energy-flow-card.js ares-energy-flow-card-dev.js
```

That prepends a module-scoped `const __ARES_DEV_BUILD = true;`, so the copy registers
`ares-energy-flow-card-dev` (and its editor) only, while the shipped file registers
`ares-energy-flow-card`, `ha-energy-flow-card` and their editor. Both can be loaded on the
same page in any order. `customElements.get('ares-energy-flow-card-dev').BUILD` returns
`'dev'` on the dev build and `'prod'` on the shipped one, which is the quickest way to tell
which file a dashboard is really running.

The full two-lane workflow (sandbox deploy, promote, gates, recovery) is in
[WORKFLOW.md](WORKFLOW.md).

---

## 🛠️ YAML Configuration

You can configure ChromaFlow entirely through the visual editor, or customize it directly in YAML:

```yaml
type: custom:ha-energy-flow-card
show_battery: true
show_ev: true
battery_position: left # 'left' (under Solar) or 'right' (between Home and Grid Out)
solar_priority: home # 'home' (prioritize home consumption) or 'middle' (prioritize battery/EV)
allow_battery_to_ev: false # allow home battery to discharge into EV
contract_power_limit_kw: 4.2
contract_warning_pct: 0.85 # Alert when grid import reaches 85% of limit
max_expected_power_kw: 7.5
min_flow_threshold_w: 2
speed_multiplier: 1.0
font_scale: 1.0
show_solar_forecast: true
show_idle_rails: true # false = only draw a flow line while it carries power
palette: solar # 'solar' or 'fitness'

entities:
  # Solar
  solar_power: sensor.solar_power
  solar_daily_yield: sensor.solar_daily_yield
  solcast_today: sensor.solcast_pv_forecast_forecast_today # optional
  solcast_remaining: sensor.solcast_pv_forecast_forecast_remaining_today # optional

  # Grid
  grid_power: sensor.grid_power
  grid_daily_import: sensor.grid_daily_import
  grid_daily_export: sensor.grid_daily_export

  # Home
  load_power: sensor.home_power # optional

  # Home Battery (BESS)
  battery_power: sensor.battery_power
  battery_soc: sensor.battery_state_of_charge
  battery_daily_charge: sensor.battery_daily_charge
  battery_daily_discharge: sensor.battery_daily_discharge

  # Electric Vehicle (EV)
  ev_power: sensor.ev_charger_power
  ev_charging: binary_sensor.ev_charging
  ev_daily_energy: sensor.ev_charger_energy

# Optional: Multiple Solar Sources (2+ inverters / arrays)
# Shown as sub-tiles inside the Solar box. If entities.solar_power / solar_daily_yield
# are not set, the Solar totals are the sum of these sources.
solar_sources:
  - name: Roof North
    power: sensor.inverter_1_power # W or kW
    daily_yield: sensor.inverter_1_energy_today # optional (kWh)
  - name: Garage
    power: sensor.inverter_2_power
    daily_yield: sensor.inverter_2_energy_today
    color: "#ff9800" # optional accent for this sub-tile

# Optional: make the card background, border, corners, shadow and font follow your HA theme
use_ha_theme: true

# Optional: Custom Color Overrides (Hex, RGBA, or CSS Named Colors)
colors:
  card_bg: "rgba(22, 8, 43, 0.94)" # optional card background override
  card_border: "#3b1c66" # optional card border override
  card_glow: "rgba(255, 47, 214, 0.14)" # optional colour for the soft glow at the top of the card
  flow_solar_home_start: "#ffd54f"
  flow_solar_home_end: "#00e5ff"
  flow_solar_battery_start: "#ffd54f"
  flow_solar_battery_end: "#10b981"
  flow_solar_ev_start: "#ffd54f"
  flow_solar_ev_end: "#b388ff"
  flow_battery_home_start: "#10b981"
  flow_battery_home_end: "#00e5ff"
  pwr_solar: "#ffffff"
  title_solar: "#ffd54f"

# Optional: Individual Line Speed Overrides (Multiplier 0.2x to 3.0x)
line_speeds:
  solar_home: 1.0
  solar_battery: 1.0
  solar_ev: 1.2
  solar_grid: 1.0
  grid_home: 1.0
  grid_battery: 1.0
  grid_ev: 1.2
  battery_home: 1.0
  battery_ev: 1.2
  battery_grid: 1.0
```

---

## 🙏 Credits

Thanks to the Home Assistant community members on GitHub whose feedback helped shape this card:

- **@Rayeliint** ([Issue #3](https://github.com/Aresitoo/chromaflow/issues/3)) for reporting entity animation issues and helping test the visual editor.
- **@jameslowe1977-cyber** ([Issue #4](https://github.com/Aresitoo/chromaflow/issues/4)) for suggesting bidirectional battery export flow support.

---

## 💬 Feedback and Support

If you run into any issues or have ideas for new features:

- ⭐ **Star the Repository**: Helps other Home Assistant users find the card.
- 💬 **GitHub Discussions**: Share your setup or color combinations in [Discussions](https://github.com/Aresitoo/chromaflow/discussions).
- 🐛 **Issue Tracker**: Found a bug? Open an issue on [GitHub Issues](https://github.com/Aresitoo/chromaflow/issues).
- ☕ **Buy Me a Coffee**: If you would like to support my work, you can [sponsor a coffee here](https://buymeacoffee.com/aresitoo).

---

## 📄 License

This project is licensed under the **MIT License**.
