import { EventHandler } from "@create-figma-plugin/utilities";

export type WaferArgs = {
  size: number;
  marginTop: number;
  generateMinatures: boolean;
};

export interface RemoveWaferHandler extends EventHandler {
  name: "REMOVE_WAFER";
  handler: () => void;
}

export interface CreateWaferHandler extends EventHandler {
  name: "CREATE_WAFER";
  handler: (args: WaferArgs) => void;
}

export interface CreateRectanglesHandler extends EventHandler {
  name: "CREATE_RECTANGLES";
  handler: (count: number) => void;
}

export interface CloseHandler extends EventHandler {
  name: "CLOSE";
  handler: () => void;
}
