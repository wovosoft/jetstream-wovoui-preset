//validation using yup

import {computed} from "vue";
import isEmpty from "lodash/isEmpty";

export default function (schema, data) {

    const errors = computed(() => {
        try {
            schema.validateSync(data, {abortEarly: false});
            return null;
        } catch (e) {
            let out = {};
            e.inner?.forEach(error => {
                out[error.path] = error.message;
            });
            return out;
        }
    });

    const isValid = computed(() => !errors.value || isEmpty(errors.value));

    function stateOf(of: string): false | null {
        if (!!errors.value?.hasOwnProperty(of)) {
            return false;
        }
        return null;
    }

    return {
        errors,
        isValid,
        stateOf
    }
}
