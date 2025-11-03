"""Unit tests for F1 classification API."""
import os
import pytest
from api.classification import (
    get_base_classification,
    apply_rubinho_champion_flag,
    get_classification
)


class TestBaseClassification:
    """Test cases for base classification data."""
    
    def test_base_classification_returns_10_drivers(self):
        """Test that base classification returns 10 drivers."""
        classification = get_base_classification()
        assert len(classification) == 10
    
    def test_base_classification_has_correct_structure(self):
        """Test that each driver has required fields."""
        classification = get_base_classification()
        required_fields = {"position", "name", "team", "points"}
        
        for driver in classification:
            assert set(driver.keys()) == required_fields
    
    def test_base_classification_is_sorted_by_position(self):
        """Test that drivers are sorted by position."""
        classification = get_base_classification()
        positions = [driver["position"] for driver in classification]
        assert positions == sorted(positions)
    
    def test_verstappen_is_first_in_base_classification(self):
        """Test that Max Verstappen is at position 1 in base classification."""
        classification = get_base_classification()
        assert classification[0]["name"] == "Max Verstappen"
        assert classification[0]["position"] == 1


class TestRubinhoFeatureFlag:
    """Test cases for Rubinho Barrichello champion feature flag."""
    
    def test_rubinho_flag_adds_rubinho_at_first(self):
        """Test that Rubinho is inserted at position 1."""
        base = get_base_classification()
        modified = apply_rubinho_champion_flag(base)
        
        assert modified[0]["name"] == "Rubens Barrichello"
        assert modified[0]["position"] == 1
        assert modified[0]["isChampion"] is True
    
    def test_rubinho_flag_shifts_other_drivers(self):
        """Test that other drivers are shifted down by one position."""
        base = get_base_classification()
        modified = apply_rubinho_champion_flag(base)
        
        # Verstappen should now be at position 2
        assert modified[1]["name"] == "Max Verstappen"
        assert modified[1]["position"] == 2
    
    def test_rubinho_flag_increases_total_drivers(self):
        """Test that total number of drivers increases by 1."""
        base = get_base_classification()
        modified = apply_rubinho_champion_flag(base)
        
        assert len(modified) == len(base) + 1
    
    def test_rubinho_has_special_attributes(self):
        """Test that Rubinho has special champion attributes."""
        base = get_base_classification()
        modified = apply_rubinho_champion_flag(base)
        rubinho = modified[0]
        
        assert rubinho["team"] == "Ferrari Legends"
        assert rubinho["points"] == 999
        assert "isChampion" in rubinho


class TestGetClassification:
    """Test cases for get_classification with environment variable."""
    
    def test_get_classification_without_flag(self, monkeypatch):
        """Test classification without feature flag enabled."""
        monkeypatch.setenv("RUBINHO_CAMPEAO", "false")
        classification = get_classification()
        
        assert len(classification) == 10
        assert classification[0]["name"] == "Max Verstappen"
    
    def test_get_classification_with_flag_enabled(self, monkeypatch):
        """Test classification with feature flag enabled."""
        monkeypatch.setenv("RUBINHO_CAMPEAO", "true")
        classification = get_classification()
        
        assert len(classification) == 11
        assert classification[0]["name"] == "Rubens Barrichello"
        assert classification[0]["position"] == 1
    
    def test_get_classification_with_flag_case_insensitive(self, monkeypatch):
        """Test that feature flag is case insensitive."""
        monkeypatch.setenv("RUBINHO_CAMPEAO", "TRUE")
        classification = get_classification()
        
        assert classification[0]["name"] == "Rubens Barrichello"
    
    def test_get_classification_without_env_var(self, monkeypatch):
        """Test classification when env var is not set."""
        monkeypatch.delenv("RUBINHO_CAMPEAO", raising=False)
        classification = get_classification()
        
        assert len(classification) == 10
        assert classification[0]["name"] == "Max Verstappen"

