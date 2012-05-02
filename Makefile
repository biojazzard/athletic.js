# by Alfredo Llanos
VERSION=1.5.0
DATE=$(shell date)
# BOOTSTRAP
BOOTSTRAP = ./css/bootstrap.css
BOOTSTRAP_MIN = ./css/bootstrap.min.css
BOOTSTRAP_LESS = ./src/less/bootstrap.less
# BOOTSTRAP-RESPONSIVE
BOOTSTRAP_RESPONSIVE = ./css/bootstrap-responsive.css
BOOTSTRAP_RESPONSIVE_MIN = ./css/bootstrap-responsive.min.css
BOOTSTRAP_RESPONSIVE_LESS = ./src/less/responsive.less
# STYLECSS
STYLECSS = ./css/style.css
STYLECSS_MIN = ./css/style.min.css
STYLECSS_LESS = ./src/less/style.less
# CONFIG
LESS_COMPRESSOR ?= `which lessc`
UGLIFY_JS ?= `which uglifyjs`
WATCHR ?= `which watchr`

#
# BUILD SIMPLE CSS
# lessc & uglifyjs are required
#

build:
	@@if test ! -z ${LESS_COMPRESSOR}; then \
		sed -e 's/@VERSION/'"v${VERSION}"'/' -e 's/@DATE/'"${DATE}"'/' <${STYLECSS_LESS} >${STYLECSS_LESS}.tmp; \
		lessc ${STYLECSS_LESS}.tmp > ${STYLECSS}; \
		lessc --compress ${STYLECSS_LESS}.tmp > ${STYLECSS_MIN}; \
		rm -f ${STYLECSS_LESS}.tmp; \
		echo "StyleSheet successfully built! - `date`"; \
	else \
		echo "You must have the LESS compiler installed in order to build Bootstrap."; \
		echo "You can install it by running: npm install less -g"; \
	fi

#
# Style Build
#

style:
	lessc ${STYLECSS_LESS} > ${STYLECSS}
	lessc --compress ${STYLECSS_LESS} > ${STYLECSS_MIN}
	echo "CSS NON BS done!"; \

#
# Script Build
#

script:
	cat src/js/js.plugins.js src/js/js.script.js > js/script.js
	uglifyjs -nc js/script.js > js/script.min.js
	echo "JS NON BS done!"; \

#
# Script Build
#

athletic:
	cat src/js/athletic.js > js/athletic.max.js
	uglifyjs -nc js/athletic.max.js > js/athletic.js
	echo "JS NON BS done!"; \

#
# BUILD SIMPLE BOOTSTRAP DIRECTORY
# lessc & uglifyjs are required
#

bootstrap_less:
	lessc ${BOOTSTRAP_LESS} > ${BOOTSTRAP}
	lessc --compress ${BOOTSTRAP_LESS} > ${BOOTSTRAP_MIN}
	lessc ${BOOTSTRAP_RESPONSIVE_LESS} > ${BOOTSTRAP_RESPONSIVE}
	lessc --compress ${BOOTSTRAP_RESPONSIVE_LESS} > ${BOOTSTRAP_RESPONSIVE_MIN}

#
# BUILD SIMPLE BOOTSTRAP DIRECTORY
# lessc & uglifyjs are required
#

bootstrap:
	lessc ${BOOTSTRAP_LESS} > ${BOOTSTRAP}
	lessc --compress ${BOOTSTRAP_LESS} > ${BOOTSTRAP_MIN}
	lessc ${BOOTSTRAP_RESPONSIVE_LESS} > ${BOOTSTRAP_RESPONSIVE}
	lessc --compress ${BOOTSTRAP_RESPONSIVE_LESS} > ${BOOTSTRAP_RESPONSIVE_MIN}
	cat src/js/bootstrap-transition.js src/js/bootstrap-alert.js src/js/bootstrap-button.js src/js/bootstrap-carousel.js src/js/bootstrap-collapse.js src/js/bootstrap-dropdown.js src/js/bootstrap-modal.js src/js/bootstrap-tooltip.js src/js/bootstrap-popover.js src/js/bootstrap-scrollspy.js src/js/bootstrap-tab.js src/js/bootstrap-typeahead.js > js/max/bootstrap.js
	uglifyjs -nc js/max/bootstrap.js > js/min/bootstrap.min.js
	echo "ALL done!"; \

#
# WATCH LESS FILES
#

gh-pages:
	cp -r docs/* ../bootstrap-gh-pages

watch:
	echo "Watching less files..."; \
	watchr -e "watch('./src/less/.*\.less') { system 'make' }"


.PHONY: dist docs watch gh-pages
