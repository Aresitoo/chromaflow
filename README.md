# ⚡ ChromaFlow 2.0 — Ultra-Customizable Energy Flow & Autarky Card

<p align="center">
  <img src="assets/social_preview_1280x640.png?v=4" width="100%" alt="ChromaFlow 2.0 — Ultra-Customizable Energy Flow & Autarky Card for Home Assistant" />
</p>

An ultra-responsive, hardware-accelerated **Real-Time Energy Flow & Executive Autarky Scorecard Card** for **Home Assistant**. Unifies real-time physical power distribution curves, an executive 3-ring autarky scorecard, a full **No-YAML Visual Editor**, a **Visual Colors Studio** with dual-color gradient flow lines, Home Battery Storage (BESS) with bidirectional grid export, EV fast charging, Solcast PV solar forecast pacing, and an intelligent utility power guard into a single high-performance Lovelace card.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.x%2B-blue.svg?logo=home-assistant)
![Version](https://img.shields.io/badge/version-v2.0.0-success.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Web Animations API](https://img.shields.io/badge/Animation-Stutter--Free%20WAAPI-blueviolet.svg)
![HACS Compatible](https://img.shields.io/badge/HACS-Custom%20Repo-orange.svg)
[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/aresitoo)

<p align="center">
  <a href="#-visual-editor--color-studio">Visual Editor & Colors</a> •
  <a href="#-live-animated-preview">Live Preview</a> •
  <a href="#%EF%B8%8F-operational-states--gallery">Gallery</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-quick-start-installation">Installation</a> •
  <a href="#%EF%B8%8F-complete-configuration-options">Configuration</a> •
  <a href="#-community-credits--special-thanks">Credits</a> •
  <a href="https://github.com/Aresitoo/ha-energy-flow-card/discussions">Discussions</a>
</p>

---

## 🎨 Visual Editor & Color Studio

ChromaFlow 2.0 is built from the ground up for Home Assistant's native Lovelace UI — **zero YAML editing is required**, while offering unmatched visual depth:

| 🎨 Visual Colors Studio (Dual Gradients & Element Isolation) | 🛠️ Full No-YAML Card Editor (Dropdown Sensor Pickers) |
| :---: | :---: |
| <img src="assets/chromaflow_color_studio.png?v=1" width="100%" alt="ChromaFlow Visual Colors Studio" /> | <img src="assets/chromaflow_visual_editor.png?v=1" width="100%" alt="ChromaFlow No-YAML Visual Editor" /> |
| **Complete Color Freedom**<br>Native HTML5 color wheels with support for Hex, RGBA, and CSS names. Dual-color Start & End pickers per flow path let you create vibrant two-tone gradients or bold solid lines. 100% sovereign element isolation means changing a power number or flow line never bleeds into titles or badges! | **Effortless Configuration**<br>Organized into 6 clean, plain-English expansion panels (`☀️ Solar Panels`, `⚡ Utility Grid & Power Limit`, `🔋 Home Battery or 🚗 Electric Vehicle`, etc.) with automatic entity discovery, live preview updating, and instant interactive feedback. |

---

## 📸 Live Animated Preview

<p align="center">
  <img src="assets/energy_flow_live.webp?v=3" width="85%" alt="ChromaFlow 2.0 Real-Time Energy Flow & Autarky Scorecard Live Animation" />
</p>

---

## 🖼️ Operational States & Gallery

### 🔋 Home Battery Storage (BESS) Mode
| 🔋 Battery Discharging to Home | ⚡ Solar Charging Battery |
| :---: | :---: |
| <img src="assets/bess_discharging_view.png?v=1" width="100%" alt="BESS Battery Discharging to Home" /> | <img src="assets/bess_charging_view.png?v=1" width="100%" alt="Solar Charging Home Battery" /> |
| **`device_type: battery` (Discharging)**<br>Animated cyan pulse stream directly into Home (`flow-battery-home`). Home dynamically badges as **`100% BESS`** or **`SOLAR + BESS`** with a real-time SoC progress bar. | **`device_type: battery` (Charging)**<br>Excess solar routed into storage with pulsating purple stream, live charge rate, stored kWh, and active SoC charging status (e.g. `85% CHG`). |

### ☀️ Themes & EV Operational States
| ☀️ Solar Harmonized (Default) | 🏃 Fitness Activity Theme | 🚗 Tesla Active Charging | 🌙 Nighttime Grid Mode |
| :---: | :---: | :---: | :---: |
| <img src="assets/energy_flow_card.png?v=3" width="100%" alt="Solar Harmonized Theme" /> | <img src="assets/fitness_palette_view.png?v=1" width="100%" alt="Fitness Activity Theme" /> | <img src="assets/tesla_charging_view.png?v=1" width="100%" alt="Tesla Active Charging State" /> | <img src="assets/bess_discharging_view.png?v=1" width="100%" alt="Nighttime Grid Reliance State" /> |
| Iconic high-contrast palette matching professional solar monitoring hardware. | Apple Fitness activity rings aesthetic with neon pink, acid green & electric cyan. | High-power charging stream with live kW, daily kWh charged, and state badge. | Midnight utility import mode with clear grid dependency telemetry. |

---

## 🌟 Key Features

- **🎨 100% Independent Visual Colors Studio**:
  - Every single element on the card has its own dedicated color setting: Power numbers (`kW`), Daily energy (`kWh`), Node titles, Icons, Badges, Progress bars, Borders, and Background tints.
  - Changing one element never cascades into or recolors another.
- **🌈 Dual-Color Start/End Flow Gradients**:
  - Each of the 7 flow paths has independent **Start Color (Source)** and **End Color (Destination)** pickers.
  - Create seamless, glowing two-tone gradients (e.g., Solar Yellow $\to$ Home Cyan, or Custom Magenta $\to$ Electric Blue), or set both to the same color for solid streams.
- **⚡ Restored Logarithmic Velocity Physics**:
  - True dynamic speed contrast based on real-world energy distribution physics:
    - **Low draw (Home $\approx 250\text{ W}$)**: drifts calmly at $\approx 1.75\text{s}$ duration.
    - **Moderate flow (Grid Out $\approx 1.38\text{ kW}$)**: flows at $\approx 1.25\text{s}$ duration.
    - **High load (Tesla $\approx 3.5\text{ kW}$)**: zips swiftly at $\approx 0.73\text{s}$ duration ($>2.4\times$ faster!).
  - Master speed multiplier scales all lines together, plus **individual speed sliders** ($0.2\times$ to $3.0\times$) for complete manual authority.
- **🔋 Bidirectional Home Battery Storage & Grid Export**:
  - Full support for Home Battery Storage (`device_type: battery`).
  - Displays solar charging, home discharging, and surplus **Battery-to-Grid export** with live animated flows.
- **🛠️ Zero-YAML Visual Editor**:
  - Native Home Assistant card editor with searchable entity dropdowns, live preview, and instant auto-fill for Shelly, Solcast, Enphase, APsystems, and Tesla sensors.
- **☀️ Solcast PV Forecast Pacing**:
  - Real-time comparison against Solcast daily predictions with visual progress bar, remaining forecast badge, and pacing scorecard ring.
  - Toggle on/off with a single click while preserving card geometry and upward sweeping S-curves.
- **🛡️ Intelligent Contracted Power Guard**:
  - Monitored utility grid limit with percentage warning slider ($50\%\dots 100\%$) that illuminates an amber warning badge when approaching breaker tripping capacity.
- **📏 Responsive Typography Scale Multiplier**:
  - Custom font scaling slider ($0.8\times$ to $1.3\times$) to match any tablet, wall dashboard, or mobile screen.

---

## 🚀 Quick Start Installation

### Method 1: HACS Custom Repository (Recommended)

1. Open **HACS** in your Home Assistant sidebar.
2. Click the three dots in the top right corner and select **Custom repositories**.
3. Paste the repository URL:
   ```text
   https://github.com/Aresitoo/ha-energy-flow-card
   ```
4. Set the category to **Dashboard / Lovelace** and click **Add**.
5. Find **ChromaFlow — Energy Flow & Autarky Card**, click **Download**, and restart or reload your dashboard.

### Method 2: Manual Installation

1. Download [`ares-energy-flow-card.js`](https://raw.githubusercontent.com/Aresitoo/ha-energy-flow-card/main/ares-energy-flow-card.js) from the latest release.
2. Copy the file into your Home Assistant `<config>/www/` directory.
3. Add the resource reference in **Settings $\to$ Dashboards $\to$ Three dots $\to$ Resources**:
   - **URL**: `/local/ares-energy-flow-card.js?v=2.0.0`
   - **Resource Type**: `JavaScript Module`

---

## 🛠️ Complete Configuration Options

You can configure ChromaFlow entirely through the **Home Assistant Visual Editor**, or edit the YAML directly for advanced setups:

```yaml
type: custom:ha-energy-flow-card
device_type: ev # or 'battery' for home storage (BESS)
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

# Optional: Granular Color Overrides (Hex, RGBA, or CSS Named Colors)
colors:
  flow_solar_home_start: "#ffd54f"
  flow_solar_home_end: "#00e5ff"
  flow_solar_tesla_start: "#ffd54f"
  flow_solar_tesla_end: "#b388ff"
  pwr_solar: "#ffffff"
  kwh_solar: "rgba(255, 255, 255, 0.6)"
  title_solar: "#ffd54f"

# Optional: Granular Line Speed Overrides (Multiplier 0.2x to 3.0x)
line_speeds:
  solar_home: 1.0
  solar_tesla: 1.2
  solar_grid: 1.0
```

---

## 🙏 Community Credits & Special Thanks

ChromaFlow 2.0 represents a major community-driven milestone. Special thanks to the contributors and users on GitHub who shared feedback:

- **@Rayeliint** — for reporting the entity animation issue and inspiring the full Home Assistant Visual Editor overhaul and zero-YAML fallback system ([Issue #3](https://github.com/Aresitoo/ha-energy-flow-card/issues/3)).
- **@jameslowe1977-cyber** — for requesting bidirectional battery export flow support to track home batteries exporting surplus power back to the grid ([Issue #4](https://github.com/Aresitoo/ha-energy-flow-card/issues/4)).

---

## 💪 Support & Community

If you enjoy ChromaFlow and find it valuable for your smart home:

- ⭐ **Star the Repository**: It helps more Home Assistant users discover the card!
- 💬 **GitHub Discussions**: Share your custom color themes and setup ideas in [Discussions](https://github.com/Aresitoo/ha-energy-flow-card/discussions).
- 🐛 **Issue Tracker**: Found a bug or have a suggestion? Open an issue on [GitHub Issues](https://github.com/Aresitoo/ha-energy-flow-card/issues).
- ☕ **Buy Me a Coffee**: If you'd like to support continued development, you can [sponsor a coffee here](https://buymeacoffee.com/aresitoo)!

---

## 📄 License

This project is open-source and released under the **MIT License**.
