import { Trigram } from './types';

// true = solid line (Yang), false = broken line (Yin)
// Lines are [bottom, middle, top]

export const TRIGRAM_DATA: Trigram[] = [
  {
    id: "qian",
    name: "Cielo",
    chineseName: "乾 Qián",
    symbol: "☰",
    lines: [true, true, true],
    musicalElements: {
      scalesMelody: "Escala Gong (宮) en registro agudo. Melodías nobles, majestuosas y abiertas. Énfasis en la pureza del tono.",
      texture: "Tonos claros, resonantes, sostenidos. Armonías abiertas. Brillante, etéreo.",
      polyrhythm: "Pulso firme, majestuoso. Proporciones simples como 3:2 o un lento 7 contra 4."
    },
    superColliderIdeas: {
      concept: "Pureza, fuerza creativa, expansión. Sonidos brillantes y celestiales.",
      synthExample: "SynthDef(\\cieloTone, { |out=0, freq=440, amp=0.1, pan=0, atk=0.1, sus=1, rel=2| \n  var sig, env;\n  env = Env.perc(atk, rel, amp, -4).ar(2);\n  sig = SinOsc.ar(freq, 0, env.range(0.01, amp));\n  sig = Pan2.ar(sig, pan);\n  Out.ar(out, sig * env);\n}).add;",
      patternExample: "Pbind(\n  \\instrument, \\cieloTone,\n  \\degree, Pseq([0, 2, 4, 5, 7], inf), // Gong mode (Pentatonic major)\n  \\scale, Scale.majorPentatonic, // o Scale.gong\n  \\octave, Prand([5, 6], inf),\n  \\dur, Pseq([0.5, 0.25, 1], inf),\n  \\amp, 0.15,\n  \\atk, Pwhite(0.1, 0.5),\n  \\sus, Pwhite(0.5, 1.5),\n  \\rel, Pwhite(1.0, 3.0)\n).play;"
    }
  },
  {
    id: "kun",
    name: "Tierra",
    chineseName: "坤 Kūn",
    symbol: "☷",
    lines: [false, false, false],
    musicalElements: {
      scalesMelody: "Escala Yu (羽) en registro grave. Melodías profundas, estables y nutritivas. Movimiento lento y conectado.",
      texture: "Densa, rica, envolvente. Frecuencias subgraves. Ataques lentos, releases largos.",
      polyrhythm: "Pulso muy lento, subyacente. Capas rítmicas complejas, evolutivas."
    },
    superColliderIdeas: {
      concept: "Receptividad, nutrición, pasividad. Sonidos profundos y envolventes.",
      synthExample: "SynthDef(\\tierraDrone, { |out=0, freq=60, amp=0.2, pan=0, lfoFreq=0.1| \n  var sig, lfo;\n  lfo = SinOsc.kr(lfoFreq).range(0.8, 1.2);\n  sig = LFSaw.ar(freq * lfo, 0, amp);\n  sig = LPF.ar(sig, freq * 4);\n  sig = Pan2.ar(sig, pan);\n  Out.ar(out, sig);\n}).add;",
      patternExample: "Pbind(\n  \\instrument, \\tierraDrone,\n  \\degree, Pseq([-7, -5, -3, 0, 2], inf), // Yu mode (Pentatonic minor)\n  \\scale, Scale.minorPentatonic, // o Scale.yu\n  \\octave, Prand([2, 3], inf),\n  \\dur, Pseq([4, 8], inf),\n  \\amp, 0.2,\n  \\lfoFreq, Pwhite(0.05, 0.2)\n).play;"
    }
  },
  {
    id: "zhen",
    name: "Trueno",
    chineseName: "震 Zhèn",
    symbol: "☳",
    lines: [true, false, false], // Solid bottom
    musicalElements: {
      scalesMelody: "Escala Jue (角) con intervalos amplios y dinámicos. Melodías ascendentes y súbitas, con posibles disonancias controladas para representar el shock.",
      texture: "Ataques agudos, elementos percusivos. Sonidos crujientes, impulsivos.",
      polyrhythm: "Ritmos acentuados, síncopa. Patrones rápidos y energéticos contra un pulso estable. Ej. patrones en 5/8."
    },
    superColliderIdeas: {
      concept: "Movimiento, despertar, shock. Sonidos percusivos y energéticos.",
      synthExample: "SynthDef(\\truenoHit, { |out=0, freq=200, amp=0.3, pan=0, decay=0.1| \n  var sig, env;\n  env = Env.perc(0.001, decay, amp, -8);\n  sig = WhiteNoise.ar(1) * Blip.ar(freq, Rand(8,12));\n  sig = RLPF.ar(sig, freq*2, 0.1);\n  sig = sig * EnvGen.kr(env, doneAction:2);\n  sig = Pan2.ar(sig, pan);\n  Out.ar(out, sig);\n}).add;",
      patternExample: "Pbind(\n  \\instrument, \\truenoHit,\n  \\degree, Pxrand([0, 3, 5, 7, 10], inf), // Jue mode, more active intervals\n  \\scale, Scale.majorPentatonic, // Example, adapt for 'Jue'\n  \\octave, Prand([4, 5], inf),\n  \\dur, Pseq([0.1, 0.1, 0.05, Rest(0.2)], inf),\n  \\amp, Pwhite(0.2, 0.4),\n  \\decay, Pwhite(0.05, 0.2)\n).play;"
    }
  },
  {
    id: "xun",
    name: "Viento/Madera",
    chineseName: "巽 Xùn",
    symbol: "☴",
    lines: [true, true, false], // Broken top
    musicalElements: {
      scalesMelody: "Escala Jue (角) en registro medio-agudo. Melodías fluidas, penetrantes como el viento, con ornamentación.",
      texture: "Sonidos airosos, que respiran, susurrantes. Barridos de filtro, texturas granulares.",
      polyrhythm: "Ritmos suaves, superpuestos. Patrones en fase (phasing). Ej. dos patrones ligeramente desincronizados."
    },
    superColliderIdeas: {
      concept: "Suavidad, penetración, flexibilidad. Sonidos airosos y fluidos.",
      synthExample: "SynthDef(\\vientoFlute, { |out=0, freq=800, amp=0.1, pan=0, modFreq=5, modDepth=0.01| \n  var sig, mod;\n  mod = SinOsc.kr(modFreq).range(freq - (freq*modDepth), freq + (freq*modDepth));\n  sig = SinOsc.ar(mod, 0, amp * LFSaw.kr(0.1,0,0.2,0.8)); // Gentle breath envelope\n  sig = BPF.ar(sig, freq, 0.3);\n  sig = Pan2.ar(sig, pan);\n  Out.ar(out, sig * EnvGen.kr(Env.linen(0.2, 2, 0.3, amp), doneAction:2));\n}).add;",
      patternExample: "Pbind(\n  \\instrument, \\vientoFlute,\n  \\degree, Pseq([0, 2, 3, 5, 7, 9], inf), // Jue related, adjust as needed\n  \\scale, Scale.lydian, // Example for airy feel, or adapt Jue\n  \\octave, 6,\n  \\dur, Pseq([1, 0.5, 1.5], inf),\n  \\amp, 0.1,\n  \\modFreq, Pwhite(4.0, 7.0),\n  \\modDepth, Pwhite(0.005, 0.015)\n).play;"
    }
  },
  {
    id: "kan",
    name: "Agua",
    chineseName: "坎 Kǎn",
    symbol: "☵",
    lines: [false, true, false], // Solid middle
    musicalElements: {
      scalesMelody: "Escala Yu (羽) con énfasis en su cualidad fluida y misteriosa. Melodías cíclicas, con posibles inflexiones descendentes.",
      texture: "Fluida, reverberante. Glissandi, efectos acuosos (ej. chorus, delay).",
      polyrhythm: "Ritmos ondulantes, como olas. Rubato, tempo flexible. Sensación de 6/8 o 12/8."
    },
    superColliderIdeas: {
      concept: "Peligro, profundidad, abismo. Sonidos fluidos y misteriosos.",
      synthExample: "SynthDef(\\aguaPad, { |out=0, freq=220, amp=0.2, pan=0, delayTime=0.5, feedback=0.6| \n  var sig, dry;\n  dry = Pulse.ar(freq, LFSaw.kr(0.2).range(0.1,0.9), amp);\n  dry = RLPF.ar(dry, freq * SinOsc.kr(0.1).range(2,5), 0.2);\n  sig = CombC.ar(dry, 1.0, delayTime, feedback*0.5, amp);\n  sig = Pan2.ar(sig + dry, pan);\n  Out.ar(out, sig * EnvGen.kr(Env.linen(1,3,1,amp), doneAction:2));\n}).add;",
      patternExample: "Pbind(\n  \\instrument, \\aguaPad,\n  \\degree, Pseq([-3, 0, 2, 3, 5], inf), // Yu related, adjust\n  \\scale, Scale.aeolian, // Example, or adapt Yu\n  \\octave, Prand([3, 4], inf),\n  \\dur, Pseq([2, 3, 1], inf),\n  \\amp, 0.15,\n  \\delayTime, Pwhite(0.3, 0.8),\n  \\feedback, Pwhite(0.4, 0.7)\n).play;"
    }
  },
  {
    id: "li",
    name: "Fuego",
    chineseName: "離 Lí",
    symbol: "☲",
    lines: [true, false, true], // Broken middle
    musicalElements: {
      scalesMelody: "Escala Zhi (徵) con carácter brillante e intenso. Melodías vivaces, apasionadas y claras.",
      texture: "Aguda, radiante, parpadeante. Ataques rápidos, sonidos crepitantes. Énfasis en frecuencias altas.",
      polyrhythm: "Patrones agitados, rápidos. Ritmos staccato. Subdivisiones complejas."
    },
    superColliderIdeas: {
      concept: "Claridad, apego, brillo. Sonidos intensos y luminosos.",
      synthExample: "SynthDef(\\fuegoSpark, { |out=0, freq=1200, amp=0.1, pan=0, rq=0.05| \n  var sig, env, freqMult;\n  env = Env.perc(0.005, 0.1, amp, -6);\n  sig = Ringz.ar(Impulse.ar(0), freq, Rand(0.05,0.2)); // Crackling sound\n  \n  // Usar Select con TIRand para selección aleatoria de frecuencias\n  freqMult = Select.kr(TIRand.kr(0, 2, Impulse.kr(0)), [1, 1.5, 2]);\n  \n  sig = Resonz.ar(sig, freq * freqMult, rq) * EnvGen.kr(env, doneAction:2);\n  sig = Pan2.ar(sig, pan);\n  Out.ar(out, sig);\n}).add;",
      patternExample: "Pbind(\n  \\instrument, \\fuegoSpark,\n  \\degree, Pxrand([0, 2, 4, 7, 9], inf), // Zhi mode ideas\n  \\scale, Scale.ionian, // Example, adapt for Zhi (often major-like)\n  \\octave, Prand([5,6,7], inf),\n  \\dur, Pseq([0.05, 0.1, 0.025], inf),\n  \\amp, Pwhite(0.05, 0.15),\n  \\rq, Pwhite(0.03, 0.08)\n).play;"
    }
  },
  {
    id: "gen",
    name: "Montaña",
    chineseName: "艮 Gèn",
    symbol: "☶",
    lines: [false, false, true], // Solid top
    musicalElements: {
      scalesMelody: "Escala Gong (宫) con notas muy sostenidas y estáticas. Melodías simples, monumentales, con pausas significativas. Inmovilidad y solidez.",
      texture: "Inmóvil, densa, monumental. Drones con cambios sutiles. El silencio como elemento clave.",
      polyrhythm: "Ritmos muy lentos, casi estáticos. Duraciones largas. Énfasis en los tiempos fuertes."
    },
    superColliderIdeas: {
      concept: "Quietud, detención, solidez. Sonidos estáticos y monumentales.",
      synthExample: "SynthDef(\\montanaDrone, { |out=0, freq=80, amp=0.2, pan=0, cutoff=200| \n  var sig, env;\n	env = Env.perc(\\atk.ir(0.3), \\rel.ir(0.3),1,\\cur.ir(-5)).ar(2);\n  sig = LFSaw.ar([freq, freq*0.995, freq*1.005]); // Detuned for thickness\n  sig = RLPF.ar(sig, cutoff + SinOsc.kr(0.05).range(0, 50), 0.1);\n  sig = Splay.ar(sig, 0.8, amp, pan);\n	sig = sig * env * 0.2;\n  Out.ar(out, sig);\n}).add;",
      patternExample: "Pbind(\n  \\instrument, \\montanaDrone,\n  \\degree, Pseq([0, Rest(8), 2, Rest(8),4,7] ,inf), // Gong mode, sparse\n  \\scale, Scale.majorPentatonic, // or Scale.gong\n  \\octave, 3,\n	\\ark, 2,\n	\\rel, 5,\n  \\dur, Pseq([4, 2], inf),\n  \\amp, 0.2,\n  \\cutoff, Pwhite(150, 250)\n);"
    }
  },
  {
    id: "dui",
    name: "Lago",
    chineseName: "兌 Duì",
    symbol: "☱",
    lines: [false, true, true], // Broken bottom
    musicalElements: {
      scalesMelody: "Escala Shang (商) de forma alegre y juguetona. Melodías expresivas, con adornos y un carácter abierto. Ritmo ligero.",
      texture: "Brillante, centelleante, reflectante. Timbres ligeros, claros. Ecos y delays.",
      polyrhythm: "Ritmos vivaces, danzables. Patrones de llamada y respuesta. Grooves sincopados."
    },
    superColliderIdeas: {
      concept: "Alegría, placer, apertura. Sonidos brillantes y expresivos.",
      synthExample: "SynthDef(\\lagoPluck, { |out=0, freq=600, amp=0.15, pan=0, decay=0.5| \n  var sig;\n  sig = Pluck.ar(WhiteNoise.ar(0.8), Impulse.ar(0), 1/freq, 1/freq, decay, 0.5);\n  sig = sig * amp;\n  sig = Pan2.ar(sig, pan);\n  Out.ar(out, sig * EnvGen.kr(Env.linen(0.01, decay, 0.1, amp), doneAction:2));\n}).add;",
      patternExample: "Pbind(\n  \\instrument, \\lagoPluck,\n  \\degree, Pseq([0, 2, 4, 5, 7, 9, 11, 9, 7, 5, 4, 2], inf), // Shang-like, playful\n  \\scale, Scale.mixolydian, // Example scale (often bright), adapt for Shang\n  \\octave, Prand([5, 6], inf),\n  \\dur, Pseq([0.2, 0.1, 0.15, Prand([0.25,0.3])], inf),\n  \\amp, Pwhite(0.1, 0.2),\n  \\decay, Pwhite(0.3, 0.6)\n).play;"
    }
  }
];

// Helper to find a trigram by its line configuration
export const findTrigramByLines = (lines: [boolean, boolean, boolean]): Trigram | undefined => {
  return TRIGRAM_DATA.find(t => t.lines[0] === lines[0] && t.lines[1] === lines[1] && t.lines[2] === lines[2]);
};
