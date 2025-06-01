ifneq (,$(wildcard .env))
include .env
export
endif

SPEC_DIR ?= docs/spec
BRANCH ?= master
COMMIT_MSG ?= docs: sync from overleaf

ifndef OVERLEAF_URL
$(error OVERLEAF_URL not set - add to .env)
endif

.DEFAULT_GOAL := help

.PHONY: help
help: # show available targets
	@echo "Available targets:"
	@printf "  %-12s %s\n" "docs-pull" "Pull latest LaTeX from Overleaf into $(SPEC_DIR)"
	@printf "  %-12s %s\n" "docs-push" "Push local LaTeX changes back to Overleaf"
	@printf "  %-12s %s\n" "env-sync"  "Append new keys from .env.example to .env"
	@printf "  %-12s %s\n" "help"      "Show this help text"

.PHONY: docs-pull
docs-pull:
	@git subtree pull \
	    --prefix $(SPEC_DIR) $(OVERLEAF_URL) $(BRANCH) --squash \
	    -m "$(COMMIT_MSG)"

.PHONY: docs-push
docs-push:
ifdef OVERLEAF_TOKEN
	@git subtree push \
	    --prefix $(SPEC_DIR) \
	    https://git:$(OVERLEAF_TOKEN)@$(patsubst https://%,%,$(OVERLEAF_URL)) \
	    $(BRANCH)
else 
	@git subtree push \
	    --prefix $(SPEC_DIR) $(OVERLEAF_URL) $(BRANCH)
endif

.PHONY: env-sync
env-sync:
	@python3 scripts/env_sync.py