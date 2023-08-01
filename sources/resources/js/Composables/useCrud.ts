import {useForm} from "@inertiajs/vue3";
import {$set} from "@/Composables/useHelpers";
import route from "ziggy-js";
import {addToast} from "@/Composables/useToasts";
import {ref} from "vue";

export default function (formComponents, props) {
    const isShownEdit = ref<boolean>(false);

    let initialValue = {};
    [
        ...formComponents.map(component => component.key), 'id'
    ].forEach(key => initialValue[key] = formComponents.find(i => i.key === key)?.initial || null);

    const currentItem = useForm(initialValue);


    function showEdit(item: { [key: string]: any }) {
        isShownEdit.value = true;
        $set(currentItem, item, [...formComponents.map(i => i.key), 'id']);
    }

    function trashItem(id: number) {
        if (confirm("Are You Sure?")) {
            // @ts-ignore
            Inertia.delete(route(props['delete_route'], id), {
                onSuccess: (page) => {
                    addToast(page.props.notification)
                },
                onError: (errors) => console.log(errors)
            });
        }
    }

    const theForm = ref<HTMLFormElement>();

    function onSubmit() {
        if (theForm.value?.reportValidity()) {
            currentItem.put(
                currentItem['id'] ? route(props.update_route, currentItem['id']) : props.store_url,
                {
                    onSuccess: (page) => {
                        addToast(page.props.notification);
                        currentItem.reset();
                        isShownEdit.value = false;
                    },
                    onError: (errors) => console.log(errors)
                }
            )
        }
    }

    function onHidden() {
        currentItem.reset();
        currentItem.clearErrors();
    }

    return {
        isShownEdit,
        showEdit,
        currentItem,
        onHidden,
        initialValue,
        onSubmit,
        theForm,
        trashItem,
    }
}
