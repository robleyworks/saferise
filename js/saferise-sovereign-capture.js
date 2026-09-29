/* ═══════════════════════════════════════════════════════════════════════
   SafeRise — js/saferise-sovereign-capture.js · SR-463 (SOV-3)
   AudioWorklet processor for the Sovereign session. It hands the main thread
   2048-sample blocks of microphone input and keeps nothing: each block's
   buffer is transferred away as soon as it is full. */
class SrSvCapture extends AudioWorkletProcessor {
  constructor() {
    super();
    this.buf = new Float32Array(2048);
    this.n = 0;
  }
  process(inputs) {
    const ch = inputs[0] && inputs[0][0];
    if (ch) {
      for (let i = 0; i < ch.length; i++) {
        this.buf[this.n++] = ch[i];
        if (this.n === this.buf.length) {
          this.port.postMessage(this.buf, [this.buf.buffer]);
          this.buf = new Float32Array(2048);
          this.n = 0;
        }
      }
    }
    return true;
  }
}
registerProcessor('sr-sv-capture', SrSvCapture);
