import {
  Button,
  Checkbox,
  Columns,
  Container,
  Muted,
  Text,
  TextboxNumeric,
  Toggle,
  VerticalSpace,
} from "@create-figma-plugin/ui";
import { emit } from "@create-figma-plugin/utilities";
import { h } from "preact";
import { useCallback, useEffect, useState } from "preact/hooks";
import { DEFAULT_MARGIN_TOP, DEFAULT_WAFER_SIZE } from "../constants";
import { CloseHandler, CreateWaferHandler, RemoveWaferHandler } from "../types";

export default function CreateWaferDialog() {
  const [size, setSize] = useState<number | null>(DEFAULT_WAFER_SIZE);
  const [sizeString, setSizeString] = useState<string>(
    DEFAULT_WAFER_SIZE.toString()
  );

  const [marginTop, setMarginTop] = useState<number | null>(DEFAULT_MARGIN_TOP);
  const [marginTopString, setMarginTopString] = useState<string>(
    DEFAULT_MARGIN_TOP.toString()
  );

  const [generateMinatures, setGenerateMinatures] = useState<boolean>(false);

  useEffect(() => {
    emit<CreateWaferHandler>("CREATE_WAFER", {
      size: size ?? DEFAULT_WAFER_SIZE,
      marginTop: marginTop ?? DEFAULT_MARGIN_TOP,
      generateMinatures: generateMinatures,
    });
  }, [size, marginTop, generateMinatures]);

  const handleCloseButtonClick = useCallback(() => {
    emit<CloseHandler>("CLOSE");
  }, []);

  const handleRemoveButtonClick = useCallback(() => {
    emit<RemoveWaferHandler>("REMOVE_WAFER");
  }, []);

  return (
    <Container space="medium">
      <VerticalSpace space="large" />
      <Text>
        <Muted>Size</Muted>
      </Text>
      <VerticalSpace space="small" />
      <TextboxNumeric
        onNumericValueInput={setSize}
        onValueInput={setSizeString}
        value={sizeString}
        variant="border"
      />
      <VerticalSpace space="small" />
      <TextboxNumeric
        onNumericValueInput={setMarginTop}
        onValueInput={setMarginTopString}
        value={marginTopString}
        variant="border"
      />
      <VerticalSpace space="small" />
      <Toggle onValueChange={setGenerateMinatures} value={generateMinatures}>
        <Text>Generate Minatures</Text>
      </Toggle>
      <VerticalSpace space="small" />
      <Columns space="extraSmall">
        <Button fullWidth onClick={handleCloseButtonClick}>
          Save
        </Button>
        <Button fullWidth onClick={handleRemoveButtonClick} secondary>
          Remove
        </Button>
      </Columns>
      <VerticalSpace space="small" />
    </Container>
  );
}
