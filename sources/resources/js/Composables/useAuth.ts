export function logout() {
    let form = document.createElement("form");

    let csrf = document.createElement("input");
    const token = document.querySelector('[name="csrf-token"]').getAttribute('content');
    csrf.setAttribute("value", token);
    csrf.setAttribute("name", "_token");

    form.append(csrf);
    form.setAttribute("method", "POST");
    //@ts-ignore
    form.setAttribute("action", route("logout"));
    form.style.display = "none";
    form.setAttribute("hidden", "hidden");
    document.body.append(form);
    form.submit();
}
