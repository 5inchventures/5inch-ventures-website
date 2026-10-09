#!/usr/bin/env python3
"""
Builds the 5INCH Ventures logo as standalone SVG files in public/brand/.

Text is converted to outlines (from the same Space Grotesk / JetBrains Mono fonts the site uses),
so the files render identically everywhere — no fonts needed. Geometry matches
src/components/Logo.astro (five bars + trend line + dot).

Needs fonttools + brotli (for .woff2):
  python3 -m venv .venv && .venv/bin/pip install fonttools brotli
  .venv/bin/python scripts/build-logo.py
"""
from io import BytesIO
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parents[1]
NM = ROOT / 'node_modules/@fontsource-variable'
OUT = ROOT / 'public/brand'

# ---- mark geometry (40 x 40 box), same as Logo.astro ----
BASE = 36
BAR_W = 5
BARS = [  # x, height, colour, opacity
    (3, 9, '#5B7CFF', 0.55),
    (10, 14, '#5B7CFF', 0.72),
    (17, 19, '#6F8DFF', 0.88),
    (24, 25, '#4FB8C9', 1),
    (31, 31, '#3DDC97', 1),
]
TOPS = [(x + BAR_W / 2, BASE - h - 3.2) for x, h, _, _ in BARS]

THEMES = {
    'dark': {'text': '#E8ECF5', 'sub': '#B4BCCD', 'trend': '#E8ECF5', 'five': ('#8FA6FF', '#3DDC97')},
    'light': {'text': '#0B1530', 'sub': '#3B4766', 'trend': '#0B1530', 'five': ('#3555D8', '#0A9B60')},
}


def load(path: Path, wght: float) -> TTFont:
    font = TTFont(path)
    if 'fvar' in font:
        font = instancer.instantiateVariableFont(font, {'wght': wght})
        buf = BytesIO()
        font.save(buf)
        buf.seek(0)
        font = TTFont(buf)
    return font


def text_paths(font: TTFont, text: str, size: float, x: float, baseline: float, tracking_em: float = 0.0):
    """Return ([(char, svg path d)], end_x) for `text` set at `size`, starting at x on `baseline`."""
    upm = font['head'].unitsPerEm
    scale = size / upm
    cmap = font.getBestCmap()
    gs = font.getGlyphSet()
    hmtx = font['hmtx']
    out = []
    pen_x = x
    for ch in text:
        name = cmap[ord(ch)]
        svg = SVGPathPen(gs)
        # font units (y up) -> svg (y down), scaled and placed
        gs[name].draw(TransformPen(svg, (scale, 0, 0, -scale, pen_x, baseline)))
        out.append((ch, svg.getCommands()))
        pen_x += hmtx[name][0] * scale + tracking_em * size
    return out, pen_x - tracking_em * size


def cap_height(font: TTFont, size: float) -> float:
    os2 = font['OS/2']
    cap = getattr(os2, 'sCapHeight', 0) or font['head'].unitsPerEm * 0.7
    return cap * size / font['head'].unitsPerEm


def mark_svg(trend: str, uid: str) -> str:
    bars = '\n'.join(
        f'    <rect x="{x}" y="{BASE - h}" width="{BAR_W}" height="{h}" rx="2.5" fill="{c}"'
        + (f' fill-opacity="{o}"' if o < 1 else '')
        + ' />'
        for x, h, c, o in BARS
    )
    pts = ' L'.join(f'{x:g} {y:g}' for x, y in TOPS)
    ex, ey = TOPS[-1]
    return (
        f'  <g id="mark-{uid}">\n{bars}\n'
        f'    <path d="M{pts}" fill="none" stroke="{trend}" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />\n'
        f'    <circle cx="{ex:g}" cy="{ey:g}" r="2.3" fill="#3DDC97" />\n'
        '  </g>'
    )


def build():
    OUT.mkdir(parents=True, exist_ok=True)
    grotesk = load(NM / 'space-grotesk/files/space-grotesk-latin-wght-normal.woff2', 700)
    mono = load(NM / 'jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2', 500)

    # Same proportions as the site logo at size s = 40: name 0.58s, sub 0.26s, gap 0.26s.
    s = 40
    name_size, sub_size, gap = 0.58 * s, 0.26 * s, 0.26 * s
    text_x = 40 + gap
    cap_name = cap_height(grotesk, name_size)
    cap_sub = cap_height(mono, sub_size)
    between = 6.2
    block = cap_name + between + cap_sub
    top = 19 - block / 2  # centre the text block on the bars' visual centre
    name_base = top + cap_name
    sub_base = name_base + between + cap_sub

    name_glyphs, name_end = text_paths(grotesk, '5INCH', name_size, text_x, name_base, tracking_em=-0.02)
    sub_glyphs, sub_end = text_paths(mono, 'VENTURES', sub_size, text_x + 0.4, sub_base, tracking_em=0.32)
    width = max(name_end, sub_end) + 2

    for theme, c in THEMES.items():
        g1, g2 = c['five']
        five_d = name_glyphs[0][1]
        rest_d = ' '.join(d for _, d in name_glyphs[1:])
        sub_d = ' '.join(d for _, d in sub_glyphs)
        svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width:.1f} 40" width="{width * 4:.0f}" height="160" role="img" aria-labelledby="t">
  <title id="t">5INCH Ventures</title>
  <defs>
    <linearGradient id="five" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="{g1}" />
      <stop offset="1" stop-color="{g2}" />
    </linearGradient>
  </defs>
{mark_svg(c['trend'], theme)}
  <path d="{five_d}" fill="url(#five)" />
  <path d="{rest_d}" fill="{c['text']}" />
  <path d="{sub_d}" fill="{c['sub']}" />
</svg>
'''
        (OUT / f'5inch-logo-{theme}.svg').write_text(svg)

        mark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -1 40 40" width="160" height="160" role="img" aria-labelledby="t">
  <title id="t">5INCH Ventures</title>
{mark_svg(c['trend'], theme)}
</svg>
'''
        (OUT / f'5inch-mark-{theme}.svg').write_text(mark)

    # App-icon / avatar version: mark on the dark rounded tile (same as the favicon).
    icon = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="512" height="512" role="img" aria-labelledby="t">
  <title id="t">5INCH Ventures</title>
  <rect width="64" height="64" rx="16" fill="#0B0F19" />
  <g transform="translate(10 9) scale(1.1)">
''' + mark_svg('#E8ECF5', 'icon').replace('  <g id="mark-icon">', '  <g>') + '''
  </g>
</svg>
'''
    (OUT / '5inch-app-icon.svg').write_text(icon)
    for f in sorted(OUT.glob('*.svg')):
        print(f.relative_to(ROOT), f.stat().st_size, 'bytes')


if __name__ == '__main__':
    build()
