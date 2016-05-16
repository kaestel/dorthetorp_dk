u.bug_console_only = true;

Util.Objects["page"] = new function() {
	this.init = function(page) {

		// header reference
		page.hN = u.qs("#header");
		page.hN.service = u.qs(".servicenavigation", page.hN);

		// content reference
		page.cN = u.qs("#content", page);

		// navigation reference
		page.nN = u.qs("#navigation", page);
		page.nN.list = u.qs("ul", page.nN);
//		page.nN = page.insertBefore(page.nN, page.cN);
		page.nN = u.ie(page.cN, page.nN);

		// footer reference
		page.fN = u.qs("#footer");



		// global resize handler 
		page.resized = function() {

			this.calc_width = u.browserW();
			if(this.calc_width > 960) {
				u.ac(page, "fixed");
			}
			else {
				u.rc(page, "fixed");
			}

			// forward resize event to current scene
			if(page.cN && page.cN.scene) {

				if(typeof(page.cN.scene.resized) == "function") {
					page.cN.scene.resized();
				}

			}

		}

		// global scroll handler 
		page.scrolled = function() {

			// forward scroll event to current scene
			if(page.cN && page.cN.scene && typeof(page.cN.scene.scrolled) == "function") {
				page.cN.scene.scrolled();
			}

		}



		// Page is ready - called from several places, evaluates when page is ready to be shown
		page.ready = function() {
//				u.bug("page ready")

			// page is ready to be shown - only initalize if not already shown
			if(!u.hc(this, "ready")) {

				// page is ready
				u.addClass(this, "ready");

				// set resize handler
				u.e.addEvent(window, "resize", page.resized);
				// set scroll handler
				u.e.addEvent(window, "scroll", page.scrolled);

				this.resized();

			}
		}


		// ready to start page builing process
		page.ready();
	}
}

u.e.addDOMReadyEvent(u.init);

