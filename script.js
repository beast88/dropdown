function Dropdown(o) {

	this.options = o;

	window.getdd = function(elem) {
		var id = elem.closest('.dropdown').parentElement.id;
		return window.dropdowns[id];
	};

	this.init = function() {
		this.elem = document.getElementById(this.options.id);

		var val = this.options.val;

		var html = `<div class="dropdown">
						<div class="dropdown-value">${val}</div>
						<div class="dropdown-arrow">▾</div>
						<div class="dropdown-panel">
							<div class="dropdown-items"></div>
						</div>
					</div>`;

		this.elem.innerHTML = html;
		var elem = this.elem;

		//Make parent inline
		this.elem.style.display = 'inline-block';

		//Store a hash of dropdowns
		if (!window.dropdowns) window.dropdowns = {};
		window.dropdowns[this.options.id] = this;

		//Get elements
		this.items = elem.querySelector('.dropdown-items');
		this.arrow = elem.querySelector('.dropdown-arrow');
		this.value = elem.querySelector('.dropdown-value');

		//Populate dropdown list
		var data = this.options.data;
		html = '';

		data.forEach(function(item) {
			html += `<div class="dropdown-item" onmousedown='var self=getdd(this);self.clicked(this)'>${item}</div>`
		});
		this.items.innerHTML = html;

		var self = this;

		document.addEventListener('mousedown', function() {
			self.hide();
		});

		//Drop the dropdown list
		this.elem.addEventListener('mousedown', (e) => {

			event.stopPropagation();
			
			if(self.isVisible) {
				self.hide();
			} else {
				self.show();
			}
		});
	};

	this.clicked = function(elem) {
		event.stopPropagation();
		this.hide();

		var newval = elem.innerHTML;
		this.value.innerHTML = newval;

		if(this.options.cb) this.options.cb(newval);

		//alert('in here');
	};

	this.show = function() {
		//close other dropdowns
		for(var dd in window.dropdowns) window.dropdowns[dd].hide();

		this.isVisible = true;
		this.items.style.transform = 'translate(0px, 0px)';
		this.arrow.style.transform = 'rotate(180deg)';
	};

	this.hide = function() {
		if (!this.isVisible) return;

		this.isVisible = false;
		this.items.style.transform = 'translate(0px, -200px)';
		this.arrow.style.transform = 'rotate(0deg)';
	};

	this.init();
	return this
};

var dd1 = new Dropdown({
	id: 'dd1',
	val: 'cat',
	data: ['cat', 'dog', 'rabbit', 'fish', 'snake', 'rhino', 'lion', 'bear', 'frog', 'hamster'],
	cb: function(newval) {
		//alert(newval);
	}
});

var dd2 = new Dropdown({
	id: 'dd2',
	val: 'bear',
	data: ['cat', 'dog', 'rabbit', 'fish', 'snake', 'rhino', 'lion', 'bear', 'frog', 'hamster'],
	cb: function(newval) {
		//alert(newval);
	}
});