"""Unit tests for F1 classification API endpoints."""
import os
import pytest
from fastapi.testclient import TestClient
from api.index import app

client = TestClient(app)


class TestRootEndpoint:
    """Test cases for root endpoint."""

    def test_root_returns_200(self):
        """Test that root endpoint returns 200 status code."""
        response = client.get("/")
        assert response.status_code == 200

    def test_root_returns_api_info(self):
        """Test that root endpoint returns API information."""
        response = client.get("/")
        data = response.json()

        assert "message" in data
        assert "version" in data
        assert "endpoints" in data
        assert data["message"] == "F1 2025 Classification API"
        assert data["version"] == "1.0.0"

    def test_root_includes_classification_endpoint(self):
        """Test that root endpoint lists classification endpoint."""
        response = client.get("/")
        data = response.json()

        assert "/api/classification" in data["endpoints"]


class TestClassificationEndpoint:
    """Test cases for classification endpoint."""

    def test_classification_returns_200(self):
        """Test that classification endpoint returns 200 status code."""
        response = client.get("/api/classification")
        assert response.status_code == 200

    def test_classification_returns_data_wrapper(self):
        """Test that response has data wrapper."""
        response = client.get("/api/classification")
        data = response.json()

        assert "data" in data
        assert isinstance(data["data"], list)

    def test_classification_without_flag(self, monkeypatch):
        """Test classification endpoint without feature flag."""
        monkeypatch.setenv("RUBINHO_CAMPEAO", "false")
        response = client.get("/api/classification")
        data = response.json()

        assert len(data["data"]) == 10
        assert data["data"][0]["name"] == "Max Verstappen"
        assert data["data"][0]["position"] == 1

    def test_classification_with_flag_enabled(self, monkeypatch):
        """Test classification endpoint with feature flag enabled."""
        monkeypatch.setenv("RUBINHO_CAMPEAO", "true")
        response = client.get("/api/classification")
        data = response.json()

        assert len(data["data"]) == 11
        assert data["data"][0]["name"] == "Rubens Barrichello"
        assert data["data"][0]["position"] == 1
        assert data["data"][0]["isChampion"] is True

    def test_classification_drivers_have_required_fields(self):
        """Test that all drivers have required fields."""
        response = client.get("/api/classification")
        data = response.json()

        required_fields = {"position", "name", "team", "points"}

        for driver in data["data"]:
            assert set(driver.keys()).issuperset(required_fields)

