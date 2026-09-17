import assert from "node:assert/strict";
import { canScrollInDirection, wheelPixels } from "../lib/book-scroll.ts";

const page = { scrollTop: 0, scrollHeight: 1200, clientHeight: 600 };
assert.equal(canScrollInDirection(page, 100), true, "Read overflowing content first");
assert.equal(canScrollInDirection(page, -100), false, "At top, hand upward scrolling to book");
assert.equal(canScrollInDirection({ ...page, scrollTop: 300 }, -100), true);
assert.equal(canScrollInDirection({ ...page, scrollTop: 300 }, 100), true);
assert.equal(canScrollInDirection({ ...page, scrollTop: 599.5 }, 100), false, "Fractional bottom must not trap scrolling");
assert.equal(canScrollInDirection({ ...page, scrollTop: 600 }, -100), true, "Can read backwards from bottom");
assert.equal(canScrollInDirection({ ...page, scrollHeight: 500 }, 100), false, "Short pages turn without inner scrolling");
assert.equal(canScrollInDirection(page, 0), false);
assert.equal(wheelPixels(3, 1, 600), 48, "Normalize mouse wheel lines");
assert.equal(wheelPixels(1, 2, 600), 600, "Normalize page wheel units");
assert.equal(wheelPixels(12.5, 0, 600), 12.5, "Keep trackpad pixels");
console.log("Verified book scroll boundaries, reverse scrolling, short pages and wheel units.");
