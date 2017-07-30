window.onload = () => {
  
	let randomy_button = document.getElementsByClassName('js-randomy')[0];
	
	randomy_button.addEventListener('click', function(ev){
	  ev.preventDefault();
	  let members         = Array.from( document.getElementsByClassName('member') )
 	  let groups_textarea = document.getElementsByClassName('js-groups-result')[0]
 	  let groups_result = ''
 	  members.forEach((member) => {
 	  	groups_result += member.value + '\n'
 	  })
 	  groups_textarea.value = groups_result
	});
};