import {useForm} from "@inertiajs/vue3";
import {reactive, ref} from "vue";
import route from "ziggy-js";
import {addToast} from "@/Composables/useToasts";

const onError = (errors) => console.log(errors);
const onSuccess = (page) => addToast(page.props.notification);

export default function <SelectorType, ModelType>(props) {

    const addForm = useForm({
        [props.itemField]: props.item.id,
        [props.tagField]: null
    });

    const selector = ref<SelectorType | null>(null);

    function add() {
        if (!addForm[props.tagField]) {
            return;
        }

        // @ts-ignore
        addForm.put(route(props.addRoute, addForm.data()), {
            onSuccess: (page) => {
                onSuccess(page);
                // @ts-ignore
                selector.value?.reset?.();
            },
            onError
        });
    }

    function remove(model: ModelType) {
        addForm[props.tagField] = model['id'];

        if (!confirm("Are You Sure?")) {
            return;
        }

        // @ts-ignore
        addForm.delete(route(props.removeRoute, addForm.data()), {
            onSuccess,
            onError
        });
    }


    return {
        add,
        remove,
        addForm
    }
}
