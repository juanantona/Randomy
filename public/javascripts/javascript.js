window.onload = () => {
  
	let randomy_button    = document.getElementsByClassName('js-randomy')[0];
	
	randomy_button.addEventListener('click', function(ev) {
		let people_each_group = document.getElementById('peopleEachGroup').value;
	  let members         = Array.from( document.getElementsByClassName('js-member') )
 	  let groups_textarea = document.getElementsByClassName('js-groups-result')[0]
 	  let groups_result = ''
 	  
 	  var groups = createGroups(members, parseInt(people_each_group));

 	  groups.forEach(function(group, index) {
			group.forEach((member) => {
	 	  	groups_result += 'Group ' + index + ' : '+ member.value + '\n'
	 	  })
 	  })
	 	  
 	  groups_textarea.value = groups_result
	});
};

function createGroups(members, people_each_group) {
	var groups = [];
	var random_index;

	while (members.length > 0) {
    var group = [];
    while (group.length < people_each_group && members.length > 0) {
    	random_index = Math.floor(members.length*Math.random());
    	group = group.concat(members.splice(random_index - 1, 1));
    }
    groups.push(group);
	}
	return groups;
}