import type { CSSProperties, ReactNode } from "react";
import { FACE_PALETTE, FACE_PRESETS, type FaceConfig } from "../../devday/faces";
import { Crowd } from "../kit/Crowd";
import { closingCrowd } from "../kit/crowd-layout";
import { Eyebrow, SlideFace, SlideFrame } from "../kit/layouts";
import "./video-con-codex.css";

const { blue, green, orange, purple, gray, charcoal } = FACE_PALETTE;

const faces = {
  sleepy: { ...FACE_PRESETS.sleepy, color: orange, gaze: { x: 0, y: 0 } } as FaceConfig,
  curious: { ...FACE_PRESETS.curious, color: purple, gaze: { x: 0.3, y: -0.3 } } as FaceConfig,
  squeeze: { ...FACE_PRESETS.squeeze, color: blue } as FaceConfig,
  happy: { ...FACE_PRESETS.happy, color: charcoal, gaze: { x: -0.2, y: -0.4 } } as FaceConfig,
  plus: { ...FACE_PRESETS.plus, color: green, gaze: { x: 0.2, y: 0.1 } } as FaceConfig,
  spark: { ...FACE_PRESETS.spark, color: gray, rotation: 8, gaze: { x: -0.35, y: 0 } } as FaceConfig,
};

const css = (vars: Record<string, string | number>) => vars as CSSProperties;

/* ---------- Shared pieces ---------- */

type Track = "video" | "audio" | "entorno" | "contexto";
const TRACKS: { id: Track; label: string }[] = [
  { id: "video", label: "Video" },
  { id: "audio", label: "Audio" },
  { id: "entorno", label: "Entorno" },
  { id: "contexto", label: "Contexto" },
];

/** The four problems of the talk. Checked once solved. */
function Tracker({ current, solved = false }: { current: Track | "all"; solved?: boolean }) {
  const at = current === "all" ? TRACKS.length : TRACKS.findIndex((track) => track.id === current);
  return (
    <ol className="vc-tracker" aria-label="Problemas resueltos">
      {TRACKS.map((track, index) => {
        const done = index < at || (solved && index === at);
        return (
          <li key={track.id} data-done={done} data-current={index === at && current !== "all"}>
            <i aria-hidden="true" />
            {track.label}
          </li>
        );
      })}
    </ol>
  );
}

function Scene({ eyebrow, title, lead, track, solved, children, className = "" }: { eyebrow: string; title: ReactNode; lead?: ReactNode; track?: Track | "all"; solved?: boolean; children: ReactNode; className?: string }) {
  return (
    <SlideFrame className={`vc-scene ${className}`}>
      {track && <Tracker current={track} solved={solved} />}
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="dd-heading">{title}</h2>
      {lead && <p className="dd-lead vc-lead">{lead}</p>}
      <div className="vc-stage">{children}</div>
    </SlideFrame>
  );
}

function Tag({ children = "Ejemplo" }: { children?: ReactNode }) {
  return <span className="vc-tag">{children}</span>;
}

function Code({ file, children }: { file?: string; children: ReactNode }) {
  return (
    <pre className="vc-code">
      {file && <span className="vc-code-file">{file}</span>}
      {children}
    </pre>
  );
}

type Span = { a: number; b?: number; label?: string; color?: string; tone?: "hot" | "calm" | "gap" };

/** A horizontal lane where every item sits at a fraction of `total`. */
function Lane({ total, items, height = 3.2 }: { total: number; items: Span[]; height?: number }) {
  return (
    <div className="vc-lane" style={css({ "--h": `${height}cqw` })}>
      {items.map((item, index) => (
        <span
          key={index}
          className={`vc-span ${item.b === undefined ? "vc-tick" : ""} ${item.tone ? `vc-span--${item.tone}` : ""}`}
          style={css({
            left: `${(item.a / total) * 100}%`,
            ...(item.b !== undefined ? { width: `${((item.b - item.a) / total) * 100}%` } : {}),
            "--c": item.color ?? "var(--slide-fg)",
          })}
        >
          {item.label}
        </span>
      ))}
    </div>
  );
}

function Ruler({ total, step }: { total: number; step: number }) {
  const marks = Array.from({ length: Math.floor(total / step) + 1 }, (_, index) => index * step);
  return (
    <div className="vc-ruler">
      {marks.map((mark) => (
        <span key={mark} style={{ left: `${(mark / total) * 100}%` }}>
          {String(mark).padStart(2, "0")}s
        </span>
      ))}
    </div>
  );
}

function Track({ name, sub, children }: { name: string; sub?: string; children: ReactNode }) {
  return (
    <div className="vc-track">
      <b>
        {name}
        {sub && <small>{sub}</small>}
      </b>
      {children}
    </div>
  );
}

/* ---------- 03 · El desafío ---------- */
export function DesafioSlide() {
  const useful = new Set([5, 6, 14, 15, 16, 25, 26]);
  return (
    <Scene eyebrow="El desafío · 0:30" title="Editar no es solo cortar." lead={<>Antes de tocar la línea de tiempo, alguien mira, escucha y decide qué vale la pena contar. <strong>¿Cómo hace eso un agente?</strong></>}>
      <div className="vc-reel" aria-hidden="true">
        {Array.from({ length: 32 }, (_, index) => (
          <i key={index} data-on={useful.has(index)} />
        ))}
      </div>
      <div className="vc-reel-out" aria-hidden="true">
        <span>Grabación larga</span>
        <span>→ Clip corto</span>
      </div>
      <ol className="vc-trio">
        <li style={css({ "--c": purple })}><span>01 · Percibir</span><h3>Qué pasa y cuándo</h3><p>Imagen, movimiento, voz y sonido con marcas de tiempo.</p></li>
        <li style={css({ "--c": green })}><span>02 · Ejecutar</span><h3>Cortar, ordenar, animar</h3><p>Un editor que el agente pueda operar con precisión.</p></li>
        <li style={css({ "--c": blue })}><span>03 · Decidir</span><h3>Qué vale la pena contar</h3><p>Criterio editorial que vive fuera del prompt.</p></li>
      </ol>
    </Scene>
  );
}

/* ---------- 04 · Cuatro problemas ---------- */
export function CuatroProblemasSlide() {
  const problems = [
    { n: "01 · Video", title: "Es ciego al movimiento.", body: "Ve imágenes sueltas, no lo que pasa entre ellas.", face: faces.sleepy },
    { n: "02 · Audio", title: "Es sordo.", body: "Trabaja con texto e imágenes. El sonido le llega, como mucho, transcrito.", face: faces.curious },
    { n: "03 · Entorno de edición", title: "No tiene dónde editar.", body: "Los editores están pensados para manos y ojos humanos.", face: faces.squeeze },
    { n: "04 · Contexto", title: "No sabe qué te importa.", body: "Tu marca, tu público y tus reglas no caben en un solo prompt.", face: faces.happy },
  ];
  return (
    <Scene eyebrow="El problema · 0:30" title="Para editar video, un agente tiene cuatro problemas." lead="Los vamos a resolver uno por uno. Cada vez que uno quede resuelto, lo marcamos.">
      <ol className="vc-problems">
        {problems.map((problem) => (
          <li key={problem.n}>
            <div className="vc-problem-top"><span>{problem.n}</span><i aria-hidden="true" /></div>
            <SlideFace face={problem.face} size={5.4} />
            <h3>{problem.title}</h3>
            <p>{problem.body}</p>
          </li>
        ))}
      </ol>
    </Scene>
  );
}

/* ---------- 05 · Fotos sueltas ---------- */
export function FotosSueltasSlide() {
  return (
    <Scene eyebrow="01 · Video · 0:45" title="GPT no ve un video. Ve fotos sueltas." lead="Le mandamos el video como una secuencia de imágenes. El movimiento hay que reconstruirlo entre una y la siguiente." track="video">
      <div className="vc-samples">
        <div className="vc-countdown">
          <div><strong style={{ color: blue }}>1,800</strong><span>fotogramas tiene un video de 60 segundos a 30 FPS</span></div>
          <div className="vc-down">↓ si mandamos 1 por segundo</div>
          <div><strong>60</strong><span>imágenes le llegan al modelo</span></div>
        </div>
        <div>
          <div className="vc-head"><b>Un segundo de video</b><span>30 fotogramas · ejemplo ilustrativo</span></div>
          <div className="vc-frames" aria-hidden="true">
            {Array.from({ length: 30 }, (_, index) => (
              <i key={index} data-seen={index === 0} />
            ))}
          </div>
          <p className="vc-legend"><span><i data-seen="true" />Lo que mira el modelo: 1</span><span><i />Lo que se salta: 29</span></p>
          <div className="vc-stats">
            <div><strong>≈1,100</strong><span>tokens por fotograma 720p en GPT-5.5, detalle alto</span></div>
            <div><strong>≈2M</strong><span>tokens por minuto con los 30 FPS (≈66k a 1 FPS)</span></div>
          </div>
          <p className="vc-source">Fuente: OpenAI API, guía de imágenes y visión. Parches de 32 px × multiplicador 1.2.</p>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- 06 · Elegir fotogramas ---------- */
export function ElegirFotogramasSlide() {
  const secs = Array.from({ length: 9 }, (_, index) => index);
  const fixed = new Set([0, 2, 4, 6]);
  const event = new Set([0, 3, 6]);
  const row = (picked: Set<number>) => (
    <div className="vc-film" aria-hidden="true">
      {secs.map((sec) => (
        <i key={sec} data-pick={picked.has(sec)} data-hand={sec === 3}>
          <span>{`00:0${sec}`}</span>
        </i>
      ))}
    </div>
  );
  return (
    <Scene eyebrow="01 · Video · 0:40" title="¿Qué fotogramas vale la pena mirar?" lead="Muestrear a intervalos fijos es simple. Detectar cambios entre imágenes es más eficiente, aunque tampoco es infalible." track="video">
      <p className="vc-caption"><b>Grabación de una charla, 8 segundos.</b> En 00:03 alguien del público levanta la mano.</p>
      <div className="vc-compare">
        <div>
          <h3>Cada 2 segundos <em data-bad="true">Evento perdido</em></h3>
          {row(fixed)}
          <p>4 fotogramas: 00:00, 00:02, 00:04 y 00:06. La mano levantada en 00:03 nunca llega al modelo.</p>
        </div>
        <div>
          <h3>Por cambio de escena <em>Evento capturado</em></h3>
          {row(event)}
          <p>3 fotogramas. FFmpeg manda solo los que superan el umbral: <code>select='gt(scene,0.3)'</code>.</p>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- 07 · Texto en pantalla ---------- */
export function TextoEnPantallaSlide() {
  const reads = [
    { t: "00:00.00", why: "Inicio del video", out: "«Cómo editar con IA»", none: false },
    { t: "00:03.15", why: "0.15 s después de un corte", out: "«3 errores comunes»", none: false },
    { t: "00:05.00", why: "Empieza el movimiento", out: "Sin texto", none: true },
    { t: "00:07.40", why: "Plano quieto, mismo fotograma", out: "Igual que 00:03.15: no se vuelve a leer", none: true },
  ];
  return (
    <Scene eyebrow="01 · Video · 0:35" title="El texto en pantalla se lee aparte." lead={<>Un modelo que describe imágenes puede parafrasear un título. <strong>Tesseract</strong>, un OCR tradicional, copia el texto exacto.</>} track="video">
      <div className="vc-ocr">
        <div>
          <div className="vc-head"><b>Un video de 8 s, cuatro lecturas</b><span>Los eventos deciden dónde leer</span></div>
          <ol className="vc-reads">
            {reads.map((read, index) => (
              <li key={read.t} data-none={read.none}>
                <span className="vc-read-n">{index + 1}</span>
                <time>{read.t}</time>
                <span className="vc-why">{read.why}</span>
                <b>{read.out}</b>
              </li>
            ))}
          </ol>
        </div>
        <Code>
          <span className="vc-c"># en cada fotograma elegido</span>
          {"\n"}<span className="vc-p">$</span> <span className="vc-f">tesseract</span> 00-03.15.png stdout -l spa{"\n"}
          <span className="vc-hl">3 errores comunes</span>
          {"\n\n"}<span className="vc-p">$</span> <span className="vc-f">tesseract</span> 00-05.00.png stdout -l spa{"\n"}
          <span className="vc-c">(vacío: no hay texto)</span>
        </Code>
      </div>
    </Scene>
  );
}

/* ---------- 08 · Movimiento ---------- */
export function MovimientoSlide() {
  const ball = [
    { x: 8, y: 6 }, { x: 18, y: 26 }, { x: 28, y: 52 }, { x: 38, y: 70 }, { x: 48, y: 42 }, { x: 58, y: 22 }, { x: 68, y: 40 }, { x: 78, y: 62 }, { x: 88, y: 56 },
  ];
  return (
    <Scene eyebrow="01 · Video · 0:30" title="Un fotograma describe. Una secuencia cuenta." lead="Para decidir dónde cortar, el agente necesita saber qué cambió y en qué orden." track="video" solved>
      <div className="vc-strobe" aria-hidden="true">
        {ball.map((point, index) => (
          <i key={index} style={css({ left: `${point.x}%`, top: `${point.y}%`, "--o": 0.18 + (index / ball.length) * 0.82 })} data-impact={index === 3} />
        ))}
        <span className="vc-floor" />
      </div>
      <div className="vc-reading">
        <div><span>Una imagen</span><b>«Hay una pelota.»</b></div>
        <em aria-hidden="true">→</em>
        <div><span>Una secuencia</span><b>«Cayó, golpeó y rebotó.»</b></div>
        <em aria-hidden="true">→</em>
        <div data-final="true"><span>Una decisión</span><b>«Cortá en el impacto.»</b></div>
      </div>
    </Scene>
  );
}

/* ---------- 09 · Escuchar ---------- */
function waveBars() {
  return Array.from({ length: 72 }, (_, index) => {
    const t = (index / 72) * 6;
    const voice = t < 2.4 ? 0.35 + 0.55 * Math.abs(Math.sin(index * 1.7)) : 0;
    const bird = t > 3 && t < 3.6 ? 0.55 + 0.25 * Math.abs(Math.sin(index * 2.9)) : 0;
    const music = 0.14 + 0.06 * Math.sin(index * 0.8);
    return { voice, bird, music };
  });
}

export function EscucharSlide() {
  const bars = waveBars();
  return (
    <Scene eyebrow="02 · Audio · 0:45" title="Transcribir no es escuchar." lead="Una transcripción recupera las palabras. El resto del sonido también dice cosas." track="audio">
      <div className="vc-head"><b>Un mismo archivo de audio · 6 s</b>
        <span className="vc-key"><i style={css({ "--c": charcoal })} />Voz <i style={css({ "--c": green })} />Pájaros <i style={css({ "--c": orange })} />Música</span>
      </div>
      <div className="vc-wave" aria-hidden="true">
        {bars.map((bar, index) => (
          <span key={index}>
            <i style={{ height: `${bar.music * 100}%`, background: orange }} />
            {bar.voice > 0 && <i style={{ height: `${bar.voice * 100}%`, background: charcoal }} />}
            {bar.bird > 0 && <i style={{ height: `${bar.bird * 100}%`, background: green }} />}
          </span>
        ))}
      </div>
      <div className="vc-listen">
        <div>
          <h3>¿Qué se dijo? <small>Transcripción</small></h3>
          <p className="vc-words"><span><small>00:00.4</small><b>Necesitamos</b></span><span><small>00:01.3</small><b>cambiar</b></span><span><small>00:01.9</small><b>esto.</b></span></p>
          <p className="vc-models">Corren en tu computadora: <em>Whisper</em><em>Moonshine</em><em>NVIDIA Parakeet</em></p>
        </div>
        <div>
          <h3>¿Qué está pasando? <small>Comprensión</small></h3>
          <dl className="vc-facts">
            <div><dt>Tono</dt><dd>Voz tensa, ritmo rápido</dd></div>
            <div><dt>Ambiente</dt><dd>Pájaros en 00:03.1</dd></div>
            <div><dt>Música</dt><dd>Suave y constante de fondo</dd></div>
          </dl>
          <p className="vc-models">Modelos con audio nativo: <em>Gemini</em><em>y otros</em></p>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- 10 · FFmpeg mide ---------- */
export function FfmpegMideSlide() {
  const level = [40, 62, 70, 58, 66, 72, 18, 10, 16, 64, 70, 60, 68, 74, 66, 12, 8, 62, 70, 64];
  return (
    <Scene eyebrow="02 · Audio · 0:30" title="FFmpeg no escucha. Mide." lead="Como un técnico de sonido sin oídos: no sabe qué suena, pero sabe con precisión cuándo, cuánto y dónde." track="audio">
      <div className="vc-measure">
        <Code file="terminal">
          <span className="vc-p">$</span> <span className="vc-f">ffmpeg</span> -i charla.mp4 \{"\n"}    -af <span className="vc-s">silencedetect=noise=-30dB:d=0.5</span> \{"\n"}    -f null -{"\n\n"}
          <span className="vc-dim">[silencedetect]</span> silence_start: <span className="vc-n">6.48</span>{"\n"}
          <span className="vc-dim">[silencedetect]</span> silence_end: <span className="vc-n">8.02</span> | <span className="vc-hl">silence_duration: 1.54</span>{"\n"}
          <span className="vc-dim">[silencedetect]</span> silence_start: <span className="vc-n">15.90</span>{"\n"}
          <span className="vc-dim">[silencedetect]</span> silence_end: <span className="vc-n">17.10</span> | <span className="vc-hl">silence_duration: 1.20</span>
        </Code>
        <div className="vc-meter">
          <div className="vc-head"><b>Volumen a lo largo de 20 s</b><Tag /></div>
          <div className="vc-meter-bars" aria-hidden="true">
            {level.map((value, index) => (
              <i key={index} data-quiet={value < 20} style={{ height: `${value}%` }} />
            ))}
          </div>
        </div>
      </div>
      <ul className="vc-tools">
        <li><code>silencedetect</code><b>Silencios</b><span>Pausas largas, candidatas a corte.</span></li>
        <li><code>ebur128</code><b>Volumen percibido</b><span>Nivelar voces y música en LUFS.</span></li>
        <li><code>select='gt(scene,0.3)'</code><b>Cambios de escena</b><span>Qué fotogramas mandar al modelo.</span></li>
      </ul>
    </Scene>
  );
}

/* ---------- 11 · Mapa de sonido ---------- */
export function MapaDeSonidoSlide() {
  const events = [
    { n: 1, t: "00:03.4", title: "Pájaros", body: "Evitar cortar encima, o usarlo como ambiente.", c: green },
    { n: 2, t: "00:04.5", title: "Pausa de 1.1 s", body: "Corte limpio sin partir una palabra.", c: blue },
    { n: 3, t: "00:09.0", title: "Acento musical", body: "Cambio de plano justo en el golpe.", c: orange },
  ];
  const beats = [0.5, 2.5, 4.5, 6.5, 8.5, 9, 10.5];
  return (
    <Scene eyebrow="02 · Audio · 0:35" title="El sonido también tiene una línea de tiempo." lead="Juntando transcripción, mediciones y comprensión, cada evento queda con su marca de tiempo." track="audio" solved>
      <div className="vc-map">
        <Ruler total={12} step={2} />
        <Track name="Voz" sub="transcripción">
          <Lane total={12} items={[
            { a: 0.3, b: 3.9, label: "Hoy no vamos a escribir prompts" },
            { a: 3.95, b: 5.05, label: "1.1 s", tone: "gap" },
            { a: 5.1, b: 8.7, label: "vamos a darle ojos y oídos" },
            { a: 9.05, b: 11.6, label: "a un agente." },
          ]} />
        </Track>
        <Track name="Ambiente" sub="comprensión">
          <Lane total={12} items={[{ a: 3.1, b: 4, label: "pájaros", color: green }]} />
        </Track>
        <Track name="Música" sub="medición">
          <Lane total={12} items={beats.map((a) => ({ a, color: orange }))} />
        </Track>
      </div>
      <ol className="vc-events">
        {events.map((event) => (
          <li key={event.n} style={css({ "--c": event.c })}>
            <em>{event.n}</em>
            <b><time>{event.t}</time>{event.title}</b>
            <span>{event.body}</span>
          </li>
        ))}
      </ol>
    </Scene>
  );
}

/* ---------- 12 · Dónde edita ---------- */
export function DondeEditaSlide() {
  const routes = [
    { title: "Usar la pantalla", ex: "Computer use sobre un editor tradicional", pro: "Funciona con cualquier programa", con: "Lento y frágil: la interfaz es para humanos", glyph: "▢" },
    { title: "Conectarse por MCP", ex: "Conectores comunitarios, por ejemplo para CapCut", pro: "Acciones concretas sobre el proyecto", con: "Depende de lo que exponga cada conector", glyph: "⇄" },
    { title: "Escribir la edición", ex: "Remotion (React) · HyperFrames (HTML)", pro: "Reproducible, revisable, versionable", con: "Requiere preparar un entorno", glyph: "</>", pick: true },
  ];
  return (
    <Scene eyebrow="03 · Entorno de edición · 0:50" title="¿Dónde edita un agente?" lead="Puede usar la pantalla como una persona, conectarse a un editor o escribir la edición como código." track="entorno">
      <div className="vc-routes">
        {routes.map((route) => (
          <article key={route.title} data-pick={route.pick}>
            <span className="vc-glyph" aria-hidden="true">{route.glyph}</span>
            <h3>{route.title}</h3>
            <p className="vc-ex">{route.ex}</p>
            <ul><li>{route.pro}</li><li data-con="true">{route.con}</li></ul>
          </article>
        ))}
      </div>
      <p className="vc-axis"><span>Interfaz para personas</span><i aria-hidden="true" /><span>Más control y reproducibilidad</span></p>
    </Scene>
  );
}

/* ---------- 13 · Edición como código ---------- */
export function EdicionComoCodigoSlide() {
  return (
    <Scene eyebrow="03 · Entorno de edición · 0:45" title="Cada corte es una línea que se puede revisar." lead="En Remotion un video es un componente de React. Tiempos, capas y efectos quedan escritos." track="entorno">
      <div className="vc-ct">
        <Code file="Clip.tsx · 30 FPS">
          <span className="vc-c">{"// 150 cuadros = 5 segundos"}</span>{"\n"}
          <span className="vc-ln" style={css({ "--c": blue })}>{"<"}<span className="vc-f">Sequence</span> from=<span className="vc-n">{"{0}"}</span> durationInFrames=<span className="vc-n">{"{150}"}</span>{">"}{"\n  <"}<span className="vc-f">OffthreadVideo</span> src=<span className="vc-s">"charla.mp4"</span> trimBefore=<span className="vc-n">{"{1440}"}</span> {"/>"}{"\n</"}<span className="vc-f">Sequence</span>{">"}</span>{"\n"}
          <span className="vc-ln" style={css({ "--c": purple })}>{"<"}<span className="vc-f">Sequence</span> from=<span className="vc-n">{"{60}"}</span> durationInFrames=<span className="vc-n">{"{90}"}</span>{">"}{"\n  <"}<span className="vc-f">Reencuadre</span> zoom=<span className="vc-n">{"{1.15}"}</span> {"/>"}{"\n</"}<span className="vc-f">Sequence</span>{">"}</span>{"\n"}
          <span className="vc-ln" style={css({ "--c": green })}>{"<"}<span className="vc-f">Sequence</span> from=<span className="vc-n">{"{75}"}</span> durationInFrames=<span className="vc-n">{"{60}"}</span>{">"}{"\n  <"}<span className="vc-f">Subtitulo</span> texto=<span className="vc-s">"Una idea…"</span> {"/>"}{"\n</"}<span className="vc-f">Sequence</span>{">"}</span>
        </Code>
        <div className="vc-tl">
          <div className="vc-head"><b>La misma edición en la línea de tiempo</b><Tag>Esquema</Tag></div>
          <Track name="Video"><Lane total={150} items={[{ a: 0, b: 150, label: "charla.mp4", color: blue }]} /></Track>
          <Track name="Reencuadre"><Lane total={150} items={[{ a: 60, b: 150, label: "zoom 1.15", color: purple }]} /></Track>
          <Track name="Subtítulo"><Lane total={150} items={[{ a: 75, b: 135, label: "Una idea…", color: green }]} /></Track>
          <Track name="Sonido"><Lane total={150} items={[{ a: 52, b: 70, label: "sfx", color: orange }]} /></Track>
          <p className="vc-note"><b>Cuadro 90:</b> zoom aplicado y subtítulo en pantalla. Cambiar un número cambia el video.</p>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- 14 · El taller ---------- */
export function TallerSlide() {
  const tree: { name: string; note: string; depth: number; color?: string }[] = [
    { name: "AGENTS.md", note: "reglas generales", depth: 0, color: blue },
    { name: "projects/", note: "", depth: 0 },
    { name: "mi-video/", note: "un proyecto aislado", depth: 1 },
    { name: "PROJECT.md", note: "brief y decisiones", depth: 2, color: green },
    { name: "Video.tsx", note: "composición", depth: 2 },
    { name: "assets/", note: "video, audio, imágenes", depth: 2, color: orange },
    { name: "_scratch/", note: "análisis temporal", depth: 2 },
    { name: "renders/", note: "lo exportado", depth: 2 },
  ];
  const parts = [
    { title: "Instrucciones", sub: "AGENTS.md", body: "Cómo trabaja en cualquier proyecto: convenciones y qué revisar.", c: blue },
    { title: "Skills", sub: "procedimientos", body: "Recetas que se cargan según la tarea: analizar audio, sincronizar, verificar.", c: purple },
    { title: "Memoria", sub: "PROJECT.md", body: "Qué se pidió, qué se decidió y qué se aprendió en esta edición.", c: green },
    { title: "Recursos", sub: "assets/", body: "Material de entrada y una biblioteca de efectos que se reutiliza.", c: orange },
  ];
  return (
    <Scene eyebrow="03 · Entorno de edición · 0:40" title="El agente necesita un taller." lead="Reglas, procedimientos y memoria guardados en archivos." track="entorno">
      <div className="vc-shop">
        <div className="vc-tree">
          <div className="vc-head"><b>remotion-lab/</b><Tag>Mi laboratorio · simplificado</Tag></div>
          {tree.map((row) => (
            <div key={row.name} className="vc-tree-row" data-hl={Boolean(row.color)} style={css({ "--d": row.depth, "--c": row.color ?? "transparent" })}>
              <code>{row.name}</code><span>{row.note}</span>
            </div>
          ))}
        </div>
        <div className="vc-parts">
          {parts.map((part) => (
            <div key={part.title} style={css({ "--c": part.c })}>
              <h3>{part.title}<small>{part.sub}</small></h3>
              <p>{part.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Scene>
  );
}

/* ---------- 15 · Biblioteca de efectos ---------- */
export function BibliotecaDeEfectosSlide() {
  const sfx = [
    { when: "Aparece un texto", title: "Clack", body: "Sonido de firma: cada elemento que entra.", file: "impact-billiard-clack.wav", shape: [90, 40, 20, 10, 6, 3] },
    { when: "Cambia la escena", title: "Whoosh", body: "Conecta un plano con el siguiente.", file: "whoosh-clean-airy.mp3", shape: [10, 25, 55, 85, 50, 15] },
    { when: "Momento clave", title: "Barrido", body: "Una o dos veces por video, no más.", file: "sweep-tech-clean.mp3", shape: [8, 18, 34, 58, 82, 96] },
    { when: "Hace falta narrar", title: "Voz", body: "Una línea por escena con Gemini API o ElevenLabs.", file: "assets/voice/scene_a.mp3", shape: [40, 70, 30, 80, 45, 65], voice: true },
  ];
  return (
    <Scene eyebrow="03 · Entorno de edición · 0:35" title="Cada sonido tiene una función." lead="Efectos con roles para que el agente sepa qué usar y dónde. Si hace falta narrar, la voz también se genera." track="entorno" solved>
      <div className="vc-sfx">
        {sfx.map((item) => (
          <article key={item.title} data-voice={item.voice}>
            <span className="vc-when">{item.when}</span>
            <div className="vc-mini" aria-hidden="true">
              {item.shape.flatMap((height) => [height, height * 0.7, height * 0.85]).map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}
            </div>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
            <code>{item.file}</code>
          </article>
        ))}
      </div>
      <div className="vc-rules">
        <b>Reglas de mi biblioteca</b>
        <p>La voz va primero. El whoosh entra en su pausa y termina en el corte.</p>
        <p>Cada sonido tiene nota puesta a oído antes de usarse.</p>
      </div>
    </Scene>
  );
}

/* ---------- 16 · Criterio en archivos ---------- */
export function CriterioEnArchivosSlide() {
  const walk = [
    { n: "1", name: "INDEX.md", note: "¿qué necesito saber?", on: true, depth: 0 },
    { n: "2", name: "editorial-problems/", note: "qué problema resuelve", on: true, depth: 1 },
    { n: "3", name: "principles/", note: "reglas y criterios", on: true, depth: 1 },
    { n: "", name: "playbooks/", note: "cómo ejecutar", on: false, depth: 1 },
    { n: "4", name: "cases/", note: "ejemplos y evidencia", on: true, depth: 1 },
  ];
  const lessons = [
    { title: "El gancho es una hipótesis.", body: "Los primeros segundos prueban una pregunta, una tensión o una promesa." },
    { title: "Subtítulos con jerarquía.", body: "Destacar las palabras que cargan el significado, no todas." },
    { title: "Retención sin relevancia no crea demanda.", body: "Que alguien siga mirando no significa que le importe." },
  ];
  return (
    <Scene eyebrow="04 · Contexto · 1:05" title="El criterio también puede vivir en archivos." lead="Una wiki con índice deja que el agente lea solo lo que necesita para esta pieza." track="contexto">
      <div className="vc-prompt">
        <span>Prompt sugerido</span>
        <p>«Editá un reel de 30 s sobre uno de nuestros servicios. Antes de cortar, leé <code>wiki/INDEX.md</code> y abrí solo las páginas que apliquen a este encargo. En <code>PROJECT.md</code>, anotá qué principios usaste y por qué.»</p>
      </div>
      <div className="vc-wiki">
        <div className="vc-walk">
          {walk.map((row) => (
            <div key={row.name} data-on={row.on} style={css({ "--d": row.depth })}>
              <em>{row.n}</em><code>{row.name}</code><span>{row.note}</span>
            </div>
          ))}
          <p><span>Encargo: <b>reel de un servicio</b></span><span>Recorre <b>4</b> pasos, no toda la wiki</span></p>
        </div>
        <ol className="vc-lessons">
          {lessons.map((lesson, index) => (
            <li key={lesson.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{lesson.title}</h3><p>{lesson.body}</p></li>
          ))}
          <li className="vc-caveat">Principios e hipótesis editoriales de mi wiki de contenido. No son garantías de viralidad.</li>
        </ol>
      </div>
    </Scene>
  );
}

/* ---------- 17 · Aplicar el criterio ---------- */
export function AplicarElCriterioSlide() {
  return (
    <Scene eyebrow="04 · Contexto · 0:45" title="La IA puede animar cualquier palabra. ¿Cuál debería?" track="contexto" solved>
      <div className="vc-crit">
        <div className="vc-vframes">
          <figure>
            <div className="vc-scr"><p className="vc-cap-bad">CON IA PODÉS HACER VIDEOS MÁS RÁPIDO Y TAMBIÉN EDITARLOS</p></div>
            <figcaption><b>Sin intención</b><span>Todo compite por la atención.</span><Tag>Ilustración</Tag></figcaption>
          </figure>
          <em aria-hidden="true">→</em>
          <figure>
            <div className="vc-scr"><p className="vc-cap-good"><small>Con IA podés</small><strong>EDITAR</strong><small>más rápido.</small></p></div>
            <figcaption><b>Con criterio</b><span>Una idea, jerarquía visible.</span><Tag>Ilustración</Tag></figcaption>
          </figure>
        </div>
        <div>
          <div className="vc-checks">
            <h3>Lo que el agente evalúa antes de animar</h3>
            <div><b>Atención</b><span>¿Sigue mirando?</span></div>
            <div><b>Comprensión</b><span>¿Entiende la idea en un vistazo?</span></div>
            <div><b>Relevancia</b><span>¿Le importa lo que dice?</span></div>
          </div>
          <blockquote className="vc-quote">«Retención sin relevancia no crea demanda.»<small>Principio de la wiki · cases/ y principles/</small></blockquote>
        </div>
      </div>
    </Scene>
  );
}

/* ---------- 18 · El sistema completo ---------- */
export function SistemaCompletoSlide() {
  const stages = [
    { n: "01", title: "Ingerir", body: "Video original", tool: "ffmpeg · ffprobe", face: faces.sleepy },
    { n: "02", title: "Comprender", body: "Escenas, texto, voz y eventos con tiempo", tool: "sureshot · Gemini", face: faces.curious },
    { n: "03", title: "Decidir", body: "Codex con wiki, skills y PROJECT.md", tool: "Codex", face: faces.squeeze, kind: "agent" },
    { n: "04", title: "Producir", body: "Componer y exportar", tool: "Remotion · FFmpeg", face: faces.plus },
    { n: "05", title: "Verificar", body: "Fotogramas, sincronía y revisión humana", tool: "sureshot · vos", face: faces.spark, kind: "human" },
  ];
  return (
    <Scene eyebrow="Todo junto · 0:40" title="Todas las piezas, un flujo de trabajo." lead="Codex coordina herramientas y contexto. La persona revisa el sentido y el ritmo." track="all">
      <div className="vc-flow">
        {stages.map((stage) => (
          <div key={stage.n} data-kind={stage.kind}>
            <span className="vc-flow-n">{stage.n}</span>
            <SlideFace face={stage.face} size={4.6} />
            <h3>{stage.title}</h3>
            <p>{stage.body}</p>
            <code>{stage.tool}</code>
          </div>
        ))}
      </div>
      <p className="vc-loop"><span aria-hidden="true">↩</span> Lo que encuentra la verificación vuelve a la decisión</p>
      <p className="vc-lesson"><b>Lo que aprendí:</b> un render sin errores todavía puede tener cortes mal puestos, audio desfasado o tramos vacíos.</p>
    </Scene>
  );
}

/* ---------- 19 · Sureshot ---------- */
export function SureshotSlide() {
  const rows: { name: string; sub: string; items: Span[] }[] = [
    { name: "Estructura", sub: "scene > 0.4", items: [3, 6.8, 9.6].map((a) => ({ a, color: blue })) },
    { name: "Texto", sub: "tesseract", items: [{ a: 0.05, b: 2.9, label: "«Cómo editar con IA»" }, { a: 3.15, b: 6.6, label: "«3 errores comunes»" }, { a: 9.75, b: 11.9, label: "«Error 1»" }] },
    { name: "Movimiento", sub: "1 FPS · 160×90", items: [{ a: 3, b: 5.6, label: "alto", tone: "hot" }, { a: 6.8, b: 9.6, label: "quieto", tone: "calm" }] },
    { name: "Audio", sub: "silencedetect", items: [{ a: 4.4, b: 5.8, label: "1.4 s", tone: "gap" }, { a: 9.6, b: 11.9, label: "sube la energía", tone: "hot" }] },
    { name: "Voz", sub: "faster-whisper", items: [{ a: 0.3, b: 4.3, label: "Hoy no vamos a escribir prompts" }, { a: 5.9, b: 9.4, label: "vamos a darle ojos y oídos" }, { a: 9.8, b: 11.8, label: "a un agente." }] },
  ];
  return (
    <Scene eyebrow="Por dentro · 0:45" title="Todo esto ya es una herramienta." lead={<><strong>sureshot</strong> corre estos pasos sobre un video y guarda cada evento en una sola línea de tiempo. No interpreta: deja evidencia para que el agente decida.</>} track="all">
      <div className="vc-ss">
        <div>
          <div className="vc-head"><b>Un video de 12 s, cinco capas</b><code>sureshot.py analyze video.mp4 --stt --ocr</code></div>
          <Ruler total={12} step={2} />
          {rows.map((row) => (
            <Track key={row.name} name={row.name} sub={row.sub}><Lane total={12} items={row.items} height={2.6} /></Track>
          ))}
        </div>
        <ol className="vc-out">
          <li><code>timeline.sqlite</code><span>Las cinco capas, un solo reloj.</span></li>
          <li><code>view --map</code><span>Dónde hay actividad, sin releer todo.</span></li>
          <li><code>inspect 00:03-00:05</code><span>Fotogramas solo de ese tramo.</span></li>
          <li><code>report</code><span>Evidencia, métricas y procedencia en YAML.</span></li>
          <li data-agent="true"><SlideFace face={faces.squeeze} size={2.6} /><span><b>Codex</b> interpreta y decide, citando tiempos.</span></li>
        </ol>
      </div>
    </Scene>
  );
}

/* ---------- 20 · A las demos ---------- */
export function ALasDemosSlide() {
  return (
    <SlideFrame className="vc-demos" footer={false}>
      <Crowd faces={closingCrowd({ x: 40, y: 26 })} className="dd-closing-crowd" />
      <Eyebrow>El sistema en la práctica · 0:15</Eyebrow>
      <h2 className="dd-display">
        Ya tiene ojos, oídos y herramientas. <span>Veamos el pipeline completo.</span>
      </h2>
      <p className="vc-demo-time"><b>05:00</b> de demo · un video sobre este pipeline, editado y verificado con él</p>
    </SlideFrame>
  );
}
