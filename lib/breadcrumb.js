// include node modules
const path = require('path');

const buildBreadCrumb = pathname => {
	const pathArray = pathname.split('/').filter(element => element !== '');
	let htmlSnippet = `<li class="breadcrumb-item"><a href="/">Home</a></li>`;;
	let link = `/`;
	pathArray.forEach((pathItem, i) => {

		link = path.join(link, pathItem);

		if(i !== pathArray.length - 1){
			htmlSnippet += `<li class="breadcrumb-item"><a href="${link}">${pathItem}</a></li>`;
		} else {
			htmlSnippet += `<li class="breadcrumb-item active" aria-current="page">${pathItem}</li>`;
		}


	});
	return htmlSnippet;
};

module.exports = buildBreadCrumb;