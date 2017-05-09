Date.prototype.addDay = function(num) {
	this.setDate(this.getDate() + num);
	return this;
}

Date.prototype.addMonth = function(num) {
	var tempDate = this.getDate();
	this.setMonth(this.getMonth() + num);
	if (tempDate != this.getDate())
		this.setDate(0);
	return this;
}

Date.prototype.addYear = function(num) {
	var tempDate = this.getDate();
	this.setYear(this.getYear() + num);
	if (tempDate != this.getDate())
		this.setDate(0);
	return this;
}

Date.prototype.Format = function(formatStr) {
	var str = formatStr;
	var Week = ['日', '一', '二', '三', '四', '五', '六'];

	str = str.replace(/yyyy|YYYY/, this.getFullYear());
	str = str.replace(/yy|YY/, (this.getYear() % 100) > 9 ? (this.getYear() % 100).toString() : '0' + (this.getYear() % 100));

	str = str.replace(/MM/, (this.getMonth() + 1) > 9 ? (this.getMonth() + 1).toString() : '0' + (this.getMonth() + 1));
	str = str.replace(/M/g, (this.getMonth() + 1));

	str = str.replace(/w|W/g, Week[this.getDay()]);

	str = str.replace(/dd|DD/, this.getDate() > 9 ? this.getDate().toString() : '0' + this.getDate());
	str = str.replace(/d|D/g, this.getDate());

	str = str.replace(/hh|HH/, this.getHours() > 9 ? this.getHours().toString() : '0' + this.getHours());
	str = str.replace(/h|H/g, this.getHours());
	str = str.replace(/mm/, this.getMinutes() > 9 ? this.getMinutes().toString() : '0' + this.getMinutes());
	str = str.replace(/m/g, this.getMinutes());

	str = str.replace(/ss|SS/, this.getSeconds() > 9 ? this.getSeconds().toString() : '0' + this.getSeconds());
	str = str.replace(/s|S/g, this.getSeconds());

	return str;
}


function dateLe(startDate, endDate) {
	if (startDate && endDate) {
		startDate = startDate.replace(/-/g, "/");
		endDate = endDate.replace(/-/g, "/");
		var dt1 = new Date(Date.parse(startDate));
		var dt2 = new Date(Date.parse(endDate));
		return (dt1 <= dt2);
	} else {
		return false;
	}
}

function dateLt(startDate, endDate) {
	if (startDate && endDate) {
		startDate = startDate.replace(/-/g, "/");
		endDate = endDate.replace(/-/g, "/");
		var dt1 = new Date(Date.parse(startDate));
		var dt2 = new Date(Date.parse(endDate));
		return (dt1 < dt2);
	} else {
		return false;
	}
}

function dateGt(startDate, endDate) {
	if (startDate && endDate) {
		startDate = startDate.replace(/-/g, "/");
		endDate = endDate.replace(/-/g, "/");
		var dt1 = new Date(Date.parse(startDate));
		var dt2 = new Date(Date.parse(endDate));
		return (dt1 > dt2);
	} else {
		return false;
	}
}

function dateGe(startDate, endDate) {
	if (startDate && endDate) {
		startDate = startDate.replace(/-/g, "/");
		endDate = endDate.replace(/-/g, "/");
		var dt1 = new Date(Date.parse(startDate));
		var dt2 = new Date(Date.parse(endDate));
		return (dt1 >= dt2);
	} else {
		return false;
	}
}
