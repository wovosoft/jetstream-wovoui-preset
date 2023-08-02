import route from "ziggy-js";
import {Permissions} from "@/Composables/usePermissions";
import {useI18n} from "vue-i18n";
import {computed} from "vue";

type MenuItem = {
    text: string;
    permissions?: boolean | string[];
    href?: string;
    children?: MenuItem[],
    method?: any,
    attrs?: any,
    divider?: boolean | null
}

export default function () {
    const {t} = useI18n();
    return computed<MenuItem[]>(() => [
        // {
        //     text: 'Dashboard',
        //     href: route("dashboard")
        // },
        {
            text: t("general.user_management"),
            permissions: [
                Permissions.VIEW_USERS,
                Permissions.CREATE_USERS,
                Permissions.UPDATE_USERS,
                Permissions.DELETE_USERS
            ],
            children: [
                {
                    text: t("general.users"),
                    permissions: [
                        Permissions.VIEW_USERS,
                        Permissions.CREATE_USERS,
                        Permissions.UPDATE_USERS,
                        Permissions.DELETE_USERS
                    ],
                    href: route("users.index")
                },
                {
                    text: t("general.roles"),
                    permissions: [
                        Permissions.VIEW_ROLES,
                        Permissions.CREATE_ROLES,
                        Permissions.UPDATE_ROLES,
                        Permissions.DELETE_ROLES
                    ],
                    href: route("roles.index")
                },
                {
                    text: t("general.permissions"),
                    permissions: [
                        Permissions.VIEW_PERMISSIONS,
                        Permissions.CREATE_PERMISSIONS,
                        Permissions.UPDATE_PERMISSIONS,
                        Permissions.DELETE_PERMISSIONS
                    ],
                    href: route("permissions.index")
                }
            ]
        },
    ]);
}



