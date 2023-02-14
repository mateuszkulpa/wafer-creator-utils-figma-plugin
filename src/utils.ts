import { UNIT_MULTIPLIER } from "./constants";

export default function toFinalUnit(value: number) {
  return value * UNIT_MULTIPLIER;
}