/*

*/
(function () {
	//VARS
	var cache = {},
		body = document.body,
		parentElem, firstCh, mainHolder;

	this.ath = {
		layer : '<div id="<%=red.id%>" class="<%=red.classNames%>" style="<%=red.style%>"><div style="<%=white.style%>"></div><div style="<%=white.style%>"></div><div style="<%=white.style%>"></div><div style="<%=white.style%>"></div><div style="<%=white.style%>"></div><div style="<%=texto.style%>">Aupa Athletic!</div></div>',
		attrs : {
			holder: {
				id: 'athletic-id',
				style: 'position:absolute;left:0px;top:0px;z-index: 9999;'
			},
			red: {
				id: 'red-id',
				classNames: 'red-stripe',
				style: 'position:absolute;width: 100%;height:36px;font-size: 1.0em;overflow-y:hidden;background-color:red;text-align:center;color:back;box-shadow:0px 2px 2px -1px #929292;'
			},
			white: {
				style: 'position:relative;width: 100%;height:4px;background-color:white;margin-top:4px',
				classNames: 'white-stripe'
			},
			texto: {
				style: 'position:absolute;top:0px;width: 100%;line-height: 36px;color:black;font-size: 30px;font-weight:800;font-family:Mistral;text-shadow: #FEFEFE 1px 1px 1px'
			}
		}
	};

	// By jeresig!!!
  
	this.tmpl = function tmpl(str, data){
		// Figure out if we're getting a template, or if we need to
		// load the template - and be sure to cache the result.
		var fn = !/\W/.test(str) ?
		cache[str] = cache[str] ||
		tmpl(document.getElementById(str).innerHTML) :
	  
		// Generate a reusable function that will serve as a template
		// generator (and which will be cached).
		new Function("obj",
		"var p=[],print=function(){p.push.apply(p,arguments);};" +
		
		// Introduce the data as local variables using with(){}
		"with(obj){p.push('" +
		
		// Convert the template into pure JavaScript
		str
		  .replace(/[\r\t\n]/g, " ")
		  .split("<%").join("\t")
		  .replace(/((^|%>)[^\t]*)'/g, "$1\r")
		  .replace(/\t=(.*?)%>/g, "',$1,'")
		  .split("\t").join("');")
		  .split("%>").join("p.push('")
		  .split("\r").join("\\'")
	  + "');}return p.join('');");
	
	// Provide some basic currying to the user
	return data ? fn( data ) : fn;
  };

	// Get a reference to the element in which we want to insert a new node
	parentElem = document.getElementsByTagName("body").item(0); 
	// Get a reference to the first child
	firstCh = parentElem.firstChild;

	// Create THE element
	mainHolder = document.createElement("div");
	mainHolder.id = ath.attrs.holder.id;
	mainHolder.style = ath.attrs.holder.style;
	mainHolder.innerHTML = tmpl(ath.layer, ath.attrs);

	// Insert the new element before the first child
	parentElem.insertBefore(mainHolder, firstCh);

})();