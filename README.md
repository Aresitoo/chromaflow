# ⚡ Home Assistant Real-Time Energy Flow & Autarky Scorecard Card

An ultra-responsive, hardware-accelerated **Real-Time Energy Flow & Executive Autarky Scorecard Card** for **Home Assistant**. Unifies real-time physical power distribution curves, an executive 3-ring autarky scorecard, Home Battery Storage (BESS), EV charging, Solcast PV solar forecast pacing, and an intelligent utility contracted power guard into a single high-performance Lovelace card.

![Home Assistant](https://img.shields.io/badge/Home%20Assistant-2024.x%2B-blue.svg?logo=home-assistant)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Web Animations API](https://img.shields.io/badge/Animation-Stutter--Free%20WAAPI-blueviolet.svg)
![HACS Compatible](https://img.shields.io/badge/HACS-Custom%20Repo-orange.svg) [![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Donate-yellow.svg?logo=buy-me-a-coffee)](https://buymeacoffee.com/aresitoo)

<p align="center">
  <a href="#-live-animated-preview">Live Preview</a> •
  <a href="#%EF%B8%8F-operational-states--gallery">Gallery</a> •
  <a href="#-features">Features</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-full-configuration-reference">Configuration</a> •
  <a href="#-support--community">Support</a> •
  <a href="https://github.com/Aresitoo/ha-energy-flow-card/discussions">Discussions</a>
</p>


---

## 📸 Live Animated Preview

<p align="center">
  <img src="assets/energy_flow_live.webp?v=3" width="85%" alt="Home Assistant Real-Time Energy Flow & Autarky Scorecard Live Animation" />
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
| <img src="assets/solar_export_view.png?v=2" width="100%" alt="Solar Harmonized Palette" /> | <img src="assets/fitness_palette_view.png?v=1" width="100%" alt="Fitness Activity Palette" /> | <img src="assets/tesla_charging_view.png?v=2" width="100%" alt="Tesla EV Fast Charging" /> | <img src="assets/energy_flow_card.png?v=2" width="100%" alt="Nighttime Grid Reliance" /> |
| **`palette: solar`**<br>Classic solar green, warm coral grid, amber generation | **`palette: fitness`**<br>Apple Activity rings style: crimson red, apple lime, cyan | **EV High-Draw Load**<br>Pulsating purple charging stream + live kW | **Night Mode & Autarky**<br>Contracted power guard + executive 3-ring summary |

---

## 🌟 Key Features

1. **Executive 3-Ring Autarky Scorecard**:
   - Concentric bold SVG activity rings displaying live energy autonomy metrics:
     - 🟢 **Outer Ring (Autarky)**: Percentage of today's total household energy sourced from self-produced solar.
     - 🟡 **Middle Ring (Self-Consumption)**: Percentage of today's solar generation directly consumed on-site.
     - 🟠 **Inner Ring (Grid Export & Reliance)**: Direct visual ratio of energy sent to or drawn from the grid.
   - High-contrast typography and clear percentage readouts designed for at-a-glance visibility across mobile companion apps and wall-mounted dashboard tablets.

2. **Bidirectional Home Battery Storage (BESS)**:
   - Replaces or adapts the secondary node into a dedicated **Home Battery (BESS)** (e.g. Tesla Powerwall, Enphase, SolarEdge, BYD, Pylontech):
     - **Discharging Flow**: Animated pulse curving directly from the battery into the Home node (`flow-battery-home`), with dynamic Home badging (`100% BESS` or `SOLAR + BESS`).
     - **Solar Charging Flow**: Direct solar stream routing into the battery with live Watts and daily kWh accumulated.
     - **Sleek SoC Progress Bar**: Integrated 2px State-of-Charge progress bar with dynamic color transitions (cyan on discharge, purple on charge).

3. **Hiccup-Free Velocity Scaling (`playbackRate` Web Animations API)**:
   - Uses native browser compositor time dilation via the Web Animations API (`path.getAnimations()[0].playbackRate`) instead of re-evaluating CSS `animationDuration`.
   - Completely eliminates keyframe phase resets, micro-stutters, and timeline skips when sensor wattage jitters.

4. **Smart Contracted Utility Power Guard (ICP)**:
   - Real-time utility contract overload protection based on your contracted power limit (`contract_power_limit_kw`).
   - **Amber Warning Glow**: Activates at $85\%$ of contracted capacity to notify you before heavy appliance draw trips the circuit breaker.
   - **Flashing Crimson Overload Alarm**: Triggers at $\ge 100\%$ capacity with animated alarm glow when household draw exceeds the utility ceiling.
   - **Smart Solar Balancing**: Solar power generated during daylight adds *on top* of the contracted grid ceiling, allowing total household power to exceed the contract without tripping the breaker.

5. **Symmetrical 118px Executive Node Architecture**:
   - Perfectly balanced 118px source and consumer nodes:
     - **☀️ Solar Box**: Live generation (Watts), today's yield (kWh), dedicated remaining potential line (`remaining`), and dynamic forecast progress bar.
     - **⚡ Grid Box**: Net power flow, daily import/export accumulator, and live ICP threshold alerts.
     - **🚗 EV or 🔋 BESS Box**: Configurable consumer or battery storage node with dynamic active/idle status.
     - **🏠 Home Box**: Net household power, solar/BESS fraction percentage badge, and dynamic state styling.

6. **Optional Solcast PV Forecast Integration**:
   - Frosted gold forecast badge (e.g. `24.9 kWh EST`) and micro progress bar tracking today's actual yield against the estimated daily target.
   - **100% Optional**: If you don't use Solcast, simply set `show_solar_forecast: false` or omit the entities. The card cleanly hides the forecast badge and remaining line.

---

## 💡 How to Adapt for Your Installation

### 1. Configuring Home Battery / BESS (`device_type: battery`)
If you have a home battery storage system instead of an electric vehicle, set `device_type: battery`:

```yaml
type: custom:ares-energy-flow-card
device_type: battery          # Activates BESS mode (at card root level)
battery_name: "Powerwall"     # Custom title (e.g. "Powerwall", "BESS", "LFP Storage")
entities:
  # ... solar and grid sensors ...
  battery_power: sensor.battery_power                      # Live Watts (pos = charge, neg = discharge)
  battery_soc: sensor.battery_state_of_charge              # State of charge (0-100%)
  battery_daily_charge: sensor.battery_daily_charge_energy # Today's charged kWh
  battery_daily_discharge: sensor.battery_daily_discharge_energy # Today's discharged kWh
```

> [!TIP]
> **Zero-Fuss Auto-Detection (v1.1.0+)**:
> You don't even need to write `device_type: battery`! Simply providing `battery_power` or `battery_soc` inside your `entities:` block will automatically activate Home Battery mode!
>
> ⚠️ **Still seeing Tesla after updating?**
> Home Assistant heavily caches custom frontend cards. Perform a hard browser refresh (**Ctrl + F5** / clear Home Assistant companion app frontend cache) so your browser loads the latest version (**v1.1.4**)!

### 2. Selecting Color Palette Theme (`palette`)
The card supports two distinct aesthetic palettes:
- **`palette: solar` (Default)**: Harmonized solar dashboard colors — `#00e676` green autarky ring, `#ff7043` warm coral grid reliance, and `#ffd54f` amber solar generation.
- **`palette: fitness`**: Apple Fitness Activity Ring inspired theme — `#fa114f` crimson red solar & autarky, `#a6e22e` apple lime grid import, and `#00e5ff` electric cyan surplus export, with synchronized glowing flow lines and node accents.

```yaml
palette: fitness  # 'solar' (default) or 'fitness'
```

### 3. Setting the Contracted Power Guard (ICP)
Different countries and utility contracts specify maximum simultaneous draw (for example, $3.3\text{ kW}$, $4.2\text{ kW}$, $5.5\text{ kW}$, or $6.9\text{ kW}$ in Spain / Europe).

Configure `contract_power_limit_kw` to your utility contract limit:
```yaml
contract_power_limit_kw: 4.2  # Set to your contracted kW limit
contract_warning_pct: 0.85    # Warning amber glow threshold (default: 85%)
```
- When net grid import is below $85\%$, the card renders a clean normal border.
- Between $85\%$ and $99\%$, the Grid node glows amber with a `${pct}% ICP` badge.
- At 100% or above, the Grid node flashes crimson with an `OVERLOAD %` alarm.

### 4. Customizing the EV / Consumer Node
In default EV mode (`device_type: ev`), you can customize the label for any electric vehicle or heavy appliance (e.g., "Wallbox", "EV", "Heat Pump", "HVAC"):
```yaml
ev_name: "Wallbox"
```

### 5. Customizing System Power Envelope
The flow animation dynamically adjusts speed from leisurely idle down to high-velocity stream using logarithmic scaling. Set `max_expected_power_kw` to match your peak array size or inverter ceiling (e.g. $5.0$, $7.5$, $10.0$ kW):
```yaml
max_expected_power_kw: 7.5  # Inverter peak capacity
```

---

## 🚀 Quick Start Installation

### Method 2: Manual Installation

1. Download [`ares-energy-flow-card.js`](./ares-energy-flow-card.js) from this repository.
2. Copy `ares-energy-flow-card.js` into your Home Assistant `<config>/www/` directory (e.g. via Samba, SSH, or Studio Code Server).
3. In Home Assistant, navigate to **Settings** $\rightarrow$ **Dashboards** $\rightarrow$ **Three Dots (⋮)** in the top right $\rightarrow$ **Resources**.
4. Click **Add Resource**:
   - **URL**: `/local/ares-energy-flow-card.js`
   - **Resource Type**: `JavaScript Module`
5. Refresh your browser or companion app.

### Method 1: HACS Custom Repository (Recommended)

1. Open **HACS** in Home Assistant.
2. Click the **Three Dots (⋮)** in the top right $\rightarrow$ **Custom repositories**.
3. Paste repository URL: `https://github.com/Aresitoo/ha-energy-flow-card`
4. Category: **Dashboard** (or **Plugin / Lovelace**).
5. Click **Add**, find **Ares Energy Flow & Autarky Scorecard**, and click **Download**.

---

## 🛠️ Complete Configuration Options

Add the card to any Lovelace view:

```yaml
type: custom:ares-energy-flow-card
palette: solar              # 'solar' (default) or 'fitness'
device_type: ev             # 'ev' (default) or 'battery' (BESS)
battery_name: "BESS"        # Used when device_type is 'battery'
ev_name: "Tesla"            # Used when device_type is 'ev'
contract_power_limit_kw: 4.2
contract_warning_pct: 0.85
max_expected_power_kw: 7.5
show_solar_forecast: true
entities:
  # Solar:
  solar_power: sensor.solar_power
  solar_daily_yield: sensor.solar_daily_yield

  # Grid:
  grid_power: sensor.grid_power
  grid_daily_import: sensor.grid_daily_import_energy
  grid_daily_export: sensor.grid_daily_export_energy

  # EV Mode (when device_type: ev):
  ev_power: sensor.ev_charging_power
  ev_charging: binary_sensor.ev_charging
  ev_daily_energy: sensor.ev_daily_energy

  # Battery Mode (when device_type: battery):
  battery_power: sensor.battery_power
  battery_soc: sensor.battery_soc
  battery_daily_charge: sensor.battery_daily_charge_energy
  battery_daily_discharge: sensor.battery_daily_discharge_energy

  # Forecast (Optional):
  solcast_today: sensor.solcast_pv_forecast_forecast_today
  solcast_remaining: sensor.solcast_pv_forecast_forecast_remaining_today
```

### Configuration Reference

| Option | Type | Default | Description |
|---|---|---|---|
| `type` | string | **Required** | Must be `custom:ares-energy-flow-card` |
| `device_type` | string | `'ev'` | Secondary slot mode: `'ev'` (default) or `'battery'` (BESS) |
| `battery_name` | string | `'BESS'` | Custom title for battery storage node (e.g. `'Powerwall'`) |
| `ev_name` | string | `"Tesla"` | Custom title for electric vehicle node (e.g. `'Wallbox'`) |
| `palette` | string | `'solar'` | Theme color palette: `'solar'` (harmonized green/coral/amber) or `'fitness'` (Apple Activity ring crimson/lime/cyan) |
| `contract_power_limit_kw` | number | `4.2` | Contracted utility power limit in kW (ICP limit) |
| `contract_warning_pct` | number | `0.85` | Ratio of contracted limit at which amber warning activates ($0.85 = 85\%$) |
| `max_expected_power_kw` | number | `7.5` | System peak power envelope for velocity scaling ($7.5 = 7500\text{ W}$) |
| `min_flow_threshold_w` | number | `2` | Minimum active flow threshold in Watts below which lines go idle ($0$–$15\text{ W}$). Set higher (e.g. $8$–$15\text{ W}$) to filter nocturnal micro-inverter phantom draw. |
| `show_solar_forecast` | boolean | `true` | Display Solcast estimate badge and progress bar |
| `power_unit` | string | `'auto'` | Force power sensor unit (`'W'`, `'kW'`, `'MW'`). Automatically detected from sensor `unit_of_measurement` by default. |
| `energy_unit` | string | `'auto'` | Force energy sensor unit (`'kWh'`, `'Wh'`, `'MWh'`). Automatically detected from sensor `unit_of_measurement` by default. |
| `entities.solar_power` | string | `sensor.solar_power` | Real-time solar production in Watts |
| `entities.solar_daily_yield` | string | `sensor.solar_daily_yield` | Cumulative solar yield today in kWh |
| `entities.grid_power` | string | `sensor.grid_power` | Net grid power in Watts (positive = import, negative = export) |
| `entities.grid_daily_import` | string | `sensor.grid_daily_import_energy` | Cumulative grid energy imported today in kWh |
| `entities.grid_daily_export` | string | `sensor.grid_daily_export_energy` | Cumulative grid energy exported today in kWh |
| `entities.ev_power` | string | `sensor.ev_charging_power` | Real-time EV charger or appliance draw in Watts |
| `entities.ev_charging` | string | `binary_sensor.ev_charging` | Binary sensor indicating active charging state |
| `entities.ev_daily_energy` | string | `sensor.ev_daily_energy` | Cumulative EV charger energy today in kWh |
| `entities.battery_power` | string | `sensor.battery_power` | Real-time battery power in Watts (positive = charging, negative = discharging) |
| `entities.battery_soc` | string | `sensor.battery_soc` | Battery State-of-Charge percentage (0–100%) |
| `entities.battery_daily_charge` | string | `sensor.battery_daily_charge_energy` | Cumulative energy charged into battery today in kWh |
| `entities.battery_daily_discharge` | string | `sensor.battery_daily_discharge_energy` | Cumulative energy discharged from battery today in kWh |
| `entities.solcast_today` | string | `sensor.solcast_pv_forecast_forecast_today` | Solcast today's estimated forecast in kWh |
| `entities.solcast_remaining` | string | `sensor.solcast_pv_forecast_forecast_remaining_today` | Solcast remaining forecast today in kWh |

---

---

## 💪 Support & Community

`ha-energy-flow-card` is **100% free, open-source**, and built in spare time. If it saved you hours of YAML configuration, brought buttery-smooth 60fps animations to your dashboard, or helped optimize your household autarky, there are many ways you can support the project:

### ⭐ Star the Repository
The simplest and most impactful way to show support is to **star the repository on GitHub**. It increases visibility, motivates ongoing development, and helps more Home Assistant users discover the card!

### 💬 Community & Discussions
Have questions, want to show off your dashboard layout, or have ideas for new features? Join us in **[GitHub Discussions](https://github.com/Aresitoo/ha-energy-flow-card/discussions)**:
- **💡 [Ideas & Suggestions](https://github.com/Aresitoo/ha-energy-flow-card/discussions/categories/ideas)**: Propose new flow animations or sensor support.
- **🎨 [Show and Tell](https://github.com/Aresitoo/ha-energy-flow-card/discussions/categories/show-and-tell)**: Share screenshots of your cards and theme setups to inspire others.
- **❓ [Q&A & Help](https://github.com/Aresitoo/ha-energy-flow-card/discussions/categories/q-a)**: Get guidance from the community on configuring tricky entities.

### 🐛 Bug Reports & Feedback
Found an unexpected glitch or rendering bug? Submit a **[Bug Report](https://github.com/Aresitoo/ha-energy-flow-card/issues/new/choose)** using our structured form. Detailed reports with YAML and logs make fixing bugs fast and painless.

### ☕ Buy Me a Coffee
If you'd like to support the project financially, buying a coffee is a wonderful way to say thank you and fuel late-night testing and new features:

<p align="center">
  <a href="https://buymeacoffee.com/aresitoo" target="_blank">
    <img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-Support%20Project-FFDD00.svg?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black&labelColor=1a1a1a" alt="Buy Me a Coffee Badge">
  </a>
</p>

## 📄 License

This project is licensed under the [MIT License](LICENSE).
