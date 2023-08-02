import {Method, Progress, VisitOptions} from "@inertiajs/core";


export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: App.Models.User;
    };
};

export type OfficeTypes = 'BR' | 'DO' | 'DAO' | 'RAO' | 'RM/CRM' | 'CB' | 'HO';

export interface Datatable<T> {
    current_page: number;
    data: T[],
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string | null;
    links: {
        url: string | null;
        label: string | null;
        active: boolean;
    }[],
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

/**
 * This will be used to Omit Inertia useForm built-in fields/props/methods
 */
export type InertiaFormKeys = keyof InertiaFormInterface<any>

export interface InertiaFormInterface<TForm extends Record<string, unknown>> {
    isDirty: boolean;
    errors: Partial<Record<keyof TForm, string>>;
    hasErrors: boolean;
    processing: boolean;
    progress: Progress | null;
    wasSuccessful: boolean;
    recentlySuccessful: boolean;

    data(): TForm;

    transform(callback: (data: TForm) => object): this;

    defaults(): this;

    defaults(field: keyof TForm, value: string): this;

    defaults(fields: Record<keyof TForm, string>): this;

    reset(...fields: (keyof TForm)[]): this;

    clearErrors(...fields: (keyof TForm)[]): this;

    setError(field: keyof TForm, value: string): this;

    setError(errors: Record<keyof TForm, string>): this;

    submit(method: Method, url: string, options?: Partial<VisitOptions>): void;

    get(url: string, options?: Partial<VisitOptions>): void;

    post(url: string, options?: Partial<VisitOptions>): void;

    put(url: string, options?: Partial<VisitOptions>): void;

    patch(url: string, options?: Partial<VisitOptions>): void;

    delete(url: string, options?: Partial<VisitOptions>): void;

    cancel(): void;
}

type oneToNine = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
type zeroToNine = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9
export type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
export type MM = `0${oneToNine}` | `1${0 | 1 | 2}`
export type DD = `${0}${oneToNine}` | `${1 | 2}${zeroToNine}` | `3${0 | 1}`
export type DateTypeYYYYMMDD = `${YYYY}-${MM}-${DD}`;
