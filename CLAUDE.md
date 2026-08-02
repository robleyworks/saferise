```text
==================================================
CRITICAL — PRESERVE PROTOCOL TITLES + ICONS
==================================================

Across ALL FOUR series:

- Personal Transformation
- Relationship Healing
- Professional
- Elevation

PRESERVE every ORIGINAL protocol title exactly as it currently exists in the project.

PRESERVE every ORIGINAL protocol icon and keep each icon associated with its correct protocol.

DO NOT:
- rename protocols
- rewrite protocol titles
- shorten protocol titles
- invent new protocol names
- use the example protocol names from the reference image
- replace existing icons
- redesign the icons
- remove the icons

The reference image is ONLY a reference for the grid layout, spacing, hierarchy, and overall presentation.

==================================================
PROTOCOL CARD DESCRIPTIONS
==================================================

Each card shows a short, NEW advisory-style description beneath the title — one calm,
practical sentence describing what the protocol helps the user do (not the original
trigger/symptom-list copy).

Each card should contain:

[EXISTING ORIGINAL ICON]

[EXISTING ORIGINAL PROTOCOL TITLE]

[NEW short advisory description — one sentence, track-specific, not copied between tracks]

Open Protocol →

For example, if the original data contains:

Icon
Anger Alchemy
Injustice, boundary violation, disrespect, loss of control
Open Protocol →

The card renders as:

Icon
Anger Alchemy
Turn anger into clarity, protect what matters, and choose your response.
Open Protocol →

The protocol title "Anger Alchemy" must remain unchanged.
Its existing icon must remain unchanged.
The ORIGINAL description ("Injustice, boundary violation...") is not deleted — it stays
present in the markup/data, just not rendered on the card. The visible line is new
advisory copy, added as an additional field alongside it.

IMPORTANT:
Do this by changing the card rendering, NOT by deleting the original descriptions from
the underlying protocol data. Add the new advisory copy as a separate field
(e.g. a `landingDescription`/`proto-landing-desc` value) rather than overwriting the
original description in place.

The original descriptions may be used elsewhere in the application and must remain
intact in the data source.

Do not modify:
- protocol data
- protocol descriptions stored in the data model
- protocol IDs
- slugs
- routes
- resource associations
- icons
- ordering

Only the SERIES LANDING PAGE protocol cards render the new advisory description in place
of the original description.

Apply this consistently across all four series — same structure, same description
length/tone, but track-specific content (do not reuse one track's wording on another).

The cards should feel clean, compact, and premium while preserving the existing
identity of every protocol.
```
