// @ts-nocheck
import component from '../index.vue'

export default function(Vue){
	const Constructor = Vue.extend(component)
	const Instance = new Constructor();
	Instance.$mount()
	
	document.body.appendChild(Instance.$el)
	Vue.prototype.$MessageBox = ({title,content,canCelText,confirmText, dialogList = [], showClose=false, dialog_desc="", showInput = false, inputText="下次不再提醒"}) => {
		Instance.visible = true
		Instance.title = title
		Instance.content = content
		Instance.content = content
		Instance.canCelText = canCelText
		Instance.confirmText = confirmText
		Instance.dialogList = dialogList
		Instance.showClose = showClose
		Instance.dialog_desc = dialog_desc
		Instance.showInput = showInput
		Instance.inputText = inputText
		
		return Instance.showMsgBox()
		  .then((res) => {
			 return Promise.resolve(res);
		  })
		  .catch((err) => {
			 return Promise.reject(err);
		  });
	}
}