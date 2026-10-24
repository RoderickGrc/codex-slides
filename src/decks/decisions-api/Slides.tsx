import type { ReactNode } from "react";
import { SlideFrame } from "../kit/layouts";
import "./decisions-api.css";

/*
 * Réplica del PPTX de Frank (16.67in × 9.375in, Arial).
 * x/y: % del ancho/alto originales → top = y·0.5625 cqw (alto = 56.25% del ancho).
 * sz: puntos → cqw (1 cqw = 12 pt en un slide de 1200 pt de ancho).
 */

const INK = "#171717";
const PAPER = "#FAFAF7";
const MUTE = "#66685E";
const MUTE_D = "#C5C5C5";
const MUTE_D2 = "#C4C4C4";
const SUBTLE_D = "#C6C6C6";
const BLUE = "#3D64FF";
const PURPLE = "#9147FF";
const GREEN = "#32B544";
const ORANGE = "#FF8700";
const GRAY_F = "#DDDDDA";
const CARD_L = "#EEEEEA";
const CARD_D = "#242424";
const RULE = "#CDCDC8";
const BAR = "#A9A9A4";

/** Texto posicionado: x,y en % del slide original; sz en puntos. */
function E({
  x,
  y,
  w,
  sz,
  b,
  c = INK,
  children,
}: {
  x: number;
  y: number;
  w?: number;
  sz: number;
  b?: boolean;
  c?: string;
  children: ReactNode;
}) {
  return (
    <span
      className="fc-e"
      style={{
        left: `${x}cqw`,
        top: `${y * 0.5625}cqw`,
        ...(w ? { width: `${w}cqw` } : {}),
        fontSize: `${(sz / 12).toFixed(3)}cqw`,
        fontWeight: b ? 700 : 400,
        color: c,
      }}
    >
      {children}
    </span>
  );
}

/** Círculo de color con ojos de caracteres ('0 0', '+ +', '><', '− −', '* *', '^ ^', '0 <'). */
function Face({
  x,
  y,
  d,
  bg,
  eyes,
  sz,
}: {
  x: number;
  y: number;
  d: number;
  bg: string;
  eyes: string;
  sz: number;
}) {
  return (
    <span
      className="fc-face"
      style={{
        left: `${x}cqw`,
        top: `${y * 0.5625}cqw`,
        width: `${d}cqw`,
        height: `${d}cqw`,
        background: bg,
      }}
      aria-hidden="true"
    >
      <i style={{ fontSize: `${(sz / 12).toFixed(3)}cqw` }}>{eyes}</i>
    </span>
  );
}

/** Rectángulo posicionado (tarjetas, reglas, barras). */
function Box({
  x,
  y,
  w,
  h,
  bg,
  r,
  border,
  children,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  bg?: string;
  r?: number;
  border?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className="fc-box"
      style={{
        left: `${x}cqw`,
        top: `${y * 0.5625}cqw`,
        width: `${w}cqw`,
        height: `${h * 0.5625}cqw`,
        background: bg,
        borderRadius: r ? `${r}cqw` : undefined,
        border,
      }}
    >
      {children}
    </div>
  );
}

function Head({ n, dark }: { n: string; dark?: boolean }) {
  return (
    <>
      <E x={5.25} y={5.11} sz={21.75} b c={dark ? PAPER : INK}>
        DevDay
      </E>
      <E x={5.25} y={9.22} sz={15.75} c={dark ? MUTE_D : MUTE}>
        El Salvador 2026
      </E>
      <E x={86.88} y={5.56} sz={15} c={dark ? MUTE_D : MUTE}>
        {n} / 12
      </E>
    </>
  );
}

function P({
  n,
  dark,
  label,
  children,
}: {
  n: string;
  dark?: boolean;
  label: string;
  children: ReactNode;
}) {
  return (
    <SlideFrame footer={false} className={`fc-pptx ${dark ? "fc-dark" : "fc-light"}`} label={label}>
      <Head n={n} dark={dark} />
      {children}
    </SlideFrame>
  );
}

/* ---------- 01 · Portada ---------- */
export function AiCodingCoverSlide() {
  return (
    <P n="01" label="AI Coding: Generar código es fácil. Construir software es otra historia.">
      <E x={77.5} y={9.67} sz={15.75} c={MUTE}>
        AI Labs Community
      </E>
      <E x={75.74} y={18.2} sz={52.8} c={BLUE}>
        ?
      </E>
      <Face x={82.61} y={17.22} d={8.8} bg={PURPLE} eyes="0 0" sz={38.02} />
      <Face x={75.19} y={31.89} d={5.22} bg={GRAY_F} eyes="* *" sz={22.57} />
      <Face x={83.16} y={38.24} d={8.53} bg={GREEN} eyes="+ +" sz={36.83} />
      <Face x={76.29} y={49.49} d={18.7} bg={BLUE} eyes="&gt;&lt;" sz={80.78} />
      <Face x={69.69} y={58.78} d={9.62} bg={ORANGE} eyes="− −" sz={41.58} />
      <E x={5.25} y={24.0} sz={94.5} b>
        AI Coding:
      </E>
      <E x={5.25} y={40.22} sz={58.5} b>
        Generar código es fácil.
      </E>
      <E x={5.25} y={51.78} sz={58.5} b>
        Construir software es
      </E>
      <E x={5.25} y={63.33} sz={66} b c={BLUE}>
        otra historia.
      </E>
      <Box x={5.38} y={85.11} w={0.12} h={6.78} bg={BAR} />
      <E x={7.25} y={84.44} sz={21.75} b>
        Frank Calderón
      </E>
      <E x={7.25} y={89.11} sz={18.75} c={MUTE}>
        Software Developer
      </E>
    </P>
  );
}

/* ---------- 02 · ¿La IA nos va a reemplazar? ---------- */
export function ReemplazarSlide() {
  return (
    <P n="02" dark label="¿La IA nos va a reemplazar?">
      <Face x={81.56} y={27.22} d={12.81} bg={ORANGE} eyes="− −" sz={55.35} />
      <E x={5.25} y={30.56} sz={82.5} b c={PAPER}>
        ¿La IA nos va
      </E>
      <E x={5.25} y={45.0} sz={82.5} b c={BLUE}>
        a reemplazar?
      </E>
      <E x={5.25} y={69.44} sz={36.75} c={PAPER}>
        ¿O va a transformar la manera
      </E>
      <E x={5.25} y={76.89} sz={36.75} c={PAPER}>
        en que trabajamos?
      </E>
    </P>
  );
}

/* ---------- 03 · La IA está transformando nuestras tareas ---------- */
export function TareasSlide() {
  const antes = [
    ["?", "Investigar"],
    ["</>", "Escribir código"],
    ["!", "Depurar"],
    ["≡", "Documentar"],
    ["▷", "Probar"],
  ];
  const ahora = [
    ["◎", "Definir"],
    ["◇", "Dirigir"],
    ["✦", "Construir"],
    ["✓", "Validar"],
    ["↑", "Mejorar"],
  ];
  const rows = [47.11, 54.0, 60.89, 67.78, 74.67];
  return (
    <P n="03" dark label="La IA está transformando nuestras tareas">
      <E x={5.25} y={32.33} sz={49.5} b c={PAPER}>
        La IA está
      </E>
      <E x={5.25} y={42.0} sz={49.5} b c={PAPER}>
        transformando
      </E>
      <E x={5.25} y={51.67} sz={49.5} b c={BLUE}>
        nuestras tareas
      </E>
      <E x={9.0} y={68.44} w={33.75} sz={22.5} c={SUBTLE_D}>
        No dejamos de programar.
        <br />
        Cambia cómo invertimos
        <br />
        nuestro tiempo.
      </E>
      <Box x={47.5} y={34.44} w={20} h={52.22} bg={CARD_D} r={0.9} />
      <Box x={73.12} y={34.44} w={20.62} h={52.22} bg={PAPER} r={0.9} />
      <E x={50.12} y={38.0} sz={28.5} b c={PAPER}>
        Antes
      </E>
      <E x={75.75} y={38.0} sz={28.5} b c={INK}>
        Ahora
      </E>
      {antes.map(([icon, text], i) => (
        <span key={text}>
          <E x={49.81} y={rows[i]} w={3.44} sz={22.5} c={PAPER}>
            {icon}
          </E>
          <E x={53.56} y={rows[i]} w={13.44} sz={20.25} c={PAPER}>
            {text}
          </E>
        </span>
      ))}
      {ahora.map(([icon, text], i) => (
        <span key={text}>
          <E x={75.0} y={rows[i]} w={3.44} sz={22.5} c={INK}>
            {icon}
          </E>
          <E x={78.75} y={rows[i]} w={13.75} sz={20.25} c={INK}>
            {text}
          </E>
        </span>
      ))}
      <E x={68.75} y={58.0} sz={35.25} c={PAPER}>
        →
      </E>
      <Face x={85.62} y={17.44} d={9.06} bg={PURPLE} eyes="^ ^" sz={39.15} />
      <Face x={86.88} y={76.0} d={7.5} bg={ORANGE} eyes="− −" sz={32.4} />
      <Face x={5.25} y={85.56} d={6.56} bg={GREEN} eyes="+ +" sz={28.35} />
    </P>
  );
}

/* ---------- 04 · Escribir código ≠ desarrollar software ---------- */
export function CodigoVsSoftwareSlide() {
  return (
    <P n="04" label="Escribir código ≠ desarrollar software">
      <Face x={82.81} y={21.56} d={10.31} bg={ORANGE} eyes="0 <" sz={44.55} />
      <E x={5.25} y={21.44} sz={58.5} b>
        Escribir código
      </E>
      <E x={5.25} y={33.89} sz={46.5} c={MUTE}>
        ≠
      </E>
      <Box x={5.25} y={46.67} w={89.38} h={0.33} bg={RULE} />
      <E x={5.25} y={52.0} sz={58.5} b c={BLUE}>
        Desarrollar software
      </E>
      <E x={5.25} y={69.56} sz={30}>
        El código es el medio.
      </E>
      <E x={51.25} y={69.56} sz={30}>
        La solución es el objetivo.
      </E>
    </P>
  );
}

/* ---------- 05 · La responsabilidad sigue siendo nuestra ---------- */
export function ResponsabilidadSlide() {
  return (
    <P n="05" dark label="La responsabilidad sigue siendo nuestra">
      <E x={5.25} y={25.44} sz={69} b c={PAPER}>
        La IA puede
      </E>
      <E x={5.25} y={37.78} sz={69} b c={PAPER}>
        escribir código.
      </E>
      <E x={5.25} y={54.56} sz={54} b c={PAPER}>
        Pero construir buen software
      </E>
      <E x={5.25} y={65.78} sz={54} b c={PAPER}>
        sigue siendo
      </E>
      <E x={5.25} y={77.0} sz={63.75} b c={BLUE}>
        nuestra responsabilidad.
      </E>
    </P>
  );
}

/* ---------- 06 · 5 prácticas para desarrollar mejor con Codex ---------- */
export function CincoPracticasSlide() {
  const items: [string, string, string][] = [
    ["01", "Instrucciones", PURPLE],
    ["02", "Contexto", BLUE],
    ["03", "Herramientas", ORANGE],
    ["04", "Especificaciones", GREEN],
    ["05", "Validación", INK],
  ];
  const rows = [57.11, 62.78, 68.44, 74.11, 79.78];
  return (
    <P n="06" label="5 prácticas para desarrollar mejor con Codex">
      <E x={76.12} y={22.56} sz={48} c={BLUE}>
        ?
      </E>
      <Face x={82.38} y={21.67} d={8.0} bg={PURPLE} eyes="0 0" sz={34.56} />
      <Face x={75.62} y={35.0} d={4.75} bg={GRAY_F} eyes="* *" sz={20.52} />
      <Face x={82.88} y={40.78} d={7.75} bg={GREEN} eyes="+ +" sz={33.48} />
      <Face x={76.62} y={51.0} d={17.0} bg={BLUE} eyes="&gt;&lt;" sz={73.44} />
      <Face x={70.62} y={59.44} d={8.75} bg={ORANGE} eyes="− −" sz={37.8} />
      <E x={5.25} y={21.56} sz={61.5} b>
        5 prácticas para
      </E>
      <E x={5.25} y={32.33} sz={61.5} b>
        desarrollar mejor
      </E>
      <E x={5.25} y={43.11} sz={61.5} b c={BLUE}>
        con Codex
      </E>
      {items.map(([num, text, color], i) => (
        <span key={num}>
          <E x={5.62} y={rows[i]} w={5.62} sz={21} b c={color}>
            {num}
          </E>
          <E x={12.19} y={rows[i]} sz={24.75} b>
            {text}
          </E>
        </span>
      ))}
      <Box x={5.25} y={90.33} w={90.62} h={4.78} bg="transparent" border={`0.08cqw solid ${INK}`}>
        <span className="fc-bar-text" style={{ fontSize: `${(21 / 12).toFixed(3)}cqw` }}>
          No se trata de escribir mejores prompts. Se trata de trabajar mejor.
        </span>
      </Box>
    </P>
  );
}

/* ---------- Molde de práctica: NN / 05 + título + bajada ---------- */
function PracticeHead({
  n,
  title,
  lede,
  dark,
  kickerColor,
}: {
  n: string;
  title: string;
  lede: string;
  dark?: boolean;
  kickerColor?: string;
}) {
  return (
    <>
      <E x={5.25} y={18.44} sz={17.25} b c={kickerColor ?? (dark ? MUTE_D : MUTE)}>
        {n} / 05
      </E>
      <E x={5.25} y={24.89} sz={57} b c={dark ? PAPER : INK}>
        {title}
      </E>
      <E x={5.25} y={37.33} sz={24} c={dark ? MUTE_D2 : MUTE}>
        {lede}
      </E>
    </>
  );
}

/* ---------- 07 · Instrucciones ---------- */
export function InstruccionesSlide() {
  return (
    <P n="07" label="Instrucciones">
      <PracticeHead n="01" title="Instrucciones" lede="Define cómo debe trabajar tu agente." />
      <Box x={5.25} y={49.11} w={68.12} h={31.11} bg={CARD_L} r={0.9} />
      <E x={7.38} y={50.78} sz={28.5} b>
        AGENTS.md
      </E>
      <E x={7.38} y={58.11} w={63.12} sz={23.25}>
        Convenciones
        <br />
        Arquitectura
        <br />
        Estándares
        <br />
        Reglas del proyecto
      </E>
      <Face x={79.38} y={52.44} d={13.75} bg={PURPLE} eyes="0 0" sz={59.4} />
      <E x={5.25} y={85.11} sz={26.25} b>
        No hagas que tu agente adivine cómo trabajas.
      </E>
    </P>
  );
}

/* ---------- 08 · Contexto ---------- */
export function ContextoSlide() {
  return (
    <P n="08" label="Contexto">
      <PracticeHead n="02" title="Contexto" lede="La IA necesita conocer tu proyecto." />
      <E x={5.25} y={51.67} w={40.62} sz={38.25} b>
        Documentación
        <br />
        Requerimientos
      </E>
      <E x={50.25} y={51.67} w={43.75} sz={38.25} b c={BLUE}>
        Arquitectura
        <br />
        Reglas de negocio
      </E>
      <Box x={5.25} y={80.22} w={88.75} h={0.33} bg={RULE} />
      <E x={5.25} y={83.89} sz={23.25} b>
        El problema no siempre es que la IA no sepa programar.
        <br />
        A veces no conoce nuestro proyecto.
      </E>
    </P>
  );
}

/* ---------- 09 · Herramientas ---------- */
export function HerramientasSlide() {
  const cols = [
    { face: { x: 8.06, bg: BLUE, eyes: "><" }, label: "Codex", lx: 5.25 },
    { face: { x: 40.31, bg: PURPLE, eyes: "0 0" }, label: "MCP", lx: 37.5 },
    { face: { x: 72.56, bg: ORANGE, eyes: "− −" }, label: "Integraciones", lx: 69.75 },
  ];
  return (
    <P n="09" dark label="Herramientas">
      <PracticeHead
        n="03"
        title="Herramientas"
        lede="Dale a tu agente las herramientas correctas."
        dark
        kickerColor={ORANGE}
      />
      {cols.map(({ face, label, lx }) => (
        <span key={label}>
          <Face x={face.x} y={49.22} d={9.38} bg={face.bg} eyes={face.eyes} sz={40.5} />
          <E x={lx} y={68.11} sz={27} b c={PAPER}>
            {label}
          </E>
        </span>
      ))}
      <E x={5.25} y={77.56} w={45.31} sz={23.25} c={PAPER}>
        Repositorios y documentación
      </E>
      <E x={50.25} y={77.56} w={45.31} sz={23.25} c={PAPER}>
        Servicios y herramientas de desarrollo
      </E>
      <E x={5.25} y={86.22} sz={22.5} c={PAPER}>
        Un agente es más útil cuando puede actuar
        <br />
        con el contexto y los permisos adecuados.
      </E>
    </P>
  );
}

/* ---------- 10 · Especificaciones ---------- */
export function EspecificacionesSlide() {
  const items = ["Problema", "Requerimientos", "Plan", "Implementación"];
  const rows = [50.11, 57.44, 64.78, 72.11];
  return (
    <P n="10" label="Especificaciones">
      <PracticeHead n="04" title="Especificaciones" lede="Primero define. Después construye." />
      <E x={5.25} y={52.11} sz={41.25} b>
        Spec-Driven
        <br />
        Development
      </E>
      {items.map((text, i) => (
        <span key={text}>
          <Face x={54.06} y={rows[i] + 1.78} d={1.38} bg={GREEN} eyes="" sz={1} />
          <E x={57.0} y={rows[i]} sz={26.25}>
            {text}
          </E>
        </span>
      ))}
      <E x={5.25} y={84.44} sz={24} b>
        La calidad de una solución comienza con la claridad del problema.
      </E>
    </P>
  );
}

/* ---------- 11 · Validación ---------- */
export function ValidacionSlide() {
  return (
    <P n="11" dark label="Validación">
      <PracticeHead
        n="05"
        title="Validación"
        lede="Confía en el proceso. Verifica el resultado."
        dark
        kickerColor={BLUE}
      />
      <E x={5.25} y={51.44} w={40.62} sz={44.25} b c={PAPER}>
        Code review
        <br />
        Testing
      </E>
      <E x={50.25} y={51.44} w={45} sz={39} b c={BLUE}>
        Seguridad
        <br />
        Criterios de aceptación
      </E>
      <E x={5.25} y={82.11} sz={31.5} b c={PAPER}>
        Delegar la implementación no significa
        <br />
        delegar la responsabilidad.
      </E>
    </P>
  );
}

/* ---------- 12 · Cierre ---------- */
export function CierreSlide() {
  return (
    <P n="12" label="El futuro: construir mejores soluciones">
      <E x={75.67} y={18.74} sz={52.2} c={BLUE}>
        ?
      </E>
      <Face x={82.47} y={17.78} d={8.7} bg={PURPLE} eyes="0 0" sz={37.58} />
      <Face x={75.12} y={32.28} d={5.17} bg={GRAY_F} eyes="* *" sz={22.32} />
      <Face x={83.01} y={38.56} d={8.43} bg={GREEN} eyes="+ +" sz={36.41} />
      <Face x={76.21} y={49.68} d={18.49} bg={BLUE} eyes="&gt;&lt;" sz={79.87} />
      <Face x={69.69} y={58.86} d={9.52} bg={ORANGE} eyes="− −" sz={41.11} />
      <E x={5.25} y={24.22} sz={57.75} b>
        El futuro no se trata
      </E>
      <E x={5.25} y={34.44} sz={57.75} b>
        de escribir más código.
      </E>
      <E x={5.25} y={48.33} sz={51} b c={BLUE}>
        Se trata de construir
      </E>
      <E x={5.25} y={58.11} sz={51} b c={BLUE}>
        mejores soluciones.
      </E>
      <E x={5.25} y={74.33} sz={27.75} b>
        Aprender&nbsp;&nbsp;&nbsp;→&nbsp;&nbsp;&nbsp;Construir&nbsp;&nbsp;&nbsp;→&nbsp;&nbsp;&nbsp;Compartir
      </E>
      <Box x={5.38} y={85.11} w={0.12} h={6.78} bg={BAR} />
      <E x={7.25} y={84.44} sz={21.75} b>
        Frank Calderón
      </E>
      <E x={7.25} y={89.11} sz={18.75} c={MUTE}>
        frankcalderon.dev&nbsp;&nbsp;@frankcalderondev
      </E>
    </P>
  );
}
