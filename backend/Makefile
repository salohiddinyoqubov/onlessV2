# Makefile for common development tasks

.PHONY: help install dev migrate migrate-create test format lint clean

help:  ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

install:  ## Install dependencies
	poetry install

dev:  ## Run development server
	poetry run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

migrate:  ## Run database migrations
	poetry run alembic upgrade head

migrate-create:  ## Create a new migration (use: make migrate-create MESSAGE="Add users table")
	poetry run alembic revision --autogenerate -m "$(MESSAGE)"

migrate-down:  ## Rollback last migration
	poetry run alembic downgrade -1

test:  ## Run tests
	poetry run pytest

test-cov:  ## Run tests with coverage
	poetry run pytest --cov=app --cov-report=html

format:  ## Format code with black
	poetry run black app/

lint:  ## Run linter (ruff)
	poetry run ruff check app/

type-check:  ## Run type checker (mypy)
	poetry run mypy app/

clean:  ## Clean cache and temporary files
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type f -name "*.pyc" -delete
	find . -type d -name ".pytest_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".mypy_cache" -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name ".ruff_cache" -exec rm -rf {} + 2>/dev/null || true
	rm -rf htmlcov/

db-create:  ## Create database
	createdb onless_db

db-drop:  ## Drop database
	dropdb onless_db

db-reset: db-drop db-create migrate  ## Reset database (drop, create, migrate)

shell:  ## Start poetry shell
	poetry shell
