# Store and launcher graphics

| File | Size | Use |
|---|---|---|
| `icon-512.png` | 512×512 | Play Console app icon (upload as-is) |
| `icon-foreground-512.png` | 512×512, transparent | Adaptive icon foreground in Android Studio |
| `feature-graphic-1024x500.png` | 1024×500 | Play Console feature graphic |

**Adaptive launcher icon:** in Android Studio, right-click `res` → New → Image Asset →
Launcher Icons (Adaptive and Legacy). Foreground layer: `icon-foreground-512.png`.
Background layer: solid colour `#5B3DF5`. The foreground is already inset to the safe
zone, so nothing is clipped when Android masks it to a circle or squircle.

The mark is a sun over four ascending bars — a day being put back in order. Generated
programmatically, so it can be regenerated at any size. Palette matches the app:
`#6E4BFF` → `#5B3DF5` → `#3A21C7`.

**Still needed:** phone screenshots. See `docs/04-play-store-listing.md` for the list of
eight to capture and the sizes Play expects.
