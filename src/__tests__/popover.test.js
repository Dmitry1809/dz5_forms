/** @jest-environment jsdom */
// Выходим из __tests__ и заходим в js/app
import { PopoverWidget } from "../js/app";

describe("Popover Widget", () => {
  beforeEach(() => {
    document.body.innerHTML =
      '<button id="btn" data-toggle="popover" title="T" data-content="C">Btn</button>';
    new PopoverWidget();
  });

  test("render and toggle", () => {
    const btn = document.getElementById("btn");
    btn.click();
    expect(document.querySelector(".popover.show")).toBeTruthy();
    btn.click();
    expect(document.querySelector(".popover.show")).toBeFalsy();
  });
});
