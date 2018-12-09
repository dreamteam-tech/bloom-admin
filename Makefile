all: install build
.PHONY: all

build:
	CI=true yarn build
.PHONY: build

install:
	yarn install
.PHONY: install

subtree-push:
	git subtree push --prefix packages/firefly git@github.com:max107/firefly.git master
.PHONY: subtree-push

subtree-pull:
	git subtree pull --prefix packages/firefly git@github.com:max107/firefly.git master
.PHONY: subtree-pull
