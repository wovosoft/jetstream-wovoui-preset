import {usePage} from "@inertiajs/vue3";
import Permissions from "@/Composables/thePermissions";

const page = usePage();

function can(permission: string | string[]) {
    const user = page.props.auth?.user?.permissions;

    if (typeof permission === "string") {
        return user?.permissions?.includes(permission);
    }

    if (Array.isArray(permission) && permission.length > 0) {
        for (let x of permission) {
            if (!user?.permissions?.includes(x)) {
                return false;
            }
        }
        return true;
    }

    return false;
}

function cannot(permission: string | string[]) {
    return !can(permission);
}

function cannotAny(permission: string | string[]) {
    return !canAny(permission);
}

function canAny(permission: string | string[] | boolean) {
    if (typeof permission === "boolean") {
        return permission;
    }

    const user = page.props?.auth?.user;
    if (typeof permission === "string") {
        return user?.permissions?.includes(permission);
    }

    if (Array.isArray(permission) && permission.length > 0) {
        for (let x of permission) {
            if (user?.permissions?.includes(x)) {
                return true;
            }
        }
    }

    return false;
}


export {can, canAny, cannot, cannotAny, Permissions};
