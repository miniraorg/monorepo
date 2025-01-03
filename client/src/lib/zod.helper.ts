import * as zod from "zod";
import {t} from "i18next";

export abstract class zh {
    private static z = zod;

    public static string = () => {
        return this.z.string();
    };

    public static number = () => {
        return this.z.number();
    };

    public static any = () => {
        return this.z.any();
    };

    public static hours = () => {
        return this.z
            .any()
            .transform((val) => parseFloat(val))
            .refine(
                (val) => {
                    return !isNaN(val) && val % 0.5 === 0;
                },
                {
                    message: t("validation.mustBeMultipleOfHalf"),
                },
            );
    };

    public static date = () => {
        return this.z.string().refine(
            (val) => {
                const date = new Date(val);
                return !isNaN(date.getTime());
            },
            {
                message: t("custom-validation.required"),
            },
        );
    };

    public static id = (options?: {
        optional: boolean,
    }) => {
        const { optional = false } = options || {};

        // create id validator not allow 0
        return this.z
            .any()
            .refine(
                (val) => {
                    const n = Number(val);
                    return n > 0 || optional;
                },
                {
                    message: t("custom-validation.cannotBeEmpty"),
                },
            )

    };

    public static min = (min: number) => {
        return this.any()
            .transform(v => Number(v))
            .refine(
                (val) => {
                    return val >= min;
                },
                {
                    message: t("validation.min", { min }),
                },
            )
    };

    public static max = (max: number) => {
        return this.z.string().max(max, {
            message: t("validation.max", { max }),
        });
    };
}
