#!/usr/bin/env python3
"""
Synchronise .env with .env.example while preserving structure and original secrets.
"""

from pathlib import Path
from tempfile import NamedTemporaryFile

root = Path(__file__).resolve().parents[1]
env_example = root / ".env.example"
env_live    = root / ".env"

env_live.touch(exist_ok=True)

def parse_env(path):
    pairs = {}
    for line in path.read_text().splitlines():
        line_strip = line.strip()
        if line_strip and not line_strip.startswith("#") and "=" in line_strip:
            k, v = line_strip.split("=", 1)
            pairs[k.strip()] = v
    return pairs

live_pairs = parse_env(env_live)

seen = set()

tmp_file = NamedTemporaryFile("w", delete=False, dir=root, prefix=".env.tmp.")

with open(env_example, "r") as ex, tmp_file as out:
    for raw in ex.readlines():
        stripped = raw.strip()
        if stripped and not stripped.startswith("#") and "=" in stripped:
            key, _ = stripped.split("=", 1)
            key = key.strip()
            seen.add(key)
            if key in live_pairs:
                out.write(f"{key}={live_pairs[key]}\n")
            else:
                out.write(raw.rstrip("\n") + "\n")
        else:
            out.write(raw.rstrip("\n") + "\n")

    extras = [k for k in live_pairs.keys() if k not in seen]
    if extras:
        out.write("\n# ----- extra keys not in .env.example -----\n")
        for k in extras:
            out.write(f"{k}={live_pairs[k]}\n")

Path(tmp_file.name).replace(env_live)
print(".env synchronised with template.")