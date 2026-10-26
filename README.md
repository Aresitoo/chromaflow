# ⚡ ChromaFlow

An energy flow and autarky card for Home Assistant.

<p align="center">
  <img src="assets/social_preview_1280x640.png?v=5" width="100%" alt="ChromaFlow Energy Flow and Autarky Card" />
</p>

I built ChromaFlow because I wanted a clean Home Assistant energy card that combines live animated power lines with autarky rings and a built-in visual editor so I never have to touch YAML just to change a color or pick a sensor.

It supports solar panels, grid import and export, home load, home battery storage (BESS) with bidirectional grid export, EV fast charging, and Solcast solar forecasts.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.x%2B-blue.svg?logo=home-assistant)
![Version](https://img.shields.io/badge/version-v2.0.0-success.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![HACS Compatible](https://img.shields.io/badge/HACS-Custom%20Repo-orange.svg)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/aresitoo)

<p align="center">
  <a href="#-color-studio-and-visual-editor">Colors & Editor</a> •
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
| **Custom Colors & Gradients**<br>Native color pickers supporting Hex, RGBA, and CSS names. Each flow line has independent Start and End color pickers so you can create two-tone gradients or solid colors. Color changes to one element stay isolated and won't affect other boxes. | **Visual Settings**<br>Organized into 6 collapsible panels (`☀️ Solar Panels`, `⚡ Utility Grid`, `🔋 Home Battery or 🚗 EV`, etc.) with searchable sensor dropdowns, live preview updates, and line speed adjustments. |

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
| **`device_type: battery` (Discharging)**<br>Animated stream directly into Home. The Home box displays **`100% BESS`** or **`SOLAR + BESS`** with a live state of charge progress bar. | **`device_type: battery` (Charging)**<br>Surplus solar routes into the battery with live charge rate, stored kWh, and active charge status (e.g. `85% CHG`). |

### ☀️ Themes and EV Charging
| Solar Theme (Default) | Fitness Activity Theme | EV Fast Charging | Nighttime Grid Mode |
| :---: | :---: | :---: | :---: |
| <img src="assets/energy_flow_card.png?v=3" width="100%" alt="Solar Theme" /> | <img src="assets/fitness_palette_view.png?v=1" width="100%" alt="Fitness Activity Theme" /> | <img src="assets/tesla_charging_view.png?v=1" width="100%" alt="EV Charging State" /> | <img src="assets/bess_discharging_view.png?v=1" width="100%" alt="Nighttime Grid State" /> |
| High-contrast dark theme designed for solar dashboards. | Activity rings theme inspired by fitness trackers. | Dedicated EV mode with live charging status, kW rate, and kWh session counter. | Shows utility grid reliance and peak import during night hours. |

---

## ⚡ Features

- **Live Flow Paths**: Animated SVG lines connect Solar, Grid, Home, and your Battery or EV.
- **Dynamic Line Speeds**: Low standby draws (250W) move slowly, while high loads like EV charging (3kW+) move noticeably faster.
- **Autarky Scorecard**: 3 concentric rings showing self-consumption, grid reliance, and solar export percentages.
- **Solar Priority Toggle**: Choose whether grid imports route directly to Home or to your EV / battery charger when solar production is low.
- **Bidirectional Battery Export**: Track home batteries discharging surplus energy back to the grid.
- **Solcast Forecast Pacing**: Progress bar showing today's actual solar generation compared to the Solcast daily prediction.
- **Grid Power Limit Warning**: Displays a warning badge when power consumption approaches your contracted breaker limit.
- **Responsive Layout**: Adapts cleanly across desktop cards, mobile screens, and card picker previews.
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
   - **URL**: `/local/ares-energy-flow-card.js?v=2.0.0`
   - **Resource Type**: `JavaScript Module`

---

## 🛠️ YAML Configuration

You can configure ChromaFlow entirely through the visual editor, or customize it directly in YAML:

```yaml
type: custom:ha-energy-flow-card
device_type: ev # or 'battery' for home storage (BESS)
solar_priority: middle # 'middle' (prioritize home) or 'home' (prioritize ev/battery)
contract_power_limit_kw: 4.2
contract_warning_pct: 0.85 # Alert when grid import reaches 85% of limit
max_expected_power_kw: 7.5
min_flow_threshold_w: 2
speed_multiplier: 1.0
font_scale: 1.0
show_solar_forecast: true
palette: solar # 'solar' or 'fitness'

entities:
  solar_power: sensor.solar_power
  solar_daily_yield: sensor.solar_daily_yield
  grid_power: sensor.grid_power
  grid_daily_import: sensor.grid_daily_import
  grid_daily_export: sensor.grid_daily_export
  load_power: sensor.home_power # optional
  solcast_today: sensor.solcast_pv_forecast_forecast_today # optional
  solcast_remaining: sensor.solcast_pv_forecast_forecast_remaining_today # optional
  ev_power: sensor.ev_charger_power
  ev_charging: binary_sensor.ev_charging
  ev_daily_energy: sensor.ev_charger_energy

# Optional: Custom Color Overrides (Hex, RGBA, or CSS Named Colors)
colors:
  flow_solar_home_start: "#ffd54f"
  flow_solar_home_end: "#00e5ff"
  flow_solar_tesla_start: "#ffd54f"
  flow_solar_tesla_end: "#b388ff"
  pwr_solar: "#ffffff"
  kwh_solar: "rgba(255, 255, 255, 0.6)"
  title_solar: "#ffd54f"

# Optional: Individual Line Speed Overrides (Multiplier 0.2x to 3.0x)
line_speeds:
  solar_home: 1.0
  solar_tesla: 1.2
  solar_grid: 1.0
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
