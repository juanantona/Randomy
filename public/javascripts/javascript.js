let dom = document;

let getByClass = (className, parentElement) => {
	let elements = (parentElement || dom).getElementsByClassName(className)
	return (!elements.length || elements.length ==1)? elements[0] : elements
}

let getById = (className) => {
	return dom.getElementById(className)
}

let hasClass = (element, className) => {
	if (element.className.indexOf(className) > 0) return true
	return false 	
}

let removeClass = (element, className) => {
	let classes = element.className.split(' ')
	    classes = classes.filter( (element_class) => { return element_class !== className })
	element.className = classes.join(' ')
}

let addClass = (element, className) => {
	if (!hasClass(element, className)) element.className += ' ' + className
}

let changeClass = (element, className) => {
	if (hasClass(element, className)) removeClass(element, className)
	else addClass(element, className)	
}

let createGroups = (members, people_each_group) => {
	let groups = [], random_index

	while (members.length > 0) {
    var group = [];
    while (group.length < people_each_group && members.length > 0) {
    	random_index = Math.floor( members.length*Math.random() )
    	group = group.concat( members.splice(random_index - 1, 1) )
    }
    groups.push(group)
	}
	return groups
}

window.onload = () => {
  
	let randomy_button = getByClass('js-randomy')
	
	if (randomy_button) {
		randomy_button.addEventListener('click', function(ev) {
			let people_each_group = getById('peopleEachGroup').value
			let members_list      = getByClass('members-list-container')
		  let members           = Array.from( getByClass('js-member', members_list) )
	 	  let groups_textarea   = getByClass('js-groups-result')
	 	  
	 	  let groups     = createGroups(members, parseInt(people_each_group))
	 	  let gruop_list = getByClass('js-gruop-list')
	 	  while (gruop_list.firstChild) { gruop_list.removeChild(gruop_list.firstChild) }

	 	  groups.forEach( (group, index) => {
				var list_items = ''
				var text = ''
				group.forEach((member, idx) => {
		 	  	list_items += member.value
		 	  	if (idx !== group.length - 1) list_items += ', '
		 	  })
		 	  var li = dom.createElement('li');
		 	  var text = 'GROUP '+ (index + 1) + ': ' + list_items
	 	  	li.appendChild(dom.createTextNode(text))
	 	  	gruop_list.appendChild(li);
	 	  })
	 	})
	}
		
	let show_menu_button    = getByClass('js-show-menu')
	let nav_element         = getByClass('nav-menu')
	let show_members_button = getByClass('js-show-members')
	let hide_members_button = getByClass('js-hide-members')
  let members_layer       = getByClass('mobile-members-list')
	
	if (show_menu_button) {
		show_menu_button.addEventListener('click', (ev) => {
			ev.preventDefault();
			changeClass(nav_element, '_open')
		})
	}	

	if (show_members_button) {
		show_members_button.addEventListener('click', (ev) => {
			ev.preventDefault();
			addClass(members_layer, '_open')
			addClass(hide_members_button, '_open')
		})
	}	

	if (hide_members_button) {
		hide_members_button.addEventListener('click', (ev) => {
			ev.preventDefault();
			removeClass(members_layer, '_open')
			removeClass(hide_members_button, '_open')
		})
	}
}