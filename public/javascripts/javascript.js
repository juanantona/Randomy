window.onload = () => {
  
	let randomy_button    = document.getElementsByClassName('js-randomy')[0];
	
	if (randomy_button) {
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
	}
		
	let show_menu_button = document.getElementsByClassName('js-show-menu')[0];

	show_menu_button.addEventListener('click', function(ev) {
		ev.preventDefault();
		let nav_element = document.getElementsByClassName('nav-menu')[0];
		if (nav_element.className.indexOf('_menu_open') > 0) nav_element.className = 'nav-menu';
		else nav_element.className += ' _menu_open';
	})

	let show_members = document.getElementsByClassName('js-show-members')[0];
	let hide_members = document.getElementsByClassName('js-hide-members')[0];

	show_members.addEventListener('click', function(ev) {
		ev.preventDefault();
		let members_layer = document.getElementsByClassName('mobile-members-list')[0];
		if (members_layer.className.indexOf('_open') > 0) members_layer.className = 'container mobile-members-list';
		else members_layer.className += ' _open';
		if (hide_members.className.indexOf('_open') > 0) hide_members.className = 'mobile-members-close js-hide-members';
		else hide_members.className += ' _open';
	})



	hide_members.addEventListener('click', function(ev) {
		ev.preventDefault();
		let members_layer = document.getElementsByClassName('mobile-members-list')[0];
		if (members_layer.className.indexOf('_open') > 0) members_layer.className = 'container mobile-members-list';
		else members_layer.className += ' _open';
		if (hide_members.className.indexOf('_open') > 0) hide_members.className = 'mobile-members-close js-hide-members';
		else hide_members.className += ' _open';
	})

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