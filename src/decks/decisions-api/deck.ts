import { speakers } from "../../devday/speakers";
import { withSlideInfo } from "../kit/SlideInfo";
import type { Deck } from "../types";
import {
  AiCodingCoverSlide,
  CierreSlide,
  CincoPracticasSlide,
  CodigoVsSoftwareSlide,
  ContextoSlide,
  EspecificacionesSlide,
  HerramientasSlide,
  InstruccionesSlide,
  ReemplazarSlide,
  ResponsabilidadSlide,
  TareasSlide,
  ValidacionSlide,
} from "./Slides";

const speaker = speakers.frank;
const title = "AI Coding";
const total = "12";
const info = (index: number) => ({
  deckTitle: title,
  speaker,
  number: String(index).padStart(2, "0"),
  total,
});

/**
 * Las 12 slides del PPTX de Frank, en el mismo orden y con el kit DevDay:
 * portada, pregunta de apertura, tareas, tesis, cinco prácticas y cierre.
 * No lleva espera, resumen ni slide de preguntas.
 */
export const decisionsApiDeck: Deck = {
  slug: "decisions-api",
  title,
  description:
    "Generar código es fácil. Construir software es otra historia: qué cambia cuando la IA escribe código y cinco prácticas para trabajar mejor con Codex.",
  category: "AI Coding",
  duration: "15 min",
  accent: "#9146ff",
  speaker,
  slides: [
    {
      slug: "portada",
      title: "AI Coding: Generar código es fácil. Construir software es otra historia.",
      kicker: `${speaker.name} · Portada`,
      component: withSlideInfo(AiCodingCoverSlide, info(1)),
      guide: {
        intro: "Generar código es fácil; construir software es otra historia. Frank Calderon abre su charla.",
        takeaway: "Seguí la charla desde acá. Usá las flechas para leer a tu ritmo.",
      },
      speakerNotes: { script: "Presentá el título y al equipo.", timing: "0:30" },
    },
    {
      slug: "reemplazar",
      title: "¿La IA nos va a reemplazar?",
      kicker: "Apertura",
      component: withSlideInfo(ReemplazarSlide, info(2)),
      guide: {
        intro: "La pregunta con la que abre la charla. Un trabajo está compuesto por muchas tareas: la pregunta no es si la IA nos reemplaza, sino cómo cambia la manera en que trabajamos.",
        takeaway: "La conversación es sobre transformación, no sobre reemplazo.",
      },
      question: {
        id: "ai-coding-reemplazar",
        prompt: "¿La IA nos va a reemplazar?",
        type: "single",
        options: [
          { id: "reemplaza", label: "Sí, nos va a reemplazar" },
          { id: "transforma", label: "Va a transformar cómo trabajamos" },
          { id: "complementa", label: "Va a ser una herramienta más" },
          { id: "indeciso", label: "Todavía no lo tengo claro" },
        ],
      },
      speakerNotes: {
        script: "Preguntá cuántos han escuchado que la IA reemplazará a los programadores. Compartí brevemente cómo cambió el desarrollo en más de 15 años de experiencia e introducí la idea de que un trabajo está compuesto por muchas tareas.",
        timing: "0:45",
        interaction: "Abrí la encuesta para leer la sala.",
      },
    },
    {
      slug: "transformando-tareas",
      title: "La IA está transformando nuestras tareas",
      kicker: "Antes y ahora",
      component: withSlideInfo(TareasSlide, info(3)),
      guide: {
        intro: "No dejamos de programar: cambia cómo invertimos nuestro tiempo. La IA automatiza o acelera algunas tareas, pero no elimina nuestra responsabilidad sobre el resultado.",
        sections: [
          { title: "Antes", body: "Investigar, escribir código, depurar, documentar, probar." },
          { title: "Ahora", body: "Definir, dirigir, construir, validar, mejorar." },
        ],
        takeaway: "Algunas actividades siguen requiriendo conocimientos técnicos y criterio humano.",
      },
      speakerNotes: {
        script: "La IA automatiza o acelera algunas tareas, pero no elimina nuestra responsabilidad sobre el resultado. Algunas actividades siguen requiriendo conocimientos técnicos y criterio humano.",
        timing: "1:30",
      },
    },
    {
      slug: "codigo-vs-software",
      title: "Escribir código ≠ desarrollar software",
      kicker: "La diferencia",
      component: withSlideInfo(CodigoVsSoftwareSlide, info(4)),
      guide: {
        intro: "El código es el medio; la solución es el objetivo. Generar una aplicación funcional es cada vez más accesible, pero también necesita arquitectura, seguridad, mantenimiento y pruebas.",
        takeaway: "El desafío no es solo generar código: es construir soluciones que resuelvan problemas reales.",
      },
      speakerNotes: {
        script: "Generar una aplicación funcional es cada vez más accesible, pero una aplicación también necesita arquitectura, seguridad, mantenimiento y pruebas. El verdadero desafío no es únicamente generar código, sino construir soluciones que resuelvan problemas reales.",
        timing: "0:30",
      },
    },
    {
      slug: "responsabilidad",
      title: "La responsabilidad sigue siendo nuestra",
      kicker: "La tesis",
      component: withSlideInfo(ResponsabilidadSlide, info(5)),
      guide: {
        intro: "La IA puede escribir código, pero construir buen software sigue siendo nuestra responsabilidad: dirigir su trabajo, proporcionar contexto y evaluar los resultados.",
        takeaway: "La tesis central de la charla.",
      },
      speakerNotes: {
        script: "Esta es la tesis central de la charla. Codex puede implementar funcionalidades, pero necesitamos aprender a dirigir su trabajo, proporcionar contexto y evaluar los resultados.",
        timing: "0:30",
      },
    },
    {
      slug: "cinco-practicas",
      title: "5 prácticas para desarrollar mejor con Codex",
      kicker: "El sistema de trabajo",
      component: withSlideInfo(CincoPracticasSlide, info(6)),
      guide: {
        intro: "Un sistema de trabajo, no una lista de funcionalidades: instrucciones, contexto, herramientas, especificaciones y validación.",
        sections: [
          { title: "Las cinco", body: "Instrucciones · Contexto · Herramientas · Especificaciones · Validación." },
        ],
        takeaway: "No se trata de escribir mejores prompts; se trata de trabajar mejor.",
      },
      speakerNotes: {
        script: "Introducí las cinco prácticas como un sistema de trabajo, no como una lista de funcionalidades de Codex.",
        timing: "0:45",
      },
    },
    {
      slug: "instrucciones",
      title: "Instrucciones",
      kicker: "Práctica 01 / 05",
      component: withSlideInfo(InstruccionesSlide, info(7)),
      guide: {
        intro: "AGENTS.md define cómo debe trabajar tu agente: convenciones, arquitectura, estándares y reglas del proyecto.",
        sections: [
          { title: "Qué lleva", body: "AGENTS.md · convenciones · arquitectura · estándares · reglas del proyecto." },
        ],
        takeaway: "No hagas que tu agente adivine cómo trabajás.",
      },
      speakerNotes: {
        script: "Mostrá cómo podemos definir instrucciones persistentes para Codex, por ejemplo las convenciones de un proyecto WordPress o JavaScript. El AGENTS.md de la slide es un ejemplo ilustrativo.",
        timing: "1:00",
      },
    },
    {
      slug: "contexto",
      title: "Contexto",
      kicker: "Práctica 02 / 05",
      component: withSlideInfo(ContextoSlide, info(8)),
      guide: {
        intro: "La IA necesita conocer tu proyecto: documentación, requerimientos, arquitectura y reglas de negocio.",
        sections: [
          { title: "Qué compartir", body: "Documentación · requerimientos · arquitectura · reglas de negocio." },
        ],
        takeaway: "El problema no siempre es que la IA no sepa programar; a veces no conoce nuestro proyecto.",
      },
      speakerNotes: {
        script: "Explicá cómo una base de conocimiento permite que Codex comprenda las decisiones y restricciones del proyecto, en lugar de trabajar únicamente con un prompt aislado.",
        timing: "1:00",
      },
    },
    {
      slug: "herramientas",
      title: "Herramientas",
      kicker: "Práctica 03 / 05",
      component: withSlideInfo(HerramientasSlide, info(9)),
      guide: {
        intro: "Dale a tu agente las herramientas correctas: Codex, MCP e integraciones con repositorios, documentación y servicios de desarrollo.",
        sections: [
          { title: "El equipo del agente", body: "Codex ejecuta el trabajo · MCP conecta servicios y herramientas de desarrollo · las integraciones acercan repositorios y documentación." },
        ],
        takeaway: "Un agente es más útil cuando puede actuar con el contexto y los permisos adecuados.",
      },
      speakerNotes: {
        script: "Explicá brevemente MCP (un puente entre herramientas) y las integraciones. No muestres configuraciones técnicas; enfocate en cómo mejoran el flujo de trabajo.",
        timing: "1:00",
      },
    },
    {
      slug: "especificaciones",
      title: "Especificaciones",
      kicker: "Práctica 04 / 05",
      component: withSlideInfo(EspecificacionesSlide, info(10)),
      guide: {
        intro: "Spec-Driven Development: primero definí, después construí. Problema, requerimientos, plan e implementación.",
        sections: [
          { title: "El flujo", body: "Problema → requerimientos → plan → implementación." },
        ],
        takeaway: "La calidad de una solución comienza con la claridad del problema.",
      },
      speakerNotes: {
        script: "Compará un prompt genérico como «creá una plataforma de registro» con una especificación que incluya usuarios, funcionalidades y criterios de aceptación.",
        timing: "1:00",
      },
    },
    {
      slug: "validacion",
      title: "Validación",
      kicker: "Práctica 05 / 05",
      component: withSlideInfo(ValidacionSlide, info(11)),
      guide: {
        intro: "Confiá en el proceso y verificá el resultado: code review, testing, seguridad y criterios de aceptación.",
        sections: [
          { title: "Cómo verificar", body: "Code review · testing · seguridad · criterios de aceptación." },
        ],
        takeaway: "Delegar la implementación no significa delegar la responsabilidad.",
      },
      speakerNotes: {
        script: "Codex puede ayudar a generar pruebas y revisar código, pero debemos evaluar los resultados. Una implementación que funciona no necesariamente es una implementación correcta o segura.",
        timing: "1:00",
      },
    },
    {
      slug: "cierre",
      title: "Construir mejores soluciones",
      kicker: "Cierre y contacto",
      component: withSlideInfo(CierreSlide, info(12)),
      guide: {
        intro: "El futuro no se trata de escribir más código, sino de construir mejores soluciones: aprender nuevas herramientas, construir soluciones a problemas reales y compartir conocimientos.",
        sections: [
          { title: "Contacto", body: "Frank Calderon · frankcalderon.dev · @frankcalderondev" },
        ],
        takeaway: "La IA puede escribir código; lo que construimos con ella sigue siendo nuestra responsabilidad.",
      },
      speakerNotes: {
        script: "Aprender nuevas herramientas y fortalecer los fundamentos. Construir soluciones a problemas reales. Compartir conocimientos para que más personas puedan crear tecnología. Cerrá con: «La IA puede escribir código. Lo que construimos con ella sigue siendo nuestra responsabilidad».",
        timing: "1:00",
      },
    },
  ],
};
