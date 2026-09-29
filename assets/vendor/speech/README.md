# On-device speech model — self-hosted (SR-464 A2)

Everything the Sovereign session needs to turn speech into text on the
member's device is served from this origin. No member's IP address reaches a
third party during setup or during a session, and `_headers` keeps
`connect-src 'self'` (plus Supabase and Plausible) — no model host is
allowlisted.

Used by `js/saferise-sovereign-stt.js` (download, cache check) and
`js/saferise-sovereign-stt-worker.js` (runs the model). Nothing else loads
these files.

## Pins

| What | Version | Source it was copied from |
|---|---|---|
| Model | `onnx-community/moonshine-tiny-ONNX`, q8, commit `a6da1241cd305dcd64eab1edbd615f2bb9aabb95` (`a6da124`) | `https://huggingface.co/onnx-community/moonshine-tiny-ONNX/resolve/a6da124…/` |
| Runtime | `@huggingface/transformers` 3.8.1 (bundles ONNX Runtime Web JS; WASM backend, JSEP build) | `https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.8.1/dist/` |

The folder names carry the versions because `/assets/*` is served
`Cache-Control: immutable` for a year. A new version goes in a new folder, and
`CACHE` in `js/saferise-sovereign-stt.js` changes with it, so browsers
download it once and the old Cache Storage entry is deleted.

## Files (54 MB)

| Path | Bytes | SHA-256 |
|---|---:|---|
| `transformers-3.8.1/transformers.min.js` | 888,173 | `aa5002b70e789798da263f5f99c62bd3e8fcd0c119258a493c40c180648365fa` |
| `transformers-3.8.1/ort-wasm-simd-threaded.jsep.mjs` | 44,484 | `08fb86ec433c78bfb032c5d84a68b8e8e5a8d81268fa39e24314179a5767a5b9` |
| `transformers-3.8.1/ort-wasm-simd-threaded.jsep.wasm` | 21,596,019 | `c46655e8a94afc45338d4cb2b840475f88e5012d524509916e505079c00bfa39` |
| `moonshine-tiny-onnx-a6da124/config.json` | 921 | `558e1e02069137c796ace1e50c48d8fe451f04a295929138e6bea885517f0edb` |
| `moonshine-tiny-onnx-a6da124/generation_config.json` | 147 | `f9b3f711b57be7def2e50a8942f64f36ee0a55fad5b84ff93a687b6c5bcc1d44` |
| `moonshine-tiny-onnx-a6da124/preprocessor_config.json` | 128 | `fa43a7017ef85cd1d0fba0d9aae77c8adb16990ae6f11115631f41ec5d8aa679` |
| `moonshine-tiny-onnx-a6da124/tokenizer.json` | 3,761,754 | `7b913404bdd039af4756783218af4440bc07fb7d6d8258d677e34f95b3ec416f` |
| `moonshine-tiny-onnx-a6da124/tokenizer_config.json` | 135,735 | `edaee394565d428ea98a663ae7209cdcfeefc5585c42d7a570ff7c986df2cd15` |
| `moonshine-tiny-onnx-a6da124/onnx/encoder_model_quantized.onnx` | 7,937,661 | `c6fc4b7bc5af75c0591fd157a1f3829b533d18e9769a888fd95a62e470dd4f4a` |
| `moonshine-tiny-onnx-a6da124/onnx/decoder_model_merged_quantized.onnx` | 20,243,286 | `eed87831c3a6103534aae7d47a5d485025c659a1323901513961c39fe8a1a367` |

Byte-for-byte copies of the upstream files at those pins — nothing is edited.
Re-check with `shasum -a 256` from this folder.

## Licences

- Model: MIT, per the `onnx-community/moonshine-tiny-ONNX` model card (base
  model `UsefulSensors/moonshine-tiny`).
- transformers.js: Apache-2.0, per its `package.json` at 3.8.1.
- ONNX Runtime Web (bundled inside it, and the `.mjs`/`.wasm` pair): MIT.
