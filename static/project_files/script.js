// loop through children of tbody
const children = $('tbody').children();
let children_array = children.toArray();

// build an array of objects
let items = [];

// build array of objects to be sorted
children_array.forEach(element => {

	const rowDetails = {
		name: element.getAttribute('data-name'),
		size: parseInt(element.getAttribute('data-size')),
		time: parseInt(element.getAttribute('data-time')),
		html: element.outerHTML,
	}
	items = [...items, rowDetails];
});

// Order status
const sortStatus = {
	name: 'none', // none, up, down
	size: 'none',
	time: 'none'
}

const sort = (items, order, type) => {
	items.sort((item1, item2) => {
		let value1, value2;
		if(type === 'name'){
			value1 = item1.name.toUpperCase();
			value2 = item2.name.toUpperCase();
		} else if(type === 'size') {
			value1 = item1.size;
			value2 = item2.size;
		} else if(type === 'time') {
			value1 = item1.time;
			value2 = item2.time;
		}

		if(value1 < value2) {
			return -1;
		}
		if(value1 > value2) {
			return 1;
		}
		// equal names
		return 0;
	});

	if(order === 'down') {
		items.reverse();
	}
}

// fill the table body with items
const fill_table_body = items => {
	const content = items.map(element => element.html).join('');
	$('tbody').html(content);
};
fill_table_body(items);

// event listeners
$('#table_head_row').on('click', (event) => {
	if(event.target){
		$('.fas').remove();

		if(['none', 'down'].includes(sortStatus[event.target.id])){
			// sort in ascending order
			sort(items, 'up', event.target.id);
			sortStatus[event.target.id] = 'up';
			// add icon
			event.target.innerHTML += ' <i class="fas fa-arrow-circle-up"></i>';
		}
		else if(sortStatus[event.target.id] === 'up'){
			// sort in descending order
			sort(items, 'down', event.target.id);
			sortStatus[event.target.id] = 'down';
			event.target.innerHTML += ' <i class="fas fa-arrow-circle-down"></i>';
		}
		fill_table_body(items);
	}
});



