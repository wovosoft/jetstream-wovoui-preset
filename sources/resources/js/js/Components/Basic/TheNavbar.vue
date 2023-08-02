<template>
    <Navbar sticky="top" class="p-0" variant="dark" style="background-color: #1f2937 !important;">
        <template #brand>
            <Link class="navbar-brand" :href="route('dashboard')">
                {{ app_name }}
            </Link>
        </template>
        <template #default="{collapsed}">
            <Collapse is-nav :visible="collapsed">
                <Nav class="me-auto mb-2 mb-lg-0" navs>
                    <template v-for="menu in menus">
                        <template v-if="canAny(menu.permissions)">
                            <NavItemDropdown :text="menu.text" v-if="Array.isArray(menu.children)">
                                <template v-for="child in menu.children">
                                    <DropdownDivider
                                        v-if="child.hasOwnProperty('divider') && child.divider"
                                    />
                                    <li role="presentation" v-else-if="canAny(child.permissions)">
                                        <a v-if="child['raw']"
                                           class="dropdown-item d-flex justify-content-between"
                                           :target="child['external']?'_blank':null"
                                           :href="child['href']">
                                            <span>{{ child.text }}</span>
                                            <Link45deg v-if="child['external']" class="text-primary"/>
                                        </a>
                                        <Link class="dropdown-item"
                                              v-else
                                              :href="child.href"
                                              v-bind="child.attrs"
                                              :method="child.method||'get'">
                                            {{ child.text }}
                                        </Link>
                                    </li>
                                </template>
                            </NavItemDropdown>
                            <li class="nav-item" v-else>
                                <Link class="nav-link"
                                      :href="menu.href"
                                      v-bind="menu.attrs"
                                      :method="menu.method||'get'">
                                    {{ menu.text }}
                                </Link>
                            </li>
                        </template>
                    </template>
                </Nav>
                <Nav class="ms-auto">
                    <li class="nav-item" v-if="isLoading">
                        <div class="nav-link">
                            <Spinner
                                size="sm"
                                variant="light"
                            />
                        </div>
                    </li>
                    <NavItemDropdown menu-class="pt-0" :text="'Lang ('+$i18n.locale+')'" align="end">
                        <DropdownItem
                            v-for="(locale,locale_key) in $i18n.availableLocales"
                            @click="switchLanguage(locale)"
                            :key="locale_key">
                            {{ locale }}
                        </DropdownItem>
                    </NavItemDropdown>
                    <NavItemDropdown
                        menu-class="pt-0"
                        :text="$page.props?.auth?.user?.name"
                        align="end">
                        <div class="dropdown-header">
                            {{ $page.props?.auth?.user?.name }}
                        </div>
                        <DropdownDivider/>
                        <li role="presentation">
                            <Link class="dropdown-item" :href="route('profile.show')">
                                <Person/>
                                Profile
                            </Link>
                        </li>
                        <DropdownItem @click.prevent="tryLogout">
                            <BoxArrowRight/>
                            Logout
                        </DropdownItem>
                    </NavItemDropdown>
                </Nav>
            </Collapse>
        </template>
    </Navbar>
</template>

<script lang="ts" setup>
import {Collapse, Nav, NavItemDropdown, DropdownItem, DropdownDivider, Spinner} from "@wovosoft/wovoui";
import {Link, router} from '@inertiajs/vue3';
import {Navbar} from "@wovosoft/wovoui";
import route from "ziggy-js";
import {PropType} from "vue";
import useMenus from "@/Composables/useMenus";
import {BoxArrowRight, Link45deg, Person} from "@wovosoft/wovoui-icons";
import {canAny} from "@/Composables/usePermissions";
import {useI18n} from "vue-i18n";
import {isLoading} from "@/Composables/useLoading";

const i18n = useI18n();

defineProps({
    app_name: String as PropType<string>
});

const menus = useMenus();

function tryLogout() {
    router.post(route('logout'));
}

function switchLanguage(locale: string) {
    i18n.locale.value = locale;
    localStorage.setItem('locale', locale)
}
</script>

