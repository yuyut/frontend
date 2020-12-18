// Import vue component
import uploadFile from "../components/uploadFile.vue";
import FormResultUpolad from "../components/FormResultUpolad.vue";


// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
    Vue.component('UploadFile', uploadFile);
    Vue.component('FormResultUpolad', FormResultUpolad);
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

export default plugin;