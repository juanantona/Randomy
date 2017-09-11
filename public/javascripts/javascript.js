window.onload = () => {
  
	let randomy_button    = document.getElementsByClassName('js-randomy')[0];
	
	randomy_button.addEventListener('click', function(ev) {
		let people_each_group = document.getElementById('peopleEachGroup').value;
	  let members         = Array.from( document.getElementsByClassName('js-member') )
 	  let groups_textarea = document.getElementsByClassName('js-groups-result')[0]
 	  
 	  var groups = createGroups(members, parseInt(people_each_group));

 	  let gruop_list = document.getElementsByClassName('js-gruop-list')[0];
 	  while (gruop_list.firstChild) { gruop_list.removeChild(gruop_list.firstChild) }

 	  var list_item_template = '<li>GROUP: '+ + '</li>'

 	  groups.forEach(function(group, index) {
			var list_items = ''
			var text = ''
			group.forEach((member, idx) => {
	 	  	list_items += member.value
	 	  	if (idx !== group.length - 1) list_items += ', '
	 	  })
	 	  var li = document.createElement('li');
	 	  var text = 'GROUP '+ (index + 1) + ': ' + list_items
 	  	li.appendChild(document.createTextNode(text))
 	  	gruop_list.appendChild(li);
 	  })
     	  
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