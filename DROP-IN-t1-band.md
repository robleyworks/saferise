# T1 journey band — drop-in

## Files
```
assets/journey/t1-band.jpg        1400 × 380   135 KB   ← spec asset, template path
assets/journey/t1-band@2x.jpg     1941 × 527   195 KB   ← native, for srcset
assets/journey/t1-band.webp       1400 × 380    59 KB
assets/journey/t1-band@2x.webp    1941 × 527    78 KB
```
sRGB, progressive, 4:4:4 chroma, EXIF stripped. Mean luminance **44.8** against `#0E0E1A`.

## Replacing the placeholder

In `rJourney()`, this line is the placeholder:

```js
ph('NEEDS ART \u00B7 assets/journey/t' + t.id + '-band.jpg \u00B7 1400\u00D7380 \u00B7 ' + art(t,'band'), '1400/380') +
```

Swap for a real figure that keeps the placeholder for tracks with no art yet:

```js
(t.bandArt
  ? '<div class="jband"><picture>' +
      '<source type="image/webp" srcset="assets/journey/t' + t.id + '-band.webp 1400w, ' +
                                        'assets/journey/t' + t.id + '-band@2x.webp 1941w" ' +
              'sizes="(max-width:1180px) 100vw, 1132px">' +
      '<img src="assets/journey/t' + t.id + '-band.jpg" ' +
           'srcset="assets/journey/t' + t.id + '-band.jpg 1400w, ' +
                   'assets/journey/t' + t.id + '-band@2x.jpg 1941w" ' +
           'sizes="(max-width:1180px) 100vw, 1132px" ' +
           'width="1400" height="380" loading="lazy" decoding="async" ' +
           'alt="' + art(t,'band') + '"></picture></div>'
  : ph('NEEDS ART \u00B7 assets/journey/t' + t.id + '-band.jpg \u00B7 1400\u00D7380 \u00B7 ' + art(t,'band'), '1400/380')) +
```

Then set `bandArt: true` on track 1 only. Tracks 2 and 3 keep showing the placeholder until their art lands.

`.jband` already carries `line-height:0` and `img{width:100%;height:auto;display:block}`, so no CSS change is needed.

## Checks before it lands
- Confirm the file sits at `assets/journey/` and not `assets/covers/`.
- Verify in browser with `naturalWidth` — 1400 on a standard display, 1941 on retina.
- The band renders at 1132 CSS px inside `.band--flush`, so the 1941 asset is 1.71×. Acceptable, not a true 2×.
