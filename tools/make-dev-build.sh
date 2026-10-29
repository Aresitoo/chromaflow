#!/usr/bin/env bash
# Build the dev-lab copy of the card from the shipped source.
#
# The two files must not claim the same custom element tag. Home Assistant loads every
# resource on every page, and whichever file registers a tag first owns it: if the
# production file also claims `ares-energy-flow-card-dev`, the dev-lab page silently runs
# production code and the dev file registers nothing (that is what happened from 2.0.0
# to 2.3.7).
#
# Prepending the flag makes the copy register only the -dev tags.
set -euo pipefail

src=${1:-ares-energy-flow-card.js}
out=${2:-ares-energy-flow-card-dev.js}

if [ ! -f "$src" ]; then
  echo "source not found: $src" >&2
  exit 1
fi

{
  echo 'const __ARES_DEV_BUILD = true;'
  cat "$src"
} > "$out"

echo "built $out from $src ($(wc -c < "$out") bytes)"
