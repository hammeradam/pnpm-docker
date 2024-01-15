import { z, type TypeOf, ZodObject } from 'zod';

export const createEnv = <C extends ZodObject<any>>(config: C) => {
    let env = {} as TypeOf<C>;

    try {
        env = config.parse(process.env);
    } catch (err) {
        if (err instanceof z.ZodError) {
            const { fieldErrors } = err.flatten();
            const errorMessage = Object.entries(fieldErrors)
                .map(([field, errors]) =>
                    errors ? `${field}: ${errors.join(', ')}` : field,
                )
                .join('\n  ');
            throw new Error(
                `Missing environment variables:\n  ${errorMessage}`,
            );
        }
    }

    return env;
};
