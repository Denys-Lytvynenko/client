import { ChangeEvent, useCallback, useState } from "react";

export const useTextInput = (): [
    string,
    (event: ChangeEvent<HTMLInputElement>) => void,
    (value?: string) => void
] => {
    const [value, setValue] = useState<string>("");

    const onChangeHandler = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
        []
    );

    const reset = useCallback(
        (resetValue?: string) => setValue(resetValue || ""),
        []
    );

    return [value, onChangeHandler, reset];
};
