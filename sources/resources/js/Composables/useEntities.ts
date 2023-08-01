import {getEntityPersonRole, entityLegalFormTypes} from "@/Options";
import {Checkbox, Input, Select} from "@wovosoft/wovoui";
import SelectDistrict from "@/Components/Selectors/SelectDistrict.vue";
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {allowNumbers} from "@/Composables/usePrevents";

export const initialEntity = {
    id: null,
    is_my_client: null,
    name: null,
    commercial_name: null,
    incorporation_legal_form: null,
    incorporation_number: null,
    business: null,
    email: null,
    url: null,
    incorporation_state: null,
    incorporation_country_code: null,
    incorporation_date: null,
    business_closed: null,
    date_business_closed: null,
    tax_number: null,
    tax_registration_number: null,
    comments: null,
};

export const initialDirector = {
    id: null,
    role: null,
    person_id: null
};


export default function (formModel = {}) {
    const {t} = useI18n();
    const basicFields = computed(() => [
        {
            key: "is_my_client",
            label: t('general.is_my_client'),
            component: Checkbox,
            attrs: {
                switch: true
            }
        },
        {
            key: "name",
            label: t('general.name'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'Entity Name',
                required: true,
                maxLength: 100
            }
        },
        {
            key: "commercial_name",
            label: t('general.commercial_name'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'Commercial name',
                maxLength: 100
            }
        },
        {
            key: "incorporation_legal_form",
            label: t('general.incorporation_legal_form'),
            component: Select,
            attrs: {
                options: entityLegalFormTypes,
                size: "sm",
                textField: "text",
                valueField: "value"
            }
        },
        {
            key: "incorporation_date",
            label: t('general.incorporation_date'),
            component: Input,
            attrs: {
                size: "sm",
                type: "date",
                textField: "text",
                valueField: "value",
                required: !!formModel['incorporation_legal_form']
            }
        },
        {
            key: "incorporation_number",
            label: t('general.incorporation_number'),
            component: Input,
            attrs: {
                required: true,
                size: 'sm',
                placeholder: 'Incorporation Number',
                maxLength: 50
            }
        },
        {
            key: "business",
            label: t('general.business'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'Business',
                required: true
            }
        },
        {
            key: "email",
            label: t('general.email'),
            component: Input,
            attrs: {
                type: "email",
                size: "sm",
                placeholder: 'Entity Email Address'
            }
        },
        {
            key: "url",
            label: t('general.url'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'Entity Company URL'
            }
        },
        {
            key: "incorporation_state",
            label: t('general.incorporation_state'),
            component: SelectDistrict,
            attrs: {
                size: 'sm',
                required: true
            }
        },
        // {
        //     key: "incorporation_country_code",
        //     component: SelectCountry
        // },

        {
            key: "business_closed",
            label: t('general.business_closed'),
            component: Checkbox,
            attrs: {
                switch: true
            }
        },
        {
            key: "date_business_closed",
            label: t('general.date_business_closed'),
            component: Input,
            attrs: {
                size: "sm",
                type: "date",
                required: !!formModel['business_closed']
            }
        },
        {
            key: "tax_number",
            label: t('general.tax_number'),
            component: Input,
            attrs: {
                placeholder: 'TIN Number',
                size: 'sm',
                onKeypress: allowNumbers,
                maxLength: 12
            }
        },
        {
            key: "tax_registration_number",
            label: t('general.tax_reg_number'),
            component: Input,
            attrs: {
                size: 'sm',
                placeholder: 'TAX Registration Number',
                maxLength: 20
            }
        },
        {
            key: "comments",
            label: t('general.comments'),
            component: Input,
            attrs: {
                placeholder: "Comment",
                size: 'sm',
                maxLength: 100
            }
        },
    ]);

    const directorFields = computed(() => [
        {key: 'id', label: t('general.id'),},
        {
            key: 'role',
            label: t('general.role'),
            formatter: (v, k) => getEntityPersonRole(v[k])?.text
        },
        {
            key: 'person',
            label: t('general.person'),
            formatter: (v, k) => [
                v[k]?.title,
                v[k]?.first_name,
                v[k]?.middle_name,
                v[k]?.last_name,
                `( ${v[k]?.id} )`
            ].join(" ")
        },
        {
            key: "action",
            label: t('general.action'),
            thClass: "text-end",
            tdClass: "text-end"
        }
    ]);

    return {
        basicFields,
        directorFields
    }
}

