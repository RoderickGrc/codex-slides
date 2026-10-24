import { describe, expect, it } from "vitest";
import { decks } from ".";
import { talkDecks } from "./talks";

describe("DevDay decks", () => {
  it("opens with the event deck followed by the six talks", () => {
    expect(decks[0].slug).toBe("devday-exchange-san-salvador");
    expect(talkDecks).toHaveLength(6);
    expect(new Set(talkDecks.map((deck) => deck.speaker?.id)).size).toBe(6);
  });

  it("keeps deck slugs, slide slugs and question ids unique", () => {
    expect(new Set(decks.map((deck) => deck.slug)).size).toBe(decks.length);
    const questionIds = decks.flatMap((deck) =>
      deck.slides.flatMap((slide) => (slide.question ? [slide.question.id] : [])),
    );
    expect(new Set(questionIds).size).toBe(questionIds.length);
    for (const deck of decks) {
      const slugs = deck.slides.map((slide) => slide.slug);
      expect(new Set(slugs).size, deck.slug).toBe(slugs.length);
    }
  });

  it("starts shared-structure decks with the 00 cover and ends their talks with questions", () => {
    // decisions-api is built slide-by-slide from Frank's PPTX (12 slides, no
    // shared cover/brief/questions), so it opts out of the defineTalk shape.
    const sharedDecks = decks.filter((deck) => deck.slug !== "decisions-api");
    const sharedTalkDecks = talkDecks.filter((deck) => deck.slug !== "decisions-api");
    for (const deck of sharedDecks) {
      expect(deck.firstSlideNumber).toBe(0);
      expect(deck.slides[0].slug).toBe("espera");
      expect(deck.slides[0].question).toBeUndefined();
    }
    for (const deck of sharedTalkDecks) {
      expect(deck.slides.at(-1)?.slug).toBe("preguntas");
    }
  });
});
