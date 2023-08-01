import {Checkbox, Input, RadioGroup, Select} from "@wovosoft/wovoui";
import {
    communicationTypes,
    contactTypes,
    genders,
    identifierTypes,
    titles,
    getCommunicationType,
    getContactType,
    getCountry, getIdentifierType
} from "@/Options";

import {ButtonSizes, HTMLInputTypes} from "@wovosoft/wovoui/dist/types";
// @ts-ignore
import SelectCountry from "@/Components/Selectors/SelectCountry.vue";
// @ts-ignore
import SelectOccupation from "@/Components/Selectors/SelectOccupation.vue";

// @ts-ignore
import SelectDistrict from "@/Components/Selectors/SelectDistrict.vue";
// @ts-ignore
import SelectThana from "@/Components/Selectors/SelectThana.vue";
import {useI18n} from "vue-i18n";
import {computed, ComputedRef} from "vue";
import {isNil} from "lodash";
import isEmpty from "lodash/isEmpty";
import {formatDate, formatDateTime} from "@/Composables/useFormats";
import {allowAlphabets} from "@/Composables/usePrevents";

//without space
const isInvalidWord = (e) => {
    if (/[0-9'^$%&*()}{\]\["` ;:@#~?><|=_+-\/\\]/.test(e.key)) {
        e.preventDefault();
        return false;
    }
    return true;
};

//with space
const isInvalidName = (e) => {
    if (/[0-9'^$%&*()}{\]\["`;:@#~?><|=_+-\/\\]/.test(e.key)) {
        e.preventDefault();
        return false;
    }
    return true;
};

const isValidNumber = (e) => {

}

const isAlphaNumeric = (e) => {
    if (!/^[0-9a-zA-Z]+$/.test(e.key)) {
        e.preventDefault();
        return false;
    }
    return true;
}

export const initialBasic = {
    "id": null,
    "title": null,
    "first_name": null,
    "middle_name": null,
    "prefix": null,
    "last_name": null,
    "birthdate": null,
    "birth_place": null,
    "mothers_name": null,
    "fathers_name": null,
    "spouse_name": null,
    "gender": null,
    "ssn": null,
    "tax_number": null,
    "tax_reg_number": null,
    "passport_number": null,
    "passport_country": null,
    "id_number": null,
    "nationality1": null,
    "nationality2": null,
    "nationality3": null,
    "residence": null,
    "email": null,
    "occupation": null,
    "employer_name": null,
    "employer_address_id": null,
    "employer_phone_id": null,
    "source_of_wealth": null,
    "comments": null,
    "deceased": null,
    "date_deceased": null,
    "is_my_client": true,
}

export const basicKeys = [
    "id", "title", "first_name", "middle_name", "prefix", "last_name", "birthdate",
    "birth_place", "mothers_name", "fathers_name", "spouse_name", "gender", "ssn",
    "tax_number", "tax_reg_number", "passport_number", "passport_country", "id_number",
    "nationality1", "nationality2", "nationality3", "residence", "email", "occupation",
    "employer_name", "employer_address_id", "employer_phone_id", "source_of_wealth", "comments",
    "deceased", "date_deceased", "is_my_client",
];

export const identificationKeys = [
    "id",
    "type",
    "number",
    "issue_date",
    "expiry_date",
    "issue_country",
    "comments",
];

export const initialIdentification = {
    "id": null,
    "type": null,
    "number": null,
    "issue_date": null,
    "expiry_date": null,
    "issue_country": "BD",
    "comments": null,
}

export const initialAddress = {
    id: null,
    address_type: null,
    address: null,
    town: null,
    city: null,
    zip: null,
    country_code: "BD",
    comments: null,
};

export const initialPhone = {
    id: null,
    tph_contact_type: null,
    tph_communication_type: null,
    tph_country_prefix: "BD",
    tph_number: null,
    tph_extension: null,
    comments: null,
}


type BasicComponentType = {
    key: string
    label?: string | null
    component: unknown,
    attrs?: {
        textField?: string
        valueField?: string
        options?: any[]
        required?: boolean
        size?: ButtonSizes
        placeholder?: string | null
        type?: HTMLInputTypes
        switch?: boolean,
        onKeypress?: any,
        maxLength?: number,
        minLength?: number
    }
};
export default function (formModel = null) {
    const {t} = useI18n();

    const titleChanged = (e) => {
        if (!formModel) {
            return;
        }
        if (e.target.value === 'Mr.') {
            formModel.gender = "M";
        } else if (e.target.value === 'Mrs.') {
            formModel.gender = "F";
        }
    }

    const basicFields = computed(() => [
        {
            key: 'title',
            label: t('general.title'),
            component: RadioGroup,
            attrs: {
                textField: 'text',
                valueField: 'value',
                options: titles,
                required: true,
                inline: true,
                size: 'sm',
                onChange: titleChanged
            }
        },
        {
            key: 'gender',
            label: t('general.gender'),
            component: RadioGroup,
            attrs: {
                inline: true,
                textField: 'text',
                valueField: 'value',
                options: genders,
                required: true,
                size: 'sm'
            }
        },
        {
            key: 'first_name',
            label: t('general.first_name'),
            component: Input,
            hint: 'Type First Word of the full name',
            attrs: {
                placeholder: 'First Name',
                required: true,
                size: 'sm',
                onKeypress: isInvalidWord
            }
        },
        {
            key: 'last_name',
            label: t('general.last_name'),
            component: Input,
            hint: 'Rest words of the full name',
            attrs: {
                placeholder: 'Last Name',
                required: true,
                size: 'sm',
                onKeypress: allowAlphabets
            }
        },
        {
            key: 'mothers_name',
            label: t('general.mothers_name'),
            component: Input,
            attrs: {
                placeholder: t('general.mothers_name'),
                required: true,
                size: 'sm',
                onKeypress: isInvalidName
            }
        },
        {
            key: 'fathers_name',
            label: t('general.fathers_name'),
            component: Input,
            attrs: {
                placeholder: t('general.fathers_name'),
                required: true,
                size: 'sm',
                onKeypress: isInvalidName
            }
        },

        {
            key: 'spouse_name',
            label: t('general.spouse_name'),
            component: Input,
            attrs: {
                required: !!!formModel?.fathers_name,
                placeholder: t('general.spouse_name'),
                size: 'sm',
                onKeypress: isInvalidName
            }
        },

        {
            key: 'birthdate',
            label: t('general.birthdate'),
            component: Input,
            attrs: {
                type: 'date',
                size: 'sm',
                required: true,
            }
        },
        {
            key: 'birth_place',
            label: t('general.birth_place'),
            component: SelectDistrict,
            attrs: {
                size: 'sm'
            }
        },
        {
            key: 'ssn',
            label: t('general.ssn'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'NID (SSN)',
                required: !formModel.passport_number,
                onKeypress: isValidNumber,
                minLength: 10,
                maxLength: 17
            }
        },
        {
            key: 'occupation',
            label: t('general.occupation'),
            component: SelectOccupation,
            attrs: {
                required: true
            }
        },
        {
            key: 'id_number',
            label: 'Birth Registration No',
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'Birth Registration No.',
                onKeypress: isValidNumber,
                maxLength: 17
            }
        },
        {
            key: 'nationality1',
            component: SelectCountry,
            attrs: {
                required: true
            }
        },
        {
            key: 'residence',
            component: SelectCountry,
            attrs: {
                required: true
            }
        },
        {
            key: 'email',
            label: t('general.email'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: t('general.email'),
                type: 'email'
            }
        },

        {
            key: 'employer_name',
            label: t('general.employer_name'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: t('general.employer_name'),
                onKeypress: isInvalidName
            }
        },
        {
            key: 'tax_number',
            label: t('general.tax_number'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: t('general.tax_number'),
                onKeypress: isValidNumber,
                maxLength: 17,
            }
        },
        {
            key: 'tax_reg_number',
            label: t('general.tax_reg_number'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'Tax Reg. No',
                onKeypress: isValidNumber,
                maxLength: 17,
            }
        },
        {
            key: 'source_of_wealth',
            label: t('general.source_of_wealth'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: t('general.source_of_wealth'),
            }
        },
        {
            key: 'comments',
            label: t('general.comments'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: t('general.comments'),
            }
        },
        {
            key: 'passport_number',
            label: t('general.passport_number'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: t('general.passport_number'),
                onKeypress: isAlphaNumeric,
                minLength: 8,
                maxLength: 17,
                required: !formModel.ssn
            }
        },
        {
            key: 'passport_country',
            label: t('general.passport_country'),
            component: SelectCountry,
            attrs: {
                required: !isEmpty(formModel.passport_number)
            }
        },
        {
            key: 'is_my_client',
            label: t('general.is_my_client'),
            component: Checkbox,
            attrs: {
                size: 'sm',
                switch: true
            }
        },
        {
            key: 'deceased',
            label: t('general.deceased'),
            component: Checkbox,
            attrs: {
                size: 'sm',
                switch: true
            }
        },
        {
            key: 'date_deceased',
            label: t('general.date_deceased'),
            component: Input,
            attrs: {
                type: 'date',
                size: 'sm',
            }
        },
    ]);


    const identificationComponents: {
        key?: string
        component?: unknown
        attrs?: {
            options?: { text: string, value: string }[],
            valueField?: string,
            textField?: string
            size?: ButtonSizes
            required?: boolean
            type?: HTMLInputTypes,
            onKeypress?: any,
            minLength?: number,
            maxLength?: number
        }
    }[] = [
        {
            key: 'type',
            component: Select,
            attrs: {
                options: identifierTypes,
                textField: 'text',
                valueField: 'value',
                size: 'sm',
                required: true
            }
        },
        {
            key: 'number',
            component: Input,
            attrs: {
                size: 'sm',
                required: true
            }
        },
        {
            key: 'issue_date',
            component: Input,
            attrs: {
                size: 'sm',
                type: 'date'
            }
        },
        {
            key: 'expiry_date',
            component: Input,
            attrs: {
                size: 'sm',
                type: 'date'
            }
        },
        {
            key: 'issue_country',
            component: SelectCountry,
        },
        {
            key: 'comments',
            component: Input,
            attrs: {
                size: 'sm',
            }
        },
    ];

    const addressFields = [
        {key: 'address_type', label: 'Type'},
        {key: 'city', label: 'District'},
        {key: 'town', label: 'Thana'},
        {key: 'address'},
        {key: 'zip'},
        {
            key: 'country_code', label: 'Country',
            formatter: (v, k) => getCountry(v[k])?.text
        },
        {key: 'comments'},
        {key: 'action', tdClass: 'text-end', thClass: 'text-end'},
    ];

    const identificationFields = computed(() => [
        {
            key: 'type',
            formatter: (v, k) => getIdentifierType(v[k])?.text
        },
        {
            key: 'number'
        },
        {
            key: 'issue_date',
            label: t('general.issue_date', 'Issue Country'),
            formatter: (v, k) => formatDate(v[k])
        },
        {
            key: 'expiry_date',
            label: t('general.expiry_date', 'Expiry Country'),
            formatter: (v, k) => formatDate(v[k])
        },
        {
            key: 'issue_country',
            label: t('general.issue_country', 'Issue Country'),
            formatter: (v, k) => getCountry(v[k])?.text || v[k]
        },
        // {
        //     key: 'comments'
        // },
        // {
        //     key: 'created_at',
        //     label: t('general.created_at', 'Created At'),
        //     formatter: (v, k) => formatDateTime(v[k])
        // },
        {
            key: 'action',
            tdClass: 'text-end',
            thClass: 'text-end'
        }
    ]);


    const addressComponents = [
        {
            key: 'address_type',
            component: Select,
            attrs: {
                options: contactTypes,
                textField: 'text',
                valueField: 'value',
                size: 'sm',
                required: true
            }
        },
        {
            key: 'address',
            label: 'Address',
            component: Input,
            attrs: {
                size: 'sm',
                required: true
            }
        },
        {
            key: 'city',
            label: 'District',
            component: SelectDistrict,
            attrs: {
                size: 'sm',
                required: true
            }
        },
        {
            key: 'town',
            label: 'Thana',
            component: SelectThana,
            attrs: {
                required: true,
                size: 'sm'
            }
        },
        {
            key: 'zip',
            component: Input,
            attrs: {
                size: 'sm',
                required: true
            }
        },
        {
            key: 'country_code',
            component: SelectCountry
        },
        {
            key: 'comments',
            component: Input,
            attrs: {
                size: 'sm'
            }
        },
    ]

    const phoneFields = [
        {
            key: 'tph_contact_type', label: 'Type',
            formatter: (v, k) => getContactType(v[k])?.text
        },
        {
            key: 'tph_communication_type', label: 'Com. Type',
            formatter: (v, k) => getCommunicationType(v[k])?.text
        },
        {
            key: 'tph_country_prefix', label: 'Prefix',
            formatter: (v, k) => getCountry(v[k])?.text
        },
        {key: 'tph_number', label: 'Number'},
        {key: 'tph_extension', label: 'Extension'},
        {key: 'comments', label: 'Comments'},
        {key: 'action', tdClass: 'text-end', thClass: 'text-end'},
    ];


    const phoneComponents = [
        {
            key: 'tph_contact_type',
            label: 'Contact Type',
            component: Select,
            attrs: {
                size: 'sm',
                textField: 'text',
                valueField: 'value',
                options: contactTypes,
                required: true
            }
        },
        {
            key: 'tph_communication_type',
            label: 'Communication Type',
            component: Select,
            attrs: {
                size: 'sm',
                textField: 'text',
                valueField: 'value',
                options: communicationTypes,
                required: true
            }
        },
        {
            key: 'tph_country_prefix',
            label: 'Country',
            component: SelectCountry,
            attrs: {
                required: true
            }
        },
        {
            key: 'tph_number',
            label: 'Number',
            component: Input,
            attrs: {
                size: 'sm',
                required: true,
                placeholder: 'Contact Number'
            }
        },
        {
            key: 'comments',
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'Comments'
            }
        }
    ];

    const extraSearchComponents = computed(() => [
        {
            key: 'ssn',
            label: t('general.nid'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'National Identification No.',
                maxLength: 17
            }
        },
        // {
        //     key: 'birthdate',
        //     label: t('general.birthdate'),
        //     component: Input,
        //     attrs: {
        //         size: 'sm',
        //         type: 'date',
        //     }
        // },
        {
            key: 'passport_number',
            label: t('general.passport_number'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: t('general.passport_number'),
                maxLength: 17
            }
        },
        // {
        //     key: 'passport_country',
        //     label: t('general.passport_country'),
        //     component: SelectCountry
        // },
        {
            key: 'id_number',
            label: t('general.id_number'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: t('general.id_number'),
                onKeypress: isValidNumber,
                maxLength: 17
            }
        },
        // {
        //     key: 'nationality1',
        //     label: t('general.nationality1'),
        //     component: SelectCountry
        // },
        // {
        //     key: 'nationality2',
        //     component: SelectCountry
        // },
        // {
        //     key: 'nationality3',
        //     component: SelectCountry
        // },
        // {
        //     key: 'residence',
        //     label: t('general.residence'),
        //     component: SelectCountry,
        //     attrs: {
        //         required: true
        //     }
        // },
        // {
        //     key: 'occupation',
        //     label: t('general.occupation'),
        //     component: SelectOccupation,
        //     attrs: {
        //         required: true
        //     }
        // },
        {
            key: 'tax_number',
            label: t('general.tax_number'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'Tax Number',
                maxLength: 17
            }
        },
        // {
        //     key: 'tax_reg_number',
        //     component: Input,
        //     attrs: {
        //         size: 'sm',
        //         placeholder: 'Tax Registration Number',
        //         maxLength: 17
        //     }
        // },
        // {
        //     key: 'source_of_wealth',
        //     component: Input,
        //     attrs: {
        //         size: 'sm',
        //         placeholder: 'Source of Wealth'
        //     }
        // },
        // {
        //     key: 'is_my_client',
        //     label: t('general.is_my_client'),
        //     component: Checkbox,
        //     attrs: {
        //         class: 'form-control form-control-sm',
        //         switch: true,
        //         uncheckedValue: null,
        //         value: true,
        //     }
        // },
        // {
        //     key: 'deceased',
        //     label: t('general.deceased'),
        //     component: Checkbox,
        //     attrs: {
        //         class: 'form-control form-control-sm',
        //         switch: true,
        //         uncheckedValue: null,
        //         value: true,
        //     }
        // },
        // {
        //     key: 'deceased_date',
        //     label: t('general.deceased_date'),
        //     component: Input,
        //     attrs: {
        //         size: 'sm',
        //         type: 'date',
        //     }
        // },
    ]);

    return {
        basicFields, identificationComponents,
        identificationFields,
        addressFields, addressComponents, phoneFields,
        phoneComponents, extraSearchComponents
    };
}
