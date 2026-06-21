class KawaiiAudio {
  private ctx: AudioContext | null = null;

  private getCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      try {
        this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
      } catch (e) {
        console.warn("Web Audio API not supported", e);
      }
    }
    return this.ctx;
  }

  play(type: "pop" | "sparkle" | "blip" | "success") {
    const ctx = this.getCtx();
    if (!ctx) return;

    // Resume AudioContext if browser policy suspended it
    if (ctx.state === "suspended") {
      ctx.resume();
    }

    const t = ctx.currentTime;

    try {
      if (type === "pop") {
        // Cute bubble pop sound
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, t);
        osc.frequency.exponentialRampToValueAtTime(1400, t + 0.08);

        gain.gain.setValueAtTime(0.12, t);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.08);
      } else if (type === "sparkle") {
        // Kawaii sparkling chime (rapid high notes)
        const notes = [1100, 1500, 1900];
        notes.forEach((freq, idx) => {
          const noteTime = t + idx * 0.04;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, noteTime);
          
          gain.gain.setValueAtTime(0.08, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.005, noteTime + 0.12);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(noteTime);
          osc.stop(noteTime + 0.12);
        });
      } else if (type === "blip") {
        // Sweet retro game blip
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(650, t);
        osc.frequency.setValueAtTime(950, t + 0.025);

        gain.gain.setValueAtTime(0.08, t);
        gain.gain.setValueAtTime(0.08, t + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.01, t + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.05);
      } else if (type === "success") {
        // Happy C-Major cute arpeggio
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((freq, idx) => {
          const noteTime = t + idx * 0.07;
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          
          osc.type = "sine";
          osc.frequency.setValueAtTime(freq, noteTime);
          
          gain.gain.setValueAtTime(0.1, noteTime);
          gain.gain.exponentialRampToValueAtTime(0.005, noteTime + 0.18);

          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(noteTime);
          osc.stop(noteTime + 0.18);
        });
      }
    } catch (e) {
      console.warn("Error playing kawaii sound:", e);
    }
  }
}

export const kawaiiAudio = new KawaiiAudio();
