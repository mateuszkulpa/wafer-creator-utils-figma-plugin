import { on, once, showUI } from "@create-figma-plugin/utilities";
import {
  A4_HEIGHT,
  A4_WIDTH,
  MINATURES_COUNT,
  MINATURE_SIZE,
  UNIT_MULTIPLIER,
} from "./constants";

import {
  CloseHandler,
  CreateWaferHandler,
  RemoveWaferHandler,
  WaferArgs,
} from "./types";
import toFinalUnit from "./utils";

export default function () {
  let currentFrame: FrameNode | undefined;

  const createWafer = (args: WaferArgs) => {
    if (currentFrame) currentFrame.remove();
    currentFrame = figma.createFrame();
    currentFrame.resize(
      A4_WIDTH * UNIT_MULTIPLIER,
      A4_HEIGHT * UNIT_MULTIPLIER
    );

    const [selectedNode] = figma.currentPage.selection;

    const rect = (selectedNode as RectangleNode).clone();
    rect.resize(toFinalUnit(args.size), toFinalUnit(args.size));
    rect.cornerRadius = toFinalUnit(args.size);
    rect.x = toFinalUnit((A4_WIDTH - args.size) / 2);
    rect.y = toFinalUnit(args.marginTop);
    currentFrame.appendChild(rect);

    if (args.generateMinatures) {
      for (let i = 0; i < MINATURES_COUNT; i++) {
        const rect = (selectedNode as RectangleNode).clone();
        rect.resize(toFinalUnit(MINATURE_SIZE), toFinalUnit(MINATURE_SIZE));
        rect.cornerRadius = toFinalUnit(MINATURE_SIZE);
        rect.x = toFinalUnit(5 + (MINATURE_SIZE + 20 / 3) * i);
        rect.y = toFinalUnit(args.marginTop + args.size + 5);
        currentFrame.appendChild(rect);
      }
    }

    figma.currentPage.appendChild(currentFrame);
  };

  on<CreateWaferHandler>("CREATE_WAFER", (args) => {
    createWafer(args);
  });

  on<RemoveWaferHandler>("REMOVE_WAFER", () => {
    currentFrame?.remove();
    figma.closePlugin();
  });

  once<CloseHandler>("CLOSE", function () {
    figma.closePlugin();
  });

  showUI({
    height: 200,
    width: 200,
  });
}
